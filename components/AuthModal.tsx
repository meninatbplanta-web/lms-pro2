import React, { useState } from 'react';
import { UserRole, User } from '../types';
import { MOCK_USERS } from '../services/mockData';
import { Lock, User as UserIcon, AlertCircle, X, Key } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLogin = (role: UserRole) => {
    setError('');
    
    if (role === UserRole.ADMIN) {
      if (password !== 'HzgSujtE@MC7PgE') {
        setError('Credencial de comando inválida.');
        return;
      }
    }

    const user = MOCK_USERS.find(u => u.role === role);
    if (user) {
      onLogin(user);
      onClose();
      setPassword('');
      setError('');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-premium-card border border-premium-border rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] max-w-md w-full p-8 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-premium-muted hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <div className="bg-premium-bg w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-premium-border shadow-inner">
            <Key className="w-8 h-8 text-premium-red" />
          </div>
          <h2 className="text-2xl font-display font-bold text-white">Identificação</h2>
          <p className="text-premium-muted mt-2 text-sm font-light">Acesso restrito à plataforma de análise</p>
        </div>
        
        <div className="mb-8">
            <label className="block text-[10px] font-bold text-premium-muted mb-2 ml-1 uppercase tracking-widest">Código de Acesso (Admin)</label>
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-premium-muted group-focus-within:text-premium-red transition-colors" />
                </div>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-11 pr-4 py-4 bg-premium-bg border border-premium-border rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-premium-red focus:ring-1 focus:ring-premium-red transition-all text-sm"
                    placeholder="••••••••"
                />
            </div>
             {error && (
                <div className="mt-4 text-xs text-red-400 font-medium flex items-center bg-red-900/20 p-3 rounded border border-red-900/50">
                    <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                    {error}
                </div>
            )}
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleLogin(UserRole.STUDENT)}
            className="w-full py-4 px-4 bg-premium-green text-white rounded-lg font-bold shadow-[0_0_20px_rgba(37,211,102,0.2)] hover:bg-premium-green-dark hover:-translate-y-0.5 transition-all duration-300 flex justify-center items-center uppercase tracking-widest text-xs"
          >
             <UserIcon className="w-4 h-4 mr-2" />
             Entrar como Aluno
          </button>
          
          <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                  <span className="px-3 bg-premium-card text-premium-muted font-bold tracking-widest">Área de Comando</span>
              </div>
          </div>

          <button
            onClick={() => handleLogin(UserRole.ADMIN)}
            className="w-full py-4 px-4 bg-transparent border border-premium-border text-premium-muted hover:text-white hover:border-white/30 rounded-lg font-bold transition-all duration-300 flex justify-center items-center uppercase tracking-widest text-xs hover:bg-white/5"
          >
            <Lock className="w-3 h-3 mr-2" />
            Acesso Administrativo
          </button>
        </div>
      </div>
    </div>
  );
};