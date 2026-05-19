@echo off
REM Lanceur du script PowerShell de reparation + push
REM Double-cliquez sur ce fichier

cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0FIX_AND_PUSH.ps1"
