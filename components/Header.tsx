import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, UserRole } from '../types';
import { LogOut, User as UserIcon, ChevronRight, Menu } from 'lucide-react';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
  onLoginClick: () => void;
  toggleSidebar: () => void;
  courseTitle?: string;
  lessonTitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  user, 
  onLogout, 
  onLoginClick, 
  toggleSidebar,
  courseTitle,
  lessonTitle
}) => {
  const location = useLocation();
  
  const getBreadcrumbs = () => {
    if (location.pathname === '/') return <span className="text-premium-text font-medium">Início</span>;
    if (location.pathname === '/admin') return <span className="text-premium-red font-bold uppercase tracking-wider">Comando Central</span>;
    if (location.pathname === '/my-learning') return <span className="text-premium-text">Meus Treinamentos</span>;
    
    return (
      <div className="flex items-center space-x-2 text-sm md:text-base overflow-hidden whitespace-nowrap">
        <Link to="/" className="hover:text-white transition-colors">Início</Link>
        {courseTitle && (
          <>
            <ChevronRight className="w-4 h-4 text-premium-muted flex-shrink-0" />
            <span className="text-premium-muted hidden sm:inline truncate max-w-[150px]">{courseTitle}</span>
          </>
        )}
        {lessonTitle && (
          <>
            <ChevronRight className="w-4 h-4 text-premium-muted flex-shrink-0" />
            <span className="text-premium-red font-bold truncate max-w-[200px]">{lessonTitle}</span>
          </>
        )}
      </div>
    );
  };

  return (
    <header className="h-20 bg-premium-bg/80 backdrop-blur-md border-b border-premium-border flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center text-premium-muted">
        <button onClick={toggleSidebar} className="mr-4 p-2 hover:bg-premium-card rounded-full text-white transition-colors lg:hidden">
          <Menu className="w-6 h-6" />
        </button>
        {getBreadcrumbs()}
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-white">{user.name}</p>
              <p className="text-xs text-premium-green uppercase tracking-wider">{user.role === UserRole.ADMIN ? 'Administrador' : 'Membro Ativo'}</p>
            </div>
            <div className="relative group">
               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-white/10 flex items-center justify-center text-white font-bold shadow-lg cursor-pointer hover:border-premium-red transition-colors">
                  {user.name.charAt(0)}
               </div>
               {/* Dropdown Menu */}
               <div className="absolute right-0 mt-2 w-48 bg-premium-card border border-premium-border rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right z-50">
                  <div className="py-1">
                    <button 
                      onClick={onLogout}
                      className="w-full text-left px-4 py-3 text-sm text-premium-muted hover:text-premium-red hover:bg-premium-bg flex items-center transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sair da Plataforma
                    </button>
                  </div>
               </div>
            </div>
          </div>
        ) : (
          <button
            onClick={onLoginClick}
            className="bg-premium-red text-white px-6 py-2.5 rounded-full font-bold shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:bg-premium-red-dark hover:-translate-y-0.5 transition-all duration-300 text-xs uppercase tracking-widest"
          >
            Área de Membros
          </button>
        )}
      </div>
    </header>
  );
};