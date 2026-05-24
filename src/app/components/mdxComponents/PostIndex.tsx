// Core
import React from "react";
// Helpers
import scrollToTop from "@/app/utils/scrollTopTop";
// Styles
import styles from "../../styles/posts.module.css";
// Ui elements
import Button from "../Button";
import { LikeButton } from "./LikeButton";
import type { Dictionary } from "@/app/i18n/dictionaries";

type Heading = {
  heading: number;
  text: string;
  slug: string;
};

type Props = {
  headings: Heading[];
  flatPath: string;
  labels: Dictionary["post"];
};

type HeadingGroup = Heading & {
  children: Heading[];
};

function groupHeadings(headings: Heading[]): HeadingGroup[] {
  const indexHeadings = headings.filter(
    (heading) => heading.heading >= 2 && heading.heading <= 3,
  );

  return indexHeadings.reduce<HeadingGroup[]>((groups, heading) => {
    if (heading.heading === 2 || groups.length === 0) {
      groups.push({
        ...heading,
        children: [],
      });

      return groups;
    }

    groups[groups.length - 1].children.push(heading);
    return groups;
  }, []);
}

export const PostIndex = ({ headings, flatPath, labels }: Props) => {
  const headingGroups = groupHeadings(headings);

  return (
    <div className={styles.index}>
      <div className={styles.wrapper}>
        <div className={styles.title}>{labels.index}</div>

        {headingGroups.length > 0 && (
          <ul className={styles.headings}>
            {headingGroups.map((heading) => (
              <li key={heading.slug}>
                <a href={`#${heading.slug}`}>{heading.text}</a>

                {heading.children.length > 0 && (
                  <ul className={styles.subheadings}>
                    {heading.children.map((subheading) => (
                      <li key={subheading.slug}>
                        <a href={`#${subheading.slug}`}>{subheading.text}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}

        <hr />

        <div className={styles.actions}>
          <div className={styles.reactions}>
            <LikeButton flatPath={flatPath} />
          </div>

          <Button type="button" className={styles.totop} onClick={scrollToTop}>
            <p>{labels.backToTop}</p>
          </Button>
        </div>
      </div>
    </div>
  );
};
