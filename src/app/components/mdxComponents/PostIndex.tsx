import React from 'react'

import styles from '../../styles/posts.module.css'

type Heading = {
  heading: number;
  text: string;
  slug: string;
}

type Props = {
    headings: Heading[];
}

export const PostIndex = ({headings}: Props) => {
  return (
    <div className={styles.index}>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          INDEX
        </div>
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
      </div>
    </div>
  );
}