export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          nom: string
          prenom: string
          role: 'administrateur' | 'apprenti' | 'professeur' | 'maitre_apprentissage'
          site: string | null
          groupe: string | null
          professeur_referent_id: string | null
          maitre_apprentissage_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          nom: string
          prenom: string
          role: 'administrateur' | 'apprenti' | 'professeur' | 'maitre_apprentissage'
          site?: string | null
          groupe?: string | null
          professeur_referent_id?: string | null
          maitre_apprentissage_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          nom?: string
          prenom?: string
          role?: 'administrateur' | 'apprenti' | 'professeur' | 'maitre_apprentissage'
          site?: string | null
          groupe?: string | null
          professeur_referent_id?: string | null
          maitre_apprentissage_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      competences: {
        Row: {
          id: string
          code: string
          nom: string
          description: string
          referentiel: string
          niveau: number
          created_at: string
        }
        Insert: {
          id?: string
          code: string
          nom: string
          description: string
          referentiel: string
          niveau: number
          created_at?: string
        }
        Update: {
          id?: string
          code?: string
          nom?: string
          description?: string
          referentiel?: string
          niveau?: number
          created_at?: string
        }
      }
      evaluations: {
        Row: {
          id: string
          apprenti_id: string
          competence_id: string
          evaluateur_id: string
          type: 'formative' | 'sommative' | 'auto_evaluation' | 'co_evaluation'
          niveau_acquis: number
          commentaire: string | null
          date_evaluation: string
          created_at: string
        }
        Insert: {
          id?: string
          apprenti_id: string
          competence_id: string
          evaluateur_id: string
          type: 'formative' | 'sommative' | 'auto_evaluation' | 'co_evaluation'
          niveau_acquis: number
          commentaire?: string | null
          date_evaluation: string
          created_at?: string
        }
        Update: {
          id?: string
          apprenti_id?: string
          competence_id?: string
          evaluateur_id?: string
          type?: 'formative' | 'sommative' | 'auto_evaluation' | 'co_evaluation'
          niveau_acquis?: number
          commentaire?: string | null
          date_evaluation?: string
          created_at?: string
        }
      }
      journaux: {
        Row: {
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
        Insert: {
          id?: string
          apprenti_id: string
          titre: string
          contenu: string
          date_debut: string
          date_fin: string
          lieu: string
          missions: string
          competences_mobilisees: string[]
          signature_apprenti?: boolean
          signature_maitre?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          apprenti_id?: string
          titre?: string
          contenu?: string
          date_debut?: string
          date_fin?: string
          lieu?: string
          missions?: string
          competences_mobilisees?: string[]
          signature_apprenti?: boolean
          signature_maitre?: boolean
          created_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          expediteur_id: string
          destinataire_id: string
          sujet: string
          contenu: string
          lu: boolean
          created_at: string
        }
        Insert: {
          id?: string
          expediteur_id: string
          destinataire_id: string
          sujet: string
          contenu: string
          lu?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          expediteur_id?: string
          destinataire_id?: string
          sujet?: string
          contenu?: string
          lu?: boolean
          created_at?: string
        }
      }
      planifications: {
        Row: {
          id: string
          apprenti_id: string
          titre: string
          description: string | null
          date_debut: string
          date_fin: string
          type: 'cfa' | 'entreprise' | 'rdv_tripartite' | 'evaluation'
          lieu: string | null
          participants: string[]
          created_at: string
        }
        Insert: {
          id?: string
          apprenti_id: string
          titre: string
          description?: string | null
          date_debut: string
          date_fin: string
          type: 'cfa' | 'entreprise' | 'rdv_tripartite' | 'evaluation'
          lieu?: string | null
          participants: string[]
          created_at?: string
        }
        Update: {
          id?: string
          apprenti_id?: string
          titre?: string
          description?: string | null
          date_debut?: string
          date_fin?: string
          type?: 'cfa' | 'entreprise' | 'rdv_tripartite' | 'evaluation'
          lieu?: string | null
          participants?: string[]
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'administrateur' | 'apprenti' | 'professeur' | 'maitre_apprentissage'
      evaluation_type: 'formative' | 'sommative' | 'auto_evaluation' | 'co_evaluation'
      planification_type: 'cfa' | 'entreprise' | 'rdv_tripartite' | 'evaluation'
    }
  }
}