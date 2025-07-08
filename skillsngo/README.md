# SkillsNGo - Application de suivi des apprentis

## 📖 Présentation

SkillsNGo est une application web dédiée au suivi des apprentis en alternance pour CMA Formation Bourgogne-Franche-Comté. Elle facilite la coordination entre le CFA, l'entreprise et l'apprenti en offrant une plateforme intuitive de suivi des compétences, de gestion du livret numérique et d'espace collaboratif.

### 🎯 Objectifs

- Améliorer la coordination entre CFA, entreprise et apprenti
- Offrir une plateforme intuitive de suivi des compétences en lien avec les référentiels RNCP
- Faciliter les échanges pédagogiques grâce à un espace de collaboration
- Automatiser les suivis, relances, évaluations et exports réglementaires

## 🏗️ Architecture Technique

### Technologies utilisées

- **Frontend** : React 18 + TypeScript
- **Build Tool** : Vite
- **Package Manager** : Bun
- **Styling** : TailwindCSS
- **Icons** : Lucide React
- **Type Safety** : TypeScript strict mode

### Structure du projet

```
skillsngo/
├── src/
│   ├── components/         # Composants réutilisables
│   │   ├── Layout.tsx
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── StatCard.tsx
│   │   ├── CompetenceCard.tsx
│   │   ├── CompetenceRadar.tsx
│   │   ├── EvaluationModal.tsx
│   │   ├── CompetenceDetail.tsx
│   │   ├── MessagingSystem.tsx
│   │   └── LoginForm.tsx
│   ├── pages/              # Pages principales
│   │   ├── AdminDashboard.tsx
│   │   ├── ApprentiDashboard.tsx
│   │   ├── ProfesseurDashboard.tsx
│   │   └── MaitreDashboard.tsx
│   ├── hooks/              # Hooks personnalisés
│   │   └── useAuth.ts
│   ├── types/              # Définitions TypeScript
│   │   └── index.ts
│   ├── utils/              # Utilitaires
│   │   ├── csvImport.ts
│   │   └── exportData.ts
│   ├── data/               # Données de test
│   │   └── mockData.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 👥 Rôles et Fonctionnalités

### 🔑 Administrateur
- **Dashboard** : Vue d'ensemble de la plateforme avec statistiques globales
- **Gestion des utilisateurs** : Import CSV, création de groupes, affectation des rôles
- **Configuration** : Gestion des référentiels et des compétences
- **Exports** : Données réglementaires (OPCO, DREETS, France Compétences)
- **Statistiques** : Tableaux de bord et rapports personnalisés

### 🎓 Apprenti
- **Dashboard personnel** : Vue synthétique de la progression
- **Livret numérique** : Journal d'activités hebdomadaire/mensuel
- **Mes compétences** : Autoévaluation et visualisation radar
- **Planning** : Suivi alternance CFA/entreprise
- **Messages** : Communication tripartite
- **Signatures électroniques** : Validation des documents

### 👨‍🏫 Professeur CFA
- **Suivi des apprentis** : Vue détaillée de chaque apprenti encadré
- **Évaluations** : Formatives, sommatives, co-évaluations
- **Validation** : Journaux d'apprentissage
- **Communication** : Messagerie contextualisée
- **Référentiels** : Accès et modification des compétences
- **Planification** : Rendez-vous tripartites

### 👷 Maître d'apprentissage
- **Encadrement** : Suivi des apprentis en entreprise
- **Observations** : Ajout de commentaires contextualisés
- **Évaluations terrain** : Compétences en situation professionnelle
- **Validation** : Journaux d'activités
- **Communication** : Échanges avec le CFA

## 🔧 Installation et Déploiement

### Prérequis

- Node.js 18+ ou Bun 1.2+
- Navigateur moderne (Chrome, Firefox, Safari, Edge)

### Installation locale

```bash
# Cloner le projet
git clone <repository-url>
cd skillsngo

# Installer les dépendances
bun install
# ou
npm install

# Configurer l'environnement
cp .env.example .env
# Éditer les variables d'environnement

# Démarrer le serveur de développement
bun run dev
# ou
npm run dev
```

### Build de production

```bash
# Construire l'application
bun run build
# ou
npm run build

# Prévisualiser la build
bun run preview
# ou
npm run preview
```

### Déploiement

L'application peut être déployée sur :
- **Hébergement statique** : Netlify, Vercel, GitHub Pages
- **Serveur web** : Apache, Nginx avec les fichiers du dossier `dist/`
- **Cloud** : AWS S3 + CloudFront, Azure Static Web Apps

## 📊 Gestion des Données

### Import CSV

Format attendu pour l'import des utilisateurs :

```csv
identifiant,mot_de_passe,nom,prenom,site,groupe,role,professeur_referent,maitre_apprentissage,email
admin001,skillsngo2024,Martin,Sophie,CMA BFC - Besançon,,admin,,,sophie.martin@cma-bfc.fr
app001,skillsngo2024,Dubois,Lucas,CMA BFC - Dijon,CAP Mécanique Auto - 2024,apprenti,Pierre Durand,Marie Leclerc,lucas.dubois@apprenti.cma-bfc.fr
```

### Exports disponibles

- **CSV** : Utilisateurs, compétences, évaluations, journaux
- **Statistiques** : Tableaux de bord personnalisables
- **Réglementaire** : Formats OPCO, DREETS, France Compétences
- **PDF** : Rapports d'activité (nécessite implémentation)

## 🔐 Sécurité et Conformité

### Authentification
- Connexion par identifiant/mot de passe
- Gestion des rôles et permissions
- Session locale (localStorage)

### RGPD
- Données minimales collectées
- Droit à l'effacement
- Logs de connexion
- Consentement explicite

### Recommandations production
- **HTTPS obligatoire**
- **Base de données sécurisée** (encryption au repos)
- **Backup automatisé**
- **Monitoring** des accès
- **Hébergement UE** pour conformité RGPD

## 🎨 Interface Utilisateur

### Design System
- **Couleurs** : Palette CMA Formation (bleu primaire #3b82f6)
- **Typography** : Inter/System fonts
- **Composants** : Cards, modals, forms responsives
- **Accessibilité** : Contraste WCAG AA, navigation clavier

### Responsive Design
- **Mobile First** : Optimisé pour tablettes et smartphones
- **Breakpoints** : sm, md, lg, xl
- **Touch-friendly** : Boutons et zones de clic adaptés

## 🔌 Intégrations

### APIs prévues
- **Ypareo** : Import/export des données élèves
- **Moodle** : Synchronisation des parcours
- **ERP** : Interfaçage avec systèmes existants

### Format d'échange
- **REST API** : JSON pour les échanges
- **Webhooks** : Notifications temps réel
- **CSV/Excel** : Import/export en lot

## 🧪 Tests et Qualité

### Comptes de démonstration

| Identifiant | Mot de passe | Rôle |
|-------------|--------------|------|
| admin001 | skillsngo2024 | Administrateur |
| app001 | skillsngo2024 | Apprenti |
| prof001 | skillsngo2024 | Professeur |
| maitre001 | skillsngo2024 | Maître d'apprentissage |

### Tests à implémenter
- **Unit tests** : Jest + React Testing Library
- **E2E tests** : Playwright ou Cypress
- **Accessibility** : axe-core
- **Performance** : Lighthouse CI

## 📚 Documentation

### Guides utilisateur
- **Manuel administrateur** : Configuration et gestion
- **Guide enseignant** : Évaluations et suivi
- **Tutoriel apprenti** : Utilisation du livret
- **FAQ** : Questions fréquentes

### Formation
- **Webinaires** : Sessions de découverte
- **Ateliers pratiques** : Prise en main
- **Support** : Hotline et tickets
- **Ressources** : Vidéos et tutoriels

## 🚀 Roadmap

### Phase 1 - MVP ✅
- Authentification multi-rôles
- Tableaux de bord personnalisés
- Livret numérique apprenti
- Système de compétences
- Messagerie tripartite
- Import/Export CSV

### Phase 2 - Enrichissement
- Notifications push
- Planning avancé
- Mobile app (PWA)
- Signature électronique
- Rapports avancés

### Phase 3 - Intégrations
- API Ypareo/Moodle
- SSO (Single Sign-On)
- Synchronisation en temps réel
- Intelligence artificielle
- Analytics avancés

## 🤝 Contribution

### Développement
1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changes (`git commit -am 'Ajout nouvelle fonctionnalité'`)
4. Push la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Créer une Pull Request

### Standards de code
- **ESLint** : Configuration stricte
- **Prettier** : Formatage automatique
- **TypeScript** : Mode strict activé
- **Commits** : Convention Conventional Commits

## 📞 Support

### Contact
- **Email** : support-skillsngo@cma-bfc.fr
- **Téléphone** : +33 (0)3 XX XX XX XX
- **Site web** : https://skillsngo.cma-bfc.fr

### Assistance technique
- **Documentation** : Wiki en ligne
- **Tickets** : Système de support intégré
- **Formation** : Sessions régulières
- **Maintenance** : Planning préventif

---

**Version** : 1.0.0  
**Dernière mise à jour** : Janvier 2024  
**Licence** : Propriétaire CMA Formation BFC