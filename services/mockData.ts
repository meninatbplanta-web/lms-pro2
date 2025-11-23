
import { Course, User, UserRole, Enrollment } from "../types";

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Alice Estudante', email: 'alice@example.com', role: UserRole.STUDENT },
  { id: 'u2', name: 'Bob Admin', email: 'bob@admin.com', role: UserRole.ADMIN },
];

const TODAY = new Date();
const DAY_MS = 86400000;
const LAUNCH_YEAR = 2025;

// Nova estrutura de módulos baseada no JSON fornecido
const FORMACAO_CONTENT = [
  {
    title: "Boas Vindas",
    lessons: [
      { title: "Boas Vindas", duration: null },
      { title: "Comunidade no WhatsApp", duration: null },
      { title: "Termo de uso", duration: null },
      { title: "Como aproveitar melhor a formação", duration: "03:07" }
    ]
  },
  {
    title: "O Triângulo de Karpman e a sua vida",
    lessons: [
      { title: "As 4 Leis do Espelho – Jacques Lacan", duration: "01:11:27" },
      { title: "O Triângulo Dramático de Karpman", duration: "51:24" }
    ]
  },
  {
    title: "Criança Interior",
    lessons: [
      { title: "A Criança Interior", duration: "42:08" },
      { title: "O Drama e as Esferas de Representação da Criança Interior", duration: "54:46" },
      { title: "Exercício da Criança: Sequência da Aula de Drama e Esferas de Representação", duration: "18:52" },
      { title: "O Ressentimento e os Conflitos da Criança Interior", duration: "29:23" },
      { title: "Aula de Exercícios de Ressentimentos e Conflitos da Criança Interior", duration: "01:11:00" }
    ]
  },
  {
    title: "Os 5 princípios da Terapia Integrativa",
    lessons: [
      { title: "1º – Água", duration: "13:03" },
      { title: "2º – Grounding", duration: "17:00" },
      { title: "3º – Alimentação", duration: "14:27" },
      { title: "4º – Sol", duration: "05:56" },
      { title: "5º – Exercícios", duration: "16:48" }
    ]
  },
  {
    title: "Por que atraio aquilo que não quero",
    lessons: [
      { title: "Por que eu atraio o que não quero – PARTE 1", duration: "24:15" },
      { title: "Por que eu atraio o que não quero – PARTE 2", duration: "14:28" },
      { title: "Por que eu atraio o que não quero – PARTE 3", duration: "13:44" },
      { title: "MATERIAL DE APOIO", duration: null },
      { title: "QUIZ", duration: null }
    ]
  },
  {
    title: "Rapport",
    lessons: [
      { title: "Rapport", duration: "35:17" }
    ]
  },
  {
    title: "Nossas percepções e a lente da dor",
    lessons: [
      { title: "As histórias que eu conto pra mim e as historinhas do meu cliente", duration: "19:12" },
      { title: "As historinhas e o Triângulo do Problema", duration: "18:26" },
      { title: "A percepção de um olhar não é verdade absoluta, é apenas um olhar", duration: "27:31" },
      { title: "Transferências e contra-transferências", duration: "35:00" },
      { title: "Exercício profundo para as historinhas", duration: "43:51" },
      { title: "QUIZ", duration: null }
    ]
  },
  {
    title: "Bases da Psicanálise",
    lessons: [
      { title: "As bases da Psicanálise – PT I", duration: "16:58" },
      { title: "As bases da Psicanálise – PT II", duration: "15:35" },
      { title: "Couraças – PT I", duration: "08:18" },
      { title: "Couraças – PT II", duration: "16:00" },
      { title: "Couraças – PT III", duration: "15:29" },
      { title: "Couraças – PT IV", duration: "08:33" },
      { title: "QUIZ", duration: null },
      { title: "Mecanismos de Defesa do Trauma – PT I", duration: "38:05" },
      { title: "Mecanismos de Defesa dos Traumas – PT II", duration: "11:53" },
      { title: "Mecanismos de Defesa por Tipo de Trauma", duration: "23:58" },
      { title: "QUIZ", duration: null },
      { title: "Punções – O impulso que te leva a fazer", duration: "06:14" },
      { title: "Sonhos", duration: "10:31" },
      { title: "A escuta e as vertentes", duration: "26:11" },
      { title: "QUIZ", duration: null }
    ]
  },
  {
    title: "As Ordens da ajuda e a Lei",
    lessons: [
      { title: "As Leis Sistêmicas – PT I", duration: "10:59" },
      { title: "As Leis Sistêmicas – PT II", duration: "11:22" },
      { title: "Os Emaranhamentos", duration: "22:12" },
      { title: "Masculino e Feminino Saudáveis e Doentes", duration: "16:56" },
      { title: "As Ordens da Ajuda", duration: "12:06" },
      { title: "QUIZ", duration: null },
      { title: "Emaranhamento Sistêmico", duration: "30:28" },
      { title: "A boa e a má consciência", duration: "11:42" },
      { title: "Masculino e Feminino: Introdução, história e cultura", duration: "06:14" },
      { title: "Masculino Interrompido", duration: "09:22" },
      { title: "Feminino Interrompido", duration: "11:48" },
      { title: "Constelação: Exercício de integração do masculino e do feminino", duration: "15:26" },
      { title: "QUIZ", duration: null }
    ]
  },
  {
    title: "A História da Leitura Corporal",
    lessons: [
      { title: "A história da Leitura Corporal – PARTE 1", duration: "10:10" },
      { title: "A história da Leitura Corporal – PARTE 2", duration: "09:14" },
      { title: "A história da Leitura Corporal – PARTE 3", duration: "12:54" },
      { title: "A história da Leitura Corporal – PARTE 4", duration: "12:20" },
      { title: "MATERIAL DE APOIO", duration: null },
      { title: "QUIZ", duration: null }
    ]
  },
  {
    title: "Embriologis Básica",
    lessons: [
      { title: "Embriologia Básica – Aula I", duration: "12:08" },
      { title: "Embriologia Básica – Aula II", duration: "09:53" },
      { title: "Embriologia Básica – Aula III", duration: "08:37" },
      { title: "Emvriologia Básica – Aula IV", duration: "19:29" },
      { title: "Embriologia Básica – Resumão", duration: "08:30" },
      { title: "QUIZ", duration: null },
      { title: "MATERIAL DE APOIO", duration: null }
    ]
  },
  {
    title: "Afetos Intra Uterinos",
    lessons: [
      { title: "Afeto pele fetal", duration: "28:38" },
      { title: "Afeto Cinético", duration: "09:51" },
      { title: "Afeto Umbilical", duration: "06:27" },
      { title: "Fase Oral", duration: "04:56" },
      { title: "Fase Anal", duration: "04:31" },
      { title: "Fase Fálica", duration: "05:46" },
      { title: "A Visão Sistêmica nas Fases da Infância", duration: "36:24" },
      { title: "As 5 dimensões da Leitura Corporal e os inconscientes", duration: "11:30" },
      { title: "MATERIAL DE APOIO", duration: null },
      { title: "QUIZ", duration: null }
    ]
  },
  {
    title: "Um convite torne-se um observador, não um espectador",
    lessons: [
      { title: "MATERIAL DE APOIO", duration: null },
      { title: "Torne se um Observador e não um Mero Expectador", duration: "18:55" },
      { title: "Neuroplasticidade", duration: "11:13" },
      { title: "Neuroplasticidade e a velocidade da cura", duration: "33:28" },
      { title: "Exercícios de reprogramação mental", duration: "18:35" },
      { title: "QUIZ I", duration: null },
      { title: "O trauma", duration: "27:37" },
      { title: "Tipos de trauma", duration: "21:31" },
      { title: "Como o trauma \" mora\" no corpo e no cérebro – Oque a ciência mostra", duration: "14:29" },
      { title: "Oque é psicoeducação", duration: "36:17" },
      { title: "Metáforas Terapêuticas", duration: "19:04" },
      { title: "O trauma como essência viva", duration: "21:35" },
      { title: "As camadas do trauma", duration: "39:53" },
      { title: "Investigação compassiva", duration: "26:23" },
      { title: "QUIZ II", duration: null }
    ]
  },
  {
    title: "O esquizoide",
    lessons: [
      { title: "Introdução ao traço esquizoide: origem e funcionamento", duration: null },
      { title: "Sinais corporais e posturas do traço esquizoide", duration: null },
      { title: "Medos, defesas emocionais e estratégias de afastamento", duration: null },
      { title: "Manejo terapêutico com clientes de traço esquizoide", duration: null },
      { title: "Exercícios práticos de acolhimento e pertencimento para o traço esquizoide", duration: null }
    ]
  },
  {
    title: "O oral",
    lessons: [
      { title: "Introdução ao traço oral: necessidades, carências e vínculos", duration: null },
      { title: "Sinais corporais e padrões de apego do traço oral", duration: null },
      { title: "Fome emocional, dependência afetiva e busca por acolhimento", duration: null },
      { title: "Manejo terapêutico com clientes de traço oral", duration: null },
      { title: "Exercícios sistêmicos para fortalecer o auto nutrimento e a autonomia", duration: null }
    ]
  },
  {
    title: "O psico ou psicopata",
    lessons: [
      { title: "Introdução ao traço psico: poder, controle e sedução", duration: null },
      { title: "Leitura corporal do traço psico ou psicopata", duration: null },
      { title: "Dinâmicas de manipulação, encantamento e afastamento afetivo", duration: null },
      { title: "Ética, limites e cuidados no atendimento de clientes com traço psico", duration: null },
      { title: "Intervenções terapêuticas focadas em responsabilidade e vínculo real", duration: null }
    ]
  },
  {
    title: "O mazoca ou mazoquista",
    lessons: [
      { title: "Introdução ao traço mazoca ou mazoquista: origem e estrutura de dor", duration: null },
      { title: "Sinais corporais e linguagem do corpo no traço mazoquista", duration: null },
      { title: "Culpa, vergonha e auto punição na dinâmica mazoquista", duration: null },
      { title: "Estratégias terapêuticas para aliviar o peso, a sobrecarga e a submissão", duration: null },
      { title: "Exercícios de expressão, limite saudável e autorização para o prazer", duration: null }
    ]
  },
  {
    title: "O rígido",
    lessons: [
      { title: "Introdução ao traço rígido: perfeccionismo, desempenho e controle", duration: null },
      { title: "Leitura corporal do traço rígido e suas armaduras", duration: null },
      { title: "Medo de falhar, comparação e defesa pela performance", duration: null },
      { title: "Caminhos terapêuticos para flexibilizar o traço rígido", duration: null },
      { title: "Exercícios práticos de confiança, entrega e vulnerabilidade", duration: null }
    ]
  },
  {
    title: "Como nasceu o método TRIÍADE",
    lessons: [
      { title: "A história pessoal e profissional que originou o Método TRIÍADE", duration: null },
      { title: "Os pilares fundamentais da TRIÍADE: criança interior, dores existenciais e relação com os pais", duration: null },
      { title: "Como as três camadas do inconsciente se conectam", duration: null },
      { title: "Por que a TRIÍADE é diferente de outros métodos terapêuticos", duration: null },
      { title: "Aplicações práticas e resultados reais obtidos com o método", duration: null }
    ]
  },
  {
    title: "Como aplicar a Anamnese",
    lessons: [
      { title: "A importância da anamnese para um atendimento seguro e profundo", duration: null },
      { title: "Passo a passo da anamnese: como conduzir desde o primeiro contato", duration: null },
      { title: "Como identificar padrões, traços e dores emocionais durante a anamnese", duration: null },
      { title: "Perguntas essenciais que todo terapeuta deve fazer", duration: null },
      { title: "Como transformar a anamnese em um mapa terapêutico para as sessões", duration: null }
    ]
  },
  {
    title: "Ferramenta TRIÍADE",
    lessons: [
      { title: "Como funciona a ferramenta TRIÍADE e seus 3 pilares", duration: null },
      { title: "Como identificar qual pilar trabalhar primeiro em cada cliente", duration: null },
      { title: "Integração entre os pilares: da teoria à prática", duration: null },
      { title: "Estudos de caso com aplicação da Ferramenta TRIÍADE", duration: null },
      { title: "Exercícios guiados para aplicar a TRIÍADE nas sessões", duration: null }
    ]
  },
  {
    title: "Método TRIÍADE: Aplicação e Variações",
    lessons: [
      { title: "Como adaptar o Método TRIÍADE para diferentes perfis emocionais", duration: null },
      { title: "TRIÍADE individual, em grupo, ao vivo e online", duration: null },
      { title: "Como conduzir sessões intensivas usando a TRIÍADE", duration: null },
      { title: "Como aplicar a TRIÍADE de forma ética e responsável", duration: null },
      { title: "Protocolos e variações avançadas para casos complexos", duration: null }
    ]
  },
  {
    title: "A verdade sobre ansiedade",
    lessons: [
      { title: "O que realmente é ansiedade: visão emocional, corporal e neurológica", duration: null },
      { title: "Sinais corporais da ansiedade que o terapeuta precisa identificar", duration: null },
      { title: "Dores existenciais e traços de caráter que agravam a ansiedade", duration: null },
      { title: "Ferramentas e técnicas para aliviar a ansiedade durante as sessões", duration: null },
      { title: "Como trabalhar traumas associados à ansiedade usando a TRIÍADE", duration: null }
    ]
  },
  {
    title: "Tudo que eu temo me sobrevém",
    lessons: [
      { title: "A origem emocional do medo antecipatório", duration: null },
      { title: "Como pensamentos recorrentes moldam a percepção da realidade", duration: null },
      { title: "O papel das crenças e memórias traumáticas no medo", duration: null },
      { title: "Intervenções corporais para quebrar ciclos de antecipação negativa", duration: null },
      { title: "Exercício prático: ressignificando o medo que se repete", duration: null }
    ]
  },
  {
    title: "Medo",
    lessons: [
      { title: "Os diferentes tipos de medo e suas raízes no inconsciente", duration: null },
      { title: "Leitura corporal: como o corpo expressa medo sem palavras", duration: null },
      { title: "Como o medo molda decisões, relacionamentos e comportamentos", duration: null },
      { title: "Técnicas para dissolução de medos profundos", duration: null },
      { title: "Exercício guiado para libertação do medo", duration: null }
    ]
  },
  {
    title: "Crenças Limitantes",
    lessons: [
      { title: "O que são crenças limitantes e como se formam", duration: null },
      { title: "Relação entre traços de caráter e crenças profundas", duration: null },
      { title: "Como identificar crenças no corpo, na fala e no comportamento", duration: null },
      { title: "Ferramentas para reprogramação emocional e mental", duration: null },
      { title: "Exercício sistêmico: ressignificando crenças de origem familiar", duration: null }
    ]
  },
  {
    title: "Depressão",
    lessons: [
      { title: "A depressão sob a ótica da terapia corporal e sistêmica", duration: null },
      { title: "Sinais corporais e emocionais presentes em quadros depressivos", duration: null },
      { title: "Diferença entre tristeza profunda e depressão clínica", duration: null },
      { title: "Como trabalhar o corpo, a mente e a história do cliente", duration: null },
      { title: "Protocolo seguro para atendimento de clientes com depressão", duration: null }
    ]
  },
  {
    title: "Podemos falar em cura?",
    lessons: [
      { title: "O conceito de cura nas terapias integrativas", duration: null },
      { title: "A diferença entre curar, tratar e ressignificar", duration: null },
      { title: "Como funciona o processo de cura emocional no corpo", duration: null },
      { title: "Limites éticos: o que o terapeuta pode ou não prometer", duration: null },
      { title: "A cura como jornada: acolhimento, consciência e movimento", duration: null }
    ]
  },
  {
    title: "Será que eu nasci para ser terapeuta?",
    lessons: [
      { title: "O chamado interno: sinais de que a terapia é o seu caminho", duration: null },
      { title: "As habilidades naturais de um terapeuta corporal e sistêmico", duration: null },
      { title: "Medos comuns de quem está começando na terapia", duration: null },
      { title: "Como saber se tenho perfil para atender pessoas", duration: null },
      { title: "O desenvolvimento contínuo do terapeuta: prática, estudo e ética", duration: null }
    ]
  },
  {
    title: "Paciente ou cliente?",
    lessons: [
      { title: "A diferença entre paciente e cliente na prática terapêutica", duration: null },
      { title: "Como escolher o termo ideal para seu posicionamento profissional", duration: null },
      { title: "Aspectos éticos na relação terapeuta–cliente", duration: null },
      { title: "Como construir uma relação de respeito, confiança e limites", duration: null },
      { title: "As expectativas do cliente e como alinhá-las nas primeiras sessões", duration: null }
    ]
  },
  {
    title: "Compaixão x empatia x piedade",
    lessons: [
      { title: "Diferenças emocionais entre compaixão, empatia e piedade", duration: null },
      { title: "Como cada postura impacta o cliente e o processo terapêutico", duration: null },
      { title: "Riscos da empatia excessiva no atendimento", duration: null },
      { title: "Como desenvolver compaixão ativa sem carregar o cliente", duration: null },
      { title: "Exercícios de auto-regulação emocional para o terapeuta", duration: null }
    ]
  },
  {
    title: "O relacionamento com o cliente",
    lessons: [
      { title: "Como criar rapport e segurança desde o primeiro contato", duration: null },
      { title: "A importância da escuta ativa e da presença terapêutica", duration: null },
      { title: "Como estabelecer limites claros sem perder a conexão", duration: null },
      { title: "Manejando conflitos, resistências e projeções do cliente", duration: null },
      { title: "Boas práticas para manter um vínculo terapêutico saudável", duration: null }
    ]
  },
  {
    title: "Normas para um atendimento excelente",
    lessons: [
      { title: "Ética profissional: postura, sigilo e responsabilidade", duration: null },
      { title: "Organização do ambiente terapêutico: online e presencial", duration: null },
      { title: "Pontualidade, acordos e regras de convivência terapêutica", duration: null },
      { title: "Checklist de boas práticas antes, durante e depois da sessão", duration: null },
      { title: "Como elevar a experiência do cliente do início ao fim", duration: null }
    ]
  },
  {
    title: "Como identificar sinais de interesse ou desinteresse do cliente",
    lessons: [
      { title: "Sinais corporais de interesse durante uma sessão terapêutica", duration: null },
      { title: "Sinais corporais de desinteresse ou resistência", duration: null },
      { title: "Expressões faciais e microexpressões que revelam engajamento", duration: null },
      { title: "Como reconduzir o cliente quando ele perde o foco", duration: null },
      { title: "Exercício prático: leitura corporal em cenários reais", duration: null }
    ]
  },
  {
    title: "Emoções sociais: primárias e inerentes",
    lessons: [
      { title: "A diferença entre emoções primárias e emoções sociais", duration: null },
      { title: "Como emoções sociais moldam relacionamentos e identidade", duration: null },
      { title: "Leitura corporal das emoções profundas versus aparentes", duration: null },
      { title: "Como ajudar o cliente a reconhecer emoções que ele não nomeia", duration: null },
      { title: "Exercícios para expressão e integração emocional", duration: null }
    ]
  },
  {
    title: "Como interpretar incongruência na fala e no corpo",
    lessons: [
      { title: "O que é incongruência entre fala e corpo", duration: null },
      { title: "Gestos, expressões e posturas que contradizem o discurso", duration: null },
      { title: "Como identificar confusão, mentira e repressão emocional", duration: null },
      { title: "Intervenções terapêuticas para devolver a verdade ao cliente", duration: null },
      { title: "Treino prático: análise de vídeos e simulações", duration: null }
    ]
  },
  {
    title: "Como utilizar a leitura corporal em ambientes profissionais",
    lessons: [
      { title: "Aplicações da leitura corporal fora do consultório", duration: null },
      { title: "Como usar leitura corporal em empresas, escolas e equipes", duration: null },
      { title: "Como evitar julgamentos e manter postura ética", duration: null },
      { title: "Negociação, liderança e comunicação usando leitura corporal", duration: null },
      { title: "Exercícios práticos para ambientes profissionais", duration: null }
    ]
  },
  {
    title: "Atendimento individual, grupo… online ou presencial oque é melhor",
    lessons: [
      { title: "Diferenças fundamentais entre atendimento individual e em grupo", duration: null },
      { title: "Vantagens e desafios do atendimento online", duration: null },
      { title: "Como adaptar a leitura corporal para atendimentos online", duration: null },
      { title: "Como conduzir grupos terapêuticos com segurança", duration: null },
      { title: "Como escolher o melhor formato para cada cliente", duration: null }
    ]
  },
  {
    title: "Você quer só o resultado, não quer a caminhada",
    lessons: [
      { title: "Por que tantas pessoas querem resultado sem processo", duration: null },
      { title: "A diferença entre mudança profunda e solução imediatista", duration: null },
      { title: "Os perigos da pressa no processo terapêutico", duration: null },
      { title: "Como ensinar o cliente a valorizar a caminhada", duration: null },
      { title: "Exercício guiado: integrando pequenas vitórias", duration: null }
    ]
  },
  {
    title: "Técnicas para ajustar a linguagem corporal e a comunicação",
    lessons: [
      { title: "Como ajustar postura, tom de voz e presença terapêutica", duration: null },
      { title: "Gestos que fortalecem a autoridade e a confiança", duration: null },
      { title: "Como detectar e corrigir sinais de insegurança no corpo", duration: null },
      { title: "Técnicas de comunicação terapêutica verbal e não verbal", duration: null },
      { title: "Treino prático: comunicação clara, firme e compassiva", duration: null }
    ]
  },
  {
    title: "Como definir o valor da sessão?",
    lessons: [
      { title: "Fatores que influenciam o preço de uma sessão terapêutica", duration: null },
      { title: "Como precificar com ética e segurança", duration: null },
      { title: "O impacto da insegurança na hora de cobrar", duration: null },
      { title: "Como aumentar seu valor conforme sua prática evolui", duration: null },
      { title: "Modelos de precificação e boas práticas do mercado terapêutico", duration: null }
    ]
  },
  {
    title: "Oque mais devo estudar",
    lessons: [
      { title: "Áreas de aprofundamento essenciais para o terapeuta corporal", duration: null },
      { title: "Leituras recomendadas: corpo, trauma, psique e sistema familiar", duration: null },
      { title: "Práticas avançadas para evoluir como terapeuta", duration: null },
      { title: "Como organizar uma rotina de estudos eficiente", duration: null },
      { title: "O papel da supervisão, terapia pessoal e grupos de estudo", duration: null }
    ]
  },
  {
    title: "Exercícios",
    lessons: [
      { title: "Exercícios corporais para liberação emocional", duration: null },
      { title: "Exercícios de respiração e grounding", duration: null },
      { title: "Exercícios sistêmicos para integração familiar", duration: null },
      { title: "Exercícios de reprogramação emocional e mental", duration: null },
      { title: "Exercícios de leitura corporal para prática diária", duration: null }
    ]
  }
];

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
            releaseDate: new Date(`${LAUNCH_YEAR}-12-01T20:00:00`).toISOString()
          },
          {
            id: 'l2-m1-c1',
            title: 'AULA 02: Leitura e Avaliação Corporal',
            content: `**Data:** 03 de Dezembro (Quarta)
**Horário:** 20:00h

**Tema:** Técnicas práticas para identificar padrões corporais e emocionais. Você aprenderá a diferenciar os traços de caráter observando características físicas específicas.`,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '60:00',
            releaseDate: new Date(`${LAUNCH_YEAR}-12-03T20:00:00`).toISOString()
          },
          {
            id: 'l3-m1-c1',
            title: 'AULA 03: Intervenções Terapêuticas',
            content: `**Data:** 05 de Dezembro (Sexta)
**Horário:** 20:00h

**Tema:** Métodos e abordagens para trabalhar com o corpo após a leitura. Como atuar diante das dores de cada traço e quais ferramentas usar para gerar transformação.`,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '60:00',
            releaseDate: new Date(`${LAUNCH_YEAR}-12-05T20:00:00`).toISOString()
          },
          {
            id: 'l4-m1-c1',
            title: 'AULA 04: Construindo sua Prática',
            content: `**Data:** 07 de Dezembro (Domingo)
**Horário:** 15:00h

**Tema:** O mapa para iniciar sua carreira como terapeuta analista corporal. Como estruturar seus atendimentos, captar clientes e ser remunerado por esse conhecimento.`,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '60:00',
            releaseDate: new Date(`${LAUNCH_YEAR}-12-07T15:00:00`).toISOString()
          }
        ]
      }
    ]
  },
  {
    id: 'c2',
    title: 'Formação Terapeuta Analista Corporal',
    description: 'Formação completa em Terapia Analista Corporal com certificação. Domine todos os traços de caráter e a metodologia de análise.',
    price: 1997.00, // Pago
    category: 'Formação Profissional',
    author: 'Priscilla Moreira',
    createdAt: '2023-11-15',
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop',
    modules: FORMACAO_CONTENT.map((mod, index) => ({
      id: `m${index + 1}-c2`,
      title: `${String(index + 1).padStart(2, '0')} - ${mod.title}`,
      lessons: mod.lessons.map((lessonData, lessonIndex) => ({
        id: `l${lessonIndex + 1}-m${index + 1}-c2`,
        title: lessonData.title,
        content: `Conteúdo da aula: ${lessonData.title}.`,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: lessonData.duration || '20:00',
        // Drip release: 1 module every 2 days approx
        releaseDate: new Date(TODAY.getTime() + (index * 2 * DAY_MS)).toISOString()
      }))
    }))
  }
];

export const MOCK_ENROLLMENTS: Enrollment[] = [
  {
    userId: 'u1',
    courseId: 'c1',
    completedLessonIds: ['l1-m1-c1'],
    enrolledAt: new Date(Date.now() - 10000000).toISOString()
  }
];
