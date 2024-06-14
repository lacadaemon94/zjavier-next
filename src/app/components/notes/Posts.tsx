"use client";
// Core
import React from "react";
// Styles
import styles from "../../styles/home.module.css";
import { PostCard } from "./PostCard";
// Icons
// Ui Elements
type Props = {
  posts: any[];
};

export const Posts = ({ posts }: Props) => {
  // const postsProjects = posts.map((post) => post.project);

  return (
    <div className={styles.postswrapper}>
      {posts &&
        posts.map((post, index) => <PostCard key={index} post={post} />)}
    </div>
  );
};
