#!/bin/bash
set -e

REPO="sudobreakstuff/Nexcampus"
BINARY="NexCampus-linux"
ICON="https://raw.githubusercontent.com/$REPO/main/static/icons/icon-512.png"
DESKTOP="https://raw.githubusercontent.com/$REPO/main/install/nexcampus.desktop"

echo "==> NexCampus Installer for Linux"
echo ""

# Check dependencies
echo "==> Checking system dependencies..."
MISSING=""
if command -v dpkg &>/dev/null; then
  dpkg -s libwebkit2gtk-4.1-0 &>/dev/null || MISSING="libwebkit2gtk-4.1-0"
fi

if [ -n "$MISSING" ]; then
  echo "    Missing: $MISSING"
  echo "    Installing..."
  sudo apt-get update -qq && sudo apt-get install -y -qq "$MISSING"
fi

# Get latest release download URL
echo "==> Fetching latest release..."
LATEST=$(curl -sS "https://api.github.com/repos/$REPO/releases/latest" 2>/dev/null)
URL=$(echo "$LATEST" | python3 -c "import sys,json; d=json.load(sys.stdin); [print(a['browser_download_url']) for a in d.get('assets',[]) if '$BINARY' in a['name']]" 2>/dev/null)
VERSION=$(echo "$LATEST" | python3 -c "import sys,json; print(json.load(sys.stdin).get('tag_name',''))" 2>/dev/null)

if [ -z "$URL" ]; then
  echo "Warning: Could not find latest release. Using fallback..."
  URL="https://github.com/$REPO/releases/download/v2.7.3/$BINARY"
  VERSION="v2.7.3"
fi

echo "==> Downloading NexCampus $VERSION..."
TMP=$(mktemp -d)
trap "rm -rf $TMP" EXIT
curl -# -L -o "$TMP/$BINARY" "$URL"
chmod +x "$TMP/$BINARY"

# Verify download
SIZE=$(stat -c%s "$TMP/$BINARY" 2>/dev/null)
if [ -z "$SIZE" ] || [ "$SIZE" -lt 10000000 ]; then
  echo "Error: Downloaded file is too small ($SIZE bytes). Download may have failed."
  echo "Check your internet connection and try again."
  exit 1
fi

echo "==> Installing to /opt/nexcampus..."
sudo mkdir -p /opt/nexcampus
sudo cp "$TMP/$BINARY" /opt/nexcampus/
sudo chmod +x /opt/nexcampus/$BINARY

echo "==> Installing icon and desktop entry..."
sudo curl -sS -o /opt/nexcampus/nexcampus-icon.png "$ICON"
sudo curl -sS -o /usr/share/applications/nexcampus.desktop "$DESKTOP"

echo ""
echo "==> NexCampus $VERSION installed! ($(($SIZE / 1024 / 1024)) MB)"
echo ""
echo "    Launching NexCampus..."
/opt/nexcampus/$BINARY &
sleep 2
echo "    If the window doesn't appear, run: /opt/nexcampus/$BINARY"
