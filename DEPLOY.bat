@echo off
REM ========================================
REM RELAYZ - Script de déploiement Vercel
REM ========================================

echo.
echo ========================================
echo  RELAYZ - Deploiement Vercel
echo ========================================
echo.

REM Vérifier Node.js
where node >nul 2>nul
if errorlevel 1 (
    echo [ERREUR] Node.js n'est pas installe.
    echo Telechargez-le sur https://nodejs.org/
    pause
    exit /b 1
)

REM Installer Vercel CLI si absent
where vercel >nul 2>nul
if errorlevel 1 (
    echo Installation de Vercel CLI...
    call npm install -g vercel
)

REM Installer les dependances locales
if not exist node_modules (
    echo Installation des dependances...
    call npm install
)

REM Deploiement
echo.
echo Lancement du deploiement...
echo (Suivez les prompts - appuyez sur ENTREE pour tout accepter)
echo.
call vercel deploy --prod

echo.
echo ========================================
echo  Deploiement termine !
echo ========================================
pause
