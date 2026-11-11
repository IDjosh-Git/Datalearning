/** Shared, text-node-only AI response formatter for the floating coach and Tutor Studio.
 * No provider-generated HTML is trusted or inserted into the DOM. */
(() => {
 'use strict';
 const documentRef = document;
 function inline(parent, source) {
   const value = String(source ?? '');
   // Links, bold, code, italic, and strike-through. Content is assigned as text.
   const pattern = /\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)|\*\*([^*\n]+)\*\*|__([^_\n]+)__|`([^`\n]+)`|\*([^*\n]+)\*|_([^_\n]+)_|~~([^~\n]+)~~/g;
   let cursor = 0, match;
   while ((match = pattern.exec(value))) {
     if (match.index > cursor) parent.append(documentRef.createTextNode(value.slice(cursor,match.index)));
     let element;
     if (match[1] && match[2]) {
       element = documentRef.createElement('span'); element.textContent = match[1];
       try {
         const url = new URL(match[2]);
         if (!['https:', 'http:'].includes(url.protocol)) throw new Error('Disallowed link');
         element = documentRef.createElement('a'); element.textContent = match[1];
         element.href = url.href; element.rel = 'noopener noreferrer'; element.target = '_blank';
       } catch (_) { /* An invalid link remains plain text. */ }
     } else {
       element = documentRef.createElement(match[3] || match[4] ? 'strong' : match[5] ? 'code' : match[6] || match[7] ? 'em' : 'del');
       element.textContent = match[3] || match[4] || match[5] || match[6] || match[7] || match[8];
     }
     parent.append(element); cursor = pattern.lastIndex;
   }
   if (cursor < value.length) parent.append(documentRef.createTextNode(value.slice(cursor)));
 }
 function cells(line) {
   const raw = String(line).trim().replace(/^\|/, '').replace(/\|$/, '');
   const output = []; let current = '', escaped = false, inCode = false;
   for (const char of raw) {
     if (escaped) { current += char; escaped = false; continue; }
     if (char === '\\') { escaped = true; continue; }
     if (char === '`') { inCode = !inCode; current += char; continue; }
     if (char === '|' && !inCode) { output.push(current.trim()); current = ''; }
     else current += char;
   }
   output.push(current.trim());
   return output;
 }
 const isTable = (lines, index) => {
   if (index + 1 >= lines.length || !lines[index].includes('|')) return false;
   const heading = cells(lines[index]), divider = cells(lines[index + 1]);
   return heading.length >= 2 && heading.length <= 20 && divider.length === heading.length &&
     divider.every(part => /^:?-{3,}:?$/.test(part));
 };
 const isFence = line => /^\s*```/.test(line);
 const heading = line => line.match(/^\s{0,3}(#{1,6})\s+(.+?)\s*#*\s*$/);
 const ordered = line => line.match(/^\s{0,3}(\d+)[.)]\s+(.+)$/);
 const unordered = line => line.match(/^\s{0,3}[-*+]\s+(.+)$/);
 const isRule = line => /^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/.test(line);
 const isQuote = line => /^\s{0,3}>\s?/.test(line);
 function isStart(lines, index) {
   const line = lines[index] || '';
   return isFence(line) || heading(line) || ordered(line) || unordered(line) || isQuote(line) ||
     isRule(line) || isTable(lines, index);
 }
 function appendCode(container, code, language) {
   const block = documentRef.createElement('section'); block.className = 'dl-ai-code';
   const header = documentRef.createElement('div'); header.className = 'dl-ai-code-header';
   const name = documentRef.createElement('span'); name.textContent = language || 'Code / formula';
   const button = documentRef.createElement('button'); button.type = 'button';
   button.className = 'dl-ai-copy'; button.textContent = 'Copy'; button.setAttribute('aria-label', 'Copy code');
   button.addEventListener('click', async () => {
     try { await navigator.clipboard.writeText(code); button.textContent = 'Copied ✓'; }
     catch (_) { button.textContent = 'Select code to copy'; }
   });
   header.append(name, button);
   const pre = documentRef.createElement('pre'), el = documentRef.createElement('code');
   el.textContent = code; pre.append(el); block.append(header, pre); container.append(block);
 }
 function appendTable(container, columns, rows) {
   const region = documentRef.createElement('div'); region.className = 'dl-ai-table-region';
   region.setAttribute('role', 'region'); region.setAttribute('aria-label', 'Scrollable answer table');
   region.tabIndex = 0;
   const cue = documentRef.createElement('div'); cue.className = 'dl-ai-table-cue';
   cue.textContent = 'Table · scroll sideways to view more columns'; region.append(cue);
   const table = documentRef.createElement('table'); table.className = 'dl-ai-table';
   const thead = documentRef.createElement('thead'), headerRow = documentRef.createElement('tr');
   for (const column of columns) {const th = documentRef.createElement('th'); th.scope = 'col'; inline(th, column); headerRow.append(th);}
   thead.append(headerRow); table.append(thead);
   const body = documentRef.createElement('tbody');
   for (const row of rows) {
     const tr = documentRef.createElement('tr');
     row.forEach((value, i) => {const cell = documentRef.createElement('td'); inline(cell, value);tr.append(cell);});
     body.append(tr);
   }
   table.append(body); region.append(table); container.append(region);
 }
 function render(container, source) {
   if (!container || !container.append || typeof source !== 'string') return container;
   const text = source.slice(0, 40000).replace(/\r\n?/g, '\n').replace(/[\u200b\u200c\u200d\ufeff]/g, '');
   const lines = text.split('\n'); let i = 0;
   container.classList.add('dl-ai-response');
   while (i < lines.length) {
     const line = lines[i], trimmed = line.trim();
     if (!trimmed) {i++;continue;}
     if (isFence(line)) {
       const language = trimmed.replace(/^```/, '').trim().slice(0, 32);
       const block = []; i++;
       while (i < lines.length && !isFence(lines[i])) block.push(lines[i++]);
       if (i < lines.length) i++;
       appendCode(container, block.join('\n'), language); continue;
     }
     if (isTable(lines, i)) {
       const headings = cells(lines[i]), body = []; i += 2;
       while (i < lines.length && lines[i].trim() && lines[i].includes('|')) {
         const row = cells(lines[i]);
         if (row.length !== headings.length) break;
         body.push(row); i++;
       }
       appendTable(container, headings, body); continue;
     }
     const h = heading(line);
     if (h) {
       const node = documentRef.createElement(h[1].length <= 2 ? 'h3' : 'h4');
       inline(node, h[2]);container.append(node);i++;continue;
     }
     if (isRule(line)) {container.append(documentRef.createElement('hr'));i++;continue;}
     if (isQuote(line)) {
       const linesOfQuote = [];
       while (i < lines.length && isQuote(lines[i])) linesOfQuote.push(lines[i++].replace(/^\s{0,3}>\s?/, '').trim());
       const quote = documentRef.createElement('blockquote');inline(quote, linesOfQuote.join(' '));container.append(quote);continue;
     }
     if (unordered(line) || ordered(line)) {
       const asOrdered = !!ordered(line);const list = documentRef.createElement(asOrdered ? 'ol' : 'ul');
       const first = ordered(line); if (asOrdered && Number(first[1]) > 1) list.start = Number(first[1]);
       while (i < lines.length) {
         const entry = asOrdered ? ordered(lines[i]) : unordered(lines[i]);
         if (!entry) break;
         const li = documentRef.createElement('li');inline(li, asOrdered ? entry[2] : entry[1]);list.append(li);i++;
       }
       container.append(list);continue;
     }
     const para = [];
     while (i < lines.length && lines[i].trim() && !isStart(lines, i)) para.push(lines[i++].trim());
     if (!para.length) {para.push(trimmed);i++;}
     const p = documentRef.createElement('p');inline(p,para.join(' '));container.append(p);
   }
   return container;
 }
 window.DALP_AI_RESPONSE = Object.freeze({render, inline, cells});
})();
