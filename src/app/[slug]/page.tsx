// Notes Posts - app/notes/[slug]/page.tsx
import React from "react";
import {
  getPublishedPostBySlug,
  getPublishedPosts,
} from "../lib/posts/getPosts";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { format } from "date-fns";
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
import { BlurImage } from "@/app/components/mdxComponents/BlurImage";
import { AsideImage } from "@/app/components/mdxComponents/AsideImage";
import {
  FullCode,
  FullCodeProps,
} from "@/app/components/mdxComponents/FullCode";
// Styles
import styles from "../styles/posts.module.css";
// Assets
import LeftArrowIcon from "@/assets/icons/LeftArrowIcon";

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

const mdxComponents = {
  BlurImage,
  AsideImage,
  FullCode: (props: FullCodeProps) => <FullCode {...props} />,
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPublishedPostBySlug(slug);

  if (!post) notFound();

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = getPublishedPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className={styles.post}>
      <MobileActions slug={post.slug} />
      <StickyHeader />
      <div className={styles.goback}>
        <NavButton
          className={styles.gobackbutton}
          href="/"
          icon={<LeftArrowIcon />}
          ariaLabel="Go Back Home"
          text="Go Back"
        />
      </div>
      <header className={styles.header}>
        <h1>{post.title}</h1>
        <div className={styles.header_details}>
          <p>{format(new Date(post.publishedAt), "MMMM do, yyyy")}</p>
          <PostHeaderDetails slug={post.slug} />
        </div>
      </header>
      <PostIndex headings={post.headings} flatPath={post.slug} />
      <MDXRemote
        source={post.content}
        components={mdxComponents}
        options={mdxOptions as any}
      />
      <Footer />
    </article>
  );
}

