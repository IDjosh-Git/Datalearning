from pathlib import Path
import shutil
import sys
from playwright.sync_api import sync_playwright

root = Path(__file__).resolve().parents[1]
url = (root / 'practice.html').as_uri()
widths = [320, 360, 375, 390]

with sync_playwright() as p:
    browser = p.chromium.launch(
        headless=True,
        executable_path=shutil.which('chromium') or shutil.which('chromium-browser'),
        args=['--no-sandbox', '--disable-dev-shm-usage', '--allow-file-access-from-files'],
    )
    page = browser.new_page(viewport={'width': 390, 'height': 844}, reduced_motion='reduce')
    page.goto(url, wait_until='domcontentloaded', timeout=20000)
    page.wait_for_timeout(100)
    for theme in ['light', 'dark']:
        page.evaluate('(t) => document.documentElement.setAttribute("data-theme", t)', theme)
        for width in widths:
            page.set_viewport_size({'width': width, 'height': 640})
            result = page.evaluate('''() => {
              const strip = document.querySelector('.pc-brand-strip');
              if (!strip) return {missing: true};
              const sr = strip.getBoundingClientRect();
              const pills = [...strip.querySelectorAll('.pc-brand-pill')].map(el => {
                const r = el.getBoundingClientRect();
                return {left:r.left, right:r.right, top:r.top, width:r.width, height:r.height, scrollWidth:el.scrollWidth, clientWidth:el.clientWidth};
              });
              return {
                viewport: innerWidth,
                strip: {left:sr.left, right:sr.right, width:sr.width, scrollWidth:strip.scrollWidth, clientWidth:strip.clientWidth},
                pills
              };
            }''')
            assert not result.get('missing'), f'{theme}/{width}: brand strip missing'
            strip = result['strip']
            assert strip['left'] >= -1 and strip['right'] <= width + 1, f'{theme}/{width}: strip leaves viewport: {result}'
            assert strip['scrollWidth'] <= strip['clientWidth'] + 1, f'{theme}/{width}: strip overflows its own container: {result}'
            row_tops = sorted(round(pill['top']) for pill in result['pills'])
            row_count = sum(1 for i, top in enumerate(row_tops) if i == 0 or top - row_tops[i - 1] > 10)
            assert row_count == 1, f'{theme}/{width}: badges do not occupy a single three-column row: {result}'
            assert all(pill['height'] <= 46 for pill in result['pills']), f'{theme}/{width}: a badge card is too tall: {result}'
            hero_height = page.locator('.pc-hero').evaluate('(e) => e.getBoundingClientRect().height')
            height_limit = 190 if width == 320 else 160
            assert hero_height <= height_limit, f'{theme}/{width}: Practice Arena hero is too tall ({hero_height:.0f}px; limit {height_limit}px)'
            for pill in result['pills']:
                assert pill['left'] >= strip['left'] - 1 and pill['right'] <= strip['right'] + 1, f'{theme}/{width}: pill escapes strip: {result}'
                assert pill['scrollWidth'] <= pill['clientWidth'] + 1, f'{theme}/{width}: pill text is clipped: {result}'
    page.evaluate('document.documentElement.style.fontSize = "200%"')
    page.set_viewport_size({'width': 320, 'height': 320})
    zoom = page.evaluate('''() => {
      const heading = document.querySelector('.pc-hero h1');
      const rect = heading.getBoundingClientRect();
      return {documentWidth:document.documentElement.scrollWidth, viewport:innerWidth, right:rect.right, left:rect.left};
    }''')
    assert zoom['documentWidth'] <= zoom['viewport'] + 1, f'200% text at 320px expands page: {zoom}'
    assert zoom['right'] <= zoom['viewport'] + 1, f'200% text at 320px clips the Arena heading: {zoom}'
    browser.close()

print(f'PASS Practice Arena three-column mobile badges: compact single-row cards and hero-height limits pass at {widths}px in light and dark themes; 200% text at 320px stays in viewport')
