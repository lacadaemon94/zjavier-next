"use client";

import React, { useState } from "react";
import styles from "./RiemannDiagrams.module.css";

type ScenarioId = "person" | "empty" | "budget";

const SCENARIOS: Record<
  ScenarioId,
  {
    tag: string;
    label: string;
    title: string;
    summary: string;
    aiJson: string;
    storageAction: string;
    costNote: string;
    activeSteps: number;
    accent: string;
  }
> = {
  person: {
    tag: "ALERTA: MEDIUM · PERSONA",
    label: "Persona / entrega",
    title: "Detecta persona, guarda clip con 5s de pre-roll y avisa en español",
    summary:
      "Al dispararse el evento, el worker verifica que haya presupuesto disponible, envía un solo fotograma (~60 KB) a Gemini Vision y recibe JSON bilingüe. Como has_person = true, empaqueta 15s de video (-c copy, sin recodificar) con los 5s previos en RAM y lo sube al bucket privado.",
    aiJson: '{"has_person": true, "alert_level": "medium", "summary_es": "Persona acercándose a la entrada principal."}',
    storageAction: "Sube miniatura + MP4 (~350 KB)",
    costNote: "~$0.0004 por evento",
    activeSteps: 5,
    accent: "#FA541C",
  },
  empty: {
    tag: "FILTRO SMART · RUIDO DESCARTADO",
    label: "Sombra / escena vacía",
    title: "Descarta falsos positivos antes de llenar el almacenamiento",
    summary:
      "Si una nube, sombra o cambio de luz disparó la alarma, Gemini responde alert_level = 'none'. El filtro inteligente evita subir un MP4 inútil y mantiene limpio el feed y dentro del Free Tier de Supabase (además de purgar clips tras 14 días).",
    aiJson: '{"has_person": false, "alert_level": "none", "summary_es": "Escena sin personas; solo cambio de iluminación."}',
    storageAction: "Sin MP4 pesado · Feed limpio",
    costNote: "Ahorra >80% de storage",
    activeSteps: 4,
    accent: "#58A69E",
  },
  budget: {
    tag: "HARD CAP · $5.00 / MES",
    label: "Tope mensual alcanzado",
    title: "Corte automático en 100% para cero sorpresas en la factura",
    summary:
      "Antes de cada llamada a la API, el worker consulta el gasto acumulado del mes en Supabase. Al 80% muestra una advertencia en la app Flutter; al 100% ($5 USD por defecto) corta las llamadas a Gemini automáticamente y registra una alerta de presupuesto.",
    aiJson: '{"budget_status": "exceeded", "spent_usd": 5.00, "action": "hard_stop_until_next_month"}',
    storageAction: "Video en vivo sigue 100% activo",
    costNote: "Máximo absoluto: $5/mes",
    activeSteps: 3,
    accent: "#D8B878",
  },
};

const PIPELINE_STEPS = [
  { x: 24, code: "01", title: "Alarma", sub: "Evento + 5s RAM" },
  { x: 168, code: "02", title: "Snapshot", sub: "1 JPEG ~60 KB" },
  { x: 312, code: "03", title: "Tope $5", sub: "Chequeo Supabase" },
  { x: 456, code: "04", title: "Gemini Vision", sub: "JSON EN + ES" },
  { x: 600, code: "05", title: "Storage + App", sub: "MP4 Smart / UI" },
];

export function OwlCamAiPipeline() {
  const [scenarioId, setScenarioId] = useState<ScenarioId>("person");
  const scenario = SCENARIOS[scenarioId];

  return (
    <section
      className={styles.plate}
      aria-labelledby="owlcam-ai-title"
    >
      <header className={styles.titleBlock}>
        <div className={styles.titleCell}>
          <p className={styles.sheetCode}>PLANO 03/03 · VISIÓN IA Y GUARDIA DE COSTO</p>
          <h3 id="owlcam-ai-title" className={styles.plateTitle}>
            Detección con IA bilingüe sin suscripciones ni facturas sorpresa
          </h3>
          <p className={styles.plateSubtitle}>
            Simula tres escenarios reales para ver cómo decide el worker de
            OwlCam entre guardar video, filtrar ruido o frenar por presupuesto.
          </p>
        </div>

        <div className={styles.metaCell}>
          <span className={styles.metaKey}>MODELO</span>
          <span className={styles.metaVal}>FLASH-LITE</span>
          <span className={styles.metaKey}>TOPE MES</span>
          <span className={styles.metaVal}>$5.00 HARD CAP</span>
          <span className={styles.metaKey}>RETENCIÓN</span>
          <span className={styles.metaVal}>14 DÍAS AUTO</span>
        </div>

        <div className={styles.swatchCell}>
          <div className={styles.swatches} aria-hidden="true">
            <span className={styles.swatch} style={{ background: "#FA541C" }} />
            <span className={styles.swatch} style={{ background: "#58A69E" }} />
            <span className={styles.swatch} style={{ background: "#D8B878" }} />
            <span className={styles.swatch} style={{ background: "#7C8CE0" }} />
          </div>
          <div className={styles.compass} aria-hidden="true">
            <span>AI</span>
            <span className={styles.compassRing}>$</span>
          </div>
        </div>
      </header>

      <div className={styles.controlsBar}>
        <p className={styles.controlHint}>Simula qué pasa en cada evento:</p>
        <div className={styles.segmented} role="group" aria-label="Escenario de evento IA">
          {(["person", "empty", "budget"] as const).map((id) => (
            <button
              key={id}
              type="button"
              className={styles.segButton}
              data-active={scenarioId === id}
              onClick={() => setScenarioId(id)}
            >
              {SCENARIOS[id].label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.canvasWrap}>
        <svg
          className={styles.svg}
          viewBox="0 0 760 190"
          role="img"
          aria-label="Diagrama animado de 5 pasos del pipeline de visión con Gemini y guardia de presupuesto mensual de OwlCam"
        >
          {/* Connecting flow arrows between steps */}
          {PIPELINE_STEPS.slice(0, -1).map((step, idx) => {
            const isFlowActive = idx + 1 < scenario.activeSteps;
            const x1 = step.x + 124;
            const x2 = PIPELINE_STEPS[idx + 1].x;

            return (
              <g key={`link-${step.code}`}>
                <line
                  x1={x1}
                  y1="68"
                  x2={x2}
                  y2="68"
                  stroke={isFlowActive ? scenario.accent : "rgba(237, 237, 230, 0.16)"}
                  strokeWidth={isFlowActive ? "2" : "1.2"}
                  strokeDasharray="5 5"
                  className={isFlowActive ? styles.flowForward : undefined}
                />
              </g>
            );
          })}

          {/* 5 Step Cards */}
          {PIPELINE_STEPS.map((step, idx) => {
            const stepNum = idx + 1;
            const isActive = stepNum <= scenario.activeSteps;
            const isTerminal = stepNum === scenario.activeSteps;

            return (
              <g key={step.code} opacity={isActive ? 1 : 0.34}>
                <rect
                  x={step.x}
                  y="24"
                  width="124"
                  height="88"
                  rx="12"
                  fill={
                    isTerminal
                      ? `${scenario.accent}20`
                      : "rgba(20, 22, 26, 0.94)"
                  }
                  stroke={isActive ? scenario.accent : "rgba(237, 237, 230, 0.2)"}
                  strokeWidth={isTerminal ? "1.8" : "1.1"}
                />
                <text
                  x={step.x + 14}
                  y="45"
                  fill={isActive ? scenario.accent : "rgba(237, 237, 230, 0.45)"}
                  fontSize="9"
                  fontWeight="700"
                  fontFamily="ui-monospace, monospace"
                >
                  PASO {step.code}
                </text>
                <text
                  x={step.x + 14}
                  y="68"
                  fill="#F6FBFC"
                  fontSize="12"
                  fontWeight="700"
                  fontFamily="var(--font-museoModerno), sans-serif"
                >
                  {step.title}
                </text>
                <text
                  x={step.x + 14}
                  y="88"
                  fill="rgba(237, 237, 230, 0.64)"
                  fontSize="9.2"
                  fontFamily="ui-monospace, monospace"
                >
                  {step.sub}
                </text>
              </g>
            );
          })}

          {/* JSON payload preview bar */}
          <rect
            x="24"
            y="134"
            width="700"
            height="36"
            rx="8"
            fill="rgba(12, 13, 15, 0.92)"
            stroke="rgba(237, 237, 230, 0.14)"
          />
          <text
            x="38"
            y="156"
            fill={scenario.accent}
            fontSize="9.5"
            fontFamily="ui-monospace, monospace"
          >
            {scenario.aiJson}
          </text>
        </svg>
      </div>

      <div className={styles.readout}>
        <span className={styles.readoutTag}>{scenario.tag}</span>
        <div className={styles.readoutBody}>
          <h4>{scenario.title}</h4>
          <p>{scenario.summary}</p>
          <div className={styles.readoutMetrics}>
            <span className={styles.metricChip}>{scenario.storageAction}</span>
            <span className={styles.metricChip}>{scenario.costNote}</span>
          </div>
        </div>
      </div>

      <footer className={styles.legendBar}>
        <div className={styles.legendSection}>
          <span className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: "#FA541C" }} />
            Alerta real → Clip MP4
          </span>
          <span className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: "#58A69E" }} />
            Ruido → Filtrado
          </span>
          <span className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: "#D8B878" }} />
            Corte duro a los $5/mes
          </span>
        </div>

        <div className={styles.scaleSection} aria-hidden="true">
          <div className={styles.scaleBar}>
            <span />
            <span />
            <span />
            <span />
          </div>
          <span>SUPABASE RLS</span>
        </div>

        <div className={styles.specSection}>
          <strong>OWLCAM · AI WORKER</strong>
          <span>HOJA 03/03 · VISIÓN</span>
        </div>
      </footer>
    </section>
  );
}
