import { Course, User, UserRole, Enrollment } from "../types";

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Alice Estudante', email: 'alice@example.com', role: UserRole.STUDENT },
  { id: 'u2', name: 'Bob Admin', email: 'bob@admin.com', role: UserRole.ADMIN },
];

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Introdução ao React 18',
    description: 'Aprenda os fundamentos do React moderno, hooks e componentes.',
    price: 0, // Grátis
    category: 'Frontend',
    author: 'Prof. Silva',
    createdAt: '2023-10-01',
    thumbnail: 'https://picsum.photos/seed/react/800/600',
    modules: [
      {
        id: 'm1',
        title: 'Fundamentos',
        lessons: [
          {
            id: 'l1',
            title: 'O que é React?',
            content: '# O que é React?\nReact é uma biblioteca JavaScript para criar interfaces de usuário.\n\n- Baseado em componentes\n- Virtual DOM',
            durationMinutes: 10,
            videoUrl: 'https://www.youtube.com/embed/Tn6-PIqc4UM' // Dummy embed
          },
          {
            id: 'l2',
            title: 'JSX e Renderização',
            content: 'JSX permite escrever HTML dentro do JavaScript.',
            durationMinutes: 15,
            releaseDate: new Date(Date.now() - 86400000).toISOString() // Released yesterday
          }
        ]
      },
      {
        id: 'm2',
        title: 'Hooks Essenciais',
        lessons: [
          {
            id: 'l3',
            title: 'useState e useEffect',
            content: 'Gerenciando estado e efeitos colaterais.',
            durationMinutes: 20,
            releaseDate: new Date(Date.now() + 86400000 * 2).toISOString() // Release in 2 days (future)
          }
        ]
      }
    ]
  },
  {
    id: 'c2',
    title: 'Arquitetura Avançada de Backend',
    description: 'Domine microsserviços, filas e bancos de dados distribuídos.',
    price: 199.90, // Pago
    category: 'Backend',
    author: 'Dra. Souza',
    createdAt: '2023-11-15',
    thumbnail: 'https://picsum.photos/seed/backend/800/600',
    modules: [
      {
        id: 'm1-c2',
        title: 'Design Patterns',
        lessons: [
          {
            id: 'l1-c2',
            title: 'Singleton e Factory',
            content: 'Como implementar padrões criacionais.',
            durationMinutes: 25,
          }
        ]
      }
    ]
  }
];

export const MOCK_ENROLLMENTS: Enrollment[] = [];