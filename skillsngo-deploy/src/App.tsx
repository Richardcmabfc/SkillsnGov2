import React from 'react';
import { AuthContext, useAuthProvider } from './hooks/useAuth';
import LoginForm from './components/LoginForm';
import AdminDashboard from './pages/AdminDashboard';
import ApprentiDashboard from './pages/ApprentiDashboard';
import ProfesseurDashboard from './pages/ProfesseurDashboard';
import MaitreDashboard from './pages/MaitreDashboard';

const App = () => {
  const auth = useAuthProvider();

  if (auth.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={auth}>
      {!auth.user ? (
        <LoginForm />
      ) : (
        <>
          {auth.user.role === 'admin' && <AdminDashboard />}
          {auth.user.role === 'apprenti' && <ApprentiDashboard />}
          {auth.user.role === 'professeur' && <ProfesseurDashboard />}
          {auth.user.role === 'maitre' && <MaitreDashboard />}
        </>
      )}
    </AuthContext.Provider>
  );
};

export default App;