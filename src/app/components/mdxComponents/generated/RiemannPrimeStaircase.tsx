"use client";

import React, { useMemo, useState } from "react";
import styles from "./RiemannDiagrams.module.css";

const PRIMES_UP_TO_100 = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
  73, 79, 83, 89, 97,
];

function countPrimes(n: number): number {
  let count = 0;
  for (const p of PRIMES_UP_TO_100) {
    if (p <= n) count += 1;
  }
  return count;
}

function liApprox(x: number): number {
  if (x <= 2) return 1.045;
  const steps = 64;
  const h = (x - 2) / steps;
  let sum = 0.5 * (1 / Math.log(2) + 1 / Math.log(x));
  for (let i = 1; i < steps; i++) {
    const t = 2 + i * h;
    sum += 1 / Math.log(t);
  }
  return 1.045 + sum * h;
}

const CHECKPOINTS = [
  {
    x: 10,
    label: "x = 10",
    title: "De cerca, los primos parecen saltar sin orden",
    note: "Hasta 10 hay 4 primos (2, 3, 5, 7). A escalas pequeñas la escalera se ve irregular, casi caprichosa.",
  },
  {
    x: 30,
    label: "x = 30",
    title: "Empieza a aparecer una tendencia suave",
    note: "Hasta 30 hay 10 primos. La curva suavizada Li(x) ya sigue muy de cerca la altura real de la escalera.",
  },
  {
    x: 60,
    label: "x = 60",
    title: "El 'ruido' se mantiene sorprendentemente contenido",
    note: "Hasta 60 hay 17 primos y la curva estima ~20.6. La diferencia entre ambos es exactamente el error que Riemann quiso acotar.",
  },
  {
    x: 100,
    label: "x = 100",
    title: "Qué garantiza la Hipótesis de Riemann",
    note: "Hasta 100 hay 25 primos (Li ≈ 30.1). La hipótesis asegura que, incluso hasta el infinito, esa oscilación nunca se descontrola: queda encerrada en un corredor estrecho.",
  },
] as const;

type Mode = "with" | "without";

export function RiemannPrimeStaircase() {
  const [mode, setMode] = useState<Mode>("with");
  const [activeX, setActiveX] = useState<number>(60);

  const width = 760;
  const height = 340;
  const pad = { top: 28, right: 34, bottom: 44, left: 52 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  const maxX = 100;
  const maxY = 42;

  const {
    staircasePath,
    liPath,
    corridorPath,
    primePoints,
    activeCheckpoint,
    activeStats,
  } = useMemo(() => {
    const sx = (x: number) => pad.left + (x / maxX) * plotW;
    const sy = (y: number) => pad.top + plotH - (y / maxY) * plotH;

    // Stepped staircase path for pi(x)
    const stepCommands: string[] = [`M ${sx(0)} ${sy(0)}`];
    let prevY = 0;
    for (let x = 1; x <= maxX; x++) {
      const currY = countPrimes(x);
      if (currY !== prevY) {
        stepCommands.push(`L ${sx(x)} ${sy(prevY)}`);
        stepCommands.push(`L ${sx(x)} ${sy(currY)}`);
        prevY = currY;
      }
    }
    stepCommands.push(`L ${sx(maxX)} ${sy(prevY)}`);

    // Smooth Li(x) curve & error corridor
    const upper: string[] = [];
    const lower: string[] = [];
    const liPts: string[] = [];

    for (let x = 2; x <= maxX; x += 2) {
      const li = liApprox(x);
      const halfBand =
        mode === "with"
          ? Math.min(4.8, 0.55 * Math.sqrt(x))
          : Math.min(13.5, 0.145 * x + 1.4);

      const yTop = Math.min(maxY, li + halfBand);
      const yBot = Math.max(0, li - halfBand);

      liPts.push(`${x === 2 ? "M" : "L"} ${sx(x).toFixed(1)} ${sy(li).toFixed(1)}`);
      upper.push(`${x === 2 ? "M" : "L"} ${sx(x).toFixed(1)} ${sy(yTop).toFixed(1)}`);
      lower.unshift(`L ${sx(x).toFixed(1)} ${sy(yBot).toFixed(1)}`);
    }

    const pts = PRIMES_UP_TO_100.map((p, idx) => ({
      p,
      cx: sx(p),
      cy: sy(idx + 1),
    }));

    const cp =
      CHECKPOINTS.find((item) => item.x === activeX) ?? CHECKPOINTS[2];
    const piVal = countPrimes(cp.x);
    const liVal = liApprox(cp.x);

    return {
      staircasePath: stepCommands.join(" "),
      liPath: liPts.join(" "),
      corridorPath: `${upper.join(" ")} ${lower.join(" ")} Z`,
      primePoints: pts,
      activeCheckpoint: cp,
      activeStats: {
        pi: piVal,
        li: liVal.toFixed(1),
        diff: Math.abs(liVal - piVal).toFixed(1),
      },
    };
  }, [mode, activeX, plotH, plotW, pad.left, pad.top]);

  const sx = (x: number) => pad.left + (x / maxX) * plotW;
  const sy = (y: number) => pad.top + plotH - (y / maxY) * plotH;

  return (
    <section
      className={styles.plate}
      aria-labelledby="riemann-staircase-title"
    >
      <header className={styles.titleBlock}>
        <div className={styles.titleCell}>
          <p className={styles.sheetCode}>PLANO 01/03 · DISTRIBUCIÓN DE PRIMOS</p>
          <h3 id="riemann-staircase-title" className={styles.plateTitle}>
            La escalera de los primos y el corredor de error
          </h3>
          <p className={styles.plateSubtitle}>
            Comparación entre el conteo real π(x), la curva suave Li(x) y qué tan
            acotado queda el desvío.
          </p>
        </div>

        <div className={styles.metaCell}>
          <span className={styles.metaKey}>VISTA</span>
          <span className={styles.metaVal}>PERFIL ANALÍTICO</span>
          <span className={styles.metaKey}>DOMINIO</span>
          <span className={styles.metaVal}>x ∈ [0, 100]</span>
          <span className={styles.metaKey}>MODO</span>
          <span className={styles.metaVal}>
            {mode === "with" ? "COTA RIEMANN" : "SIN COTA RH"}
          </span>
        </div>

        <div className={styles.swatchCell}>
          <div className={styles.swatches} aria-hidden="true">
            <span className={styles.swatch} style={{ background: "#FA541C" }} />
            <span className={styles.swatch} style={{ background: "#D8B878" }} />
            <span className={styles.swatch} style={{ background: "#58A69E" }} />
            <span className={styles.swatch} style={{ background: "#EDEDE6" }} />
          </div>
          <div className={styles.compass} aria-hidden="true">
            <span>π(x)</span>
            <span className={styles.compassRing}>↑</span>
          </div>
        </div>
      </header>

      <div className={styles.controlsBar}>
        <p className={styles.controlHint}>
          Alterna el corredor de error o toca un punto (x = 10, 30, 60, 100):
        </p>
        <div className={styles.segmented} role="group" aria-label="Modo de cota">
          <button
            type="button"
            className={styles.segButton}
            data-active={mode === "with"}
            onClick={() => setMode("with")}
          >
            Con cota de Riemann
          </button>
          <button
            type="button"
            className={styles.segButton}
            data-active={mode === "without"}
            onClick={() => setMode("without")}
          >
            Sin cota de Riemann
          </button>
        </div>
      </div>

      <div className={styles.canvasWrap}>
        <svg
          className={styles.svg}
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label="Gráfico arquitectónico de la escalera de números primos pi(x) frente a la curva suave Li(x) y su corredor de error"
        >
          {/* Drafting grid */}
          {[0, 10, 20, 30, 40].map((tickY) => (
            <g key={`y-${tickY}`}>
              <line
                x1={pad.left}
                y1={sy(tickY)}
                x2={width - pad.right}
                y2={sy(tickY)}
                stroke="rgba(237, 237, 230, 0.08)"
                strokeDasharray={tickY === 0 ? undefined : "3 4"}
              />
              <text
                x={pad.left - 10}
                y={sy(tickY) + 3}
                textAnchor="end"
                fill="rgba(237, 237, 230, 0.48)"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                {tickY}
              </text>
            </g>
          ))}

          {[0, 20, 40, 60, 80, 100].map((tickX) => (
            <g key={`x-${tickX}`}>
              <line
                x1={sx(tickX)}
                y1={pad.top}
                x2={sx(tickX)}
                y2={height - pad.bottom}
                stroke="rgba(237, 237, 230, 0.07)"
                strokeDasharray={tickX === 0 ? undefined : "2 5"}
              />
              <text
                x={sx(tickX)}
                y={height - pad.bottom + 18}
                textAnchor="middle"
                fill="rgba(237, 237, 230, 0.48)"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                {tickX}
              </text>
            </g>
          ))}

          {/* Axes */}
          <line
            x1={pad.left}
            y1={pad.top}
            x2={pad.left}
            y2={height - pad.bottom}
            stroke="rgba(237, 237, 230, 0.28)"
          />
          <line
            x1={pad.left}
            y1={height - pad.bottom}
            x2={width - pad.right}
            y2={height - pad.bottom}
            stroke="rgba(237, 237, 230, 0.28)"
          />

          {/* Error corridor */}
          <path
            d={corridorPath}
            fill={
              mode === "with"
                ? "rgba(250, 84, 28, 0.14)"
                : "rgba(88, 166, 158, 0.14)"
            }
            stroke={
              mode === "with"
                ? "rgba(250, 84, 28, 0.48)"
                : "rgba(88, 166, 158, 0.48)"
            }
            strokeWidth="1"
            strokeDasharray="4 4"
            style={{ transition: "all 0.35s ease" }}
          />

          {/* Smooth curve Li(x) */}
          <path
            d={liPath}
            fill="none"
            stroke="#D8B878"
            strokeWidth="1.75"
            strokeDasharray="6 3"
          />

          {/* Stepped prime staircase pi(x) */}
          <path
            d={staircasePath}
            fill="none"
            stroke="#EDEDE6"
            strokeWidth="1.8"
          />

          {/* Subtle dots at prime jumps */}
          {primePoints.map((pt) => (
            <circle
              key={pt.p}
              cx={pt.cx}
              cy={pt.cy}
              r="2"
              fill="#FA541C"
              opacity="0.72"
            />
          ))}

          {/* Interactive checkpoint pins */}
          {CHECKPOINTS.map((cp) => {
            const isSelected = cp.x === activeX;
            const cx = sx(cp.x);
            const cy = sy(countPrimes(cp.x));
            const liY = sy(liApprox(cp.x));

            return (
              <g
                key={cp.x}
                className={styles.interactiveNode}
                onClick={() => setActiveX(cp.x)}
                role="button"
                tabIndex={0}
                aria-label={`Inspeccionar ${cp.label}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveX(cp.x);
                  }
                }}
              >
                <line
                  x1={cx}
                  y1={liY}
                  x2={cx}
                  y2={cy}
                  stroke="#FA541C"
                  strokeWidth={isSelected ? "2" : "1"}
                  strokeDasharray="2 2"
                  opacity={isSelected ? 1 : 0.45}
                />
                {isSelected && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r="11"
                    fill="none"
                    stroke="#FA541C"
                    strokeWidth="1.2"
                    className={styles.pulseRing}
                  />
                )}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isSelected ? "6" : "4.5"}
                  fill={isSelected ? "#FA541C" : "#0C0D0F"}
                  stroke="#FA541C"
                  strokeWidth="1.8"
                />
                <text
                  x={cx}
                  y={pad.top - 8}
                  textAnchor="middle"
                  fill={isSelected ? "#FA541C" : "rgba(237, 237, 230, 0.55)"}
                  fontSize="10"
                  fontWeight={isSelected ? "700" : "400"}
                  fontFamily="ui-monospace, monospace"
                >
                  {cp.label}
                </text>
              </g>
            );
          })}

          {/* Axis labels */}
          <text
            x={width - pad.right}
            y={height - 10}
            textAnchor="end"
            fill="rgba(237, 237, 230, 0.5)"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            NÚMERO NATURAL (x) →
          </text>
          <text
            x={pad.left + 6}
            y={pad.top + 12}
            fill="rgba(237, 237, 230, 0.5)"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            CANTIDAD DE PRIMOS ≤ x
          </text>
        </svg>
      </div>

      <div className={styles.readout}>
        <span className={styles.readoutTag}>{activeCheckpoint.label}</span>
        <div className={styles.readoutBody}>
          <h4>{activeCheckpoint.title}</h4>
          <p>{activeCheckpoint.note}</p>
          <div className={styles.readoutMetrics}>
            <span className={styles.metricChip}>
              Primos reales π({activeCheckpoint.x}) = {activeStats.pi}
            </span>
            <span className={styles.metricChip}>
              Curva suave Li({activeCheckpoint.x}) ≈ {activeStats.li}
            </span>
            <span className={styles.metricChip}>
              Desvío actual ≈ {activeStats.diff}
            </span>
          </div>
        </div>
      </div>

      <footer className={styles.legendBar}>
        <div className={styles.legendSection}>
          <span className={styles.legendItem}>
            <span className={styles.legendLine} style={{ background: "#EDEDE6" }} />
            Escalera real π(x)
          </span>
          <span className={styles.legendItem}>
            <span className={styles.legendLine} style={{ background: "#D8B878" }} />
            Estimación suave Li(x)
          </span>
          <span className={styles.legendItem}>
            <span
              className={styles.legendDot}
              style={{ background: mode === "with" ? "#FA541C" : "#58A69E" }}
            />
            {mode === "with" ? "Corredor acotado (RH)" : "Margen amplio (sin RH)"}
          </span>
        </div>

        <div className={styles.scaleSection} aria-hidden="true">
          <div className={styles.scaleBar}>
            <span />
            <span />
            <span />
            <span />
          </div>
          <span>ESCALA 1:100</span>
        </div>

        <div className={styles.specSection}>
          <strong>PROYECTO #1859–2026</strong>
          <span>HOJA 01/03 · PRIMOS</span>
        </div>
      </footer>
    </section>
  );
}
