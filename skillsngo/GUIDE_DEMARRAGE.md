# 🚀 Guide de Démarrage Rapide - SkillsNGo

## Accès à l'application

### Comptes de démonstration disponibles

| Rôle | Identifiant | Mot de passe | Description |
|------|-------------|--------------|-------------|
| **Administrateur** | `admin001` | `skillsngo2024` | Accès complet à la plateforme |
| **Apprenti** | `app001` | `skillsngo2024` | Lucas Dubois - CAP Mécanique |
| **Professeur** | `prof001` | `skillsngo2024` | Pierre Durand - CFA Dijon |
| **Maître d'apprentissage** | `maitre001` | `skillsngo2024` | Marie Leclerc - Garage Leclerc |

## 📋 Premiers pas par rôle

### 👑 En tant qu'Administrateur

1. **Connexion** : Utilisez `admin001` / `skillsngo2024`
2. **Vue d'ensemble** : Consultez les statistiques globales
3. **Gestion des utilisateurs** :
   - Cliquez sur "Importer CSV" pour ajouter des utilisateurs en lot
   - Téléchargez le modèle CSV pour voir le format attendu
4. **Actions rapides** :
   - Créer un groupe de formation
   - Gérer les référentiels de compétences
   - Affecter les référents professeurs/maîtres

#### Import des utilisateurs CSV
```csv
identifiant,mot_de_passe,nom,prenom,site,groupe,role,professeur_referent,maitre_apprentissage,email
app002,skillsngo2024,Martin,Emma,CMA BFC - Besançon,BTS Maintenance,apprenti,Pierre Durand,Jean Dupont,emma.martin@apprenti.cma-bfc.fr
```

### 🎓 En tant qu'Apprenti

1. **Connexion** : Utilisez `app001` / `skillsngo2024`
2. **Tableau de bord** : Visualisez votre progression
3. **Livret numérique** :
   - Cliquez sur "Nouveau journal" pour ajouter vos activités
   - Remplissez vos activités de la semaine
   - Décrivez vos progrès et difficultés
4. **Mes compétences** :
   - Consultez vos compétences et leur statut
   - Effectuez des auto-évaluations
5. **Messages** : Communiquez avec vos référents

#### Exemple de saisie journal
- **Semaine** : Sélectionnez la semaine courante
- **Activités** : "Révision moteur, diagnostic électronique, accueil clientèle"
- **Progrès** : "Amélioration du diagnostic, plus rapide sur les pannes courantes"

### 👨‍🏫 En tant que Professeur

1. **Connexion** : Utilisez `prof001` / `skillsngo2024`
2. **Mes apprentis** : Visualisez les apprentis dont vous êtes référent
3. **Évaluations** :
   - Cliquez sur "Évaluer" pour un apprenti
   - Sélectionnez la compétence à évaluer
   - Attribuez une note et ajoutez des commentaires
4. **Actions requises** :
   - Validez les journaux en attente
   - Programmez les évaluations formatives
5. **Communication** : Échangez avec les maîtres d'apprentissage

#### Processus d'évaluation
1. Sélectionner l'apprenti
2. Choisir la compétence dans le référentiel
3. Type : Formative ou Sommative
4. Noter sur 20 (optionnel)
5. Ajouter des observations détaillées

### 👷 En tant que Maître d'apprentissage

1. **Connexion** : Utilisez `maitre001` / `skillsngo2024`
2. **Mes apprentis** : Suivez les apprentis en entreprise
3. **Observations** :
   - Cliquez sur "Ajouter observation"
   - Décrivez le contexte professionnel
   - Notez les points positifs et axes d'amélioration
4. **Validation** : Signez les journaux d'apprentissage
5. **Évaluations terrain** : Évaluez les compétences en situation réelle

#### Types d'observations
- **Comportement professionnel** : Ponctualité, tenue, attitude
- **Compétence technique** : Maîtrise des gestes métier
- **Autonomie** : Capacité à travailler seul
- **Relation client** : Communication et service
- **Sécurité** : Respect des consignes

## 🔧 Fonctionnalités Clés

### 📊 Système de Compétences

- **Statuts disponibles** :
  - 🔴 Non acquis : Compétence non maîtrisée
  - 🟡 En cours : En cours d'acquisition
  - 🟢 Acquis : Compétence maîtrisée
  - 🔵 Validé : Officiellement validée

- **Types d'évaluation** :
  - **Formative** : Évaluation de progression
  - **Sommative** : Évaluation certificative
  - **Auto-évaluation** : Par l'apprenti
  - **Co-évaluation** : Apprenti + évaluateur

### 💬 Messagerie Tripartite

- **Contextes de messages** :
  - 📝 Général : Communication libre
  - 🎯 Compétence : Relatif à une compétence spécifique
  - ⭐ Évaluation : Suite à une évaluation
  - 📔 Journal : Commentaire sur le livret

### 📈 Tableaux de Bord

Chaque rôle dispose d'un tableau de bord personnalisé :

- **Statistiques en temps réel**
- **Alertes et notifications**
- **Actions prioritaires**
- **Vue d'ensemble des activités**

## 📱 Navigation

### Menu Principal (sidebar)

Les menus s'adaptent selon votre rôle :

**Administrateur :**
- 🏠 Tableau de bord
- 👥 Utilisateurs  
- 🎯 Compétences
- 📊 Statistiques
- ⚙️ Configuration

**Apprenti :**
- 🏠 Tableau de bord
- 📔 Mon livret
- 🎯 Mes compétences
- 🎓 Mon parcours

**Professeur :**
- 🏠 Tableau de bord
- 👥 Mes apprentis
- ⭐ Évaluations
- 📚 Référentiels

**Maître d'apprentissage :**
- 🏠 Tableau de bord
- 👥 Mes apprentis
- 🎯 Compétences
- 🏢 Activités entreprise

## 🔄 Workflows Typiques

### Suivi hebdomadaire d'un apprenti

1. **Apprenti** : Saisit son journal d'activités
2. **Maître** : Valide les activités en entreprise
3. **Professeur** : Examine et valide le journal
4. **Communication** : Échanges si questions/remarques

### Évaluation d'une compétence

1. **Contexte** : CFA ou Entreprise
2. **Évaluateur** : Professeur ou Maître
3. **Évaluation** : Grille de critères + note + commentaires
4. **Suivi** : Mise à jour du statut de la compétence

### Rendez-vous tripartite

1. **Planification** : Via le calendrier
2. **Préparation** : Consultation des livrets et évaluations
3. **Bilan** : Points forts, axes d'amélioration, objectifs
4. **Suivi** : Actions à mener et échéances

## 🆘 Aide et Support

### FAQ Rapide

**Q : Comment réinitialiser un mot de passe ?**
R : Contactez l'administrateur qui peut régénérer les identifiants.

**Q : Puis-je modifier une évaluation après validation ?**
R : Seuls les administrateurs peuvent modifier les évaluations validées.

**Q : Comment ajouter une nouvelle compétence ?**
R : Via l'interface administrateur > Gestion des référentiels.

**Q : Les données sont-elles sauvegardées automatiquement ?**
R : Oui, toutes les saisies sont enregistrées en temps réel.

### En cas de problème

1. **Vérifiez votre connexion internet**
2. **Actualisez la page** (F5)
3. **Vérifiez les identifiants** de connexion
4. **Contactez le support** : support-skillsngo@cma-bfc.fr

### Ressources utiles

- 📖 **Documentation complète** : README.md
- 🎥 **Tutoriels vidéo** : À venir
- 📞 **Support téléphonique** : Aux heures ouvrables
- 💬 **Chat en ligne** : Intégré à l'application

---

**🎯 Objectif** : Faciliter l'apprentissage et améliorer la coordination pédagogique !

**✨ Astuce** : Explorez les différents rôles avec les comptes de démo pour comprendre tous les aspects de la plateforme.