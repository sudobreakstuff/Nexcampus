# NexCampus

**Every student deserves free tools to learn, build, and create — no internet required.**

NexCampus is a fully offline desktop toolkit for students: rich notes, study lab with 17+ tools, mind maps, text processing, OCR, interactive solar system, and a complete code learning environment with a built-in code runner and auto-graded challenges. Weekly content updates deliver new guides, projects, and challenges without reinstalling. No signup, no ads, no data collection.

Built with Python, vanilla JS, and pywebview.

<img src="screenshots/home.png" alt="NexCampus Home" width="700">

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

### Uninstall

**Linux:**
```bash
curl -sS https://raw.githubusercontent.com/sudobreakstuff/Nexcampus/main/install/uninstall.sh | bash
```

Removes `/opt/nexcampus`, desktop entry, user data (`~/.local/share/nexcampus`), and stale processes.

**Windows — run in PowerShell:**
```powershell
powershell -c "irm https://raw.githubusercontent.com/sudobreakstuff/Nexcampus/main/install/uninstall.ps1 | iex"
```

Removes app files, desktop shortcut, Start Menu entry, and user data (`%APPDATA%\NexCampus`).

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

### 📝 Notes Editor
Rich text word processor with templates, PDF export, table editor, emoji picker, custom font manager, inline find & replace (Ctrl+F). Fully offline.

### 🧪 Study Lab (16 Tools)
Summarize documents, Q&A over your sources, generate quizzes and flashcards, citation generator (MLA/APA/Chicago), timer, readability scorer, document merge, GPA calculator, vocabulary extractor, outline generator, text diff, bibliography manager, interactive periodic table with quiz mode, 262k-word offline dictionary.

<img src="screenshots/studylab.png" alt="Study Lab" width="500">

### 🔬 Interactive Solar System
Animated 3D-like orbits with zoom/pan, Milky Way starfield, asteroid belt, Saturn rings, pulsing Sun, dwarf planets (Ceres & Pluto), and a tabbed info panel with detailed planetary data. Click any planet to learn more.

<img src="screenshots/solarsystem.png" alt="Solar System" width="500">

### ⌨️ Code Lab
Learn to code with built-in guides (Python basics through OOP), searchable programming dictionary (85+ terms), practice projects with starter code, and a live code runner supporting Python, JavaScript, and Bash. No setup required.

<img src="screenshots/codelab.png" alt="Code Lab" width="500">

### 🔤 Text Tools (12 Tools)
Case converter, ciphers (ROT13, Atbash, Caesar, Vigenere), line operations, text diff, AI-ism scanner, text statistics, frequency chart, entity extraction, hash/Base64, password generator, spell check, find & replace.

### 📷 OCR
Tesseract 5 bundled on both Linux and Windows. Extract text from images fully offline — no API keys, no cloud services.

### 🎨 Theme System
5 color themes: Retro Dark (default), Cyberpunk, Ocean Deep, Forest Night, Paper Light. Switch anytime from the About page.

## What Makes NexCampus Different

- **Truly offline** — every feature works without internet. No signup, no ads, no tracking.
- **Zero dependencies at runtime** — one binary, double-click to run. Python, Node, databases? Not needed.
- **Student-first design** — built for the scenarios students actually face: studying, writing, learning to code.
- **Vanilla JS** — no React, no npm, no build step. The entire frontend is hand-written JavaScript.
- **Both Linux & Windows** — one codebase, two native builds. Android coming as a dedicated native app.

## Platform support

| Platform | Status |
|----------|--------|
| Linux | ✅ Full support |
| Windows | ✅ Full support |
| Android | 🚧 Future release (dedicated native app planned) |

## License

MIT
