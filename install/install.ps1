# NexCampus Installer for Windows
$repo = "sudobreakstuff/Nexcampus"
$binary = "NexCampus-windows.exe"
$version = "v2.16.5"

Write-Host "==> NexCampus Installer for Windows" -ForegroundColor Cyan

# Install Edge WebView2 Runtime if missing (needed for native window)
Write-Host "==> Checking WebView2 Runtime..."
$wv2 = "HKLM:\SOFTWARE\WOW6432Node\Microsoft\EdgeUpdate\Clients\{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5}"
if (-not (Test-Path $wv2)) {
    Write-Host "    WebView2 not found — installing..."
    $wv2installer = Join-Path $env:TEMP "MicrosoftEdgeWebview2Setup.exe"
    Invoke-WebRequest -Uri "https://go.microsoft.com/fwlink/p/?LinkId=2124703" -OutFile $wv2installer
    Start-Process $wv2installer -ArgumentList "/install /silent" -Wait
    Remove-Item $wv2installer -ErrorAction SilentlyContinue
    Write-Host "    WebView2 installed!" -ForegroundColor Green
} else {
    Write-Host "    WebView2 already installed" -ForegroundColor Green
}

# Get latest version from CDN (no rate limit, always works)
Write-Host "==> Fetching latest version..."
try {
    $versionData = Invoke-RestMethod -Uri "https://raw.githubusercontent.com/$repo/main/static/version.json" -ErrorAction Stop
    $version = "v" + $versionData.version
} catch {
    Write-Host "    CDN check failed, using v$version" -ForegroundColor Yellow
}

# Download binary
$url = "https://github.com/$repo/releases/download/$version/$binary"
Write-Host "==> Downloading NexCampus $version..."
$out = Join-Path $env:TEMP $binary
try {
    Invoke-WebRequest -Uri $url -OutFile $out -ErrorAction Stop
} catch {
    Write-Host "    Download failed. Check your internet and try again." -ForegroundColor Red
    exit 1
}

# Remove internet zone identifier (reduces SmartScreen warnings)
Unblock-File $out -ErrorAction SilentlyContinue

# Create install directory
$installDir = "$env:LOCALAPPDATA\NexCampus"
if (-not (Test-Path $installDir)) { New-Item -ItemType Directory -Path $installDir -Force | Out-Null }

# Copy binary
Copy-Item $out "$installDir\$binary" -Force
$size = [math]::Round((Get-Item "$installDir\$binary").Length / 1MB)
Write-Host "==> Installed to $installDir ($size MB)" -ForegroundColor Green

# Create desktop shortcut
$WScriptShell = New-Object -ComObject WScript.Shell
$shortcut = $WScriptShell.CreateShortcut("$env:USERPROFILE\Desktop\NexCampus.lnk")
$shortcut.TargetPath = "$installDir\$binary"
$shortcut.Save()

Write-Host ""
Write-Host "==> NexCampus $version installed! Double-click the desktop shortcut." -ForegroundColor Green

# Launch
Write-Host "==> Launching..."
Start-Process "$installDir\$binary"
