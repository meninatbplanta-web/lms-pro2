import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate, useParams, useLocation } from 'react-router-dom';
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
  GraduationCap, PlayCircle, LogOut, Settings, LayoutDashboard, BookOpen,
  Users, Home, Sparkles, FileText
} from 'lucide-react';

// --- 1. Sidebar Component (Navigation Hub) ---
const Sidebar: React.FC<{ 
  isOpen: boolean; 
  user: User | null; 
  onClose: () => void;
}> = ({ isOpen, user, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} fixed lg:static inset-y-0 left-0 z-40 w-[280px] bg-premium-sidebar border-r border-premium-border transition-transform duration-300 flex flex-col h-full`}>
      <div className="h-20 flex items-center px-8 border-b border-premium-border">
        <div>
          <span className="block font-display font-bold text-lg tracking-wide text-white">PRISCILLA <span className="text-premium-red">MOREIRA</span></span>
          <span className="block text-[10px] uppercase tracking-[0.2em] text-premium-muted">Terapeuta Analista</span>
        </div>
        <button onClick={onClose} className="lg:hidden ml-auto text-premium-muted"><X /></button>
      </div>

      <div className="flex-1 overflow-y-auto py-8 px-4 space-y-2">
        <div className="px-4 mb-2 text-[10px] font-bold text-premium-muted uppercase tracking-widest">Menu Principal</div>
        
        <button onClick={() => navigate('/')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${isActive('/') ? 'bg-premium-card text-premium-red border-l-2 border-premium-red' : 'text-premium-text hover:bg-white/5 hover:text-white'}`}>
          <Home className="w-5 h-5" />
          <span className="text-sm font-medium">Início</span>
        </button>

        {user && (
          <button onClick={() => navigate('/my-learning')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${isActive('/my-learning') ? 'bg-premium-card text-premium-red border-l-2 border-premium-red' : 'text-premium-text hover:bg-white/5 hover:text-white'}`}>
            <BookOpen className="w-5 h-5" />
            <span className="text-sm font-medium">Meus Cursos</span>
          </button>
        )}

        {user?.role === UserRole.ADMIN && (
          <>
            <div className="px-4 mt-8 mb-2 text-[10px] font-bold text-premium-muted uppercase tracking-widest">Administração</div>
            <button onClick={() => navigate('/admin')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${isActive('/admin') ? 'bg-premium-card text-premium-red border-l-2 border-premium-red' : 'text-premium-text hover:bg-white/5 hover:text-white'}`}>
              <LayoutDashboard className="w-5 h-5" />
              <span className="text-sm font-medium">Painel de Controle</span>
            </button>
          </>
        )}
      </div>

      <div className="p-6 border-t border-premium-border bg-gradient-to-b from-transparent to-black/50">
        <div className="bg-premium-card p-4 rounded-xl border border-premium-border shadow-lg">
            <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-premium-red/20 flex items-center justify-center text-premium-red">
                    <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold text-white">Suporte VIP</span>
            </div>
            <p className="text-xs text-premium-muted mb-3 leading-relaxed">Dúvidas sobre a análise? Nossa equipe está pronta.</p>
            <button className="w-full py-2 text-xs font-bold uppercase tracking-wider text-white border border-white/10 rounded hover:bg-white/5 transition-colors">
                Chamar Ajuda
            </button>
        </div>
      </div>
    </aside>
  );
}

// --- 2. Catalog Page (Dark Theme) ---
const Catalog: React.FC<{ 
  courses: Course[], 
  enrollments: Enrollment[], 
  user: User | null,
  onCourseClick: (c: Course) => void 
}> = ({ courses, enrollments, user, onCourseClick }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-fade-in">
      <div className="mb-12">
        <span className="inline-block py-1 px-3 rounded bg-premium-red/10 text-premium-red border border-premium-red/20 text-[10px] font-bold uppercase tracking-widest mb-4">
          Formação Profissional
        </span>
        <h1 className="text-4xl lg:text-5xl font-display font-bold text-white mb-4 leading-tight">
          Domine a <span className="text-premium-red">Leitura Corporal</span>
        </h1>
        <p className="text-lg text-premium-muted max-w-2xl font-light">
          Acesse conhecimentos exclusivos e aprenda a decodificar a mente através do formato do corpo.
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

// --- 3. Admin Dashboard (Dark Theme) ---
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
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-10">
        <div>
            <h1 className="text-3xl font-display font-bold text-white">Central de Comando</h1>
            <p className="text-premium-muted mt-1">Gerencie o conteúdo e alunos da plataforma.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-premium-red text-white px-6 py-3 rounded-full font-bold shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:bg-premium-red-dark flex items-center transition-all hover:-translate-y-1 uppercase text-xs tracking-widest"
        >
          <Plus className="w-4 h-4 mr-2" /> Novo Treinamento
        </button>
      </div>

      {showForm && (
        <div className="bg-premium-card p-8 rounded-xl shadow-2xl border border-premium-border mb-10 animate-in slide-in-from-top-4">
          <h2 className="text-xl font-bold mb-6 flex items-center text-white">
            <Wand2 className="w-5 h-5 mr-2 text-premium-gold" />
            Criação Assistida por IA
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
                <label className="block text-xs font-bold text-premium-muted mb-2 uppercase tracking-wider">Tema Principal</label>
                <input 
                type="text" 
                placeholder="ex: Traços de Caráter, Análise Facial" 
                className="bg-premium-bg border border-premium-border p-4 rounded-lg w-full focus:border-premium-red focus:ring-1 focus:ring-premium-red outline-none text-white transition-all"
                value={topic}
                onChange={e => setTopic(e.target.value)}
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-premium-muted mb-2 uppercase tracking-wider">Público Alvo</label>
                <input 
                type="text" 
                placeholder="ex: Psicólogos, Terapeutas" 
                className="bg-premium-bg border border-premium-border p-4 rounded-lg w-full focus:border-premium-red focus:ring-1 focus:ring-premium-red outline-none text-white transition-all"
                value={audience}
                onChange={e => setAudience(e.target.value)}
                />
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <button 
              onClick={handleGenerate} 
              disabled={isGenerating || !topic}
              className={`px-8 py-3 rounded-full text-white font-bold flex items-center shadow-md transition-all uppercase text-xs tracking-widest ${isGenerating ? 'bg-gray-600' : 'bg-premium-green hover:bg-premium-green-dark hover:shadow-[0_0_15px_rgba(37,211,102,0.4)]'}`}
            >
              {isGenerating ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processando...</> : 'Gerar Estrutura'}
            </button>
          </div>
        </div>
      )}

      <div className="bg-premium-card rounded-xl shadow-sm border border-premium-border overflow-hidden">
        <div className="p-6 border-b border-premium-border bg-premium-card/50">
            <h3 className="font-bold text-white text-lg">Cursos Ativos</h3>
        </div>
        <table className="min-w-full divide-y divide-premium-border">
          <thead className="bg-black/20">
            <tr>
              <th className="px-8 py-5 text-left text-[10px] font-bold text-premium-muted uppercase tracking-widest">Curso</th>
              <th className="px-8 py-5 text-left text-[10px] font-bold text-premium-muted uppercase tracking-widest">Liberação</th>
              <th className="px-8 py-5 text-left text-[10px] font-bold text-premium-muted uppercase tracking-widest">Conteúdo</th>
              <th className="px-8 py-5 text-right text-[10px] font-bold text-premium-muted uppercase tracking-widest">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-premium-border">
            {courses.map(course => (
              <tr key={course.id} className="hover:bg-white/5 transition-colors">
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 rounded overflow-hidden shadow-sm border border-premium-border">
                      <img className="h-full w-full object-cover" src={course.thumbnail} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-bold text-white">{course.title}</div>
                      <div className="text-xs text-premium-muted">{course.category}</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <span className="text-[10px] font-bold text-premium-green bg-premium-green/10 px-2 py-1 rounded border border-premium-green/20">
                    Drip Content
                  </span>
                </td>
                <td className="px-8 py-6 whitespace-nowrap text-sm text-premium-muted font-medium">
                  {course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} aulas
                </td>
                <td className="px-8 py-6 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => deleteCourse(course.id)} className="text-premium-muted hover:text-premium-red p-2 hover:bg-premium-red/10 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
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

// --- 4. Player Component (Sidebar + Content Logic) ---
const Player: React.FC<{
  course: Course;
  enrollment?: Enrollment;
  onCompleteLesson: (lessonId: string) => void;
  user: User | null;
}> = ({ course, enrollment, onCompleteLesson, user }) => {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true); // Desktop open by default
  
  // Widget States
  const [missionDone, setMissionDone] = useState(false);
  const [unlockedSticker, setUnlockedSticker] = useState(false);
  const [nextLesson, setNextLesson] = useState<Lesson | null>(null);

  // Reset states on lesson change
  useEffect(() => {
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
    }
  };

  if (!enrollment) return <Navigate to={`/course/${course.id}`} />;

  return (
    <div className="flex h-[calc(100vh-80px)] bg-premium-bg overflow-hidden">
      {/* Player Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} bg-premium-card flex-shrink-0 transition-all duration-300 flex flex-col border-r border-premium-border relative z-20 overflow-hidden`}>
        <div className="p-4 border-b border-premium-border flex justify-between items-center bg-premium-card">
            <span className="text-xs font-bold text-premium-muted uppercase tracking-widest">Conteúdo do Curso</span>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-premium-muted"><X className="w-4 h-4"/></button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
           {course.modules.map((mod, mIdx) => (
             <div key={mod.id} className="mb-6">
                <h3 className="text-[10px] font-bold text-premium-muted uppercase tracking-widest mb-3 px-2">
                    Módulo {mIdx + 1}: {mod.title}
                </h3>
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
                       className={`w-full flex items-center p-3 rounded-lg text-left text-sm transition-all duration-200 group ${
                         active 
                            ? 'bg-premium-red text-white shadow-lg shadow-red-900/20' 
                            : 'hover:bg-white/5 text-premium-muted hover:text-white'
                       } ${locked ? 'opacity-50 cursor-not-allowed' : ''}`}
                     >
                       <div className="mr-3 flex-shrink-0">
                         {completed ? (
                           <CheckCircle className={`w-4 h-4 ${active ? 'text-white' : 'text-premium-green'}`} />
                         ) : locked ? (
                           <Lock className="w-4 h-4" />
                         ) : (
                           <PlayCircle className={`w-4 h-4 ${active ? 'text-white' : 'text-premium-muted'}`} />
                         )}
                       </div>
                       <span className="line-clamp-2 font-medium text-xs leading-relaxed">{les.title}</span>
                     </button>
                   );
                 })}
               </div>
             </div>
           ))}
        </div>
      </div>

      {/* Player Content */}
      <div className="flex-1 overflow-y-auto relative custom-scrollbar bg-premium-bg p-6 lg:p-10">
         <button 
           onClick={() => setSidebarOpen(!sidebarOpen)}
           className={`absolute top-4 left-4 z-20 bg-premium-card p-2 rounded-full shadow-md text-white hover:text-premium-red border border-white/10 ${sidebarOpen ? 'hidden' : 'block'}`}
         >
           <Menu className="w-5 h-5" />
         </button>

         {activeLesson ? (
           <div className="max-w-5xl mx-auto space-y-8">
             {/* Video */}
             <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-premium-border relative group">
                {activeLesson.videoUrl ? (
                    <iframe 
                    src={activeLesson.videoUrl} 
                    title={activeLesson.title}
                    className="w-full h-full"
                    allowFullScreen
                    ></iframe>
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-premium-muted">
                        <p>Vídeo indisponível</p>
                    </div>
                )}
             </div>

             {/* Title & Actions */}
             <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-display font-bold text-white mb-2 leading-tight">
                        {activeLesson.title}
                    </h1>
                    <p className="text-premium-muted text-sm flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-premium-red" /> {activeLesson.duration} de aula
                    </p>
                </div>
                
                <div className="flex items-center gap-3">
                    {!isLessonCompleted(activeLesson.id) ? (
                        <button 
                        onClick={handleComplete}
                        className="bg-premium-green hover:bg-premium-green-dark text-white px-8 py-3 rounded-full font-bold shadow-[0_0_20px_rgba(37,211,102,0.3)] flex items-center transition-all transform hover:-translate-y-1 text-xs uppercase tracking-widest"
                        >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Concluir Aula
                        </button>
                    ) : (
                        <button disabled className="bg-premium-green/20 text-premium-green border border-premium-green/30 px-8 py-3 rounded-full font-bold flex items-center cursor-default text-xs uppercase tracking-widest">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Aula Concluída
                        </button>
                    )}
                    
                    {nextLesson && (
                        <button 
                            onClick={() => navigate(`/learn/${course.id}/${nextLesson.id}`)}
                            className="bg-premium-card border border-premium-border text-white hover:bg-white/5 px-6 py-3 rounded-full font-bold flex items-center transition-all text-xs uppercase tracking-widest"
                        >
                            Próxima <ArrowRight className="w-4 h-4 ml-2" />
                        </button>
                    )}
                </div>
             </div>

             {/* Content Grid */}
             <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-premium-card p-8 rounded-xl shadow-lg border border-premium-border">
                        <div className="prose prose-invert prose-sm max-w-none text-gray-400">
                            <ReactMarkdown>{activeLesson.content}</ReactMarkdown>
                        </div>
                    </div>

                    {/* Mission */}
                    {activeLesson.richContent?.mission && (
                        <div className="bg-gradient-to-br from-premium-card to-black border border-premium-border border-l-4 border-l-premium-red rounded-xl p-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-premium-red/20 p-3 rounded-lg text-premium-red">
                                    <Target className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-lg mb-2">{activeLesson.richContent.mission.title}</h4>
                                    <p className="text-sm text-premium-muted mb-4">{activeLesson.richContent.mission.description}</p>
                                    <button 
                                        onClick={() => setMissionDone(true)}
                                        disabled={missionDone}
                                        className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors ${missionDone ? 'bg-premium-green text-white shadow-lg shadow-green-900/20' : 'bg-white text-black hover:bg-gray-200'}`}
                                    >
                                        {missionDone ? "Missão Cumprida ✓" : activeLesson.richContent.mission.actionLabel}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="lg:col-span-1 space-y-6">
                    {/* Materials */}
                    <div className="bg-premium-card p-6 rounded-xl shadow-lg border border-premium-border">
                        <h3 className="text-xs font-bold text-premium-muted mb-4 uppercase tracking-widest">Materiais de Apoio</h3>
                        <div className="space-y-3">
                            {activeLesson.richContent?.materials ? (
                                activeLesson.richContent.materials.map((mat, idx) => (
                                    <a key={idx} href={mat.url} className="flex items-center p-3 rounded-lg bg-premium-bg border border-white/5 hover:border-premium-red/50 hover:text-premium-red transition-all group cursor-pointer">
                                        <FileText className="w-4 h-4 text-premium-muted group-hover:text-premium-red mr-3" />
                                        <span className="text-xs font-bold text-gray-300 group-hover:text-white">{mat.title}</span>
                                        <Download className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-premium-red" />
                                    </a>
                                ))
                            ) : (
                                <p className="text-xs text-premium-muted italic">Nenhum material extra.</p>
                            )}
                        </div>
                    </div>

                    {/* Sticker Unlock */}
                    {(unlockedSticker || isLessonCompleted(activeLesson.id)) && activeLesson.richContent?.sticker && (
                        <div className="bg-gradient-to-b from-premium-gold/20 to-premium-card rounded-xl p-6 text-center border border-premium-gold/30 animate-fade-in">
                            <div className="mb-4 flex justify-center">
                                <div className="bg-premium-gold/20 p-3 rounded-full text-premium-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                                    <Sparkles className="w-6 h-6" />
                                </div>
                            </div>
                            <h3 className="font-bold text-white text-lg mb-1">Conquista Desbloqueada!</h3>
                            <p className="text-xs text-premium-gold mb-4 uppercase tracking-wider">Símbolo de Maestria</p>
                            <img src={activeLesson.richContent.sticker.url} alt="Sticker" className="w-24 h-24 object-contain mx-auto drop-shadow-2xl mb-4 animate-bounce" />
                        </div>
                    )}
                </div>
             </div>
           </div>
         ) : (
           <div className="flex flex-col items-center justify-center h-full text-center">
             <div className="bg-premium-card p-6 rounded-full mb-6 border border-premium-border shadow-2xl">
                <PlayCircle className="w-12 h-12 text-premium-muted" />
             </div>
             <h3 className="text-xl font-bold text-white mb-2">Sua jornada continua</h3>
             <p className="text-premium-muted max-w-md text-sm">Selecione um protocolo no menu lateral para iniciar a decodificação.</p>
           </div>
         )}
      </div>
    </div>
  );
};

// --- Main Layout & Routing ---
const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [enrollments, setEnrollments] = useState<Enrollment[]>(MOCK_ENROLLMENTS);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile Sidebar State
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
      <div className="flex h-screen bg-premium-bg text-premium-text overflow-hidden selection:bg-premium-red selection:text-white">
        {/* Persistent Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
          user={user} 
        />
        
        {/* Overlay for Mobile Sidebar */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/80 z-30 lg:hidden backdrop-blur-sm transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 h-full">
          <Header 
            user={user} 
            onLogout={handleLogout} 
            onLoginClick={() => setAuthModalOpen(true)} 
            toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          />
          
          <main className="flex-1 overflow-y-auto scroll-smooth relative custom-scrollbar">
            <Routes>
              <Route path="/" element={<CatalogWrapper courses={courses} enrollments={enrollments} user={user} onCourseClick={handleCourseClick} />} />
              <Route path="/course/:id" element={<CourseDetailsWrapper courses={courses} enrollments={enrollments} user={user} onEnroll={enrollInCourse} />} />
              {/* Player handles its own internal layout if needed, but here we keep it within the main content area */}
              <Route path="/learn/:courseId/:lessonId" element={<PlayerWrapper courses={courses} enrollments={enrollments} user={user} onCompleteLesson={completeLesson} />} />
              <Route path="/learn/:courseId" element={<PlayerWrapper courses={courses} enrollments={enrollments} user={user} onCompleteLesson={completeLesson} />} />
              <Route path="/certificate/:courseId" element={<CertificateWrapper courses={courses} enrollments={enrollments} user={user} />} />
              <Route path="/admin" element={user?.role === UserRole.ADMIN ? (<AdminDashboard courses={courses} addCourse={addNewCourse} deleteCourse={deleteCourse} />) : (<Navigate to="/" replace />)} />
              <Route path="/my-learning" element={<MyLearningWrapper courses={courses} enrollments={enrollments} user={user} onCourseClick={handleCourseClick} />} />
            </Routes>
            
            <footer className="py-8 text-center text-premium-muted text-[10px] uppercase tracking-widest border-t border-premium-border mt-12">
                <p>© 2024 Priscilla Moreira. Todos os direitos reservados.</p>
            </footer>
          </main>
        </div>
      </div>
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} onLogin={handleLogin} />
    </HashRouter>
  );
};

// Wrappers to inject navigation and params props
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
  
  // Use the Player component even for preview/details to keep consistent styling, or create a specific Details view.
  // Reusing Player logic which handles unenrolled state elegantly.
  return <Player course={course} enrollment={enrollment} onCompleteLesson={() => {}} user={user} />;
};

const PlayerWrapper = ({ courses, enrollments, user, onCompleteLesson }: any) => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const course = courses.find((c: Course) => c.id === courseId);
  if (!course) return <div>Curso não encontrado</div>;
  
  const userId = user ? user.id : 'guest';
  const enrollment = enrollments.find((e: Enrollment) => e.courseId === courseId && e.userId === userId);
  
  return <Player course={course} enrollment={enrollment} onCompleteLesson={(lid) => onCompleteLesson(course.id, lid)} user={user} />;
};

const CertificateWrapper = ({ courses, enrollments, user }: any) => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = courses.find((c: Course) => c.id === courseId);
  const userId = user ? user.id : 'guest';
  const enrollment = enrollments.find((e: Enrollment) => e.courseId === courseId && e.userId === userId);
  if (!course || !enrollment || !enrollment.completedAt) {
    return (
        <div className="h-full flex flex-col items-center justify-center text-premium-muted p-10">
            <Lock className="w-12 h-12 mb-4" />
            <p className="text-lg font-bold">Certificado Indisponível</p>
            <p className="text-sm">Complete 100% do curso para desbloquear.</p>
            <button onClick={() => navigate('/')} className="mt-6 text-premium-red hover:underline">Voltar ao Início</button>
        </div>
    );
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
        <div className="max-w-7xl mx-auto px-6 py-12 animate-fade-in">
            <h1 className="text-3xl font-display font-bold text-white mb-8">Meus Treinamentos</h1>
            {myCourses.length === 0 ? (
                <div className="text-center py-20 bg-premium-card rounded-xl border border-premium-border">
                    <BookOpen className="w-12 h-12 text-premium-muted mx-auto mb-4" />
                    <p className="text-premium-muted">Você ainda não iniciou nenhum protocolo.</p>
                    <button onClick={() => navigate('/')} className="mt-4 text-premium-green font-bold uppercase text-xs tracking-widest">Explorar Catálogo</button>
                </div>
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