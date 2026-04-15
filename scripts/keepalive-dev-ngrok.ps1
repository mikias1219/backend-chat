$ErrorActionPreference = "Stop"

function Stop-PortListener([int]$port) {
  try {
    $c = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($c -and $c.OwningProcess -gt 0) {
      Write-Host ("Stopping process {0} on port {1}..." -f $c.OwningProcess, $port) -ForegroundColor DarkYellow
      Stop-Process -Id $c.OwningProcess -Force -ErrorAction SilentlyContinue
      Start-Sleep -Milliseconds 300
    }
  } catch {}
}

function Start-Backend {
  Write-Host "Starting backend (start:dev)..." -ForegroundColor Cyan
  # Ensure only one backend is bound to 4000
  Stop-PortListener 4000

  # Ensure JWT secret exists for auth signing/verification
  if (-not $env:JWT_SECRET -or $env:JWT_SECRET.Trim().Length -lt 8) {
    $env:JWT_SECRET = "dev-secret-change-me"
  }
  if (-not $env:REQUIRE_JWT_VERIFY) {
    $env:REQUIRE_JWT_VERIFY = "true"
  }

  Start-Process -FilePath "npm" -ArgumentList @("run","start:dev") -WorkingDirectory (Join-Path $PSScriptRoot "..") -PassThru
}

function Start-Ngrok {
  Write-Host "Starting ngrok tunnel..." -ForegroundColor Magenta
  # Ensure only one ngrok is bound to 4040
  Stop-PortListener 4040
  Start-Process -FilePath "npm" -ArgumentList @("run","ngrok") -WorkingDirectory (Join-Path $PSScriptRoot "..") -PassThru
}

function Wait-Healthy {
  $backendOk = $false
  $ngrokOk = $false
  for ($i=0; $i -lt 60; $i++) {
    try {
      $r = Invoke-WebRequest -UseBasicParsing -Uri "http://localhost:4000/api/docs" -TimeoutSec 2
      if ($r.StatusCode -eq 200) { $backendOk = $true }
    } catch {}
    try {
      $t = Invoke-RestMethod -Uri "http://127.0.0.1:4040/api/tunnels" -TimeoutSec 2
      if ($t.tunnels -and $t.tunnels.Count -gt 0) { $ngrokOk = $true }
    } catch {}

    if ($backendOk -and $ngrokOk) { return }
    Start-Sleep -Seconds 1
  }
}

while ($true) {
  try {
    $backend = Start-Backend
    Start-Sleep -Milliseconds 800
    $ngrok = Start-Ngrok

    Wait-Healthy
    try {
      $public = (Invoke-RestMethod -Uri "http://127.0.0.1:4040/api/tunnels" -TimeoutSec 5).tunnels[0].public_url
      Write-Host ("ngrok is up: {0}" -f $public) -ForegroundColor Green
      Write-Host ("Swagger: {0}/api/docs" -f $public) -ForegroundColor Green
    } catch {}

    # Wait until either process exits, then restart both.
    while (-not $backend.HasExited -and -not $ngrok.HasExited) {
      Start-Sleep -Seconds 2
    }

    Write-Host "Backend or ngrok exited. Restarting in 2s..." -ForegroundColor Yellow
    try { if (-not $backend.HasExited) { Stop-Process -Id $backend.Id -Force } } catch {}
    try { if (-not $ngrok.HasExited) { Stop-Process -Id $ngrok.Id -Force } } catch {}
    Start-Sleep -Seconds 2
  } catch {
    Write-Host ("keepalive error: {0}" -f $_.Exception.Message) -ForegroundColor Red
    Start-Sleep -Seconds 2
  }
}

