// Home
import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedPosts } from "@/app/lib/posts/getPosts";
import type { PostWithStats } from "@/app/lib/posts/postWithStats";
import { isLocale } from "@/app/i18n/config";
import { getDictionary } from "@/app/i18n/dictionaries";
import HomeHeader from "@/app/components/HomeHeader";
import NotesContainer from "@/app/components/NotesContainer";
import Footer from "@/app/components/Footer";
import styles from "@/app/styles/home.module.css";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
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

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);

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
