# Build script for GitHub Actions Windows runner
import subprocess, sys, os

args = [
    sys.executable, '-m', 'PyInstaller',
    '--onefile', '--noconsole',
    '--icon', 'static/icons/icon.ico',
    '--add-data', 'static;static',
    '--add-data', 'index.html;.',
    '--add-data', 'tesseract-win;tesseract-win',
    '--add-data', 'python-embed;python-embed',
    '--name', 'NexCampus-windows',
    'server.py'
]

result = subprocess.run(args, cwd=os.getcwd())
sys.exit(result.returncode)
