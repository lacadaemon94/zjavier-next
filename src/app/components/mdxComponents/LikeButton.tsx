// Core
"use client";
import React, { useState } from "react";
// Context
import { usePostStats } from "../PostStatsProvider";
// Styles
import styles from "../../styles/likebutton.module.css";
// Icons
import LikeIcon from "@/assets/icons/LikeIcon";
import LikeFilledIcon from "@/assets/icons/LikeFilledIcon";
import { Counter } from "./LikeCounter";

export const LikeButton = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { likes, isLiked, isLiking, handleLike } = usePostStats();

  return (
    <div className={styles.likecomp}>
      <button
        type="button"
        className={styles.likebutton}
        onClick={handleLike}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-hover={isHovered ? "true" : "false"}
        data-liked={isLiked ? "true" : "false"}
        disabled={isLiked || isLiking}
        aria-label="Like post"
      >
        <div
          key={isLiked ? "liked" : "like"}
          className={styles.iconPop}
        >
          {isLiked ? <LikeFilledIcon /> : <LikeIcon />}
        </div>
      </button>
      <Counter likes={likes} />
    </div>
  );
};
