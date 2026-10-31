"""DOM-based browser smoke check when URL navigation is restricted by the test environment.
This is deliberately NOT a live-site end-to-end test.
"""
from pathlib import Path
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parent.parent
soup=BeautifulSoup((root/'practice.html').read_text(),'html.parser')
script_paths=[]
for tag in list(soup.select('script')):
    src=tag.get('src')
    if src and src.split('?')[0].startswith('assets/') and not any(s in src for s in ('auth-gate.js','server-session.js','supabase-client.js','supabase-config.js')):
        path=root/src.split('?')[0]
        if path.exists():script_paths.append(path)
    tag.decompose()
styles=[]
for tag in list(soup.select('link[rel="stylesheet"]')):
    if tag.attrs is None:continue
    href=tag.get('href','').split('?')[0]
    if href.startswith('assets/') and (root/href).exists():styles.append(root/href)
    tag.decompose()
for tag in list(soup.select('link[rel="preconnect"]')):
    if tag.attrs is not None:tag.decompose()
html=str(soup)
with sync_playwright() as p:
    b=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
    page=b.new_page(viewport={'width':390,'height':844},color_scheme='dark');errors=[]
    page.on('pageerror',lambda e:errors.append(str(e)[:400]))
    page.set_content(html,wait_until='domcontentloaded')
    # Only the minimal layout CSS required for a meaningful mobile visual check.
    for path in styles:
        try:page.add_style_tag(content=path.read_text())
        except Exception as e:print('CSS_ERROR',path.name,str(e)[:200])
    for path in script_paths:
        try:page.add_script_tag(content=path.read_text())
        except Exception as e:print('SCRIPT_ERROR',path.name,str(e)[:220])
    print('scripts loaded',len(script_paths),'runtime errors',errors[:20]);print('tasks',page.locator('#practiceList [data-id]').count())
    print('launchers',page.locator('[data-arena-subject]').count())
    for kind in ['SQL','Excel','Python']:
        try:
            page.locator(f'[data-arena-subject="{kind}"]').click(timeout=3000)
            page.wait_for_timeout(150)
            selected=page.locator('#practiceKind').input_value()
            edit=page.locator('#practiceAnswer').count()
            code=page.locator('#pythonCode').count()
            title=page.locator('#hubActiveTitle').inner_text()
            print('LAUNCH',kind,'selected=',selected,'title=',title,'answer editor=',edit,'python editor=',code,'modal open=',page.locator('#challengeModal').get_attribute('hidden'))
        except Exception as e:print('LAUNCH_ERROR',kind,str(e)[:240])
    print('viewport width',page.evaluate('document.documentElement.scrollWidth'),'client',page.evaluate('document.documentElement.clientWidth'))
    page.screenshot(path='/mnt/data/v92-practice-390-dark-isolated.png',full_page=False)
    b.close()
