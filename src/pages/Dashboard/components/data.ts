import { type ElementType } from 'react';
import { Braces, Code2, Database, LayoutDashboard, Server } from 'lucide-react';

export interface SkillLevel {
  skill: string;
  level: number;
}

export interface Service {
  icon: ElementType;
  title: string;
  description: string;
}

export const SKILL_LEVELS: SkillLevel[] = [
  { skill: 'Frontend', level: 95 },
  { skill: 'Backend', level: 85 },
  { skill: 'Bases de Datos', level: 80 },
  { skill: 'UI / UX', level: 75 },
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
