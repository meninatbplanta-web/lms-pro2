
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Header } from './components/Header';
import { CourseCard } from './components/CourseCard';
import { AuthModal } from './components/AuthModal';
import { Certificate } from './components/Certificate';
import { generateCourseOutline } from './services/geminiService';
import { Course, User, UserRole, Enrollment, Lesson } from './types';
import { MOCK_COURSES, MOCK_ENROLLMENTS } from './services/mockData';
import ReactMarkdown from 'react-markdown';
import { 
  Play, CheckCircle, Lock, Calendar, ChevronLeft, 
  Menu, X, Loader2, Plus, Wand2, Trash2, 
  Star, Download, MessageSquare, Trophy, Target, 
  Eye, Lightbulb, Clock, Share2, ArrowRight
} from 'lucide-react';

// 1. Home Page
const Catalog: React.FC<{ 
  courses: Course[], 
  enrollments: Enrollment[], 
  user: User | null,
  onCourseClick: (c: Course) => void 
}> = ({ courses, enrollments, user, onCourseClick }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore nossos cursos</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Desenvolva suas habilidades com cursos práticos e projetos reais. De iniciante a expert.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map(course => {
          const enrollment = user ? enrollments.find(e => e.courseId === course.id && e.userId === user.id) : undefined;
          return (
            <CourseCard 
              key={course.id} 
              course={course} 
              enrollment={enrollment}
              onClick={() => onCourseClick(course)} 
            />
          );
        })}
      </div>
    </div>
  );
};

// 2. Admin Dashboard
const AdminDashboard: React.FC<{ 
  courses: Course[], 
  addCourse: (c: Course) => void, 
  deleteCourse: (id: string) => void 
}> = ({ courses, addCourse, deleteCourse }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleGenerate = async () => {
    if (!topic) return;
    setIsGenerating(true);
    try {
      const courseData = await generateCourseOutline(topic, audience || 'iniciantes');
      if (courseData) {
        const newCourse: Course = {
          ...courseData,
          id: `gen-${Date.now()}`,
          createdAt: new Date().toISOString(),
          author: 'IA Generator',
          price: 0,
          category: 'Geral',
          thumbnail: courseData.thumbnail || '',
          modules: courseData.modules as any
        } as Course;
        addCourse(newCourse);
        setTopic('');
        setAudience('');
        setShowForm(false);
      }
    } catch (e) {
      alert('Erro ao gerar curso. Verifique a chave de API.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-indigo-700"
        >
          <Plus className="w-5 h-5 mr-2" /> Novo Curso
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-md border border-indigo-100 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Wand2 className="w-5 h-5 mr-2 text-indigo-600" />
            Gerador de Curso com IA
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <input 
              type="text" 
              placeholder="Tópico (ex: Marketing Digital, Python Avançado)" 
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 outline-none"
              value={topic}
              onChange={e => setTopic(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="Público Alvo (opcional)" 
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 outline-none"
              value={audience}
              onChange={e => setAudience(e.target.value)}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button 
              onClick={handleGenerate} 
              disabled={isGenerating || !topic}
              className={`px-6 py-2 rounded-lg text-white font-medium flex items-center ${isGenerating ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700'}`}
            >
              {isGenerating ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Gerando...</> : 'Gerar Estrutura do Curso'}
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Curso</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aulas</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.map(course => (
              <tr key={course.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img className="h-10 w-10 rounded-md object-cover" src={course.thumbnail} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{course.title}</div>
                      <div className="text-sm text-gray-500">{course.category}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${course.price === 0 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {course.price === 0 ? 'Grátis' : `R$ ${course.price}`}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} aulas
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => deleteCourse(course.id)} className="text-red-600 hover:text-red-900">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// 3. Course Player / Details
const CoursePlayer: React.FC<{
  course: Course;
  enrollment?: Enrollment;
  onEnroll: () => void;
  onCompleteLesson: (lessonId: string) => void;
}> = ({ course, enrollment, onEnroll, onCompleteLesson }) => {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Widget States
  const [missionDone, setMissionDone] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number | null>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [unlockedSticker, setUnlockedSticker] = useState(false);
  const [reflection, setReflection] = useState("");
  const [miniGameRevealed, setMiniGameRevealed] = useState<number | null>(null);

  // Reset widget states when lesson changes
  useEffect(() => {
    setMissionDone(false);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setUnlockedSticker(false);
    setReflection("");
    setMiniGameRevealed(null);
  }, [activeLesson?.id]);

  useEffect(() => {
    if (!lessonId) {
      if (course.modules.length > 0 && course.modules[0].lessons.length > 0) {
        setActiveLesson(course.modules[0].lessons[0]);
      }
    } else {
      for (const mod of course.modules) {
        const found = mod.lessons.find(l => l.id === lessonId);
        if (found) {
          setActiveLesson(found);
          break;
        }
      }
    }
  }, [lessonId, course]);

  const isLessonLocked = (lesson: Lesson) => {
    if (!enrollment) return true; 
    if (!lesson.releaseDate) return false; 
    return new Date(lesson.releaseDate) > new Date(); 
  };

  const isLessonCompleted = (id: string) => enrollment?.completedLessonIds.includes(id);

  // Calculate Quiz Score
  const calculateQuizScore = () => {
    if (!activeLesson?.richContent?.quiz) return 0;
    let score = 0;
    activeLesson.richContent.quiz.questions.forEach((q, idx) => {
        if (quizAnswers[idx] === q.correctIndex) score++;
    });
    return score;
  };

  const handleComplete = () => {
    if (activeLesson) {
        onCompleteLesson(activeLesson.id);
        // Unlock sticker on completion if present
        if (activeLesson.richContent?.sticker) {
            setUnlockedSticker(true);
        }
    }
  };

  if (!enrollment) {
    // Landing page (unchanged)
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <button onClick={() => navigate('/')} className="mb-6 text-gray-500 hover:text-gray-900 flex items-center">
          <ChevronLeft className="w-5 h-5 mr-1" /> Voltar
        </button>
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{course.title}</h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">{course.description}</p>
            <h2 className="text-2xl font-bold mb-6">Conteúdo do Curso</h2>
            <div className="space-y-4">
              {course.modules.map((mod, idx) => (
                <div key={mod.id} className="border rounded-lg p-4 bg-white">
                  <h3 className="font-semibold text-lg mb-3 text-gray-800">Módulo {idx + 1}: {mod.title}</h3>
                  <ul className="space-y-2">
                    {mod.lessons.map(les => (
                      <li key={les.id} className="flex items-center text-gray-600 text-sm">
                        <Play className="w-4 h-4 mr-2 text-indigo-400" />
                        {les.title}
                        <span className="ml-auto text-xs bg-gray-100 px-2 py-1 rounded">
                          {les.duration}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white shadow-lg rounded-xl p-6 sticky top-24 border border-gray-100">
              <div className="text-3xl font-bold text-gray-900 mb-6 text-center">
                {course.price === 0 ? 'Gratuito' : `R$ ${course.price.toFixed(2)}`}
              </div>
              <button 
                onClick={onEnroll}
                className="w-full bg-indigo-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all transform active:scale-95 mb-6"
              >
                Matricular-se Agora
              </button>
              <img src={course.thumbnail} alt="Cover" className="w-full h-48 object-cover rounded-lg mb-4" />
              <p className="text-xs text-center text-gray-500 mt-2">
                Acesso vitalício • Certificado incluso
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Custom Dark Theme Player
  return (
    <div className="flex h-[calc(100vh-64px)] bg-[#111111] text-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} bg-[#1E1E1E] border-r border-gray-800 flex-shrink-0 transition-all duration-300 overflow-y-auto relative`}>
        <div className="p-4 border-b border-gray-800 sticky top-0 z-10 flex justify-between items-center bg-[#1E1E1E]">
          <h2 className="font-bold text-gray-200 truncate">Conteúdo</h2>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-2">
           {course.modules.map((mod, mIdx) => (
             <div key={mod.id} className="mb-4">
               <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-2 mt-2">Módulo {mIdx + 1}: {mod.title}</h3>
               <div className="space-y-1">
                 {mod.lessons.map((les) => {
                   const active = activeLesson?.id === les.id;
                   const locked = isLessonLocked(les);
                   const completed = isLessonCompleted(les.id);
                   
                   return (
                     <button
                       key={les.id}
                       disabled={locked}
                       onClick={() => navigate(`/learn/${course.id}/${les.id}`)}
                       className={`w-full flex items-start p-3 rounded-lg text-left text-sm transition-colors ${
                         active ? 'bg-gray-800 text-yellow-400 border-l-4 border-yellow-400' : 'hover:bg-gray-800 text-gray-400'
                       } ${locked ? 'opacity-50 cursor-not-allowed' : ''}`}
                     >
                       <div className="mt-0.5 mr-3 flex-shrink-0">
                         {completed ? (
                           <CheckCircle className="w-4 h-4 text-yellow-500" />
                         ) : locked ? (
                           <Lock className="w-4 h-4 text-gray-600" />
                         ) : (
                           <Play className={`w-4 h-4 ${active ? 'text-yellow-400' : 'text-gray-600'}`} />
                         )}
                       </div>
                       <div>
                         <div className="font-medium line-clamp-2">{les.title}</div>
                         <div className="text-xs text-gray-500 mt-1 flex items-center">
                           {les.duration}
                           {les.releaseDate && locked && (
                             <span className="ml-2 flex items-center text-orange-500">
                               <Calendar className="w-3 h-3 mr-1" /> 
                               {new Date(les.releaseDate).toLocaleDateString()}
                             </span>
                           )}
                         </div>
                       </div>
                     </button>
                   );
                 })}
               </div>
             </div>
           ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto relative scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
         <button 
           onClick={() => setSidebarOpen(!sidebarOpen)}
           className={`absolute top-4 left-4 z-20 bg-gray-800 p-2 rounded-full shadow-md text-gray-200 hover:text-yellow-400 ${sidebarOpen ? 'hidden' : 'block'}`}
         >
           <Menu className="w-5 h-5" />
         </button>

         {activeLesson ? (
           <div className="max-w-5xl mx-auto p-6 lg:p-10 space-y-8">
             {/* Header */}
             <div className="mb-6">
               <h1 className="text-3xl font-bold text-white mb-2">{activeLesson.title}</h1>
               <div className="flex items-center space-x-4 text-sm text-gray-400">
                  {enrollment.completedAt && (
                    <div className="text-yellow-500 flex items-center font-bold">
                      <Trophy className="w-4 h-4 mr-1" /> Aula Concluída
                    </div>
                  )}
                  {/* Progress Bar Visualization for current lesson */}
                  <div className="flex-1 w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500 w-1/4"></div>
                  </div>
                  <span>25% da Jornada</span>
               </div>
             </div>

             {/* Video Player */}
             {activeLesson.videoUrl && (
               <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-800">
                 <iframe 
                   src={activeLesson.videoUrl} 
                   title={activeLesson.title}
                   className="w-full h-full"
                   allowFullScreen
                 ></iframe>
               </div>
             )}

             {/* Mission Card */}
             {activeLesson.richContent?.mission && (
                <div className="bg-[#1E1E1E] border-l-4 border-yellow-500 rounded-r-xl p-6 shadow-lg">
                    <h3 className="text-yellow-500 font-bold text-lg flex items-center mb-3">
                        <Target className="w-5 h-5 mr-2" />
                        {activeLesson.richContent.mission.title}
                    </h3>
                    <p className="text-gray-300 mb-4">{activeLesson.richContent.mission.description}</p>
                    <button 
                        onClick={() => setMissionDone(true)}
                        disabled={missionDone}
                        className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${missionDone ? 'bg-green-900 text-green-300' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
                    >
                        {missionDone ? "Missão Registrada ✓" : activeLesson.richContent.mission.actionLabel}
                    </button>
                </div>
             )}

             {/* Sticker Unlock */}
             {(unlockedSticker || isLessonCompleted(activeLesson.id)) && activeLesson.richContent?.sticker && (
                 <div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-xl p-6 flex items-center justify-between animate-fade-in">
                     <div>
                         <h3 className="text-purple-200 font-bold mb-1">Sticker Exclusivo Desbloqueado!</h3>
                         <p className="text-white font-bold text-lg">“{activeLesson.richContent.sticker.title}”</p>
                         <div className="mt-3 flex space-x-3">
                             <button className="bg-white text-purple-900 px-3 py-1 rounded text-xs font-bold flex items-center">
                                 <Download className="w-3 h-3 mr-1" /> Baixar
                             </button>
                             <button className="bg-purple-800 text-white px-3 py-1 rounded text-xs font-bold flex items-center">
                                 <Share2 className="w-3 h-3 mr-1" /> Compartilhar
                             </button>
                         </div>
                     </div>
                     <img src={activeLesson.richContent.sticker.url} alt="Sticker" className="w-20 h-20 object-contain drop-shadow-lg animate-bounce" />
                 </div>
             )}

             {/* Main Description */}
             <div className="prose prose-invert max-w-none bg-[#1E1E1E] p-8 rounded-xl shadow-sm border border-gray-800">
               <ReactMarkdown>{activeLesson.content}</ReactMarkdown>
             </div>

             {/* Mini Game */}
             {activeLesson.richContent?.miniGame && (
                 <div className="space-y-4">
                     <h3 className="text-xl font-bold text-white flex items-center">
                         <Eye className="w-5 h-5 mr-2 text-blue-400" /> 
                         {activeLesson.richContent.miniGame.title}
                     </h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         {activeLesson.richContent.miniGame.cards.map((card, idx) => (
                             <div 
                                key={idx} 
                                onClick={() => setMiniGameRevealed(miniGameRevealed === idx ? null : idx)}
                                className="bg-[#1E1E1E] rounded-xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
                             >
                                 {miniGameRevealed === idx ? (
                                     <div className="p-6 flex flex-col items-center justify-center h-full text-center bg-blue-900/20">
                                         <Lightbulb className="w-8 h-8 text-yellow-400 mb-2" />
                                         <p className="text-blue-200 text-sm">{card.revealText}</p>
                                     </div>
                                 ) : (
                                     <>
                                        <div className="h-40 bg-gray-800 relative">
                                            <img src={card.imageUrl} className="w-full h-full object-cover opacity-60" alt="" />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                                <span className="text-white font-bold text-lg drop-shadow-md">{card.description}</span>
                                            </div>
                                        </div>
                                        <div className="p-3 text-center text-xs text-gray-400 uppercase tracking-wider">
                                            Clique para revelar
                                        </div>
                                     </>
                                 )}
                             </div>
                         ))}
                     </div>
                 </div>
             )}

             {/* Reflection */}
             <div className="bg-[#1E1E1E] p-6 rounded-xl border border-gray-800">
                 <h3 className="text-lg font-bold text-white mb-3 flex items-center">
                     <MessageSquare className="w-5 h-5 mr-2 text-pink-500" /> 
                     Reflexão Guiada
                 </h3>
                 <p className="text-gray-400 text-sm mb-4">“O que o meu corpo está tentando me contar hoje?”</p>
                 <textarea 
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                    placeholder="Escreva aqui sua reflexão..."
                    className="w-full bg-gray-900 text-white p-4 rounded-lg border border-gray-700 focus:border-pink-500 outline-none h-24 text-sm"
                 />
             </div>

             {/* Quiz */}
             {activeLesson.richContent?.quiz && (
                 <div className="bg-[#1E1E1E] p-6 rounded-xl border border-gray-800">
                     <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                         <Target className="w-5 h-5 mr-2 text-red-500" />
                         Quiz Relâmpago
                     </h3>
                     {quizSubmitted ? (
                         <div className="text-center py-8">
                             <p className="text-3xl mb-2">🎉</p>
                             <h4 className="text-xl font-bold text-white">Você acertou {calculateQuizScore()}/{activeLesson.richContent.quiz.questions.length}!</h4>
                             <p className="text-gray-400 text-sm mt-2">
                                 {calculateQuizScore() === activeLesson.richContent.quiz.questions.length 
                                    ? "Excelente! Você dominou o conteúdo." 
                                    : "Continue praticando, rever a aula pode ajudar!"}
                             </p>
                             <button 
                                onClick={() => { setQuizSubmitted(false); setQuizAnswers({}); }}
                                className="mt-4 text-red-400 text-sm hover:underline"
                             >
                                 Tentar novamente
                             </button>
                         </div>
                     ) : (
                         <div className="space-y-6">
                             {activeLesson.richContent.quiz.questions.map((q, qIdx) => (
                                 <div key={qIdx}>
                                     <p className="text-gray-200 font-medium mb-3">{qIdx + 1}. {q.question}</p>
                                     <div className="space-y-2">
                                         {q.options.map((opt, oIdx) => (
                                             <button
                                                key={oIdx}
                                                onClick={() => setQuizAnswers(prev => ({...prev, [qIdx]: oIdx}))}
                                                className={`w-full text-left p-3 rounded-lg text-sm border transition-all ${
                                                    quizAnswers[qIdx] === oIdx 
                                                        ? 'bg-red-900/30 border-red-500 text-white' 
                                                        : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-750'
                                                }`}
                                             >
                                                 {opt}
                                             </button>
                                         ))}
                                     </div>
                                 </div>
                             ))}
                             <button 
                                disabled={Object.keys(quizAnswers).length < activeLesson.richContent.quiz.questions.length}
                                onClick={() => setQuizSubmitted(true)}
                                className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg mt-4"
                             >
                                 Verificar Respostas
                             </button>
                         </div>
                     )}
                 </div>
             )}

             {/* Insights */}
             {activeLesson.richContent?.insights && (
                 <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
                     <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                         <Star className="w-5 h-5 mr-2 text-yellow-400" />
                         Insight Essencial
                     </h3>
                     <div className="space-y-3">
                         {activeLesson.richContent.insights.map((insight, idx) => (
                             <div key={idx} className="flex items-start">
                                 <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 mr-3 flex-shrink-0"></div>
                                 <p className="text-gray-300 italic">"{insight}"</p>
                             </div>
                         ))}
                     </div>
                 </div>
             )}

             {/* Countdown Mock */}
             <div className="text-center py-6 border-t border-gray-800">
                 <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Próxima Aula em breve</p>
                 <div className="text-2xl font-mono font-bold text-white flex justify-center items-center space-x-2">
                     <Clock className="w-6 h-6 text-gray-600" />
                     <span>47:59:12</span>
                 </div>
             </div>

             {/* Completion Action */}
             <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4">
               <div className="flex flex-col space-y-2 w-full md:w-auto">
                   {activeLesson.richContent?.materials && (
                       <div className="flex flex-col space-y-2">
                           <span className="text-xs text-gray-500 uppercase font-bold">Materiais</span>
                           {activeLesson.richContent.materials.map((mat, idx) => (
                               <a key={idx} href={mat.url} className="text-blue-400 hover:text-blue-300 text-sm flex items-center">
                                   <Download className="w-3 h-3 mr-2" /> {mat.title}
                               </a>
                           ))}
                       </div>
                   )}
               </div>

               {!isLessonCompleted(activeLesson.id) ? (
                 <button 
                   onClick={handleComplete}
                   className="w-full md:w-auto bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 flex items-center justify-center shadow-lg shadow-green-900/20 hover:shadow-green-900/40 transition-all transform hover:scale-105"
                 >
                   <CheckCircle className="w-5 h-5 mr-2" />
                   Marcar como Concluída
                 </button>
               ) : (
                 <button disabled className="w-full md:w-auto bg-gray-800 text-gray-500 border border-gray-700 px-8 py-4 rounded-xl font-bold flex items-center justify-center cursor-default">
                   <CheckCircle className="w-5 h-5 mr-2" />
                   Concluída
                 </button>
               )}
             </div>
           </div>
         ) : (
           <div className="flex items-center justify-center h-full text-gray-600">
             Selecione uma aula para começar
           </div>
         )}
      </div>
    </div>
  );
};

// ... (Rest of App component wrappers and main App component kept structure but updated styling if necessary, for brevity assume standard wrapper logic)

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [enrollments, setEnrollments] = useState<Enrollment[]>(MOCK_ENROLLMENTS);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [pendingEnrollCourse, setPendingEnrollCourse] = useState<Course | null>(null);

  const handleLogin = (u: User) => {
    setUser(u);
    if (pendingEnrollCourse) {
      setPendingEnrollCourse(null);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setPendingEnrollCourse(null);
  };

  const handleCourseClick = (course: Course, navigate: (path: string) => void) => {
    const enrollment = user ? enrollments.find(e => e.courseId === course.id && e.userId === user.id) : null;
    if (enrollment) {
      navigate(`/learn/${course.id}/${course.modules[0].lessons[0].id}`);
    } else {
      navigate(`/course/${course.id}`);
    }
  };

  const enrollInCourse = (course: Course, navigate: (path: string) => void) => {
    if (course.price > 0 && !user) {
      setPendingEnrollCourse(course);
      setAuthModalOpen(true);
      return;
    }
    const newEnrollment: Enrollment = {
      userId: user ? user.id : 'guest',
      courseId: course.id,
      completedLessonIds: [],
      enrolledAt: new Date().toISOString()
    };
    if (!user && course.price === 0) {
       setEnrollments([...enrollments, newEnrollment]);
       navigate(`/learn/${course.id}/${course.modules[0].lessons[0].id}`);
       return;
    }
    if (user) {
       setEnrollments([...enrollments, newEnrollment]);
       navigate(`/learn/${course.id}/${course.modules[0].lessons[0].id}`);
    }
  };

  const completeLesson = (courseId: string, lessonId: string) => {
    const userId = user ? user.id : 'guest';
    setEnrollments(prev => prev.map(enr => {
      if (enr.courseId === courseId && enr.userId === userId) {
        const alreadyCompleted = enr.completedLessonIds.includes(lessonId);
        if (alreadyCompleted) return enr;
        const newCompleted = [...enr.completedLessonIds, lessonId];
        const course = courses.find(c => c.id === courseId);
        const totalLessons = course?.modules.reduce((acc, m) => acc + m.lessons.length, 0) || 0;
        const isFinished = newCompleted.length === totalLessons;
        return {
          ...enr,
          completedLessonIds: newCompleted,
          completedAt: isFinished ? new Date().toISOString() : undefined
        };
      }
      return enr;
    }));
  };

  const addNewCourse = (c: Course) => setCourses([...courses, c]);
  const deleteCourse = (id: string) => setCourses(courses.filter(c => c.id !== id));

  return (
    <HashRouter>
      <Header 
        user={user} 
        onLogout={handleLogout} 
        onLoginClick={() => setAuthModalOpen(true)} 
      />
      <main className="min-h-[calc(100vh-64px)]">
        <Routes>
          <Route path="/" element={<CatalogWrapper courses={courses} enrollments={enrollments} user={user} onCourseClick={handleCourseClick} />} />
          <Route path="/course/:id" element={<CourseDetailsWrapper courses={courses} enrollments={enrollments} user={user} onEnroll={enrollInCourse} />} />
          <Route path="/learn/:courseId/:lessonId" element={<PlayerWrapper courses={courses} enrollments={enrollments} user={user} onEnroll={enrollInCourse} onCompleteLesson={completeLesson} />} />
          <Route path="/certificate/:courseId" element={<CertificateWrapper courses={courses} enrollments={enrollments} user={user} />} />
          <Route path="/admin" element={user?.role === UserRole.ADMIN ? (<AdminDashboard courses={courses} addCourse={addNewCourse} deleteCourse={deleteCourse} />) : (<Navigate to="/" replace />)} />
          <Route path="/my-learning" element={<MyLearningWrapper courses={courses} enrollments={enrollments} user={user} onCourseClick={handleCourseClick} />} />
        </Routes>
      </main>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} onLogin={handleLogin} />
    </HashRouter>
  );
};

// Wrappers
const CatalogWrapper = ({ courses, enrollments, user, onCourseClick }: any) => {
  const navigate = useNavigate();
  return <Catalog courses={courses} enrollments={enrollments} user={user} onCourseClick={(c) => onCourseClick(c, navigate)} />;
};
const CourseDetailsWrapper = ({ courses, enrollments, user, onEnroll }: any) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find((c: Course) => c.id === id);
  const enrollment = user ? enrollments.find((e: Enrollment) => e.courseId === id && e.userId === user.id) : enrollments.find((e: Enrollment) => e.courseId === id && e.userId === 'guest');
  if (!course) return <div>Curso não encontrado</div>;
  return <CoursePlayer course={course} enrollment={enrollment} onEnroll={() => onEnroll(course, navigate)} onCompleteLesson={() => {}} />;
};
const PlayerWrapper = ({ courses, enrollments, user, onEnroll, onCompleteLesson }: any) => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = courses.find((c: Course) => c.id === courseId);
  const userId = user ? user.id : 'guest';
  const enrollment = enrollments.find((e: Enrollment) => e.courseId === courseId && e.userId === userId);
  if (!course) return <div>Curso não encontrado</div>;
  return <CoursePlayer course={course} enrollment={enrollment} onEnroll={() => onEnroll(course, navigate)} onCompleteLesson={(lid) => onCompleteLesson(course.id, lid)} />;
};
const CertificateWrapper = ({ courses, enrollments, user }: any) => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = courses.find((c: Course) => c.id === courseId);
  const userId = user ? user.id : 'guest';
  const enrollment = enrollments.find((e: Enrollment) => e.courseId === courseId && e.userId === userId);
  if (!course || !enrollment || !enrollment.completedAt) {
    return <div className="p-10 text-center">Certificado indisponível. Complete o curso primeiro.</div>;
  }
  const certUser = user || { id: 'guest', name: 'Visitante', email: '', role: UserRole.STUDENT };
  return <Certificate user={certUser} course={course} date={enrollment.completedAt} onBack={() => navigate('/')} />;
};
const MyLearningWrapper = ({ courses, enrollments, user, onCourseClick }: any) => {
    const navigate = useNavigate();
    if (!user) return <Navigate to="/" />;
    const myEnrollments = enrollments.filter((e: Enrollment) => e.userId === user.id);
    const myCourses = courses.filter((c: Course) => myEnrollments.some((e: Enrollment) => e.courseId === c.id));
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Meus Cursos</h1>
            {myCourses.length === 0 ? (
                <p className="text-gray-500">Você ainda não se matriculou em nenhum curso.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {myCourses.map((course: Course) => {
                        const enrollment = myEnrollments.find((e: Enrollment) => e.courseId === course.id);
                        return (
                            <CourseCard 
                                key={course.id} 
                                course={course} 
                                enrollment={enrollment}
                                onClick={() => onCourseClick(course, navigate)} 
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default App;
