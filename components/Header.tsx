import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, UserRole } from '../types';
import { LogOut, User as UserIcon, GraduationCap, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
  onLoginClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout, onLoginClick }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center cursor-pointer group" onClick={() => navigate('/')}>
          <div className="bg-red-50 p-2 rounded-xl group-hover:bg-red-100 transition-colors">
            <GraduationCap className="h-8 w-8 text-brand-red" />
          </div>
          <span className="ml-3 text-2xl font-bold font-display text-gray-900 tracking-tight group-hover:text-brand-red transition-colors">Priscilla Moreira</span>
        </div>

        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-600 hover:text-brand-red px-3 py-2 rounded-lg text-sm font-bold uppercase tracking-wide transition-colors">
            Catálogo
          </Link>
          {user && (
            <Link to="/my-learning" className="text-gray-600 hover:text-brand-red px-3 py-2 rounded-lg text-sm font-bold uppercase tracking-wide transition-colors">
              Meus Cursos
            </Link>
          )}
          {user?.role === UserRole.ADMIN && (
            <Link to="/admin" className="flex items-center text-brand-red hover:text-red-700 px-3 py-2 rounded-lg text-sm font-bold uppercase tracking-wide transition-colors">
              <ShieldCheck className="w-4 h-4 mr-1" />
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
              <div className="flex items-center text-sm font-bold text-gray-700">
                <div className="bg-gray-200 p-1.5 rounded-full mr-2">
                  <UserIcon className="h-4 w-4 text-gray-600" />
                </div>
                {user.name}
              </div>
              <button
                onClick={onLogout}
                className="text-gray-400 hover:text-brand-red transition-colors"
                title="Sair"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="bg-brand-red text-white px-6 py-2.5 rounded-full font-bold shadow-md hover:bg-brand-red-hover hover:-translate-y-0.5 transition-all duration-300 text-sm uppercase tracking-wide"
            >
              Entrar
            </button>
          )}
        </div>
      </div>
    </header>
  );
};