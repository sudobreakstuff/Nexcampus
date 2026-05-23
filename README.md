# NexCampus

Offline Student Toolkit — Notes, Study Lab, Text Tools, Dictionary & OCR.  
Built with Python, vanilla JS, and pywebview. Fully offline.

## Download

Get the latest build from **[Releases](https://github.com/sudobreakstuff/Nexcampus/releases)**.

| Platform | File | Notes |
|----------|------|-------|
| **Linux** | `NexCampus-linux` | Make executable: `chmod +x NexCampus-linux && ./NexCampus-linux` |
| **Windows** | `NexCampus-windows.exe` | Double-click to run |
| **Android** | (PWA) | Open in Chrome → Install |

> Linux build includes bundled Tesseract 5.5 for OCR.  
> Windows build does **not** include Tesseract — OCR will show "not available" on Windows.

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

### Android (PWA)

1. Open **https://github.com/sudobreakstuff/Nexcampus** in Chrome
2. Tap the menu → **Install NexCampus**

The PWA works for all client-side tools (Text Tools, Periodic Table, Dictionary, etc.). Server features (OCR, Study Lab AI) require the Python backend.

## Build from source

```bash
git clone https://github.com/sudobreakstuff/Nexcampus.git
cd Nexcampus

# Install dependencies
pip install pywebview PyInstaller Pillow

# Linux
python3 -m PyInstaller --onefile \
  --add-data "static:static" \
  --add-data "tesseract-pkg/tesseract-bin:tesseract-bin" \
  --name "NexCampus-linux" server.py

# Windows
python -m PyInstaller --onefile \
  --add-data "static;static" \
  --name "NexCampus-windows.exe" server.py
```

> **Windows OCR**: Download Windows Tesseract binaries and place in `tesseract-pkg/tesseract-bin/` before building.

## Features

- **Notes Editor**: Rich text, templates, PDF export, table editor, emoji picker, font manager
- **16 Study Lab Tools**: Summarize, Q&A, Quiz, Flashcards, Citation, Timer, Readability, Merge, GPA, Vocab, Outline, Diff, Bibliography, Periodic Table, Dictionary
- **12 Text Tools**: Case converter, Ciphers (ROT13/Atbash/Caesar/Vigenere), Lines ops, Diff, AI-ism Scanner, Stats, Frequency chart, Entity extraction, Hash/Base64, Password generator, Spell Check, Find & Replace
- **OCR**: Tesseract 5.5 bundled (Linux only)
- **Dictionary**: 262k-word offline dictionary
- **Periodic Table**: Interactive, quiz mode, 40 fun facts
- **Fully offline**: No internet required

## Platform support

| Platform | Status |
|----------|--------|
| Linux | ✅ Full support |
| Windows | ✅ Supported (no OCR) |
| Android | ✅ PWA (limited to client-side features) |

## License

MIT
