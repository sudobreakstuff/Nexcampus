# NexCampus Android entry point — uses p4a webview bootstrap
import os, sys, threading, http.server, socket
from pathlib import Path

if 'ANDROID_PRIVATE' in os.environ:
    APP_DIR = Path(os.environ['ANDROID_PRIVATE'])
elif 'ANDROID_ARGUMENT' in os.environ:
    APP_DIR = Path(os.environ['ANDROID_ARGUMENT'])
else:
    APP_DIR = Path(__file__).parent

sys.path.insert(0, str(APP_DIR))

try:
    import server
except Exception as e:
    import traceback
    tb = traceback.format_exc()
    try:
        (APP_DIR / 'crash.log').write_text(f'Import failed: {e}\n{tb}')
    except:
        pass
    raise

server.NOTEBOOK_DIR = APP_DIR / 'notebook_data'
server.NOTES_DIR = APP_DIR / 'notes_data'
server.FONTS_DIR = APP_DIR / 'fonts_data'
server.TEMPLATES_DIR = APP_DIR / 'templates_data'
server.BIBLIOGRAPHY_DIR = APP_DIR / 'bibliography_data'

for d in [server.NOTEBOOK_DIR, server.NOTES_DIR,
          server.FONTS_DIR, server.TEMPLATES_DIR, server.BIBLIOGRAPHY_DIR]:
    d.mkdir(parents=True, exist_ok=True)

server.NexCampusHandler.api_ocr = lambda self, data: self.send_json(
    {'error': 'OCR not available on Android', 'success': False}
)

def main():
    port = 8080
    httpd = http.server.HTTPServer(('127.0.0.1', port), server.NexCampusHandler)
    t = threading.Thread(target=httpd.serve_forever, daemon=True)
    t.start()

if __name__ == '__main__':
    try:
        main()
    except Exception as e:
        import traceback
        try:
            (APP_DIR / 'crash.log').write_text(f'Runtime error: {e}\n{traceback.format_exc()}')
        except:
            pass
        raise
