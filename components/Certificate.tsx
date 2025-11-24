import React from 'react';
import { User, Course } from '../types';
import { Download, ArrowLeft } from 'lucide-react';

interface CertificateProps {
  user: User;
  course: Course;
  date: string;
  onBack: () => void;
}

export const Certificate: React.FC<CertificateProps> = ({ user, course, date, onBack }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="no-print mb-6 w-full max-w-4xl flex justify-between items-center">
        <button onClick={onBack} className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5 mr-2" /> Voltar
        </button>
        <button 
            onClick={() => window.print()}
            className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 shadow-md"
        >
            <Download className="w-5 h-5 mr-2" /> Imprimir / PDF
        </button>
      </div>

      <div className="bg-white p-10 w-full max-w-5xl aspect-[1.414/1] shadow-2xl relative border-8 border-double border-indigo-900 text-center flex flex-col items-center justify-center">
         {/* Decorative Corners */}
         <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-indigo-900"></div>
         <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-indigo-900"></div>
         <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-indigo-900"></div>
         <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-indigo-900"></div>

         <div className="mb-12">
             <h1 className="text-5xl font-serif font-bold text-indigo-900 tracking-widest uppercase mb-2">Certificado</h1>
             <span className="text-xl text-gray-500 uppercase tracking-widest">de Conclusão</span>
         </div>

         <div className="mb-8">
             <p className="text-xl text-gray-600 mb-4">Este certificado é concedido a</p>
             <h2 className="text-4xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2 px-12 inline-block italic">
                 {user.name}
             </h2>
         </div>

         <div className="mb-12 max-w-2xl">
             <p className="text-xl text-gray-600 mb-4">Por ter completado com sucesso o curso</p>
             <h3 className="text-3xl font-bold text-indigo-800 mb-6">{course.title}</h3>
             <p className="text-gray-500">
                 Demonstrando dedicação, esforço e domínio do conteúdo ministrado na plataforma Priscilla Moreira.
             </p>
         </div>

         <div className="flex justify-around w-full mt-12">
             <div className="text-center">
                 <div className="w-48 border-b border-gray-900 mb-2"></div>
                 <p className="font-bold text-gray-800">Priscilla Moreira Direção</p>
             </div>
             <div className="text-center">
                 <p className="font-bold text-lg text-gray-900 mb-2">{new Date(date).toLocaleDateString('pt-BR')}</p>
                 <div className="w-48 border-b border-gray-900 mb-2"></div>
                 <p className="font-bold text-gray-800">Data de Conclusão</p>
             </div>
         </div>
      </div>
    </div>
  );
};