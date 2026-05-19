# ============================================================
#  RELAYZ - Script PowerShell de réparation + push
#  Bypass des permissions Windows pour nettoyer le .git cassé
# ============================================================
#
# Utilisation :
#   Clic droit sur ce fichier → "Exécuter avec PowerShell"
#
# Si l'exécution est bloquée :
#   Ouvrez PowerShell en admin et tapez :
#   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
#
# ============================================================

$ErrorActionPreference = "Continue"
$projectPath = $PSScriptRoot
Set-Location $projectPath

Clear-Host
Write-Host ""
Write-Host " ============================================================" -ForegroundColor Cyan
Write-Host "  RELAYZ - Reparation + Push" -ForegroundColor Cyan
Write-Host " ============================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host " Dossier : $projectPath" -ForegroundColor Gray
Write-Host ""

# --- Verifier Git ---
$gitExists = $null -ne (Get-Command git -ErrorAction SilentlyContinue)
if (-not $gitExists) {
    Write-Host " [X] Git n'est pas installe." -ForegroundColor Red
    Write-Host "     Telechargez : https://git-scm.com/download/win" -ForegroundColor Yellow
    Read-Host "Appuyez sur Entree pour quitter"
    exit 1
}
Write-Host " [OK] Git detecte : $(git --version)" -ForegroundColor Green

# --- Verifier le projet ---
if (-not (Test-Path "package.json")) {
    Write-Host " [X] package.json introuvable dans ce dossier." -ForegroundColor Red
    Read-Host "Appuyez sur Entree pour quitter"
    exit 1
}
Write-Host " [OK] Projet RELAYZ detecte" -ForegroundColor Green
Write-Host ""

# ============================================================
#  ETAPE 1 : Nettoyer le .git casse (avec privileges PowerShell)
# ============================================================
Write-Host " ============================================================" -ForegroundColor Cyan
Write-Host "  ETAPE 1 : Nettoyage du .git casse" -ForegroundColor Cyan
Write-Host " ============================================================" -ForegroundColor Cyan

$gitFolder = Join-Path $projectPath ".git"
$gitWasBroken = $false

if (Test-Path $gitFolder) {
    # Verifier si le .git est valide
    $configPath = Join-Path $gitFolder "config"
    $configContent = ""
    if (Test-Path $configPath) {
        $configContent = (Get-Content $configPath -Raw -ErrorAction SilentlyContinue) -replace '\s', ''
    }

    if ([string]::IsNullOrWhiteSpace($configContent)) {
        $gitWasBroken = $true
        Write-Host " [INFO] .git detecte mais corrompu (config vide), suppression..." -ForegroundColor Yellow

        # Forcer le retrait des attributs read-only et hidden
        try {
            Get-ChildItem -Path $gitFolder -Recurse -Force -ErrorAction SilentlyContinue | ForEach-Object {
                try { $_.Attributes = 'Normal' } catch { }
            }
            Remove-Item -Path $gitFolder -Recurse -Force -ErrorAction Stop
            Write-Host " [OK] .git supprime avec succes" -ForegroundColor Green
        } catch {
            Write-Host " [X] Impossible de supprimer .git automatiquement." -ForegroundColor Red
            Write-Host "     Erreur : $_" -ForegroundColor Yellow
            Write-Host ""
            Write-Host "     SOLUTION MANUELLE :" -ForegroundColor Yellow
            Write-Host "     1. Ouvrez PowerShell en mode Administrateur" -ForegroundColor White
            Write-Host "     2. Tapez :" -ForegroundColor White
            Write-Host "        cd `"$projectPath`"" -ForegroundColor Cyan
            Write-Host "        Remove-Item -Path .git -Recurse -Force" -ForegroundColor Cyan
            Write-Host "     3. Relancez ce script" -ForegroundColor White
            Read-Host "Appuyez sur Entree pour quitter"
            exit 1
        }
    } else {
        Write-Host " [OK] .git existant valide, conservation" -ForegroundColor Green
    }
} else {
    $gitWasBroken = $true
    Write-Host " [INFO] Aucun .git detecte, init complete necessaire" -ForegroundColor Yellow
}

Write-Host ""

# ============================================================
#  ETAPE 2 : Init ou reutilisation du repo
# ============================================================
Write-Host " ============================================================" -ForegroundColor Cyan
Write-Host "  ETAPE 2 : Configuration du repo" -ForegroundColor Cyan
Write-Host " ============================================================" -ForegroundColor Cyan

if ($gitWasBroken) {
    Write-Host ""
    Write-Host " Comme votre v1 est deja deployee sur Vercel, vous avez" -ForegroundColor White
    Write-Host " forcement un repo GitHub avec votre code." -ForegroundColor White
    Write-Host ""
    Write-Host " Trouvez l'URL ici :" -ForegroundColor Yellow
    Write-Host "   1. Allez sur https://github.com/imededdine?tab=repositories" -ForegroundColor Gray
    Write-Host "      (ou votre propre nom d'utilisateur GitHub)" -ForegroundColor Gray
    Write-Host "   2. Cliquez sur le repo RELAYZ" -ForegroundColor Gray
    Write-Host "   3. Bouton vert 'Code' -> HTTPS -> Copier" -ForegroundColor Gray
    Write-Host ""
    $repoUrl = Read-Host " URL HTTPS du repo (ex: https://github.com/.../relayz.git)"

    if ([string]::IsNullOrWhiteSpace($repoUrl)) {
        Write-Host " [X] URL vide. Annulation." -ForegroundColor Red
        Read-Host "Entree pour quitter"
        exit 1
    }

    Write-Host ""
    Write-Host " [1/5] git init..." -ForegroundColor Cyan
    git init -b main 2>&1 | Out-Null
    if ($LASTEXITCODE -ne 0) {
        git init 2>&1 | Out-Null
        git checkout -b main 2>&1 | Out-Null
    }

    Write-Host " [2/5] Configuration utilisateur..." -ForegroundColor Cyan
    git config user.email "ultra3omda@gmail.com"
    git config user.name "Imededdine"

    Write-Host " [3/5] Ajout du remote..." -ForegroundColor Cyan
    git remote add origin $repoUrl

    Write-Host " [4/5] Recuperation de l'historique distant..." -ForegroundColor Cyan
    git fetch origin 2>&1 | Out-Null
    git pull origin main --allow-unrelated-histories --no-edit 2>&1 | Out-Null

    Write-Host " [5/5] Ajout des fichiers..." -ForegroundColor Cyan
    git add -A
} else {
    # Repo existant valide
    $currentRemote = git remote get-url origin 2>$null
    if ([string]::IsNullOrWhiteSpace($currentRemote)) {
        Write-Host " [INFO] Aucun remote configure" -ForegroundColor Yellow
        $repoUrl = Read-Host " URL HTTPS du repo"
        git remote add origin $repoUrl
    } else {
        Write-Host " [OK] Remote existant : $currentRemote" -ForegroundColor Green
    }
    Write-Host ""
    Write-Host " Modifications detectees :" -ForegroundColor Cyan
    Write-Host " ----------------------------------------" -ForegroundColor Gray
    git status --short
    Write-Host " ----------------------------------------" -ForegroundColor Gray
    Write-Host ""
    git add -A
}

# ============================================================
#  ETAPE 3 : Commit
# ============================================================
Write-Host ""
Write-Host " ============================================================" -ForegroundColor Cyan
Write-Host "  ETAPE 3 : Commit" -ForegroundColor Cyan
Write-Host " ============================================================" -ForegroundColor Cyan
Write-Host ""

$commitMsg = Read-Host " Message de commit (Entree = defaut)"
if ([string]::IsNullOrWhiteSpace($commitMsg)) {
    $commitMsg = "Fix build: imports + Vite config + v1.1 badge on splash"
}

git commit -m $commitMsg
if ($LASTEXITCODE -ne 0) {
    Write-Host " [INFO] Rien a commiter (peut-etre deja committe ou aucun changement)" -ForegroundColor Yellow
}

# ============================================================
#  ETAPE 4 : Push
# ============================================================
Write-Host ""
Write-Host " ============================================================" -ForegroundColor Cyan
Write-Host "  ETAPE 4 : Push vers GitHub" -ForegroundColor Cyan
Write-Host " ============================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host " Si une fenetre d'authentification s'ouvre :" -ForegroundColor Yellow
Write-Host "   - Cliquez 'Sign in with your browser'" -ForegroundColor White
Write-Host "   - Connectez-vous sur github.com" -ForegroundColor White
Write-Host ""

git push -u origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host " [INFO] Premier push echoue, tentative avec --force..." -ForegroundColor Yellow
    Write-Host " (Necessaire car on a recree le .git localement)" -ForegroundColor Yellow
    Write-Host ""
    $confirm = Read-Host " Forcer le push ? Cela ECRASE l'historique distant (o/N)"
    if ($confirm -eq "o" -or $confirm -eq "O" -or $confirm -eq "y" -or $confirm -eq "Y") {
        git push -u origin main --force
    } else {
        Write-Host ""
        Write-Host " Push annule. Pour resoudre manuellement :" -ForegroundColor Yellow
        Write-Host "   git pull origin main --rebase" -ForegroundColor Cyan
        Write-Host "   git push" -ForegroundColor Cyan
        Read-Host "Entree pour quitter"
        exit 1
    }
}

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host " ============================================================" -ForegroundColor Green
    Write-Host "  [OK] PUSH REUSSI !" -ForegroundColor Green
    Write-Host " ============================================================" -ForegroundColor Green
    Write-Host ""
    Write-Host " Verifiez le deploiement Vercel :" -ForegroundColor White
    Write-Host "   https://vercel.com/dashboard" -ForegroundColor Cyan
    Write-Host ""
    Write-Host " Le badge 'v1.1' devrait apparaitre sur le splash screen" -ForegroundColor White
    Write-Host " dans ~60 secondes." -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host " [X] Le push a echoue." -ForegroundColor Red
    Write-Host "     Verifiez l'URL du repo et votre authentification GitHub." -ForegroundColor Yellow
}

Read-Host "Appuyez sur Entree pour quitter"
