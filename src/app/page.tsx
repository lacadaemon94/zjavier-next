// Home
// Core
import React from "react";
import type { Metadata } from "next";
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

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dictionary } = await getI18n();
  const title = dictionary.metadata.defaultTitle;
  const description = dictionary.metadata.description;

  return {
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title,
      description,
      url: "/",
      siteName: "ZJAVIER",
      locale: locale === "es" ? "es_SV" : "en_US",
      type: "website",
      images: [
        {
          url: "/OG_BG.png",
          width: 1200,
          height: 630,
          alt: "Javier Flores - AI Product & Automation Engineer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/OG_BG.png"],
    },
  };
}

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
