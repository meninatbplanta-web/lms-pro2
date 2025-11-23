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
  Menu, X, Loader2, Plus, Wand2, Trash2, Video, FileText 
} from 'lucide-react';

// --- Sub-components defined here for cleaner file structure in this specific output format ---

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
        <div className="bg-white p-6 rounded-xl shadow-md border border-indigo-100 mb-8 animate-fade-in-down">
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

  // Determine active lesson on load or change
  useEffect(() => {
    if (!lessonId) {
      // Default to first lesson
      if (course.modules.length > 0 && course.modules[0].lessons.length > 0) {
        setActiveLesson(course.modules[0].lessons[0]);
      }
    } else {
      // Find specific lesson
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
    if (!enrollment) return true; // Not enrolled
    if (!lesson.releaseDate) return false; // No date restriction
    return new Date(lesson.releaseDate) > new Date(); // Future date
  };

  const isLessonCompleted = (id: string) => enrollment?.completedLessonIds.includes(id);

  if (!enrollment) {
    // Landing page for course (Not enrolled view)
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

  // Enrolled View (Player)
  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} bg-white border-r border-gray-200 flex-shrink-0 transition-all duration-300 overflow-y-auto relative`}>
        <div className="p-4 border-b bg-gray-50 sticky top-0 z-10 flex justify-between items-center">
          <h2 className="font-bold text-gray-800 truncate">Conteúdo</h2>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden"><X className="w-5 h-5" /></button>
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
                         active ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' : 'hover:bg-gray-50 text-gray-700'
                       } ${locked ? 'opacity-50 cursor-not-allowed' : ''}`}
                     >
                       <div className="mt-0.5 mr-3 flex-shrink-0">
                         {completed ? (
                           <CheckCircle className="w-4 h-4 text-green-500" />
                         ) : locked ? (
                           <Lock className="w-4 h-4 text-gray-400" />
                         ) : (
                           <Play className={`w-4 h-4 ${active ? 'text-indigo-600' : 'text-gray-400'}`} />
                         )}
                       </div>
                       <div>
                         <div className="font-medium">{les.title}</div>
                         <div className="text-xs text-gray-400 mt-1 flex items-center">
                           {les.duration}
                           {les.releaseDate && locked && (
                             <span className="ml-2 flex items-center text-orange-600">
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
      <div className="flex-1 overflow-y-auto relative">
         <button 
           onClick={() => setSidebarOpen(!sidebarOpen)}
           className={`absolute top-4 left-4 z-20 bg-white p-2 rounded-full shadow-md text-gray-600 hover:text-indigo-600 ${sidebarOpen ? 'hidden' : 'block'}`}
         >
           <Menu className="w-5 h-5" />
         </button>

         {activeLesson ? (
           <div className="max-w-4xl mx-auto p-6 lg:p-10">
             <div className="mb-6">
               <h1 className="text-3xl font-bold text-gray-900 mb-2">{activeLesson.title}</h1>
               {enrollment.completedAt && (
                 <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg inline-flex items-center text-sm font-bold mb-4">
                   <CheckCircle className="w-4 h-4 mr-2" /> Curso Concluído!
                   <button 
                     onClick={() => navigate(`/certificate/${course.id}`)}
                     className="ml-4 underline hover:text-green-900"
                   >
                     Ver Certificado
                   </button>
                 </div>
               )}
             </div>

             {activeLesson.videoUrl && (
               <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg mb-8">
                 <iframe 
                   src={activeLesson.videoUrl} 
                   title={activeLesson.title}
                   className="w-full h-full"
                   allowFullScreen
                 ></iframe>
               </div>
             )}

             <div className="prose prose-indigo max-w-none bg-white p-8 rounded-xl shadow-sm border border-gray-100">
               <ReactMarkdown>{activeLesson.content}</ReactMarkdown>
             </div>

             <div className="mt-8 flex justify-end">
               {!isLessonCompleted(activeLesson.id) ? (
                 <button 
                   onClick={() => onCompleteLesson(activeLesson.id)}
                   className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700 flex items-center shadow-lg transition-transform active:scale-95"
                 >
                   <CheckCircle className="w-5 h-5 mr-2" />
                   Marcar como Concluída
                 </button>
               ) : (
                 <button disabled className="bg-gray-200 text-gray-500 px-6 py-3 rounded-lg font-bold flex items-center cursor-default">
                   <CheckCircle className="w-5 h-5 mr-2" />
                   Concluída
                 </button>
               )}
             </div>
           </div>
         ) : (
           <div className="flex items-center justify-center h-full text-gray-400">
             Selecione uma aula para começar
           </div>
         )}
      </div>
    </div>
  );
};

// --- Main App Component ---

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [enrollments, setEnrollments] = useState<Enrollment[]>(MOCK_ENROLLMENTS);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [pendingEnrollCourse, setPendingEnrollCourse] = useState<Course | null>(null);

  // Mock Data Persist Logic (User Role changes usually need strict checking, simplifying here)
  const handleLogin = (u: User) => {
    setUser(u);
    // If user was trying to enroll in a paid course
    if (pendingEnrollCourse) {
      // Auto enroll flow logic could go here, for now just clear it
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
      // Already enrolled, go to player (find first unfinished or first lesson)
      navigate(`/learn/${course.id}/${course.modules[0].lessons[0].id}`);
    } else {
      // Go to details/enrollment page
      navigate(`/course/${course.id}`);
    }
  };

  const enrollInCourse = (course: Course, navigate: (path: string) => void) => {
    if (course.price > 0 && !user) {
      setPendingEnrollCourse(course);
      setAuthModalOpen(true);
      return;
    }

    // Create enrollment
    const newEnrollment: Enrollment = {
      userId: user ? user.id : 'guest', // Guest ID for free courses without login
      courseId: course.id,
      completedLessonIds: [],
      enrolledAt: new Date().toISOString()
    };

    // Check if guest mode is allowed (Free courses only)
    if (!user && course.price === 0) {
       // Temporary session enrollment for guest
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
        
        // Check if course is finished
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
          <Route path="/" element={
             <CatalogWrapper 
               courses={courses} 
               enrollments={enrollments} 
               user={user} 
               onCourseClick={handleCourseClick} 
             />
          } />
          
          <Route path="/course/:id" element={
            <CourseDetailsWrapper 
              courses={courses} 
              enrollments={enrollments} 
              user={user} 
              onEnroll={enrollInCourse} 
            />
          } />

          <Route path="/learn/:courseId/:lessonId" element={
             <PlayerWrapper 
               courses={courses}
               enrollments={enrollments}
               user={user}
               onEnroll={enrollInCourse}
               onCompleteLesson={completeLesson}
             />
          } />

          <Route path="/certificate/:courseId" element={
            <CertificateWrapper 
               courses={courses}
               enrollments={enrollments}
               user={user}
            />
          } />

          <Route path="/admin" element={
            user?.role === UserRole.ADMIN ? (
              <AdminDashboard courses={courses} addCourse={addNewCourse} deleteCourse={deleteCourse} />
            ) : (
              <Navigate to="/" replace />
            )
          } />

          <Route path="/my-learning" element={
             <MyLearningWrapper 
               courses={courses}
               enrollments={enrollments}
               user={user}
               onCourseClick={handleCourseClick}
             />
          } />
        </Routes>
      </main>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        onLogin={handleLogin} 
      />
    </HashRouter>
  );
};

// --- Wrapper Components to handle Hooks/Params cleanly ---

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
  
  // Support for guest enrollment in free courses
  const userId = user ? user.id : 'guest';
  const enrollment = enrollments.find((e: Enrollment) => e.courseId === courseId && e.userId === userId);

  if (!course) return <div>Curso não encontrado</div>;

  return <CoursePlayer 
    course={course} 
    enrollment={enrollment} 
    onEnroll={() => onEnroll(course, navigate)} 
    onCompleteLesson={(lid) => onCompleteLesson(course.id, lid)} 
  />;
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
  
  // If guest, fake a user name
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