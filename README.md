# NexCampus

**Every student deserves free tools to learn, build, and create — no internet required.**

NexCampus is a fully offline desktop toolkit for students: rich notes, study lab with 16+ tools, text processing, OCR, interactive solar system, and a complete code learning environment with 18 Python guides, 125-term dictionary, 11 projects, and a built-in code runner.

Built with Python + vanilla JS + pywebview. No signup, no ads, no tracking.

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

**Uninstall:**
```bash
curl -sS https://raw.githubusercontent.com/sudobreakstuff/Nexcampus/main/install/uninstall.sh | bash
```

---

## Features

### Study Lab (16 tools)
Interactive Solar System (900 stars, zoom/pan, dwarf planets, tabbed info), Notes (rich text editor, templates, find/replace, PDF export), Summarizer, Q&A, Quiz Generator, Flashcards, Citation Generator (MLA/APA/Chicago), Study Timer (Pomodoro), Reading Level Analyzer, Document Merger, GPA Calculator, Vocabulary Builder, Outline Generator, Document Diff, Bibliography Manager, Periodic Table (118 elements), Dictionary (262k+ words)

### Code Lab
18 interactive Python guides, live code runner (Python/JavaScript/Bash with cancel), 125-term programming dictionary, 11 practice projects with hints, code snippet toolbar

### Text Tools (13 built-in + 4 plugins)
Case Converter, Ciphers, Line Tools, Text Diff, AI-ism Scanner, Text Stats, Word Frequency, Entity Scanner, Hash Generator, Password Generator, Spell Check, Find & Replace, OCR (Tesseract 5.5 bundled), **Unit Converter**, **Base64**, **JSON Formatter**, **QR Code Generator**

### Themes (8)
Retro Dark (default), Cyberpunk, Ocean Deep, Forest Night, Paper Light, Iron Man, Midnight Purple, Neon Tokyo, Sunset Glow

### Self-Update
Check for Updates from the About page — downloads and installs automatically (uses CDN, no rate limits).

### Tool Registry
Plugin system for safe tool additions — tools built with `createElement` instead of `innerHTML` strings. If one tool fails, others keep working.

---

## What Makes NexCampus Different

- **Fully offline** — Tesseract 5 bundled; everything works without internet
- **No frameworks** — Pure vanilla JS + Python, no Electron or npm
- **Built-in code runner** — Python, JavaScript, Bash with cancel support
- **Tool Registry** — add new tools without breaking existing ones
- **8 themes** — Retro Dark, Cyberpunk, Ocean Deep, Forest Night, Paper Light, Iron Man, Midnight Purple, Neon Tokyo, Sunset Glow
- **Cross-platform** — Linux and Windows
- **Self-updating** — one click from About page, CDN-powered

---

## Build from Source

```bash
git clone https://github.com/sudobreakstuff/Nexcampus.git
cd NexCampus
python3 server.py
```

To build a standalone binary:
```bash
pip install pyinstaller
bash build.sh
```

---

## Dependencies
- Python 3.8+
- libwebkit2gtk-4.1-0 (Linux, auto-installed)
- Tesseract 5.5 (bundled)

---

## License
MIT © Shahid Singh, NexCore Systems and Technologies
