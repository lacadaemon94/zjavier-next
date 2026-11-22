import React from "react";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import {
  getPublishedPostBySlug,
  getPublishedPosts,
} from "@/app/lib/posts/getPosts";
import { isLocale } from "@/app/i18n/config";
import { getDictionary } from "@/app/i18n/dictionaries";
import { formatLocalizedDate } from "@/app/i18n/date";
import StickyHeader from "@/app/components/StickyHeader";
import Footer from "@/app/components/Footer";
import NavButton from "@/app/components/NavButton";
import PostHeaderDetails from "@/app/components/PostHeaderDetails";
import MobileActions from "@/app/components/MobileActions";
import { PostStatsProvider } from "@/app/components/PostStatsProvider";
import { PostIndex } from "@/app/components/mdxComponents/PostIndex";
import { createMdxComponents } from "@/app/components/mdxComponents/registry";
import styles from "@/app/styles/posts.module.css";
import LeftArrowIcon from "@/assets/icons/LeftArrowIcon";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getPublishedPosts().map((post) => ({
    slug: post.slug,
  }));
}

const prettyCodeOptions = {
  theme: "material-theme-darker",
  tokensMap: {
    fn: "entity.name.function",
    objKey: "meta.object-literal.key",
  },
};

const mdxOptions = {
  mdxOptions: {
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, prettyCodeOptions],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
        },
      ],
    ],
  },
};

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const post = getPublishedPostBySlug(slug);

  if (!post) notFound();
  const canonicalUrl = `https://zjavier.com/${post.slug}`;
  const wideImageUrl = `${canonicalUrl}/opengraph-image`;
  const squareImageUrl = `${canonicalUrl}/square-opengraph-image`;
  const imageAlt = `${post.title} - Javier Notes`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: post.canonicalUrl || canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonicalUrl,
      type: "article",
      images: [
        {
          url: wideImageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
        {
          url: squareImageUrl,
          width: 1080,
          height: 1080,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [wideImageUrl],
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  const post = getPublishedPostBySlug(slug);

  if (!post) notFound();

  return (
    <PostStatsProvider slug={post.slug}>
      <article className={styles.post}>
        <MobileActions ariaLabel={dictionary.post.home} />
        <StickyHeader
          locale={locale}
          avatarAlt={dictionary.home.avatarAlt}
          language={dictionary.language}
        />
        <div className={styles.goback}>
          <NavButton
            className={styles.gobackbutton}
            href="/"
            icon={<LeftArrowIcon />}
            ariaLabel={dictionary.post.goBackHome}
            text={dictionary.post.goBack}
          />
        </div>
        <header className={styles.header}>
          <h1>{post.title}</h1>
          <div className={styles.header_details}>
            <p>
              {formatLocalizedDate(
                new Date(post.publishedAt),
                "MMMM do, yyyy",
                locale,
              )}
            </p>
            <PostHeaderDetails />
          </div>
        </header>
        <PostIndex headings={post.headings} labels={dictionary.post} />
        <MDXRemote
          source={post.content}
          components={createMdxComponents(post.language)}
          options={mdxOptions as any}
        />
        <Footer copy={dictionary.footer} />
      </article>
    </PostStatsProvider>
  );
}
