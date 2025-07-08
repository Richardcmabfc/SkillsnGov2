import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthContext, useAuthProvider } from './hooks/useAuth'
import Layout from './components/Layout'
import LoginForm from './components/LoginForm'
import AdminDashboard from './pages/AdminDashboard'
import ApprentiDashboard from './pages/ApprentiDashboard'
import ProfesseurDashboard from './pages/ProfesseurDashboard'
import MaitreDashboard from './pages/MaitreDashboard'
import LoadingSpinner from './components/LoadingSpinner'

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) => {
  const { user, loading } = useAuthProvider()
  
  if (loading) {
    return <LoadingSpinner />
  }
  
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />
  }
  
  return <>{children}</>
}

const AppContent = () => {
  const { user, loading } = useAuthProvider()
  
  if (loading) {
    return <LoadingSpinner />
  }
  
  if (!user) {
    return <LoginForm />
  }
  
  const getDashboardComponent = () => {
    switch (user.role) {
      case 'administrateur':
        return <AdminDashboard />
      case 'apprenti':
        return <ApprentiDashboard />
      case 'professeur':
        return <ProfesseurDashboard />
      case 'maitre_apprentissage':
        return <MaitreDashboard />
      default:
        return <div className="p-8 text-center">Rôle non reconnu</div>
    }
  }
  
  return (
    <Layout>
      {getDashboardComponent()}
    </Layout>
  )
}

function App() {
  const auth = useAuthProvider()
  
  return (
    <AuthContext.Provider value={auth}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/unauthorized" element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">Accès non autorisé</h1>
                  <p className="text-gray-600">Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>
                </div>
              </div>
            } />
            <Route path="/" element={
              <ProtectedRoute>
                <AppContent />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['administrateur']}>
                <Layout>
                  <AdminDashboard />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/apprenti" element={
              <ProtectedRoute allowedRoles={['apprenti']}>
                <Layout>
                  <ApprentiDashboard />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/professeur" element={
              <ProtectedRoute allowedRoles={['professeur']}>
                <Layout>
                  <ProfesseurDashboard />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/maitre" element={
              <ProtectedRoute allowedRoles={['maitre_apprentissage']}>
                <Layout>
                  <MaitreDashboard />
                </Layout>
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App