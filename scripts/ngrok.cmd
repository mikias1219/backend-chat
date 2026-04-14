@echo off
setlocal

set BACKEND_ROOT=%~dp0..
set NGROK_EXE=%BACKEND_ROOT%\.tools\ngrok\ngrok.exe

if not exist "%NGROK_EXE%" (
  echo ngrok is not downloaded yet.
  echo Run: powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0ngrok.ps1"
  exit /b 1
)

echo Starting ngrok tunnel for http://localhost:4000 ...
"%NGROK_EXE%" http 4000

exit /b %ERRORLEVEL%

