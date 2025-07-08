import React from 'react';
import { Bell, User, LogOut, Menu } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
  const { user, logout } = useAuth();

  const getRoleName = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrateur';
      case 'apprenti': return 'Apprenti';
      case 'professeur': return 'Professeur';
      case 'maitre': return 'Maître d\'apprentissage';
      default: return role;
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-primary-900">SkillsNGo</h1>
          <span className="ml-4 text-sm text-gray-600">CMA Formation BFC</span>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">
                {user?.prenom} {user?.nom}
              </div>
              <div className="text-xs text-gray-500">
                {getRoleName(user?.role || '')}
              </div>
            </div>
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <button
              onClick={logout}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              title="Déconnexion"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;