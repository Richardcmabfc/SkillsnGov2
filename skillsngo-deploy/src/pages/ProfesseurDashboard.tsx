import React, { useState } from 'react';
import { 
  Users, 
  Target, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Star
} from 'lucide-react';
import Layout from '../components/Layout';
import StatCard from '../components/StatCard';
import { useAuth } from '../hooks/useAuth';
import { mockUsers, mockCompetences, mockJournaux } from '../data/mockData';

const ProfesseurDashboard = () => {
  const { user } = useAuth();
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [selectedApprenti, setSelectedApprenti] = useState<any>(null);

  // Simuler les apprentis dont le professeur est référent
  const mesApprentis = mockUsers.filter(u => 
    u.role === 'apprenti' && u.professeur_referent === `${user?.prenom} ${user?.nom}`
  );

  const stats = {
    totalApprentis: mesApprentis.length,
    evaluationsEnAttente: 3,
    journauxAValider: 2,
    competencesEvaluees: 15
  };

  const evaluationsRecentes = [
    {
      apprenti: 'Lucas Dubois',
      competence: 'Diagnostic électronique',
      note: 14,
      date: '2024-01-20',
      statut: 'validée'
    },
    {
      apprenti: 'Emma Martin',
      competence: 'Maintenance préventive',
      note: 16,
      date: '2024-01-18',
      statut: 'validée'
    }
  ];

  const handleEvaluation = (apprenti: any) => {
    setSelectedApprenti(apprenti);
    setShowEvaluationModal(true);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Espace Professeur
            </h1>
            <p className="text-gray-600 mt-1">
              Suivi de vos apprentis - {user?.site}
            </p>
          </div>
          <button className="btn-primary flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle évaluation
          </button>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Mes apprentis"
            value={stats.totalApprentis}
            icon={Users}
            color="blue"
          />
          <StatCard
            title="Évaluations en attente"
            value={stats.evaluationsEnAttente}
            icon={Clock}
            color="yellow"
          />
          <StatCard
            title="Journaux à valider"
            value={stats.journauxAValider}
            icon={BookOpen}
            color="red"
          />
          <StatCard
            title="Compétences évaluées"
            value={stats.competencesEvaluees}
            icon={Target}
            trend={{ value: 12, isPositive: true }}
            color="green"
          />
        </div>

        {/* Vue d'ensemble */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mes apprentis */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Mes apprentis</h2>
              <button className="text-primary-600 hover:text-primary-700 font-medium">
                Voir tous
              </button>
            </div>
            <div className="space-y-4">
              {mesApprentis.map((apprenti) => (
                <div key={apprenti.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center mr-3">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">{apprenti.prenom} {apprenti.nom}</div>
                      <div className="text-sm text-gray-600">{apprenti.groupe}</div>
                      <div className="text-xs text-gray-500">
                        Maître : {apprenti.maitre_apprentissage}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-right mr-3">
                      <div className="text-sm font-medium text-green-600">85%</div>
                      <div className="text-xs text-gray-500">Progression</div>
                    </div>
                    <button
                      onClick={() => handleEvaluation(apprenti)}
                      className="btn-secondary text-xs"
                    >
                      Évaluer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions à effectuer */}
          <div className="card">
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Actions requises</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-start p-3 bg-red-50 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-red-600 mr-2 mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-red-800">
                    2 journaux en attente de validation
                  </div>
                  <div className="text-xs text-red-700">Échéance dépassée</div>
                </div>
                <button className="text-red-600 hover:text-red-700 text-xs font-medium">
                  Voir
                </button>
              </div>
              
              <div className="flex items-start p-3 bg-yellow-50 rounded-lg">
                <Clock className="w-4 h-4 text-yellow-600 mr-2 mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-yellow-800">
                    3 évaluations formatives à programmer
                  </div>
                  <div className="text-xs text-yellow-700">Cette semaine</div>
                </div>
                <button className="text-yellow-600 hover:text-yellow-700 text-xs font-medium">
                  Programmer
                </button>
              </div>

              <div className="flex items-start p-3 bg-blue-50 rounded-lg">
                <Calendar className="w-4 h-4 text-blue-600 mr-2 mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-blue-800">
                    Rendez-vous tripartite Lucas Dubois
                  </div>
                  <div className="text-xs text-blue-700">01/02/2024 à 14:00</div>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-xs font-medium">
                  Préparer
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Évaluations récentes */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Évaluations récentes</h2>
            <button className="text-primary-600 hover:text-primary-700 font-medium">
              Voir toutes
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Apprenti</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Compétence</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Note</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Statut</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {evaluationsRecentes.map((evaluation, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{evaluation.apprenti}</td>
                    <td className="py-3 px-4">{evaluation.competence}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="font-medium">{evaluation.note}/20</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(evaluation.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {evaluation.statut}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        Détails
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Suivi des compétences */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Suivi des compétences par apprenti</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mesApprentis.map((apprenti) => (
              <div key={apprenti.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">{apprenti.prenom} {apprenti.nom}</h3>
                  <div className="text-sm text-gray-600">85%</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600 flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Acquises: 8
                    </span>
                    <span className="text-yellow-600 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      En cours: 3
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary-600 h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                </div>
                <button className="w-full mt-3 btn-secondary text-sm">
                  Voir détail
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal d'évaluation */}
      {showEvaluationModal && selectedApprenti && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Évaluer {selectedApprenti.prenom} {selectedApprenti.nom}
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Compétence
                </label>
                <select className="input">
                  <option>Sélectionnez une compétence</option>
                  {mockCompetences.map((comp) => (
                    <option key={comp.id} value={comp.id}>{comp.nom}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type d'évaluation
                </label>
                <select className="input">
                  <option value="formative">Formative</option>
                  <option value="sommative">Sommative</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Note (sur 20)
                </label>
                <input type="number" min="0" max="20" className="input" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Commentaire
                </label>
                <textarea className="input h-24" placeholder="Observations et conseils..."></textarea>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowEvaluationModal(false)}
                  className="btn-secondary"
                >
                  Annuler
                </button>
                <button type="submit" className="btn-primary">
                  Enregistrer l'évaluation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProfesseurDashboard;