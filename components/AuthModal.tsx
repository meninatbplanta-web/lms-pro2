import React, { useState } from 'react';
import { UserRole, User } from '../types';
import { MOCK_USERS } from '../services/mockData';
import { Lock, User as UserIcon, AlertCircle, X } from 'lucide-react';

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
        setError('Senha de administrador incorreta.');
        return;
      }
    }

    // Mock login simply picking the first user of that role
    const user = MOCK_USERS.find(u => u.role === role);
    if (user) {
      onLogin(user);
      onClose();
      setPassword('');
      setError('');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 transition-opacity animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative border-l-4 border-brand-red">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-brand-text bg-gray-50 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserIcon className="w-8 h-8 text-brand-red" />
          </div>
          <h2 className="text-2xl font-display font-bold text-brand-text">Acesso ao Portal</h2>
          <p className="text-brand-muted mt-1 text-sm">Faça login para continuar sua jornada</p>
        </div>
        
        <div className="mb-6">
            <label className="block text-xs font-bold text-brand-muted mb-2 ml-1 uppercase tracking-wide">Senha (Admin)</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-lg leading-5 bg-gray-50 text-brand-text placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all"
                    placeholder="Digite a senha..."
                />
            </div>
             {error && (
                <div className="mt-3 text-sm text-red-600 font-medium flex items-center bg-red-50 p-3 rounded-lg border border-red-100">
                    <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                    {error}
                </div>
            )}
        </div>

        <div className="space-y-3">
          <button
            onClick={() => handleLogin(UserRole.STUDENT)}
            className="w-full py-3.5 px-4 bg-brand-whatsapp text-white rounded-full font-bold shadow-lg hover:bg-brand-whatsapp-hover hover:-translate-y-0.5 transition-all duration-300 flex justify-center items-center group uppercase tracking-wide text-sm"
          >
             <UserIcon className="w-5 h-5 mr-2" />
             Entrar como Aluno
          </button>
          
          <div className="relative py-3">
              <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                  <span className="px-3 bg-white text-gray-400 font-bold tracking-wider">Área Administrativa</span>
              </div>
          </div>

          <button
            onClick={() => handleLogin(UserRole.ADMIN)}
            className="w-full py-3.5 px-4 bg-white border-2 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white rounded-full font-bold transition-all duration-300 flex justify-center items-center uppercase tracking-wide text-sm"
          >
            <Lock className="w-4 h-4 mr-2" />
            Acesso Admin
          </button>
        </div>
      </div>
    </div>
  );
};