import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, UserRole } from '../types';
import { LogOut, User as UserIcon, BookOpen, GraduationCap, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
  onLoginClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout, onLoginClick }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
          <GraduationCap className="h-8 w-8 text-indigo-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">LMS Pro</span>
        </div>

        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
            Catálogo
          </Link>
          {user && (
            <Link to="/my-learning" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
              Meus Cursos
            </Link>
          )}
          {user?.role === UserRole.ADMIN && (
            <Link to="/admin" className="flex items-center text-indigo-700 hover:text-indigo-900 px-3 py-2 rounded-md text-sm font-medium">
              <ShieldCheck className="w-4 h-4 mr-1" />
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-700">
                <UserIcon className="h-4 w-4 mr-1" />
                {user.name}
              </div>
              <button
                onClick={onLogout}
                className="text-gray-500 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Entrar
            </button>
          )}
        </div>
      </div>
    </header>
  );
};