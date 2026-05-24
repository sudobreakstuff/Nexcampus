#!/usr/bin/env python3
import http.server, json, sys, os, threading, socket, urllib.request, urllib.error, base64, re, glob, random
from pathlib import Path
from collections import Counter
from io import BytesIO

# Clean up stale PyInstaller temp dirs left from previous runs
if os.path.isdir('/tmp') and getattr(sys, 'frozen', False):
    current_mei = os.path.normpath(sys._MEIPASS) if hasattr(sys, '_MEIPASS') else ''
    import shutil
    for d in glob.glob('/tmp/_MEI*'):
        if os.path.normpath(d) != current_mei and os.path.isdir(d):
            shutil.rmtree(d, ignore_errors=True)

HAS_NUMPY = False
try:
    import numpy as np
    HAS_NUMPY = True
except:
    pass

HAS_PDF = False
try:
    from pypdf import PdfReader
    HAS_PDF = True
except:
    pass

HAS_SKLEARN = False
try:
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.metrics.pairwise import cosine_similarity
    HAS_SKLEARN = True
except:
    pass

HAS_NLTK = False
try:
    import nltk
    from nltk.tokenize import sent_tokenize
    from nltk.corpus import stopwords
    HAS_NLTK = True
except:
    sent_tokenize = None

if getattr(sys, 'frozen', False):
    BASE_DIR = Path(sys._MEIPASS)
    EXE_DIR = Path(sys.executable).parent
else:
    BASE_DIR = Path(__file__).parent
    EXE_DIR = BASE_DIR

# Use proper app data directory to avoid clutter where exe is placed
if 'ANDROID_PRIVATE' in os.environ:
    DATA_DIR = Path(os.environ['ANDROID_PRIVATE'])
elif 'ANDROID_ARGUMENT' in os.environ:
    DATA_DIR = Path(os.environ['ANDROID_ARGUMENT'])
elif getattr(sys, 'frozen', False) and sys.platform == 'win32':
    DATA_DIR = Path(os.environ.get('APPDATA', str(EXE_DIR))) / 'NexCampus'
elif getattr(sys, 'frozen', False):
    DATA_DIR = Path(os.environ.get('XDG_DATA_HOME', Path.home() / '.local' / 'share')) / 'nexcampus'
else:
    DATA_DIR = EXE_DIR
DATA_DIR.mkdir(parents=True, exist_ok=True)

STATIC_DIR = BASE_DIR / "static"
VERSION_FILE = STATIC_DIR / "version.json"
NOTEBOOK_DIR = DATA_DIR / "notebook_data"
NOTES_DIR = DATA_DIR / "notes_data"
FONTS_DIR = DATA_DIR / "fonts_data"
TEMPLATES_DIR = DATA_DIR / "templates_data"
BIBLIOGRAPHY_DIR = DATA_DIR / "bibliography_data"
NOTEBOOK_DIR.mkdir(exist_ok=True)
NOTES_DIR.mkdir(exist_ok=True)
FONTS_DIR.mkdir(exist_ok=True)
TEMPLATES_DIR.mkdir(exist_ok=True)
BIBLIOGRAPHY_DIR.mkdir(exist_ok=True)

# Create desktop shortcut on Windows (frozen/onefile)
if getattr(sys, 'frozen', False) and sys.platform == 'win32':
    try:
        desktop = Path(os.environ.get('USERPROFILE', '')) / 'Desktop' / 'NexCampus.lnk'
        if not desktop.exists():
            import subprocess
            ps_script = f'''
$ws = New-Object -ComObject WScript.Shell
$s = $ws.CreateShortcut("{desktop}")
$s.TargetPath = "{sys.executable}"
$s.WorkingDirectory = "{EXE_DIR}"
$s.Description = "NexCampus - Offline Student Toolkit"
$s.Save()
'''
            subprocess.run(['powershell', '-NoProfile', '-Command', ps_script],
                capture_output=True, timeout=10)
    except:
        pass

def load_version():
    try:
        with open(VERSION_FILE) as f:
            return json.load(f)
    except:
        return {'version': '0.0.0', 'update_url': ''}

VERSION = load_version()

# Load dictionary (lazy)
DICTIONARY = {}
DICTIONARY_LOADED = False
def load_dictionary():
    global DICTIONARY, DICTIONARY_LOADED
    if DICTIONARY_LOADED:
        return
    try:
        dict_path = STATIC_DIR / "dictionary.json"
        if dict_path.exists():
            with open(dict_path, 'r', encoding='utf-8') as f:
                DICTIONARY = json.load(f)
            print(f'[NexCampus] Loaded dictionary: {len(DICTIONARY)} words')
        DICTIONARY_LOADED = True
    except Exception as e:
        print(f'[NexCampus] Failed to load dictionary: {e}')
        DICTIONARY_LOADED = True

# Lazy load on first request instead of at import time
# load_dictionary()
PLATFORM = 'windows' if sys.platform == 'win32' else 'linux'

STOP_WORDS = frozenset({
    'the','a','an','and','or','but','in','on','at','to','for','of','by','with',
    'is','are','was','were','be','been','have','has','had','do','does','did',
    'will','would','could','should','may','might','this','that','these','those',
    'i','you','he','she','it','we','they','not','so','very','just','also','more',
    'no','nor','if','as','up','down','out','off','over','under','again','further',
    'then','once','here','there','all','each','every','both','few','most','own',
    'same','such','than','too','can','shall','about','into','through','during',
    'before','after','above','below','between','because','although','since',
    'while','only','why','what','which','who','whom','when','where','how'
})

TEXT_EXTS = ('.txt', '.md', '.pdf')

def extract_pdf_text(raw_bytes):
    try:
        reader = PdfReader(BytesIO(raw_bytes))
        pages = []
        for page in reader.pages:
            t = page.extract_text()
            if t:
                pages.append(t)
        return '\n\n'.join(pages)
    except:
        return None

def split_sentences(text):
    if HAS_NLTK and callable(sent_tokenize):
        try:
            sents = [s.strip() for s in sent_tokenize(text) if len(s.strip()) > 10]
            if len(sents) >= 2:
                return _filter_sentences(sents)
        except:
            pass
    sents = [s.strip() for s in re.split(r'(?<=[.!?])\s+', text) if len(s.strip()) > 10]
    return _filter_sentences(sents)

def _filter_sentences(sentences):
    cleaned = []
    for s in sentences:
        s = s.strip()
        if len(s) < 12:
            continue
        # Skip if too many non-alphanumeric chars (likely code, data tables)
        alpha = sum(1 for c in s if c.isalnum() or c.isspace())
        if len(s) > 0 and alpha / len(s) < 0.55:
            continue
        # Skip if starts with a digit/symbol in a way that suggests code
        if re.match(r'^[\d\W]{2,}', s):
            continue
        # Skip single words or fragments
        if len(s.split()) < 3:
            continue
        cleaned.append(s)
    return cleaned

def make_plain(text):
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

class NexCampusHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(BASE_DIR), **kwargs)

    def do_GET(self):
        if self.path == '/api/version':
            self.send_json(VERSION)
            return
        if self.path.startswith('/api/update/check'):
            self.api_check_update()
            return
        if self.path == '/api/notebook/documents':
            self.api_notebook_list()
            return
        if self.path.startswith('/api/notebook/document?'):
            qs = self.path.split('?', 1)[1] if '?' in self.path else ''
            params = {}
            for item in qs.split('&'):
                if '=' in item:
                    k, v = item.split('=', 1)
                    if k:
                        from urllib.parse import unquote
                        params[k] = unquote(v)
            doc_id = params.get('id')
            if doc_id:
                self.api_notebook_get_content(doc_id)
            else:
                self.send_json({'error': 'Missing id parameter', 'success': False}, 400)
            return
        if self.path == '/api/notes/list':
            self.api_notes_list()
            return
        if self.path.startswith('/api/notes/load?'):
            qs = self.path.split('?', 1)[1] if '?' in self.path else ''
            params = {}
            for item in qs.split('&'):
                if '=' in item:
                    k, v = item.split('=', 1)
                    if k:
                        params[k] = v
            name = params.get('name')
            if name:
                self.api_notes_load(name)
            else:
                self.send_json({'error': 'Missing name parameter', 'success': False}, 400)
            return
        if self.path == '/api/fonts/list':
            self.api_fonts_list()
            return
        if self.path.startswith('/api/fonts/download?'):
            qs = self.path.split('?', 1)[1] if '?' in self.path else ''
            params = {}
            for item in qs.split('&'):
                if '=' in item:
                    k, v = item.split('=', 1)
                    if k:
                        from urllib.parse import unquote
                        params[k] = unquote(v)
            name = params.get('name')
            if name:
                self.api_fonts_download(name)
            else:
                self.send_json({'error': 'Missing name', 'success': False}, 400)
            return
        if self.path == '/api/templates/list':
            self.api_templates_list()
            return
        if self.path.startswith('/api/templates/load?'):
            qs = self.path.split('?', 1)[1] if '?' in self.path else ''
            params = {}
            for item in qs.split('&'):
                if '=' in item:
                    k, v = item.split('=', 1)
                    if k:
                        params[k] = v
            name = params.get('name')
            if name:
                self.api_templates_load(name)
            else:
                self.send_json({'error': 'Missing name', 'success': False}, 400)
            return
        if self.path.startswith('/api/dictionary/lookup'):
            qs = self.path.split('?', 1)[1] if '?' in self.path else ''
            params = {}
            for item in qs.split('&'):
                if '=' in item:
                    k, v = item.split('=', 1)
                    if k:
                        from urllib.parse import unquote
                        params[k] = unquote(v)
            word = params.get('word', '').strip().lower()
            self.api_dictionary_lookup(word)
            return
        super().do_GET()

    def do_POST(self):
        length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(length).decode('utf-8') if length else '{}'
        data = json.loads(body) if body else {}
        path = self.path
        handlers = {
            '/api/notebook/upload': self.api_notebook_upload,
            '/api/notebook/addtext': self.api_notebook_addtext,
            '/api/notebook/delete': self.api_notebook_delete,
            '/api/notebook/deleteall': self.api_notebook_deleteall,
            '/api/notebook/query': self.api_notebook_query,
            '/api/notebook/summarize': self.api_notebook_summarize,
            '/api/notebook/quiz': self.api_notebook_quiz,
            '/api/notebook/flashcards': self.api_notebook_flashcards,
            '/api/notes/import': self.api_notes_import,
            '/api/notes/save': self.api_notes_save,
            '/api/notes/delete': self.api_notes_delete,
            '/api/notes/rename': self.api_notes_rename,
            '/api/fonts/upload': self.api_fonts_upload,
            '/api/fonts/delete': self.api_fonts_delete,
            '/api/templates/save': self.api_templates_save,
            '/api/templates/delete': self.api_templates_delete,
            '/api/templates/rename': self.api_templates_rename,
            '/api/notebook/merge': self.api_notebook_merge,
            '/api/notebook/vocabulary': self.api_notebook_vocabulary,
            '/api/notebook/outline': self.api_notebook_outline,
            '/api/notebook/diff': self.api_notebook_diff,
            '/api/ocr': self.api_ocr,
            '/api/bibliography/save': self.api_bibliography_save,
            '/api/bibliography/load': self.api_bibliography_load,
        }
        handler = handlers.get(path)
        if handler:
            handler(data)
        else:
            self.send_json({'error': 'not found'}, 404)

    def send_json(self, data, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))

    def log_message(self, format, *args):
        if '/favicon.ico' in str(args[0]):
            return
        super().log_message(format, *args)

    def api_check_update(self):
        BINARY_NAME = 'NexCampus-windows.exe' if PLATFORM == 'windows' else 'NexCampus-linux'
        try:
            req = urllib.request.Request(
                'https://api.github.com/repos/sudobreakstuff/Nexcampus/releases/latest',
                headers={'User-Agent': 'NexCampus/2.0', 'Accept': 'application/vnd.github.v3+json'}
            )
            with urllib.request.urlopen(req, timeout=10) as resp:
                release = json.loads(resp.read())
            current = VERSION.get('version', '0.0.0')
            remote_ver = release.get('tag_name', '').lstrip('v')
            has_update = self._compare_versions(remote_ver, current)
            download_url = ''
            for asset in release.get('assets', []):
                if asset['name'] == BINARY_NAME:
                    download_url = asset['browser_download_url']
                    break
            body = release.get('body', '')
            changelog = [l.strip('- ').strip() for l in body.split('\n') if l.strip().startswith('-')] if body else []
            self.send_json({
                'current_version': current,
                'remote_version': remote_ver,
                'has_update': has_update,
                'download_url': download_url,
                'release_notes_url': release.get('html_url', ''),
                'changelog': changelog,
                'success': True
            })
        except Exception as e:
            self.send_json({'error': str(e), 'success': False, 'current_version': VERSION.get('version', '0.0.0')})

    @staticmethod
    def _compare_versions(remote, current):
        try:
            r = tuple(int(x) for x in remote.split('.'))
            c = tuple(int(x) for x in current.split('.'))
            return r > c
        except:
            return False

    # --- Notebook API ---

    def api_notebook_list(self, data=None):
        docs = []
        for f in sorted(NOTEBOOK_DIR.iterdir()):
            if f.suffix in TEXT_EXTS:
                docs.append({
                    'id': f.stem,
                    'name': f.name,
                    'size': f.stat().st_size,
                    'modified': f.stat().st_mtime,
                })
        self.send_json({'documents': docs, 'success': True})

    def api_notebook_get_content(self, doc_id):
        for f in NOTEBOOK_DIR.iterdir():
            if f.stem == doc_id:
                try:
                    content = f.read_text(encoding='utf-8')
                    self.send_json({'id': doc_id, 'name': f.name, 'content': content, 'success': True})
                except Exception as e:
                    self.send_json({'error': str(e), 'success': False}, 500)
                return
        self.send_json({'error': 'Document not found', 'success': False}, 404)

    def api_notebook_upload(self, data):
        name = data.get('name', '').strip()
        content_b64 = data.get('content', '')
        if not name or not content_b64:
            self.send_json({'error': 'Name and content required', 'success': False}, 400)
            return
        try:
            raw = base64.b64decode(content_b64)
        except:
            self.send_json({'error': 'Invalid base64 encoding', 'success': False}, 400)
            return
        ext = Path(name).suffix.lower()
        is_pdf = ext == '.pdf'
        if is_pdf:
            if not HAS_PDF:
                self.send_json({'error': 'PDF support requires pypdf library.', 'success': False}, 400)
                return
            content = extract_pdf_text(raw)
            if content is None or not content.strip():
                self.send_json({'error': 'Could not extract text from this PDF. It may be scanned or image-based.', 'success': False}, 400)
                return
        else:
            if b'\x00' in raw:
                self.send_json({'error': 'Binary files are not supported. Upload plain text (.txt, .md) or PDF only.', 'success': False}, 400)
                return
            try:
                content = raw.decode('utf-8')
            except UnicodeDecodeError:
                self.send_json({'error': 'File is not valid UTF-8 text. Upload .txt, .md, or .pdf files only.', 'success': False}, 400)
                return
            if content.count('\ufffd') > max(5, len(content) * 0.01):
                self.send_json({'error': 'File appears to be binary data, not plain text.', 'success': False}, 400)
                return
        safe_name = re.sub(r'[^a-zA-Z0-9._-]', '_', name)
        if not safe_name.endswith('.txt'):
            safe_name = safe_name.rsplit('.', 1)[0] + '.txt'
        path = NOTEBOOK_DIR / safe_name
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        self.send_json({'id': path.stem, 'name': path.name, 'success': True})

    def api_notebook_addtext(self, data):
        text = data.get('text', '').strip()
        if not text:
            self.send_json({'error': 'Text content required', 'success': False}, 400)
            return
        if '\x00' in text:
            self.send_json({'error': 'Pasted content contains binary data.', 'success': False}, 400)
            return
        non_printable = sum(1 for c in text if ord(c) < 32 and ord(c) not in (9, 10, 13))
        if non_printable > len(text) * 0.05:
            self.send_json({'error': 'Pasted content appears to be binary data, not plain text.', 'success': False}, 400)
            return
        count = len(list(NOTEBOOK_DIR.iterdir()))
        name = f'pasted-{count+1}.txt'
        path = NOTEBOOK_DIR / name
        path.write_text(text, encoding='utf-8')
        self.send_json({'id': path.stem, 'name': path.name, 'success': True})

    def api_notebook_delete(self, data):
        doc_id = data.get('id', '')
        if not doc_id:
            self.send_json({'error': 'Document ID required', 'success': False}, 400)
            return
        for f in NOTEBOOK_DIR.iterdir():
            if f.stem == doc_id:
                f.unlink()
                self.send_json({'success': True})
                return
        self.send_json({'error': 'Document not found', 'success': False}, 404)

    def api_notebook_deleteall(self, data):
        count = 0
        for f in NOTEBOOK_DIR.iterdir():
            if f.suffix in TEXT_EXTS:
                f.unlink()
                count += 1
        self.send_json({'success': True, 'deleted': count})

    def api_notes_import(self, data):
        name = data.get('name', '').strip()
        content_b64 = data.get('content', '')
        if not name or not content_b64:
            self.send_json({'error': 'Name and content required', 'success': False}, 400)
            return
        try:
            raw = base64.b64decode(content_b64)
        except:
            self.send_json({'error': 'Invalid base64 encoding', 'success': False}, 400)
            return
        ext = Path(name).suffix.lower()
        if ext == '.pdf':
            if not HAS_PDF:
                self.send_json({'error': 'PDF support requires pypdf library.', 'success': False}, 400)
                return
            text = extract_pdf_text(raw)
            if text is None or not text.strip():
                self.send_json({'error': 'Could not extract text from this PDF.', 'success': False}, 400)
                return
        else:
            try:
                text = raw.decode('utf-8')
            except UnicodeDecodeError:
                self.send_json({'error': 'File is not valid UTF-8 text.', 'success': False}, 400)
                return
        self.send_json({'name': name, 'content': text, 'success': True})

    def api_notes_list(self):
        notes = []
        if NOTES_DIR.exists():
            for f in sorted(NOTES_DIR.iterdir()):
                if f.suffix == '.json':
                    try:
                        data = json.loads(f.read_text('utf-8'))
                        notes.append({'name': data.get('name', f.stem), 'modified': f.stat().st_mtime})
                    except:
                        pass
        self.send_json({'notes': notes, 'success': True})

    def api_notes_load(self, name):
        safe = re.sub(r'[^a-zA-Z0-9._-]', '_', name)
        path = NOTES_DIR / f'{safe}.json'
        if path.exists():
            try:
                data = json.loads(path.read_text('utf-8'))
                self.send_json({'name': data.get('name', name), 'content': data.get('content', ''), 'success': True})
            except Exception as e:
                self.send_json({'error': str(e), 'success': False}, 500)
        else:
            self.send_json({'error': 'Note not found', 'success': False}, 404)

    def api_notes_save(self, data):
        name = data.get('name', '').strip()
        content = data.get('content', '')
        if not name:
            self.send_json({'error': 'Name required', 'success': False}, 400)
            return
        safe = re.sub(r'[^a-zA-Z0-9._-]', '_', name)
        path = NOTES_DIR / f'{safe}.json'
        try:
            path.write_text(json.dumps({'name': name, 'content': content}), 'utf-8')
            self.send_json({'name': name, 'success': True})
        except Exception as e:
            self.send_json({'error': str(e), 'success': False}, 500)

    def api_notes_delete(self, data):
        name = data.get('name', '').strip()
        if not name:
            self.send_json({'error': 'Name required', 'success': False}, 400)
            return
        safe = re.sub(r'[^a-zA-Z0-9._-]', '_', name)
        path = NOTES_DIR / f'{safe}.json'
        if path.exists():
            path.unlink()
        self.send_json({'success': True})

    def api_notes_rename(self, data):
        old_name = data.get('old_name', '').strip()
        new_name = data.get('new_name', '').strip()
        if not old_name or not new_name:
            self.send_json({'error': 'Both old and new name required', 'success': False}, 400)
            return
        old_safe = re.sub(r'[^a-zA-Z0-9._-]', '_', old_name)
        new_safe = re.sub(r'[^a-zA-Z0-9._-]', '_', new_name)
        old_path = NOTES_DIR / f'{old_safe}.json'
        new_path = NOTES_DIR / f'{new_safe}.json'
        if not old_path.exists():
            self.send_json({'error': 'Note not found', 'success': False}, 404)
            return
        try:
            data = json.loads(old_path.read_text('utf-8'))
            data['name'] = new_name
            new_path.write_text(json.dumps(data), 'utf-8')
            old_path.unlink()
            self.send_json({'name': new_name, 'success': True})
        except Exception as e:
            self.send_json({'error': str(e), 'success': False}, 500)

    # --- Fonts ---
    FONT_EXTENSIONS = {'.ttf', '.otf', '.woff', '.woff2'}

    def api_fonts_list(self):
        fonts = []
        for f in sorted(FONTS_DIR.iterdir()):
            if f.suffix.lower() in self.FONT_EXTENSIONS:
                fonts.append({'name': f.name, 'size': f.stat().st_size})
        self.send_json({'fonts': fonts, 'success': True})

    def api_fonts_download(self, name):
        safe_name = re.sub(r'[^a-zA-Z0-9._-]', '_', name)
        path = FONTS_DIR / safe_name
        if not path.exists() or path.suffix.lower() not in self.FONT_EXTENSIONS:
            self.send_json({'error': 'Font not found'}, 404)
            return
        mime = {
            '.ttf': 'font/ttf', '.otf': 'font/otf',
            '.woff': 'font/woff', '.woff2': 'font/woff2'
        }.get(path.suffix.lower(), 'application/octet-stream')
        self.send_response(200)
        self.send_header('Content-Type', mime)
        self.send_header('Content-Length', str(path.stat().st_size))
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(path.read_bytes())

    def api_fonts_upload(self, data):
        name = data.get('name', '').strip()
        content_b64 = data.get('content', '')
        if not name or not content_b64:
            self.send_json({'error': 'Name and content required', 'success': False}, 400)
            return
        ext = Path(name).suffix.lower()
        if ext not in self.FONT_EXTENSIONS:
            self.send_json({'error': 'Unsupported font format. Use .ttf, .otf, .woff, or .woff2', 'success': False}, 400)
            return
        try:
            raw = base64.b64decode(content_b64)
        except:
            self.send_json({'error': 'Invalid encoding', 'success': False}, 400)
            return
        safe = re.sub(r'[^a-zA-Z0-9._-]', '_', name)
        path = FONTS_DIR / safe
        path.write_bytes(raw)
        self.send_json({'name': safe, 'success': True})

    def api_fonts_delete(self, data):
        name = data.get('name', '').strip()
        if not name:
            self.send_json({'error': 'Name required', 'success': False}, 400)
            return
        safe = re.sub(r'[^a-zA-Z0-9._-]', '_', name)
        path = FONTS_DIR / safe
        if path.exists():
            path.unlink()
        self.send_json({'success': True})

    # --- Templates ---
    def api_templates_list(self):
        templates = []
        for f in sorted(TEMPLATES_DIR.iterdir()):
            if f.suffix == '.json':
                try:
                    d = json.loads(f.read_text('utf-8'))
                    templates.append({'name': d.get('name', f.stem), 'modified': f.stat().st_mtime})
                except:
                    pass
        self.send_json({'templates': templates, 'success': True})

    def api_templates_load(self, name):
        safe = re.sub(r'[^a-zA-Z0-9._-]', '_', name)
        path = TEMPLATES_DIR / f'{safe}.json'
        if path.exists():
            try:
                d = json.loads(path.read_text('utf-8'))
                self.send_json({'name': d.get('name', name), 'content': d.get('content', ''), 'success': True})
            except Exception as e:
                self.send_json({'error': str(e), 'success': False}, 500)
        else:
            self.send_json({'error': 'Template not found', 'success': False}, 404)

    def api_dictionary_lookup(self, word):
        if not word:
            self.send_json({'error': 'No word provided', 'success': False}, 400)
            return
        load_dictionary()
        defn = DICTIONARY.get(word)
        if defn:
            self.send_json({'word': word, 'definition': defn, 'found': True, 'success': True})
        else:
            # Fuzzy search: check if word exists as substring
            matches = []
            for w in DICTIONARY:
                if word in w:
                    matches.append(w)
                    if len(matches) >= 20:
                        break
            self.send_json({'word': word, 'found': False, 'suggestions': matches, 'success': True})

    def api_templates_save(self, data):
        name = data.get('name', '').strip()
        content = data.get('content', '')
        if not name:
            self.send_json({'error': 'Name required', 'success': False}, 400)
            return
        safe = re.sub(r'[^a-zA-Z0-9._-]', '_', name)
        path = TEMPLATES_DIR / f'{safe}.json'
        try:
            path.write_text(json.dumps({'name': name, 'content': content}), 'utf-8')
            self.send_json({'name': name, 'success': True})
        except Exception as e:
            self.send_json({'error': str(e), 'success': False}, 500)

    def api_templates_delete(self, data):
        name = data.get('name', '').strip()
        if not name:
            self.send_json({'error': 'Name required', 'success': False}, 400)
            return
        safe = re.sub(r'[^a-zA-Z0-9._-]', '_', name)
        path = TEMPLATES_DIR / f'{safe}.json'
        if path.exists():
            path.unlink()
        self.send_json({'success': True})

    def api_templates_rename(self, data):
        old = data.get('old_name', '').strip()
        new = data.get('new_name', '').strip()
        if not old or not new:
            self.send_json({'error': 'Old and new name required', 'success': False}, 400)
            return
        old_safe = re.sub(r'[^a-zA-Z0-9._-]', '_', old)
        new_safe = re.sub(r'[^a-zA-Z0-9._-]', '_', new)
        old_path = TEMPLATES_DIR / f'{old_safe}.json'
        new_path = TEMPLATES_DIR / f'{new_safe}.json'
        if not old_path.exists():
            self.send_json({'error': 'Template not found', 'success': False}, 404)
            return
        try:
            d = json.loads(old_path.read_text('utf-8'))
            d['name'] = new
            new_path.write_text(json.dumps(d), 'utf-8')
            old_path.unlink()
            self.send_json({'name': new, 'success': True})
        except Exception as e:
            self.send_json({'error': str(e), 'success': False}, 500)

    # --- Tool: Document Merger ---
    def api_notebook_merge(self, data):
        doc_names = data.get('documents', [])
        if not doc_names:
            self.send_json({'error': 'No documents specified', 'success': False}, 400)
            return
        docs = self._load_all_docs()
        parts = []
        for name in doc_names:
            if name in docs:
                parts.append('--- ' + name + ' ---\n' + docs[name])
        if not parts:
            self.send_json({'error': 'None of the specified documents found', 'success': False}, 404)
            return
        self.send_json({'text': '\n\n'.join(parts), 'success': True})

    # --- Tool: Vocabulary Builder ---
    STOPWORDS = frozenset()
    @classmethod
    def _init_stopwords(cls):
        if cls.STOPWORDS:
            return
        try:
            import nltk
            from nltk.corpus import stopwords
            cls.STOPWORDS = frozenset(stopwords.words('english'))
        except:
            basic = {'the','a','an','and','or','but','in','on','at','to','for','of','with','by','from','is','are','was','were','be','been','being','have','has','had','do','does','did','will','would','could','should','may','might','shall','can','need','dare','ought','used','it','its','i','you','he','she','we','they','them','their','this','that','these','those','some','any','all','each','every','no','none','not','only','own','same','so','than','too','very','just','because','as','until','while','about','between','through','during','before','after','above','below','up','down','out','off','over','under','again','further','then','once','here','there','when','where','why','how','what','which','who','whom'}
            cls.STOPWORDS = frozenset(basic)

    def api_notebook_vocabulary(self, data):
        text = data.get('text', '').strip()
        if not text:
            docs = self._load_all_docs()
            text = '\n'.join(docs.values())
        if not text.strip():
            self.send_json({'error': 'No text to analyze', 'success': False}, 400)
            return
        self._init_stopwords()
        words = re.findall(r'[a-zA-Z]{3,}', text.lower())
        total = len(words)
        if not total:
            self.send_json({'error': 'No words found', 'success': False}, 400)
            return
        from collections import Counter
        freq = Counter(words)
        rare = [w for w, c in freq.most_common() if c <= max(2, total // 100) and w not in self.STOPWORDS]
        if HAS_SKLEARN and total >= 10:
            try:
                vectorizer = TfidfVectorizer(stop_words='english', max_features=500, max_df=0.9, min_df=1)
                tfidf = vectorizer.fit_transform([text])
                import numpy as np
                names = vectorizer.get_feature_names_out()
                scores = np.array(tfidf.sum(axis=0)).flatten()
                ranked = sorted(zip(names, scores), key=lambda x: -x[1])
                top_vocab = [w for w, s in ranked[:60] if w not in self.STOPWORDS and w in freq]
                rare = top_vocab[:40]
            except:
                pass
        rare = sorted(set(rare))[:50]
        self.send_json({'words': rare, 'total_words': total, 'unique_words': len(freq), 'success': True})

    # --- Tool: Outline Generator ---
    def api_notebook_outline(self, data):
        text = data.get('text', '').strip()
        if not text:
            docs = self._load_all_docs()
            text = '\n'.join(docs.values())
        if not text.strip():
            self.send_json({'error': 'No text to analyze', 'success': False}, 400)
            return
        import difflib
        lines = text.split('\n')
        headings = []
        key_sentences = []
        for line in lines:
            stripped = line.strip()
            if not stripped:
                continue
            if re.match(r'^#{1,3}\s', stripped):
                level = len(re.match(r'^#+', stripped).group())
                headings.append({'level': level, 'text': re.sub(r'^#+\s*', '', stripped)})
            elif stripped.isupper() and len(stripped) > 3 and len(stripped) < 100:
                headings.append({'level': 2, 'text': stripped})
            elif stripped.endswith(('.', '!', '?')) and len(stripped) > 30:
                if re.match(r'^(this|the|a|an|in|on|at|to|for|our|we|it|they)', stripped, re.I):
                    key_sentences.append(stripped)
        top_sentences = key_sentences[:10]
        self.send_json({'headings': headings, 'key_sentences': top_sentences, 'success': True})

    # --- Tool: Document Diff ---
    def api_notebook_diff(self, data):
        text1 = data.get('text1', '')
        text2 = data.get('text2', '')
        if not text1 or not text2:
            self.send_json({'error': 'Both text1 and text2 required', 'success': False}, 400)
            return
        import difflib
        lines1 = text1.splitlines(keepends=True)
        lines2 = text2.splitlines(keepends=True)
        diff = difflib.unified_diff(lines1, lines2, fromfile='Original', tofile='Modified', lineterm='')
        result = ''.join(diff)
        html_diff = difflib.HtmlDiff().make_table(lines1, lines2, 'Original', 'Modified', context=True, numlines=2)
        self.send_json({'diff': result, 'html_diff': html_diff, 'success': True})

    # --- Q&A (TF-IDF ranked) ---
    def api_notebook_query(self, data):
        message = data.get('message', '').strip()
        if not message:
            self.send_json({'response': 'Please enter a question.', 'success': False}, 400)
            return
        docs_text = self._load_all_docs()
        if not docs_text:
            self.send_json({'response': 'No documents in your notebook. Upload some sources first!', 'success': True, 'sources': []})
            return
        all_sentences = []
        sent_to_doc = {}
        for doc_name, text in docs_text.items():
            sents = split_sentences(text)
            for s in sents:
                all_sentences.append(s)
                sent_to_doc[s] = doc_name
        if not all_sentences:
            self.send_json({'response': 'Your documents appear to contain no readable sentences.', 'success': True, 'sources': []})
            return
        # Score sentences by TF-IDF cosine similarity to query
        query_words = set(re.findall(r'\w+', message.lower()))
        if not query_words:
            self.send_json({'response': 'I couldn\'t understand your question. Try rephrasing.', 'success': True, 'sources': []})
            return
        if HAS_SKLEARN and len(all_sentences) >= 2:
            try:
                vectorizer = TfidfVectorizer(stop_words='english', max_features=5000)
                tfidf = vectorizer.fit_transform(all_sentences + [message])
                sims = cosine_similarity(tfidf[-1:], tfidf[:-1]).flatten()
                ranked = sorted(
                    [(sims[i], all_sentences[i], sent_to_doc[all_sentences[i]]) for i in range(len(all_sentences))],
                    key=lambda x: -x[0]
                )
                top = ranked[:5]
            except:
                top = self._keyword_rank(all_sentences, sent_to_doc, query_words)
        else:
            top = self._keyword_rank(all_sentences, sent_to_doc, query_words)
        top = [(s, d) for _, s, d in top if _ > 0.01]
        if not top:
            self.send_json({'response': 'I couldn\'t find anything about that in your documents. Try rephrasing or uploading more sources.', 'success': True, 'sources': []})
            return
        answer_parts, sources = [], []
        seen = set()
        for sent, doc_name in top:
            key = (doc_name, sent[:60])
            if key not in seen:
                seen.add(key)
                answer_parts.append(sent)
                if doc_name not in sources:
                    sources.append(doc_name)
        answer = '\n\n'.join(answer_parts)
        self.send_json({'response': answer, 'success': True, 'sources': sources})

    def _keyword_rank(self, sentences, sent_to_doc, query_words):
        scored = []
        for s in sentences:
            words = set(re.findall(r'\w+', s.lower()))
            matches = len(words & query_words)
            if matches:
                scored.append((matches / max(len(query_words), 1), s, sent_to_doc.get(s, '')))
        scored.sort(key=lambda x: -x[0])
        return scored[:5]

    # --- Summarize (TextRank) ---
    def api_notebook_summarize(self, data):
        docs_text = self._load_all_docs()
        if not docs_text:
            self.send_json({'response': 'No documents to summarize.', 'success': True})
            return
        num_sentences = int(data.get('num_sentences', 5))
        num_sentences = max(1, min(num_sentences, 20))
        max_words = int(data.get('max_words', 0))
        combined = '\n\n'.join(docs_text.values())
        sentences = split_sentences(combined)
        # Fallback if too few sentences
        if len(sentences) < 4:
            words = re.findall(r'\S+', combined)
            if len(words) > 60:
                sentences = [' '.join(words[i:i+30]) for i in range(0, len(words), 15)]
            else:
                sentences = [combined]
        if len(sentences) < 2:
            resp = sentences[0][:2000]
            self.send_json({'response': resp, 'success': True, 'sources': list(docs_text.keys())})
            return
        top_n = min(num_sentences, max(1, len(sentences) // 2))
        summary = self._textrank(sentences, top_n)
        if max_words > 0:
            words = summary.split()
            if len(words) > max_words:
                summary = ' '.join(words[:max_words]) + '...'
        if len(summary) > 3000:
            summary = summary[:3000] + '...'
        self.send_json({'response': summary, 'success': True, 'sources': list(docs_text.keys())})

    def _textrank(self, sentences, top_n):
        # Deduplicate near-identical sentences
        seen = set()
        unique = []
        for s in sentences:
            key = re.sub(r'\W+', '', s.lower())[:40]
            if key not in seen:
                seen.add(key)
                unique.append(s)
        if len(unique) < 2:
            return unique[0] if unique else ''
        sentences = unique
        if HAS_SKLEARN and len(sentences) >= 3:
            try:
                vectorizer = TfidfVectorizer(stop_words='english', max_features=2000, max_df=0.85)
                tfidf = vectorizer.fit_transform(sentences)
                sim = cosine_similarity(tfidf)
                n = len(sim)
                d = 0.85
                scores = np.ones(n) / n
                for _ in range(50):
                    scores = (1 - d) / n + d * sim.T.dot(scores)
                    scores = scores / scores.sum()
                top_idx = set(np.argsort(-scores)[:top_n])
                ordered = [sentences[i] for i in range(n) if i in top_idx]
                return ' '.join(ordered)
            except:
                pass
        return self._freq_summary(sentences, top_n)

    def _freq_summary(self, sentences, top_n):
        words = re.findall(r'\w+', ' '.join(sentences).lower())
        freq = Counter(w for w in words if len(w) > 2 and w not in STOP_WORDS)
        scored = [(s, sum(freq.get(w.lower(), 0) for w in re.findall(r'\w+', s))) for s in sentences]
        sorted_s = sorted(scored, key=lambda x: -x[1])
        top_texts = {s[0] for s in sorted_s[:top_n]}
        ordered = [s for s in sentences if s in top_texts]
        return ' '.join(ordered)

    # --- Quiz (MCQ generation) ---
    def api_notebook_quiz(self, data):
        docs_text = self._load_all_docs()
        if not docs_text:
            self.send_json({'response': [], 'success': True})
            return
        num_questions = int(data.get('count', 8))
        num_questions = max(1, min(num_questions, 30))
        combined = '\n'.join(docs_text.values())
        sentences = [s for s in split_sentences(combined) if 25 < len(s) < 250 and len(re.findall(r'\w+', s)) >= 5]
        if not sentences:
            self.send_json({'response': [], 'success': True})
            return
        all_terms = []
        for s in sentences:
            terms = self._extract_terms(s)
            all_terms.extend(terms)
        term_freq = Counter(all_terms)
        questions = []
        for sent in sentences:
            terms = self._extract_terms(sent)
            if not terms:
                continue
            answer = max(terms, key=lambda t: (term_freq.get(t, 0), len(t)))
            distractors = [t for t in term_freq if t.lower() != answer.lower()]
            distractors = sorted(set(distractors), key=lambda t: -term_freq.get(t, 0))[:3]
            if not distractors:
                continue
            question = sent.replace(answer, '_____', 1) if answer in sent else sent
            options = [answer] + distractors
            random.shuffle(options)
            questions.append({
                'question': question,
                'options': options,
                'answer': answer,
                'correct_index': options.index(answer)
            })
            if len(questions) >= num_questions:
                break
        self.send_json({'response': questions, 'success': True})

    def _extract_terms(self, sentence):
        words = re.findall(r'\w+', sentence)
        terms = []
        for w in words:
            if len(w) > 3 and w.lower() not in STOP_WORDS:
                terms.append(w)
        # Prioritize capitalized / proper-noun-like terms
        proper = [w for w in terms if w[0].isupper()]
        if proper:
            terms = proper + [w for w in terms if w not in proper]
        return terms

    # --- Flashcards (definition/split based) ---
    def api_notebook_flashcards(self, data):
        docs_text = self._load_all_docs()
        if not docs_text:
            self.send_json({'response': [], 'success': True})
            return
        num_cards = int(data.get('count', 10))
        num_cards = max(1, min(num_cards, 40))
        combined = '\n'.join(docs_text.values())
        sentences = [s for s in split_sentences(combined) if 15 < len(s) < 300 and len(re.findall(r'\w+', s)) >= 4]
        if not sentences:
            self.send_json({'response': [], 'success': True})
            return
        definition_patterns = re.compile(
            r'\b(is a|is an|are the|refers to|can be defined as|is defined as|is known as|'
            r'is called|means that|is used to|describes|involves|includes|consists of|'
            r'comprises|is characterized by|is one of)\b',
            re.IGNORECASE
        )
        definition_sents = [s for s in sentences if definition_patterns.search(s)]
        all_words = re.findall(r'\w+', combined.lower())
        word_freq = Counter(w for w in all_words if len(w) > 3 and w not in STOP_WORDS)
        key_terms = {w for w, _ in word_freq.most_common(20)}

        cards = []
        for sent in definition_sents[:num_cards]:
            front, back = self._split_card(sent)
            cards.append({'front': front, 'back': back, 'type': 'definition'})
        remaining = num_cards - len(cards)
        if remaining > 0:
            scored_sents = []
            for s in sentences:
                if s in definition_sents:
                    continue
                words_in_s = set(re.findall(r'\w+', s.lower()))
                score = sum(1 for w in words_in_s if w in key_terms)
                if score >= 1:
                    scored_sents.append((score, s))
            scored_sents.sort(key=lambda x: -x[0])
            for _, s in scored_sents[:remaining]:
                front, back = self._split_card(s)
                cards.append({'front': front, 'back': back, 'type': 'key_term'})
        if not cards:
            for s in sentences[:min(num_cards, 10)]:
                front, back = self._split_card(s)
                cards.append({'front': front, 'back': back, 'type': 'general'})
        self.send_json({'response': cards, 'success': True})

    def _split_card(self, sent):
        """Split a sentence into front (prompt) and back (answer)."""
        # Check for definition patterns first
        for sep_pat in ['refers to', 'is defined as', 'is known as', 'can be defined as',
                         'is called', 'is a ', 'is an ', 'are the ', 'means that',
                         'is used to', 'consists of', 'comprises', 'is characterized by']:
            idx = sent.lower().find(sep_pat)
            if idx != -1:
                front = sent[:idx].strip()
                back = sent[idx:].strip()
                if len(front) > 5 and len(back) > 5:
                    return front, back
        # Try colon, dash, comma
        for sep_char in [':', ' — ', ' – ', ' - ']:
            idx = sent.find(sep_char)
            if idx != -1 and 15 < idx < len(sent) - 15:
                return sent[:idx].strip(), sent[idx + len(sep_char):].strip()
        # Fallback: split at midpoint
        mid = len(sent) // 2
        # Try to split at a space near midpoint
        for offset in range(1, min(20, len(sent) // 4)):
            for cand in [mid - offset, mid + offset]:
                if 0 < cand < len(sent) and sent[cand] == ' ':
                    return sent[:cand].strip(), sent[cand:].strip()
        return sent[:mid].strip(), sent[mid:].strip()

    # --- OCR ---
    def _get_tesseract_path(self):
        import sys, stat, platform
        is_win = platform.system() == 'Windows'
        if getattr(sys, 'frozen', False):
            base = os.path.join(sys._MEIPASS, 'tesseract-win' if is_win else 'tesseract-bin')
        else:
            base = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'tesseract-pkg', 'tesseract-bin')
        if is_win:
            binary = os.path.join(base, 'tesseract.exe')
        else:
            binary = os.path.join(base, 'tesseract')
            if os.path.exists(binary):
                os.chmod(binary, os.stat(binary).st_mode | stat.S_IEXEC | stat.S_IXGRP | stat.S_IXOTH)
        tessdata = base
        return binary, base, tessdata

    def api_ocr(self, data):
        image_data = data.get('image', '')
        if not image_data:
            self.send_json({'error': 'No image data'}, 400)
            return
        import base64, tempfile, subprocess
        try:
            if ',' in image_data:
                image_data = image_data.split(',', 1)[1]
            img_bytes = base64.b64decode(image_data)
        except Exception:
            self.send_json({'error': 'Invalid image data'}, 400)
            return
        tmp = None
        try:
            with tempfile.NamedTemporaryFile(suffix='.png', delete=False) as f:
                f.write(img_bytes)
                tmp = f.name
            binary, lib_dir, tessdata = self._get_tesseract_path()
            env = os.environ.copy()
            if os.name == 'nt':
                env['PATH'] = lib_dir + ';' + env.get('PATH', '')
            else:
                env['LD_LIBRARY_PATH'] = lib_dir + ':' + env.get('LD_LIBRARY_PATH', '')
            env['TESSDATA_PREFIX'] = tessdata
            result = subprocess.run(
                [binary, tmp, 'stdout'],
                capture_output=True, text=True, timeout=60,
                env=env
            )
            if result.returncode == 0:
                text = result.stdout
                self.send_json({'text': text, 'success': True})
            else:
                err = result.stderr.strip() or 'OCR failed'
                self.send_json({'error': err, 'success': False})
        except FileNotFoundError:
            self.send_json({'error': 'Tesseract binary not found in bundle', 'success': False})
        except subprocess.TimeoutExpired:
            self.send_json({'error': 'OCR timed out. Try a smaller image.', 'success': False})
        except Exception as e:
            self.send_json({'error': f'OCR error: {str(e)}', 'success': False})
        finally:
            if tmp and os.path.exists(tmp):
                try: os.unlink(tmp)
                except: pass

    # --- Bibliography ---
    def _bib_path(self):
        return BIBLIOGRAPHY_DIR / 'bibliography.json'

    def api_bibliography_save(self, data):
        refs = data.get('references', [])
        try:
            self._bib_path().write_text(json.dumps(refs, indent=2), encoding='utf-8')
            self.send_json({'success': True})
        except Exception as e:
            self.send_json({'error': str(e), 'success': False})

    def api_bibliography_load(self, data):
        try:
            if self._bib_path().exists():
                refs = json.loads(self._bib_path().read_text(encoding='utf-8'))
            else:
                refs = []
            self.send_json({'references': refs, 'success': True})
        except Exception as e:
            self.send_json({'error': str(e), 'references': [], 'success': False})

    # --- Shared ---
    def _load_all_docs(self):
        docs = {}
        for f in sorted(NOTEBOOK_DIR.iterdir()):
            if f.suffix in TEXT_EXTS:
                try:
                    docs[f.name] = f.read_text(encoding='utf-8', errors='replace')
                except:
                    pass
        return docs

    def _kb_search(self, message):
        kb = {
            'science': ['physics', 'chemistry', 'biology', 'atom', 'molecule', 'cell', 'dna', 'gravity', 'energy', 'force', 'light', 'sound', 'heat', 'planet', 'star', 'galaxy', 'universe'],
            'math': ['algebra', 'geometry', 'calculus', 'equation', 'function', 'derivative', 'integral', 'statistics', 'probability', 'triangle', 'theorem'],
            'programming': ['python', 'javascript', 'code', 'algorithm', 'function', 'variable', 'loop', 'array', 'class', 'object', 'debug', 'syntax'],
            'history': ['ancient', 'medieval', 'war', 'revolution', 'empire', 'civilization', 'king', 'queen', 'world war', 'renaissance'],
        }
        msg = message.lower()
        for topic, keywords in kb.items():
            for kw in keywords:
                if kw in msg:
                    return topic
        return None


def find_port(start=8080):
    for port in range(start, start + 100):
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        try:
            s.bind(('127.0.0.1', port))
            s.close()
            return port
        except OSError:
            s.close()
            continue
    return None

def open_window(url):
    if PLATFORM == 'windows':
        try:
            import webview
            webview.create_window('NexCampus', url, width=1100, height=750)
            webview.start()
            return True
        except Exception:
            import subprocess, shutil
            edge = shutil.which('msedge') or shutil.which('msedge.exe')
            if edge:
                subprocess.Popen([edge, f'--app={url}'],
                    stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                return True
            import webbrowser
            webbrowser.open(url)
            return False
    else:
        has_display = 'DISPLAY' in os.environ
        if has_display:
            try:
                import webview
                webview.create_window('NexCampus', url, width=1100, height=750)
                webview.start()
                return True
            except Exception:
                pass
        import subprocess, webbrowser
        for browser in ['google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser']:
            try:
                subprocess.Popen([browser, f'--app={url}', '--no-sandbox'],
                    stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                return True
            except FileNotFoundError:
                continue
        webbrowser.open(url)
        return False

def main():
    port = find_port(8080)
    if port is None:
        print('[NexCampus] No available port found.')
        return

    httpd = http.server.HTTPServer(('127.0.0.1', port), NexCampusHandler)
    t = threading.Thread(target=httpd.serve_forever, daemon=True)
    t.start()

    url = f'http://127.0.0.1:{port}'
    print(f'[NexCampus] NexCampus v{VERSION.get("version","?")}')
    print(f'[NexCampus] Server: {url}')
    print('[NexCampus] Made by Shahid Singh | NexCore Systems and Technologies')

    open_window(url)
    httpd.serve_forever()

if __name__ == '__main__':
    main()
