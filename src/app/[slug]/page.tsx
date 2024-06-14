// Notes Posts - app/notes/[slug]/page.tsx
import React from "react";
import { allPosts } from "contentlayer/generated";
import { Metadata, ResolvingMetadata } from "next";
import { useMDXComponent } from "next-contentlayer/hooks";
import { notFound } from "next/navigation";
import { format } from "date-fns";
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
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

const mdxComponents = {
  BlurImage,
  AsideImage,
  FullCode: (props: FullCodeProps) => <FullCode {...props} />,
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
      <MDXContent components={mdxComponents} />
      <Footer />
    </article>
  );
}
