# 🚀 Guide de déploiement SkillsNGo + Supabase

## ⚡ Déploiement express (5 minutes)

### Étape 1 : Configuration Supabase

1. **Créer un compte Supabase** sur [supabase.com](https://supabase.com)
2. **Nouveau projet** : "skillsngo-cma"
3. **Noter les identifiants** :
   - URL du projet : `https://[ref].supabase.co`
   - Clé anonyme : `eyJhbGciOiJIUzI1NiIs...`

### Étape 2 : Configuration application

1. **Ouvrir `index.html`** dans un éditeur de texte
2. **Modifier lignes 47-48** :

```javascript
// Remplacer ces valeurs
const SUPABASE_URL = 'https://votre-projet-ref.supabase.co';
const SUPABASE_ANON_KEY = 'votre-clé-anonyme-ici';
```

### Étape 3 : Base de données

1. **Aller dans l'éditeur SQL** de Supabase
2. **Copier-coller ce script** :

```sql
CREATE TYPE user_role AS ENUM ('administrateur', 'apprenti', 'professeur', 'maitre_apprentissage');

CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  role user_role NOT NULL,
  site TEXT,
  groupe TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
```

3. **Exécuter** (bouton RUN)

### Étape 4 : Déploiement

**Option A - Netlify (le plus simple)**
1. Aller sur [netlify.com](https://netlify.com)
2. Glisser-déposer le fichier `index.html`
3. ✅ **Terminé !**

**Option B - Vercel**
1. Push vers GitHub
2. Connecter à [vercel.com](https://vercel.com)
3. ✅ **Terminé !**

**Option C - GitHub Pages**
1. Push vers GitHub
2. Settings → Pages → Deploy from branch
3. ✅ **Terminé !**

## 🔗 URLs de déploiement

Après déploiement, votre application sera accessible via :

- **Netlify** : `https://[random-name].netlify.app`
- **Vercel** : `https://[repo-name].vercel.app`
- **GitHub Pages** : `https://[username].github.io/[repo-name]`

## 🧪 Test rapide

### Comptes de démonstration :

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| Admin | admin@cma-formation.fr | admin123 |
| Apprenti | pierre.martin@exemple.fr | apprenti123 |
| Professeur | marie.dupont@cma-formation.fr | prof123 |
| Maître | jean.bernard@entreprise.fr | maitre123 |

### Test en local :
```bash
# Avec Python
python3 -m http.server 8080

# Avec Node.js
npx serve -s . -p 8080

# Puis ouvrir http://localhost:8080
```

## ⚙️ Configuration avancée Supabase

### Script SQL complet pour production :

```sql
-- Types énumérés
CREATE TYPE user_role AS ENUM ('administrateur', 'apprenti', 'professeur', 'maitre_apprentissage');
CREATE TYPE evaluation_type AS ENUM ('formative', 'sommative', 'auto_evaluation', 'co_evaluation');

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

-- Sécurité RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE competences ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;

-- Politiques de sécurité
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Everyone can view competences" ON competences FOR SELECT USING (true);

-- Données de test
INSERT INTO competences (code, nom, description, referentiel, niveau) VALUES
('CAP_BOUL_001', 'Pétrissage manuel', 'Maîtriser les techniques de pétrissage à la main', 'CAP Boulangerie', 1),
('CAP_BOUL_002', 'Façonnage pains', 'Réaliser le façonnage de différents types de pains', 'CAP Boulangerie', 2),
('CAP_BOUL_003', 'Cuisson contrôlée', 'Gérer la cuisson en fonction du produit', 'CAP Boulangerie', 3),
('CAP_PAT_001', 'Pâtes de base', 'Maîtriser les pâtes fondamentales en pâtisserie', 'CAP Pâtisserie', 1),
('CAP_PAT_002', 'Décoration gâteaux', 'Réaliser des décorations simples sur gâteaux', 'CAP Pâtisserie', 2);
```

## 🔐 Activation authentification

### Dans Supabase Dashboard :

1. **Authentication** → **Settings**
2. **Enable email confirmations** : ❌ (pour la démo)
3. **Allow new users to sign up** : ✅
4. **Add allowed domains** : `*` (ou votre domaine)

### Créer des utilisateurs de test :

1. **Authentication** → **Users** → **Add user**
2. Créer chaque compte de test :

```
Email: admin@cma-formation.fr
Password: admin123
Confirm: ✅
```

3. **Ajouter le profil** dans la table `profiles` :

```sql
INSERT INTO profiles (id, email, nom, prenom, role, site, groupe) VALUES
('user-uuid-from-auth', 'admin@cma-formation.fr', 'Admin', 'Système', 'administrateur', 'Dijon', null);
```

## 🎯 Personnalisation

### Changer les couleurs :

Modifier la configuration Tailwind dans `index.html` ligne 15 :

```javascript
colors: {
    primary: {
        500: '#dc2626', // Rouge
        600: '#b91c1c',
        // ou
        500: '#059669', // Vert
        600: '#047857',
        // ou
        500: '#7c3aed', // Violet
        600: '#6d28d9',
    }
}
```

### Ajouter le logo CMA :

1. **Uploader le logo** dans Supabase Storage
2. **Modifier** ligne 201 dans `index.html` :

```javascript
<div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
    <img src="URL_LOGO_SUPABASE" alt="CMA" className="h-6 w-6" />
</div>
```

## 📈 Monitoring

### Supabase Dashboard
- **Database** : Voir les données en temps réel
- **Auth** : Gérer les utilisateurs
- **API** : Monitorer les requêtes
- **Logs** : Débugger les erreurs

### Analytics
- **Netlify Analytics** : Trafic, performance
- **Vercel Analytics** : Même chose
- **Google Analytics** : Ajouter le code de suivi

## 🆘 Dépannage

### Erreur "Invalid API key"
➡️ Vérifier `SUPABASE_URL` et `SUPABASE_ANON_KEY`

### Erreur "RLS policy"
➡️ Vérifier les politiques RLS dans Supabase

### Page blanche
➡️ Ouvrir la console du navigateur (F12)

### Connexion échoue
➡️ Vérifier que l'utilisateur existe dans Supabase Auth

## 📞 Support

- **Documentation Supabase** : [docs.supabase.com](https://docs.supabase.com)
- **Communauté** : [Discord Supabase](https://discord.supabase.com)
- **Issues GitHub** : Pour les bugs spécifiques à SkillsNGo

---

🎉 **Félicitations !** Votre application SkillsNGo est maintenant en ligne avec Supabase !