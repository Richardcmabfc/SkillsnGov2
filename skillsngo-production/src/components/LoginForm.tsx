import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import LoadingSpinner from './LoadingSpinner'

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login, error, clearError } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return

    setIsLoading(true)
    clearError()

    try {
      await login(email, password)
    } catch (err) {
      console.error('Login error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const demoAccounts = [
    { role: 'Administrateur', email: 'admin@cma-formation.fr', password: 'admin123' },
    { role: 'Apprenti', email: 'pierre.martin@exemple.fr', password: 'apprenti123' },
    { role: 'Professeur', email: 'marie.dupont@cma-formation.fr', password: 'prof123' },
    { role: 'Maître', email: 'jean.bernard@entreprise.fr', password: 'maitre123' }
  ]

  const handleDemoLogin = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail)
    setPassword(demoPassword)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-white rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-blue-600">S</span>
          </div>
          <h2 className="text-3xl font-bold text-white">SkillsNGo</h2>
          <p className="mt-2 text-blue-200">Plateforme de suivi des apprentis</p>
          <p className="text-sm text-blue-300">CMA Formation Bourgogne-Franche-Comté</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Erreur de connexion
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      {error}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Adresse email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input mt-1"
                placeholder="votre.email@exemple.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="input mt-1"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="btn btn-primary btn-lg w-full"
            >
              {isLoading ? <LoadingSpinner size="sm" text="" /> : 'Se connecter'}
            </button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Comptes de démonstration :</h3>
            <div className="grid grid-cols-2 gap-2">
              {demoAccounts.map((account, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleDemoLogin(account.email, account.password)}
                  className="btn btn-outline btn-sm text-xs"
                >
                  {account.role}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Cliquez sur un rôle pour remplir automatiquement les champs
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-blue-200 text-sm">
          <p>© 2024 CMA Formation BFC - Tous droits réservés</p>
        </div>
      </div>
    </div>
  )
}

export default LoginForm