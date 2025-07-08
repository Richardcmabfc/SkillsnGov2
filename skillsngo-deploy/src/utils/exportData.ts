import { User, Competence, Evaluation, Journal, Message } from '../types';

export interface ExportOptions {
  includeUsers?: boolean;
  includeCompetences?: boolean;
  includeEvaluations?: boolean;
  includeJournaux?: boolean;
  includeMessages?: boolean;
  dateDebut?: string;
  dateFin?: string;
  siteFilter?: string;
  roleFilter?: string;
}

export const exportToCSV = (data: any[], filename: string, headers: string[]) => {
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header] || '';
        // Échapper les virgules et guillemets
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  downloadCSV(csvContent, filename);
};

export const downloadCSV = (csvContent: string, filename: string) => {
  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};

export const exportUsers = (users: User[], options: ExportOptions = {}) => {
  let filteredUsers = users;
  
  if (options.siteFilter) {
    filteredUsers = filteredUsers.filter(user => user.site === options.siteFilter);
  }
  
  if (options.roleFilter) {
    filteredUsers = filteredUsers.filter(user => user.role === options.roleFilter);
  }
  
  const headers = [
    'identifiant',
    'nom',
    'prenom',
    'role',
    'site',
    'groupe',
    'professeur_referent',
    'maitre_apprentissage',
    'email'
  ];
  
  const data = filteredUsers.map(user => ({
    identifiant: user.identifiant,
    nom: user.nom,
    prenom: user.prenom,
    role: user.role,
    site: user.site,
    groupe: user.groupe || '',
    professeur_referent: user.professeur_referent || '',
    maitre_apprentissage: user.maitre_apprentissage || '',
    email: user.email || ''
  }));
  
  const timestamp = new Date().toISOString().split('T')[0];
  exportToCSV(data, `utilisateurs_${timestamp}.csv`, headers);
};

export const exportCompetences = (competences: Competence[], options: ExportOptions = {}) => {
  const headers = [
    'id',
    'nom',
    'description',
    'referentiel',
    'niveau_requis',
    'status',
    'nb_evaluations'
  ];
  
  const data = competences.map(comp => ({
    id: comp.id,
    nom: comp.nom,
    description: comp.description,
    referentiel: comp.referentiel,
    niveau_requis: comp.niveau_requis,
    status: comp.status,
    nb_evaluations: comp.evaluations.length
  }));
  
  const timestamp = new Date().toISOString().split('T')[0];
  exportToCSV(data, `competences_${timestamp}.csv`, headers);
};

export const exportEvaluations = (evaluations: Evaluation[], competences: Competence[], options: ExportOptions = {}) => {
  let filteredEvaluations = evaluations;
  
  if (options.dateDebut) {
    filteredEvaluations = filteredEvaluations.filter(eval => eval.date >= options.dateDebut!);
  }
  
  if (options.dateFin) {
    filteredEvaluations = filteredEvaluations.filter(eval => eval.date <= options.dateFin!);
  }
  
  const headers = [
    'id',
    'competence_nom',
    'evaluateur_nom',
    'type',
    'note',
    'contexte',
    'date',
    'commentaire'
  ];
  
  const data = filteredEvaluations.map(eval => {
    const competence = competences.find(c => c.id === eval.competence_id);
    return {
      id: eval.id,
      competence_nom: competence?.nom || '',
      evaluateur_nom: eval.evaluateur_nom,
      type: eval.type,
      note: eval.note || '',
      contexte: eval.contexte,
      date: eval.date,
      commentaire: eval.commentaire || ''
    };
  });
  
  const timestamp = new Date().toISOString().split('T')[0];
  exportToCSV(data, `evaluations_${timestamp}.csv`, headers);
};

export const exportJournaux = (journaux: Journal[], users: User[], options: ExportOptions = {}) => {
  let filteredJournaux = journaux;
  
  if (options.dateDebut) {
    filteredJournaux = filteredJournaux.filter(journal => journal.date_creation >= options.dateDebut!);
  }
  
  if (options.dateFin) {
    filteredJournaux = filteredJournaux.filter(journal => journal.date_creation <= options.dateFin!);
  }
  
  const headers = [
    'id',
    'apprenti_nom',
    'semaine',
    'activites',
    'progres',
    'difficultes',
    'signature_apprenti',
    'signature_maitre',
    'signature_professeur',
    'date_creation'
  ];
  
  const data = filteredJournaux.map(journal => {
    const apprenti = users.find(u => u.id === journal.apprenti_id);
    return {
      id: journal.id,
      apprenti_nom: apprenti ? `${apprenti.prenom} ${apprenti.nom}` : '',
      semaine: journal.semaine,
      activites: journal.activites,
      progres: journal.progres || '',
      difficultes: journal.difficultes || '',
      signature_apprenti: journal.signature_apprenti ? 'Oui' : 'Non',
      signature_maitre: journal.signature_maitre ? 'Oui' : 'Non',
      signature_professeur: journal.signature_professeur ? 'Oui' : 'Non',
      date_creation: journal.date_creation
    };
  });
  
  const timestamp = new Date().toISOString().split('T')[0];
  exportToCSV(data, `journaux_${timestamp}.csv`, headers);
};

export const exportStatistiques = (
  users: User[], 
  competences: Competence[], 
  evaluations: Evaluation[], 
  journaux: Journal[]
) => {
  const apprentis = users.filter(u => u.role === 'apprenti');
  const professeurs = users.filter(u => u.role === 'professeur');
  const maitres = users.filter(u => u.role === 'maitre');
  
  const competencesAcquises = competences.filter(c => c.status === 'acquis' || c.status === 'valide');
  const evaluationsFormatives = evaluations.filter(e => e.type === 'formative');
  const evaluationsSommatives = evaluations.filter(e => e.type === 'sommative');
  
  const stats = [
    { indicateur: 'Nombre total d\'utilisateurs', valeur: users.length },
    { indicateur: 'Nombre d\'apprentis', valeur: apprentis.length },
    { indicateur: 'Nombre de professeurs', valeur: professeurs.length },
    { indicateur: 'Nombre de maîtres d\'apprentissage', valeur: maitres.length },
    { indicateur: 'Nombre de compétences', valeur: competences.length },
    { indicateur: 'Compétences acquises/validées', valeur: competencesAcquises.length },
    { indicateur: 'Taux de validation des compétences (%)', valeur: Math.round((competencesAcquises.length / competences.length) * 100) },
    { indicateur: 'Nombre d\'évaluations formatives', valeur: evaluationsFormatives.length },
    { indicateur: 'Nombre d\'évaluations sommatives', valeur: evaluationsSommatives.length },
    { indicateur: 'Nombre de journaux d\'apprentissage', valeur: journaux.length },
    { indicateur: 'Journaux signés par apprenti', valeur: journaux.filter(j => j.signature_apprenti).length },
    { indicateur: 'Journaux validés par maître', valeur: journaux.filter(j => j.signature_maitre).length },
    { indicateur: 'Journaux validés par professeur', valeur: journaux.filter(j => j.signature_professeur).length }
  ];
  
  const headers = ['indicateur', 'valeur'];
  const timestamp = new Date().toISOString().split('T')[0];
  exportToCSV(stats, `statistiques_${timestamp}.csv`, headers);
};

// Export pour les OPCO et DREETS
export const exportReglementaire = (
  users: User[], 
  competences: Competence[], 
  evaluations: Evaluation[], 
  journaux: Journal[],
  type: 'OPCO' | 'DREETS' | 'FRANCE_COMPETENCES'
) => {
  const apprentis = users.filter(u => u.role === 'apprenti');
  
  if (type === 'OPCO') {
    // Format spécifique OPCO
    const headers = [
      'apprenti_id',
      'nom',
      'prenom',
      'formation',
      'entreprise',
      'maitre_apprentissage',
      'professeur_referent',
      'competences_acquises',
      'competences_en_cours',
      'progression_percent'
    ];
    
    const data = apprentis.map(apprenti => {
      const competencesApprenti = competences.filter(c => 
        evaluations.some(e => e.competence_id === c.id)
      );
      const acquises = competencesApprenti.filter(c => c.status === 'acquis' || c.status === 'valide');
      const enCours = competencesApprenti.filter(c => c.status === 'en_cours');
      
      return {
        apprenti_id: apprenti.identifiant,
        nom: apprenti.nom,
        prenom: apprenti.prenom,
        formation: apprenti.groupe || '',
        entreprise: '', // À remplir selon les données entreprise
        maitre_apprentissage: apprenti.maitre_apprentissage || '',
        professeur_referent: apprenti.professeur_referent || '',
        competences_acquises: acquises.length,
        competences_en_cours: enCours.length,
        progression_percent: competencesApprenti.length > 0 ? Math.round((acquises.length / competencesApprenti.length) * 100) : 0
      };
    });
    
    const timestamp = new Date().toISOString().split('T')[0];
    exportToCSV(data, `export_OPCO_${timestamp}.csv`, headers);
  }
  
  // Ajouter d'autres formats selon les besoins
};

export const generateReportPDF = async (
  users: User[], 
  competences: Competence[], 
  evaluations: Evaluation[], 
  journaux: Journal[]
) => {
  // Cette fonction nécessiterait une librairie comme jsPDF
  // Pour l'instant, on génère un rapport en HTML qu'on peut imprimer
  
  const apprentis = users.filter(u => u.role === 'apprenti');
  const competencesAcquises = competences.filter(c => c.status === 'acquis' || c.status === 'valide');
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Rapport SkillsNGo</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
        .stat-box { border: 1px solid #ddd; padding: 15px; text-align: center; }
        .stat-number { font-size: 24px; font-weight: bold; color: #3b82f6; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f8f9fa; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Rapport d'activité SkillsNGo</h1>
        <p>CMA Formation Bourgogne-Franche-Comté</p>
        <p>Généré le ${new Date().toLocaleDateString()}</p>
      </div>
      
      <div class="stats">
        <div class="stat-box">
          <div class="stat-number">${apprentis.length}</div>
          <div>Apprentis</div>
        </div>
        <div class="stat-box">
          <div class="stat-number">${competences.length}</div>
          <div>Compétences</div>
        </div>
        <div class="stat-box">
          <div class="stat-number">${evaluations.length}</div>
          <div>Évaluations</div>
        </div>
        <div class="stat-box">
          <div class="stat-number">${Math.round((competencesAcquises.length / competences.length) * 100)}%</div>
          <div>Taux de validation</div>
        </div>
      </div>
      
      <h2>Répartition des utilisateurs</h2>
      <table>
        <tr><th>Rôle</th><th>Nombre</th></tr>
        <tr><td>Apprentis</td><td>${users.filter(u => u.role === 'apprenti').length}</td></tr>
        <tr><td>Professeurs</td><td>${users.filter(u => u.role === 'professeur').length}</td></tr>
        <tr><td>Maîtres d'apprentissage</td><td>${users.filter(u => u.role === 'maitre').length}</td></tr>
        <tr><td>Administrateurs</td><td>${users.filter(u => u.role === 'admin').length}</td></tr>
      </table>
    </body>
    </html>
  `;
  
  const newWindow = window.open('', '_blank');
  if (newWindow) {
    newWindow.document.write(htmlContent);
    newWindow.document.close();
  }
};