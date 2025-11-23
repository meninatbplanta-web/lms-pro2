
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

export interface Lesson {
  id: string;
  title: string;
  content: string; // Markdown content
  videoUrl?: string;
  duration: string; // Changed from number to string to support "5:47" format
  releaseDate?: string; // ISO Date string. If null, available immediately.
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
