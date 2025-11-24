
export enum UserRole {
  STUDENT = 'student',
  ADMIN = 'admin'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface RichContent {
  mission?: {
    title: string;
    description: string;
    actionLabel: string;
  };
  sticker?: {
    title: string;
    url: string; // Using string URL instead of local asset for mock
  };
  miniGame?: {
    title: string;
    cards: {
      imageUrl: string;
      description: string;
      revealText: string;
    }[];
  };
  quiz?: {
    questions: QuizQuestion[];
  };
  insights?: string[];
  materials?: {
    title: string;
    url: string;
  }[];
}

export interface Lesson {
  id: string;
  title: string;
  content: string; // Markdown content or description
  videoUrl?: string;
  duration: string;
  releaseDate?: string;
  // New Rich Content Fields
  richContent?: RichContent;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number; // 0 = free
  thumbnail: string;
  modules: Module[];
  author: string;
  category: string;
  createdAt: string;
}

export interface Enrollment {
  userId: string;
  courseId: string;
  completedLessonIds: string[];
  enrolledAt: string;
  completedAt?: string; // If present, course is finished
}

export interface AIContentRequest {
  topic: string;
  targetAudience: string;
}
