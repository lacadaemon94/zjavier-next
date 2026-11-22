// Core
import React from "react";
// Styles
import styles from "../../styles/likebutton.module.css";

type Props = {
  likes: number;
};

export const Counter = ({ likes }: Props) => {
  return (
    <div className={styles.counter}>
      <div key={likes} className={styles.counterValue}>
        {likes}
      </div>
    </div>
  );
};
