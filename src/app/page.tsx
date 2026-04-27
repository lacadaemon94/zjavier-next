// Home
// Core
import React from "react";
import { getPublishedPosts } from "./lib/posts/getPosts";
import type { PostWithStats } from "./lib/posts/postWithStats";
// Utils
// Ui Elements
import HomeHeader from "./components/HomeHeader";
import NotesContainer from "./components/NotesContainer";
import Footer from "./components/Footer";
// Assets
// Styles
import styles from "./styles/home.module.css";

export default function Page() {
  const posts: PostWithStats[] = getPublishedPosts().map((post) => ({
    ...post,
    likes: 0,
    views: 0,
  }));

  return (
    <div className={styles.home}>
      <HomeHeader />
      <NotesContainer posts={posts} />
      <Footer />
    </div>
  );
}
