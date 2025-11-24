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
  Eye, Lightbulb, Clock, Share2, ArrowRight,
  Headphones, Video, Network, FileText, Layers, HelpCircle,
  BarChart3, MonitorPlay, BookOpen, Sparkles, Users, Book, Award,
  GraduationCap, PlayCircle, LogOut
} from 'lucide-react';

// 1. Home Page (Catalog) - Light Theme
const Catalog: React.FC<{ 
  courses: Course[], 
  enrollments: Enrollment[], 
  user: User | null,
  onCourseClick: (c: Course) => void 
}> = ({ courses, enrollments, user, onCourseClick }) => {
  return (
    <div className="min-h-screen bg-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-red-50 text-brand-red border border-red-100 text-xs font-bold uppercase tracking-widest mb-4">
            Formação Profissional
          </span>
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-brand-text mb-4">
            Sua Jornada de <span className="text-brand-red">Conhecimento</span>
          </h1>
          <p className="text-lg text-brand-muted max-w-2xl mx-auto font-light">
            Acesse seus cursos, acompanhe seu progresso e torne-se um especialista na análise corporal.
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
      
      {/* Footer Darker */}
      <footer className="bg-brand-darker text-white py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
              <div className="flex justify-center mb-6">
                  <GraduationCap className="w-10 h-10 text-brand-red" />
              </div>
              <p className="text-gray-500 mb-4 text-sm">© 2024 Terapeuta Analista. Todos os direitos reservados.</p>
          </div>
      </footer>
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
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen bg-brand-light">
      <div className="flex justify-between items-center mb-10">
        <div>
            <h1 className="text-3xl font-display font-bold text-brand-text">Painel Administrativo</h1>
            <p className="text-brand-muted mt-1">Gerencie cursos, liberações e alunos</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-brand-whatsapp text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-brand-whatsapp-hover flex items-center transition-all hover:-translate-y-1 uppercase text-sm tracking-wide"
        >
          <Plus className="w-5 h-5 mr-2" /> Novo Curso
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-brand-red mb-10">
          <h2 className="text-xl font-bold mb-6 flex items-center text-brand-text">
            <Wand2 className="w-5 h-5 mr-2 text-brand-red" />
            Gerador de Curso com IA
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
                <label className="block text-sm font-bold text-brand-muted mb-2">Tópico do Curso</label>
                <input 
                type="text" 
                placeholder="ex: Marketing Digital, Python Avançado" 
                className="border border-gray-300 p-4 rounded-lg w-full focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none bg-gray-50"
                value={topic}
                onChange={e => setTopic(e.target.value)}
                />
            </div>
            <div>
                <label className="block text-sm font-bold text-brand-muted mb-2">Público Alvo (Opcional)</label>
                <input 
                type="text" 
                placeholder="ex: Iniciantes, Profissionais" 
                className="border border-gray-300 p-4 rounded-lg w-full focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none bg-gray-50"
                value={audience}
                onChange={e => setAudience(e.target.value)}
                />
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <button 
              onClick={handleGenerate} 
              disabled={isGenerating || !topic}
              className={`px-8 py-3 rounded-full text-white font-bold flex items-center shadow-md transition-all uppercase text-sm tracking-wide ${isGenerating ? 'bg-gray-400' : 'bg-brand-red hover:bg-brand-red-hover hover:-translate-y-1'}`}
            >
              {isGenerating ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Gerando...</> : 'Gerar Estrutura'}
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
            <h3 className="font-bold text-brand-text text-lg">Cursos Ativos & Agendamento</h3>
        </div>
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-8 py-5 text-left text-xs font-bold text-brand-muted uppercase tracking-wider">Curso</th>
              <th className="px-8 py-5 text-left text-xs font-bold text-brand-muted uppercase tracking-wider">Liberação (Drip)</th>
              <th className="px-8 py-5 text-left text-xs font-bold text-brand-muted uppercase tracking-wider">Aulas</th>
              <th className="px-8 py-5 text-right text-xs font-bold text-brand-muted uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {courses.map(course => (
              <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-12 w-12 flex-shrink-0 rounded-lg overflow-hidden shadow-sm border border-gray-200">
                      <img className="h-full w-full object-cover" src={course.thumbnail} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-bold text-brand-text">{course.title}</div>
                      <div className="text-xs text-brand-muted">{course.category}</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="flex flex-col">
                      <span className="text-xs font-bold text-brand-whatsapp bg-green-50 px-2 py-1 rounded inline-block w-fit border border-green-100 mb-1">
                        Automático
                      </span>
                      <span className="text-[10px] text-gray-400">Baseado na data da aula</span>
                  </div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap text-sm text-brand-muted font-medium">
                  {course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} aulas
                </td>
                <td className="px-8 py-6 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => deleteCourse(course.id)} className="text-brand-muted hover:text-brand-red p-2 hover:bg-red-50 rounded-lg transition-colors">
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

// 3. Course Player / Details (Dashboard Layout)
const CoursePlayer: React.FC<{
  course: Course;
  enrollment?: Enrollment;
  onEnroll: () => void;
  onCompleteLesson: (lessonId: string) => void;
  user: User | null;
  onLogout: () => void;
}> = ({ course, enrollment, onEnroll, onCompleteLesson, user, onLogout }) => {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('curso');
  
  // Widget States
  const [missionDone, setMissionDone] = useState(false);
  const [unlockedSticker, setUnlockedSticker] = useState(false);
  const [nextLesson, setNextLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    setActiveTab('curso');
    setMissionDone(false);
    setUnlockedSticker(false);
  }, [activeLesson?.id]);

  useEffect(() => {
    let foundLesson = null;
    let next = null;
    let foundActive = false;

    if (!lessonId) {
      if (course.modules.length > 0 && course.modules[0].lessons.length > 0) {
        foundLesson = course.modules[0].lessons[0];
      }
    } else {
      for (const mod of course.modules) {
        for (const l of mod.lessons) {
          if (foundActive) {
            next = l;
            foundActive = false;
            break;
          }
          if (l.id === lessonId) {
            foundLesson = l;
            foundActive = true;
          }
        }
        if (next) break;
      }
    }
    
    setActiveLesson(foundLesson);
    setNextLesson(next);
  }, [lessonId, course]);

  const isLessonLocked = (lesson: Lesson) => {
    if (!enrollment) return true; 
    if (!lesson.releaseDate) return false; 
    return new Date(lesson.releaseDate) > new Date(); 
  };

  const isLessonCompleted = (id: string) => enrollment?.completedLessonIds.includes(id);

  const handleComplete = () => {
    if (activeLesson) {
        onCompleteLesson(activeLesson.id);
        if (activeLesson.richContent?.sticker) {
            setUnlockedSticker(true);
        }
        // Auto advance logic could go here
    }
  };

  if (!enrollment) {
    // Landing Page Style for Unenrolled
    return (
      <div className="min-h-screen bg-brand-light">
        <div className="bg-brand-dark text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <button onClick={() => navigate('/')} className="mb-8 text-gray-400 hover:text-white flex items-center font-medium transition-colors">
                    <ChevronLeft className="w-5 h-5 mr-1" /> Voltar para Catálogo
                </button>
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-brand-red text-white text-xs font-bold mb-4 uppercase tracking-wide">{course.category}</span>
                        <h1 className="text-4xl lg:text-5xl font-display font-bold text-white mb-6 leading-tight">{course.title}</h1>
                        <p className="text-lg text-gray-300 leading-relaxed mb-8">{course.description}</p>
                        <div className="flex items-center space-x-6 text-sm text-gray-400 mb-8">
                            <div className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-brand-whatsapp" /> Acesso vitalício</div>
                            <div className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-brand-whatsapp" /> Certificado incluso</div>
                        </div>
                        <button 
                            onClick={onEnroll}
                            className="bg-brand-whatsapp text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-brand-whatsapp-hover hover:-translate-y-1 transition-all uppercase tracking-wide w-full sm:w-auto text-center"
                        >
                            Matricular-se Agora
                        </button>
                    </div>
                    <div className="bg-white rounded-2xl p-2 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                        <img src={course.thumbnail} alt="Cover" className="w-full rounded-xl shadow-inner" />
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }

  // DASHBOARD LAYOUT: Dark Sidebar (Left) + Light Content (Right)
  return (
    <div className="flex h-screen bg-brand-light overflow-hidden">
      {/* SIDEBAR */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} bg-brand-dark flex-shrink-0 transition-all duration-300 flex flex-col border-r border-gray-800 relative z-20`}>
        <div className="p-6 border-b border-gray-800 flex items-center justify-between bg-brand-dark">
            <div className="flex items-center space-x-3">
                <div className="bg-brand-red p-1.5 rounded-md">
                    <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-bold font-display tracking-wide">TERAPEUTA</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400"><X className="w-5 h-5" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
           <div className="mb-4">
               <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 px-2">Módulos</div>
               {course.modules.map((mod, mIdx) => (
                 <div key={mod.id} className="mb-6">
                    <div className="flex items-center mb-3 px-2">
                        <div className="w-6 h-6 rounded bg-gray-800 text-gray-400 flex items-center justify-center text-xs font-bold mr-3 border border-gray-700">
                            {mIdx + 1}
                        </div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wide line-clamp-1">{mod.title}</h3>
                    </div>
                   
                   <div className="space-y-1 pl-2">
                     {mod.lessons.map((les) => {
                       const active = activeLesson?.id === les.id;
                       const locked = isLessonLocked(les);
                       const completed = isLessonCompleted(les.id);
                       
                       return (
                         <button
                           key={les.id}
                           disabled={locked}
                           onClick={() => navigate(`/learn/${course.id}/${les.id}`)}
                           className={`w-full flex items-center p-3 rounded-lg text-left text-xs font-medium transition-all duration-200 group ${
                             active 
                                ? 'bg-brand-red text-white shadow-md' 
                                : 'hover:bg-gray-800 text-gray-400 hover:text-white'
                           } ${locked ? 'opacity-50 cursor-not-allowed' : ''}`}
                         >
                           <div className="mr-3 flex-shrink-0">
                             {completed ? (
                               <CheckCircle className={`w-4 h-4 ${active ? 'text-white' : 'text-brand-whatsapp'}`} />
                             ) : locked ? (
                               <Lock className="w-4 h-4" />
                             ) : (
                               <PlayCircle className={`w-4 h-4 ${active ? 'text-white' : 'text-gray-600 group-hover:text-white'}`} />
                             )}
                           </div>
                           <span className="line-clamp-2">{les.title}</span>
                         </button>
                       );
                     })}
                   </div>
                 </div>
               ))}
           </div>
        </div>

        {/* User Footer in Sidebar */}
        <div className="p-4 border-t border-gray-800 bg-[#0a0a0a]">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-xs">
                        {user?.name.charAt(0)}
                    </div>
                    <div className="text-xs">
                        <p className="text-white font-bold truncate w-24">{user?.name}</p>
                        <p className="text-gray-500">Aluno</p>
                    </div>
                </div>
                <button onClick={onLogout} className="text-gray-500 hover:text-brand-red transition-colors">
                    <LogOut className="w-4 h-4" />
                </button>
            </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#f9fafb]">
         {/* Top Navigation within Main Area */}
         <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm flex-shrink-0">
            <div className="flex items-center">
                <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`mr-4 text-gray-500 hover:text-brand-text transition-colors ${sidebarOpen ? 'hidden md:block' : 'block'}`}
                >
                <Menu className="w-6 h-6" />
                </button>
                <h2 className="text-sm font-bold text-brand-text uppercase tracking-wide hidden sm:block">
                    {course.title}
                </h2>
            </div>
            <div className="flex items-center space-x-4">
                <button onClick={() => navigate('/')} className="text-xs font-bold text-gray-500 hover:text-brand-text uppercase tracking-wide">
                    Voltar ao Início
                </button>
            </div>
         </div>

         <div className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar">
             {activeLesson ? (
               <div className="max-w-5xl mx-auto">
                 {/* Video Section */}
                 <div className="bg-black rounded-2xl overflow-hidden shadow-2xl aspect-video mb-8 relative group">
                    {activeLesson.videoUrl ? (
                        <iframe 
                        src={activeLesson.videoUrl} 
                        title={activeLesson.title}
                        className="w-full h-full"
                        allowFullScreen
                        ></iframe>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-white">
                            <p>Vídeo indisponível</p>
                        </div>
                    )}
                 </div>

                 {/* Lesson Title & Actions */}
                 <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-display font-bold text-brand-text mb-2">
                            {activeLesson.title}
                        </h1>
                        <p className="text-brand-muted text-sm flex items-center">
                            <Clock className="w-4 h-4 mr-1" /> {activeLesson.duration} de conteúdo
                        </p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                        {!isLessonCompleted(activeLesson.id) ? (
                            <button 
                            onClick={handleComplete}
                            className="bg-brand-whatsapp hover:bg-brand-whatsapp-hover text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-green-200 flex items-center transition-all transform hover:-translate-y-1 text-sm uppercase tracking-wide"
                            >
                            <CheckCircle className="w-5 h-5 mr-2" />
                            Concluir Aula
                            </button>
                        ) : (
                            <button disabled className="bg-green-50 text-green-600 border border-green-200 px-8 py-3 rounded-full font-bold flex items-center cursor-default text-sm uppercase tracking-wide">
                            <CheckCircle className="w-5 h-5 mr-2" />
                            Concluída
                            </button>
                        )}
                        
                        {nextLesson && (
                            <button 
                                onClick={() => navigate(`/learn/${course.id}/${nextLesson.id}`)}
                                className="bg-white border border-gray-200 text-brand-text hover:bg-gray-50 px-6 py-3 rounded-full font-bold flex items-center transition-all text-sm uppercase tracking-wide shadow-sm"
                            >
                                Próxima <ArrowRight className="w-4 h-4 ml-2" />
                            </button>
                        )}
                    </div>
                 </div>

                 {/* Tabs / Content */}
                 <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description Card */}
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-brand-text mb-4 border-l-4 border-brand-red pl-3">Sobre esta aula</h3>
                            <div className="prose prose-red prose-sm max-w-none text-gray-600">
                                <ReactMarkdown>{activeLesson.content}</ReactMarkdown>
                            </div>
                        </div>

                        {/* Mission */}
                        {activeLesson.richContent?.mission && (
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-brand-red/10 p-3 rounded-lg">
                                        <Target className="w-6 h-6 text-brand-red" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-brand-text text-lg mb-2">{activeLesson.richContent.mission.title}</h4>
                                        <p className="text-sm text-gray-600 mb-4">{activeLesson.richContent.mission.description}</p>
                                        <button 
                                            onClick={() => setMissionDone(true)}
                                            disabled={missionDone}
                                            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide ${missionDone ? 'bg-green-100 text-green-700' : 'bg-brand-text text-white hover:bg-gray-800'}`}
                                        >
                                            {missionDone ? "Missão Cumprida" : activeLesson.richContent.mission.actionLabel}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        {/* Materials */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-sm font-bold text-brand-text mb-4 uppercase tracking-wide text-gray-400">Materiais Complementares</h3>
                            <div className="space-y-3">
                                {activeLesson.richContent?.materials ? (
                                    activeLesson.richContent.materials.map((mat, idx) => (
                                        <a key={idx} href={mat.url} className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-red-50 hover:text-brand-red transition-colors group">
                                            <FileText className="w-5 h-5 text-gray-400 group-hover:text-brand-red mr-3" />
                                            <span className="text-sm font-medium text-gray-700 group-hover:text-brand-red">{mat.title}</span>
                                            <Download className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-brand-red" />
                                        </a>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-400 italic">Nenhum material extra.</p>
                                )}
                            </div>
                        </div>

                        {/* Sticker Unlock */}
                        {(unlockedSticker || isLessonCompleted(activeLesson.id)) && activeLesson.richContent?.sticker && (
                            <div className="bg-gradient-to-br from-brand-red to-red-700 rounded-xl p-6 text-white text-center shadow-lg">
                                <div className="mb-4 flex justify-center">
                                    <div className="bg-white/20 p-3 rounded-full">
                                        <Sparkles className="w-6 h-6 text-yellow-300" />
                                    </div>
                                </div>
                                <h3 className="font-bold text-lg mb-1">Sticker Desbloqueado!</h3>
                                <p className="text-xs text-white/80 mb-4 uppercase tracking-wider">Colecione sua conquista</p>
                                <img src={activeLesson.richContent.sticker.url} alt="Sticker" className="w-20 h-20 object-contain mx-auto drop-shadow-md mb-4" />
                                <button className="w-full bg-white text-brand-red font-bold py-2 rounded-full text-xs uppercase tracking-wide hover:bg-gray-100 transition-colors">
                                    Baixar Sticker
                                </button>
                            </div>
                        )}
                    </div>
                 </div>
               </div>
             ) : (
               <div className="flex flex-col items-center justify-center h-full text-center">
                 <div className="bg-gray-100 p-6 rounded-full mb-6">
                    <PlayCircle className="w-12 h-12 text-gray-400" />
                 </div>
                 <h3 className="text-xl font-bold text-brand-text mb-2">Pronto para começar?</h3>
                 <p className="text-gray-500 max-w-md">Selecione uma aula no menu lateral para iniciar seus estudos.</p>
               </div>
             )}
         </div>
      </div>
    </div>
  );
};

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
        const firstLesson = course.modules[0]?.lessons[0];
        if (firstLesson) {
             navigate(`/learn/${course.id}/${firstLesson.id}`);
        }
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
        const firstLesson = course.modules[0]?.lessons[0];
        if (firstLesson) {
            navigate(`/learn/${course.id}/${firstLesson.id}`);
        }
       return;
    }
    if (user) {
       setEnrollments([...enrollments, newEnrollment]);
        const firstLesson = course.modules[0]?.lessons[0];
        if (firstLesson) {
             navigate(`/learn/${course.id}/${firstLesson.id}`);
        }
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
      <main className="min-h-[calc(100vh-80px)] bg-brand-light">
        <Routes>
          <Route path="/" element={<CatalogWrapper courses={courses} enrollments={enrollments} user={user} onCourseClick={handleCourseClick} />} />
          <Route path="/course/:id" element={<CourseDetailsWrapper courses={courses} enrollments={enrollments} user={user} onEnroll={enrollInCourse} onLogout={handleLogout} />} />
          <Route path="/learn/:courseId/:lessonId" element={<PlayerWrapper courses={courses} enrollments={enrollments} user={user} onEnroll={enrollInCourse} onCompleteLesson={completeLesson} onLogout={handleLogout} />} />
          <Route path="/learn/:courseId" element={<PlayerWrapper courses={courses} enrollments={enrollments} user={user} onEnroll={enrollInCourse} onCompleteLesson={completeLesson} onLogout={handleLogout} />} />
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
const CourseDetailsWrapper = ({ courses, enrollments, user, onEnroll, onLogout }: any) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find((c: Course) => c.id === id);
  const enrollment = user ? enrollments.find((e: Enrollment) => e.courseId === id && e.userId === user.id) : enrollments.find((e: Enrollment) => e.courseId === id && e.userId === 'guest');
  if (!course) return <div>Curso não encontrado</div>;
  return <CoursePlayer course={course} enrollment={enrollment} onEnroll={() => onEnroll(course, navigate)} onCompleteLesson={() => {}} user={user} onLogout={onLogout} />;
};
const PlayerWrapper = ({ courses, enrollments, user, onEnroll, onCompleteLesson, onLogout }: any) => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const course = courses.find((c: Course) => c.id === courseId);
  if (!course) return <div>Curso não encontrado</div>;
  
  const userId = user ? user.id : 'guest';
  const enrollment = enrollments.find((e: Enrollment) => e.courseId === courseId && e.userId === userId);
  
  return <CoursePlayer course={course} enrollment={enrollment} onEnroll={() => onEnroll(course, navigate)} onCompleteLesson={(lid) => onCompleteLesson(course.id, lid)} user={user} onLogout={onLogout} />;
};
const CertificateWrapper = ({ courses, enrollments, user }: any) => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = courses.find((c: Course) => c.id === courseId);
  const userId = user ? user.id : 'guest';
  const enrollment = enrollments.find((e: Enrollment) => e.courseId === courseId && e.userId === userId);
  if (!course || !enrollment || !enrollment.completedAt) {
    return <div className="p-10 text-center text-gray-600 bg-brand-light h-screen">Certificado indisponível. Complete o curso primeiro.</div>;
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
        <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen bg-brand-light">
            <h1 className="text-3xl font-display font-bold text-brand-text mb-8">Meus Cursos</h1>
            {myCourses.length === 0 ? (
                <p className="text-brand-muted">Você ainda não se matriculou em nenhum curso.</p>
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