// Core
"use client";
import React, { useState, Children, isValidElement } from "react";
// Styles
import styles from "../../styles/fullcode.module.css";
// Ui Elements
import Button from "../Button";

export type FullCodeProps = {
  children: React.ReactNode;
  selectFileLabel?: string;
};

type CodeElementProps = {
  "data-rehype-pretty-code-figure"?: string;
  "data-rehype-pretty-code-fragment"?: string;
  "data-rehype-pretty-code-title"?: string;
  children?: React.ReactNode;
};

function extractCodeTitle(children: React.ReactNode): string | null {
  for (const node of Children.toArray(children)) {
    if (!isValidElement<CodeElementProps>(node)) continue;
    if (typeof node.props["data-rehype-pretty-code-title"] !== "undefined") {
      const rawTitle = String(node.props.children ?? "").trim();
      if (!rawTitle) return null;
      const segments = rawTitle.split("/");
      return segments[segments.length - 1] || rawTitle;
    }
  }
  return null;
}

export const FullCode = ({
  children,
  selectFileLabel = "Select a File:",
}: FullCodeProps) => {
  const [blocks, setBlocks] = useState<number>(0);

  if (Children.count(children) === 0) {
    return null;
  }

  const codeFigures: Array<{ title: string; element: React.ReactElement }> = [];

  Children.forEach(children, (child) => {
    if (!isValidElement<CodeElementProps>(child)) return;

    const isPrettyCode =
      typeof child.props["data-rehype-pretty-code-figure"] !== "undefined" ||
      typeof child.props["data-rehype-pretty-code-fragment"] !== "undefined";

    if (!isPrettyCode) return;

    const title =
      extractCodeTitle(child.props.children) ?? `File ${codeFigures.length + 1}`;
    codeFigures.push({ title, element: child });
  });

  if (codeFigures.length === 0) {
    return null;
  }

  return (
    <div className={styles.fullcode}>
      <div className={styles.sideheader}>
        <h4 className={styles.title}>{selectFileLabel}</h4>
        <div className={styles.pillswrapper}>
          {codeFigures.map(({ title }, index) => (
            <Button
              type="button"
              key={`${title}-${index}`}
              className={styles.codepill}
              onClick={() => setBlocks(index)}
              active={index === blocks ? "true" : "false"}
            >
              {title}
            </Button>
          ))}
        </div>
      </div>
      <div className={styles.codewrapper}>
        {codeFigures.map(({ title, element }, index) => (
          <div
            key={`${title}-${index}`}
            className={styles.codeblock}
            data-isvisible={index === blocks ? "true" : "false"}
          >
            {element}
          </div>
        ))}
      </div>
    </div>
  );
};
