$ErrorActionPreference = "Stop"

$backendRoot = Split-Path -Parent $PSScriptRoot
Set-Location $backendRoot

$port = if ($env:PORT) { [int]$env:PORT } else { 4000 }

function Get-NgrokExePath {
  $local = Join-Path $backendRoot ".tools/ngrok/ngrok.exe"
  if (Test-Path $local) { return $local }

  $cmd = Get-Command ngrok -ErrorAction SilentlyContinue
  if ($cmd) { return $cmd.Path }

  return $null
}

function Ensure-NgrokInstalled {
  $exe = Get-NgrokExePath
  if ($exe) { return $exe }

  $toolsDir = Join-Path $backendRoot ".tools/ngrok"
  New-Item -ItemType Directory -Force -Path $toolsDir | Out-Null

  $zipPath = Join-Path $toolsDir "ngrok.zip"
  $url = "https://bin.equinox.io/a/cJk8dzafvmN/ngrok-v3-3.3.1-windows-amd64.zip"

  Write-Host "Downloading ngrok..."
  Invoke-WebRequest -Uri $url -OutFile $zipPath

  Write-Host "Extracting ngrok..."
  Expand-Archive -Path $zipPath -DestinationPath $toolsDir -Force
  Remove-Item $zipPath -Force -ErrorAction SilentlyContinue

  $exe = Get-NgrokExePath
  if (-not $exe) {
    throw "ngrok.exe not found after download"
  }
  return $exe
}

$ngrok = Ensure-NgrokInstalled

if ($env:NGROK_AUTHTOKEN -and $env:NGROK_AUTHTOKEN.Trim().Length -gt 0) {
  & $ngrok config add-authtoken $env:NGROK_AUTHTOKEN | Out-Host
}

Write-Host "Starting ngrok tunnel for http://localhost:$port ..."
& $ngrok http $port

