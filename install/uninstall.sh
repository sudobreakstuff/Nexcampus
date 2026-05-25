#!/bin/bash
# NexCampus Uninstaller for Linux
# Removes app binary, icon, desktop entry, and data directory.

echo "==> NexCampus Uninstaller for Linux"

# Kill any running instance first
echo "==> Stopping NexCampus..."
pkill -f NexCampus-linux 2>/dev/null || true
sleep 1

# Remove old /opt install (may need sudo, skip if not available)
echo "==> Removing old /opt/nexcampus..."
sudo rm -rf /opt/nexcampus 2>/dev/null || true
sudo rm -f /usr/share/applications/nexcampus.desktop 2>/dev/null || true

# Remove user-local install
echo "==> Removing ~/.nexcampus..."
rm -rf "$HOME/.nexcampus"

# Remove user desktop entry
echo "==> Removing desktop entries..."
rm -f "$HOME/.local/share/applications/nexcampus.desktop"

# Remove user data
DATA_DIR="${XDG_DATA_HOME:-$HOME/.local/share}/nexcampus"
if [ -d "$DATA_DIR" ]; then
  echo "==> Removing user data at $DATA_DIR..."
  rm -rf "$DATA_DIR"
fi

# Remove startup log
echo "==> Removing startup log..."
rm -f "$HOME/.nexcampus-startup.log"

# Update desktop database
update-desktop-database "$HOME/.local/share/applications" 2>/dev/null || true

echo ""
echo "==> NexCampus has been uninstalled."
echo "    To reinstall:"
echo "    curl -sS https://raw.githubusercontent.com/sudobreakstuff/Nexcampus/main/install/install.sh | bash"
