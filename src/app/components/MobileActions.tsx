"use client";
// Core
import React, { useState } from "react";
// Context
import { usePostStats } from "./PostStatsProvider";
// Ui Elements
import NavButton from "./NavButton";
// Styles
import styles from "../styles/posts.module.css";
// Assets
import LikeIcon from "@/assets/icons/LikeIcon";
import LikeFilledIcon from "@/assets/icons/LikeFilledIcon";
import LeftArrowIcon from "@/assets/icons/LeftArrowIcon";

type Props = {
  ariaLabel: string;
};

const MobileActions = ({ ariaLabel }: Props) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { isLiked, isLiking, handleLike } = usePostStats();

  return (
    <div className={styles.mobileactionswrapper}>
      <NavButton
        href="/"
        icon={<LeftArrowIcon />}
        ariaLabel={ariaLabel}
        className={styles.gobackmobile}
      />
      <div className={styles.likemobile}>
        <button
          type="button"
          className={styles.likemobilebutton}
          onClick={handleLike}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          data-hover={isHovered ? "true" : "false"}
          data-liked={isLiked ? "true" : "false"}
          disabled={isLiked || isLiking}
          aria-label="Like post"
        >
          <div key={isLiked ? "liked" : "like"} className={styles.likeIconPop}>
            {isLiked ? <LikeFilledIcon /> : <LikeIcon />}
          </div>
        </button>
      </div>
    </div>
  );
};

export default MobileActions;
