import { User, Competence, Journal, Message, Planification } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    identifiant: 'admin001',
    nom: 'Martin',
    prenom: 'Sophie',
    role: 'admin',
    site: 'CMA BFC - Besançon',
    email: 'sophie.martin@cma-bfc.fr'
  },
  {
    id: '2',
    identifiant: 'app001',
    nom: 'Dubois',
    prenom: 'Lucas',
    role: 'apprenti',
    site: 'CMA BFC - Dijon',
    groupe: 'CAP Mécanique Auto - 2024',
    professeur_referent: 'Pierre Durand',
    maitre_apprentissage: 'Marie Leclerc',
    email: 'lucas.dubois@apprenti.cma-bfc.fr'
  },
  {
    id: '3',
    identifiant: 'prof001',
    nom: 'Durand',
    prenom: 'Pierre',
    role: 'professeur',
    site: 'CMA BFC - Dijon',
    email: 'pierre.durand@cma-bfc.fr'
  },
  {
    id: '4',
    identifiant: 'maitre001',
    nom: 'Leclerc',
    prenom: 'Marie',
    role: 'maitre',
    site: 'Garage Leclerc SARL',
    email: 'marie.leclerc@garage-leclerc.fr'
  }
];

export const mockCompetences: Competence[] = [
  {
    id: '1',
    nom: 'Diagnostic électronique',
    description: 'Capacité à diagnostiquer les pannes électroniques sur véhicules',
    referentiel: 'CAP Maintenance des véhicules',
    niveau_requis: 'intermediaire',
    status: 'en_cours',
    evaluations: [
      {
        id: '1',
        competence_id: '1',
        evaluateur_id: '3',
        evaluateur_nom: 'Pierre Durand',
        type: 'formative',
        note: 14,
        commentaire: 'Bonne progression, continue tes efforts',
        date: '2024-01-15',
        contexte: 'cfa'
      }
    ]
  },
  {
    id: '2',
    nom: 'Maintenance préventive',
    description: 'Réaliser la maintenance préventive des véhicules',
    referentiel: 'CAP Maintenance des véhicules',
    niveau_requis: 'avance',
    status: 'acquis',
    evaluations: [
      {
        id: '2',
        competence_id: '2',
        evaluateur_id: '4',
        evaluateur_nom: 'Marie Leclerc',
        type: 'sommative',
        note: 16,
        commentaire: 'Excellente maîtrise technique',
        date: '2024-01-20',
        contexte: 'entreprise'
      }
    ]
  }
];

export const mockJournaux: Journal[] = [
  {
    id: '1',
    apprenti_id: '2',
    semaine: '2024-W03',
    activites: 'Révision moteur, diagnostic électronique, accueil clientèle',
    competences_travaillees: ['1', '2'],
    progres: 'Amélioration du diagnostic, plus rapide sur les pannes courantes',
    signature_apprenti: true,
    signature_maitre: true,
    signature_professeur: false,
    date_creation: '2024-01-19'
  }
];

export const mockMessages: Message[] = [
  {
    id: '1',
    expediteur_id: '3',
    expediteur_nom: 'Pierre Durand',
    destinataires: ['2', '4'],
    sujet: 'Point sur l\'évolution de Lucas',
    contenu: 'Bonjour, je souhaiterais faire un point sur l\'évolution de Lucas en diagnostic électronique...',
    date: '2024-01-21',
    lu: false,
    contexte: 'competence',
    contexte_id: '1'
  }
];

export const mockPlanifications: Planification[] = [
  {
    id: '1',
    titre: 'Rendez-vous tripartite - Lucas Dubois',
    description: 'Bilan mi-parcours formation',
    date_debut: '2024-02-01T14:00:00',
    date_fin: '2024-02-01T15:30:00',
    type: 'rendez_vous',
    participants: ['2', '3', '4'],
    apprenti_id: '2',
    lieu: 'CMA BFC - Dijon'
  }
];

export const defaultPassword = 'skillsngo2024';