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

export interface Evaluation {
  id: string;
  competence_id: string;
  evaluateur_id: string;
  evaluateur_nom: string;
  type: 'formative' | 'sommative' | 'auto' | 'co';
  note?: number;
  commentaire?: string;
  date: string;
  contexte: 'cfa' | 'entreprise';
}

export interface Journal {
  id: string;
  apprenti_id: string;
  semaine: string;
  activites: string;
  competences_travaillees: string[];
  difficultes?: string;
  progres?: string;
  signature_apprenti?: boolean;
  signature_maitre?: boolean;
  signature_professeur?: boolean;
  date_creation: string;
}

export interface Message {
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

export interface Planification {
  id: string;
  titre: string;
  description?: string;
  date_debut: string;
  date_fin: string;
  type: 'cfa' | 'entreprise' | 'rendez_vous' | 'evaluation';
  participants: string[];
  apprenti_id?: string;
  lieu?: string;
}