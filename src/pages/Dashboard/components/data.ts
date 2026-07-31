import { type ElementType } from 'react';
import { Braces, Code2, Database, LayoutDashboard, Server } from 'lucide-react';

export interface YearlyProjects {
  year: string;
  projects: number;
}

export interface LinesByLanguage {
  language: string;
  lines: number;
}

export interface Service {
  icon: ElementType;
  title: string;
  description: string;
}

export const PROJECTS_BY_YEAR: YearlyProjects[] = [
  { year: '2020', projects: 1 },
  { year: '2021', projects: 2 },
  { year: '2022', projects: 3 },
  { year: '2023', projects: 4 },
  { year: '2024', projects: 6 },
  { year: '2025', projects: 8 },
  { year: '2026', projects: 10 },
];

export const LINES_BY_LANGUAGE: LinesByLanguage[] = [
  { language: 'TypeScript', lines: 42000 },
  { language: 'JavaScript', lines: 26000 },
  { language: 'Python', lines: 12000 },
  { language: 'HTML/CSS', lines: 8000 },
  { language: 'SQL', lines: 6000 },
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
