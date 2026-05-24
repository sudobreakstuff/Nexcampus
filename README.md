# NexCampus

Offline Student Toolkit — Notes, Study Lab, Text Tools, Dictionary & OCR.  
Built with Python, vanilla JS, and pywebview. Fully offline.

## Quick Install

### Linux (one-liner, appears in app drawer)

```bash
curl -sS https://raw.githubusercontent.com/sudobreakstuff/Nexcampus/main/install/install.sh | bash
```

Then find "NexCampus" in your app drawer.

Manual alternative — download `NexCampus-linux` and `install.sh` from **[Releases](https://github.com/sudobreakstuff/Nexcampus/releases)**, then run:

```bash
chmod +x install.sh && ./install.sh
```

### Windows

Download `NexCampus-windows.exe` from **[Releases](https://github.com/sudobreakstuff/Nexcampus/releases)** and double-click to run.  
A desktop shortcut is created automatically on first run.

Or use the PowerShell installer:

```powershell
powershell -c "irm https://raw.githubusercontent.com/sudobreakstuff/Nexcampus/main/install/install.ps1 | iex"
```

> Both builds include bundled Tesseract 5 for offline OCR.

## Build from source

```bash
git clone https://github.com/sudobreakstuff/Nexcampus.git
cd Nexcampus

# Install dependencies
pip install pywebview PyInstaller Pillow

# Linux
python3 -m PyInstaller --onefile \
  --add-data "static:static" \
  --add-data "index.html:." \
  --add-data "tesseract-pkg/tesseract-bin:tesseract-bin" \
  --name "NexCampus-linux" server.py

# Windows — requires Tesseract installed via choco first:
#   choco install tesseract --version 5.3.3.20231005 -y
python -m PyInstaller --onefile --noconsole \
  --add-data "static;static" \
  --add-data "index.html;." \
  --add-data "tesseract-win;tesseract-win" \
  --name "NexCampus-windows.exe" server.py
```

## Features

- **Notes Editor**: Rich text, templates, PDF export, table editor, emoji picker, font manager
- **16 Study Lab Tools**: Summarize, Q&A, Quiz, Flashcards, Citation, Timer, Readability, Merge, GPA, Vocab, Outline, Diff, Bibliography, Periodic Table, Dictionary
- **12 Text Tools**: Case converter, Ciphers (ROT13/Atbash/Caesar/Vigenere), Lines ops, Diff, AI-ism Scanner, Stats, Frequency chart, Entity extraction, Hash/Base64, Password generator, Spell Check, Find & Replace
- **OCR**: Tesseract 5 bundled on both Linux and Windows (fully offline)
- **Dictionary**: 262k-word offline dictionary
- **Periodic Table**: Interactive, quiz mode, 40 fun facts
- **Fully offline**: No internet required

## Platform support

| Platform | Status |
|----------|--------|
| Linux | ✅ Full support |
| Windows | ✅ Full support |
| Android | 🚧 Future release (dedicated native app planned) |

## License

MIT
