
import {
  type User,
  type InsertUser,
  type Course,
  type InsertCourse,
  type Module,
  type InsertModule,
  type Lesson,
  type InsertLesson,
  type UserLessonProgress,
  type InsertUserLessonProgress,
  type Comment,
  type InsertComment,
  type Note,
  type InsertNote,
  type CourseWithModules,
  type ModuleWithLessons,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  deleteUser(id: string): Promise<void>;

  // Courses
  getAllCourses(): Promise<Course[]>;
  getCourseBySlug(slug: string): Promise<CourseWithModules | undefined>;
  getCourse(id: string): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  updateCourse(id: string, course: Partial<InsertCourse>): Promise<Course | undefined>;
  deleteCourse(id: string): Promise<void>;

  // Modules
  getAllModules(): Promise<Module[]>;
  getModulesByCourse(courseId: string): Promise<Module[]>;
  createModule(module: InsertModule): Promise<Module>;
  updateModule(id: string, module: Partial<InsertModule>): Promise<Module | undefined>;
  deleteModule(id: string): Promise<void>;

  // Lessons
  getAllLessons(): Promise<Lesson[]>;
  getLessonsByModule(moduleId: string): Promise<Lesson[]>;
  getLesson(id: string): Promise<Lesson | undefined>;
  createLesson(lesson: InsertLesson): Promise<Lesson>;
  updateLesson(id: string, lesson: Partial<InsertLesson>): Promise<Lesson | undefined>;
  deleteLesson(id: string): Promise<void>;

  // Progress
  getUserProgress(userId: string, lessonId: string): Promise<UserLessonProgress | undefined>;
  getAllUserProgress(userId: string): Promise<UserLessonProgress[]>;
  upsertProgress(progress: InsertUserLessonProgress): Promise<UserLessonProgress>;

  // Comments
  getCommentsByLesson(lessonId: string): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;

  // Notes
  getUserNote(userId: string, lessonId: string): Promise<Note | undefined>;
  upsertNote(note: InsertNote): Promise<Note>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private courses: Map<string, Course>;
  private modules: Map<string, Module>;
  private lessons: Map<string, Lesson>;
  private progress: Map<string, UserLessonProgress>;
  private comments: Map<string, Comment>;
  private notes: Map<string, Note>;

  constructor() {
    this.users = new Map();
    this.courses = new Map();
    this.modules = new Map();
    this.lessons = new Map();
    this.progress = new Map();
    this.comments = new Map();
    this.notes = new Map();

    this.seedData();
  }

  private seedData() {
    // Create admin user
    const adminId = randomUUID();
    this.users.set(adminId, {
      id: adminId,
      name: "Administrador",
      email: "admin@lms.com",
      password: "HzgSujtE@MC7PgE",
      isAdmin: true,
    });

    // Create student user
    const studentId = randomUUID();
    this.users.set(studentId, {
      id: studentId,
      name: "Luis",
      email: "aluno@lms.com",
      password: "aluno123",
      isAdmin: false,
    });

    // Create courses
    const course1Id = randomUUID();
    const course1: Course = {
      id: course1Id,
      title: "Minicurso Terapeuta Analista Corporal",
      description: "Introdução aos fundamentos da Terapia Analista Corporal",
      coverImage: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&h=600&fit=crop",
      slug: "minicurso-terapeuta",
      status: "active",
      order: 1,
    };
    this.courses.set(course1Id, course1);

    const course2Id = randomUUID();
    const course2: Course = {
      id: course2Id,
      title: "Formação Terapeuta Analista Corporal",
      description: "Formação completa em Terapia Analista Corporal com certificação. Domine todos os traços de caráter e a metodologia de análise.",
      coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop",
      slug: "formacao-terapeuta",
      status: "active",
      order: 2,
    };
    this.courses.set(course2Id, course2);

    // Create modules for course 1
    const module1Id = randomUUID();
    const module1: Module = {
      id: module1Id,
      courseId: course1Id,
      title: "Fundamentos e Prática",
      description: "Comece sua jornada aqui",
      order: 1,
    };
    this.modules.set(module1Id, module1);

    // Create lessons for module 1
    const now = new Date();
    const dayMs = 86400000;
    const lessons1 = [
      {
        title: "Aula 01: Fundamentos da Análise Corporal",
        description: "Introdução aos conceitos essenciais e à história da terapia corporal. Descubra como o formato do corpo revela a mente e as emoções ocultas.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        duration: "60:00",
        releaseAt: now, // Day 1 (Immediate)
        attachments: [],
        order: 1,
      },
      {
        title: "Aula 02: Leitura e Avaliação Corporal",
        description: "Técnicas práticas para identificar padrões corporais e emocionais. Você aprenderá a diferenciar os traços de caráter observando características físicas específicas.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        duration: "60:00",
        releaseAt: new Date(now.getTime() + 2 * dayMs), // Day 3 (48h after)
        attachments: [],
        order: 2,
      },
      {
        title: "Aula 03: Intervenções Terapêuticas",
        description: "Métodos e abordagens para trabalhar com o corpo após a leitura. Como atuar diante das dores de cada traço e quais ferramentas usar para gerar transformação.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        duration: "60:00",
        releaseAt: new Date(now.getTime() + 4 * dayMs), // Day 5 (96h after)
        attachments: [],
        order: 3,
      },
      {
        title: "Aula 04: Construindo sua Prática",
        description: "O mapa para iniciar sua carreira como terapeuta analista corporal. Como estruturar seus atendimentos, captar clientes e ser remunerado por esse conhecimento.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        duration: "60:00",
        releaseAt: new Date(now.getTime() + 6 * dayMs), // Day 7 (144h after)
        attachments: [],
        order: 4,
      },
    ];

    lessons1.forEach((lessonData) => {
      const lessonId = randomUUID();
      this.lessons.set(lessonId, {
        id: lessonId,
        moduleId: module1Id,
        ...lessonData,
        attachments: [],
      });
    });

    // Create modules for course 2 (Formação)
    const modules2Data = [
      {
        title: 'MÓDULO 00: COMECE POR AQUI',
        order: 1,
        lessons: [
          { title: 'Aula 01: Sejam Bem-vindos', duration: '10:00', releaseOffset: 0 },
          { title: 'Aula 02: Link do Grupo de Alunos', duration: '05:00', releaseOffset: 0 },
          { title: 'Aula 03: Suporte Técnico', duration: '05:00', releaseOffset: 0 },
          { title: 'Aula 04: Como será a sua jornada', duration: '15:00', releaseOffset: 0 },
        ]
      },
      {
        title: 'MÓDULO 01: INTRODUÇÃO À ANÁLISE CORPORAL',
        order: 2,
        lessons: [
          { title: 'Aula 01: O que é a Análise Corporal', duration: '20:00', releaseOffset: 0 },
          { title: 'Aula 02: A Base Científica', duration: '30:00', releaseOffset: 0 },
          { title: 'Aula 03: O Processo de Mielinização', duration: '25:00', releaseOffset: 0 },
          { title: 'Aula 04: O Conceito de Couraça Muscular', duration: '20:00', releaseOffset: 0 },
          { title: 'Aula 05: Traço de Caráter vs. Personalidade', duration: '15:00', releaseOffset: 0 },
        ]
      },
      {
        title: 'MÓDULO 02: O TRAÇO DE CARÁTER ESQUIZOIDE',
        order: 3,
        lessons: [
          { title: 'Aula 01: A Fase de Formação', duration: '20:00', releaseOffset: 7 },
          { title: 'Aula 02: A Dor Existencial', duration: '25:00', releaseOffset: 7 },
          { title: 'Aula 03: O Formato do Corpo Esquizoide', duration: '30:00', releaseOffset: 7 },
          { title: 'Aula 04: O Recurso do Esquizoide', duration: '20:00', releaseOffset: 7 },
          { title: 'Aula 05: O Esquizoide na Dor vs. no Recurso', duration: '25:00', releaseOffset: 7 },
          { title: 'Aula 06: Como lidar e estimular', duration: '20:00', releaseOffset: 7 },
          { title: 'Aula 07: Dinâmica nos Relacionamentos e Trabalho', duration: '30:00', releaseOffset: 7 },
        ]
      },
      {
        title: 'MÓDULO 03: O TRAÇO DE CARÁTER ORAL',
        order: 4,
        lessons: [
          { title: 'Aula 01: A Fase de Formação', duration: '20:00', releaseOffset: 14 },
          { title: 'Aula 02: A Dor Existencial', duration: '25:00', releaseOffset: 14 },
          { title: 'Aula 03: O Formato do Corpo Oral', duration: '30:00', releaseOffset: 14 },
          { title: 'Aula 04: O Recurso do Oral', duration: '20:00', releaseOffset: 14 },
          { title: 'Aula 05: O Oral na Dor vs. no Recurso', duration: '25:00', releaseOffset: 14 },
          { title: 'Aula 06: Como lidar e estimular', duration: '20:00', releaseOffset: 14 },
          { title: 'Aula 07: Dinâmica nos Relacionamentos e Trabalho', duration: '30:00', releaseOffset: 14 },
        ]
      },
      {
        title: 'MÓDULO 04: O TRAÇO DE CARÁTER PSICOPATA',
        order: 5,
        lessons: [
          { title: 'Aula 01: A Fase de Formação', duration: '20:00', releaseOffset: 21 },
          { title: 'Aula 02: A Dor Existencial', duration: '25:00', releaseOffset: 21 },
          { title: 'Aula 03: O Formato do Corpo Psicopata', duration: '30:00', releaseOffset: 21 },
          { title: 'Aula 04: O Recurso do Psicopata', duration: '20:00', releaseOffset: 21 },
          { title: 'Aula 05: O Psicopata na Dor vs. no Recurso', duration: '25:00', releaseOffset: 21 },
          { title: 'Aula 06: Como lidar e estimular', duration: '20:00', releaseOffset: 21 },
          { title: 'Aula 07: Dinâmica nos Relacionamentos e Trabalho', duration: '30:00', releaseOffset: 21 },
        ]
      },
      {
        title: 'MÓDULO 05: O TRAÇO DE CARÁTER MASOQUISTA',
        order: 6,
        lessons: [
          { title: 'Aula 01: A Fase de Formação', duration: '20:00', releaseOffset: 28 },
          { title: 'Aula 02: A Dor Existencial', duration: '25:00', releaseOffset: 28 },
          { title: 'Aula 03: O Formato do Corpo Masoquista', duration: '30:00', releaseOffset: 28 },
          { title: 'Aula 04: O Recurso do Masoquista', duration: '20:00', releaseOffset: 28 },
          { title: 'Aula 05: O Masoquista na Dor vs. no Recurso', duration: '25:00', releaseOffset: 28 },
          { title: 'Aula 06: Como lidar e estimular', duration: '20:00', releaseOffset: 28 },
          { title: 'Aula 07: Dinâmica nos Relacionamentos e Trabalho', duration: '30:00', releaseOffset: 28 },
        ]
      }
    ];

    modules2Data.forEach((moduleData) => {
      const moduleId = randomUUID();
      this.modules.set(moduleId, {
        id: moduleId,
        courseId: course2Id,
        title: moduleData.title,
        description: null,
        order: moduleData.order,
      });

      moduleData.lessons.forEach((lessonData, index) => {
        const lessonId = randomUUID();
        this.lessons.set(lessonId, {
          id: lessonId,
          moduleId: moduleId,
          title: lessonData.title,
          description: `Conteúdo da ${lessonData.title}`,
          videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          duration: lessonData.duration,
          releaseAt: new Date(now.getTime() + lessonData.releaseOffset * dayMs),
          attachments: [],
          order: index + 1,
        });
      });
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((u) => u.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      id, 
      ...insertUser,
      isAdmin: insertUser.isAdmin ?? false,
    };
    this.users.set(id, user);
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async deleteUser(id: string): Promise<void> {
    this.users.delete(id);
  }

  // Course methods
  async getAllCourses(): Promise<Course[]> {
    return Array.from(this.courses.values()).sort((a, b) => a.order - b.order);
  }

  async getCourse(id: string): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async getCourseBySlug(slug: string): Promise<CourseWithModules | undefined> {
    const course = Array.from(this.courses.values()).find((c) => c.slug === slug);
    if (!course) return undefined;

    const modules = await this.getModulesByCourse(course.id);
    const modulesWithLessons: ModuleWithLessons[] = await Promise.all(
      modules.map(async (module) => {
        const lessons = await this.getLessonsByModule(module.id);
        return { ...module, lessons };
      })
    );

    return { ...course, modules: modulesWithLessons };
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = randomUUID();
    const course: Course = { 
      id, 
      ...insertCourse,
      order: insertCourse.order ?? 0,
      status: insertCourse.status ?? 'draft',
    };
    this.courses.set(id, course);
    return course;
  }

  async updateCourse(id: string, updates: Partial<InsertCourse>): Promise<Course | undefined> {
    const course = this.courses.get(id);
    if (!course) return undefined;
    const updated = { ...course, ...updates };
    this.courses.set(id, updated);
    return updated;
  }

  async deleteCourse(id: string): Promise<void> {
    this.courses.delete(id);
  }

  // Module methods
  async getAllModules(): Promise<Module[]> {
    return Array.from(this.modules.values());
  }

  async getModulesByCourse(courseId: string): Promise<Module[]> {
    return Array.from(this.modules.values())
      .filter((m) => m.courseId === courseId)
      .sort((a, b) => a.order - b.order);
  }

  async createModule(insertModule: InsertModule): Promise<Module> {
    const id = randomUUID();
    const module: Module = { 
      id, 
      ...insertModule,
      order: insertModule.order ?? 0,
      description: insertModule.description ?? null,
    };
    this.modules.set(id, module);
    return module;
  }

  async updateModule(id: string, updates: Partial<InsertModule>): Promise<Module | undefined> {
    const module = this.modules.get(id);
    if (!module) return undefined;
    const updated = { ...module, ...updates };
    this.modules.set(id, updated);
    return updated;
  }

  async deleteModule(id: string): Promise<void> {
    this.modules.delete(id);
  }

  // Lesson methods
  async getAllLessons(): Promise<Lesson[]> {
    return Array.from(this.lessons.values());
  }

  async getLessonsByModule(moduleId: string): Promise<Lesson[]> {
    return Array.from(this.lessons.values())
      .filter((l) => l.moduleId === moduleId)
      .sort((a, b) => a.order - b.order);
  }

  async getLesson(id: string): Promise<Lesson | undefined> {
    return this.lessons.get(id);
  }

  async createLesson(insertLesson: InsertLesson): Promise<Lesson> {
    const id = randomUUID();
    const lesson: Lesson = { 
      id, 
      ...insertLesson,
      order: insertLesson.order ?? 0,
      description: insertLesson.description ?? null,
      duration: insertLesson.duration ?? null,
      attachments: insertLesson.attachments ?? [],
    };
    this.lessons.set(id, lesson);
    return lesson;
  }

  async updateLesson(id: string, updates: Partial<InsertLesson>): Promise<Lesson | undefined> {
    const lesson = this.lessons.get(id);
    if (!lesson) return undefined;
    const updated = { ...lesson, ...updates };
    this.lessons.set(id, updated);
    return updated;
  }

  async deleteLesson(id: string): Promise<void> {
    this.lessons.delete(id);
  }

  // Progress methods
  async getUserProgress(userId: string, lessonId: string): Promise<UserLessonProgress | undefined> {
    return Array.from(this.progress.values()).find(
      (p) => p.userId === userId && p.lessonId === lessonId
    );
  }

  async getAllUserProgress(userId: string): Promise<UserLessonProgress[]> {
    return Array.from(this.progress.values()).filter((p) => p.userId === userId);
  }

  async upsertProgress(insertProgress: InsertUserLessonProgress): Promise<UserLessonProgress> {
    const existing = await this.getUserProgress(insertProgress.userId, insertProgress.lessonId);
    if (existing) {
      const updated = { ...existing, ...insertProgress };
      this.progress.set(existing.id, updated);
      return updated;
    }
    const id = randomUUID();
    const progress: UserLessonProgress = { 
      id, 
      ...insertProgress,
      completed: insertProgress.completed ?? false,
      completedAt: insertProgress.completedAt ?? null,
      rating: insertProgress.rating ?? null,
    };
    this.progress.set(id, progress);
    return progress;
  }

  // Comment methods
  async getCommentsByLesson(lessonId: string): Promise<Comment[]> {
    return Array.from(this.comments.values())
      .filter((c) => c.lessonId === lessonId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createComment(insertComment: InsertComment): Promise<Comment> {
    const id = randomUUID();
    const comment: Comment = { id, ...insertComment, createdAt: new Date() };
    this.comments.set(id, comment);
    return comment;
  }

  // Note methods
  async getUserNote(userId: string, lessonId: string): Promise<Note | undefined> {
    return Array.from(this.notes.values()).find(
      (n) => n.userId === userId && n.lessonId === lessonId
    );
  }

  async upsertNote(insertNote: InsertNote): Promise<Note> {
    const existing = await this.getUserNote(insertNote.userId, insertNote.lessonId);
    if (existing) {
      const updated = { ...existing, ...insertNote, updatedAt: new Date() };
      this.notes.set(existing.id, updated);
      return updated;
    }
    const id = randomUUID();
    const note: Note = { id, ...insertNote, updatedAt: new Date() };
    this.notes.set(id, note);
    return note;
  }
}

export const storage = new MemStorage();
