import React from "react";

// Styles
import styles from "../../../styles/home.module.css";

type Props = {};

export const AboutMe = (props: Props) => {
  return (
    <div className={styles.aboutme}>
      <div className={styles.header}>
        <h3>About Me</h3>
        <div className={styles.decoration}>
          <div className={styles.square}>
            <div></div>
          </div>
          <div className={styles.lineswrapper}>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.text}>
          I’m a Full Stack Developer who likes to take ideas that solve daily
          life problems into happy User Experiences and ever-growing brands.
          Passionate about developing digital products that make day-to-day life
          a truly unique experience and not just another day to endure.
        </p>
        <p>
          I love creating Design Systems and crafting awe-inspiring UIs, always
          keeping the User Experience as a top priority.
          <br />I believe I have vast experience with just the right tools, but
          I also consider myself capable of functioning independently of them.
        </p>
      </div>
    </div>
  );
};