#!/usr/bin/env python3
"""
NexCampus Screenshot Generator
Captures screenshots of the app for the README using Playwright.

Usage:
    pip install playwright
    playwright install chromium
    python3 install/screenshots.py

Requires NexCampus to be running first:
    python3 server.py &
    sleep 2
    python3 install/screenshots.py
"""

import os, sys, time, json, urllib.request

OUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'screenshots')
BASE_URL = 'http://127.0.0.1:8080'

SHOTS = [
    {'file': 'home.png', 'url': '/', 'selector': '#tab-home', 'wait': 2000},
    {'file': 'studylab.png', 'url': '/', 'selector': '#tab-notebook', 'wait': 1000, 'js': 'switchTab("notebook")'},
    {'file': 'solarsystem.png', 'url': '/', 'selector': '#nb-tool-solar', 'wait': 3000, 'js': 'switchTab("notebook");switchNbTool("solar")'},
    {'file': 'codelab.png', 'url': '/', 'selector': '#tab-codelab', 'wait': 2000, 'js': 'switchTab("codelab")'},
    {'file': 'notes.png', 'url': '/', 'selector': '#nb-tool-notes', 'wait': 1000, 'js': 'switchTab("notebook");switchNbTool("notes")'},
    {'file': 'periodic.png', 'url': '/', 'selector': '#nb-tool-periodic', 'wait': 1000, 'js': 'switchTab("notebook");switchNbTool("periodic")'},
    {'file': 'ocr.png', 'url': '/', 'selector': '#tab-texttools', 'wait': 1000, 'js': 'switchTab("notebook");switchNbTool("ocr")'},
]


def check_server():
    try:
        resp = urllib.request.urlopen(BASE_URL + '/api/version', timeout=3)
        data = json.loads(resp.read())
        print(f'Server OK — v{data.get("version", "?")}')
        return True
    except Exception as e:
        print(f'Server not reachable: {e}')
        return False


def main():
    if not check_server():
        print('Start NexCampus first: python3 server.py &')
        sys.exit(1)

    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print('Install Playwright: pip install playwright && playwright install chromium')
        sys.exit(1)

    os.makedirs(OUT_DIR, exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1280, 'height': 800})

        for shot in SHOTS:
            print(f'Capturing {shot["file"]}...', end=' ', flush=True)
            try:
                page.goto(BASE_URL + shot['url'], wait_until='networkidle')
                time.sleep(1)

                if shot.get('js'):
                    page.evaluate(shot['js'])
                    time.sleep(shot.get('wait', 1000) / 1000)

                selector = shot.get('selector')
                if selector:
                    page.wait_for_selector(selector, timeout=5000)
                    el = page.query_selector(selector)
                    if el:
                        el.screenshot(path=os.path.join(OUT_DIR, shot['file']))
                        sz = os.path.getsize(os.path.join(OUT_DIR, shot['file']))
                        print(f'{sz // 1024} KB')
                else:
                    page.screenshot(path=os.path.join(OUT_DIR, shot['file']), full_page=True)
                    sz = os.path.getsize(os.path.join(OUT_DIR, shot['file']))
                    print(f'{sz // 1024} KB (full page)')

            except Exception as e:
                print(f'FAILED: {e}')

        browser.close()

    print(f'\nScreenshots saved to {OUT_DIR}/')
    print('Add them to README with: ![alt](screenshots/filename.png)')


if __name__ == '__main__':
    main()
