@echo off
chcp 65001 >nul
setlocal EnableDelayedExpansion

REM ============================================================
REM  RELAYZ - Commit + Push des modifications
REM  Detecte automatiquement si le repo est deja configure
REM ============================================================

cls
echo.
echo  ============================================================
echo   RELAYZ - Push des modifications vers GitHub
echo  ============================================================
echo.

REM --- Verifier que Git est installe ---
where git >nul 2>nul
if errorlevel 1 (
    echo  [X] Git n'est pas installe.
    echo  Telechargez : https://git-scm.com/download/win
    pause
    exit /b 1
)

REM --- Verifier le projet ---
if not exist "package.json" (
    echo  [X] package.json introuvable. Placez ce script dans le dossier RELAYZ.
    pause
    exit /b 1
)

echo  [OK] Git detecte
echo  [OK] Projet RELAYZ detecte
echo.

REM ============================================================
REM  Etape 1 : Detecter l'etat du repo Git
REM ============================================================

set REPO_STATUS=unknown
set CURRENT_REMOTE=

REM Verifier si .git existe et est valide
if not exist ".git" (
    set REPO_STATUS=missing
    goto :handle_state
)

REM Verifier si .git est valide (pas seulement un dossier vide)
git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
    echo  [INFO] Le dossier .git existant est invalide, nettoyage...
    rmdir /S /Q ".git" 2>nul
    set REPO_STATUS=missing
    goto :handle_state
)

REM Recuperer le remote actuel
for /f "tokens=2" %%i in ('git remote -v 2^>nul ^| findstr /R "origin.*push"') do set CURRENT_REMOTE=%%i

if "!CURRENT_REMOTE!"=="" (
    set REPO_STATUS=no_remote
) else (
    set REPO_STATUS=ready
)

:handle_state
echo  ============================================================
echo   Etat detecte : !REPO_STATUS!
echo  ============================================================
echo.

if "!REPO_STATUS!"=="ready" goto :do_commit_push
if "!REPO_STATUS!"=="no_remote" goto :ask_remote
if "!REPO_STATUS!"=="missing" goto :init_repo

REM ============================================================
REM  Cas 1 : Repo deja configure, juste commit + push
REM ============================================================
:do_commit_push
echo  [INFO] Repo Git configure, remote : !CURRENT_REMOTE!
echo.
echo  Fichiers modifies :
echo  ----------------------------------------
git status --short
echo  ----------------------------------------
echo.

REM Verifier s'il y a des modifications
git diff --quiet HEAD 2>nul
set NO_DIFF=!errorlevel!
git diff --cached --quiet 2>nul
set NO_STAGED=!errorlevel!

REM Verifier les fichiers non suivis
for /f %%i in ('git ls-files --others --exclude-standard ^| find /c /v ""') do set UNTRACKED_COUNT=%%i

if "!NO_DIFF!"=="0" if "!NO_STAGED!"=="0" if "!UNTRACKED_COUNT!"=="0" (
    echo  [INFO] Aucune modification a pousser.
    pause
    exit /b 0
)

set /p COMMIT_MSG="  Message de commit (Entree = message par defaut) : "
if "!COMMIT_MSG!"=="" set COMMIT_MSG=Fix imports + add Vite/Vercel config for deployment

echo.
echo  [1/3] Ajout des fichiers...
git add -A

echo  [2/3] Creation du commit...
git commit -m "!COMMIT_MSG!"
if errorlevel 1 (
    echo  [X] Echec du commit.
    pause
    exit /b 1
)

echo  [3/3] Push vers GitHub...
echo.
git push
if errorlevel 1 (
    echo.
    echo  [X] Push echoue. Essayez :
    echo     git pull --rebase
    echo     git push
    pause
    exit /b 1
)

goto :success

REM ============================================================
REM  Cas 2 : Repo init mais pas de remote
REM ============================================================
:ask_remote
echo  [INFO] Repo Git initialise mais aucun remote configure.
echo.
set /p REPO_URL="  Collez l'URL HTTPS de votre repo GitHub : "
if "!REPO_URL!"=="" (
    echo  [X] URL vide.
    pause
    exit /b 1
)

git remote add origin !REPO_URL!
set CURRENT_REMOTE=!REPO_URL!
goto :do_commit_push

REM ============================================================
REM  Cas 3 : Pas de .git du tout, init complet
REM ============================================================
:init_repo
echo  [INFO] Aucun repo Git detecte, initialisation...
echo.
set /p REPO_URL="  Collez l'URL HTTPS de votre repo GitHub : "
if "!REPO_URL!"=="" (
    echo  [X] URL vide.
    pause
    exit /b 1
)

git init -b main >nul 2>&1
if errorlevel 1 (
    git init >nul
    git checkout -b main >nul 2>&1
)

git config user.email "ultra3omda@gmail.com"
git config user.name "Imededdine"

git remote add origin !REPO_URL!
set CURRENT_REMOTE=!REPO_URL!

REM Pour un init complet, on doit aussi pull pour merger avec l'historique distant
echo.
echo  [INFO] Recuperation de l'historique distant...
git fetch origin 2>nul
git pull origin main --allow-unrelated-histories --no-edit 2>nul

goto :do_commit_push

REM ============================================================
REM  Succes
REM ============================================================
:success
echo.
echo  ============================================================
echo   [OK] PUSH REUSSI !
echo  ============================================================
echo.
echo   Vos modifications sont en ligne sur :
echo   !CURRENT_REMOTE!
echo.
echo   Si Vercel est connecte a ce repo, un nouveau deploiement
echo   est en cours. Verifiez sur : https://vercel.com/dashboard
echo.
pause
endlocal
