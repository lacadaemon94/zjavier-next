import styles from "./AIForkDiagram.module.css";

const dependencyCards = [
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
] as const;

const capabilityCards = [
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
] as const;

const decisionLevers = [
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
] as const;

export function AIForkDiagram() {
  return (
    <section className={styles.aiFork} aria-labelledby="ai-fork-title">
      <header className={styles.header}>
        <p className={styles.eyebrow}>Mapa conceptual</p>
        <h2 id="ai-fork-title">La bifurcación de la IA</h2>
        <p>
          La tecnología no decide sola. La relación que construimos con ella sí.
        </p>
      </header>

      <div className={styles.flow} aria-hidden="true">
        <span />
      </div>

      <div className={styles.coreNode}>
        <span>IA</span>
        <small>Herramienta · infraestructura · relación</small>
      </div>

      <div className={styles.forkLines} aria-hidden="true">
        <span />
        <span />
      </div>

      <div className={styles.paths}>
        <article className={`${styles.pathCard} ${styles.dependency}`}>
          <div className={styles.pathHeader}>
            <p className={styles.pathLabel}>Ruta de dependencia</p>
            <h3>Dependencia</h3>
            <p>Cuando la IA sustituye criterio</p>
          </div>

          <div className={styles.cardList}>
            {dependencyCards.map((card) => (
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
            <p className={styles.pathLabel}>Ruta de capacidad</p>
            <h3>Capacidad</h3>
            <p>Cuando la IA amplifica agencia</p>
          </div>

          <div className={styles.cardList}>
            {capabilityCards.map((card) => (
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
          <h3 id="ai-fork-levers">Lo que decide el camino</h3>
        </div>

        <div className={styles.leverGrid}>
          {decisionLevers.map((lever) => (
            <article className={styles.leverCard} key={lever.title}>
              <h4>{lever.title}</h4>
              <p>{lever.body}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className={styles.takeaway}>
        <p>La IA puede volvernos más dependientes o más capaces.</p>
        <p>
          La diferencia está en la práctica, el contexto y el juicio que
          mantenemos alrededor de ella.
        </p>
      </footer>
    </section>
  );
}
