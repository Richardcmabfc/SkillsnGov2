import React, { useState } from 'react';
import { Users, GraduationCap, Target, TrendingUp, Upload, Download, Plus } from 'lucide-react';
import Layout from '../components/Layout';
import StatCard from '../components/StatCard';
import { mockUsers, mockCompetences } from '../data/mockData';

const AdminDashboard = () => {
  const [showImportModal, setShowImportModal] = useState(false);

  const stats = {
    totalUsers: mockUsers.length,
    apprentis: mockUsers.filter(u => u.role === 'apprenti').length,
    professeurs: mockUsers.filter(u => u.role === 'professeur').length,
    maitres: mockUsers.filter(u => u.role === 'maitre').length,
    competences: mockCompetences.length,
    competencesValidees: mockCompetences.filter(c => c.status === 'valide' || c.status === 'acquis').length
  };

  const handleCSVImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Importing CSV file:', file.name);
      // Logique d'import CSV ici
    }
  };

  const exportData = () => {
    // Logique d'export des données
    console.log('Exporting data...');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
            <p className="text-gray-600 mt-1">Vue d'ensemble de la plateforme SkillsNGo</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowImportModal(true)}
              className="btn-secondary flex items-center"
            >
              <Upload className="w-4 h-4 mr-2" />
              Importer CSV
            </button>
            <button
              onClick={exportData}
              className="btn-primary flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </button>
          </div>
        </div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total utilisateurs"
            value={stats.totalUsers}
            icon={Users}
            trend={{ value: 12, isPositive: true }}
            color="blue"
          />
          <StatCard
            title="Apprentis actifs"
            value={stats.apprentis}
            icon={GraduationCap}
            trend={{ value: 8, isPositive: true }}
            color="green"
          />
          <StatCard
            title="Compétences"
            value={stats.competences}
            icon={Target}
            color="purple"
          />
          <StatCard
            title="Taux de validation"
            value={`${Math.round((stats.competencesValidees / stats.competences) * 100)}%`}
            icon={TrendingUp}
            trend={{ value: 5, isPositive: true }}
            color="yellow"
          />
        </div>

        {/* Répartition par rôle */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Répartition des utilisateurs</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <span>Apprentis</span>
                </div>
                <span className="font-semibold">{stats.apprentis}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span>Professeurs</span>
                </div>
                <span className="font-semibold">{stats.professeurs}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                  <span>Maîtres d'apprentissage</span>
                </div>
                <span className="font-semibold">{stats.maitres}</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Actions rapides</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <Plus className="w-5 h-5 text-gray-600 mr-3" />
                <div>
                  <div className="font-medium">Créer un groupe</div>
                  <div className="text-sm text-gray-600">Organiser les apprentis par promotion</div>
                </div>
              </button>
              <button className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <Target className="w-5 h-5 text-gray-600 mr-3" />
                <div>
                  <div className="font-medium">Gérer les référentiels</div>
                  <div className="text-sm text-gray-600">Ajouter ou modifier les compétences</div>
                </div>
              </button>
              <button className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <Users className="w-5 h-5 text-gray-600 mr-3" />
                <div>
                  <div className="font-medium">Affecter les référents</div>
                  <div className="text-sm text-gray-600">Lier professeurs et maîtres d'apprentissage</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Utilisateurs récents */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Utilisateurs récents</h2>
            <button className="text-primary-600 hover:text-primary-700 font-medium">
              Voir tous
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Nom</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Rôle</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Site</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Groupe</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.slice(0, 5).map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium">{user.prenom} {user.nom}</div>
                      <div className="text-sm text-gray-600">{user.identifiant}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin' ? 'bg-red-100 text-red-800' :
                        user.role === 'apprenti' ? 'bg-blue-100 text-blue-800' :
                        user.role === 'professeur' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{user.site}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{user.groupe || '-'}</td>
                    <td className="py-3 px-4">
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        Modifier
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal d'import CSV */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Importer des utilisateurs</h3>
            <p className="text-gray-600 mb-4">
              Sélectionnez un fichier CSV contenant les données des utilisateurs à importer.
            </p>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <label htmlFor="csv-upload" className="cursor-pointer">
                <span className="text-primary-600 font-medium">Cliquez pour sélectionner</span>
                <span className="text-gray-600"> ou glissez-déposez</span>
                <input
                  id="csv-upload"
                  type="file"
                  accept=".csv"
                  onChange={handleCSVImport}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-500 mt-2">Fichiers CSV uniquement</p>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowImportModal(false)}
                className="btn-secondary"
              >
                Annuler
              </button>
              <button className="btn-primary">
                Importer
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AdminDashboard;