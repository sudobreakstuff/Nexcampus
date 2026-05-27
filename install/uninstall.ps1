<#
.SYNOPSIS
  NexCampus Uninstaller for Windows
.DESCRIPTION
  Removes app files, desktop shortcut, start menu entry, and user data.
#>

Write-Host "==> NexCampus Uninstaller for Windows" -ForegroundColor Cyan
Write-Host ""

# Detect install location
$installDir = "$env:LOCALAPPDATA\NexCampus"
if (-not (Test-Path $installDir)) {
  $installDir = "$env:ProgramFiles\NexCampus"
}

# Remove app files
if (Test-Path $installDir) {
  Write-Host "Removing app from $installDir..."
  Remove-Item -Recurse -Force $installDir -ErrorAction SilentlyContinue
}

# Remove desktop shortcut
$desktop = [Environment]::GetFolderPath('Desktop')
$shortcut = "$desktop\NexCampus.lnk"
if (Test-Path $shortcut) {
  Write-Host "Removing desktop shortcut..."
  Remove-Item -Force $shortcut -ErrorAction SilentlyContinue
}

# Remove start menu shortcut
$startMenu = [Environment]::GetFolderPath('StartMenu') + '\Programs\NexCampus'
if (Test-Path $startMenu) {
  Write-Host "Removing Start Menu entry..."
  Remove-Item -Recurse -Force $startMenu -ErrorAction SilentlyContinue
}

# Remove user data
$appData = "$env:APPDATA\NexCampus"
if (Test-Path $appData) {
  Write-Host "Removing user data at $appData..."
  Remove-Item -Recurse -Force $appData -ErrorAction SilentlyContinue
}

# Kill any running instance
Get-Process "NexCampus-windows" -ErrorAction SilentlyContinue | Stop-Process -Force

Write-Host ""
Write-Host "==> NexCampus has been uninstalled." -ForegroundColor Green
Write-Host ""
Write-Host "To reinstall:" -ForegroundColor Gray
Write-Host "  irm https://raw.githubusercontent.com/sudobreakstuff/Nexcampus/main/install/install.ps1 | iex" -ForegroundColor White
