# 🚛 RELAYZ — Démo Investisseurs

> Marketplace de transport en Tunisie · Fret, Déménagement, Remorquage, Bus

Application React (Vite) prête à déployer pour présentation investisseurs.

## 🚀 Déploiement — 4 Options par ordre de simplicité

### 🥇 Option 0 : DRAG & DROP INSTANTANÉ (30 secondes, sans compte)

Le dossier `dist/` est **déjà pré-buildé** et prêt à déployer :

1. Allez sur **https://app.netlify.com/drop**
2. Glissez le dossier `dist/` sur la page
3. **URL en ligne en 5 secondes** : `https://random-name.netlify.app`
4. Optionnel : créez un compte gratuit pour personnaliser l'URL

✅ Aucun compte requis, aucune installation, aucun risque.

---

### Option 1 : Vercel Web (2 min, recommandé pour la prod)

1. Allez sur **https://vercel.com/new**
2. Connectez-vous (GitHub, GitLab, ou email)
3. Cliquez sur **"Import Project"** → **"Browse"** ou glissez-déposez le dossier `Relayz/`
4. Vercel détecte automatiquement Vite ✓
5. Cliquez **"Deploy"**
6. URL en ligne en ~60s : `https://relayz-demo-xxx.vercel.app`

### Option 2 : Vercel CLI (depuis votre machine)

```bash
# Installation (une fois)
npm install -g vercel

# Dans le dossier du projet
cd C:\Users\ultra\relayz\Relayz
vercel login
vercel deploy --prod
```

Suivez les prompts (entrée pour tout accepter). URL fournie à la fin.

### Option 3 : Drag & Drop (sans compte)

```bash
cd C:\Users\ultra\relayz\Relayz
npm install
npm run build
```

Glissez le dossier `dist/` sur **https://app.netlify.com/drop** → URL instantanée.

---

## 🛠️ Développement local

```bash
npm install      # installer les dépendances
npm run dev      # serveur local sur http://localhost:3000
npm run build    # build de production dans dist/
npm run preview  # tester le build
```

---

## 📋 Structure

```
Relayz/
├── index.html              # Point d'entrée HTML
├── package.json            # Dépendances (React, Vite, lucide-react, recharts)
├── vite.config.js          # Configuration Vite
├── vercel.json             # Configuration Vercel (SPA routing)
└── src/
    ├── main.jsx            # Bootstrap React
    ├── index.css           # Styles globaux
    └── App.jsx             # ⭐ TOUTE L'APPLICATION (3381 lignes)
```

---

## 🎯 Fonctionnalités pour la démo investisseurs

### Côté Chauffeur
- ✅ Inscription par téléphone + OTP
- ✅ Sélection de verticales (Fret, Déménagement, Remorquage, Bus)
- ✅ Feed d'annonces filtrable en temps réel
- ✅ Détails complets de chaque annonce
- ✅ **Swipe-to-buy** pour débloquer le contact client
- ✅ Portefeuille points + recharge (4 méthodes de paiement TN)
- ✅ Historique d'achats

### Côté Client
- ✅ Formulaires multi-étapes pour chaque verticale
- ✅ Détails métier exhaustifs (CMR, tonnages, étages, types de pannes...)
- ✅ Suivi en direct des chauffeurs intéressés

### Console Admin
- ✅ Dashboard KPI temps réel
- ✅ Graphiques d'activité (Recharts)
- ✅ Gestion annonces & chauffeurs
- ✅ Style Guide intégré

### 🎨 Killer Feature pour la pitch
- ✅ **Bouton "Palette" en bas à droite** : changement de marque en direct
  - 6 marques pré-configurées (RELAYZ, TRANSEXPRESS, TUNISTRANS...)
  - Personnalisation couleur + logo + nom
  - Démontre la capacité **white-label / B2B**
- ✅ Toggle thème clair/sombre
- ✅ Bilingue Français / Arabe (RTL automatique)

---

## 💡 Conseils pour la présentation investisseurs

1. **Démarrez avec le bouton "Palette ★"** en bas à droite — montrez 3 marques différentes en 10 secondes pour prouver le modèle white-label.
2. **Parcours chauffeur** : Splash → "Je suis chauffeur" → OTP (entrez `1234`) → Choisissez verticales → Feed → Tappez une annonce → Swipe-to-buy
3. **Parcours client** : Splash → "J'ai besoin d'un transport" → Choisissez "Remorquage" pour montrer le mode urgence
4. **Admin** : Splash → "Mode Admin" → Dashboard avec KPI

---

## 🔧 Stack technique

- **Frontend** : React 18 + Vite 5
- **Icons** : lucide-react
- **Charts** : Recharts
- **Build** : ~150KB gzipped
- **Mobile-first** : responsive iPhone-mockup sur desktop, fullscreen sur mobile

---

## 📞 Démo

Code OTP de démo : **n'importe quel code à 4 chiffres** (1234, 0000, etc.)
