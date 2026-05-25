// Core
import React from "react";
import Link from "next/link";
// Types
import type { PostWithStats } from "@/app/lib/posts/postWithStats";
import type { Locale } from "@/app/i18n/config";
import { formatLocalizedDate } from "@/app/i18n/date";
// Styles
import styles from "../../styles/home.module.css";
// Ui Elements
import { DetailPill } from "./DetailPill";
import CalendarDetailIcon from "@/assets/icons/CalendarDetailIcon";
import ViewFilledIcon from "@/assets/icons/ViewFilledIcon";
import LikeFilledIcon from "@/assets/icons/LikeFilledIcon";
// import VideoIcon from "@/assets/icons/VideoIcon";

type PostProps = {
  post: PostWithStats;
  locale: Locale;
};

export const PostCard = ({ post, locale }: PostProps) => {
  const languageLabel = post.language === "es" ? "SPA" : "ENG";

  return (
    <Link href={`/${post.slug}`} className={styles.postcard}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h3>{post.title}</h3>
          <span
            className={styles.languageTag}
            aria-label={`Post language: ${languageLabel}`}
          >
            {languageLabel}
          </span>
        </div>
        <div className={styles.detailswrapper}>
          <DetailPill
            icon={<CalendarDetailIcon />}
            value={formatLocalizedDate(new Date(post.publishedAt), "MMM dd", locale)}
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
