"use client";

import React, { useState } from "react";
import styles from "./RiemannDiagrams.module.css";

type Mode = "after" | "before";
type PacketId = "boot" | "kcp" | "ptz" | "transdata" | "media";

const PACKETS: Array<{
  id: PacketId;
  code: string;
  label: string;
  tag: string;
  title: string;
  note: string;
  bytes: string[];
}> = [
  {
    id: "boot",
    code: "HTTP :80",
    label: "Arranque",
    tag: "POST /devicemgr/device/getServer",
    title: "El hallazgo incómodo en el arranque",
    note: "En cada reinicio, la cámara ignoraba el DNS local, consultaba DNS chinos fijos y enviaba su configuración —incluyendo credenciales Wi-Fi— en texto plano por HTTP :80. Al interceptarlo en OpenWrt, esa telemetría nunca vuelve a salir de casa.",
    bytes: ["DNS interceptado → OpenWrt", "HTTP :80 → Emulador local", "WAN bloqueada 100%"],
  },
  {
    id: "kcp",
    code: "UDP :10000",
    label: "Sesión KCP",
    tag: "KCP ARQ · conv_id · MO_O 0x0000",
    title: "Transporte confiable sobre UDP sin cifrar",
    note: "En lugar de un protocolo propietario imposible, la TY-Q2 usa KCP (un protocolo ARQ open-source sobre UDP) cargando tramas binarias MO_O y MO_V con cabecera fija de 55 bytes en texto plano.",
    bytes: ["Magic: MO_O / MO_V", "Header: 55 bytes LE", "Heartbeat: 0x00FF"],
  },
  {
    id: "ptz",
    code: "0x000E",
    label: "Motor PTZ",
    tag: "MO_O 0x000E · Control direccional",
    title: "Movimiento preciso del lente motorizado",
    note: "Decodificamos cada dirección del motor (arriba, abajo, izquierda, derecha y alto 0xFF). Incluso invertimos arriba/abajo del lado del servidor según la orientación física del montaje y añadimos pulsos temporizados para evitar giros descontrolados.",
    bytes: ["Up: 0x02 · Down: 0x00", "Left: 0x06 · Right: 0x04", "Stop: 0xFF"],
  },
  {
    id: "transdata",
    code: "0x001E",
    label: "JSON Hardware",
    tag: "MO_O 0x001E · transdata JSON",
    title: "LED, sirena, visión nocturna y rotación",
    note: "Todos los controles 'avanzados' de la app Sulink viajaban como simples comandos JSON dentro del opcode 0x001E: luz blanca, sirena, rotación 180°, presets y modo infrarrojo.",
    bytes: ["video_flip: 0 / 180", "white_led / siren", "IR night vision + presets"],
  },
  {
    id: "media",
    code: "MO_V",
    label: "Doble Lente + Audio",
    tag: "MO_V 0x0001 / 0x0002 / 0x0003",
    title: "4 canales H.264 + audio bidireccional G.711",
    note: "Mientras el RTSP nativo solo mostraba un lente, por KCP desbloqueamos los 4 canales reales: Lente 1 HD/SD, Lente 2 HD/SD, micrófono 8 kHz PCMA y parlante talkback.",
    bytes: ["Ch 0/1: Lente 1 (1080p/360p)", "Ch 2/3: Lente 2 (1080p/360p)", "Audio: G.711 A-law 2 vías"],
  },
];

export function OwlCamInterceptMap() {
  const [mode, setMode] = useState<Mode>("after");
  const [activePacket, setActivePacket] = useState<PacketId>("boot");

  const packet =
    PACKETS.find((item) => item.id === activePacket) ?? PACKETS[0];

  return (
    <section
      className={styles.plate}
      aria-labelledby="owlcam-intercept-title"
    >
      <header className={styles.titleBlock}>
        <div className={styles.titleCell}>
          <p className={styles.sheetCode}>PLANO 01/03 · INTERCEPCIÓN Y PROTOCOLO</p>
          <h3 id="owlcam-intercept-title" className={styles.plateTitle}>
            Sin flashear firmware: cómo secuestramos la nube en el router
          </h3>
          <p className={styles.plateSubtitle}>
            Alterna entre el comportamiento de fábrica (Sulink) y la
            intercepción local en OpenWrt, o inspecciona cada trama decodificada.
          </p>
        </div>

        <div className={styles.metaCell}>
          <span className={styles.metaKey}>HARDWARE</span>
          <span className={styles.metaVal}>TY-Q2 · V821B</span>
          <span className={styles.metaKey}>PROTO</span>
          <span className={styles.metaVal}>KCP + MO_O/V</span>
          <span className={styles.metaKey}>MODO</span>
          <span className={styles.metaVal}>
            {mode === "after" ? "OWLCAM AISLADA" : "FÁBRICA SULINK"}
          </span>
        </div>

        <div className={styles.swatchCell}>
          <div className={styles.swatches} aria-hidden="true">
            <span className={styles.swatch} style={{ background: "#FA541C" }} />
            <span className={styles.swatch} style={{ background: "#58A69E" }} />
            <span className={styles.swatch} style={{ background: "#D8B878" }} />
            <span className={styles.swatch} style={{ background: "#EDEDE6" }} />
          </div>
          <div className={styles.compass} aria-hidden="true">
            <span>PCAP</span>
            <span className={styles.compassRing}>⇄</span>
          </div>
        </div>
      </header>

      <div className={styles.controlsBar}>
        <div className={styles.segmented} role="group" aria-label="Comparar red">
          <button
            type="button"
            className={styles.segButton}
            data-active={mode === "after"}
            onClick={() => setMode("after")}
          >
            Después: OwlCam (Aislada)
          </button>
          <button
            type="button"
            className={styles.segButton}
            data-active={mode === "before"}
            onClick={() => setMode("before")}
          >
            Antes: Nube Sulink
          </button>
        </div>

        <div className={styles.segmented} role="group" aria-label="Inspeccionar paquete">
          {PACKETS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={styles.segButton}
              data-active={activePacket === item.id}
              onClick={() => setActivePacket(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.canvasWrap}>
        <svg
          className={styles.svg}
          viewBox="0 0 760 310"
          role="img"
          aria-label="Diagrama animado comparando el flujo de red original hacia la nube Sulink frente a la intercepción local en OpenWrt hacia OwlCam"
        >
          {/* Left Node: TY-Q2 Dual Lens Camera */}
          <g>
            <rect
              x="28"
              y="98"
              width="162"
              height="114"
              rx="14"
              fill="rgba(20, 22, 26, 0.92)"
              stroke="#EDEDE6"
              strokeOpacity="0.32"
              strokeWidth="1.2"
            />
            <circle cx="84" cy="144" r="14" fill="none" stroke="#58A69E" strokeWidth="1.4" />
            <circle cx="84" cy="144" r="5" fill="#58A69E" />
            <circle cx="134" cy="144" r="14" fill="none" stroke="#FA541C" strokeWidth="1.4" />
            <circle cx="134" cy="144" r="5" fill="#FA541C" />
            <text
              x="109"
              y="118"
              textAnchor="middle"
              fill="rgba(237, 237, 230, 0.55)"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              TEMU · DOBLE LENTE
            </text>
            <text
              x="109"
              y="182"
              textAnchor="middle"
              fill="#F6FBFC"
              fontSize="12"
              fontWeight="700"
              fontFamily="var(--font-museoModerno), sans-serif"
            >
              SZSINOCAM TY-Q2
            </text>
            <text
              x="109"
              y="198"
              textAnchor="middle"
              fill="rgba(237, 237, 230, 0.52)"
              fontSize="9.5"
              fontFamily="ui-monospace, monospace"
            >
              Allwinner V821B
            </text>
          </g>

          {/* Center Node: OpenWrt AX3000T Router */}
          <g>
            <rect
              x="278"
              y="92"
              width="186"
              height="126"
              rx="14"
              fill="rgba(20, 22, 26, 0.95)"
              stroke={mode === "after" ? "#FA541C" : "rgba(237, 237, 230, 0.28)"}
              strokeWidth={mode === "after" ? "1.6" : "1.1"}
            />
            <text
              x="371"
              y="114"
              textAnchor="middle"
              fill={mode === "after" ? "#FA541C" : "rgba(237, 237, 230, 0.55)"}
              fontSize="9"
              fontWeight="700"
              fontFamily="ui-monospace, monospace"
            >
              {mode === "after" ? "FIREWALL + DNS INTERCEPT" : "SOLO PASARELA NAT"}
            </text>
            <text
              x="371"
              y="138"
              textAnchor="middle"
              fill="#F6FBFC"
              fontSize="13"
              fontWeight="700"
              fontFamily="var(--font-museoModerno), sans-serif"
            >
              Router OpenWrt
            </text>
            <text
              x="371"
              y="157"
              textAnchor="middle"
              fill="rgba(237, 237, 230, 0.65)"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              {mode === "after" ? "DNAT :53 + :80 → Local" : "DNS chino pasa libre"}
            </text>
            <text
              x="371"
              y="174"
              textAnchor="middle"
              fill="rgba(237, 237, 230, 0.65)"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              {mode === "after" ? "WAN cámara = DROP" : "HTTP plano sale a WAN"}
            </text>
            <text
              x="371"
              y="196"
              textAnchor="middle"
              fill={mode === "after" ? "#58A69E" : "#D8B878"}
              fontSize="9.5"
              fontWeight="600"
              fontFamily="ui-monospace, monospace"
            >
              {mode === "after" ? "CERO FUGAS EXTERNAS" : "FUGA DE CREDENCIALES"}
            </text>
          </g>

          {/* Upper-Right Node: External Sulink Cloud */}
          <g opacity={mode === "before" ? 1 : 0.34}>
            <rect
              x="546"
              y="32"
              width="186"
              height="96"
              rx="14"
              fill="rgba(20, 22, 26, 0.9)"
              stroke={mode === "before" ? "#D8B878" : "rgba(237, 237, 230, 0.2)"}
              strokeDasharray={mode === "after" ? "5 4" : undefined}
              strokeWidth="1.2"
            />
            <text
              x="639"
              y="56"
              textAnchor="middle"
              fill={mode === "before" ? "#D8B878" : "rgba(237, 237, 230, 0.45)"}
              fontSize="9"
              fontWeight="700"
              fontFamily="ui-monospace, monospace"
            >
              {mode === "after" ? "BLOQUEADO POR FIREWALL" : "SERVIDORES EXTERNOS"}
            </text>
            <text
              x="639"
              y="80"
              textAnchor="middle"
              fill="#F6FBFC"
              fontSize="12.5"
              fontWeight="700"
              fontFamily="var(--font-museoModerno), sans-serif"
            >
              Nube Sulink
            </text>
            <text
              x="639"
              y="100"
              textAnchor="middle"
              fill="rgba(237, 237, 230, 0.56)"
              fontSize="9.5"
              fontFamily="ui-monospace, monospace"
            >
              Suscripción · Paywall IA
            </text>
          </g>

          {/* Lower-Right Node: Self-Hosted OwlCam */}
          <g opacity={mode === "after" ? 1 : 0.32}>
            <rect
              x="546"
              y="174"
              width="186"
              height="104"
              rx="14"
              fill={mode === "after" ? "rgba(250, 84, 28, 0.1)" : "rgba(20, 22, 26, 0.85)"}
              stroke={mode === "after" ? "#FA541C" : "rgba(237, 237, 230, 0.18)"}
              strokeWidth={mode === "after" ? "1.6" : "1"}
            />
            <text
              x="639"
              y="198"
              textAnchor="middle"
              fill="#FA541C"
              fontSize="9"
              fontWeight="700"
              fontFamily="ui-monospace, monospace"
            >
              TU PROPIO CONTROL
            </text>
            <text
              x="639"
              y="222"
              textAnchor="middle"
              fill="#F6FBFC"
              fontSize="13"
              fontWeight="700"
              fontFamily="var(--font-museoModerno), sans-serif"
            >
              Servidor OwlCam
            </text>
            <text
              x="639"
              y="242"
              textAnchor="middle"
              fill="rgba(237, 237, 230, 0.68)"
              fontSize="9.5"
              fontFamily="ui-monospace, monospace"
            >
              Go Bridge + RTSP + IA
            </text>
            <text
              x="639"
              y="258"
              textAnchor="middle"
              fill="#58A69E"
              fontSize="9.5"
              fontFamily="ui-monospace, monospace"
            >
              $0 suscripción mensual
            </text>
          </g>

          {/* Animated Flow: Camera -> Router */}
          <path
            d="M 190 155 L 278 155"
            fill="none"
            stroke={mode === "after" ? "#FA541C" : "#D8B878"}
            strokeWidth="2"
            strokeDasharray="6 6"
            className={styles.flowForward}
          />
          <text
            x="234"
            y="144"
            textAnchor="middle"
            fill="rgba(237, 237, 230, 0.65)"
            fontSize="9"
            fontFamily="ui-monospace, monospace"
          >
            KCP / HTTP
          </text>

          {/* Flow: Router -> Sulink Cloud */}
          <path
            d="M 464 132 C 504 132, 504 80, 546 80"
            fill="none"
            stroke={mode === "before" ? "#D8B878" : "rgba(237, 237, 230, 0.16)"}
            strokeWidth={mode === "before" ? "2" : "1.2"}
            strokeDasharray={mode === "before" ? "6 6" : "3 5"}
            className={mode === "before" ? styles.flowForward : undefined}
          />

          {/* Block X icon on Sulink path when in OwlCam mode */}
          {mode === "after" && (
            <g>
              <circle
                cx="505"
                cy="105"
                r="11"
                fill="#0C0D0F"
                stroke="#FA541C"
                strokeWidth="1.5"
              />
              <path
                d="M 501 101 L 509 109 M 509 101 L 501 109"
                stroke="#FA541C"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* Flow: Router -> OwlCam Server */}
          <path
            d="M 464 178 C 504 178, 504 226, 546 226"
            fill="none"
            stroke={mode === "after" ? "#FA541C" : "rgba(237, 237, 230, 0.14)"}
            strokeWidth={mode === "after" ? "2.2" : "1.2"}
            strokeDasharray="6 6"
            className={mode === "after" ? styles.flowForward : undefined}
          />

          {/* Binary frame structure bar at bottom of SVG */}
          <g transform="translate(28, 250)">
            <text
              x="0"
              y="-6"
              fill="rgba(237, 237, 230, 0.45)"
              fontSize="8.5"
              fontFamily="ui-monospace, monospace"
            >
              ESTRUCTURA DECODIFICADA DE TRAMA BINARIA (CABECERA 55 BYTES):
            </text>
            <rect x="0" y="2" width="78" height="24" rx="4" fill="rgba(250, 84, 28, 0.16)" stroke="#FA541C" strokeWidth="1" />
            <text x="39" y="18" textAnchor="middle" fill="#FFC8B0" fontSize="9.5" fontFamily="ui-monospace, monospace">MO_O / V</text>

            <rect x="84" y="2" width="76" height="24" rx="4" fill="rgba(216, 184, 120, 0.14)" stroke="#D8B878" strokeWidth="1" />
            <text x="122" y="18" textAnchor="middle" fill="#EDEDE6" fontSize="9.5" fontFamily="ui-monospace, monospace">OPCODE</text>

            <rect x="166" y="2" width="88" height="24" rx="4" fill="rgba(88, 166, 158, 0.14)" stroke="#58A69E" strokeWidth="1" />
            <text x="210" y="18" textAnchor="middle" fill="#EDEDE6" fontSize="9.5" fontFamily="ui-monospace, monospace">LEN + EXTRA</text>

            <rect x="260" y="2" width="112" height="24" rx="4" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(237, 237, 230, 0.25)" strokeWidth="1" />
            <text x="316" y="18" textAnchor="middle" fill="rgba(237, 237, 230, 0.72)" fontSize="9.5" fontFamily="ui-monospace, monospace">UID (32 BYTES)</text>

            <rect x="378" y="2" width="136" height="24" rx="4" fill="rgba(124, 140, 224, 0.16)" stroke="#7C8CE0" strokeWidth="1" />
            <text x="446" y="18" textAnchor="middle" fill="#EDEDE6" fontSize="9.5" fontFamily="ui-monospace, monospace">H.264 / G.711 / JSON</text>
          </g>
        </svg>
      </div>

      <div className={styles.readout}>
        <span className={styles.readoutTag}>{packet.code}</span>
        <div className={styles.readoutBody}>
          <h4>{packet.title}</h4>
          <p>{packet.note}</p>
          <div className={styles.readoutMetrics}>
            <span className={styles.metricChip}>{packet.tag}</span>
            {packet.bytes.map((b) => (
              <span key={b} className={styles.metricChip}>
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      <footer className={styles.legendBar}>
        <div className={styles.legendSection}>
          <span className={styles.legendItem}>
            <span className={styles.legendLine} style={{ background: "#FA541C" }} />
            Ruta interceptada OwlCam
          </span>
          <span className={styles.legendItem}>
            <span className={styles.legendLine} style={{ background: "#D8B878" }} />
            Ruta original Sulink
          </span>
          <span className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: "#58A69E" }} />
            0 firmware flasheado
          </span>
        </div>

        <div className={styles.scaleSection} aria-hidden="true">
          <div className={styles.scaleBar}>
            <span />
            <span />
            <span />
            <span />
          </div>
          <span>3 CAPTURAS PCAP</span>
        </div>

        <div className={styles.specSection}>
          <strong>OWLCAM · REV-ENG</strong>
          <span>HOJA 01/03 · RED</span>
        </div>
      </footer>
    </section>
  );
}
