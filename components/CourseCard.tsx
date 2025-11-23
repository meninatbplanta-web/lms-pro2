import React from 'react';
import { Course, Enrollment } from '../types';
import { Clock, Book, Lock, Unlock, PlayCircle, Trophy } from 'lucide-react';

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
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all cursor-pointer group flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={course.thumbnail} 
          alt={course.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
            course.price === 0 
              ? 'bg-green-100 text-green-800' 
              : 'bg-indigo-100 text-indigo-800'
          }`}>
            {course.price === 0 ? 'GRÁTIS' : `R$ ${course.price.toFixed(2)}`}
          </span>
        </div>
        {isCompleted && (
          <div className="absolute top-3 left-3 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full flex items-center text-xs font-bold shadow-sm">
            <Trophy className="w-3 h-3 mr-1" /> Concluído
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="text-xs text-gray-500 mb-2 uppercase tracking-wide font-semibold">{course.category}</div>
        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{course.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-1">{course.description}</p>

        <div className="mt-auto pt-4 border-t border-gray-100">
          {isEnrolled ? (
            <div>
               <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Progresso</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${isCompleted ? 'bg-green-500' : 'bg-indigo-600'}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              {isCompleted ? (
                <div className="mt-3 text-green-600 text-sm font-bold flex items-center">
                  <Trophy className="w-4 h-4 mr-1" /> Curso Concluído
                </div>
              ) : (
                <div className="mt-3 text-indigo-600 text-sm font-medium flex items-center">
                  <PlayCircle className="w-4 h-4 mr-1" /> Continuar
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center">
                <Book className="w-4 h-4 mr-1" />
                {totalLessons} aulas
              </div>
              {course.price > 0 ? <Lock className="w-4 h-4 text-gray-400"/> : <Unlock className="w-4 h-4 text-green-500"/>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};