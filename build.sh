#!/bin/bash
# NexCampus Build Script for Linux
# Usage: ./build.sh

set -e

APP_NAME="NexCampus-linux"
ENTRY="server.py"

echo "[NexCampus Build] Building $APP_NAME..."

# Ensure pyinstaller is available
if ! command -v pyinstaller &>/dev/null; then
    pip install --break-system-packages pyinstaller 2>/dev/null || pip install pyinstaller
fi

# Clean previous build
rm -rf build dist *.spec

# Build
pyinstaller --onefile \
  --add-data "static:static" \
  --add-data "index.html:." \
  --add-data "tesseract-pkg/tesseract-bin:tesseract-bin" \
  --name "$APP_NAME" "$ENTRY"

echo "[NexCampus Build] Done: dist/$APP_NAME"
echo "[NexCampus Build] Size: $(du -h dist/$APP_NAME | cut -f1)"
