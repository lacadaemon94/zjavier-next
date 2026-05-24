import type { Locale } from "./config";

export const dictionaries = {
  en: {
    metadata: {
      defaultTitle: "Full Stack Developer",
      description:
        "Full Stack Developer from El Salvador, +3 Years of experience as a Full Stack Developer; I really like the entire journey of taking an idea and transforming it into a compelling digital brand.",
      keywords: [
        "ZJAVIER",
        "Javier",
        "Flores",
        "Full",
        "Stack",
        "Developer",
        "ES",
        "El",
        "Salvador",
        "Desarrollador",
        "Web",
        "Aplicaciones",
        "Salvadoreno",
        "Salvadoran",
      ],
    },
    language: {
      label: "Language",
      english: "ENG",
      spanish: "SPA",
      setEnglish: "Switch static site language to English",
      setSpanish: "Switch static site language to Spanish",
    },
    home: {
      avatarAlt: "Pixel Avatar - Javier Flores",
      title: "Full Stack Developer",
      titleSuffix: ", with experience in",
      about:
        "Some of my learning experiences, note-worthy code, tutorials about common development patterns and general opinions about stuff.",
      badges: {
        webDesign: "Web Design",
        apiDevelopment: "API Development",
        databaseDesign: "Database Design",
      },
    },
    notes: {
      filter: "Filter",
      sort: "Sort",
      all: "All",
      tutorials: "Tutorials",
      opinions: "Opinions",
      notes: "Notes",
      showAll: "Show All",
      showTutorials: "Show Tutorials",
      showOpinions: "Show Opinions",
      showNotes: "Show Notes",
      byDate: "By Date",
      byLikes: "By Likes",
      byViews: "By Views",
    },
    post: {
      goBack: "Go Back",
      goBackHome: "Go Back Home",
      home: "Home",
      index: "INDEX",
      backToTop: "back to top",
    },
    footer: {
      builtWith:
        "Built with Next.js, TypeScript, Framer Motion, Supabase and Vercel.",
    },
  },
  es: {
    metadata: {
      defaultTitle: "Desarrollador Full Stack",
      description:
        "Desarrollador Full Stack de El Salvador, con mas de 3 anos de experiencia; me gusta todo el camino de tomar una idea y transformarla en una marca digital convincente.",
      keywords: [
        "ZJAVIER",
        "Javier",
        "Flores",
        "Full",
        "Stack",
        "Developer",
        "ES",
        "El",
        "Salvador",
        "Desarrollador",
        "Web",
        "Aplicaciones",
        "Salvadoreno",
        "Salvadoran",
      ],
    },
    language: {
      label: "Idioma",
      english: "ENG",
      spanish: "SPA",
      setEnglish: "Cambiar el idioma estatico del sitio a ingles",
      setSpanish: "Cambiar el idioma estatico del sitio a espanol",
    },
    home: {
      avatarAlt: "Avatar pixelado - Javier Flores",
      title: "Desarrollador Full Stack",
      titleSuffix: ", con experiencia en",
      about:
        "Algunas de mis experiencias de aprendizaje, codigo destacable, tutoriales sobre patrones comunes de desarrollo y opiniones generales sobre varias cosas.",
      badges: {
        webDesign: "Diseno Web",
        apiDevelopment: "Desarrollo de APIs",
        databaseDesign: "Diseno de Bases de Datos",
      },
    },
    notes: {
      filter: "Filtrar",
      sort: "Ordenar",
      all: "Todo",
      tutorials: "Tutoriales",
      opinions: "Opiniones",
      notes: "Notas",
      showAll: "Mostrar todo",
      showTutorials: "Mostrar tutoriales",
      showOpinions: "Mostrar opiniones",
      showNotes: "Mostrar notas",
      byDate: "Por fecha",
      byLikes: "Por likes",
      byViews: "Por vistas",
    },
    post: {
      goBack: "Volver",
      goBackHome: "Volver al inicio",
      home: "Inicio",
      index: "INDICE",
      backToTop: "volver arriba",
    },
    footer: {
      builtWith:
        "Construido con Next.js, TypeScript, Framer Motion, Supabase y Vercel.",
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
