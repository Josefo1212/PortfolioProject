import { type ElementType } from 'react';
import { Braces, Code2, Database, LayoutDashboard, Server } from 'lucide-react';

export interface StackItem {
  name: string;
  value: number;
}

export interface LanguageItem {
  name: string;
  value: number;
}

export interface Service {
  icon: ElementType;
  title: string;
  description: string;
}

export const TOP_STACK: StackItem[] = [
  { name: 'Node.js', value: 12 },
  { name: 'React', value: 8 },
  { name: 'PostgreSQL', value: 5 },
  { name: 'Angular', value: 2 },
];

export const LANGUAGES: LanguageItem[] = [
  { name: 'TypeScript', value: 14 },
  { name: 'JavaScript', value: 10 },
  { name: 'Java', value: 8 },
  { name: 'C++', value: 6 },
  { name: 'SQL', value: 5 },
];

export const SERVICES: Service[] = [
  {
    icon: Code2,
    title: 'Desarrollo Web',
    description:
      'Aplicaciones web modernas con React, TypeScript y APIs escalables en Node.js.',
  },
  {
    icon: LayoutDashboard,
    title: 'UI / Dashboards',
    description:
      'Interfaces de control con gráficas, métricas y experiencias visuales premium.',
  },
  {
    icon: Database,
    title: 'Bases de Datos',
    description:
      'Modelado y consultas eficientes con PostgreSQL y MongoDB para datos de alto rendimiento.',
  },
  {
    icon: Braces,
    title: 'APIs REST',
    description:
      'Diseño e implementación de APIs documentadas, seguras y orientadas a microservicios.',
  },
  {
    icon: Server,
    title: 'Microservicios',
    description:
      'Arquitecturas desacopladas con servicios independientes, escalables y fácilmente mantenibles.',
  },
];
