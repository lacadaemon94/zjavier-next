// Home
// Core
import React from "react";
import { getPublishedPosts } from "./lib/posts/getPosts";
import type { PostWithStats } from "./lib/posts/postWithStats";
import { getI18n } from "./i18n/server";
// Utils
// Ui Elements
import HomeHeader from "./components/HomeHeader";
import NotesContainer from "./components/NotesContainer";
import Footer from "./components/Footer";
// Assets
// Styles
import styles from "./styles/home.module.css";

export default async function Page() {
  const { locale, dictionary } = await getI18n();
  const posts: PostWithStats[] = getPublishedPosts().map((post) => ({
    ...post,
    likes: 0,
    views: 0,
  }));

  return (
    <div className={styles.home}>
      <HomeHeader
        locale={locale}
        copy={dictionary.home}
        language={dictionary.language}
      />
      <NotesContainer locale={locale} copy={dictionary.notes} posts={posts} />
      <Footer copy={dictionary.footer} />
    </div>
  );
}
