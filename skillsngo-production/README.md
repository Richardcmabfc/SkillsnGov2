# SkillsNGo - Production

Application de suivi des apprentis pour CMA Formation Bourgogne-Franche-Comté. Cette version production utilise Supabase comme backend et est prête pour le déploiement.

## 🚀 Architecture

- **Frontend**: React 18 + TypeScript + Vite
- **UI**: TailwindCSS + Lucide Icons
- **Backend**: Supabase (PostgreSQL + Auth + API)
- **Déploiement**: Compatible Netlify, Vercel, GitHub Pages

## 📋 Prérequis

1. **Node.js** (version 18+)
2. **Bun** (gestionnaire de paquets)
3. **Compte Supabase** (gratuit)
4. **Compte GitHub** (pour versioning et déploiement)

## 🛠️ Configuration Supabase

### 1. Créer un projet Supabase

1. Aller sur [supabase.com](https://supabase.com)
2. Créer un nouveau projet
3. Noter l'URL du projet et la clé anonyme

### 2. Configuration de la base de données

Exécuter les commandes SQL suivantes dans l'éditeur SQL de Supabase :

```sql
-- Créer les énumérations
CREATE TYPE user_role AS ENUM ('administrateur', 'apprenti', 'professeur', 'maitre_apprentissage');
CREATE TYPE evaluation_type AS ENUM ('formative', 'sommative', 'auto_evaluation', 'co_evaluation');
CREATE TYPE planification_type AS ENUM ('cfa', 'entreprise', 'rdv_tripartite', 'evaluation');

-- Table des profils utilisateurs
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

-- Table des compétences
CREATE TABLE competences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  nom TEXT NOT NULL,
  description TEXT NOT NULL,
  referentiel TEXT NOT NULL,
  niveau INTEGER NOT NULL CHECK (niveau >= 1 AND niveau <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des évaluations
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

-- Table des journaux d'activités
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

-- Table des messages
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  expediteur_id UUID REFERENCES profiles(id) NOT NULL,
  destinataire_id UUID REFERENCES profiles(id) NOT NULL,
  sujet TEXT NOT NULL,
  contenu TEXT NOT NULL,
  lu BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des planifications
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

-- Indexes pour les performances
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_groupe ON profiles(groupe);
CREATE INDEX idx_evaluations_apprenti ON evaluations(apprenti_id);
CREATE INDEX idx_evaluations_competence ON evaluations(competence_id);
CREATE INDEX idx_journaux_apprenti ON journaux(apprenti_id);
CREATE INDEX idx_messages_destinataire ON messages(destinataire_id);
CREATE INDEX idx_planifications_apprenti ON planifications(apprenti_id);

-- RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE competences ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE journaux ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE planifications ENABLE ROW LEVEL SECURITY;

-- Politiques de sécurité (exemples - à adapter selon vos besoins)
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Trigger pour mise à jour automatique des timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### 3. Données de test

```sql
-- Insérer des compétences de test
INSERT INTO competences (code, nom, description, referentiel, niveau) VALUES
('CAP_BOUL_001', 'Pétrissage manuel', 'Maîtriser les techniques de pétrissage à la main', 'CAP Boulangerie', 1),
('CAP_BOUL_002', 'Façonnage pains', 'Réaliser le façonnage de différents types de pains', 'CAP Boulangerie', 2),
('CAP_BOUL_003', 'Cuisson contrôlée', 'Gérer la cuisson en fonction du produit', 'CAP Boulangerie', 3),
('CAP_PAT_001', 'Pâtes de base', 'Maîtriser les pâtes fondamentales', 'CAP Pâtisserie', 1),
('CAP_PAT_002', 'Décoration simple', 'Réaliser des décorations de base', 'CAP Pâtisserie', 2);
```

## 🔧 Installation et configuration

### 1. Cloner et installer

```bash
# Cloner le projet
git clone [URL_DU_REPO]
cd skillsngo-production

# Installer les dépendances
bun install
```

### 2. Configuration environnement

```bash
# Copier le fichier d'environnement
cp .env.example .env

# Modifier .env avec vos variables Supabase
VITE_SUPABASE_URL=https://votre-projet-ref.supabase.co
VITE_SUPABASE_ANON_KEY=votre-clé-anonyme-ici
```

### 3. Développement

```bash
# Lancer en développement
bun dev

# L'application sera disponible sur http://localhost:3000
```

### 4. Build production

```bash
# Construire pour la production
bun build

# Prévisualiser le build
bun preview
```

## 🌐 Déploiement

### Netlify

1. Connecter votre repo GitHub à Netlify
2. Build command: `bun build`
3. Publish directory: `dist`
4. Variables d'environnement:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### Vercel

1. Importer le projet depuis GitHub
2. Framework: Vite
3. Build command: `bun build`
4. Output directory: `dist`
5. Variables d'environnement (même que Netlify)

### GitHub Pages

```bash
# Installer gh-pages
bun add -D gh-pages

# Modifier package.json
"scripts": {
  "deploy": "bun build && gh-pages -d dist"
}

# Déployer
bun run deploy
```

## 👥 Comptes de démonstration

Une fois Supabase configuré, vous pouvez créer ces comptes de test :

| Rôle | Email | Mot de passe | Description |
|------|-------|--------------|-------------|
| Administrateur | admin@cma-formation.fr | admin123 | Gestion complète |
| Apprenti | pierre.martin@exemple.fr | apprenti123 | Vue apprenti |
| Professeur | marie.dupont@cma-formation.fr | prof123 | Suivi groupes |
| Maître | jean.bernard@entreprise.fr | maitre123 | Encadrement |

## 🔐 Sécurité

- Authentification Supabase avec JWT
- Row Level Security (RLS) activée
- Variables d'environnement pour la configuration
- HTTPS obligatoire en production

## 📊 Fonctionnalités

- ✅ Authentification multi-rôles
- ✅ Tableaux de bord personnalisés
- ✅ Gestion des compétences RNCP
- ✅ Système d'évaluation
- ✅ Journal d'activités
- ✅ Messagerie interne
- ✅ Planning et calendrier
- ✅ Import/Export CSV
- ✅ Rapports et statistiques

## 🛠️ Technologies

- **React 18** - Framework frontend
- **TypeScript** - Typage statique
- **Vite** - Build tool moderne
- **TailwindCSS** - Framework CSS
- **Supabase** - Backend as a Service
- **Lucide React** - Icônes
- **React Router** - Navigation
- **Date-fns** - Gestion des dates

## 📞 Support

Pour toute question ou problème :

1. Vérifier la documentation Supabase
2. Consulter les logs d'erreur
3. Vérifier les variables d'environnement
4. Contacter l'équipe de développement

## 📄 Licence

Propriétaire - CMA Formation Bourgogne-Franche-Comté

---

**Version**: 1.0.0  
**Dernière mise à jour**: Décembre 2024