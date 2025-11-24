import React from 'react';
import { Course, Enrollment } from '../types';
import { Book, Lock, Unlock, PlayCircle, Trophy } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  enrollment?: Enrollment;
  onClick: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, enrollment, onClick }) => {
  const isEnrolled = !!enrollment;
  const isCompleted = !!enrollment?.completedAt;
  
  // Calculate stats
  const totalLessons = course.modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
  const completedCount = enrollment?.completedLessonIds.length || 0;
  const progress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div 
      onClick={onClick}
      className="bg-brand-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col h-full border-l-4 border-brand-red overflow-hidden relative"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={course.thumbnail} 
          alt={course.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
        
        <div className="absolute top-4 right-4">
          {course.price === 0 ? (
             <span className="px-3 py-1 rounded-full text-xs font-bold shadow-sm bg-brand-whatsapp text-white border border-white/20 uppercase tracking-wide">
                GRÁTIS
             </span>
          ) : (
             <span className="px-3 py-1 rounded-full text-xs font-bold shadow-sm bg-white text-brand-text border border-gray-200">
               R$ {course.price.toFixed(2)}
             </span>
          )}
        </div>
        
        {isCompleted && (
          <div className="absolute top-4 left-4 bg-brand-red text-white px-3 py-1.5 rounded-full flex items-center text-xs font-bold shadow-lg uppercase tracking-wide">
            <Trophy className="w-3 h-3 mr-1" /> Concluído
          </div>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center space-x-2 mb-3">
          <span className="px-2 py-0.5 rounded bg-red-50 text-brand-red text-[10px] font-bold uppercase tracking-wider border border-red-100">
            {course.category}
          </span>
        </div>
        
        <h3 className="text-lg font-display font-bold text-brand-text mb-2 leading-tight group-hover:text-brand-red transition-colors">
          {course.title}
        </h3>
        
        <p className="text-brand-muted text-sm line-clamp-2 mb-6 flex-1 leading-relaxed">
          {course.description}
        </p>

        <div className="mt-auto pt-4 border-t border-gray-100">
          {isEnrolled ? (
            <div>
               <div className="flex justify-between text-xs font-bold text-brand-muted mb-2 uppercase tracking-wide">
                <span>Seu Progresso</span>
                <span className="text-brand-red">{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${isCompleted ? 'bg-brand-red' : 'bg-brand-whatsapp'}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              {isCompleted ? (
                <div className="mt-4 w-full text-brand-red bg-red-50 py-2 rounded-full text-sm font-bold flex items-center justify-center uppercase tracking-wide">
                  <Trophy className="w-4 h-4 mr-2" /> Curso Concluído
                </div>
              ) : (
                <div className="mt-4 w-full text-white bg-brand-whatsapp py-2 rounded-full text-sm font-bold flex items-center justify-center group-hover:bg-brand-whatsapp-hover transition-colors uppercase tracking-wide shadow-md hover:shadow-lg">
                  <PlayCircle className="w-4 h-4 mr-2" /> Continuar Aula
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-brand-muted font-medium">
                <div className="p-1.5 bg-gray-100 rounded-md mr-2">
                  <Book className="w-4 h-4 text-gray-500" />
                </div>
                {totalLessons} aulas
              </div>
              <div className={`flex items-center text-sm font-bold ${course.price > 0 ? 'text-brand-muted' : 'text-brand-whatsapp'}`}>
                {course.price > 0 ? (
                  <>
                    <Lock className="w-4 h-4 mr-1.5" /> Bloqueado
                  </>
                ) : (
                  <>
                    <Unlock className="w-4 h-4 mr-1.5" /> Liberado
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};