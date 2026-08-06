# Portfolio · Jose Fereira

Portafolio web personal desarrollado con React 19 + TypeScript + Vite, con un design system propio y animaciones fluidas. Incluye autenticación local, dashboard con visualizaciones y landing con secciones animadas.

## Stack

- **React 19** con React Compiler y Vite (SWC)
- **TypeScript** (strict, type-checked)
- **react-router v7** (rutas protegidas y públicas)
- **framer-motion** (animaciones y transiciones)
- **recharts** (gráficas del dashboard)
- **lucide-react** (iconos)
- **CSS Modules** (design system propio)

## Estructura

```
src/
├── components/
│   ├── effects/       # ParticleField, ClickSpark, etc.
│   ├── icons/         # Iconos SVG propios (GitHubIcon, Logo)
│   ├── layout/        # Navbar, Footer
│   └── ui/            # Design system: Button, Input, Tabs, Accordion, Badge...
├── context/           # AuthProvider (localStorage) + useAuth
├── hooks/             # useLogoutFlow, etc.
├── pages/
│   ├── Auth/          # Login / Registro (localStorage)
│   ├── Home/          # Landing: hero, skills, proyectos, experiencia
│   ├── Dashboard/     # Estadísticas, radar de skills, proyectos por categoría
│   └── NotFound/      # Página 404
└── main.tsx           # ErrorBoundary + RouterProvider
```

## Características

- **Auth local**: registro y login con persistencia en `localStorage` (`portfolio_users`, `portfolio_session`), toggles de mostrar/ocultar contraseña y botón demo.
- **Landing**: hero con partículas, click sparks y subtítulo con efecto **typewriter**; cinta **marquee** de tecnologías; skills con tabs; proyectos con carrusel, **tilt 3D** con glare y acordeón (navegación por teclado); **sección de contacto** con copiar email.
- **Dashboard protegido**: tarjetas de estadísticas con **count-up** animado, radar de skills con recharts, gráfica de proyectos por categoría, logout con animación.
- **UX**: reveals con `whileInView`, página 404, ErrorBoundary global, diseño responsive, soporte de `prefers-reduced-motion`.

## Scripts

```bash
pnpm install     # instalar dependencias
pnpm dev         # servidor de desarrollo con HMR
pnpm build       # build de producción
pnpm preview     # servir el build localmente
pnpm lint        # ESLint type-aware + reglas React
```

## Lint

El proyecto usa ESLint con reglas **type-aware** (`recommendedTypeChecked`) más los plugins [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) y [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) para reglas específicas de React 19.

```bash
pnpm lint
```
