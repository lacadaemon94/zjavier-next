// Core
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Styles
import styles from "../../styles/likebutton.module.css";
// Icons
import HeartIconOutline from "@/assets/icons/HeartIconOutline";
import HeartIconFilled from "@/assets/icons/HeartIconFilled";

type Props = {};

export const LikeButton = (props: Props) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  return (
    <motion.button
      layout
      className={styles.likebutton}
      onClick={() => setIsLiked(true)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      data-hover={isHovered ? "true" : "false"}
      data-liked={isLiked ? "true" : "false"}
    >
      <AnimatePresence mode="popLayout">
        {isLiked ? (
          <motion.div
            key={"liked"}
            layout
            initial={{
              opacity: 0.25,
              scale: 1.5,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.75,
            }}
            transition={{
              type: "spring",
            }}
          >
            <HeartIconFilled />
          </motion.div>
        ) : (
          <motion.div
            key={"like"}
            layout
            initial={{
              opacity: 0.25,
              scale: 1.15,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.75,
            }}
            transition={{
              type: "spring",
            }}
          >
            <HeartIconOutline />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
