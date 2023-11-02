// Core
"use client";
import React, { useState, Children, isValidElement } from "react";
// Styles
import styles from "../../styles/fullcode.module.css";
// Ui Elements
import Button from "@/app/elements/buttons/Button";

export type FullCodeProps = {
  children: React.ReactNode;
};

export const FullCode = ({ children }: FullCodeProps) => {
  const [blocks, setBlocks] = useState<number>(0);

  let titles: string[] = [];

  if (Children.count(children) === 0) {
    return null;
  }

  const block = Children.map(children, (child, index) => {
    if (
      !isValidElement(child) ||
      typeof child.props?.["data-rehype-pretty-code-fragment"] === "undefined"
    ) {
      return null;
    }

    if (
      typeof child.props.children?.[0]?.props?.[
        "data-rehype-pretty-code-title"
      ] !== "undefined"
    ) {
      let title = child.props.children[0].props.children.split("/");
      titles.push(title[title.length - 1]);
    }

    return (
      <div
        key={index}
        className={styles.codeblock}
        data-isvisible={index === blocks ? "true" : "false"}
      >
        {child}
      </div>
    );
  });

  return (
    <div className={styles.fullcode}>
      <div className={styles.sideheader}>
        <h4 className={styles.title}>Select a File:</h4>
        <div className={styles.pillswrapper}>
          {titles.map((title, index) => (
            <Button
              type="button"
              key={index}
              className={styles.codepill}
              onClick={() => setBlocks(index)}
              active={index === blocks ? "true" : "false"}
            >
              {title}
            </Button>
          ))}
        </div>
      </div>
      <div className={styles.codewrapper}>{block}</div>
    </div>
  );
};
