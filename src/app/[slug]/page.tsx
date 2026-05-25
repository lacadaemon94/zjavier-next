// Notes Posts - app/notes/[slug]/page.tsx
import React from "react";
import {
  getPublishedPostBySlug,
  getPublishedPosts,
} from "../lib/posts/getPosts";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
// Ui Elements
import StickyHeader from "../components/StickyHeader";
import Footer from "../components/Footer";
import NavButton from "../components/NavButton";
import PostHeaderDetails from "../components/PostHeaderDetails";
import MobileActions from "../components/MobileActions";
// MDX Components
import { PostIndex } from "@/app/components/mdxComponents/PostIndex";
import { mdxComponents } from "@/app/components/mdxComponents/registry";
// Styles
import styles from "../styles/posts.module.css";
// Assets
import LeftArrowIcon from "@/assets/icons/LeftArrowIcon";
import { getI18n } from "../i18n/server";
import { formatLocalizedDate } from "../i18n/date";

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
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPublishedPostBySlug(slug);

  if (!post) notFound();
  const canonicalUrl = `https://zjavier.com/${post.slug}`;
  const wideImageUrl = `${canonicalUrl}/opengraph-image`;
  const squareImageUrl = `${canonicalUrl}/square-opengraph-image`;
  const imageAlt = `${post.title} - Javier Notes`;

  return {
    title: post.title,
    description: post.description,
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
  const { locale, dictionary } = await getI18n();
  const { slug } = await params;
  const post = getPublishedPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className={styles.post}>
      <MobileActions ariaLabel={dictionary.post.home} slug={post.slug} />
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
          <PostHeaderDetails slug={post.slug} />
        </div>
      </header>
      <PostIndex
        headings={post.headings}
        flatPath={post.slug}
        labels={dictionary.post}
      />
      <MDXRemote
        source={post.content}
        components={mdxComponents}
        options={mdxOptions as any}
      />
      <Footer copy={dictionary.footer} />
    </article>
  );
}
