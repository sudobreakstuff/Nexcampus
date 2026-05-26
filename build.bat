@echo off
REM NexCampus Build Script for Windows
REM Requires Tesseract installed: choco install tesseract --version 5.3.3.20231005 -y
REM Usage: double-click or run in command prompt

set APP_NAME=NexCampus-windows
set ENTRY=server.py

echo [NexCampus Build] Building %APP_NAME%...

REM Ensure pyinstaller is available
pip install pyinstaller 2>nul

REM Copy Tesseract binaries
if not exist "tesseract-win" mkdir tesseract-win
copy "%ProgramFiles%\Tesseract-OCR\tesseract.exe" tesseract-win\
copy "%ProgramFiles%\Tesseract-OCR\*.dll" tesseract-win\
copy "%ProgramFiles%\Tesseract-OCR\tessdata\eng.traineddata" tesseract-win\

REM Clean previous build
rmdir /s /q build 2>nul
rmdir /s /q dist 2>nul
del /f /q *.spec 2>nul

REM Build
pyinstaller --onefile --noconsole ^
  --icon "static\icons\icon.ico" ^
  --add-data "static;static" ^
  --add-data "index.html;." ^
  --add-data "tesseract-win;tesseract-win" ^
  --name "%APP_NAME%" "%ENTRY%"

echo [NexCampus Build] Done: dist\%APP_NAME%.exe
