# NexCampus Installer for Windows
$repo = "sudobreakstuff/Nexcampus"
$binary = "NexCampus-windows.exe"

Write-Host "==> NexCampus Installer for Windows" -ForegroundColor Cyan

# Get latest release
Write-Host "==> Fetching latest release..."
$latest = Invoke-RestMethod -Uri "https://api.github.com/repos/$repo/releases/latest" -ErrorAction SilentlyContinue
$url = $latest.assets | Where-Object { $_.name -eq $binary } | Select-Object -ExpandProperty browser_download_url
$version = $latest.tag_name

if (-not $url) {
    Write-Host "Could not find latest release, using v2.12.3" -ForegroundColor Yellow
    $url = "https://github.com/$repo/releases/download/v2.12.3/$binary"
    $version = "v2.12.3"
}

# Download
$out = Join-Path $env:TEMP $binary
Write-Host "==> Downloading NexCampus $version..."
Invoke-WebRequest -Uri $url -OutFile $out

# Remove internet zone identifier (reduces SmartScreen warnings)
Unblock-File $out -ErrorAction SilentlyContinue

# Create install directory
$installDir = "$env:LOCALAPPDATA\NexCampus"
if (-not (Test-Path $installDir)) { New-Item -ItemType Directory -Path $installDir -Force | Out-Null }

# Copy binary
Copy-Item $out "$installDir\$binary" -Force
Write-Host "==> Installed to $installDir" -ForegroundColor Green

# Create desktop shortcut (optional)
$WScriptShell = New-Object -ComObject WScript.Shell
$shortcut = $WScriptShell.CreateShortcut("$env:USERPROFILE\Desktop\NexCampus.lnk")
$shortcut.TargetPath = "$installDir\$binary"
$shortcut.Save()

Write-Host ""
Write-Host "==> NexCampus $version installed!" -ForegroundColor Green
Write-Host "    Double-click the desktop shortcut or run:" -ForegroundColor Gray
Write-Host "    $installDir\$binary" -ForegroundColor Gray
