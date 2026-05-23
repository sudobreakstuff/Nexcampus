@echo off
REM NexCampus Build Script for Windows
REM Usage: double-click or run in command prompt

set APP_NAME=NexCampus-v2.0-windows
set ENTRY=server.py

echo [NexCampus Build] Building %APP_NAME%...

REM Ensure pyinstaller is available
pip install pyinstaller 2>nul

REM Clean previous build
rmdir /s /q build 2>nul
rmdir /s /q dist 2>nul
del /f /q *.spec 2>nul

REM Build
pyinstaller --onefile --add-data "static;static" --name "%APP_NAME%" "%ENTRY%"

echo [NexCampus Build] Done: dist\%APP_NAME%.exe
