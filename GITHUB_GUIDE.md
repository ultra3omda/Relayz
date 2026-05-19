# 📦 Push vers GitHub — Guide pas à pas

> Temps total : ~3 minutes

## 🎯 Vue d'ensemble

```
1. Créer le repo privé sur GitHub.com  (1 min)
        ↓
2. Lancer GITHUB_PUSH.bat              (30 sec)
        ↓
3. Coller l'URL du repo                (10 sec)
        ↓
4. S'authentifier GitHub               (1 min)
        ↓
5. ✅ Code en ligne sur GitHub
```

---

## Étape 1 : Créer le repo privé GitHub

1. Allez sur **https://github.com/new**
2. Remplissez :
   - **Repository name** : `relayz-demo`
   - **Description** (optionnel) : `Marketplace de transport Tunisie - Demo investisseurs`
   - **Visibility** : ✅ **Private** (important pour les investisseurs)
   - ⚠️ **NE COCHEZ PAS** :
     - "Add a README file"
     - "Add .gitignore"
     - "Choose a license"
   - (Le projet contient déjà ces fichiers, sinon il y aura un conflit)
3. Cliquez **"Create repository"**
4. **Copiez l'URL HTTPS** qui apparaît, ex :
   ```
   https://github.com/imededdine/relayz-demo.git
   ```

---

## Étape 2 : Lancer le script de push

1. Ouvrez le dossier `C:\Users\ultra\relayz\Relayz` dans l'Explorateur Windows
2. **Double-cliquez** sur **`GITHUB_PUSH.bat`**
3. Une console noire s'ouvre, suivez les instructions
4. Collez l'URL du repo quand demandé, appuyez sur **Entrée**

---

## Étape 3 : Authentification GitHub

GitHub va demander votre identité. **Deux scénarios possibles :**

### Scénario A : Une fenêtre Git Credential Manager s'ouvre (le plus courant)

1. Cliquez sur **"Sign in with your browser"**
2. Votre navigateur s'ouvre sur github.com
3. Autorisez l'accès
4. Revenez à la console, le push continue automatiquement

### Scénario B : La console demande un mot de passe (terminal ancien)

⚠️ **N'UTILISEZ PAS votre mot de passe GitHub** — depuis 2021 GitHub n'accepte plus les mots de passe pour git push.

1. Créez un **Personal Access Token** :
   - Allez sur **https://github.com/settings/tokens/new**
   - **Note** : "RELAYZ deploy"
   - **Expiration** : 90 days
   - **Cochez** : ✅ `repo` (toutes les sous-cases automatiques)
   - Cliquez **"Generate token"** en bas
   - **COPIEZ LE TOKEN** immédiatement (vous ne le reverrez plus, ex: `ghp_xxxxxxxxx`)

2. De retour dans la console :
   - **Username** : votre nom d'utilisateur GitHub
   - **Password** : collez le token (clic droit pour coller, il ne s'affichera pas — c'est normal)
   - Entrée

---

## Étape 4 : Connecter Vercel à GitHub (déploiement auto)

Une fois le code sur GitHub :

1. Allez sur **https://vercel.com/new**
2. Connectez-vous avec votre compte GitHub
3. **"Add GitHub Account"** si nécessaire, autorisez l'accès au repo `relayz-demo`
4. Cliquez sur **"Import"** à côté de `relayz-demo`
5. Vercel détecte automatiquement Vite ✓
6. Cliquez **"Deploy"**
7. ⏱️ Build en ~60 secondes
8. ✅ URL live : `https://relayz-demo-xxx.vercel.app`

**🎉 Bonus** : Chaque `git push` futur déclenche un déploiement automatique sur Vercel.

---

## 🆘 Dépannage

### "git: command not found"
Installez Git pour Windows : **https://git-scm.com/download/win**
Acceptez toutes les options par défaut lors de l'installation.

### "Permission denied (publickey)"
Le script utilise HTTPS (pas SSH), donc ça ne devrait pas arriver. Vérifiez que l'URL commence par `https://` et non `git@github.com:`.

### "remote: Repository not found"
- L'URL du repo est mal copiée
- Vous n'avez pas accès au repo
- Le repo n'existe pas encore (étape 1 oubliée)

### Push refusé "non-fast-forward"
Le repo GitHub contient déjà des fichiers. Forcez le push (perte de l'historique distant) :
```bash
cd C:\Users\ultra\relayz\Relayz
git push -u origin main --force
```

### Le script échoue silencieusement
Ouvrez `cmd.exe` manuellement :
```bash
cd C:\Users\ultra\relayz\Relayz
GITHUB_PUSH.bat
```
La fenêtre ne se fermera pas, vous verrez les erreurs.

---

## 📝 Commandes Git utiles après le premier push

```bash
cd C:\Users\ultra\relayz\Relayz

# Voir les modifications
git status

# Ajouter et commiter
git add .
git commit -m "Description du changement"

# Pousser sur GitHub
git push

# Voir l'historique
git log --oneline
```

---

## 🔐 Sécurité

- ✅ Le repo est **privé** : seul vous (et les personnes invitées) le voyez
- ✅ Vercel peut quand même déployer depuis un repo privé (intégration officielle)
- ✅ Les `node_modules/` et `dist/` ne sont **pas** poussés (gitignore)
- ⚠️ Ne committez **jamais** de tokens, clés API ou mots de passe dans le code
