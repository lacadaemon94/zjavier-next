"use client";

import React, { useState } from "react";
import styles from "./RiemannDiagrams.module.css";

type LayerId = "impact" | "lean" | "machinery" | "origin";

const LAYERS: Array<{
  id: LayerId;
  code: string;
  shortLabel: string;
  color: string;
  yOffset: number;
  title: string;
  summary: string;
  chips: string[];
}> = [
  {
    id: "impact",
    code: "CAPA 04",
    shortLabel: "Efecto dominó",
    color: "#FA541C",
    yOffset: 54,
    title: "Lo que se desbloquea más allá del millón de dólares",
    summary:
      "Cientos de teoremas en teoría de números, análisis de algoritmos y primalidad que llevaban décadas con el asterisco 'asumiendo RH' pasan a terreno firme. Y lo más valioso: la maquinaria creada puede atacar otros problemas abiertos en funciones L.",
    chips: [
      "Teoremas condicionales → incondicionales",
      "RSA / HTTPS NO se rompe",
      "Nuevas rutas en teoría de números",
    ],
  },
  {
    id: "lean",
    code: "CAPA 03",
    shortLabel: "Kernel Lean",
    color: "#58A69E",
    yOffset: 132,
    title: "Verificación mecánica: ~17 millones de líneas sin grietas lógicas",
    summary:
      "A diferencia de un PDF de 200 páginas donde un error puede ocultarse años, la prueba fue escrita en Lean (más de 175,000 módulos) y compiló usando solo los 3 axiomas estándar (propext, Classical.choice, Quot.sound). Ahora viene el trabajo humano: destilarla y comprenderla.",
    chips: [
      "~17M líneas en Lean",
      "0 huecos (sorry)",
      "Auditado por Lean FRO / Mathlib",
    ],
  },
  {
    id: "machinery",
    code: "CAPA 02",
    shortLabel: "Matemática nueva",
    color: "#D8B878",
    yOffset: 210,
    title: "El motor analítico: Desigualdad (M), Fourier y levantamientos theta",
    summary:
      "Igual que Fermat obligó a tender puentes entre curvas elípticas y formas modulares, aquí el avance combina una desigualdad central sobre sumas ponderadas de primos con ideas de multiplicidad tipo Stepanov, análisis de Fourier y encadenamiento de levantamientos theta (técnicas automórficas).",
    chips: [
      "Desigualdad (M)",
      "Análisis de Fourier en enteros",
      "Theta lifts / teoría automórfica",
    ],
  },
  {
    id: "origin",
    code: "CAPA 01",
    shortLabel: "Humano + IA",
    color: "#7C8CE0",
    yOffset: 288,
    title: "Dirección humana + escala computacional de exploración",
    summary:
      "Levent Alpöge aportó la estrategia matemática y el criterio; Claude aceleró durante seis semanas la exploración, construcción de lemas intermedios y formalización masiva en Lean. Un nuevo flujo científico: la IA explora a escala, Lean verifica con rigor absoluto, y el humano juzga y entiende.",
    chips: [
      "Levent Alpöge + Claude",
      "6 semanas de formalización",
      "20–21 nov 2026",
    ],
  },
];

function isoDiamond(cx: number, cy: number, rx = 185, ry = 54): string {
  return [
    `${cx},${cy - ry}`,
    `${cx + rx},${cy}`,
    `${cx},${cy + ry}`,
    `${cx - rx},${cy}`,
  ].join(" ");
}

export function RiemannProofArchitecture() {
  const [activeId, setActiveId] = useState<LayerId>("machinery");
  const activeLayer =
    LAYERS.find((layer) => layer.id === activeId) ?? LAYERS[2];

  const cx = 365;
  const rx = 175;
  const ry = 48;

  return (
    <section
      className={styles.plate}
      aria-labelledby="riemann-arch-title"
    >
      <header className={styles.titleBlock}>
        <div className={styles.titleCell}>
          <p className={styles.sheetCode}>PLANO 03/03 · DESPIECE AXONOMÉTRICO</p>
          <h3 id="riemann-arch-title" className={styles.plateTitle}>
            Arquitectura del avance: por qué importa la maquinaria nueva
          </h3>
          <p className={styles.plateSubtitle}>
            Cuatro capas apiladas desde la intuición humana y la IA hasta la
            verificación formal y su efecto dominó en las matemáticas.
          </p>
        </div>

        <div className={styles.metaCell}>
          <span className={styles.metaKey}>VISTA</span>
          <span className={styles.metaVal}>DESPIECE 3D</span>
          <span className={styles.metaKey}>CAPAS</span>
          <span className={styles.metaVal}>04 MÓDULOS</span>
          <span className={styles.metaKey}>ESTADO</span>
          <span className={styles.metaVal}>LEAN VERIFICADO</span>
        </div>

        <div className={styles.swatchCell}>
          <div className={styles.swatches} aria-hidden="true">
            <span className={styles.swatch} style={{ background: "#FA541C" }} />
            <span className={styles.swatch} style={{ background: "#58A69E" }} />
            <span className={styles.swatch} style={{ background: "#D8B878" }} />
            <span className={styles.swatch} style={{ background: "#7C8CE0" }} />
          </div>
          <div className={styles.compass} aria-hidden="true">
            <span>STACK</span>
            <span className={styles.compassRing}>▲</span>
          </div>
        </div>
      </header>

      <div className={styles.controlsBar}>
        <p className={styles.controlHint}>
          Selecciona una capa en los botones o directamente en el diagrama:
        </p>
        <div className={styles.segmented} role="group" aria-label="Capas de la prueba">
          {LAYERS.map((layer) => (
            <button
              key={layer.id}
              type="button"
              className={styles.segButton}
              data-active={activeId === layer.id}
              onClick={() => setActiveId(layer.id)}
            >
              {layer.code} · {layer.shortLabel}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.canvasWrap}>
        <svg
          className={styles.svg}
          viewBox="0 0 760 365"
          role="img"
          aria-label="Diagrama axonométrico en capas explotadas mostrando las 4 capas de la prueba de Riemann: Humano más IA, Matemática nueva, Kernel Lean y Efecto dominó"
        >
          {/* Vertical dashed alignment guides linking the 4 stacked slabs */}
          {[
            [cx, 54 - ry, cx, 288 + ry],
            [cx - rx, 54, cx - rx, 288],
            [cx + rx, 54, cx + rx, 288],
          ].map(([x1, y1, x2, y2], idx) => (
            <line
              key={idx}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(237, 237, 230, 0.14)"
              strokeWidth="1"
              strokeDasharray="3 5"
            />
          ))}

          {/* Render from bottom (origin) to top (impact) so upper slabs overlap naturally */}
          {[...LAYERS].reverse().map((layer) => {
            const isSelected = layer.id === activeId;
            const cy = layer.yOffset + (isSelected ? -6 : 0);

            return (
              <g
                key={layer.id}
                className={styles.interactiveLayer}
                opacity={isSelected ? 1 : 0.62}
                onClick={() => setActiveId(layer.id)}
                role="button"
                tabIndex={0}
                aria-label={`${layer.code}: ${layer.shortLabel}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveId(layer.id);
                  }
                }}
              >
                {/* Slab shadow / thickness lip */}
                <polygon
                  points={isoDiamond(cx, cy + 7, rx, ry)}
                  fill="rgba(0, 0, 0, 0.45)"
                  stroke={layer.color}
                  strokeOpacity={isSelected ? 0.55 : 0.2}
                  strokeWidth="0.9"
                />

                {/* Main isometric slab */}
                <polygon
                  points={isoDiamond(cx, cy, rx, ry)}
                  fill={isSelected ? `${layer.color}24` : "rgba(18, 20, 24, 0.92)"}
                  stroke={layer.color}
                  strokeWidth={isSelected ? "1.8" : "1.1"}
                />

                {/* Subtle internal architectural cross-grid on each slab */}
                <line
                  x1={cx - rx * 0.5}
                  y1={cy - ry * 0.5}
                  x2={cx + rx * 0.5}
                  y2={cy + ry * 0.5}
                  stroke={layer.color}
                  strokeOpacity="0.24"
                  strokeWidth="0.8"
                />
                <line
                  x1={cx - rx * 0.5}
                  y1={cy + ry * 0.5}
                  x2={cx + rx * 0.5}
                  y2={cy - ry * 0.5}
                  stroke={layer.color}
                  strokeOpacity="0.24"
                  strokeWidth="0.8"
                />

                {/* Right callout leader line + architectural label */}
                <line
                  x1={cx + rx + 6}
                  y1={cy}
                  x2={cx + rx + 36}
                  y2={cy}
                  stroke={isSelected ? layer.color : "rgba(237, 237, 230, 0.25)"}
                  strokeWidth={isSelected ? "1.4" : "1"}
                />
                <circle
                  cx={cx + rx}
                  cy={cy}
                  r={isSelected ? "4" : "2.6"}
                  fill={layer.color}
                />
                <text
                  x={cx + rx + 44}
                  y={cy - 3}
                  fill={isSelected ? layer.color : "rgba(237, 237, 230, 0.55)"}
                  fontSize="9.5"
                  fontWeight="700"
                  fontFamily="ui-monospace, monospace"
                >
                  {layer.code}
                </text>
                <text
                  x={cx + rx + 44}
                  y={cy + 11}
                  fill={isSelected ? "#F6FBFC" : "rgba(237, 237, 230, 0.78)"}
                  fontSize="12"
                  fontWeight="600"
                  fontFamily="var(--font-outfit), sans-serif"
                >
                  {layer.shortLabel}
                </text>

                {/* Left registration code */}
                <text
                  x={cx - rx - 14}
                  y={cy + 3}
                  textAnchor="end"
                  fill="rgba(237, 237, 230, 0.35)"
                  fontSize="9"
                  fontFamily="ui-monospace, monospace"
                >
                  {layer.code.replace("CAPA ", "L-")}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className={styles.readout}>
        <span className={styles.readoutTag}>{activeLayer.code}</span>
        <div className={styles.readoutBody}>
          <h4>{activeLayer.title}</h4>
          <p>{activeLayer.summary}</p>
          <div className={styles.readoutMetrics}>
            {activeLayer.chips.map((chip) => (
              <span key={chip} className={styles.metricChip}>
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      <footer className={styles.legendBar}>
        <div className={styles.legendSection}>
          <span className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: "#7C8CE0" }} />
            Dirección + IA
          </span>
          <span className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: "#D8B878" }} />
            Maquinaria nueva
          </span>
          <span className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: "#58A69E" }} />
            Verificación Lean
          </span>
          <span className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: "#FA541C" }} />
            Efecto dominó
          </span>
        </div>

        <div className={styles.scaleSection} aria-hidden="true">
          <div className={styles.scaleBar}>
            <span />
            <span />
            <span />
            <span />
          </div>
          <span>3 AXIOMAS · 0 SORRY</span>
        </div>

        <div className={styles.specSection}>
          <strong>ALPÖGE + CLAUDE</strong>
          <span>HOJA 03/03 · ARQUITECTURA</span>
        </div>
      </footer>
    </section>
  );
}
