import { User } from '../types';

export interface CSVUser {
  identifiant: string;
  mot_de_passe: string;
  nom: string;
  prenom: string;
  site: string;
  groupe?: string;
  role: 'admin' | 'apprenti' | 'professeur' | 'maitre';
  professeur_referent?: string;
  maitre_apprentissage?: string;
  email?: string;
}

export const parseCSV = (csvContent: string): CSVUser[] => {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  
  const users: CSVUser[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
    const user: any = {};
    
    headers.forEach((header, index) => {
      const value = values[index] || '';
      
      switch (header.toLowerCase()) {
        case 'identifiant':
          user.identifiant = value;
          break;
        case 'mot_de_passe':
        case 'password':
          user.mot_de_passe = value;
          break;
        case 'nom':
        case 'lastname':
          user.nom = value;
          break;
        case 'prenom':
        case 'firstname':
          user.prenom = value;
          break;
        case 'site':
          user.site = value;
          break;
        case 'groupe':
        case 'class':
          user.groupe = value;
          break;
        case 'role':
          if (['admin', 'apprenti', 'professeur', 'maitre'].includes(value)) {
            user.role = value;
          }
          break;
        case 'professeur_referent':
        case 'teacher':
          user.professeur_referent = value;
          break;
        case 'maitre_apprentissage':
        case 'master':
          user.maitre_apprentissage = value;
          break;
        case 'email':
          user.email = value;
          break;
      }
    });
    
    // Validation basique
    if (user.identifiant && user.nom && user.prenom && user.role) {
      users.push(user as CSVUser);
    }
  }
  
  return users;
};

export const validateCSVUsers = (users: CSVUser[]): { valid: CSVUser[], errors: string[] } => {
  const valid: CSVUser[] = [];
  const errors: string[] = [];
  const identifiants = new Set<string>();
  
  users.forEach((user, index) => {
    const lineNumber = index + 2; // +2 car ligne 1 = headers, index commence à 0
    
    // Vérification identifiant unique
    if (identifiants.has(user.identifiant)) {
      errors.push(`Ligne ${lineNumber}: Identifiant '${user.identifiant}' déjà utilisé`);
      return;
    }
    identifiants.add(user.identifiant);
    
    // Vérification des champs obligatoires
    if (!user.identifiant) {
      errors.push(`Ligne ${lineNumber}: Identifiant manquant`);
      return;
    }
    
    if (!user.nom) {
      errors.push(`Ligne ${lineNumber}: Nom manquant`);
      return;
    }
    
    if (!user.prenom) {
      errors.push(`Ligne ${lineNumber}: Prénom manquant`);
      return;
    }
    
    if (!user.role) {
      errors.push(`Ligne ${lineNumber}: Rôle manquant`);
      return;
    }
    
    if (!['admin', 'apprenti', 'professeur', 'maitre'].includes(user.role)) {
      errors.push(`Ligne ${lineNumber}: Rôle '${user.role}' invalide`);
      return;
    }
    
    if (!user.site) {
      errors.push(`Ligne ${lineNumber}: Site manquant`);
      return;
    }
    
    // Validation email si fourni
    if (user.email && !/\S+@\S+\.\S+/.test(user.email)) {
      errors.push(`Ligne ${lineNumber}: Email '${user.email}' invalide`);
      return;
    }
    
    // Vérifications spécifiques selon le rôle
    if (user.role === 'apprenti') {
      if (!user.groupe) {
        errors.push(`Ligne ${lineNumber}: Groupe manquant pour l'apprenti`);
        return;
      }
      if (!user.professeur_referent) {
        errors.push(`Ligne ${lineNumber}: Professeur référent manquant pour l'apprenti`);
        return;
      }
      if (!user.maitre_apprentissage) {
        errors.push(`Ligne ${lineNumber}: Maître d'apprentissage manquant pour l'apprenti`);
        return;
      }
    }
    
    valid.push(user);
  });
  
  return { valid, errors };
};

export const generateCSVTemplate = (): string => {
  const headers = [
    'identifiant',
    'mot_de_passe',
    'nom',
    'prenom',
    'site',
    'groupe',
    'role',
    'professeur_referent',
    'maitre_apprentissage',
    'email'
  ];
  
  const examples = [
    'admin001,skillsngo2024,Martin,Sophie,CMA BFC - Besançon,,admin,,,sophie.martin@cma-bfc.fr',
    'app001,skillsngo2024,Dubois,Lucas,CMA BFC - Dijon,CAP Mécanique Auto - 2024,apprenti,Pierre Durand,Marie Leclerc,lucas.dubois@apprenti.cma-bfc.fr',
    'prof001,skillsngo2024,Durand,Pierre,CMA BFC - Dijon,,professeur,,,pierre.durand@cma-bfc.fr',
    'maitre001,skillsngo2024,Leclerc,Marie,Garage Leclerc SARL,,maitre,,,marie.leclerc@garage-leclerc.fr'
  ];
  
  return [headers.join(','), ...examples].join('\n');
};

export const downloadCSVTemplate = () => {
  const template = generateCSVTemplate();
  const blob = new Blob([template], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'template_utilisateurs_skillsngo.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};