import { allPosts, Post } from "contentlayer/generated";

export function getPublishedPosts(): Post[] {
  return allPosts.filter((post) => post.status === "published");
}

export function getPublishedPostBySlug(slug: string): Post | undefined {
  return getPublishedPosts().find((post) => post.slug === slug);
}