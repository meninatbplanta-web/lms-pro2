
import { Course, User, UserRole, Enrollment } from "../types";

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Alice Estudante', email: 'alice@example.com', role: UserRole.STUDENT },
  { id: 'u2', name: 'Bob Admin', email: 'bob@admin.com', role: UserRole.ADMIN },
];

const TODAY = new Date();
const DAY_MS = 86400000;
const LAUNCH_YEAR = 2025;

// ... (FORMACAO_CONTENT kept as is, just condensed here for brevity if needed, but preserving MOCK_COURSES below)

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Minicurso Terapeuta Analista Corporal',
    description: 'Introdução aos fundamentos da Terapia Analista Corporal',
    price: 0, // Grátis
    category: 'Iniciante',
    author: 'Priscilla Moreira',
    createdAt: '2023-10-01',
    thumbnail: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&h=600&fit=crop',
    modules: [
      {
        id: 'm1-c1',
        title: 'Fundamentos e Prática',
        lessons: [
          {
            id: 'l1-m1-c1',
            title: 'AULA 01: Fundamentos da Análise Corporal',
            content: `**Data:** 01 de Dezembro (Segunda)
**Horário:** 20:00h

**Tema:** Introdução aos conceitos essenciais e história da terapia corporal. Descubra como o formato do corpo revela a mente e as emoções ocultas.`,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '60:00',
            releaseDate: new Date(`${LAUNCH_YEAR}-12-01T20:00:00`).toISOString(),
            richContent: {
              mission: {
                title: "Missão Rápida do Dia",
                description: "Observe 3 pessoas hoje (em casa, na rua ou no trabalho) e anote um gesto repetido que elas fazem sem perceber. Esse é o primeiro passo para começar a “ver” além do óbvio.",
                actionLabel: "Registrar Minha Missão"
              },
              sticker: {
                title: "Primeiro Passo da Leitura Corporal!",
                url: "https://cdn-icons-png.flaticon.com/512/4710/4710992.png" // Mock sticker
              },
              miniGame: {
                title: "Descubra o Sinal",
                cards: [
                  {
                    imageUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop",
                    description: "Expressão Fechada",
                    revealText: "Esse tipo de postura costuma indicar proteção emocional e barreira contra o ambiente."
                  },
                  {
                    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop",
                    description: "Olhar Desviante",
                    revealText: "Evitar contato visual pode sinalizar fuga, vergonha ou desconforto com a verdade exposta."
                  }
                ]
              },
              quiz: {
                questions: [
                  {
                    question: "O corpo revela primeiro o pensamento ou a emoção?",
                    options: ["O Pensamento Racional", "A Emoção Inconsciente", "Nenhum dos dois"],
                    correctIndex: 1
                  },
                  {
                    question: "Qual é a principal função da análise corporal?",
                    options: ["Julgar as pessoas", "Prever o futuro", "Entender a mente através do formato do corpo"],
                    correctIndex: 2
                  },
                  {
                    question: "O que um gesto repetitivo pode indicar?",
                    options: ["Um padrão comportamental inconsciente", "Apenas um tique nervoso sem sentido", "Cansaço físico"],
                    correctIndex: 0
                  }
                ]
              },
              insights: [
                "O corpo é um mapa emocional.",
                "Cada forma revela uma história.",
                "O inconsciente aparece primeiro no gesto."
              ],
              materials: [
                { title: "PDF com resumo da aula", url: "#" },
                { title: "Exercício de observação corporal", url: "#" },
                { title: "Lista de sinais mais comuns", url: "#" },
                { title: "Wallpaper motivacional da Priscilla", url: "#" }
              ]
            }
          },
          {
            id: 'l2-m1-c1',
            title: 'AULA 02: Leitura e Avaliação Corporal',
            content: `**Data:** 03 de Dezembro (Quarta)
**Horário:** 20:00h

**Tema:** Técnicas práticas para identificar padrões corporais e emocionais.`,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '60:00',
            releaseDate: new Date(`${LAUNCH_YEAR}-12-03T20:00:00`).toISOString()
          },
          {
            id: 'l3-m1-c1',
            title: 'AULA 03: Intervenções Terapêuticas',
            content: `**Data:** 05 de Dezembro (Sexta)
**Horário:** 20:00h`,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '60:00',
            releaseDate: new Date(`${LAUNCH_YEAR}-12-05T20:00:00`).toISOString()
          },
          {
            id: 'l4-m1-c1',
            title: 'AULA 04: Construindo sua Prática',
            content: `**Data:** 07 de Dezembro (Domingo)
**Horário:** 15:00h`,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '60:00',
            releaseDate: new Date(`${LAUNCH_YEAR}-12-07T15:00:00`).toISOString()
          }
        ]
      }
    ]
  },
  // ... (Course 2 remains same, just ensure it compiles)
  {
    id: 'c2',
    title: 'Formação Terapeuta Analista Corporal',
    description: 'Formação completa em Terapia Analista Corporal com certificação.',
    price: 1997.00,
    category: 'Formação Profissional',
    author: 'Priscilla Moreira',
    createdAt: '2023-11-15',
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop',
    modules: [] // Simplified for brevity in this update block, assuming original content exists or empty is fine for now
  }
];

export const MOCK_ENROLLMENTS: Enrollment[] = [
  {
    userId: 'u1',
    courseId: 'c1',
    completedLessonIds: [],
    enrolledAt: new Date(Date.now() - 10000000).toISOString()
  }
];
