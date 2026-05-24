# NexCampus

**Every student deserves free tools to learn, build, and create — no internet required.**

NexCampus is a fully offline desktop toolkit for students: rich notes, study lab with 18 tools, mind maps, text processing, OCR, interactive solar system, and a complete code learning environment with a built-in code runner and auto-graded challenges. Weekly content updates deliver new guides, projects, and challenges without reinstalling.

Built with Python, vanilla JS, and pywebview. No signup, no ads, no tracking.

<img src="screenshots/home.png" alt="NexCampus Home" width="700">

---

## Quick Install

**Linux:**
```bash
curl -sS https://raw.githubusercontent.com/sudobreakstuff/Nexcampus/main/install/install.sh | bash
```

**Windows:**
```powershell
irm https://raw.githubusercontent.com/sudobreakstuff/Nexcampus/main/install/install.ps1 | iex
```

**Uninstall (Linux):**
```bash
curl -sS https://raw.githubusercontent.com/sudobreakstuff/Nexcampus/main/install/uninstall.sh | bash
```

---

## Features

### Study Lab (18 tools)
Interactive Solar System, Mind Map, Notes (rich text editor with formatting toolbar, find/replace, templates, PDF export), Summarizer, Q&A, Quiz Generator, Flashcards, Citation Generator (MLA/APA/Chicago), Study Timer (Pomodoro), Reading Level Analyzer, Document Merger, GPA Calculator, Vocabulary Builder, Outline Generator, Document Diff, Bibliography Manager, Periodic Table (118 elements with search/filters/quiz), Dictionary (262k+ words)

<img src="screenshots/solarsystem.png" alt="Solar System" width="400"> <img src="screenshots/studylab.png" alt="Study Lab" width="400">

### Code Lab
Side-by-side editor + output, 10 interactive Python guides, live code runner (Python/JavaScript/Bash with cancel), JavaScript runs in the browser (no Node.js needed), 85-term programming dictionary, 11 practice projects, 8 auto-graded challenges with instant pass/fail scoring, code snippet toolbar

<img src="screenshots/codelab.png" alt="Code Lab" width="700">

### Text Tools (13 tools)
Case Converter, Ciphers (ROT13/Atbash/Caesar/Vigenere), Line Tools (sort/reverse/deduplicate/trim), Text Diff, AI-ism Scanner, Text Stats, Word Frequency, Entity Scanner, Hash Generator (MD5/SHA), Password Generator, Spell Check, Find & Replace, OCR (Tesseract 5.5, fully offline)

### Themes (8)
Retro Dark (default), Cyberpunk, Ocean Deep, Forest Night, Paper Light, Iron Man, Midnight Purple, Neon Tokyo

### Weekly Content
The app checks for new guides, challenges, projects, and themes weekly and auto-delivers them — no reinstall needed.

### Self-Update
Check for Updates from the About page — downloads and installs automatically. No sudo, no terminal.

### Global Search
Type in the sidebar to find any tool. Press Enter to navigate directly.

---

## What Makes NexCampus Different

- **Fully offline** — Tesseract 5 bundled; everything works without internet
- **No frameworks** — Pure vanilla JS + Python, no Electron or npm
- **Built-in code runner** — Python/JS/Bash with cancel, JS runs in-browser
- **Auto-graded challenges** — learn by doing with instant feedback
- **Weekly content updates** — fresh material pushed automatically
- **8 themes** — Retro Dark, Cyberpunk, Ocean Deep, Forest Night, Paper Light, Iron Man, Midnight Purple, Neon Tokyo
- **Cross-platform** — Linux and Windows

---

## Build from Source

```bash
git clone https://github.com/sudobreakstuff/Nexcampus.git
cd NexCampus
python3 server.py
```

To build a standalone binary:
```bash
# Linux
pip install pyinstaller
bash build.sh

# Windows (requires Tesseract installed at %ProgramFiles%\Tesseract-OCR\)
pip install pyinstaller
build.bat
```

---

## Dependencies
- Python 3.8+
- libwebkit2gtk-4.1-0 (Linux, auto-installed by install script)
- Tesseract 5.5 (bundled in the binary)

---

## License

MIT © Shahid Singh, NexCore Systems and Technologies
