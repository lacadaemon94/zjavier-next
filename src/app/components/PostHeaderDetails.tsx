"use client";
// Core
import React, { useState, useEffect } from "react";
// Utils
import { fetchLikes } from "../utils/likesUtil";
import { fetchViews, saveView } from "../utils/viewsUtil";
// Ui Elements
import { DetailPill } from "./notes/DetailPill";
// Styles
import styles from "../styles/posts.module.css";
// Assets
import LikeFilledIcon from "@/assets/icons/LikeFilledIcon";
import ViewFilledIcon from "@/assets/icons/ViewFilledIcon";
import CircularLoopAnicon from "@/assets/icons/CircularLoopAnicon";

type Props = {
  slug: string;
};

const PostHeaderDetails = ({ slug }: Props) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [likes, setLikes] = useState<string>("0");
  const [views, setViews] = useState<string>("0");

  useEffect(() => {
    const fetchAndFindData = async () => {
      const likes = await fetchLikes(slug);
      const views = await fetchViews(slug);
      const newViews = await saveView(slug, views + 1);

      setLikes(`${likes}`);
      setViews(`${newViews}`);
      setLoading(false);
    };
    fetchAndFindData();
  }, [slug]);

  return (
    <div className={styles.detailswrapper}>
      <DetailPill
        className={styles.detailpill}
        icon={isLoading ? <CircularLoopAnicon /> : <ViewFilledIcon />}
        value={isLoading ? undefined : views}
      />
      <DetailPill
        className={styles.detailpill}
        icon={isLoading ? <CircularLoopAnicon /> : <LikeFilledIcon />}
        value={isLoading ? undefined : likes}
      />
    </div>
  );
};

export default PostHeaderDetails;
