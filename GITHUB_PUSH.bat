@echo off
chcp 65001 >nul
setlocal EnableDelayedExpansion

REM ============================================================
REM  RELAYZ - Push automatique vers GitHub
REM  Usage: Double-cliquez sur ce fichier
REM ============================================================

cls
echo.
echo  ============================================================
echo   RELAYZ - Push vers GitHub
echo  ============================================================
echo.

REM --- Verifier que Git est installe ---
where git >nul 2>nul
if errorlevel 1 (
    echo  [X] Git n'est pas installe sur votre machine.
    echo.
    echo  Telechargez Git ici : https://git-scm.com/download/win
    echo  Puis relancez ce script.
    echo.
    pause
    exit /b 1
)

echo  [OK] Git detecte
git --version
echo.

REM --- Verifier qu'on est dans le bon dossier ---
if not exist "package.json" (
    echo  [X] Le fichier package.json est introuvable.
    echo  Placez ce script a la racine du projet RELAYZ.
    pause
    exit /b 1
)

echo  [OK] Projet RELAYZ detecte
echo.

REM --- Nettoyer un eventuel .git incomplet ---
if exist ".git" (
    echo  [INFO] Nettoyage d'un .git existant...
    rmdir /S /Q ".git" 2>nul
)

REM --- Demander l'URL du repo ---
echo  ============================================================
echo   ETAPE 1 : Creez votre repo prive sur GitHub
echo  ============================================================
echo.
echo   1. Ouvrez : https://github.com/new
echo   2. Repository name : relayz-demo
echo   3. Cochez "Private"
echo   4. NE PAS cocher "Add a README" (le projet en a deja un)
echo   5. Cliquez "Create repository"
echo   6. Copiez l'URL HTTPS qui apparait
echo      Exemple : https://github.com/votre-username/relayz-demo.git
echo.
echo  ============================================================
echo.
set /p REPO_URL="  Collez l'URL HTTPS du repo : "

if "!REPO_URL!"=="" (
    echo.
    echo  [X] URL vide. Annulation.
    pause
    exit /b 1
)

echo.
echo  ============================================================
echo   ETAPE 2 : Initialisation et push
echo  ============================================================
echo.

REM --- Init du repo Git ---
echo  [1/6] Initialisation du repo Git...
git init -b main >nul 2>&1
if errorlevel 1 (
    REM Fallback pour anciennes versions de Git
    git init >nul
    git checkout -b main >nul 2>&1
)

REM --- Configuration utilisateur (locale au projet) ---
echo  [2/6] Configuration utilisateur...
git config user.email "ultra3omda@gmail.com"
git config user.name "Imededdine"

REM --- Verifier le .gitignore ---
if not exist ".gitignore" (
    echo node_modules>.gitignore
    echo dist>>.gitignore
    echo .env>>.gitignore
    echo .vercel>>.gitignore
)

REM --- Ajouter les fichiers ---
echo  [3/6] Ajout des fichiers...
git add -A
if errorlevel 1 (
    echo  [X] Echec de git add
    pause
    exit /b 1
)

REM --- Premier commit ---
echo  [4/6] Creation du commit initial...
git commit -m "Initial commit: RELAYZ marketplace demo (React + Vite)" >nul
if errorlevel 1 (
    echo  [X] Echec du commit
    pause
    exit /b 1
)

REM --- Configuration du remote ---
echo  [5/6] Configuration du remote GitHub...
git remote remove origin >nul 2>&1
git remote add origin !REPO_URL!

REM --- Push ---
echo  [6/6] Push vers GitHub...
echo.
echo  ============================================================
echo   ATTENTION : GitHub va vous demander de vous authentifier
echo  ============================================================
echo.
echo   Si une fenetre s'ouvre :
echo     - Cliquez "Sign in with your browser"
echo     - Authentifiez-vous sur github.com
echo     - Revenez ici, le push continuera automatiquement
echo.
echo   Si on vous demande un mot de passe en console :
echo     - N'utilisez PAS votre mot de passe GitHub
echo     - Creez un Personal Access Token :
echo       https://github.com/settings/tokens/new
echo       Cochez "repo", generez, copiez le token
echo     - Collez le token comme mot de passe
echo.

git push -u origin main
if errorlevel 1 (
    echo.
    echo  ============================================================
    echo   [X] Push echoue. Verifiez :
    echo  ============================================================
    echo     1. L'URL du repo est-elle correcte ?
    echo     2. Votre authentification GitHub est-elle valide ?
    echo     3. Vous avez bien acces en ecriture au repo ?
    echo.
    pause
    exit /b 1
)

echo.
echo  ============================================================
echo   [OK] PUSH REUSSI !
echo  ============================================================
echo.
echo   Votre code est maintenant sur GitHub a l'adresse :
echo   !REPO_URL!
echo.
echo   PROCHAINES ETAPES :
echo.
echo   1. Connectez ce repo a Vercel pour deploiement auto :
echo      https://vercel.com/new
echo      - Cliquez "Import" sur votre repo
echo      - Vercel detecte Vite automatiquement
echo      - Cliquez "Deploy"
echo      - URL live en 60 secondes !
echo.
echo   2. Chaque push GitHub deploiera automatiquement sur Vercel
echo.
pause
endlocal
