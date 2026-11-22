"use client";
// Core
import React from "react";
// Styles
import styles from "../../styles/home.module.css";
import { PostCard } from "./PostCard";
import type { Locale } from "@/app/i18n/config";
import type { PostWithStats } from "@/app/lib/posts/postWithStats";

type Props = {
  posts: PostWithStats[];
  locale: Locale;
};

export const Posts = ({ posts, locale }: Props) => {
  return (
    <div className={styles.postswrapper}>
      {posts &&
        posts.map((post) => (
          <PostCard key={post.slug} locale={locale} post={post} />
        ))}
    </div>
  );
};
