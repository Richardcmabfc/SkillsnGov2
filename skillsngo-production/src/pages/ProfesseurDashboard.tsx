import React, { useState, useEffect } from 'react'
import { 
  Users, 
  BookOpen, 
  Award, 
  MessageSquare, 
  Calendar,
  TrendingUp,
  FileText,
  CheckCircle
} from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'

const ProfesseurDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 800))
      setLoading(false)
    }
    loadData()
  }, [])

  if (loading) {
    return <LoadingSpinner text="Chargement de votre espace professeur..." />
  }

  const stats = {
    apprentis_suivis: 28,
    evaluations_en_attente: 8,
    messages_non_lus: 5,
    taux_reussite: 92
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Espace professeur CFA</h1>
          <p className="text-gray-600">Suivez vos groupes et évaluez vos apprentis</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn btn-outline btn-md">
            <BookOpen className="h-4 w-4 mr-2" />
            Évaluations
          </button>
          <button className="btn btn-primary btn-md">
            <Users className="h-4 w-4 mr-2" />
            Mes groupes
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="card-content">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm text-gray-600">Apprentis suivis</p>
                <p className="text-2xl font-bold text-blue-600">{stats.apprentis_suivis}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm text-gray-600">À évaluer</p>
                <p className="text-2xl font-bold text-orange-600">{stats.evaluations_en_attente}</p>
              </div>
              <BookOpen className="h-8 w-8 text-orange-500" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm text-gray-600">Messages</p>
                <p className="text-2xl font-bold text-green-600">{stats.messages_non_lus}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm text-gray-600">Taux réussite</p>
                <p className="text-2xl font-bold text-purple-600">{stats.taux_reussite}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Groupes classes */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">Mes groupes classes</h3>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              {[
                { nom: 'CAP Boulangerie 2024', effectif: 12, progression: 78 },
                { nom: 'Bac Pro Pâtisserie 2024', effectif: 16, progression: 65 }
              ].map((groupe, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-gray-900">{groupe.nom}</h4>
                      <p className="text-sm text-gray-600">{groupe.effectif} apprentis</p>
                    </div>
                    <span className="text-sm text-gray-600">{groupe.progression}% progression</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${groupe.progression}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Évaluations récentes */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">Évaluations à traiter</h3>
          </div>
          <div className="card-content">
            <div className="space-y-3">
              {[
                { apprenti: 'Pierre Martin', competence: 'Pétrissage manuel', date: 'Hier' },
                { apprenti: 'Julie Leroy', competence: 'Décoration gâteaux', date: 'Il y a 2 jours' },
                { apprenti: 'Thomas Dubois', competence: 'Service client', date: 'Il y a 3 jours' }
              ].map((eval, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{eval.apprenti}</p>
                    <p className="text-sm text-gray-600">{eval.competence}</p>
                    <p className="text-xs text-gray-500">{eval.date}</p>
                  </div>
                  <button className="btn btn-primary btn-sm">Évaluer</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfesseurDashboard