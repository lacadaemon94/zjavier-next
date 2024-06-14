"use client";
// Core
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Utils
import { fetchLikes, saveLike } from "../utils/likesUtil";
// Ui Elements
import { LikeButton } from "./mdxComponents/LikeButton";
import NavButton from "./NavButton";
// Styles
import styles from "../styles/posts.module.css";
// Assets
import LikeIcon from "@/assets/icons/LikeIcon";
import LikeFilledIcon from "@/assets/icons/LikeFilledIcon";
import LeftArrowIcon from "@/assets/icons/LeftArrowIcon";

type Props = {
  slug: string;
};

const MobileActions = ({ slug }: Props) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);

  useEffect(() => {
    const getLikesAndSet = async () => {
      const getLikes = await fetchLikes(slug);
      setLikes(getLikes);
    };

    getLikesAndSet();
  }, [slug]);

  const newLike = async () => {
    await saveLike(slug, likes);
    setIsLiked(true);
  };

  return (
    <div className={styles.mobileactionswrapper}>
      <NavButton
        href="/"
        icon={<LeftArrowIcon />}
        ariaLabel="Home"
        className={styles.gobackmobile}
      />
      <div className={styles.likemobile}>
        <motion.button
          layout
          className={styles.likemobilebutton}
          onClick={newLike}
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
      </div>
    </div>
  );
};

export default MobileActions;
