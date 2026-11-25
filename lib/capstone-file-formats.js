import WordExtractor from 'word-extractor';
import sharp from 'sharp';
import convertHeic from 'heic-convert';
import bmp from 'bmp-js';

export const wordFormats=new Set(['doc','docx']);
export const extraImageFormats=new Set(['gif','bmp','tif','tiff','heic','heif','avif']);
const pixelLimit=12_000_000;
const imageOptions={limitInputPixels:pixelLimit,page:0,pages:1};

function checkDimensions(width,height){
 if(!Number.isInteger(width)||!Number.isInteger(height)||width<1||height<1||width*height>pixelLimit){
  throw Error('Unsupported image dimensions');
 }
}

function checkWordArchive(bytes){
 // Bound expansion before handing a ZIP-based Word document to the parser.
 let end=bytes.length-22;
 const floor=Math.max(0,end-65535);
 while(end>=floor&&bytes.readUInt32LE(end)!==0x06054b50)end--;
 if(end<floor||end+22+bytes.readUInt16LE(end+20)!==bytes.length)throw Error('Invalid Word archive');
 const count=bytes.readUInt16LE(end+10);
 let cursor=bytes.readUInt32LE(end+16);
 let expanded=0;
 if(count>512||bytes.readUInt32LE(end+12)!==end-cursor)throw Error('Unsupported Word archive');
 for(let index=0;index<count;index++){
  if(cursor+46>end||bytes.readUInt32LE(cursor)!==0x02014b50)throw Error('Invalid Word archive entry');
  expanded+=bytes.readUInt32LE(cursor+24);
  if(expanded>24*1024*1024)throw Error('Word archive is too large to extract');
  cursor+=46+bytes.readUInt16LE(cursor+28)+bytes.readUInt16LE(cursor+30)+bytes.readUInt16LE(cursor+32);
 }
 if(cursor!==end)throw Error('Invalid Word archive directory');
}

export async function extractWordText(bytes,extension){
 if(extension==='docx')checkWordArchive(bytes);
 else if(bytes.length<512||bytes.toString('hex',0,8)!=='d0cf11e0a1b11ae1')throw Error('Invalid Word document');
 const doc=await new WordExtractor().extract(bytes);
 return doc.getBody().trim().slice(0,50000);
}

export async function convertEvidenceImage(bytes,extension){
 let image;
 if(extension==='bmp'){
  if(bytes.length<54||bytes.toString('ascii',0,2)!=='BM'||bytes.readUInt32LE(14)<40)throw Error('Invalid bitmap');
  checkDimensions(bytes.readInt32LE(18),Math.abs(bytes.readInt32LE(22)));
  const decoded=bmp.decode(bytes);
  checkDimensions(decoded.width,decoded.height);
  const rgb=Buffer.alloc(decoded.width*decoded.height*3);
  for(let source=0,target=0;source<decoded.data.length;source+=4,target+=3){
   rgb[target]=decoded.data[source+3];
   rgb[target+1]=decoded.data[source+2];
   rgb[target+2]=decoded.data[source+1];
  }
  image=sharp(rgb,{raw:{width:decoded.width,height:decoded.height,channels:3},limitInputPixels:pixelLimit});
 }else{
  image=sharp(bytes,imageOptions);
  const metadata=await image.metadata();
  const format={gif:'gif',tif:'tiff',tiff:'tiff',avif:'heif',heic:'heif',heif:'heif'}[extension];
  if(!format||metadata.format!==format)throw Error('Unexpected image format');
  checkDimensions(metadata.width,metadata.pageHeight||metadata.height);
  if(['heic','heif'].includes(extension)&&metadata.compression!=='av1'){
   if(metadata.pages>1)throw Error('Multiple HEIF images require instructor review');
   const converted=await convertHeic({buffer:bytes,format:'JPEG',quality:.9});
   image=sharp(Buffer.from(converted),imageOptions);
  }
 }
 return image.rotate().resize({width:2000,height:2000,fit:'inside',withoutEnlargement:true})
  .flatten({background:'#ffffff'}).jpeg({quality:88}).toBuffer();
}
