from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
URL = (ROOT / 'index.html').as_uri()

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, executable_path='/usr/bin/chromium', args=['--no-sandbox', '--allow-file-access-from-files'])
    page = browser.new_page(viewport={'width': 390, 'height': 844})
    page.goto(URL, wait_until='domcontentloaded')

    for theme in ('light', 'dark'):
        page.evaluate('(t) => document.documentElement.setAttribute("data-theme", t)', theme)
        links = page.locator('.lp-course .lp-studio-cta[href^="studio.html"]')
        assert links.count() == 5, f'{theme}: expected 5 Open Practice Studio course-card links, found {links.count()}'

        styles = links.evaluate_all('''els => els.map(el => {
          const s = getComputedStyle(el);
          return {
            text: el.textContent.trim(),
            href: el.getAttribute('href'),
            background: s.backgroundColor,
            borderTop: s.borderTopWidth,
            borderRight: s.borderRightWidth,
            boxShadow: s.boxShadow,
            padding: s.padding,
            decoration: s.textDecorationLine,
            color: s.color
          };
        })''')
        for style in styles:
            assert style['text'] == 'Open Practice Studio ↗', f'{theme}: unexpected link text changed: {style}'
            assert style['href'].startswith('studio.html?course='), f'{theme}: studio destination changed: {style}'
            assert style['background'] == 'rgba(0, 0, 0, 0)', f'{theme}: background remains behind link: {style}'
            assert style['borderTop'] == '0px' and style['borderRight'] == '0px', f'{theme}: border remains behind link: {style}'
            assert style['boxShadow'] == 'none', f'{theme}: shadow remains behind link: {style}'
            assert style['padding'] == '0px', f'{theme}: button padding remains: {style}'
            assert 'underline' in style['decoration'], f'{theme}: text link has no visible underline: {style}'

    # The standalone practice promo is intentionally unaffected by this change.
    assert page.locator('.ps-home-inner a[href="studio.html?course=excel"]').count() == 1
    python_link = page.locator('.lp-course .lp-studio-cta:not([href^="studio.html"])')
    assert python_link.count() == 1
    assert python_link.inner_text().strip() == 'See practice lessons ↗'
    browser.close()

print('PASS dashboard practice links v103: five course-card studio links are text-only in light/dark modes; targets and other practice links remain intact')
