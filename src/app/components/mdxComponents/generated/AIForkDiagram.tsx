import type { PostLanguage } from "@/app/lib/posts/types";
import styles from "./AIForkDiagram.module.css";

const copyByLanguage = {
  es: {
    eyebrow: "Mapa conceptual",
    title: "La bifurcación de la IA",
    subtitle:
      "La tecnología no decide sola. La relación que construimos con ella sí.",
    coreTitle: "IA",
    coreSubtitle: "Herramienta · infraestructura · relación",
    dependencyLabel: "Ruta de dependencia",
    dependencyTitle: "Dependencia",
    dependencySubtitle: "Cuando la IA sustituye criterio",
    dependencyCards: [
      {
        title: "Consumo pasivo",
        body: "Usar respuestas sin desarrollar entendimiento propio.",
      },
      {
        title: "Plataformas opacas",
        body: "Depender de sistemas que no controlamos ni comprendemos del todo.",
      },
      {
        title: "Menos criterio",
        body: "Confundir velocidad con pensamiento y automatización con juicio.",
      },
      {
        title: "Poder centralizado",
        body: "Concentrar capacidad en pocas empresas, modelos e infraestructuras.",
      },
      {
        title: "Salida genérica",
        body: "Producir más contenido, pero con menos voz, contexto y propósito.",
      },
    ],
    capabilityLabel: "Ruta de capacidad",
    capabilityTitle: "Capacidad",
    capabilitySubtitle: "Cuando la IA amplifica agencia",
    capabilityCards: [
      {
        title: "Juicio humano",
        body: "Usar la IA como apoyo, no como reemplazo de criterio.",
      },
      {
        title: "Herramientas locales",
        body: "Construir soluciones adaptadas al contexto real de una comunidad o región.",
      },
      {
        title: "Más aprendizaje",
        body: "Recibir ayuda para entender, practicar y mejorar habilidades.",
      },
      {
        title: "Constructores independientes",
        body: "Permitir que personas y equipos pequeños creen más con menos fricción.",
      },
      {
        title: "Creatividad con contexto",
        body: "Usar IA para explorar opciones sin perder voz, gusto ni intención.",
      },
    ],
    leversTitle: "Lo que decide el camino",
    decisionLevers: [
      {
        title: "Educación",
        body: "¿La usamos para aprender o para evitar aprender?",
      },
      {
        title: "Propiedad",
        body: "¿Controlamos algo de la infraestructura o solo la alquilamos?",
      },
      {
        title: "Contexto local",
        body: "¿Resuelve problemas reales de nuestro entorno?",
      },
      {
        title: "Revisión humana",
        body: "¿El criterio humano sigue al centro?",
      },
      {
        title: "Cultura builder",
        body: "¿La usamos para consumir más o para construir mejor?",
      },
    ],
    takeawayLead: "La IA puede volvernos más dependientes o más capaces.",
    takeawayBody:
      "La diferencia está en la práctica, el contexto y el juicio que mantenemos alrededor de ella.",
  },
  en: {
    eyebrow: "Conceptual map",
    title: "The AI Fork",
    subtitle:
      "Technology does not decide on its own. The relationship we build with it does.",
    coreTitle: "AI",
    coreSubtitle: "Tool · infrastructure · relationship",
    dependencyLabel: "Dependency path",
    dependencyTitle: "Dependency",
    dependencySubtitle: "When AI replaces judgment",
    dependencyCards: [
      {
        title: "Passive consumption",
        body: "Using answers without developing real understanding of your own.",
      },
      {
        title: "Opaque platforms",
        body: "Relying on systems we neither control nor fully understand.",
      },
      {
        title: "Weakened judgment",
        body: "Confusing speed with thinking and automation with discernment.",
      },
      {
        title: "Centralized power",
        body: "Concentrating capability in a few companies, models, and infrastructures.",
      },
      {
        title: "Generic output",
        body: "Producing more content, but with less voice, context, and purpose.",
      },
    ],
    capabilityLabel: "Capability path",
    capabilityTitle: "Capability",
    capabilitySubtitle: "When AI amplifies agency",
    capabilityCards: [
      {
        title: "Human judgment",
        body: "Using AI as support, not as a replacement for discernment.",
      },
      {
        title: "Local tools",
        body: "Building solutions shaped around the real context of a community or region.",
      },
      {
        title: "Deeper learning",
        body: "Getting help to understand, practice, and strengthen real skills.",
      },
      {
        title: "Independent builders",
        body: "Enabling individuals and small teams to build more with less friction.",
      },
      {
        title: "Context-rich creativity",
        body: "Using AI to explore options without losing voice, taste, or intent.",
      },
    ],
    leversTitle: "What decides the path",
    decisionLevers: [
      {
        title: "Education",
        body: "Do we use it to learn or to avoid learning?",
      },
      {
        title: "Ownership",
        body: "Do we control part of the infrastructure or only rent it?",
      },
      {
        title: "Local context",
        body: "Does it solve real problems in our own environment?",
      },
      {
        title: "Human review",
        body: "Does human judgment remain at the center?",
      },
      {
        title: "Builder culture",
        body: "Do we use it to consume more or to build better?",
      },
    ],
    takeawayLead: "AI can make us more dependent or more capable.",
    takeawayBody:
      "The difference lies in the practice, context, and judgment we keep around it.",
  },
} as const;

export type AIForkDiagramProps = {
  locale?: PostLanguage;
};

export function AIForkDiagram({ locale = "es" }: AIForkDiagramProps) {
  const copy = copyByLanguage[locale];

  return (
    <section className={styles.aiFork} aria-labelledby="ai-fork-title">
      <header className={styles.header}>
        <p className={styles.eyebrow}>{copy.eyebrow}</p>
        <h2 id="ai-fork-title">{copy.title}</h2>
        <p>{copy.subtitle}</p>
      </header>

      <div className={styles.flow} aria-hidden="true">
        <span />
      </div>

      <div className={styles.coreNode}>
        <span>{copy.coreTitle}</span>
        <small>{copy.coreSubtitle}</small>
      </div>

      <div className={styles.forkLines} aria-hidden="true">
        <span />
        <span />
      </div>

      <div className={styles.paths}>
        <article className={`${styles.pathCard} ${styles.dependency}`}>
          <div className={styles.pathHeader}>
            <p className={styles.pathLabel}>{copy.dependencyLabel}</p>
            <h3>{copy.dependencyTitle}</h3>
            <p>{copy.dependencySubtitle}</p>
          </div>

          <div className={styles.cardList}>
            {copy.dependencyCards.map((card) => (
              <div className={styles.signalCard} key={card.title}>
                <span className={styles.signalDot} aria-hidden="true" />
                <div>
                  <h4>{card.title}</h4>
                  <p>{card.body}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className={`${styles.pathCard} ${styles.capability}`}>
          <div className={styles.pathHeader}>
            <p className={styles.pathLabel}>{copy.capabilityLabel}</p>
            <h3>{copy.capabilityTitle}</h3>
            <p>{copy.capabilitySubtitle}</p>
          </div>

          <div className={styles.cardList}>
            {copy.capabilityCards.map((card) => (
              <div className={styles.signalCard} key={card.title}>
                <span className={styles.signalDot} aria-hidden="true" />
                <div>
                  <h4>{card.title}</h4>
                  <p>{card.body}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>

      <section className={styles.levers} aria-labelledby="ai-fork-levers">
        <div className={styles.leverHeader}>
          <span aria-hidden="true" />
          <h3 id="ai-fork-levers">{copy.leversTitle}</h3>
        </div>

        <div className={styles.leverGrid}>
          {copy.decisionLevers.map((lever) => (
            <article className={styles.leverCard} key={lever.title}>
              <h4>{lever.title}</h4>
              <p>{lever.body}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className={styles.takeaway}>
        <p>{copy.takeawayLead}</p>
        <p>{copy.takeawayBody}</p>
      </footer>
    </section>
  );
}
