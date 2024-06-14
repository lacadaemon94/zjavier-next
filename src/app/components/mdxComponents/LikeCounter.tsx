// Core
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
// Styles
import styles from "../../styles/likebutton.module.css";
// Ui Elements

type Props = {
  likes: number;
};

export const Counter = ({ likes }: Props) => {
  const [count, setCount] = useState(likes);

  useEffect(() => {
    const increase = () => {
      setCount(likes);
    };

    increase();
  }, [likes]);

  //   const decrease = () => {
  //     setCount((prev) => prev - 1);
  //   };

  return (
    <div className={styles.counter}>
      <AnimatePresence mode="popLayout">
        <motion.div
          layout
          key={count}
          initial={{
            y: count > 0 ? "100%" : "-100%",
            opacity: 0.25,
            scale: 1.5,
          }}
          animate={{ y: "0%", opacity: 1, scale: 1 }}
          exit={{ y: count > 0 ? "-100%" : "100%", opacity: 0, scale: 0.3 }}
          transition={{ type: "spring", duration: 0.3, bounce: 0.4 }}
        >
          {count}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
