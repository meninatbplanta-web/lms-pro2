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
  
  const totalLessons = course.modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
  const completedCount = enrollment?.completedLessonIds.length || 0;
  const progress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div 
      onClick={onClick}
      className="bg-premium-card rounded-xl shadow-lg border border-premium-border hover:border-premium-red/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col h-full overflow-hidden relative"
    >
      {/* Image Area */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-premium-card to-transparent z-10 opacity-80"></div>
        <img 
          src={course.thumbnail} 
          alt={course.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
        />
        
        {/* Badges */}
        <div className="absolute top-4 right-4 z-20">
          {course.price === 0 ? (
             <span className="px-3 py-1 rounded bg-premium-green text-white text-[10px] font-bold uppercase tracking-widest shadow-lg">
                Liberado
             </span>
          ) : (
             <span className="px-3 py-1 rounded bg-premium-bg/80 backdrop-blur border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest">
               R$ {course.price.toFixed(2)}
             </span>
          )}
        </div>
        
        {isCompleted && (
          <div className="absolute top-4 left-4 z-20 bg-premium-gold text-black px-3 py-1 rounded flex items-center text-[10px] font-bold shadow-lg uppercase tracking-widest">
            <Trophy className="w-3 h-3 mr-1" /> Certificado
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-6 flex-1 flex flex-col relative z-20 -mt-12">
        <div className="mb-4">
           <span className="text-[10px] font-bold uppercase tracking-widest text-premium-red mb-2 block">
            {course.category}
          </span>
          <h3 className="text-xl font-display font-bold text-white leading-tight group-hover:text-premium-red transition-colors">
            {course.title}
          </h3>
        </div>
        
        <p className="text-premium-muted text-sm line-clamp-2 mb-6 flex-1 leading-relaxed">
          {course.description}
        </p>

        {/* Footer / Action */}
        <div className="mt-auto pt-4 border-t border-white/5">
          {isEnrolled ? (
            <div>
               <div className="flex justify-between text-[10px] font-bold text-premium-muted mb-2 uppercase tracking-widest">
                <span>Progresso</span>
                <span className={isCompleted ? 'text-premium-gold' : 'text-premium-green'}>{progress}%</span>
              </div>
              <div className="w-full bg-premium-bg rounded-full h-1.5 overflow-hidden mb-4">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${isCompleted ? 'bg-premium-gold shadow-[0_0_10px_#D4AF37]' : 'bg-premium-green shadow-[0_0_10px_#25D366]'}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              {isCompleted ? (
                <div className="w-full text-premium-gold border border-premium-gold/30 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center uppercase tracking-widest hover:bg-premium-gold/10 transition-colors">
                  <Trophy className="w-3 h-3 mr-2" /> Ver Conquista
                </div>
              ) : (
                <div className="w-full text-white bg-premium-green py-2.5 rounded-lg text-xs font-bold flex items-center justify-center hover:bg-premium-green-dark transition-colors uppercase tracking-widest shadow-lg shadow-green-900/20">
                  <PlayCircle className="w-3 h-3 mr-2" /> Continuar
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-between text-premium-muted group-hover:text-white transition-colors">
              <div className="flex items-center text-xs font-bold uppercase tracking-wide">
                <Book className="w-4 h-4 mr-2" />
                {totalLessons} aulas
              </div>
              <div className="flex items-center text-xs font-bold uppercase tracking-wide">
                {course.price > 0 ? (
                  <div className="flex items-center"><Lock className="w-3 h-3 mr-1" /> Bloqueado</div>
                ) : (
                  <div className="flex items-center text-premium-green"><Unlock className="w-3 h-3 mr-1" /> Grátis</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};