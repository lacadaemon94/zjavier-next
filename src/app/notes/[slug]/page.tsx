// Notes Posts - app/notes/[slug]/page.tsx
import React from "react";
import { allPosts } from "contentlayer/generated";
import { Metadata, ResolvingMetadata } from "next";
import { useMDXComponent } from "next-contentlayer/hooks";
import { notFound } from "next/navigation";
import { format } from "date-fns";

// MDX Components
import { BlurImage } from "@/app/components/mdxComponents/BlurImage";
import { AsideImage } from "@/app/components/mdxComponents/AsideImage";

// Styles
import styles from "../../styles/posts.module.css";
import { PostIndex } from "@/app/components/mdxComponents/PostIndex";

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

const mdxComponents = {
  BlurImage,
  AsideImage,
};

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) notFound();

  return {
    title: post.slug,
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  // Find the post for the current page.
  const post = allPosts.find((post) => post.slug === params.slug);

  // 404 if the post does not exist.
  if (!post) notFound();

  // Parse the MDX file via the useMDXComponent hook.
  const MDXContent = useMDXComponent(post.body.code);

  return (
    <article className={styles.post}>
      {/* Some code ... */}
      <header className={styles.header}>
        <h1>{post.title}</h1>
        <div className={styles.header_details}>
          <p>{format(new Date(post.publishedAt), "MMMM do, yyyy")}</p>
        </div>
      </header>
      <PostIndex headings={post.headings} flatPath={post._raw.flattenedPath} />
      <MDXContent components={mdxComponents} />
    </article>
  );
}
