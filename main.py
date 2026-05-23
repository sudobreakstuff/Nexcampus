# NexCampus Android entry point
import os, sys, threading, json, http.server, webbrowser, socket
from pathlib import Path

# Android app private directory (writable)
if 'ANDROID_PRIVATE' in os.environ:
    APP_DIR = Path(os.environ['ANDROID_PRIVATE'])
elif 'ANDROID_ARGUMENT' in os.environ:
    APP_DIR = Path(os.environ['ANDROID_ARGUMENT'])
else:
    APP_DIR = Path(__file__).parent

sys.path.insert(0, str(APP_DIR))

ERROR = None

try:
    import server
except Exception as e:
    import traceback
    ERROR = f'import server failed: {e}\n{traceback.format_exc()}'

# Override data dirs to writable Android paths
server.NOTEBOOK_DIR = APP_DIR / 'notebook_data'
server.NOTES_DIR = APP_DIR / 'notes_data'
server.FONTS_DIR = APP_DIR / 'fonts_data'
server.TEMPLATES_DIR = APP_DIR / 'templates_data'
server.BIBLIOGRAPHY_DIR = APP_DIR / 'bibliography_data'

for d in [server.NOTEBOOK_DIR, server.NOTES_DIR, server.FONTS_DIR,
          server.TEMPLATES_DIR, server.BIBLIOGRAPHY_DIR]:
    d.mkdir(parents=True, exist_ok=True)

# Disable OCR on Android
server.NexCampusHandler.api_ocr = lambda self, data: self.send_json(
    {'error': 'OCR not available on Android', 'success': False}
)


class ErrorHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.end_headers()
        html = f'''<!DOCTYPE html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>NexCampus</title><style>
* {{ margin:0; padding:0; box-sizing:border-box; }}
body {{ background:#0b0f14; color:#d4dcec; font-family:monospace; padding:40px 20px; display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:100vh; }}
h1 {{ color:#4fc3f7; margin-bottom:20px; }}
pre {{ background:#111820; padding:16px; border-radius:4px; border:1px solid #1a2436; font-size:12px; max-width:600px; overflow:auto; white-space:pre-wrap; word-break:break-all; }}
.btn {{ margin-top:20px; padding:10px 24px; background:transparent; color:#4fc3f7; border:1px solid #4fc3f7; font-family:inherit; cursor:pointer; border-radius:4px; }}
.btn:hover {{ background:rgba(79,195,247,0.1); }}
</style></head><body>
<h1>NexCampus</h1>
<div style="color:#f06292;margin-bottom:12px">Error loading application</div>
<pre>{"</pre><pre>".join(ERROR.split("\\n"))}</pre>
<button class="btn" onclick="window.close()">Close</button>
</body></html>'''
        self.wfile.write(html.encode())
    def log_message(self, *a): pass


def safe_main():
    if ERROR:
        port = 8080
        for p in range(port, port + 100):
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            try:
                s.bind(('127.0.0.1', p))
                s.close()
                port = p
                break
            except OSError:
                s.close()
                continue
        else:
            return
        httpd = http.server.HTTPServer(('127.0.0.1', port), ErrorHandler)
        t = threading.Thread(target=httpd.serve_forever, daemon=True)
        t.start()
        import webview
        webview.create_window('NexCampus', f'http://127.0.0.1:{port}', width=1100, height=750)
        webview.start()
        return

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


def main():
    try:
        safe_main()
    except Exception as e:
        import traceback
        msg = f'Runtime error: {e}\n{traceback.format_exc()}'
        try:
            (APP_DIR / 'crash.log').write_text(msg)
        except:
            pass
        # Last resort: open error in browser
        try:
            import webview
            err_html = f'<html><body style="background:#0b0f14;color:#f06292;font-family:monospace;padding:40px"><h1>NexCampus Crash</h1><pre>{msg}</pre></body></html>'
            import base64
            webview.create_window('NexCampus', 'data:text/html;base64,' + base64.b64encode(err_html.encode()).decode(), width=1100, height=750)
            webview.start()
        except:
            pass

if __name__ == '__main__':
    main()
