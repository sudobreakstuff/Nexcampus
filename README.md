# NexCampus

Offline Student Toolkit — Notes, Study Lab, Text Tools, Dictionary & OCR.  
Built with Python, vanilla JS, and pywebview. Fully offline.

## Download

Get the latest build from **[Releases](https://github.com/sudobreakstuff/Nexcampus/releases)**.

| Platform | File | Notes |
|----------|------|-------|
| **Linux** | `NexCampus-linux` | Make executable: `chmod +x NexCampus-linux && ./NexCampus-linux` |
| **Windows** | `NexCampus-windows.exe` | Double-click to run |

> Both builds include bundled Tesseract 5 for OCR.

## Install

### Linux (app menu)

```bash
# Download NexCampus-linux from Releases
chmod +x NexCampus-linux
sudo mkdir -p /opt/nexcampus
sudo cp NexCampus-linux /opt/nexcampus/
sudo cp install/nexcampus.desktop /usr/share/applications/
sudo cp static/icons/icon-512.png /opt/nexcampus/nexcampus-icon.png
```

Now find "NexCampus" in your app menu.

### Windows

1. Download `NexCampus-windows.exe` from Releases
2. Double-click to run

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
