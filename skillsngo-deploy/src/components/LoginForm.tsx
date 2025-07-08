import React, { useState } from 'react';
import { LogIn, User, Lock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const LoginForm = () => {
  const [identifiant, setIdentifiant] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!identifiant || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    const success = login(identifiant, password);
    if (!success) {
      setError('Identifiant ou mot de passe incorrect');
    }
  };

  const demoUsers = [
    { id: 'admin001', role: 'Administrateur' },
    { id: 'app001', role: 'Apprenti' },
    { id: 'prof001', role: 'Professeur' },
    { id: 'maitre001', role: 'Maître d\'apprentissage' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mb-4">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-primary-900 mb-2">SkillsNGo</h1>
          <p className="text-primary-700">CMA Formation Bourgogne-Franche-Comté</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="identifiant" className="block text-sm font-medium text-gray-700 mb-2">
                Identifiant
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="identifiant"
                  type="text"
                  value={identifiant}
                  onChange={(e) => setIdentifiant(e.target.value)}
                  className="input pl-10"
                  placeholder="Votre identifiant"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pl-10"
                  placeholder="Votre mot de passe"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full btn-primary flex items-center justify-center"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Se connecter
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Comptes de démonstration :</h3>
            <div className="grid grid-cols-1 gap-2">
              {demoUsers.map((user) => (
                <button
                  key={user.id}
                  onClick={() => {
                    setIdentifiant(user.id);
                    setPassword('skillsngo2024');
                  }}
                  className="text-left p-2 text-sm bg-gray-50 hover:bg-gray-100 rounded transition-colors"
                >
                  <div className="font-medium">{user.id}</div>
                  <div className="text-gray-600">{user.role}</div>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Mot de passe : skillsngo2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;