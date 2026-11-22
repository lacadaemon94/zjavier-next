"use client";

import React, { useState } from "react";
import styles from "./RiemannDiagrams.module.css";

type RouteMode = "lan" | "remote";
type OptId = "go" | "ringbuf" | "sqm" | "smart";

const OPTIMIZATIONS: Record<
  OptId,
  { tag: string; title: string; note: string; chips: string[] }
> = {
  go: {
    tag: "GO BRIDGE · ARM64",
    title: "De Python a binario en Go sin dependencias en el router",
    note: "El prototipo inicial en Python funcionaba, pero en un VPS de 1 solo vCPU cada paquete de video contaba. Reescribimos todo el hot-path (KCP + MO_O/V + RTSP + G.711) en Go y lo compilamos para ARM64 directo en el router OpenWrt.",
    chips: ["0 dependencias externas", "<1ms cámara ↔ bridge", "CPU mínima en VPS"],
  },
  ringbuf: {
    tag: "RING BUFFER · 5s RAM",
    title: "Pre-roll de 5 segundos en memoria antes del movimiento",
    note: "Un buffer circular acotado en RAM conserva siempre los últimos segundos de H.264 comenzando en un keyframe IDR limpio (con SPS/PPS). Así cada clip de alerta muestra qué pasó 5 segundos ANTES del disparo.",
    chips: ["~2.5 MB máx en RAM", "Inicio en IDR limpio", "Clips -c copy sin recodificar"],
  },
  sqm: {
    tag: "OPENWRT · CAKE + DSCP",
    title: "SQM (CAKE) + prioridad DSCP AF41 para cero bufferbloat",
    note: "Aplicamos colas CAKE en el router AX3000T y marcamos el túnel WireGuard con DSCP AF41. Resultado: ver la cámara desde fuera nunca dispara el ping en videojuegos ni afecta Netflix o YouTube en casa.",
    chips: ["layer_cake.qos", "DSCP AF41 en WireGuard", "MTU 1440 sin fragmentación"],
  },
  smart: {
    tag: "FLUTTER · SMART HD/SD",
    title: "Vista dividida en SD + Fullscreen automático en 1080p HD",
    note: "En pantalla dividida ambos lentes corren en 360p SD (ultraliviano y sin audio duplicado en Lente 2). Al tocar un lente para pantalla completa, la app pausa el lente oculto y sube el activo a 1080p HD dedicándole el 100% del ancho de banda.",
    chips: ["Lente 2 solo video", "Autodetección LAN en 450ms", "PTZ con pulso temporizado"],
  },
};

export function OwlCamDualPathTopology() {
  const [routeMode, setRouteMode] = useState<RouteMode>("lan");
  const [activeOpt, setActiveOpt] = useState<OptId>("go");

  const opt = OPTIMIZATIONS[activeOpt];

  return (
    <section
      className={styles.plate}
      aria-labelledby="owlcam-topology-title"
    >
      <header className={styles.titleBlock}>
        <div className={styles.titleCell}>
          <p className={styles.sheetCode}>PLANO 02/03 · TOPOLOGÍA DUAL Y FAST-PATH</p>
          <h3 id="owlcam-topology-title" className={styles.plateTitle}>
            Ruteo automático: menos de 3 ms en casa, WebRTC cifrado afuera
          </h3>
          <p className={styles.plateSubtitle}>
            La app Flutter detecta en 450 ms si estás en el Wi-Fi de casa para
            evitar subir video a internet, o conmuta al túnel WireGuard + TURN
            cuando sales en datos móviles.
          </p>
        </div>

        <div className={styles.metaCell}>
          <span className={styles.metaKey}>RUTA</span>
          <span className={styles.metaVal}>
            {routeMode === "lan" ? "LAN FAST-PATH" : "REMOTO 4G/5G"}
          </span>
          <span className={styles.metaKey}>LATENCIA</span>
          <span className={styles.metaVal}>
            {routeMode === "lan" ? "< 3 ms LOCAL" : "~80–160 ms"}
          </span>
          <span className={styles.metaKey}>SUBIDA ISP</span>
          <span className={styles.metaVal}>
            {routeMode === "lan" ? "0 Mbps" : "BAJO DEMANDA"}
          </span>
        </div>

        <div className={styles.swatchCell}>
          <div className={styles.swatches} aria-hidden="true">
            <span className={styles.swatch} style={{ background: "#FA541C" }} />
            <span className={styles.swatch} style={{ background: "#58A69E" }} />
            <span className={styles.swatch} style={{ background: "#D8B878" }} />
            <span className={styles.swatch} style={{ background: "#7C8CE0" }} />
          </div>
          <div className={styles.compass} aria-hidden="true">
            <span>WEBRTC</span>
            <span className={styles.compassRing}>⚡</span>
          </div>
        </div>
      </header>

      <div className={styles.controlsBar}>
        <div className={styles.segmented} role="group" aria-label="Modo de ruta">
          <button
            type="button"
            className={styles.segButton}
            data-active={routeMode === "lan"}
            onClick={() => setRouteMode("lan")}
          >
            En casa (Wi-Fi LAN Fast-Path)
          </button>
          <button
            type="button"
            className={styles.segButton}
            data-active={routeMode === "remote"}
            onClick={() => setRouteMode("remote")}
          >
            Fuera de casa (Celular / TURN)
          </button>
        </div>

        <div className={styles.segmented} role="group" aria-label="Optimizaciones">
          {(
            [
              ["go", "Go Bridge"],
              ["ringbuf", "Pre-roll 5s"],
              ["sqm", "SQM CAKE"],
              ["smart", "Smart HD/SD"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={styles.segButton}
              data-active={activeOpt === id}
              onClick={() => setActiveOpt(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.canvasWrap}>
        <svg
          className={styles.svg}
          viewBox="0 0 760 315"
          role="img"
          aria-label="Diagrama de topología dual mostrando la ruta local LAN Fast-Path en OpenWrt y la ruta remota sobre WireGuard, VPS, MediaMTX y coturn hacia la app Flutter"
        >
          {/* Home LAN boundary frame */}
          <rect
            x="18"
            y="20"
            width="430"
            height="274"
            rx="16"
            fill="rgba(255, 255, 255, 0.018)"
            stroke="rgba(237, 237, 230, 0.16)"
            strokeDasharray="4 4"
          />
          <text
            x="34"
            y="40"
            fill="rgba(237, 237, 230, 0.48)"
            fontSize="9.5"
            fontFamily="ui-monospace, monospace"
          >
            RED LOCAL DEL HOGAR (LAN)
          </text>

          {/* Cloud VPS boundary frame */}
          <rect
            x="472"
            y="20"
            width="270"
            height="145"
            rx="16"
            fill="rgba(255, 255, 255, 0.018)"
            stroke="rgba(88, 166, 158, 0.28)"
            strokeDasharray="4 4"
          />
          <text
            x="488"
            y="40"
            fill="#58A69E"
            fontSize="9.5"
            fontFamily="ui-monospace, monospace"
          >
            VPS 1-vCPU (DOCKER + WIREGUARD)
          </text>

          {/* Camera Node */}
          <rect
            x="36"
            y="66"
            width="136"
            height="84"
            rx="12"
            fill="rgba(20, 22, 26, 0.94)"
            stroke="rgba(237, 237, 230, 0.28)"
          />
          <text x="104" y="96" textAnchor="middle" fill="#F6FBFC" fontSize="11.5" fontWeight="700" fontFamily="var(--font-museoModerno), sans-serif">
            Cámara TY-Q2
          </text>
          <text x="104" y="114" textAnchor="middle" fill="rgba(237, 237, 230, 0.56)" fontSize="9" fontFamily="ui-monospace, monospace">
            KCP UDP :10000
          </text>
          <text x="104" y="130" textAnchor="middle" fill="#D8B878" fontSize="9" fontFamily="ui-monospace, monospace">
            4 canales H.264
          </text>

          {/* OpenWrt Router Node */}
          <rect
            x="224"
            y="58"
            width="206"
            height="100"
            rx="12"
            fill="rgba(250, 84, 28, 0.09)"
            stroke="#FA541C"
            strokeWidth="1.5"
          />
          <text x="327" y="80" textAnchor="middle" fill="#FA541C" fontSize="9" fontWeight="700" fontFamily="ui-monospace, monospace">
            OPENWRT AX3000T (ARM64)
          </text>
          <text x="327" y="101" textAnchor="middle" fill="#F6FBFC" fontSize="12" fontWeight="700" fontFamily="var(--font-museoModerno), sans-serif">
            Go Bridge + MediaMTX
          </text>
          <text x="327" y="120" textAnchor="middle" fill="rgba(237, 237, 230, 0.72)" fontSize="9.5" fontFamily="ui-monospace, monospace">
            Ring Buffer 5s · WHEP Local
          </text>
          <text x="327" y="138" textAnchor="middle" fill="#58A69E" fontSize="9" fontFamily="ui-monospace, monospace">
            SQM CAKE + DSCP AF41
          </text>

          {/* VPS Node */}
          <rect
            x="492"
            y="58"
            width="230"
            height="92"
            rx="12"
            fill={routeMode === "remote" ? "rgba(88, 166, 158, 0.14)" : "rgba(20, 22, 26, 0.9)"}
            stroke={routeMode === "remote" ? "#58A69E" : "rgba(88, 166, 158, 0.35)"}
            strokeWidth={routeMode === "remote" ? "1.6" : "1"}
          />
          <text x="607" y="80" textAnchor="middle" fill="#58A69E" fontSize="9" fontWeight="700" fontFamily="ui-monospace, monospace">
            CONTROL + RELEVO REMOTO
          </text>
          <text x="607" y="100" textAnchor="middle" fill="#F6FBFC" fontSize="12" fontWeight="700" fontFamily="var(--font-museoModerno), sans-serif">
            OwlCam API + MediaMTX
          </text>
          <text x="607" y="118" textAnchor="middle" fill="rgba(237, 237, 230, 0.7)" fontSize="9.5" fontFamily="ui-monospace, monospace">
            coturn TURN/TURNS · Caddy TLS
          </text>
          <text x="607" y="134" textAnchor="middle" fill="#D8B878" fontSize="9" fontFamily="ui-monospace, monospace">
            Gemini Vision + Supabase JWT
          </text>

          {/* Home Phone Node */}
          <g opacity={routeMode === "lan" ? 1 : 0.36}>
            <rect
              x="224"
              y="204"
              width="206"
              height="74"
              rx="12"
              fill={routeMode === "lan" ? "rgba(250, 84, 28, 0.14)" : "rgba(20, 22, 26, 0.9)"}
              stroke={routeMode === "lan" ? "#FA541C" : "rgba(237, 237, 230, 0.2)"}
              strokeWidth={routeMode === "lan" ? "1.6" : "1"}
            />
            <text x="327" y="228" textAnchor="middle" fill="#F6FBFC" fontSize="12" fontWeight="700" fontFamily="var(--font-museoModerno), sans-serif">
              App Flutter (Wi-Fi Casa)
            </text>
            <text x="327" y="248" textAnchor="middle" fill="#FA541C" fontSize="9.5" fontWeight="600" fontFamily="ui-monospace, monospace">
              WebRTC directo &lt; 3 ms · 0 subida ISP
            </text>
            <text x="327" y="264" textAnchor="middle" fill="rgba(237, 237, 230, 0.56)" fontSize="8.8" fontFamily="ui-monospace, monospace">
              Auth JWT validada contra VPS
            </text>
          </g>

          {/* Away Phone Node */}
          <g opacity={routeMode === "remote" ? 1 : 0.36}>
            <rect
              x="492"
              y="204"
              width="230"
              height="74"
              rx="12"
              fill={routeMode === "remote" ? "rgba(88, 166, 158, 0.16)" : "rgba(20, 22, 26, 0.9)"}
              stroke={routeMode === "remote" ? "#58A69E" : "rgba(237, 237, 230, 0.2)"}
              strokeWidth={routeMode === "remote" ? "1.6" : "1"}
            />
            <text x="607" y="228" textAnchor="middle" fill="#F6FBFC" fontSize="12" fontWeight="700" fontFamily="var(--font-museoModerno), sans-serif">
              App Flutter (Datos 4G / 5G)
            </text>
            <text x="607" y="248" textAnchor="middle" fill="#58A69E" fontSize="9.5" fontWeight="600" fontFamily="ui-monospace, monospace">
              WHEP HTTPS + coturn NAT Traversal
            </text>
            <text x="607" y="264" textAnchor="middle" fill="rgba(237, 237, 230, 0.56)" fontSize="8.8" fontFamily="ui-monospace, monospace">
              Pull RTSP bajo demanda vía WireGuard
            </text>
          </g>

          {/* Flow: Camera -> OpenWrt (always active <1ms) */}
          <path
            d="M 172 108 L 224 108"
            fill="none"
            stroke="#FA541C"
            strokeWidth="2.2"
            strokeDasharray="6 5"
            className={styles.flowForward}
          />

          {/* Flow: OpenWrt -> Home Phone (LAN Fast-Path) */}
          <path
            d="M 327 158 L 327 204"
            fill="none"
            stroke={routeMode === "lan" ? "#FA541C" : "rgba(237, 237, 230, 0.15)"}
            strokeWidth={routeMode === "lan" ? "2.4" : "1.2"}
            strokeDasharray="6 5"
            className={routeMode === "lan" ? styles.flowForward : undefined}
          />

          {/* Flow: OpenWrt -> VPS (WireGuard) */}
          <path
            d="M 430 104 L 492 104"
            fill="none"
            stroke={routeMode === "remote" ? "#58A69E" : "rgba(88, 166, 158, 0.35)"}
            strokeWidth={routeMode === "remote" ? "2.4" : "1.2"}
            strokeDasharray="6 5"
            className={routeMode === "remote" ? styles.flowForward : undefined}
          />
          <text
            x="461"
            y="95"
            textAnchor="middle"
            fill="#58A69E"
            fontSize="8.5"
            fontFamily="ui-monospace, monospace"
          >
            WG
          </text>

          {/* Flow: VPS -> Away Phone */}
          <path
            d="M 607 150 L 607 204"
            fill="none"
            stroke={routeMode === "remote" ? "#58A69E" : "rgba(237, 237, 230, 0.15)"}
            strokeWidth={routeMode === "remote" ? "2.4" : "1.2"}
            strokeDasharray="6 5"
            className={routeMode === "remote" ? styles.flowForward : undefined}
          />
        </svg>
      </div>

      <div className={styles.readout}>
        <span className={styles.readoutTag}>{opt.tag}</span>
        <div className={styles.readoutBody}>
          <h4>{opt.title}</h4>
          <p>{opt.note}</p>
          <div className={styles.readoutMetrics}>
            {opt.chips.map((c) => (
              <span key={c} className={styles.metricChip}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      <footer className={styles.legendBar}>
        <div className={styles.legendSection}>
          <span className={styles.legendItem}>
            <span className={styles.legendLine} style={{ background: "#FA541C" }} />
            LAN Fast-Path (&lt;3 ms)
          </span>
          <span className={styles.legendItem}>
            <span className={styles.legendLine} style={{ background: "#58A69E" }} />
            WireGuard + TURN remoto
          </span>
        </div>

        <div className={styles.scaleSection} aria-hidden="true">
          <div className={styles.scaleBar}>
            <span />
            <span />
            <span />
            <span />
          </div>
          <span>MTU 1440 · AF41</span>
        </div>

        <div className={styles.specSection}>
          <strong>OWLCAM v1.5.3</strong>
          <span>HOJA 02/03 · TOPOLOGÍA</span>
        </div>
      </footer>
    </section>
  );
}
