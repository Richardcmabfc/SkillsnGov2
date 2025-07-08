import React, { useState } from 'react';
import { 
  BookOpen, 
  Target, 
  Calendar, 
  User, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Plus,
  FileText,
  PenTool
} from 'lucide-react';
import Layout from '../components/Layout';
import StatCard from '../components/StatCard';
import CompetenceCard from '../components/CompetenceCard';
import { useAuth } from '../hooks/useAuth';
import { mockCompetences, mockJournaux } from '../data/mockData';

const ApprentiDashboard = () => {
  const { user } = useAuth();
  const [showJournalForm, setShowJournalForm] = useState(false);
  const [newJournal, setNewJournal] = useState({
    semaine: '',
    activites: '',
    competences_travaillees: [] as string[],
    difficultes: '',
    progres: ''
  });

  const mesCompetences = mockCompetences;
  const monJournal = mockJournaux.filter(j => j.apprenti_id === user?.id);

  const stats = {
    competencesAcquises: mesCompetences.filter(c => c.status === 'acquis' || c.status === 'valide').length,
    competencesEnCours: mesCompetences.filter(c => c.status === 'en_cours').length,
    competencesTotal: mesCompetences.length,
    journauxSemaine: monJournal.length
  };

  const handleJournalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nouveau journal:', newJournal);
    setShowJournalForm(false);
    setNewJournal({
      semaine: '',
      activites: '',
      competences_travaillees: [],
      difficultes: '',
      progres: ''
    });
  };

  const prochainRdv = {
    date: '2024-02-01',
    heure: '14:00',
    type: 'Rendez-vous tripartite',
    lieu: 'CMA BFC - Dijon'
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Bonjour {user?.prenom} !
            </h1>
            <p className="text-gray-600 mt-1">
              {user?.groupe} - Suivi de votre parcours d'apprentissage
            </p>
          </div>
          <button
            onClick={() => setShowJournalForm(true)}
            className="btn-primary flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouveau journal
          </button>
        </div>

        {/* Statistiques de progression */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Compétences acquises"
            value={`${stats.competencesAcquises}/${stats.competencesTotal}`}
            icon={CheckCircle}
            color="green"
          />
          <StatCard
            title="En cours d'acquisition"
            value={stats.competencesEnCours}
            icon={Clock}
            color="yellow"
          />
          <StatCard
            title="Taux de progression"
            value={`${Math.round((stats.competencesAcquises / stats.competencesTotal) * 100)}%`}
            icon={Target}
            color="blue"
          />
          <StatCard
            title="Journaux cette semaine"
            value={stats.journauxSemaine}
            icon={BookOpen}
            color="purple"
          />
        </div>

        {/* Vue d'ensemble */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Prochain rendez-vous */}
          <div className="card">
            <div className="flex items-center mb-4">
              <Calendar className="w-5 h-5 text-primary-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Prochain rendez-vous</h2>
            </div>
            <div className="space-y-3">
              <div className="p-4 bg-primary-50 rounded-lg">
                <div className="font-medium text-primary-900">{prochainRdv.type}</div>
                <div className="text-sm text-primary-700 mt-1">
                  {new Date(prochainRdv.date).toLocaleDateString()} à {prochainRdv.heure}
                </div>
                <div className="text-sm text-primary-600 mt-1">{prochainRdv.lieu}</div>
              </div>
              <div className="text-sm text-gray-600">
                Avec {user?.professeur_referent} et {user?.maitre_apprentissage}
              </div>
            </div>
          </div>

          {/* Mes référents */}
          <div className="card">
            <div className="flex items-center mb-4">
              <User className="w-5 h-5 text-primary-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Mes référents</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mr-3">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-medium">{user?.professeur_referent}</div>
                  <div className="text-sm text-gray-600">Professeur CFA</div>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-medium">{user?.maitre_apprentissage}</div>
                  <div className="text-sm text-gray-600">Maître d'apprentissage</div>
                </div>
              </div>
            </div>
          </div>

          {/* Alertes */}
          <div className="card">
            <div className="flex items-center mb-4">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">À faire</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-start p-3 bg-yellow-50 rounded-lg">
                <AlertCircle className="w-4 h-4 text-yellow-600 mr-2 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-yellow-800">
                    Journal semaine 4 à compléter
                  </div>
                  <div className="text-xs text-yellow-700">Échéance : demain</div>
                </div>
              </div>
              <div className="flex items-start p-3 bg-blue-50 rounded-lg">
                <FileText className="w-4 h-4 text-blue-600 mr-2 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-blue-800">
                    Auto-évaluation compétences
                  </div>
                  <div className="text-xs text-blue-700">2 compétences en attente</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mes compétences */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Mes compétences</h2>
            <button className="text-primary-600 hover:text-primary-700 font-medium">
              Voir toutes
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mesCompetences.slice(0, 4).map((competence) => (
              <CompetenceCard key={competence.id} competence={competence} />
            ))}
          </div>
        </div>

        {/* Mon journal */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Mon journal d'apprentissage</h2>
            <button
              onClick={() => setShowJournalForm(true)}
              className="btn-secondary flex items-center"
            >
              <PenTool className="w-4 h-4 mr-2" />
              Nouvelle entrée
            </button>
          </div>
          {monJournal.length > 0 ? (
            <div className="space-y-4">
              {monJournal.map((journal) => (
                <div key={journal.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Semaine {journal.semaine}</h3>
                    <div className="flex items-center space-x-2">
                      {journal.signature_apprenti && (
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                          Signé
                        </span>
                      )}
                      {journal.signature_maitre && (
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                          Validé maître
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2">{journal.activites}</p>
                  {journal.progres && (
                    <div className="text-sm text-green-700 bg-green-50 p-2 rounded">
                      <strong>Progrès :</strong> {journal.progres}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Aucune entrée dans votre journal pour le moment.</p>
              <p className="text-sm">Commencez par ajouter vos activités de la semaine.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal nouveau journal */}
      {showJournalForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Nouveau journal d'activités</h3>
            <form onSubmit={handleJournalSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Semaine
                </label>
                <input
                  type="week"
                  value={newJournal.semaine}
                  onChange={(e) => setNewJournal({...newJournal, semaine: e.target.value})}
                  className="input"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Activités réalisées
                </label>
                <textarea
                  value={newJournal.activites}
                  onChange={(e) => setNewJournal({...newJournal, activites: e.target.value})}
                  className="input h-32"
                  placeholder="Décrivez les activités réalisées cette semaine..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Progrès et apprentissages
                </label>
                <textarea
                  value={newJournal.progres}
                  onChange={(e) => setNewJournal({...newJournal, progres: e.target.value})}
                  className="input h-24"
                  placeholder="Quels progrès avez-vous réalisés ?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficultés rencontrées
                </label>
                <textarea
                  value={newJournal.difficultes}
                  onChange={(e) => setNewJournal({...newJournal, difficultes: e.target.value})}
                  className="input h-24"
                  placeholder="Y a-t-il eu des difficultés particulières ?"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowJournalForm(false)}
                  className="btn-secondary"
                >
                  Annuler
                </button>
                <button type="submit" className="btn-primary">
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ApprentiDashboard;