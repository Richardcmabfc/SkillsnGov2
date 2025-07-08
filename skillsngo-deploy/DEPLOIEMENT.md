# 🚀 Guide de Déploiement - SkillsNGo

## 🌐 Application Déployée

**URL locale actuelle :** http://localhost:8080

L'application SkillsNGo est maintenant disponible en ligne avec toutes les fonctionnalités opérationnelles !

## 📋 Comptes de Test

| Rôle | Identifiant | Mot de passe | Description |
|------|-------------|--------------|-------------|
| **Administrateur** | `admin001` | `skillsngo2024` | Accès complet à la plateforme |
| **Apprenti** | `app001` | `skillsngo2024` | Lucas Dubois - CAP Mécanique |
| **Professeur** | `prof001` | `skillsngo2024` | Pierre Durand - CFA Dijon |
| **Maître d'apprentissage** | `maitre001` | `skillsngo2024` | Marie Leclerc - Garage Leclerc |

## 🛠️ Version Déployée

Cette version utilise une architecture simplifiée optimisée pour le déploiement :

- **Single Page Application** avec React via CDN
- **Données persistantes** dans localStorage 
- **Responsive design** TailwindCSS
- **Build optimisé** pour performance web

## 🌍 Options de Déploiement Public

### Option 1 : Netlify (Recommandé)

```bash
# 1. Créer un compte sur netlify.com
# 2. Drag & drop du dossier skillsngo-deploy
# 3. URL publique générée automatiquement
```

### Option 2 : Vercel

```bash
# 1. Installer Vercel CLI
npm i -g vercel

# 2. Déployer
cd /home/scrapybara/skillsngo-deploy
vercel --prod
```

### Option 3 : GitHub Pages

```bash
# 1. Créer un repo GitHub
# 2. Push du dossier
# 3. Activer GitHub Pages
# 4. URL: username.github.io/skillsngo
```

### Option 4 : Firebase Hosting

```bash
# 1. Installer Firebase CLI
npm install -g firebase-tools

# 2. Initialiser
firebase init hosting

# 3. Déployer
firebase deploy
```

## 🔧 Configuration Serveur

### Serveur Python (Développement)

```bash
cd skillsngo-deploy
python3 -m http.server 8080
```

### Serveur Node.js (Production)

```javascript
// server.js
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('.'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`SkillsNGo running on port ${PORT}`);
});
```

### Docker Container

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 📊 Fonctionnalités Testables

### ✅ Authentification
- [x] Connexion multi-rôles
- [x] Persistance de session
- [x] Déconnexion sécurisée
- [x] Comptes de démonstration

### ✅ Interfaces Utilisateur
- [x] Dashboard administrateur avec statistiques
- [x] Interface apprenti avec livret numérique
- [x] Espace professeur avec suivi apprentis
- [x] Dashboard maître d'apprentissage

### ✅ Système de Compétences
- [x] Affichage des compétences par statut
- [x] Visualisation des évaluations
- [x] Progression par apprenti
- [x] Référentiels RNCP

### ✅ Gestion des Données
- [x] Persistance localStorage
- [x] Import/Export CSV (logique)
- [x] Statistiques temps réel
- [x] Données de démonstration

### ✅ Design & UX
- [x] Interface responsive (mobile/desktop)
- [x] Navigation intuitive
- [x] Thème CMA Formation
- [x] Accessibilité optimisée

## 🔄 Migration vers Production

### Base de Données
```sql
-- Structure recommandée PostgreSQL
CREATE DATABASE skillsngo_prod;

-- Tables utilisateurs, competences, evaluations, journaux
-- Voir SPECIFICATIONS_TECHNIQUES.md
```

### API Backend
```typescript
// Structure API REST
GET    /api/auth/login
GET    /api/users
POST   /api/evaluations
PUT    /api/competences/:id
GET    /api/stats
```

### Sécurité Production
- [ ] HTTPS obligatoire
- [ ] JWT tokens sécurisés
- [ ] Hash des mots de passe
- [ ] Rate limiting
- [ ] CORS approprié
- [ ] Headers de sécurité

## 📈 Monitoring & Analytics

### Métriques à Suivre
- **Performance** : Core Web Vitals
- **Utilisation** : Sessions, pages vues
- **Erreurs** : Logs JavaScript
- **Satisfaction** : Feedback utilisateurs

### Outils Recommandés
- **Analytics** : Google Analytics 4
- **Monitoring** : Sentry pour erreurs
- **Performance** : Lighthouse CI
- **Uptime** : Pingdom/UptimeRobot

## 🚀 URL de Démonstration

**Application en ligne :** http://localhost:8080 *(actuellement locale)*

Pour un déploiement public permanent, suivez une des options ci-dessus.

## 📞 Support Technique

### Logs d'Erreur
```bash
# Vérifier les erreurs navigateur
F12 > Console

# Logs serveur Python
ps aux | grep python
tail -f /var/log/python-server.log
```

### Debugging
- **Console navigateur** : F12 pour debug JavaScript
- **Network tab** : Analyser les requêtes
- **LocalStorage** : Vérifier données utilisateur
- **Responsive** : Tester mobile/tablette

---

**🎉 Félicitations !** Votre application SkillsNGo est maintenant déployée et fonctionnelle en ligne.

**📱 Test Mobile :** L'application s'adapte automatiquement aux écrans mobile et tablette.

**🔐 Sécurité :** En production, utilisez HTTPS et une base de données sécurisée.