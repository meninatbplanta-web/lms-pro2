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
    <header className="bg-brand-dark sticky top-0 z-50 border-b border-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center cursor-pointer group" onClick={() => navigate('/')}>
          <div className="bg-brand-red p-2 rounded-lg group-hover:bg-brand-red-hover transition-colors shadow-lg shadow-red-900/20">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <span className="ml-3 text-xl font-display font-bold text-white tracking-tight uppercase">Terapeuta <span className="text-brand-red">Analista</span></span>
        </div>

        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors">
            Catálogo
          </Link>
          {user && (
            <Link to="/my-learning" className="text-gray-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors">
              Meus Cursos
            </Link>
          )}
          {user?.role === UserRole.ADMIN && (
            <Link to="/admin" className="flex items-center text-brand-red hover:text-red-400 px-3 py-2 rounded-lg text-sm font-bold uppercase tracking-wide transition-colors">
              <ShieldCheck className="w-4 h-4 mr-1" />
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4 bg-[#1a1a1a] px-4 py-2 rounded-full border border-gray-800">
              <div className="flex items-center text-sm font-bold text-white">
                <div className="bg-gray-700 p-1.5 rounded-full mr-2">
                  <UserIcon className="h-4 w-4 text-gray-300" />
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
              className="bg-brand-red text-white px-6 py-2.5 rounded-full font-bold shadow-lg hover:bg-brand-red-hover hover:-translate-y-0.5 transition-all duration-300 text-sm uppercase tracking-wide"
            >
              Entrar
            </button>
          )}
        </div>
      </div>
    </header>
  );
};