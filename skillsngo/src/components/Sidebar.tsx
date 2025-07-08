import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  BookOpen, 
  Calendar, 
  MessageCircle, 
  BarChart3, 
  Settings, 
  FileText,
  Target,
  GraduationCap,
  Building
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface MenuItem {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
}

const Sidebar = () => {
  const { user } = useAuth();
  const [activeItem, setActiveItem] = useState('dashboard');

  const getMenuItems = (): MenuItem[] => {
    const common = [
      { icon: Home, label: 'Tableau de bord', href: 'dashboard' },
      { icon: MessageCircle, label: 'Messages', href: 'messages' },
      { icon: Calendar, label: 'Planning', href: 'planning' }
    ];

    switch (user?.role) {
      case 'admin':
        return [
          ...common,
          { icon: Users, label: 'Utilisateurs', href: 'users' },
          { icon: Target, label: 'Compétences', href: 'competences' },
          { icon: BarChart3, label: 'Statistiques', href: 'stats' },
          { icon: Settings, label: 'Configuration', href: 'settings' }
        ];
      
      case 'apprenti':
        return [
          ...common,
          { icon: FileText, label: 'Mon livret', href: 'livret' },
          { icon: Target, label: 'Mes compétences', href: 'competences' },
          { icon: GraduationCap, label: 'Mon parcours', href: 'parcours' }
        ];
      
      case 'professeur':
        return [
          ...common,
          { icon: Users, label: 'Mes apprentis', href: 'apprentis' },
          { icon: Target, label: 'Évaluations', href: 'evaluations' },
          { icon: BookOpen, label: 'Référentiels', href: 'referentiels' },
          { icon: BarChart3, label: 'Suivi de classe', href: 'suivi' }
        ];
      
      case 'maitre':
        return [
          ...common,
          { icon: Users, label: 'Mes apprentis', href: 'apprentis' },
          { icon: Target, label: 'Compétences', href: 'competences' },
          { icon: Building, label: 'Activités entreprise', href: 'activites' }
        ];
      
      default:
        return common;
    }
  };

  const menuItems = getMenuItems();

  return (
    <aside className="w-64 bg-white border-r border-gray-200">
      <div className="p-6">
        <div className="text-sm text-gray-600 mb-4">
          {user?.site}
        </div>
        {user?.groupe && (
          <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
            {user.groupe}
          </div>
        )}
      </div>

      <nav className="px-4 pb-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.href;
            
            return (
              <li key={item.href}>
                <button
                  onClick={() => setActiveItem(item.href)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 border-primary-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`mr-3 w-5 h-5 ${
                    isActive ? 'text-primary-500' : 'text-gray-400'
                  }`} />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;