import React from 'react';
import { User, Course } from '../types';
import { Download, ArrowLeft, Award } from 'lucide-react';

interface CertificateProps {
  user: User;
  course: Course;
  date: string;
  onBack: () => void;
}

export const Certificate: React.FC<CertificateProps> = ({ user, course, date, onBack }) => {
  return (
    <div className="min-h-screen bg-brand-page flex flex-col items-center justify-center p-4">
      <div className="no-print mb-8 w-full max-w-5xl flex justify-between items-center">
        <button onClick={onBack} className="flex items-center text-brand-muted hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" /> Voltar
        </button>
        <button 
            onClick={() => window.print()}
            className="flex items-center bg-brand-gold text-black px-6 py-3 rounded-full hover:bg-yellow-400 shadow-lg font-bold uppercase tracking-wide text-sm transition-transform hover:-translate-y-1"
        >
            <Download className="w-5 h-5 mr-2" /> Imprimir / PDF
        </button>
      </div>

      {/* Certificate Container */}
      <div className="bg-white text-black p-12 w-full max-w-5xl aspect-[1.414/1] shadow-[0_0_50px_rgba(212,175,55,0.15)] relative border-8 border-double border-brand-gold flex flex-col items-center justify-center overflow-hidden">
         
         {/* Watermark */}
         <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <Award className="w-[500px] h-[500px]" />
         </div>

         {/* Decorative Corners */}
         <div className="absolute top-6 left-6 w-24 h-24 border-t-4 border-l-4 border-brand-gold"></div>
         <div className="absolute top-6 right-6 w-24 h-24 border-t-4 border-r-4 border-brand-gold"></div>
         <div className="absolute bottom-6 left-6 w-24 h-24 border-b-4 border-l-4 border-brand-gold"></div>
         <div className="absolute bottom-6 right-6 w-24 h-24 border-b-4 border-r-4 border-brand-gold"></div>

         <div className="mb-12 text-center relative z-10">
             <div className="flex justify-center mb-4">
                <Award className="w-16 h-16 text-brand-gold" />
             </div>
             <h1 className="text-6xl font-serif font-bold text-black tracking-widest uppercase mb-2">Certificado</h1>
             <span className="text-2xl text-gray-500 uppercase tracking-[0.5em] font-light">de Conclusão</span>
         </div>

         <div className="mb-10 text-center relative z-10 w-full">
             <p className="text-xl text-gray-600 mb-6 font-serif italic">Certificamos que</p>
             <h2 className="text-5xl font-bold text-brand-gold border-b-2 border-brand-gold/30 pb-4 px-12 inline-block font-display">
                 {user.name}
             </h2>
         </div>

         <div className="mb-16 max-w-3xl text-center relative z-10">
             <p className="text-xl text-gray-600 mb-6 font-serif italic">Concluiu com êxito o curso</p>
             <h3 className="text-4xl font-bold text-black mb-6 uppercase tracking-wide">{course.title}</h3>
             <p className="text-gray-500 leading-relaxed">
                 Demonstrando dedicação, esforço e domínio do conteúdo ministrado na plataforma oficial <br/> <strong>Priscilla Moreira</strong>.
             </p>
         </div>

         <div className="flex justify-around w-full mt-8 relative z-10">
             <div className="text-center">
                 <div className="w-64 border-b border-black mb-3"></div>
                 <p className="font-bold text-gray-900 text-lg">Priscilla Moreira</p>
                 <p className="text-xs text-gray-500 uppercase tracking-wider">Mentora & Diretora</p>
             </div>
             <div className="text-center">
                 <p className="font-bold text-2xl text-gray-900 mb-3">{new Date(date).toLocaleDateString('pt-BR')}</p>
                 <div className="w-64 border-b border-black mb-3"></div>
                 <p className="text-xs text-gray-500 uppercase tracking-wider">Data de Emissão</p>
             </div>
         </div>
      </div>
    </div>
  );
};