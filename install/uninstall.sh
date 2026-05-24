#!/bin/bash
# NexCampus Uninstaller for Linux
# Removes app binary, icon, desktop entry, and data directory.

set -e

echo "==> NexCampus Uninstaller for Linux"
echo ""

# Remove app files
echo "==> Removing app from /opt/nexcampus..."
sudo rm -rf /opt/nexcampus

# Remove desktop entry
echo "==> Removing desktop entry..."
sudo rm -f /usr/share/applications/nexcampus.desktop

# Remove user data
DATA_DIR="${XDG_DATA_HOME:-$HOME/.local/share}/nexcampus"
if [ -d "$DATA_DIR" ]; then
  echo "==> Removing user data at $DATA_DIR..."
  rm -rf "$DATA_DIR"
fi

# Remove startup log
rm -f "$HOME/.nexcampus-startup.log"

# Kill any running instance
pkill -f NexCampus-linux 2>/dev/null || true

echo ""
echo "==> NexCampus has been uninstalled."
echo "    You can reinstall anytime with:"
echo "    curl -sS https://raw.githubusercontent.com/sudobreakstuff/Nexcampus/main/install/install.sh | bash"
