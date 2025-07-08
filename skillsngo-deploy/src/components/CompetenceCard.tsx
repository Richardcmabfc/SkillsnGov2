import React from 'react';
import { Target, User, Calendar } from 'lucide-react';
import { Competence } from '../types';

interface CompetenceCardProps {
  competence: Competence;
  onClick?: () => void;
}

const CompetenceCard = ({ competence, onClick }: CompetenceCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'non_acquis': return 'bg-red-100 text-red-800';
      case 'en_cours': return 'bg-yellow-100 text-yellow-800';
      case 'acquis': return 'bg-green-100 text-green-800';
      case 'valide': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'non_acquis': return 'Non acquis';
      case 'en_cours': return 'En cours';
      case 'acquis': return 'Acquis';
      case 'valide': return 'Validé';
      default: return status;
    }
  };

  const getNiveauColor = (niveau: string) => {
    switch (niveau) {
      case 'debutant': return 'text-green-600';
      case 'intermediaire': return 'text-yellow-600';
      case 'avance': return 'text-orange-600';
      case 'expert': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const latestEvaluation = competence.evaluations?.[0];

  return (
    <div 
      className={`card hover:shadow-md transition-shadow ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start">
          <div className="p-2 bg-primary-50 rounded-lg mr-3">
            <Target className="w-5 h-5 text-primary-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{competence.nom}</h3>
            <p className="text-sm text-gray-600 mt-1">{competence.description}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(competence.status)}`}>
          {getStatusText(competence.status)}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Référentiel :</span>
          <span className="font-medium">{competence.referentiel}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Niveau requis :</span>
          <span className={`font-medium ${getNiveauColor(competence.niveau_requis)}`}>
            {competence.niveau_requis}
          </span>
        </div>

        {latestEvaluation && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-600 mb-2">Dernière évaluation :</div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <User className="w-4 h-4 text-gray-400 mr-1" />
                <span className="text-sm">{latestEvaluation.evaluateur_nom}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 text-gray-400 mr-1" />
                <span className="text-sm">{new Date(latestEvaluation.date).toLocaleDateString()}</span>
              </div>
            </div>
            {latestEvaluation.note && (
              <div className="mt-2">
                <span className="text-sm font-medium text-primary-600">
                  Note : {latestEvaluation.note}/20
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompetenceCard;