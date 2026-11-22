"use client";

import React, { useRef, useState } from "react";
import styles from "../../styles/codeblock.module.css";

export type CodeBlockProps = React.ComponentPropsWithoutRef<"pre"> & {
  copyLabel?: string;
  copiedLabel?: string;
};

export function CodeBlock({
  children,
  copyLabel = "Copy",
  copiedLabel = "Copied",
  ...props
}: CodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const pre = preRef.current;
    if (!pre) return;

    const lineNodes = pre.querySelectorAll("[data-line]");
    const text =
      lineNodes.length > 0
        ? Array.from(lineNodes)
            .map((line) => line.textContent ?? "")
            .join("\n")
        : (pre.textContent ?? "");

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable (non-HTTPS or blocked)
    }
  };

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.copyButton}
        onClick={handleCopy}
        data-copied={copied ? "true" : "false"}
        aria-label={copied ? copiedLabel : copyLabel}
      >
        <span className={styles.copyIcon} aria-hidden="true">
          {copied ? (
            <svg viewBox="0 0 16 16" fill="none" className={styles.checkSvg}>
              <path
                d="M3.2 8.5L6.4 11.7L12.8 4.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                className={styles.checkPath}
              />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" fill="none" className={styles.copySvg}>
              <rect
                x="5.5"
                y="5.5"
                width="7.5"
                height="7.5"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path
                d="M10.5 5.5V4C10.5 3.17 9.83 2.5 9 2.5H4C3.17 2.5 2.5 3.17 2.5 4V9C2.5 9.83 3.17 10.5 4 10.5H5.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          )}
        </span>
        <span>{copied ? copiedLabel : copyLabel}</span>
      </button>
      <pre ref={preRef} {...props}>
        {children}
      </pre>
    </div>
  );
}
