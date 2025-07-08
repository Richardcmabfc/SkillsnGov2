# 🛠️ Spécifications Techniques - SkillsNGo

## Architecture Générale

### Stack Technique

```
Frontend: React 18.2.0 + TypeScript 5.0.2
Build: Vite 4.4.5
Styling: TailwindCSS 3.3.0
Icons: Lucide React 0.263.1
Package Manager: Bun 1.2+ (ou npm/yarn)
```

### Structure des Types TypeScript

```typescript
// Types principaux
export type UserRole = 'admin' | 'apprenti' | 'professeur' | 'maitre';

export interface User {
  id: string;
  identifiant: string;
  nom: string;
  prenom: string;
  role: UserRole;
  site: string;
  groupe?: string;
  professeur_referent?: string;
  maitre_apprentissage?: string;
  email?: string;
}

export interface Competence {
  id: string;
  nom: string;
  description: string;
  referentiel: string;
  niveau_requis: 'debutant' | 'intermediaire' | 'avance' | 'expert';
  status: 'non_acquis' | 'en_cours' | 'acquis' | 'valide';
  evaluations: Evaluation[];
}
```

## 🎨 Design System

### Palette de Couleurs

```css
/* Couleurs primaires */
--primary-50: #eff6ff;
--primary-100: #dbeafe;
--primary-500: #3b82f6;
--primary-600: #2563eb;
--primary-700: #1d4ed8;
--primary-900: #1e3a8a;

/* Couleurs secondaires */
--secondary-50: #f9fafb;
--secondary-100: #f3f4f6;
--secondary-500: #6b7280;
--secondary-600: #4b5563;
--secondary-700: #374151;
--secondary-900: #111827;
```

### Classes Utilitaires TailwindCSS

```css
/* Boutons */
.btn-primary {
  @apply bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200;
}

.btn-secondary {
  @apply bg-secondary-100 hover:bg-secondary-200 text-secondary-900 px-4 py-2 rounded-lg font-medium transition-colors duration-200;
}

/* Cards */
.card {
  @apply bg-white rounded-lg shadow-sm border border-gray-200 p-6;
}

/* Inputs */
.input {
  @apply w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent;
}
```

## 🔐 Système d'Authentification

### Hook useAuth

```typescript
interface AuthContextType {
  user: User | null;
  login: (identifiant: string, password: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}

// Implémentation avec localStorage
const AuthContext = createContext<AuthContextType | null>(null);
```

### Gestion des Sessions

- **Stockage** : localStorage (développement)
- **Production** : JWT tokens + httpOnly cookies recommandés
- **Expiration** : Session persistante jusqu'à déconnexion manuelle
- **Sécurité** : Validation côté serveur requise en production

## 📊 Gestion des Données

### Structure MockData

```typescript
// Données de démonstration
export const mockUsers: User[] = [
  // 4 utilisateurs exemple (admin, apprenti, professeur, maitre)
];

export const mockCompetences: Competence[] = [
  // Compétences CAP Maintenance des véhicules
];

export const mockJournaux: Journal[] = [
  // Journaux d'apprentissage exemple
];
```

### Base de Données Production

**Recommandations :**

```sql
-- Tables principales
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identifiant VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  role user_role NOT NULL,
  site VARCHAR(200) NOT NULL,
  groupe VARCHAR(200),
  professeur_referent VARCHAR(200),
  maitre_apprentissage VARCHAR(200),
  email VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE competences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom VARCHAR(200) NOT NULL,
  description TEXT,
  referentiel VARCHAR(200) NOT NULL,
  niveau_requis competence_niveau NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE evaluations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  competence_id UUID REFERENCES competences(id),
  evaluateur_id UUID REFERENCES users(id),
  apprenti_id UUID REFERENCES users(id),
  type evaluation_type NOT NULL,
  note INTEGER CHECK (note >= 0 AND note <= 20),
  commentaire TEXT,
  contexte evaluation_contexte NOT NULL,
  date_evaluation DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🔄 Import/Export CSV

### Format Import Utilisateurs

```csv
identifiant,mot_de_passe,nom,prenom,site,groupe,role,professeur_referent,maitre_apprentissage,email
app001,skillsngo2024,Dubois,Lucas,CMA BFC - Dijon,CAP Mécanique Auto - 2024,apprenti,Pierre Durand,Marie Leclerc,lucas.dubois@apprenti.cma-bfc.fr
```

### Validation des Données

```typescript
export const validateCSVUsers = (users: CSVUser[]): { valid: CSVUser[], errors: string[] } => {
  // Validation identifiants uniques
  // Vérification champs obligatoires
  // Validation format email
  // Cohérence rôles/données
};
```

### Exports Disponibles

```typescript
// Export utilisateurs
exportUsers(users, { siteFilter?, roleFilter? })

// Export compétences  
exportCompetences(competences)

// Export évaluations avec filtres dates
exportEvaluations(evaluations, { dateDebut?, dateFin? })

// Export réglementaire OPCO/DREETS
exportReglementaire(data, type: 'OPCO' | 'DREETS' | 'FRANCE_COMPETENCES')
```

## 🎯 Système de Compétences

### Composant CompetenceRadar

```typescript
interface CompetenceRadarProps {
  competences: Competence[];
  size?: number; // Taille du radar (défaut: 200px)
}

// Génère un graphique radar SVG
// Calcule les scores selon les statuts
// Affiche légende et labels
```

### Évaluation Modal

```typescript
interface EvaluationModalProps {
  competence: Competence;
  apprenti?: User;
  onSubmit: (evaluation: any) => void;
}

// Formulaire d'évaluation complet
// Critères détaillés (1-4)
// Note globale optionnelle
// Commentaires contextualisés
```

## 💬 Système de Messagerie

### Structure Messages

```typescript
interface Message {
  id: string;
  expediteur_id: string;
  expediteur_nom: string;
  destinataires: string[];
  sujet: string;
  contenu: string;
  date: string;
  lu: boolean;
  contexte?: 'general' | 'competence' | 'evaluation' | 'journal';
  contexte_id?: string;
}
```

### Composant MessagingSystem

```typescript
// Interface complète de messagerie
// Liste des conversations
// Affichage des messages
// Composition nouveau message
// Filtrage et recherche
// Gestion des pièces jointes (prêt)
```

## 📱 Responsive Design

### Breakpoints TailwindCSS

```javascript
module.exports = {
  theme: {
    screens: {
      'sm': '640px',   // Mobile large
      'md': '768px',   // Tablette
      'lg': '1024px',  // Desktop
      'xl': '1280px',  // Large desktop
    }
  }
}
```

### Adaptations Mobile

- **Navigation** : Sidebar collapsible
- **Tableaux** : Scroll horizontal + cards en mobile
- **Modals** : Plein écran sur petits écrans
- **Touch** : Zones de clic agrandies (44px minimum)

## 🔗 APIs et Intégrations

### Structure API REST Recommandée

```typescript
// Endpoints principaux
GET    /api/users                    // Liste utilisateurs
POST   /api/users                    // Créer utilisateur
PUT    /api/users/:id                // Modifier utilisateur
DELETE /api/users/:id                // Supprimer utilisateur

GET    /api/competences              // Liste compétences
POST   /api/competences              // Créer compétence
PUT    /api/competences/:id          // Modifier compétence

GET    /api/evaluations              // Liste évaluations
POST   /api/evaluations              // Créer évaluation
GET    /api/evaluations/apprenti/:id // Évaluations d'un apprenti

GET    /api/journaux                 // Liste journaux
POST   /api/journaux                 // Créer journal
PUT    /api/journaux/:id/signature   // Signer journal

POST   /api/import/csv               // Import CSV
GET    /api/export/users             // Export utilisateurs
GET    /api/export/stats             // Export statistiques
```

### Authentification JWT

```typescript
// Headers requis
Authorization: Bearer <jwt_token>
Content-Type: application/json

// Payload JWT
{
  "user_id": "uuid",
  "role": "apprenti",
  "site": "CMA BFC - Dijon",
  "exp": 1640995200
}
```

## 🔧 Configuration de Développement

### Scripts Package.json

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "type-check": "tsc --noEmit"
  }
}
```

### Configuration Vite

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react']
        }
      }
    }
  }
});
```

## 🧪 Tests et Qualité

### Configuration ESLint

```json
{
  "extends": [
    "@typescript-eslint/recommended",
    "react-hooks/exhaustive-deps"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

### Tests Unitaires (À implémenter)

```typescript
// Exemple test composant
import { render, screen } from '@testing-library/react';
import { AuthContext } from '../hooks/useAuth';
import LoginForm from '../components/LoginForm';

test('renders login form', () => {
  render(<LoginForm />);
  expect(screen.getByLabelText(/identifiant/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
});
```

## 🚀 Déploiement Production

### Variables d'Environnement

```bash
# .env.production
VITE_APP_NAME=SkillsNGo
VITE_API_URL=https://api.skillsngo.cma-bfc.fr
VITE_APP_VERSION=1.0.0
VITE_SUPPORT_EMAIL=support-skillsngo@cma-bfc.fr
```

### Build Optimisé

```bash
# Build avec optimisations
bun run build

# Analyse du bundle
npx vite-bundle-analyzer dist/stats.json

# Test de la build localement
bun run preview
```

### Docker (Optionnel)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
```

## 📊 Performance et Monitoring

### Métriques à Suivre

- **Core Web Vitals** : LCP, FID, CLS
- **Temps de chargement** : TTFB, FCP
- **Taille des bundles** : JS, CSS, Images
- **Taux d'erreur** : 4xx, 5xx
- **Utilisation** : Pages vues, sessions

### Optimisations Implémentées

- **Code Splitting** : Lazy loading des pages
- **Tree Shaking** : Élimination code mort
- **Compression** : Gzip/Brotli
- **Caching** : Headers cache appropriés
- **Images** : Formats optimisés (WebP)

### Outils Recommandés

- **Monitoring** : Sentry, LogRocket
- **Analytics** : Google Analytics, Matomo
- **Performance** : Lighthouse CI, WebPageTest
- **Uptime** : Pingdom, UptimeRobot

## 🔒 Sécurité

### Checklist Sécurité

- [ ] **HTTPS** : Certificat SSL/TLS valide
- [ ] **CSP** : Content Security Policy
- [ ] **CORS** : Configuration appropriée
- [ ] **XSS** : Protection contre les attaques
- [ ] **CSRF** : Tokens CSRF sur mutations
- [ ] **Rate Limiting** : Limitation requêtes
- [ ] **Input Validation** : Validation serveur
- [ ] **Logs** : Audit trail complet

### Headers de Sécurité

```nginx
# Configuration Nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self'" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
```

---

**⚠️ Important** : Ces spécifications couvrent l'implémentation actuelle (MVP). Pour la production, une API backend robuste et une base de données sécurisée sont indispensables.

**🔄 Évolutivité** : L'architecture actuelle permet une migration progressive vers une solution full-stack avec backend dédié.