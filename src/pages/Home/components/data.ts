import {
  Atom,
  Braces,
  Clock,
  Coffee,
  Code2,
  Container,
  Cpu,
  Database,
  GitBranch,
  Globe,
  Music,
  Music2,
  Palette,
  Rocket,
  Server,
  Terminal,
  Users,
  Wallet,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const TECH_STRIP: { name: string; icon: LucideIcon }[] = [
  { name: 'React', icon: Atom },
  { name: 'TypeScript', icon: Braces },
  { name: 'Angular', icon: Globe },
  { name: 'JavaScript', icon: Code2 },
  { name: 'Node.js', icon: Server },
  { name: 'Express', icon: Terminal },
  { name: 'PostgreSQL', icon: Database },
  { name: 'Docker', icon: Container },
  { name: 'Java', icon: Coffee },
  { name: 'C++', icon: Cpu },
  { name: 'Git', icon: GitBranch },
  { name: 'UI/UX', icon: Palette },
  { name: 'Framer Motion', icon: Rocket },
];

export type Gradient = 'preview1' | 'preview2' | 'preview3' | 'preview4' | 'preview5' | 'preview6' | 'preview7' | 'preview8';

export interface CodeSnippet {
  filename: string;
  language: string;
  code: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  icon: LucideIcon;
  description: string;
  tech: string[];
  gradient: Gradient;
  repo: string;
  live?: string;
  screenshot?: string;
  video?: string;
  codeSnippet?: CodeSnippet;
  context: string;
  objective: string;
  highlights: string[];
}

export const PROJECTS: Project[] = [
  {
    id: 'visualizer',
    title: 'Visualizer',
    category: 'Web',
    icon: Clock,
    description:
      'Web para visualizar de diferentes formas el paso del tiempo, tematizado a un centro de juegos.',
    tech: ['Angular 22'],
    gradient: 'preview1',
    repo: 'https://github.com/Josefo1212/VisualizerProject',
    live: 'https://visualizer-project-five.vercel.app',
    video: '/visualizerProject.mp4',
    context:
      'Es una web que muestra el paso del tiempo de distintas maneras: relojes analógicos, digitales, cronómetros y contadores, todo envuelto en una estética de centro de juegos retro.',
    objective:
      'Explorar Angular a fondo y demostrar distintas formas de representar el tiempo de forma interactiva y visualmente atractiva.',
    highlights: [
      'Relojes analógico y digital con actualización en tiempo real',
      'Tematización completa tipo centro de juegos retro',
      'Arquitectura de componentes en Angular 22',
    ],
  },
  {
    id: 'playlist',
    title: 'Playlist',
    category: 'App',
    icon: Music,
    description: 'App de playlist creada para trabajar con indexDB.',
    tech: ['JavaScript', 'CSS', 'HTML'],
    gradient: 'preview2',
    repo: 'https://github.com/Josefo1212/PlaylistProject',
    video: '/playlistProject.mp4',
    context:
      'Aplicación de listas de reproducción de canciones que guarda todo en IndexedDB, el almacenamiento local del navegador, para que los datos persistan sin un servidor.',
    objective:
      'Aprender a manejar IndexedDB de verdad: transacciones, almacenes de objetos y búsquedas, aplicado a un caso de uso cotidiano.',
    highlights: [
      'CRUD completo de playlists y canciones',
      'Persistencia offline en el navegador con IndexedDB',
      'Búsqueda y filtrado de canciones',
    ],
  },
  {
    id: 'contacts',
    title: 'Contacts',
    category: 'Web',
    icon: Users,
    description:
      'Gestor de contactos con diferentes maneras de visualizar dichos contactos.',
    tech: ['JavaScript', 'React'],
    gradient: 'preview3',
    repo: 'https://github.com/Josefo1212/ContactsProject',
    video: '/contactsProject.mp4',
    context:
      'Gestor de contactos que permite crear, editar y eliminar contactos, ofreciendo distintas formas de visualizar la lista: en tarjetas, en tabla y otras vistas.',
    objective:
      'Construir un CRUD completo en React y experimentar con múltiples vistas de presentación de los mismos datos.',
    highlights: [
      'CRUD completo de contactos',
      'Múltiples vistas de visualización de datos',
      'Componentes React reutilizables',
    ],
  },
  {
    id: 'taskflow',
    title: 'TaskFlow API',
    category: 'Backend',
    icon: Server,
    description:
      'Backend con arquitectura de microservicios para manejar una aplicación de gestión de tareas.',
    tech: ['TypeScript', 'Node.js', 'Express'],
    gradient: 'preview4',
    repo: 'https://github.com/Josefo1212/TaskFlow-Backend',
    screenshot: '/taskflowProject.png',
    context:
      'Backend de una aplicación de gestión de tareas organizado como microservicios: cada dominio (usuarios, tareas, proyectos) es un servicio independiente que se comunica por HTTP.',
    objective:
      'Diseñar una API REST escalable separando la lógica de negocio en microservicios desacoplados y mantenibles.',
    highlights: [
      'Arquitectura de microservicios independientes',
      'Endpoints REST documentados',
      'Integración con bases de datos por servicio',
    ],
  },
  {
    id: 'compilador',
    title: 'Compilador',
    category: 'Tools',
    icon: Cpu,
    description:
      'Compilador que traduce código C++, cuenta con un analizador sintáctico, semántico y léxico.',
    tech: ['C++'],
    gradient: 'preview5',
    repo: 'https://github.com/Josefo1212/Compilador',
    screenshot: '/compiladorProject.png',
    context:
      'Compilador escrito en C++ que es capaz de traducir código C++: realiza análisis léxico, sintáctico y semántico sobre el código fuente.',
    objective:
      'Implementar las fases clásicas de un compilador, desde la lectura de tokens hasta la validación semántica del programa.',
    highlights: [
      'Analizador léxico que genera tokens',
      'Analizador sintáctico con detección de errores',
      'Validación semántica y tabla de símbolos',
    ],
    codeSnippet: {
      filename: 'tokens.h',
      language: 'cpp',
      code: `enum TokenType {
  T_PALABRA_RESERVADA,
  T_IDENTIFICADOR,
  T_ENTERO,
  T_REAL,
  T_CADENA,
  T_OPERADOR,
  T_SIMBOLO,
  T_EOF
};

struct Token {
  TokenType tipo;
  std::string lexema;
  int linea;
  int columna;
};`,
    },
  },
  {
    id: 'conservatorio',
    title: 'Conservatorio API',
    category: 'Backend',
    icon: Music2,
    description:
      'Backend monolítico para manejar la aplicación del conservatorio de música del estado Zulia.',
    tech: ['TypeScript', 'Node.js', 'Express'],
    gradient: 'preview6',
    repo: 'https://github.com/Josefo1212/conservatorio-Backend',
    screenshot: '/conservatorioProject.png',
    context:
      'API monolítica para gestionar la información de un conservatorio de música: estudiantes, profesores, instrumentos, cursos y matrículas.',
    objective:
      'Modelar un dominio real con múltiples entidades relacionadas y exponerlas a través de una API REST completa.',
    highlights: [
      'Modelado de entidades del conservatorio y sus relaciones',
      'API REST con operaciones por recurso',
      'Backend monolítico fácil de desplegar',
    ],
  },
  {
    id: 'connection-pool',
    title: 'Connection Pool',
    category: 'Backend',
    icon: Database,
    description:
      'Implementación de pool de conexiones a bases de datos y con la integración de DbComponents.',
    tech: ['Java'],
    gradient: 'preview7',
    repo: 'https://github.com/Josefo1212/ConnectionPoolProject',
    screenshot: '/poolProject.png',
    context:
      'Implementación en Java de un pool de conexiones a bases de datos: las conexiones se crean una vez y se reutilizan, evitando el costo de abrir una por cada consulta.',
    objective:
      'Reutilizar conexiones a la base de datos de forma eficiente para no saturar el servidor bajo carga concurrente.',
    highlights: [
      'Reutilización de conexiones en un pool',
      'Manejo seguro de acceso concurrente',
      'Integración con DbComponents',
    ],
    codeSnippet: {
      filename: 'ConnectionPool.java',
      language: 'java',
      code: `public synchronized Connection getConnection() throws SQLException {
  if (!available.isEmpty()) {
    return available.remove(0);
  }
  if (size < maxConnections) {
    size++;
    return createConnection();
  }
  throw new SQLException("Pool de conexiones agotado");
}

public synchronized void releaseConnection(Connection conn) {
  available.add(conn);
}`,
    },
  },
  {
    id: 'finanzas',
    title: 'Finanzas',
    category: 'Web',
    icon: Wallet,
    description: 'Frontend de app de finanzas personales con tematización de la F2.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    gradient: 'preview8',
    repo: 'https://github.com/Josefo1212/finanzas-Frontend',
    live: 'https://pit-stop-financiero.vercel.app',
    screenshot: '/finanzasProject.png',
    context:
      'Frontend de una aplicación de finanzas personales donde se registran ingresos y gastos, con una tematización propia del equipo F2.',
    objective:
      'Construir la interfaz de control de las finanzas personales: registrar movimientos y resumir el balance.',
    highlights: [
      'Registro y listado de ingresos y gastos',
      'Resumen visual del balance',
      'Tematización personalizada del equipo F2',
    ],
  },
];
