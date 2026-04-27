import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import { formatDate } from "@/app/utils/formatDate";
import type { Post, PostFrontmatter, PostHeading } from "./types";

const POSTS_DIRECTORY = path.join(process.cwd(), "content/posts");

function getPostSlug(fileName: string) {
  return fileName.replace(/\.mdx$/, "");
}

function getHeadings(content: string): PostHeading[] {
  const slugger = new GithubSlugger();
  const headingRegex = /\n\n(?<flag>#{1,6})\s+(?<content>.+)/g;

  return Array.from(content.matchAll(headingRegex)).map(({ groups }) => {
    const flag = groups?.flag;
    const text = groups?.content;

    return {
      heading: flag?.length,
      text,
      slug: text ? slugger.slug(text) : undefined,
    };
  });
}

function readPostFile(fileName: string): Post {
  const fullPath = path.join(POSTS_DIRECTORY, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const frontmatter = data as PostFrontmatter;
  const slug = getPostSlug(fileName);

  return {
    ...frontmatter,
    slug,
    content,
    shortDate: formatDate(frontmatter.publishedAt),
    headings: getHeadings(content),
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    return [];
  }

  return fs
    .readdirSync(POSTS_DIRECTORY)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map(readPostFile)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function getPublishedPosts(): Post[] {
  return getAllPosts().filter((post) => post.status === "published");
}

export function getPublishedPostBySlug(slug: string): Post | undefined {
  return getPublishedPosts().find((post) => post.slug === slug);
}
