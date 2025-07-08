import { useState, useEffect, createContext, useContext } from 'react';
import { User } from '../types';
import { mockUsers, defaultPassword } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  login: (identifiant: string, password: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('skillsngo_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (identifiant: string, password: string): boolean => {
    if (password !== defaultPassword) {
      return false;
    }

    const foundUser = mockUsers.find(u => u.identifiant === identifiant);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('skillsngo_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('skillsngo_user');
  };

  return {
    user,
    login,
    logout,
    isLoading
  };
};