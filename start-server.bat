@echo off
title Longmotive Web Server
cd /d "%~dp0"

where node >nul 2>nul
if %errorlevel% equ 0 (
    echo Starting server with Node.js...
    node server.cjs
    goto done
)

if exist "%LOCALAPPDATA%\Programs\Antigravity IDE\Antigravity IDE.exe" (
    echo Starting server via Antigravity runtime...
    set ELECTRON_RUN_AS_NODE=1
    "%LOCALAPPDATA%\Programs\Antigravity IDE\Antigravity IDE.exe" server.cjs
    goto done
)

echo Starting server with PowerShell HttpListener...
powershell -ExecutionPolicy Bypass -File "%~dp0start-server.ps1"

:done
pause
