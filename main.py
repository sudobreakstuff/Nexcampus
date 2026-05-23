# NexCampus Android entry point
import os, sys, threading, http.server
from pathlib import Path

# Android app private directory (writable)
if 'ANDROID_PRIVATE' in os.environ:
    APP_DIR = Path(os.environ['ANDROID_PRIVATE'])
elif 'ANDROID_ARGUMENT' in os.environ:
    APP_DIR = Path(os.environ['ANDROID_ARGUMENT'])
else:
    APP_DIR = Path(__file__).parent

sys.path.insert(0, str(APP_DIR))

# Import server module
import server

# Override data dirs to writable Android paths
server.NOTEBOOK_DIR = APP_DIR / 'notebook_data'
server.NOTES_DIR = APP_DIR / 'notes_data'
server.FONTS_DIR = APP_DIR / 'fonts_data'
server.TEMPLATES_DIR = APP_DIR / 'templates_data'
server.BIBLIOGRAPHY_DIR = APP_DIR / 'bibliography_data'

for d in [server.NOTEBOOK_DIR, server.NOTES_DIR, server.FONTS_DIR,
          server.TEMPLATES_DIR, server.BIBLIOGRAPHY_DIR]:
    d.mkdir(exist_ok=True)

# Disable OCR on Android
server.NexCampusHandler.api_ocr = lambda self, data: self.send_json(
    {'error': 'OCR not available on Android', 'success': False}
)


def main():
    port = server.find_port(8080)
    if port is None:
        return

    httpd = http.server.HTTPServer(('127.0.0.1', port), server.NexCampusHandler)
    t = threading.Thread(target=httpd.serve_forever, daemon=True)
    t.start()

    url = f'http://127.0.0.1:{port}'
    print(f'[NexCampus] Server: {url}')

    import webview
    webview.create_window('NexCampus', url, width=1100, height=750)
    webview.start()


if __name__ == '__main__':
    main()
