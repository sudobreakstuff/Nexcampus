<p align="center">
  <img src="screenshots/banner.png" alt="NexCampus Banner" width="700">
</p>

<p align="center">
  <strong>Every student deserves free tools to learn, build, and create — no internet required.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-2.14.5-blue" alt="Version">
  <img src="https://img.shields.io/badge/platform-Linux%20%7C%20Windows-lightgrey" alt="Platform">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License">
  <img src="https://img.shields.io/badge/offline-yes-brightgreen" alt="Offline">
  <img src="https://img.shields.io/badge/updates-weekly-purple" alt="Weekly Updates">
</p>

---

> *"Education is the most powerful weapon which you can use to change the world."*
> — <cite>Nelson Mandela</cite>

---

## Our Mission

**Knowledge should not require a connection.**

In a world where learning is increasingly gated behind paywalls, signups, and internet access, millions of students are left behind. Rural areas, developing regions, and under-resourced schools face the same reality: no internet, no access.

NexCampus exists to change that. We believe every student — regardless of location, income, or connectivity — deserves the tools to learn, build, and create. No login. No subscription. No tracking. Just a single 249MB file that works completely offline.

**We release updates every week with more content** — guides, projects, tools, and themes pushed directly to the app. No reinstall needed.

Built with Python + vanilla JS + pywebview. MIT licensed. Free forever.

---

## Screenshots

<p align="center">
  <img src="screenshots/home.png" width="400">
  <img src="screenshots/studylab.png" width="400">
  <img src="screenshots/solarsystem.png" width="400">
  <img src="screenshots/codelab.png" width="400">
  <img src="screenshots/tool1.png" width="250">
  <img src="screenshots/tool2.png" width="250">
  <img src="screenshots/tool3.png" width="250">
  <img src="screenshots/tool4.png" width="250">
  <img src="screenshots/tool5.png" width="250">
</p>

## How to Use

**1. Study Lab** — 16+ tools: Summarizer, Q&A, Quiz, Flashcards, Notes, Citations, Timer, GPA, Periodic Table, Dictionary, Solar System

**2. Code Lab** — 18 Python guides, code runner (Python/JS/Bash), 125 terms, 11 projects. Write code → click Run

**3. Text Tools** — 17 tools: Converter, Base64, JSON, QR Code, OCR, Ciphers, Stats, and more

**4. About** — update the app, pick from 9 themes, view version info

Everything works **fully offline**. No signup. No ads.

---

## Quick Install

### Linux — copy and paste into terminal
```bash
curl -sS https://raw.githubusercontent.com/sudobreakstuff/Nexcampus/main/install/install.sh | bash
```

### Windows — copy and paste into PowerShell
```powershell
irm https://raw.githubusercontent.com/sudobreakstuff/Nexcampus/main/install/install.ps1 | iex
```

After install, the app opens automatically. A desktop shortcut is created for next time.

### Update from the app
Open **About** → **Check for Updates** → **Download Update**. The app auto-restarts with the latest version.

### Manual download
Go to **[Releases](https://github.com/sudobreakstuff/Nexcampus/releases/latest)** → download `NexCampus-linux` or `NexCampus-windows.exe` → double-click to run.

### Uninstall

**Linux:**
```bash
curl -sS https://raw.githubusercontent.com/sudobreakstuff/Nexcampus/main/install/uninstall.sh | bash
```

**Windows (PowerShell):**
```powershell
irm https://raw.githubusercontent.com/sudobreakstuff/Nexcampus/main/install/uninstall.ps1 | iex
```

**Windows (PowerShell):**
```powershell
irm https://raw.githubusercontent.com/sudobreakstuff/Nexcampus/main/install/install.ps1 | iex
```

### Manual download from Releases

1. Go to **[Releases](https://github.com/sudobreakstuff/Nexcampus/releases/latest)**
2. Download the binary for your platform:
   - **Linux:** `NexCampus-linux`
   - **Windows:** `NexCampus-windows.exe`
3. Linux: `chmod +x NexCampus-linux && ./NexCampus-linux`
4. Windows: Double-click `NexCampus-windows.exe`

### Self-Update (no download needed)

Already installed? Open NexCampus → **About** tab → **Check for Updates** → **Download Update**. The app downloads the latest version and restarts automatically. No terminal, no browser, no manual steps.

### Uninstall

**Linux:**
```bash
curl -sS https://raw.githubusercontent.com/sudobreakstuff/Nexcampus/main/install/uninstall.sh | bash
```

**Windows (PowerShell):**
```powershell
irm https://raw.githubusercontent.com/sudobreakstuff/Nexcampus/main/install/uninstall.ps1 | iex
```

---

## Features

### Study Lab (16+ tools)
Summarizer, Q&A, Quiz Generator, Flashcards, Notes (rich text editor), Citation Generator (MLA/APA/Chicago), Study Timer (Pomodoro), Reading Level Analyzer, Document Merger, GPA Calculator, Vocabulary Builder, Outline Generator, Document Diff, Bibliography Manager, Periodic Table (118 elements), Dictionary (262k+ words), Interactive Solar System

### Code Lab
18 Python guides, live code runner (Python/JS/Bash with cancel), 125-term programming dictionary, 11 practice projects, code snippet toolbar

### Text Tools (17)
Case Converter, Ciphers, Line Tools, Text Diff, AI-ism Scanner, Text Stats, Word Frequency, Entity Scanner, Hash Generator, Password Generator, Spell Check, Find & Replace, OCR (Tesseract 5.5), Unit Converter, Base64, JSON Formatter, QR Code Generator

### Solar System
900+ stars with twinkling, 8 planets + 5 dwarf planets, zoom/pan, Tour mode, keyboard navigation, shooting stars, lens flare, 54 fun facts, detailed planet profiles with discovery data

### Registry Plugin System
Add new tools safely without breaking existing code — uses `createElement`/`appendChild` (zero `innerHTML` strings). If one plugin fails, others keep working.

### Themes (9)
Retro Dark, Cyberpunk, Ocean Deep, Forest Night, Paper Light, Iron Man, Midnight Purple, Neon Tokyo, Sunset Glow

### Self-Update
Check for Updates from About page — downloads and installs automatically via CDN (no rate limits).

---

## Weekly Content Updates

Every week we push new content directly to the app:

- New Python guides and tutorials
- Additional dictionary terms and definitions
- Fresh practice projects with starter code
- New color themes
- Bug fixes and improvements

The app checks on startup and auto-delivers. **No reinstall. No manual download. Just open the app.**

---

## What Makes NexCampus Different

| Feature | NexCampus | Other Tools |
|---------|-----------|-------------|
| **Internet required** | No — fully offline | Usually yes |
| **Signup/Login** | Never | Almost always |
| **Code runner** | Python, JS, Bash built-in | Rarely |
| **OCR** | Tesseract 5.5 bundled | Online only |
| **Solar System** | Interactive, offline | Online tools only |
| **Updates** | Weekly, auto-delivered via CDN | Manual downloads |
| **Size** | 249MB (everything included) | Varies |
| **Privacy** | Zero data collection | Often tracked |
| **Price** | Free forever | Freemium / paid |

---

## Build from Source

```bash
git clone https://github.com/sudobreakstuff/Nexcampus.git
cd NexCampus
python3 server.py
```

Standalone binary:
```bash
pip install pyinstaller
bash build.sh        # Linux
build.bat            # Windows (requires Tesseract installed)
```

---

## Dependencies
- Python 3.8+
- libwebkit2gtk-4.1-0 (Linux, auto-installed by install script)
- Tesseract 5.5 (bundled in binary)

---

## License
MIT © Shahid Singh, NexCore Systems and Technologies

---

<p align="center">
  <sub>Made for students. Free forever. No internet required.</sub>
</p>
