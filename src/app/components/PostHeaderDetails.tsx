"use client";
// Core
import React from "react";
// Context
import { usePostStats } from "./PostStatsProvider";
// Ui Elements
import { DetailPill } from "./notes/DetailPill";
// Styles
import styles from "../styles/posts.module.css";
// Assets
import LikeFilledIcon from "@/assets/icons/LikeFilledIcon";
import ViewFilledIcon from "@/assets/icons/ViewFilledIcon";
import CircularLoopAnicon from "@/assets/icons/CircularLoopAnicon";

const PostHeaderDetails = () => {
  const { isLoading, likes, views } = usePostStats();

  return (
    <div className={styles.detailswrapper}>
      <DetailPill
        className={styles.detailpill}
        icon={isLoading ? <CircularLoopAnicon /> : <ViewFilledIcon />}
        value={isLoading ? undefined : `${views}`}
      />
      <DetailPill
        className={styles.detailpill}
        icon={isLoading ? <CircularLoopAnicon /> : <LikeFilledIcon />}
        value={isLoading ? undefined : `${likes}`}
      />
    </div>
  );
};

export default PostHeaderDetails;
