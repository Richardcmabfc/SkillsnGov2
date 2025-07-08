import React, { useState } from 'react';
import { X, Star, User, Calendar, MapPin, MessageCircle, Plus } from 'lucide-react';
import { Competence, Evaluation } from '../types';
import EvaluationModal from './EvaluationModal';

interface CompetenceDetailProps {
  competence: Competence;
  isOpen: boolean;
  onClose: () => void;
  canEvaluate?: boolean;
  apprenti?: any;
}

const CompetenceDetail = ({ competence, isOpen, onClose, canEvaluate = false, apprenti }: CompetenceDetailProps) => {
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);

  if (!isOpen) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'non_acquis': return 'bg-red-100 text-red-800';
      case 'en_cours': return 'bg-yellow-100 text-yellow-800';
      case 'acquis': return 'bg-green-100 text-green-800';
      case 'valide': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'formative': return 'bg-blue-50 text-blue-700';
      case 'sommative': return 'bg-green-50 text-green-700';
      case 'auto': return 'bg-purple-50 text-purple-700';
      case 'co': return 'bg-yellow-50 text-yellow-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const getContexteIcon = (contexte: string) => {
    return contexte === 'entreprise' ? '🏢' : '🎓';
  };

  const handleNewEvaluation = (evaluation: any) => {
    console.log('Nouvelle évaluation:', evaluation);
    // Ici on ajouterait l'évaluation à la liste
    setShowEvaluationModal(false);
  };

  const evaluationsMoyenne = competence.evaluations.length > 0 
    ? competence.evaluations.reduce((sum, eval) => sum + (eval.note || 0), 0) / competence.evaluations.filter(e => e.note).length
    : 0;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
        <div className="bg-white rounded-lg w-full max-w-4xl max-h-screen overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-3 bg-primary-50 rounded-lg mr-4">
                  <Star className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{competence.nom}</h2>
                  <p className="text-sm text-gray-600">{competence.referentiel}</p>
                </div>
                <span className={`ml-4 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(competence.status)}`}>
                  {competence.status}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                {canEvaluate && (
                  <button
                    onClick={() => setShowEvaluationModal(true)}
                    className="btn-primary flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Évaluer
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Informations générales */}
              <div className="lg:col-span-2 space-y-6">
                {/* Description */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-700">{competence.description}</p>
                  <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
                    <span>Niveau requis : <span className="font-medium">{competence.niveau_requis}</span></span>
                    <span>Référentiel : <span className="font-medium">{competence.referentiel}</span></span>
                  </div>
                </div>

                {/* Historique des évaluations */}
                <div className="card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Historique des évaluations</h3>
                    <span className="text-sm text-gray-600">{competence.evaluations.length} évaluation(s)</span>
                  </div>
                  
                  {competence.evaluations.length > 0 ? (
                    <div className="space-y-4">
                      {competence.evaluations.map((evaluation) => (
                        <div key={evaluation.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-gray-600" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{evaluation.evaluateur_nom}</div>
                                <div className="text-sm text-gray-600 flex items-center">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {new Date(evaluation.date).toLocaleDateString()}
                                  <span className="mx-2">•</span>
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {getContexteIcon(evaluation.contexte)} {evaluation.contexte}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(evaluation.type)}`}>
                                {evaluation.type}
                              </span>
                              {evaluation.note && (
                                <div className="flex items-center">
                                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                  <span className="font-medium">{evaluation.note}/20</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {evaluation.commentaire && (
                            <div className="bg-gray-50 rounded-lg p-3">
                              <p className="text-sm text-gray-700">{evaluation.commentaire}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Star className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>Aucune évaluation pour cette compétence</p>
                      {canEvaluate && (
                        <button
                          onClick={() => setShowEvaluationModal(true)}
                          className="btn-primary mt-3"
                        >
                          Première évaluation
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar - Statistiques */}
              <div className="space-y-4">
                {/* Progression */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Progression</h3>
                  <div className="space-y-4">
                    {evaluationsMoyenne > 0 && (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Moyenne des notes</span>
                          <span className="font-medium">{evaluationsMoyenne.toFixed(1)}/20</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary-600 h-2 rounded-full" 
                            style={{ width: `${(evaluationsMoyenne / 20) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <div className="text-sm text-gray-600 mb-2">Statut actuel</div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(competence.status)}`}>
                        {competence.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div>
                      <div className="text-sm text-gray-600 mb-2">Évaluations</div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>CFA</span>
                          <span>{competence.evaluations.filter(e => e.contexte === 'cfa').length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Entreprise</span>
                          <span>{competence.evaluations.filter(e => e.contexte === 'entreprise').length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions rapides */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                  <div className="space-y-2">
                    {canEvaluate && (
                      <button
                        onClick={() => setShowEvaluationModal(true)}
                        className="w-full btn-primary text-sm"
                      >
                        Nouvelle évaluation
                      </button>
                    )}
                    <button className="w-full btn-secondary text-sm flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Commenter
                    </button>
                  </div>
                </div>

                {/* Compétences liées */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Compétences liées</h3>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600 p-2 bg-gray-50 rounded">
                      Maintenance corrective
                    </div>
                    <div className="text-sm text-gray-600 p-2 bg-gray-50 rounded">
                      Sécurité en atelier
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal d'évaluation */}
      <EvaluationModal
        isOpen={showEvaluationModal}
        onClose={() => setShowEvaluationModal(false)}
        competence={competence}
        apprenti={apprenti}
        onSubmit={handleNewEvaluation}
      />
    </>
  );
};

export default CompetenceDetail;