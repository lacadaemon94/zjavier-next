// Core
import React from "react";
// Helpers
import scrollToTop from "@/app/utils/scrollTopTop";
// Styles
import styles from "../../styles/posts.module.css";
// Ui elements
import Button from "@/app/elements/buttons/Button";
import { LikeButton } from "./LikeButton";

type Heading = {
  heading: number;
  text: string;
  slug: string;
};

type Props = {
  headings: Heading[];
  flatPath: string;
};

export const PostIndex = ({ headings, flatPath }: Props) => {
  return (
    <div className={styles.index}>
      <div className={styles.wrapper}>
        <div className={styles.title}>INDEX</div>
        <ul className={styles.headings}>
          {headings.map((heading, index) => {
            if (heading.heading === 1) {
              // Check for subsequent "heading 2" elements
              const subHeadings = [];
              let nextIndex = index + 1;
              while (
                nextIndex < headings.length &&
                headings[nextIndex].heading === 2
              ) {
                subHeadings.push(headings[nextIndex]);
                nextIndex++;
              }

              return (
                <li key={heading.slug}>
                  <a href={`#${heading.slug}`}>{heading.text}</a>
                  {subHeadings.length > 0 && (
                    <ul className={styles.subheadings}>
                      {subHeadings.map((sub) => (
                        <li key={sub.slug}>
                          <a href={`#${sub.slug}`}>{sub.text}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            }

            // Returning null for "heading 2" since they are already handled
            return null;
          })}
        </ul>
        <hr />
        <div className={styles.actions}>
          <div className={styles.reactions}>
            <LikeButton flatPath={flatPath} />
          </div>
          <Button type="button" className={styles.totop} onClick={scrollToTop}>
            <p>back to top</p>
          </Button>
        </div>
      </div>
    </div>
  );
};
