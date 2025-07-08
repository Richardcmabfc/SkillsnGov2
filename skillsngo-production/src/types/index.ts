export interface User {
  id: string
  email: string
  nom: string
  prenom: string
  role: 'administrateur' | 'apprenti' | 'professeur' | 'maitre_apprentissage'
  site?: string
  groupe?: string
  professeur_referent_id?: string
  maitre_apprentissage_id?: string
  created_at: string
  updated_at: string
}

export interface Competence {
  id: string
  code: string
  nom: string
  description: string
  referentiel: string
  niveau: number
  created_at: string
}

export interface Evaluation {
  id: string
  apprenti_id: string
  competence_id: string
  evaluateur_id: string
  type: 'formative' | 'sommative' | 'auto_evaluation' | 'co_evaluation'
  niveau_acquis: number
  commentaire?: string
  date_evaluation: string
  created_at: string
  competence?: Competence
  evaluateur?: User
}

export interface Journal {
  id: string
  apprenti_id: string
  titre: string
  contenu: string
  date_debut: string
  date_fin: string
  lieu: string
  missions: string
  competences_mobilisees: string[]
  signature_apprenti: boolean
  signature_maitre: boolean
  created_at: string
}

export interface Message {
  id: string
  expediteur_id: string
  destinataire_id: string
  sujet: string
  contenu: string
  lu: boolean
  created_at: string
  expediteur?: User
  destinataire?: User
}

export interface Planification {
  id: string
  apprenti_id: string
  titre: string
  description?: string
  date_debut: string
  date_fin: string
  type: 'cfa' | 'entreprise' | 'rdv_tripartite' | 'evaluation'
  lieu?: string
  participants: string[]
  created_at: string
  apprenti?: User
}

export interface AppState {
  user: User | null
  loading: boolean
  error: string | null
}

export interface CompetenceProgress {
  competence: Competence
  evaluations: Evaluation[]
  moyenne: number
  progression: number
}

export interface DashboardStats {
  total_apprentis?: number
  total_evaluations?: number
  total_competences?: number
  taux_completion?: number
  messages_non_lus?: number
  prochains_rdv?: number
}

export interface CSVImportResult {
  success: boolean
  imported: number
  errors: string[]
  data?: User[]
}