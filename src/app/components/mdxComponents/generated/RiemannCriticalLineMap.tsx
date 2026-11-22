"use client";

import React, { useState } from "react";
import styles from "./RiemannDiagrams.module.css";

type InspectionId = "line" | "forbidden" | "z1" | "z2" | "z3" | "z4";

const ZERO_NODES: Array<{
  id: InspectionId;
  t: number;
  label: string;
  tag: string;
  title: string;
  note: string;
  metric: string;
}> = [
  {
    id: "z1",
    t: 14.13,
    label: "ρ₁",
    tag: "CERO ρ₁ · t ≈ 14.13",
    title: "Primer cero no trivial de la función Zeta",
    note: "En este punto la función ζ(s) cae exactamente a cero. Funciona como la primera 'frecuencia armónica' que regula el ritmo de los números primos.",
    metric: "s = 1/2 + 14.1347i",
  },
  {
    id: "z2",
    t: 21.02,
    label: "ρ₂",
    tag: "CERO ρ₂ · t ≈ 21.02",
    title: "Segundo armónico en la misma columna",
    note: "A pesar de que el paisaje complejo se ondula en todas direcciones, este segundo valle vuelve a caer milimétricamente sobre Re(s) = 1/2.",
    metric: "s = 1/2 + 21.0220i",
  },
  {
    id: "z3",
    t: 25.01,
    label: "ρ₃",
    tag: "CERO ρ₃ · t ≈ 25.01",
    title: "Tercer cero: más cerca de lo esperado",
    note: "Los ceros no son equidistantes: su espaciado se parece al espectro de energía de sistemas cuánticos caóticos, un puente inesperado entre aritmética y física.",
    metric: "s = 1/2 + 25.0109i",
  },
  {
    id: "z4",
    t: 30.42,
    label: "ρ₄",
    tag: "CERO ρ₄ · t ≈ 30.42",
    title: "Cuarto cero (y billones más verificados antes)",
    note: "Las computadoras ya habían comprobado los primeros billones de ceros uno por uno. Pero comprobar billones no prueba infinitos: para eso hacía falta una demostración lógica completa.",
    metric: "s = 1/2 + 30.4249i",
  },
];

const REGION_DETAILS: Record<
  "line" | "forbidden",
  { tag: string; title: string; note: string; metric: string }
> = {
  line: {
    tag: "LÍNEA CRÍTICA · Re(s) = 1/2",
    title: "La columna vertebral que ordena a los primos",
    note: "La Hipótesis de Riemann afirma que absolutamente TODOS los ceros no triviales viven sobre este único meridiano naranja. Que ningún cero se desvíe a la derecha equivale a que los primos estén distribuidos con el máximo equilibrio posible.",
    metric: "Re(s) = 0.5 · Infinitos ceros alineados",
  },
  forbidden: {
    tag: "ZONA SELLADA · 1/2 < Re(s) < 1",
    title: "Lo que bloquea la Desigualdad (M) de la nueva prueba",
    note: "Si existiera un solo cero en esta franja derecha, generaría una 'onda rebelde' que desestabilizaría el conteo de primos. El corazón de la prueba en Lean establece una desigualdad sobre sumas ponderadas de potencias de primos que vuelve imposible que aparezca un cero aquí.",
    metric: "Cero vacíos · Re(s) > 1/2 prohibido",
  },
};

// Axonometric projection helper: maps (re in [0..1], t in [0..36], z height) -> (x, y)
function project(re: number, t: number, z = 0): [number, number] {
  const originX = 150;
  const originY = 238;
  const x = originX + re * 205 + (t / 36) * 345;
  const y = originY + re * 84 - (t / 36) * 168 - z;
  return [Number(x.toFixed(1)), Number(y.toFixed(1))];
}

function makePoly(points: Array<[number, number]>): string {
  return points.map(([x, y]) => `${x},${y}`).join(" ");
}

export function RiemannCriticalLineMap() {
  const [selected, setSelected] = useState<InspectionId>("line");

  const activeInfo =
    selected === "line" || selected === "forbidden"
      ? REGION_DETAILS[selected]
      : (ZERO_NODES.find((z) => z.id === selected) ?? REGION_DETAILS.line);

  const stripOutline = makePoly([
    project(0, 0),
    project(1, 0),
    project(1, 36),
    project(0, 36),
  ]);

  const forbiddenZone = makePoly([
    project(0.5, 0),
    project(1, 0),
    project(1, 36),
    project(0.5, 36),
  ]);

  const [critStartX, critStartY] = project(0.5, 0);
  const [critEndX, critEndY] = project(0.5, 36);

  // Build isometric wireframe wave ribbons along t
  const wavePaths = [0.15, 0.32, 0.68, 0.85].map((re) => {
    const cmds: string[] = [];
    for (let t = 0; t <= 36; t += 1.2) {
      const distFromLine = Math.abs(re - 0.5);
      const ripple =
        Math.sin(t * 0.45) * (9 + distFromLine * 16) +
        Math.cos(t * 0.22 + re * 4) * 5;
      const elevation = 14 + distFromLine * 22 + ripple * 0.55;
      const [px, py] = project(re, t, elevation);
      cmds.push(`${t === 0 ? "M" : "L"} ${px} ${py}`);
    }
    return { re, d: cmds.join(" ") };
  });

  // Cross-section ribs
  const crossRibs = [4, 10, 14.13, 21.02, 25.01, 30.42, 34].map((t) => {
    const cmds: string[] = [];
    const isZeroSlice = ZERO_NODES.some((z) => Math.abs(z.t - t) < 0.05);
    for (let step = 0; step <= 16; step++) {
      const re = step / 16;
      const dist = Math.abs(re - 0.5);
      const z = isZeroSlice
        ? Math.pow(dist * 2, 1.55) * 34
        : 14 + dist * 20 + Math.sin(t * 0.45) * 6;
      const [px, py] = project(re, t, z);
      cmds.push(`${step === 0 ? "M" : "L"} ${px} ${py}`);
    }
    return { t, isZeroSlice, d: cmds.join(" ") };
  });

  return (
    <section
      className={styles.plate}
      aria-labelledby="riemann-critical-title"
    >
      <header className={styles.titleBlock}>
        <div className={styles.titleCell}>
          <p className={styles.sheetCode}>PLANO 02/03 · FRANJA CRÍTICA</p>
          <h3 id="riemann-critical-title" className={styles.plateTitle}>
            Paisaje axonométrico de ζ(s) y la Línea Crítica
          </h3>
          <p className={styles.plateSubtitle}>
            Todos los ceros no triviales convergen sobre un único meridiano
            (Re = 1/2), dejando vacía la zona prohibida a la derecha.
          </p>
        </div>

        <div className={styles.metaCell}>
          <span className={styles.metaKey}>VISTA</span>
          <span className={styles.metaVal}>AXONOMÉTRICA</span>
          <span className={styles.metaKey}>FRANJA</span>
          <span className={styles.metaVal}>0 &lt; Re(s) &lt; 1</span>
          <span className={styles.metaKey}>EJE</span>
          <span className={styles.metaVal}>Re(s) = 1/2</span>
        </div>

        <div className={styles.swatchCell}>
          <div className={styles.swatches} aria-hidden="true">
            <span className={styles.swatch} style={{ background: "#FA541C" }} />
            <span className={styles.swatch} style={{ background: "#58A69E" }} />
            <span className={styles.swatch} style={{ background: "#D8B878" }} />
            <span className={styles.swatch} style={{ background: "#7C8CE0" }} />
          </div>
          <div className={styles.compass} aria-hidden="true">
            <span>Im(s)</span>
            <span className={styles.compassRing}>↗</span>
          </div>
        </div>
      </header>

      <div className={styles.controlsBar}>
        <p className={styles.controlHint}>
          Inspecciona una zona o haz clic sobre cualquier cero (ρ₁–ρ₄):
        </p>
        <div className={styles.segmented} role="group" aria-label="Inspección del plano">
          <button
            type="button"
            className={styles.segButton}
            data-active={selected === "line"}
            onClick={() => setSelected("line")}
          >
            Línea Crítica (1/2)
          </button>
          <button
            type="button"
            className={styles.segButton}
            data-active={selected === "forbidden"}
            onClick={() => setSelected("forbidden")}
          >
            Zona sellada (&gt; 1/2)
          </button>
          {ZERO_NODES.map((z) => (
            <button
              key={z.id}
              type="button"
              className={styles.segButton}
              data-active={selected === z.id}
              onClick={() => setSelected(z.id)}
            >
              {z.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.canvasWrap}>
        <svg
          className={styles.svg}
          viewBox="0 0 760 360"
          role="img"
          aria-label="Mapa axonométrico de la franja crítica de Riemann con anillos de contorno alrededor de los primeros cuatro ceros no triviales alineados en Re(s) = 1/2"
        >
          <defs>
            <pattern
              id="forbiddenHatch"
              width="8"
              height="8"
              patternTransform="rotate(35 0 0)"
              patternUnits="userSpaceOnUse"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="8"
                stroke="rgba(88, 166, 158, 0.24)"
                strokeWidth="1"
              />
            </pattern>
          </defs>

          {/* Subtle Hanok-style concentric reference ripples on base plane */}
          {[55, 95, 138, 182].map((rx, idx) => (
            <ellipse
              key={rx}
              cx="422"
              cy="192"
              rx={rx}
              ry={rx * 0.44}
              fill="none"
              stroke="rgba(237, 237, 230, 0.055)"
              strokeWidth="1"
              strokeDasharray={idx % 2 === 1 ? "4 5" : undefined}
              transform="rotate(-24 422 192)"
            />
          ))}

          {/* Base critical strip plane */}
          <polygon
            points={stripOutline}
            fill="rgba(255, 255, 255, 0.02)"
            stroke="rgba(237, 237, 230, 0.22)"
            strokeWidth="1"
          />

          {/* Sealed forbidden half Re(s) > 1/2 */}
          <polygon
            points={forbiddenZone}
            fill="url(#forbiddenHatch)"
            stroke={
              selected === "forbidden"
                ? "#58A69E"
                : "rgba(88, 166, 158, 0.35)"
            }
            strokeWidth={selected === "forbidden" ? "1.6" : "1"}
            className={styles.interactiveLayer}
            onClick={() => setSelected("forbidden")}
          />

          {/* Longitudinal Re grid lines */}
          {[0.25, 0.75].map((re) => {
            const [x1, y1] = project(re, 0);
            const [x2, y2] = project(re, 36);
            return (
              <line
                key={re}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(237, 237, 230, 0.09)"
                strokeDasharray="3 5"
              />
            );
          })}

          {/* Elevated axonometric wireframe landscape */}
          {crossRibs.map((rib) => (
            <path
              key={rib.t}
              d={rib.d}
              fill="none"
              stroke={
                rib.isZeroSlice
                  ? "rgba(216, 184, 120, 0.48)"
                  : "rgba(88, 166, 158, 0.22)"
              }
              strokeWidth={rib.isZeroSlice ? "1.2" : "0.9"}
            />
          ))}

          {wavePaths.map((ribbon) => (
            <path
              key={ribbon.re}
              d={ribbon.d}
              fill="none"
              stroke={
                ribbon.re > 0.5
                  ? "rgba(88, 166, 158, 0.45)"
                  : "rgba(124, 140, 224, 0.42)"
              }
              strokeWidth="1.15"
            />
          ))}

          {/* Glowing Critical Line Re(s) = 1/2 */}
          <line
            x1={critStartX}
            y1={critStartY}
            x2={critEndX}
            y2={critEndY}
            stroke="#FA541C"
            strokeWidth={selected === "line" ? "3" : "2.2"}
            className={styles.interactiveLayer}
            onClick={() => setSelected("line")}
          />

          {/* Zero pins + local contour rings */}
          {ZERO_NODES.map((node) => {
            const [zx, zy] = project(0.5, node.t, 0);
            const [topX, topY] = project(0.5, node.t, 44);
            const isSelected = selected === node.id;

            return (
              <g
                key={node.id}
                className={styles.interactiveNode}
                onClick={() => setSelected(node.id)}
                role="button"
                tabIndex={0}
                aria-label={`${node.label}: ${node.metric}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(node.id);
                  }
                }}
              >
                {/* Local contour ellipses around zero */}
                <ellipse
                  cx={zx}
                  cy={zy}
                  rx="18"
                  ry="8"
                  fill="none"
                  stroke={
                    isSelected
                      ? "rgba(250, 84, 28, 0.65)"
                      : "rgba(216, 184, 120, 0.35)"
                  }
                  strokeWidth="1"
                  transform={`rotate(-24 ${zx} ${zy})`}
                />
                {/* Vertical architectural callout pin */}
                <line
                  x1={zx}
                  y1={zy}
                  x2={topX}
                  y2={topY}
                  stroke={isSelected ? "#FA541C" : "rgba(237, 237, 230, 0.38)"}
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
                {isSelected && (
                  <circle
                    cx={zx}
                    cy={zy}
                    r="10"
                    fill="none"
                    stroke="#FA541C"
                    strokeWidth="1.2"
                    className={styles.pulseRing}
                  />
                )}
                <circle
                  cx={zx}
                  cy={zy}
                  r={isSelected ? "5.5" : "4"}
                  fill={isSelected ? "#FA541C" : "#0C0D0F"}
                  stroke="#FA541C"
                  strokeWidth="1.8"
                />
                <text
                  x={topX}
                  y={topY - 6}
                  textAnchor="middle"
                  fill={isSelected ? "#FA541C" : "#EDEDE6"}
                  fontSize="11"
                  fontWeight="700"
                  fontFamily="ui-monospace, monospace"
                >
                  {node.label}
                </text>
              </g>
            );
          })}

          {/* Coordinate annotations */}
          <text
            x={project(0, 0)[0] - 8}
            y={project(0, 0)[1] + 18}
            fill="rgba(237, 237, 230, 0.55)"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            Re = 0
          </text>
          <text
            x={critStartX - 18}
            y={critStartY + 24}
            fill="#FA541C"
            fontSize="10"
            fontWeight="700"
            fontFamily="ui-monospace, monospace"
          >
            Re = 1/2
          </text>
          <text
            x={project(1, 0)[0] - 12}
            y={project(1, 0)[1] + 20}
            fill="rgba(237, 237, 230, 0.55)"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            Re = 1
          </text>
          <text
            x={project(0.84, 18)[0]}
            y={project(0.84, 18)[1] + 38}
            fill="#58A69E"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            ZONA SELLADA (SIN CEROS)
          </text>
          <text
            x={critEndX + 10}
            y={critEndY + 4}
            fill="rgba(237, 237, 230, 0.62)"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            Im(s) → ∞
          </text>
        </svg>
      </div>

      <div className={styles.readout}>
        <span className={styles.readoutTag}>{activeInfo.tag}</span>
        <div className={styles.readoutBody}>
          <h4>{activeInfo.title}</h4>
          <p>{activeInfo.note}</p>
          <div className={styles.readoutMetrics}>
            <span className={styles.metricChip}>{activeInfo.metric}</span>
          </div>
        </div>
      </div>

      <footer className={styles.legendBar}>
        <div className={styles.legendSection}>
          <span className={styles.legendItem}>
            <span className={styles.legendLine} style={{ background: "#FA541C" }} />
            Línea crítica Re = 1/2
          </span>
          <span className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: "#58A69E" }} />
            Zona sellada (Desigualdad M)
          </span>
          <span className={styles.legendItem}>
            <span className={styles.legendLine} style={{ background: "#D8B878" }} />
            Cortes en ceros ρₙ
          </span>
        </div>

        <div className={styles.scaleSection} aria-hidden="true">
          <div className={styles.scaleBar}>
            <span />
            <span />
            <span />
            <span />
          </div>
          <span>PLANO COMPLEJO ℂ</span>
        </div>

        <div className={styles.specSection}>
          <strong>RIEMANN · 1859</strong>
          <span>HOJA 02/03 · ZETA</span>
        </div>
      </footer>
    </section>
  );
}
