#!/bin/bash
set -e

REPO="sudobreakstuff/Nexcampus"
BINARY="NexCampus-linux"
ICON="https://raw.githubusercontent.com/$REPO/main/static/icons/icon-512.png"
DESKTOP="https://raw.githubusercontent.com/$REPO/main/install/nexcampus.desktop"

echo "==> NexCampus Installer for Linux"
echo ""

# Get latest release download URL
echo "==> Fetching latest release..."
LATEST=$(curl -sS "https://api.github.com/repos/$REPO/releases/latest" 2>/dev/null)
URL=$(echo "$LATEST" | python3 -c "import sys,json; d=json.load(sys.stdin); [print(a['browser_download_url']) for a in d.get('assets',[]) if '$BINARY' in a['name']]" 2>/dev/null)
VERSION=$(echo "$LATEST" | python3 -c "import sys,json; print(json.load(sys.stdin).get('tag_name',''))" 2>/dev/null)

if [ -z "$URL" ]; then
  echo "Error: Could not find latest release binary."
  echo "Trying direct download from main branch..."
  URL="https://github.com/$REPO/releases/download/v2.3/$BINARY"
  VERSION="v2.3"
fi

echo "==> Downloading NexCampus $VERSION..."
TMP=$(mktemp -d)
trap "rm -rf $TMP" EXIT
curl -sS -L -o "$TMP/$BINARY" "$URL"
chmod +x "$TMP/$BINARY"

echo "==> Installing to /opt/nexcampus..."
sudo mkdir -p /opt/nexcampus
sudo cp "$TMP/$BINARY" /opt/nexcampus/
sudo chmod +x /opt/nexcampus/$BINARY

echo "==> Installing icon and desktop entry..."
sudo mkdir -p /opt/nexcampus
sudo curl -sS -o /opt/nexcampus/nexcampus-icon.png "$ICON"
sudo curl -sS -o /usr/share/applications/nexcampus.desktop "$DESKTOP"

echo ""
echo "==> NexCampus $VERSION installed!"
echo "    Find 'NexCampus' in your app drawer, or run:"
echo "    /opt/nexcampus/$BINARY"
