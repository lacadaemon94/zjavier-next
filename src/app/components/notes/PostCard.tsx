// Core
import React from "react";
import Link from "next/link";
import format from "date-fns/format";
// Types
import { Post } from "contentlayer/generated";
// Styles
import styles from "../../styles/home.module.css";
// Ui Elements
import { DetailPill } from "./DetailPill";
import CalendarDetailIcon from "@/assets/icons/CalendarDetailIcon";
import ViewFilledIcon from "@/assets/icons/ViewFilledIcon";
import LikeFilledIcon from "@/assets/icons/LikeFilledIcon";
// import VideoIcon from "@/assets/icons/VideoIcon";

interface ExtendedPost extends Post {
  likes: number;
  views: number;
}

type PostProps = {
  post: ExtendedPost;
};

export const PostCard = ({ post }: PostProps) => {
  return (
    <Link href={`/${post.slug}`} className={styles.postcard}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h3>{post.title}</h3>
          {/* <div className={styles.mediatags}>
            <VideoIcon />
          </div> */}
        </div>
        <div className={styles.detailswrapper}>
          <DetailPill
            icon={<CalendarDetailIcon />}
            value={format(new Date(post.publishedAt), "MMM dd")}
            className={styles.detailpill}
          />
          <DetailPill
            icon={<ViewFilledIcon />}
            value={`${post.views != undefined ? post.views : 0}`}
            className={styles.detailpill}
          />
          <DetailPill
            icon={<LikeFilledIcon />}
            value={`${post.likes != undefined ? post.likes : 0}`}
            className={styles.detailpill}
          />
        </div>
      </div>
      <p className={styles.excerpt}>{post.excerpt}</p>
    </Link>
  );
};
