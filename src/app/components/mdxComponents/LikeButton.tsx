// Core
"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Utils
import { fetchLikes, saveLike } from "@/app/utils/likesUtil";
// Styles
import styles from "../../styles/likebutton.module.css";
// Icons
import LikeIcon from "@/assets/icons/LikeIcon";
import LikeFilledIcon from "@/assets/icons/LikeFilledIcon";
import { Counter } from "./LikeCounter";

type Props = {
  flatPath: string;
};

export const LikeButton = ({ flatPath }: Props) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);

  useEffect(() => {
    if (flatPath) {
      const likes = async () => {
        const data = await fetchLikes(flatPath);
        setLikes(data);
      };

      likes();
    }
  }, [flatPath]);

  const handleLike = async () => {
    const newLikes = likes + 1;
    const data = await saveLike(flatPath, newLikes);
    setLikes(data);
    setIsLiked(true);
  };

  return (
    <div className={styles.likecomp}>
      <motion.button
        layout
        className={styles.likebutton}
        onClick={handleLike}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        data-hover={isHovered ? "true" : "false"}
        data-liked={isLiked ? "true" : "false"}
        disabled={isLiked}
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
              <LikeFilledIcon />
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
              <LikeIcon />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
      <Counter likes={likes} />
    </div>
  );
};
