import { Clock, Cpu, Database, Music, Music2, Server, Users, Wallet } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type Gradient = 'preview1' | 'preview2' | 'preview3' | 'preview4' | 'preview5' | 'preview6' | 'preview7' | 'preview8';

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
  },
];
