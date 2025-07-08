import React, { useState } from 'react';
import { 
  Users, 
  Building, 
  Target, 
  Calendar, 
  FileText, 
  CheckCircle,
  Clock,
  Plus,
  MessageCircle,
  Star,
  Wrench
} from 'lucide-react';
import Layout from '../components/Layout';
import StatCard from '../components/StatCard';
import { useAuth } from '../hooks/useAuth';
import { mockUsers, mockCompetences, mockJournaux } from '../data/mockData';

const MaitreDashboard = () => {
  const { user } = useAuth();
  const [showObservationModal, setShowObservationModal] = useState(false);
  const [selectedApprenti, setSelectedApprenti] = useState<any>(null);

  // Simuler les apprentis encadrés par ce maître
  const mesApprentis = mockUsers.filter(u => 
    u.role === 'apprenti' && u.maitre_apprentissage === `${user?.prenom} ${user?.nom}`
  );

  const stats = {
    totalApprentis: mesApprentis.length,
    activitesEnCours: 5,
    observationsAjoutees: 12,
    competencesEvaluees: 8
  };

  const activitesRecentes = [
    {
      apprenti: 'Lucas Dubois',
      activite: 'Révision moteur',
      date: '2024-01-22',
      duree: '4h',
      competences: ['Diagnostic', 'Maintenance']
    },
    {
      apprenti: 'Lucas Dubois',
      activite: 'Accueil clientèle',
      date: '2024-01-21',
      duree: '2h',
      competences: ['Communication', 'Service client']
    }
  ];

  const journauxAValider = mockJournaux.filter(j => !j.signature_maitre);

  const handleObservation = (apprenti: any) => {
    setSelectedApprenti(apprenti);
    setShowObservationModal(true);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Espace Maître d'apprentissage
            </h1>
            <p className="text-gray-600 mt-1">
              Suivi des apprentis en entreprise - {user?.site}
            </p>
          </div>
          <button className="btn-primary flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle observation
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
            title="Activités en cours"
            value={stats.activitesEnCours}
            icon={Wrench}
            color="green"
          />
          <StatCard
            title="Observations ajoutées"
            value={stats.observationsAjoutees}
            icon={FileText}
            trend={{ value: 15, isPositive: true }}
            color="purple"
          />
          <StatCard
            title="Compétences évaluées"
            value={stats.competencesEvaluees}
            icon={Target}
            color="yellow"
          />
        </div>

        {/* Vue d'ensemble */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mes apprentis */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Mes apprentis</h2>
            </div>
            <div className="space-y-4">
              {mesApprentis.map((apprenti) => (
                <div key={apprenti.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mr-3">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">{apprenti.prenom} {apprenti.nom}</div>
                        <div className="text-sm text-gray-600">{apprenti.groupe}</div>
                        <div className="text-xs text-gray-500">
                          Prof. référent : {apprenti.professeur_referent}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-green-600">78% acquis</div>
                      <div className="text-xs text-gray-500">En entreprise</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleObservation(apprenti)}
                        className="btn-secondary text-xs"
                      >
                        Ajouter observation
                      </button>
                      <button className="text-primary-600 hover:text-primary-700 text-xs font-medium">
                        Voir livret
                      </button>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      Prochain CFA : 25 Jan
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Journaux à valider */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Journaux à valider</h2>
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                {journauxAValider.length} en attente
              </span>
            </div>
            <div className="space-y-3">
              {journauxAValider.map((journal) => {
                const apprenti = mesApprentis.find(a => a.id === journal.apprenti_id);
                return (
                  <div key={journal.id} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{apprenti?.prenom} {apprenti?.nom}</div>
                      <div className="text-sm text-gray-600">Semaine {journal.semaine}</div>
                    </div>
                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                      {journal.activites}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {journal.signature_apprenti ? (
                          <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                            ✓ Apprenti
                          </span>
                        ) : (
                          <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                            ⏳ Apprenti
                          </span>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-red-600 hover:text-red-700 text-xs font-medium">
                          Rejeter
                        </button>
                        <button className="btn-primary text-xs">
                          Valider
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Activités récentes */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Activités en entreprise</h2>
            <button className="text-primary-600 hover:text-primary-700 font-medium">
              Planifier activité
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Apprenti</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Activité</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Durée</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Compétences</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {activitesRecentes.map((activite, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{activite.apprenti}</td>
                    <td className="py-3 px-4">{activite.activite}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(activite.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">{activite.duree}</td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {activite.competences.map((comp, i) => (
                          <span key={i} className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                            {comp}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        Évaluer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Compétences à évaluer */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Évaluation des compétences en entreprise</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockCompetences.slice(0, 3).map((competence) => (
              <div key={competence.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start">
                    <div className="p-2 bg-purple-50 rounded-lg mr-3">
                      <Target className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{competence.nom}</h3>
                      <p className="text-xs text-gray-600 mt-1">{competence.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-xs text-gray-500">Contexte entreprise</div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Lucas Dubois</span>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-yellow-400 mr-1" />
                      <span className="text-xs">À évaluer</span>
                    </div>
                  </div>
                  <button className="w-full btn-secondary text-xs mt-2">
                    Évaluer en entreprise
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Communication */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Communication tripartite</h2>
            <button className="btn-secondary flex items-center">
              <MessageCircle className="w-4 h-4 mr-2" />
              Nouveau message
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex items-start p-3 bg-blue-50 rounded-lg">
              <MessageCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5" />
              <div className="flex-1">
                <div className="text-sm font-medium text-blue-800">
                  Pierre Durand (Professeur)
                </div>
                <div className="text-sm text-blue-700 mt-1">
                  "Point sur l'évolution de Lucas en diagnostic électronique..."
                </div>
                <div className="text-xs text-blue-600 mt-1">Il y a 2 heures</div>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-xs font-medium">
                Répondre
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal d'observation */}
      {showObservationModal && selectedApprenti && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Observation - {selectedApprenti.prenom} {selectedApprenti.nom}
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type d'observation
                </label>
                <select className="input">
                  <option>Comportement professionnel</option>
                  <option>Compétence technique</option>
                  <option>Autonomie</option>
                  <option>Relation client</option>
                  <option>Sécurité</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contexte / Activité
                </label>
                <input 
                  type="text" 
                  className="input" 
                  placeholder="Ex: Révision moteur client Dupont"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Observation
                </label>
                <textarea 
                  className="input h-24" 
                  placeholder="Décrivez votre observation..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Points positifs / à améliorer
                </label>
                <textarea 
                  className="input h-20" 
                  placeholder="Conseils et encouragements..."
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowObservationModal(false)}
                  className="btn-secondary"
                >
                  Annuler
                </button>
                <button type="submit" className="btn-primary">
                  Enregistrer l'observation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default MaitreDashboard;