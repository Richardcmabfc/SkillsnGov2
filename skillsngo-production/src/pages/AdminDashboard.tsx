import React, { useState, useEffect } from 'react'
import { 
  Users, 
  BookOpen, 
  Award, 
  TrendingUp, 
  Upload, 
  Download,
  Plus,
  Filter,
  Search
} from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'

interface DashboardStats {
  total_apprentis: number
  total_professeurs: number
  total_maitres: number
  total_evaluations: number
  taux_completion: number
  messages_non_lus: number
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulation de récupération des données
    const fetchStats = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setStats({
        total_apprentis: 245,
        total_professeurs: 18,
        total_maitres: 156,
        total_evaluations: 1024,
        taux_completion: 87,
        messages_non_lus: 12
      })
      setLoading(false)
    }

    fetchStats()
  }, [])

  if (loading) {
    return <LoadingSpinner text="Chargement du tableau de bord..." />
  }

  const statCards = [
    {
      title: 'Apprentis actifs',
      value: stats?.total_apprentis || 0,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Professeurs',
      value: stats?.total_professeurs || 0,
      icon: BookOpen,
      color: 'bg-green-500',
      change: '+2%'
    },
    {
      title: 'Maîtres d\'apprentissage',
      value: stats?.total_maitres || 0,
      icon: Award,
      color: 'bg-purple-500',
      change: '+8%'
    },
    {
      title: 'Taux de completion',
      value: `${stats?.taux_completion || 0}%`,
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '+5%'
    }
  ]

  const recentActivities = [
    {
      id: 1,
      user: 'Pierre Martin',
      action: 'Nouvelle évaluation en Boulangerie',
      time: 'Il y a 2 heures',
      type: 'evaluation'
    },
    {
      id: 2,
      user: 'Marie Dupont',
      action: 'Import de 15 nouveaux apprentis',
      time: 'Il y a 4 heures',
      type: 'import'
    },
    {
      id: 3,
      user: 'Jean Bernard',
      action: 'Validation du journal d\'activités',
      time: 'Il y a 6 heures',
      type: 'validation'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord administrateur</h1>
          <p className="text-gray-600">Vue d'ensemble de la plateforme SkillsNGo</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn btn-outline btn-md">
            <Filter className="h-4 w-4 mr-2" />
            Filtres
          </button>
          <button className="btn btn-primary btn-md">
            <Plus className="h-4 w-4 mr-2" />
            Nouvel utilisateur
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="card">
              <div className="card-content">
                <div className="flex items-center">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change} ce mois</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">Actions rapides</h3>
          </div>
          <div className="card-content space-y-4">
            <button className="w-full btn btn-outline btn-md justify-start">
              <Upload className="h-4 w-4 mr-3" />
              Importer des utilisateurs (CSV)
            </button>
            <button className="w-full btn btn-outline btn-md justify-start">
              <Download className="h-4 w-4 mr-3" />
              Exporter les données
            </button>
            <button className="w-full btn btn-outline btn-md justify-start">
              <Award className="h-4 w-4 mr-3" />
              Gérer les référentiels
            </button>
            <button className="w-full btn btn-outline btn-md justify-start">
              <Users className="h-4 w-4 mr-3" />
              Créer un groupe classe
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">Activité récente</h3>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500">par {activity.user}</p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <button className="text-sm text-blue-600 hover:text-blue-800">
                Voir toute l'activité →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Data Tables Preview */}
      <div className="card">
        <div className="card-header">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Derniers apprentis inscrits</h3>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="input pl-10 w-64"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="card-content">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Apprenti
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Formation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Professeur référent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progression
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  {
                    nom: 'Pierre Martin',
                    formation: 'CAP Boulangerie',
                    professeur: 'Marie Dupont',
                    progression: 75,
                    statut: 'Actif'
                  },
                  {
                    nom: 'Julie Leroy',
                    formation: 'Bac Pro Pâtisserie',
                    professeur: 'Paul Durand',
                    progression: 60,
                    statut: 'Actif'
                  },
                  {
                    nom: 'Thomas Dubois',
                    formation: 'BTS Hôtellerie',
                    professeur: 'Sophie Martin',
                    progression: 45,
                    statut: 'Actif'
                  }
                ].map((apprenti, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">
                            {apprenti.nom.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{apprenti.nom}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {apprenti.formation}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {apprenti.professeur}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${apprenti.progression}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm text-gray-600">{apprenti.progression}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="badge badge-primary">{apprenti.statut}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard