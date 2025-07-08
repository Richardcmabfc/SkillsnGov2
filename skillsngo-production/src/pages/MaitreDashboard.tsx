import React, { useState, useEffect } from 'react'
import { 
  Users, 
  Briefcase, 
  Award, 
  MessageSquare, 
  Calendar,
  FileText,
  TrendingUp,
  Clock
} from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'

const MaitreDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 800))
      setLoading(false)
    }
    loadData()
  }, [])

  if (loading) {
    return <LoadingSpinner text="Chargement de votre espace maître d'apprentissage..." />
  }

  const stats = {
    apprentis_encadres: 6,
    observations_en_attente: 3,
    evaluations_terminees: 24,
    progression_moyenne: 82
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Espace maître d'apprentissage</h1>
          <p className="text-gray-600">Suivez et évaluez vos apprentis en entreprise</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn btn-outline btn-md">
            <FileText className="h-4 w-4 mr-2" />
            Journal entreprise
          </button>
          <button className="btn btn-primary btn-md">
            <Users className="h-4 w-4 mr-2" />
            Mes apprentis
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="card-content">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm text-gray-600">Apprentis encadrés</p>
                <p className="text-2xl font-bold text-blue-600">{stats.apprentis_encadres}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm text-gray-600">À observer</p>
                <p className="text-2xl font-bold text-orange-600">{stats.observations_en_attente}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm text-gray-600">Évaluations faites</p>
                <p className="text-2xl font-bold text-green-600">{stats.evaluations_terminees}</p>
              </div>
              <Award className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm text-gray-600">Progression moy.</p>
                <p className="text-2xl font-bold text-purple-600">{stats.progression_moyenne}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mes apprentis */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">Mes apprentis</h3>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              {[
                { nom: 'Pierre Martin', formation: 'CAP Boulangerie', progression: 85, dernier_contact: 'Hier' },
                { nom: 'Julie Leroy', formation: 'Bac Pro Pâtisserie', progression: 70, dernier_contact: 'Il y a 3 jours' },
                { nom: 'Thomas Dubois', formation: 'BTS Hôtellerie', progression: 92, dernier_contact: 'Aujourd\'hui' }
              ].map((apprenti, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{apprenti.nom}</h4>
                      <p className="text-sm text-gray-600">{apprenti.formation}</p>
                      <p className="text-xs text-gray-500">Dernier contact: {apprenti.dernier_contact}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-600">{apprenti.progression}%</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${apprenti.progression}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <button className="btn btn-outline btn-sm">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Message
                    </button>
                    <button className="btn btn-primary btn-sm">
                      <Award className="h-3 w-3 mr-1" />
                      Évaluer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions en entreprise */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">Actions à réaliser</h3>
          </div>
          <div className="card-content">
            <div className="space-y-3">
              {[
                { 
                  apprenti: 'Pierre Martin', 
                  action: 'Observation techniques de façonnage', 
                  priorite: 'haute',
                  echeance: 'Demain'
                },
                { 
                  apprenti: 'Julie Leroy', 
                  action: 'Évaluation décoration vitrine', 
                  priorite: 'moyenne',
                  echeance: 'Cette semaine'
                },
                { 
                  apprenti: 'Thomas Dubois', 
                  action: 'Validation compétence service', 
                  priorite: 'faible',
                  echeance: 'Semaine prochaine'
                }
              ].map((action, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{action.apprenti}</p>
                      <p className="text-sm text-gray-600">{action.action}</p>
                      <p className="text-xs text-gray-500">Échéance: {action.echeance}</p>
                    </div>
                    <span className={`badge ${
                      action.priorite === 'haute' ? 'bg-red-100 text-red-800' :
                      action.priorite === 'moyenne' ? 'bg-orange-100 text-orange-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {action.priorite}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Planning entreprise */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold">Planning entreprise cette semaine</h3>
        </div>
        <div className="card-content">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'].map((jour, index) => (
              <div key={index} className="border rounded-lg p-3">
                <h4 className="font-medium text-gray-900 mb-2">{jour}</h4>
                <div className="space-y-2">
                  {index === 0 && (
                    <div className="text-xs bg-blue-100 text-blue-800 p-2 rounded">
                      Pierre M. - Production
                    </div>
                  )}
                  {index === 2 && (
                    <div className="text-xs bg-green-100 text-green-800 p-2 rounded">
                      Julie L. - Vitrine
                    </div>
                  )}
                  {index === 4 && (
                    <div className="text-xs bg-purple-100 text-purple-800 p-2 rounded">
                      Thomas D. - Service
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MaitreDashboard