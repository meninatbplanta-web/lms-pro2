import React, { useState } from 'react';
import { UserRole, User } from '../types';
import { MOCK_USERS } from '../services/mockData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null;

  const handleLogin = (role: UserRole) => {
    // Mock login simply picking the first user of that role
    const user = MOCK_USERS.find(u => u.role === role);
    if (user) {
      onLogin(user);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all scale-100">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Bem-vindo de volta</h2>
        <p className="text-center text-gray-500 mb-8">Faça login para acessar seus cursos.</p>
        
        <div className="space-y-4">
          <button
            onClick={() => handleLogin(UserRole.STUDENT)}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
          >
            Entrar como Aluno (Alice)
          </button>
          <button
            onClick={() => handleLogin(UserRole.ADMIN)}
            className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
          >
            Entrar como Admin (Bob)
          </button>
        </div>

        <div className="mt-6 text-center">
          <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-800 underline">
            Cancelar / Continuar como Visitante
          </button>
        </div>
      </div>
    </div>
  );
};