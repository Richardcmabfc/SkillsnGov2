import React, { useState, useEffect } from 'react'
import { 
  Award, 
  FileText, 
  Calendar, 
  MessageSquare, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'

const ApprentiDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 800))
      setLoading(false)
    }
    loadData()
  }, [])

  if (loading) {
    return <LoadingSpinner text="Chargement de votre espace apprenti..." />
  }

  const competenceStats = {
    total: 24,
    acquises: 18,
    en_cours: 4,
    non_evaluees: 2
  }

  const prochainRdv = [
    {
      id: 1,
      titre: 'Évaluation pratique',
      date: '2024-12-15',
      heure: '14:00',
      lieu: 'Atelier Boulangerie',
      type: 'evaluation'
    },
    {
      id: 2,
      titre: 'Entretien tripartite',
      date: '2024-12-20',
      heure: '10:30',
      lieu: 'Bureau direction',
      type: 'rdv_tripartite'
    }
  ]

  const messagesRecents = [
    {
      id: 1,
      expediteur: 'Marie Dupont',
      sujet: 'Retour sur votre dernière évaluation',
      date: 'Il y a 2 heures',
      lu: false
    },
    {
      id: 2,
      expediteur: 'Jean Bernard',
      sujet: 'Planning de la semaine prochaine',
      date: 'Hier',
      lu: true
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mon espace apprenti</h1>
          <p className="text-gray-600">Suivez votre progression et vos activités</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn btn-outline btn-md">
            <FileText className="h-4 w-4 mr-2" />
            Journal
          </button>
          <button className="btn btn-primary btn-md">
            <Award className="h-4 w-4 mr-2" />
            Mes compétences
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="card-content">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm text-gray-600">Compétences acquises</p>
                <p className="text-2xl font-bold text-green-600">{competenceStats.acquises}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm text-gray-600">En cours</p>
                <p className="text-2xl font-bold text-orange-600">{competenceStats.en_cours}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm text-gray-600">À évaluer</p>
                <p className="text-2xl font-bold text-blue-600">{competenceStats.non_evaluees}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm text-gray-600">Progression</p>
                <p className="text-2xl font-bold text-purple-600">75%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Prochains rendez-vous */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Prochains rendez-vous
            </h3>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              {prochainRdv.map((rdv) => (
                <div key={rdv.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{rdv.titre}</h4>
                      <p className="text-sm text-gray-600">{rdv.lieu}</p>
                    </div>
                    <span className={`badge ${rdv.type === 'evaluation' ? 'badge-primary' : 'badge-secondary'}`}>
                      {rdv.type === 'evaluation' ? 'Évaluation' : 'RDV'}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {new Date(rdv.date).toLocaleDateString('fr-FR')} à {rdv.heure}
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 btn btn-outline btn-sm">
              Voir tout le planning
            </button>
          </div>
        </div>

        {/* Messages récents */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Messages récents
            </h3>
          </div>
          <div className="card-content">
            <div className="space-y-3">
              {messagesRecents.map((message) => (
                <div key={message.id} className={`p-3 rounded-lg border ${!message.lu ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{message.expediteur}</p>
                      <p className="text-sm text-gray-600">{message.sujet}</p>
                    </div>
                    {!message.lu && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{message.date}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 btn btn-outline btn-sm">
              Voir tous les messages
            </button>
          </div>
        </div>
      </div>

      {/* Progression des compétences */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold">Progression par domaine de compétences</h3>
        </div>
        <div className="card-content">
          <div className="space-y-4">
            {[
              { domaine: 'Techniques de base', progression: 90, total: 8, acquises: 7 },
              { domaine: 'Hygiène et sécurité', progression: 100, total: 4, acquises: 4 },
              { domaine: 'Gestion et organisation', progression: 60, total: 6, acquises: 3 },
              { domaine: 'Communication client', progression: 45, total: 6, acquises: 2 }
            ].map((domaine, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-900">{domaine.domaine}</span>
                  <span className="text-sm text-gray-600">{domaine.acquises}/{domaine.total} compétences</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${domaine.progression}%` }}
                  ></div>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-600">{domaine.progression}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold">Actions rapides</h3>
        </div>
        <div className="card-content">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="btn btn-outline btn-md justify-start">
              <FileText className="h-4 w-4 mr-3" />
              Saisir mon journal
            </button>
            <button className="btn btn-outline btn-md justify-start">
              <Award className="h-4 w-4 mr-3" />
              Auto-évaluation
            </button>
            <button className="btn btn-outline btn-md justify-start">
              <MessageSquare className="h-4 w-4 mr-3" />
              Contacter mon tuteur
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApprentiDashboard