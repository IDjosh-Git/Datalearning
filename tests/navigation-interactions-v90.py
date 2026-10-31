"""Isolated DOM interaction checks. Does not claim server navigation or authenticated E2E."""
from pathlib import Path
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parents[1]
script=(root/'assets/workspace-shell.js').read_text()
results=[]
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
    for width in (390,768,1440):
        pg=browser.new_page(viewport={'width':width,'height':850})
        pg.set_content('<!DOCTYPE html><html><head></head><body class="lp-home"><main id="main-content"></main></body></html>')
        errors=[];pg.on('pageerror',lambda e:errors.append(str(e)))
        pg.evaluate('(source)=>{(0,eval)(source)}',script)
        assert pg.locator('.dl-shell').count()==1
        assert pg.locator('.dl-mobile-tabs a').nth(2).get_attribute('href')=='practice.html'
        assert pg.locator('.dl-mobile-tabs a').nth(2).inner_text()=='Practice'
        assert pg.locator('#dlPrimaryNav a').filter(has_text='Practice Arena').count()==1
        assert pg.locator('#dlPrimaryNav a').filter(has_text='Practice Studio').count()==1
        pg.locator('#dlMenuBtn').click()
        assert pg.locator('#dlMenuBtn').get_attribute('aria-expanded')=='true'
        assert pg.locator('#dlPrimaryNav').evaluate('(el)=>el.classList.contains("is-open")')
        if width<=950:assert pg.locator('#dlPrimaryNav').evaluate('(el)=>el.parentElement===document.body')
        pg.keyboard.press('Escape');assert pg.locator('#dlMenuBtn').get_attribute('aria-expanded')=='false'
        pg.locator('#dlSearchBtn').click();assert pg.locator('.dl-command').is_visible()
        pg.locator('#dlQuickInput').fill('Practice Arena')
        link=pg.locator('#dlQuickItems a').first
        assert link.get_attribute('href')=='practice.html'
        pg.keyboard.press('Escape');assert not pg.locator('.dl-command').is_visible()
        # Native keyboard activation must fire the real anchor's click event.
        pg.evaluate('''() => {window._activated=[];document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(a){window._activated.push(a.getAttribute('href'));e.preventDefault();}},true)}''')
        primary=pg.locator('#dlPrimaryNav a').filter(has_text='Practice Arena').first
        primary.focus();pg.keyboard.press('Enter')
        pg.locator('.dl-mobile-tabs a').nth(2).focus();pg.keyboard.press('Enter')
        assert pg.evaluate('window._activated.slice(-2)')==['practice.html','practice.html']

        assert not errors,errors
        results.append(f'{width}px: menu + Escape + Practice link + quick find PASS')
        pg.close()
    browser.close()
for r in results:print(r)
