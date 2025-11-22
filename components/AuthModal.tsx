import React, { useState } from 'react';
import { UserRole, User } from '../types';
import { MOCK_USERS } from '../services/mockData';
import { Lock, User as UserIcon, AlertCircle } from 'lucide-react';

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all scale-100">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Bem-vindo de volta</h2>
        <p className="text-center text-gray-500 mb-6">Faça login para acessar seus cursos.</p>
        
        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha (Necessária para Admin)</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Digite a senha..."
                />
            </div>
             {error && (
                <div className="mt-2 text-sm text-red-600 flex items-center animate-pulse">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {error}
                </div>
            )}
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleLogin(UserRole.STUDENT)}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg flex justify-center items-center"
          >
             <UserIcon className="w-5 h-5 mr-2" />
             Entrar como Aluno (Alice)
          </button>
          
          <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Área Administrativa</span>
              </div>
          </div>

          <button
            onClick={() => handleLogin(UserRole.ADMIN)}
            className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg flex justify-center items-center"
          >
            <Lock className="w-5 h-5 mr-2" />
            Entrar como Admin (Bob)
          </button>
        </div>

        <div className="mt-6 text-center">
          <button onClick={() => { onClose(); setError(''); setPassword(''); }} className="text-sm text-gray-500 hover:text-gray-800 underline">
            Cancelar / Continuar como Visitante
          </button>
        </div>
      </div>
    </div>
  );
};