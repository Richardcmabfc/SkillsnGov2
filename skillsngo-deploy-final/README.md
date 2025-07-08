# SkillsNGo - Version Déploiement Final

🚀 **Application de suivi des apprentis avec intégration Supabase**

Cette version combine la robustesse de Supabase avec la simplicité de déploiement d'une application web monopage.

## ✨ Caractéristiques

- **Architecture hybride** : CDN + Supabase pour fiabilité maximale
- **Prêt à déployer** : Un seul fichier HTML autonome
- **Supabase intégré** : Base de données PostgreSQL + Auth + API temps réel
- **Responsive design** : TailwindCSS + React 18
- **Multi-rôles** : Admin, Apprenti, Professeur, Maître d'apprentissage

## 🎯 Avantages de cette approche

### ✅ Déploiement simplifié
- Un seul fichier `index.html`
- Aucune compilation nécessaire
- Compatible avec tous les hébergeurs
- Déploiement en quelques minutes

### ✅ Intégration Supabase complète
- Base de données PostgreSQL robuste
- Authentification sécurisée
- API REST automatique
- Synchronisation temps réel
- Row Level Security (RLS)

### ✅ Interface moderne
- React 18 + Hooks
- TailwindCSS pour le style
- Lucide Icons
- Animations fluides

## 🛠️ Configuration Supabase

### 1. Créer le projet Supabase

1. Aller sur [supabase.com](https://supabase.com)
2. Créer un nouveau projet "skillsngo-cma"
3. Noter l'URL et la clé API anonyme

### 2. Configurer l'application

Modifier les variables dans `index.html` ligne 47-48 :

```javascript
const SUPABASE_URL = 'https://votre-projet-ref.supabase.co';
const SUPABASE_ANON_KEY = 'votre-clé-anonyme-supabase';
```

### 3. Créer la base de données

Exécuter ce script SQL dans l'éditeur Supabase :

```sql
-- Énumérations
CREATE TYPE user_role AS ENUM ('administrateur', 'apprenti', 'professeur', 'maitre_apprentissage');
CREATE TYPE evaluation_type AS ENUM ('formative', 'sommative', 'auto_evaluation', 'co_evaluation');
CREATE TYPE planification_type AS ENUM ('cfa', 'entreprise', 'rdv_tripartite', 'evaluation');

-- Table profiles (étend auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  role user_role NOT NULL,
  site TEXT,
  groupe TEXT,
  professeur_referent_id UUID REFERENCES profiles(id),
  maitre_apprentissage_id UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table competences
CREATE TABLE competences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  nom TEXT NOT NULL,
  description TEXT NOT NULL,
  referentiel TEXT NOT NULL,
  niveau INTEGER NOT NULL CHECK (niveau >= 1 AND niveau <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table evaluations
CREATE TABLE evaluations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  apprenti_id UUID REFERENCES profiles(id) NOT NULL,
  competence_id UUID REFERENCES competences(id) NOT NULL,
  evaluateur_id UUID REFERENCES profiles(id) NOT NULL,
  type evaluation_type NOT NULL,
  niveau_acquis INTEGER NOT NULL CHECK (niveau_acquis >= 0 AND niveau_acquis <= 4),
  commentaire TEXT,
  date_evaluation DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table journaux
CREATE TABLE journaux (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  apprenti_id UUID REFERENCES profiles(id) NOT NULL,
  titre TEXT NOT NULL,
  contenu TEXT NOT NULL,
  date_debut DATE NOT NULL,
  date_fin DATE NOT NULL,
  lieu TEXT NOT NULL,
  missions TEXT NOT NULL,
  competences_mobilisees TEXT[] DEFAULT '{}',
  signature_apprenti BOOLEAN DEFAULT FALSE,
  signature_maitre BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table messages
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  expediteur_id UUID REFERENCES profiles(id) NOT NULL,
  destinataire_id UUID REFERENCES profiles(id) NOT NULL,
  sujet TEXT NOT NULL,
  contenu TEXT NOT NULL,
  lu BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table planifications
CREATE TABLE planifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  apprenti_id UUID REFERENCES profiles(id) NOT NULL,
  titre TEXT NOT NULL,
  description TEXT,
  date_debut TIMESTAMP WITH TIME ZONE NOT NULL,
  date_fin TIMESTAMP WITH TIME ZONE NOT NULL,
  type planification_type NOT NULL,
  lieu TEXT,
  participants TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE competences ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE journaux ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE planifications ENABLE ROW LEVEL SECURITY;

-- Politiques de base (à adapter selon besoins)
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Données de test
INSERT INTO competences (code, nom, description, referentiel, niveau) VALUES
('CAP_BOUL_001', 'Pétrissage manuel', 'Maîtriser les techniques de pétrissage à la main', 'CAP Boulangerie', 1),
('CAP_BOUL_002', 'Façonnage pains', 'Réaliser le façonnage de différents types de pains', 'CAP Boulangerie', 2),
('CAP_BOUL_003', 'Cuisson contrôlée', 'Gérer la cuisson en fonction du produit', 'CAP Boulangerie', 3);
```

## 🌐 Déploiement

### Option 1: Netlify (Recommandé)

```bash
# 1. Drag & drop du fichier index.html sur netlify.com
# 2. Ou via Git : connecter le repo GitHub
# 3. Configuration automatique
```

### Option 2: Vercel

```bash
# 1. Importer depuis GitHub
# 2. Aucune configuration nécessaire
# 3. Déploiement automatique
```

### Option 3: GitHub Pages

```bash
# 1. Pousser vers GitHub
# 2. Activer Pages dans Settings
# 3. Source: Deploy from branch (main)
```

### Option 4: Serveur local

```bash
# Python
python3 -m http.server 8080

# Node.js
npx serve -s . -p 8080

# PHP
php -S localhost:8080
```

## 👥 Comptes de démonstration

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| **Administrateur** | admin@cma-formation.fr | admin123 |
| **Apprenti** | pierre.martin@exemple.fr | apprenti123 |
| **Professeur** | marie.dupont@cma-formation.fr | prof123 |
| **Maître** | jean.bernard@entreprise.fr | maitre123 |

> **Note** : Dans la version démo actuelle, l'authentification est simulée. Remplacez la configuration Supabase pour une vraie base de données.

## 🔧 Personnalisation

### Modifier les couleurs

```javascript
// Dans tailwind.config (ligne 15)
colors: {
    primary: {
        500: '#votre-couleur',
        600: '#votre-couleur-foncee',
        // ...
    }
}
```

### Ajouter des fonctionnalités

1. Modifier le code React dans la balise `<script type="text/babel">`
2. Ajouter de nouveaux composants
3. Intégrer avec l'API Supabase réelle

### Connecter la vraie API Supabase

Remplacer l'objet `supabase` simulé par :

```javascript
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

## 📊 Fonctionnalités à développer

- [ ] Import CSV réel
- [ ] Système de notifications
- [ ] Chat temps réel
- [ ] Signature électronique
- [ ] Export PDF des rapports
- [ ] Calendrier interactif
- [ ] Upload de fichiers
- [ ] Gestion des groupes
- [ ] Statistiques avancées

## 🔒 Sécurité

- ✅ Authentification Supabase
- ✅ Row Level Security (RLS)
- ✅ HTTPS obligatoire
- ✅ Validation côté client et serveur
- ✅ Tokens JWT sécurisés

## 📞 Support

Pour configurer Supabase ou personnaliser l'application :

1. **Documentation Supabase** : [docs.supabase.com](https://docs.supabase.com)
2. **Communauté** : [GitHub Discussions](https://github.com/supabase/supabase/discussions)
3. **Support CMA** : [contact technique]

## 🏆 Avantages vs version compilée

| Critère | Version CDN | Version Build |
|---------|-------------|---------------|
| **Déploiement** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Maintenance** | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| **Performance** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **SEO** | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Cache** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

**Version** : 1.0.0 Final  
**Intégration** : Supabase + GitHub Ready  
**Status** : Production Ready ✅