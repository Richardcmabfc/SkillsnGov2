import React, { useState } from 'react';
import { X, Star, User, Calendar, FileText } from 'lucide-react';
import { Competence, User as UserType } from '../types';
import { useAuth } from '../hooks/useAuth';

interface EvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  competence: Competence;
  apprenti?: UserType;
  onSubmit: (evaluation: any) => void;
}

const EvaluationModal = ({ isOpen, onClose, competence, apprenti, onSubmit }: EvaluationModalProps) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    type: 'formative' as 'formative' | 'sommative' | 'auto' | 'co',
    note: '',
    commentaire: '',
    contexte: 'cfa' as 'cfa' | 'entreprise',
    criteres: {
      maitrise_technique: 0,
      autonomie: 0,
      qualite_travail: 0,
      respect_consignes: 0,
      initiative: 0
    }
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const evaluation = {
      id: Date.now().toString(),
      competence_id: competence.id,
      evaluateur_id: user?.id || '',
      evaluateur_nom: `${user?.prenom} ${user?.nom}`,
      type: formData.type,
      note: formData.note ? parseInt(formData.note) : undefined,
      commentaire: formData.commentaire,
      date: new Date().toISOString().split('T')[0],
      contexte: formData.contexte,
      criteres: formData.criteres
    };

    onSubmit(evaluation);
    onClose();
    
    // Reset form
    setFormData({
      type: 'formative',
      note: '',
      commentaire: '',
      contexte: 'cfa',
      criteres: {
        maitrise_technique: 0,
        autonomie: 0,
        qualite_travail: 0,
        respect_consignes: 0,
        initiative: 0
      }
    });
  };

  const updateCritere = (critere: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      criteres: {
        ...prev.criteres,
        [critere]: value
      }
    }));
  };

  const criteresList = [
    { key: 'maitrise_technique', label: 'Maîtrise technique' },
    { key: 'autonomie', label: 'Autonomie' },
    { key: 'qualite_travail', label: 'Qualité du travail' },
    { key: 'respect_consignes', label: 'Respect des consignes' },
    { key: 'initiative', label: 'Prise d\'initiative' }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'formative': return 'bg-blue-100 text-blue-800';
      case 'sommative': return 'bg-green-100 text-green-800';
      case 'auto': return 'bg-purple-100 text-purple-800';
      case 'co': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-screen overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Nouvelle évaluation</h2>
              <p className="text-sm text-gray-600 mt-1">
                {competence.nom} - {apprenti ? `${apprenti.prenom} ${apprenti.nom}` : 'Auto-évaluation'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Info de la compétence */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start">
              <div className="p-2 bg-primary-50 rounded-lg mr-3">
                <FileText className="w-5 h-5 text-primary-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{competence.nom}</h3>
                <p className="text-sm text-gray-600 mt-1">{competence.description}</p>
                <div className="flex items-center mt-2 space-x-4">
                  <span className="text-xs text-gray-500">
                    Référentiel : {competence.referentiel}
                  </span>
                  <span className="text-xs text-gray-500">
                    Niveau : {competence.niveau_requis}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Type et contexte */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type d'évaluation
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                className="input"
                required
              >
                <option value="formative">Formative</option>
                <option value="sommative">Sommative</option>
                <option value="auto">Auto-évaluation</option>
                <option value="co">Co-évaluation</option>
              </select>
              <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(formData.type)}`}>
                {formData.type}
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contexte
              </label>
              <select
                value={formData.contexte}
                onChange={(e) => setFormData(prev => ({ ...prev, contexte: e.target.value as any }))}
                className="input"
                required
              >
                <option value="cfa">CFA</option>
                <option value="entreprise">Entreprise</option>
              </select>
            </div>
          </div>

          {/* Critères d'évaluation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Évaluation par critères (1-4)
            </label>
            <div className="space-y-3">
              {criteresList.map((critere) => (
                <div key={critere.key} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{critere.label}</span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4].map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => updateCritere(critere.key, level)}
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-colors ${
                          formData.criteres[critere.key as keyof typeof formData.criteres] >= level
                            ? 'bg-primary-600 border-primary-600 text-white'
                            : 'border-gray-300 text-gray-400 hover:border-primary-300'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              1: Insuffisant, 2: En cours d'acquisition, 3: Acquis, 4: Maîtrisé
            </div>
          </div>

          {/* Note globale */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Note globale (optionnelle)
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="number"
                min="0"
                max="20"
                value={formData.note}
                onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
                className="input w-24"
                placeholder="0-20"
              />
              <span className="text-sm text-gray-500">/ 20</span>
              {formData.note && (
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium">{formData.note}/20</span>
                </div>
              )}
            </div>
          </div>

          {/* Commentaire */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Commentaire et observations
            </label>
            <textarea
              value={formData.commentaire}
              onChange={(e) => setFormData(prev => ({ ...prev, commentaire: e.target.value }))}
              className="input h-32"
              placeholder="Observations, conseils, points forts et axes d'amélioration..."
              required
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Enregistrer l'évaluation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EvaluationModal;