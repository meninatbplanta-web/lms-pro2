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
  GraduationCap, PlayCircle
} from 'lucide-react';

// 1. Home Page
const Catalog: React.FC<{ 
  courses: Course[], 
  enrollments: Enrollment[], 
  user: User | null,
  onCourseClick: (c: Course) => void 
}> = ({ courses, enrollments, user, onCourseClick }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-brand-dark text-white pt-20 pb-32 overflow-hidden border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <span className="badge-red mb-6">
                Plataforma de Ensino
              </span>
              <h1 className="text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6">
                Aprenda com <br/>
                <span className="text-brand-red">
                  Excelência
                </span>
              </h1>
              <p className="text-lg text-gray-400 mb-8 max-w-lg leading-relaxed">
                Desenvolva suas habilidades com cursos práticos, projetos reais e uma metodologia focada no seu crescimento profissional.
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => document.getElementById('courses')?.scrollIntoView({behavior: 'smooth'})} className="btn-cta hover:text-white">
                  Começar Agora
                </button>
                <button className="px-8 py-4 rounded-full font-bold text-white border border-gray-700 hover:bg-white/10 transition-all uppercase tracking-wide text-sm">
                  Saiba Mais
                </button>
              </div>
            </div>
            
            <div className="hidden lg:grid grid-cols-2 gap-6">
                <div className="space-y-6 mt-12">
                    <div className="bg-[#1E1E1E] p-6 rounded-xl border-l-4 border-brand-red hover:-translate-y-2 transition-transform">
                        <div className="bg-red-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                            <Users className="text-brand-red w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg mb-1 text-white">Comunidade</h3>
                        <p className="text-gray-400 text-sm">Aprenda em grupo</p>
                    </div>
                    <div className="bg-[#1E1E1E] p-6 rounded-xl border-l-4 border-brand-red hover:-translate-y-2 transition-transform">
                        <div className="bg-red-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                            <Award className="text-brand-red w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg mb-1 text-white">Certificados</h3>
                        <p className="text-gray-400 text-sm">Reconhecimento oficial</p>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="bg-[#1E1E1E] p-6 rounded-xl border-l-4 border-brand-red hover:-translate-y-2 transition-transform">
                        <div className="bg-red-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                            <Sparkles className="text-brand-red w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg mb-1 text-white">Mentoria IA</h3>
                        <p className="text-gray-400 text-sm">Suporte inteligente</p>
                    </div>
                    <div className="bg-[#1E1E1E] p-6 rounded-xl border-l-4 border-brand-red hover:-translate-y-2 transition-transform">
                        <div className="bg-red-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                            <Book className="text-brand-red w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg mb-1 text-white">Didática</h3>
                        <p className="text-gray-400 text-sm">Fácil compreensão</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div id="courses" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="section-title">Catálogo de Cursos</h2>
          <div className="w-24 h-1.5 bg-brand-red rounded-full mx-auto mb-4"></div>
          <p className="section-subtitle">Escolha o curso ideal para o seu momento</p>
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

      {/* Footer */}
      <footer className="bg-brand-darker text-white py-12 border-t border-gray-900">
          <div className="max-w-7xl mx-auto px-4 text-center">
              <div className="flex justify-center mb-6">
                  <GraduationCap className="w-10 h-10 text-brand-red" />
              </div>
              <p className="text-gray-500 mb-4 text-sm">© 2024 Priscilla Moreira. Todos os direitos reservados.</p>
              <div className="flex justify-center space-x-6 text-xs font-bold uppercase tracking-wider text-gray-600">
                  <a href="#" className="hover:text-white transition-colors">Termos</a>
                  <a href="#" className="hover:text-white transition-colors">Privacidade</a>
                  <a href="#" className="hover:text-white transition-colors">Suporte</a>
              </div>
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
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-10">
        <div>
            <h1 className="text-3xl font-display font-bold text-gray-900">Painel Administrativo</h1>
            <p className="text-gray-500 mt-1">Gerencie seus cursos e conteúdos</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-brand-red text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-red-700 flex items-center transition-all hover:-translate-y-1 uppercase text-sm tracking-wide"
        >
          <Plus className="w-5 h-5 mr-2" /> Novo Curso
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200 mb-10">
          <h2 className="text-xl font-bold mb-6 flex items-center text-gray-800">
            <div className="bg-red-50 p-2 rounded-lg mr-3">
                <Wand2 className="w-5 h-5 text-brand-red" />
            </div>
            Gerador de Curso com IA
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Tópico do Curso</label>
                <input 
                type="text" 
                placeholder="ex: Marketing Digital, Python Avançado" 
                className="border border-gray-300 p-4 rounded-xl w-full focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none bg-gray-50 text-gray-900"
                value={topic}
                onChange={e => setTopic(e.target.value)}
                />
            </div>
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Público Alvo (Opcional)</label>
                <input 
                type="text" 
                placeholder="ex: Iniciantes, Profissionais" 
                className="border border-gray-300 p-4 rounded-xl w-full focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none bg-gray-50 text-gray-900"
                value={audience}
                onChange={e => setAudience(e.target.value)}
                />
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <button 
              onClick={handleGenerate} 
              disabled={isGenerating || !topic}
              className={`px-8 py-3 rounded-full text-white font-bold flex items-center shadow-md transition-all uppercase text-sm tracking-wide ${isGenerating ? 'bg-gray-400' : 'bg-brand-dark hover:bg-black hover:-translate-y-1'}`}
            >
              {isGenerating ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Gerando...</> : 'Gerar Estrutura'}
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Curso</th>
              <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Preço</th>
              <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Aulas</th>
              <th className="px-8 py-5 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-50">
            {courses.map(course => (
              <tr key={course.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-12 w-12 flex-shrink-0 rounded-xl overflow-hidden shadow-sm border border-gray-100">
                      <img className="h-full w-full object-cover" src={course.thumbnail} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-bold text-gray-900">{course.title}</div>
                      <div className="text-xs text-gray-500">{course.category}</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${course.price === 0 ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-gray-100 text-gray-800 border border-gray-200'}`}>
                    {course.price === 0 ? 'Grátis' : `R$ ${course.price}`}
                  </span>
                </td>
                <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-500 font-medium">
                  {course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} aulas
                </td>
                <td className="px-8 py-6 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => deleteCourse(course.id)} className="text-gray-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors">
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
  const [activeTab, setActiveTab] = useState('curso');
  const [missionDone, setMissionDone] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number | null>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [unlockedSticker, setUnlockedSticker] = useState(false);
  const [reflection, setReflection] = useState("");
  const [miniGameRevealed, setMiniGameRevealed] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [nextLesson, setNextLesson] = useState<Lesson | null>(null);

  // Reset widget states when lesson changes
  useEffect(() => {
    setActiveTab('curso');
    setMissionDone(false);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setUnlockedSticker(false);
    setReflection("");
    setMiniGameRevealed(null);
  }, [activeLesson?.id]);

  // Determine active lesson and next lesson
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
            foundActive = false; // Found the immediate next one
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

  // Countdown Logic
  useEffect(() => {
    if (!nextLesson || !nextLesson.releaseDate) {
      setTimeLeft("");
      return;
    }

    const targetDate = new Date(nextLesson.releaseDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft("Disponível Agora");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [nextLesson]);

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

  const menuItems = [
    { id: 'curso', label: 'Curso', icon: BookOpen },
    { id: 'audio', label: 'Resumo Áudio', icon: Headphones },
    { id: 'video', label: 'Resumo Vídeo', icon: Video },
    { id: 'mindmap', label: 'Mapa Mental', icon: Network },
    { id: 'materials', label: 'Materiais', icon: FileText },
    { id: 'flashcards', label: 'Cartões', icon: Layers },
    { id: 'quiz', label: 'Teste', icon: HelpCircle },
    { id: 'infographic', label: 'Infográfico', icon: BarChart3 },
    { id: 'slides', label: 'Slides', icon: MonitorPlay },
  ];

  if (!enrollment) {
    // Landing page with new design
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-12">
            <button onClick={() => navigate('/')} className="mb-8 text-gray-500 hover:text-brand-red flex items-center font-medium transition-colors">
            <ChevronLeft className="w-5 h-5 mr-1" /> Voltar para Catálogo
            </button>
            <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200 mb-8 border-l-4 border-brand-red">
                    <span className="badge-red mb-4">{course.category}</span>
                    <h1 className="text-4xl font-display font-bold text-gray-900 mb-4 leading-tight">{course.title}</h1>
                    <p className="text-lg text-gray-600 leading-relaxed">{course.description}</p>
                </div>
                
                <h2 className="text-2xl font-display font-bold mb-6 text-gray-900">Conteúdo do Curso</h2>
                <div className="space-y-4">
                {course.modules.map((mod, idx) => (
                    <div key={mod.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                        <div className="w-8 h-8 rounded-lg bg-brand-red text-white flex items-center justify-center font-display font-bold text-sm mr-3">
                            {idx + 1}
                        </div>
                        <h3 className="font-bold text-lg text-gray-800">{mod.title}</h3>
                    </div>
                    <div className="space-y-3 pl-11">
                        {mod.lessons.map(les => (
                        <div key={les.id} className="flex items-center text-gray-600 text-sm py-2 border-b border-gray-50 last:border-0">
                            <div className="bg-gray-100 p-1 rounded-full mr-3">
                                <Play className="w-3 h-3 text-gray-500" />
                            </div>
                            <span className="font-medium text-gray-800">{les.title}</span>
                            <span className="ml-auto text-xs bg-gray-100 px-2 py-1 rounded text-gray-500 border border-gray-200 font-semibold">
                            {les.duration}
                            </span>
                        </div>
                        ))}
                    </div>
                    </div>
                ))}
                </div>
            </div>
            <div className="lg:col-span-1">
                <div className="bg-white shadow-xl rounded-3xl p-8 sticky top-24 border border-gray-200">
                <div className="aspect-video rounded-2xl overflow-hidden mb-6 shadow-inner bg-gray-100">
                    <img src={course.thumbnail} alt="Cover" className="w-full h-full object-cover" />
                </div>
                <div className="text-4xl font-display font-bold text-gray-900 mb-6 text-center">
                    {course.price === 0 ? <span className="text-brand-green">Gratuito</span> : `R$ ${course.price.toFixed(2)}`}
                </div>
                <button 
                    onClick={onEnroll}
                    className="btn-cta mb-6 w-full hover:text-white"
                >
                    Matricular-se Agora
                </button>
                <div className="space-y-3 text-sm text-gray-500">
                    <div className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-brand-green" /> Acesso vitalício</div>
                    <div className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-brand-green" /> Certificado de conclusão</div>
                    <div className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-brand-green" /> Suporte exclusivo</div>
                </div>
                </div>
            </div>
            </div>
        </div>
      </div>
    );
  }

  // Player
  return (
    <div className="flex h-[calc(100vh-80px)] bg-[#f9fafb] overflow-hidden">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} bg-white border-r border-gray-200 flex-shrink-0 transition-all duration-300 overflow-y-auto relative shadow-sm z-20`}>
        <div className="p-6 border-b border-gray-100 sticky top-0 z-10 bg-white flex justify-between items-center">
          <h2 className="font-display font-bold text-gray-900 text-lg">Conteúdo</h2>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-brand-red"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-4 space-y-6">
           {course.modules.map((mod, mIdx) => (
             <div key={mod.id}>
                <div className="flex items-center mb-3 px-2">
                    <span className="bg-red-50 text-brand-red text-xs font-bold w-6 h-6 rounded-lg flex items-center justify-center mr-2 font-display">
                        {mIdx + 1}
                    </span>
                    <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wider">{mod.title}</h3>
                </div>
               
               <div className="space-y-2">
                 {mod.lessons.map((les) => {
                   const active = activeLesson?.id === les.id;
                   const locked = isLessonLocked(les);
                   const completed = isLessonCompleted(les.id);
                   
                   return (
                     <button
                       key={les.id}
                       disabled={locked}
                       onClick={() => navigate(`/learn/${course.id}/${les.id}`)}
                       className={`w-full flex items-start p-3 rounded-xl text-left text-sm transition-all duration-200 group border border-transparent ${
                         active 
                            ? 'bg-red-50 text-brand-red shadow-sm border-l-4 border-l-brand-red font-bold' 
                            : 'hover:bg-gray-50 text-gray-700 hover:border-l-4 hover:border-l-gray-300'
                       } ${locked ? 'opacity-50 cursor-not-allowed' : ''}`}
                     >
                       <div className="mt-0.5 mr-3 flex-shrink-0">
                         {completed ? (
                           <CheckCircle className="w-4 h-4 text-brand-green fill-green-50" />
                         ) : locked ? (
                           <Lock className="w-4 h-4 text-gray-400" />
                         ) : (
                           <Play className={`w-4 h-4 ${active ? 'text-brand-red' : 'text-gray-400 group-hover:text-brand-red'}`} />
                         )}
                       </div>
                       <div className="flex-1">
                         <div className="line-clamp-2">{les.title}</div>
                         <div className="text-xs text-gray-400 mt-1 flex items-center font-normal">
                           {les.duration}
                           {les.releaseDate && locked && (
                             <span className="ml-2 flex items-center text-brand-red bg-red-50 px-1.5 py-0.5 rounded font-bold">
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
      <div className="flex-1 overflow-y-auto relative scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
         <button 
           onClick={() => setSidebarOpen(!sidebarOpen)}
           className={`absolute top-6 left-6 z-20 bg-white p-2.5 rounded-full shadow-lg text-gray-600 hover:text-brand-red transition-colors border border-gray-100 ${sidebarOpen ? 'hidden' : 'block'}`}
         >
           <Menu className="w-5 h-5" />
         </button>

         {activeLesson ? (
           <div className="max-w-5xl mx-auto p-6 lg:p-10 space-y-8">
             {/* Lesson Header */}
             <div className="mb-8">
               <div className="flex items-center space-x-2 mb-4">
                    <span className="bg-red-50 text-brand-red text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wide">Aula</span>
                    <span className="text-gray-400 text-sm">•</span>
                    <span className="text-gray-500 text-sm font-medium">Módulo {course.modules.find(m => m.lessons.some(l => l.id === activeLesson.id))?.title}</span>
               </div>
               <h1 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4 leading-tight">{activeLesson.title}</h1>
               
               <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
                  <div className="flex items-center space-x-4 text-sm">
                      {enrollment.completedAt && (
                        <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full flex items-center font-bold border border-green-100">
                          <Trophy className="w-4 h-4 mr-2" /> Aula Concluída
                        </div>
                      )}
                      <div className="flex items-center text-gray-500 font-medium">
                          <Clock className="w-4 h-4 mr-1.5" />
                          <span>{activeLesson.duration} de conteúdo</span>
                      </div>
                  </div>
                  {/* Progress Bar for Lesson */}
                  <div className="hidden sm:flex items-center space-x-3">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Progresso</span>
                      <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-red w-1/4 rounded-full"></div>
                      </div>
                  </div>
               </div>
             </div>

             {/* Video Player */}
             {activeLesson.videoUrl && (
               <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl shadow-gray-300 border-4 border-white relative group">
                 <iframe 
                   src={activeLesson.videoUrl} 
                   title={activeLesson.title}
                   className="w-full h-full"
                   allowFullScreen
                 ></iframe>
               </div>
             )}

             {/* Resources Menu (Cards) */}
             <div className="flex overflow-x-auto gap-4 py-6 pb-8 px-2 scrollbar-hide snap-x">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`snap-center flex-shrink-0 w-36 h-36 rounded-3xl p-4 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-3 group relative border-2 ${
                            activeTab === item.id 
                            ? `bg-brand-red border-brand-red shadow-lg shadow-red-200 scale-105 z-10` 
                            : `bg-white border-gray-100 hover:border-red-200 hover:shadow-md`
                        }`}
                    >
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-300 ${
                            activeTab === item.id 
                            ? `bg-white/20 text-white` 
                            : 'bg-gray-50 text-gray-600 group-hover:text-brand-red group-hover:bg-red-50'
                        }`}>
                           <item.icon className="w-6 h-6" />
                        </div>
                        <span className={`font-display font-bold text-xs text-center leading-tight uppercase tracking-wide ${
                            activeTab === item.id ? 'text-white' : 'text-gray-600 group-hover:text-brand-red'
                        }`}>
                            {item.label}
                        </span>
                    </button>
                ))}
             </div>

             {/* Content Area */}
             <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 min-h-[400px] animate-in fade-in slide-in-from-bottom-4 duration-500">
                 {activeTab === 'curso' ? (
                     <div className="space-y-10">
                         {/* Mission Card */}
                         {activeLesson.richContent?.mission && (
                            <div className="card-accent bg-gray-50">
                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="bg-red-100 w-12 h-12 rounded-2xl flex items-center justify-center">
                                            <Target className="w-6 h-6 text-brand-red" />
                                        </div>
                                        <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-brand-red border border-red-100 uppercase tracking-wide shadow-sm">
                                            PARA HOJE
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">
                                        {activeLesson.richContent.mission.title}
                                    </h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed">{activeLesson.richContent.mission.description}</p>
                                    <button 
                                        onClick={() => setMissionDone(true)}
                                        disabled={missionDone}
                                        className={`px-6 py-3 rounded-full font-bold text-sm transition-all shadow-sm uppercase tracking-wide ${missionDone ? 'bg-green-100 text-green-700 cursor-default' : 'bg-brand-red text-white hover:bg-red-700 hover:shadow-red-500/30 hover:-translate-y-0.5'}`}
                                    >
                                        {missionDone ? "Missão Registrada ✓" : activeLesson.richContent.mission.actionLabel}
                                    </button>
                                </div>
                            </div>
                         )}

                         {/* Sticker Unlock */}
                         {(unlockedSticker || isLessonCompleted(activeLesson.id)) && activeLesson.richContent?.sticker && (
                             <div className="bg-brand-red rounded-3xl p-1 shadow-xl shadow-red-200">
                                 <div className="bg-white/10 backdrop-blur-md rounded-[20px] p-6 flex items-center justify-between text-white">
                                     <div>
                                         <div className="flex items-center space-x-2 mb-1">
                                            <Sparkles className="w-4 h-4 text-yellow-300" />
                                            <h3 className="font-bold text-red-100 text-sm uppercase tracking-wider">Sticker Desbloqueado</h3>
                                         </div>
                                         <p className="font-display font-bold text-2xl mb-4">“{activeLesson.richContent.sticker.title}”</p>
                                         <div className="flex space-x-3">
                                             <button className="bg-white text-brand-red px-4 py-2 rounded-full text-xs font-bold hover:bg-gray-100 transition-colors flex items-center">
                                                 <Download className="w-3 h-3 mr-2" /> Baixar
                                             </button>
                                             <button className="bg-black/20 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-black/30 transition-colors flex items-center">
                                                 <Share2 className="w-3 h-3 mr-2" /> Compartilhar
                                             </button>
                                         </div>
                                     </div>
                                     <img src={activeLesson.richContent.sticker.url} alt="Sticker" className="w-24 h-24 object-contain drop-shadow-2xl animate-bounce" />
                                 </div>
                             </div>
                         )}

                         {/* Description Text */}
                         <div className="prose prose-lg prose-headings:font-display prose-headings:font-bold prose-a:text-brand-red prose-strong:text-gray-900 text-gray-600 max-w-none">
                           <ReactMarkdown>{activeLesson.content}</ReactMarkdown>
                         </div>

                         {/* Reflection */}
                         <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200">
                             <h3 className="text-lg font-display font-bold text-gray-900 mb-3 flex items-center">
                                <div className="bg-white p-2 rounded-lg mr-3 shadow-sm border border-gray-100">
                                    <MessageSquare className="w-5 h-5 text-brand-red" /> 
                                </div>
                                 Reflexão Guiada
                             </h3>
                             <p className="text-gray-500 text-sm mb-4 ml-12">“O que o meu corpo está tentando me contar hoje?”</p>
                             <textarea 
                                value={reflection}
                                onChange={(e) => setReflection(e.target.value)}
                                placeholder="Escreva aqui sua reflexão..."
                                className="w-full bg-white p-4 rounded-2xl border border-gray-200 focus:border-brand-red focus:ring-4 focus:ring-red-50 outline-none h-32 text-gray-700 resize-none transition-all"
                             />
                         </div>

                         {/* Completion Action */}
                         <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-gray-100">
                           <div className="flex flex-col space-y-2 w-full md:w-auto">
                                {/* Previous/Next buttons could go here */}
                           </div>

                           {!isLessonCompleted(activeLesson.id) ? (
                             <button 
                               onClick={handleComplete}
                               className="btn-cta w-full md:w-auto hover:text-white shadow-lg shadow-green-200"
                             >
                               <CheckCircle className="w-5 h-5 mr-2" />
                               Concluir Aula
                             </button>
                           ) : (
                             <button disabled className="w-full md:w-auto bg-gray-100 text-gray-400 border border-gray-200 px-10 py-4 rounded-full font-bold flex items-center justify-center cursor-default uppercase tracking-wide text-sm">
                               <CheckCircle className="w-5 h-5 mr-2" />
                               Aula Concluída
                             </button>
                           )}
                         </div>
                     </div>
                 ) : (
                     <div className="flex flex-col items-center justify-center min-h-[400px] text-center py-20">
                         <div className="bg-gray-100 p-4 rounded-full mb-4">
                            <Lock className="w-8 h-8 text-gray-400" />
                         </div>
                         <h3 className="text-xl font-bold text-gray-900 mb-2">Conteúdo em Breve</h3>
                         <p className="text-gray-500 max-w-md mx-auto">Estamos preparando este material com muito carinho. Fique atento às novidades!</p>
                     </div>
                 )}
             </div>
           </div>
         ) : (
           <div className="flex items-center justify-center h-full text-gray-400 flex-col">
             <PlayCircle className="w-16 h-16 text-gray-200 mb-4" />
             <p className="font-medium">Selecione uma aula para começar</p>
           </div>
         )}
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
      <main className="min-h-[calc(100vh-80px)]">
        <Routes>
          <Route path="/" element={<CatalogWrapper courses={courses} enrollments={enrollments} user={user} onCourseClick={handleCourseClick} />} />
          <Route path="/course/:id" element={<CourseDetailsWrapper courses={courses} enrollments={enrollments} user={user} onEnroll={enrollInCourse} />} />
          <Route path="/learn/:courseId/:lessonId" element={<PlayerWrapper courses={courses} enrollments={enrollments} user={user} onEnroll={enrollInCourse} onCompleteLesson={completeLesson} />} />
          <Route path="/learn/:courseId" element={<PlayerWrapper courses={courses} enrollments={enrollments} user={user} onEnroll={enrollInCourse} onCompleteLesson={completeLesson} />} />
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
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const course = courses.find((c: Course) => c.id === courseId);
  if (!course) return <div>Curso não encontrado</div>;
  
  const userId = user ? user.id : 'guest';
  const enrollment = enrollments.find((e: Enrollment) => e.courseId === courseId && e.userId === userId);
  
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
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">Meus Cursos</h1>
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