"""Audits authored navigation URLs, anchors, downloads, Arena deep links and route intent."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote, parse_qs
import re, json
ROOT=Path(__file__).resolve().parents[1]
class Scan(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True);self.links=[];self.anchors=set();self.assets=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if a.get('id'):self.anchors.add(a['id'])
        if tag in ('a','area'):
            self.links.append((a.get('href',''),bool('download' in a),a.get('aria-label',''),a.get('class','')))
        if tag in ('script','link','img','source'):
            url=a.get('src') or (a.get('href') if tag=='link' else '')
            if url:self.assets.append(url)
pages={str(p.relative_to(ROOT)):p for p in ROOT.rglob('*.html') if not any(x in p.parts for x in ('node_modules','qa-evidence'))}
scans={}
for name,p in pages.items():
    parser=Scan();parser.feed(p.read_text(encoding='utf-8'));scans[name]=parser
missing=[];external=set();downloads=0;links=0;fragment_checks=0
for name,sc in scans.items():
    for link,download,_,_ in sc.links:
        links+=1
        if not link or link=='#':missing.append((name,link,'empty navigation target'));continue
        if link.startswith(('mailto:','tel:','http:','https:','//')):
            if link.startswith(('http:','https:','//')):external.add(link)
            continue
        spl=urlsplit(link)
        if spl.scheme:continue
        dest=(ROOT/name).parent / unquote(spl.path) if spl.path else ROOT/name
        dest=dest.resolve()
        if not dest.is_relative_to(ROOT) or not dest.is_file():missing.append((name,link,'missing file'));continue
        if download:downloads+=1
        if spl.fragment and dest.suffix=='.html':
            fragment_checks+=1
            target=str(dest.relative_to(ROOT))
            if target not in scans or unquote(spl.fragment) not in scans[target].anchors:missing.append((name,link,'missing anchor'))
    for asset in sc.assets:
        spl=urlsplit(asset)
        if spl.scheme or asset.startswith('//') or asset.startswith('#'):continue
        f=((ROOT/name).parent/unquote(spl.path)).resolve()
        if not f.is_relative_to(ROOT) or not f.is_file():missing.append((name,asset,'missing page asset'))
assert not missing,'Broken targets: '+repr(missing[:25])
assert links>=700 and downloads>=20 and len(pages)==25,(links,downloads,len(pages))
# Validate the whole course catalogue and the actual Arena challenge identifiers, not just their URL shape.
practice=(ROOT/'practice.html').read_text()
assert 'assets/practice.js?v=20261031.90' in practice
source='\n'.join((ROOT/p).read_text() for p in ('assets/practice-data.js','assets/practice-extra.js','assets/python-challenges-v42.js'))
for name,sc in scans.items():
    for url,_,_,_ in sc.links:
        spl=urlsplit(url)
        if spl.path.endswith('practice.html'):
            qs=parse_qs(spl.query)
            for tool in qs.get('tool',[]):assert tool.lower() in ('excel','sql','python'),(name,url)
            for challenge in qs.get('challenge',[]):assert re.search(r'[\'\"]'+re.escape(challenge)+r'[\'\"]',source),(name,url)
# Destination intent and nondecorative/mobile controls
shell=(ROOT/'assets/workspace-shell.js').read_text()
assert "['Practice Arena','practice.html','practice']" in shell
assert "['Practice',root+'practice.html','practice'" in shell
assert "['Practice Studio','studio.html']" in shell
assert "['Python','courses/python.html']" in shell
assert "page==='practice.html'?'practice'" in shell
assert "['Practice',root+'studio.html'" not in shell
assert 'href="practice.html"' in (ROOT/'index.html').read_text()
for name,tool in [('excel','Excel'),('sql','SQL'),('python','Python')]:
    assert f'../practice.html?tool={tool}' in (ROOT/f'courses/{name}.html').read_text()
    assert f'practice.html?tool=' in (ROOT/'assets/learning-experience-v84.js').read_text()
assert 'reflectChallengeUrl()' in (ROOT/'assets/practice.js').read_text()
assert 'restoreChallengeFromHistory' in (ROOT/'assets/practice.js').read_text()
assert 'ensureInitialChallengeUrl' in (ROOT/'assets/practice.js').read_text()
assert "u.searchParams.set('return',location.pathname+location.search+location.hash)" in (ROOT/'assets/auth-gate.js').read_text()
assert 'explainReturnDestination()' in (ROOT/'assets/auth-flow.js').read_text()
assert "url.searchParams.set('return',dest.pathname+dest.search+dest.hash)" in (ROOT/'assets/auth-flow.js').read_text()
assert 'lp-course-cover-link' not in (ROOT/'index.html').read_text()
print(json.dumps({'result':'PASS','routes':len(pages),'authored_links':links,'download_links':downloads,'fragment_links':fragment_checks,'external_urls':len(external),'invalid_local_targets':len(missing)},indent=2))
