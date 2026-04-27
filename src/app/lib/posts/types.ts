import type { PostCategory } from "@/app/constants/postCategories";

export type PostStatus = "draft" | "published";
export type PostLanguage = "en" | "es";

export type PostFrontmatter = {
  title: string;
  category: PostCategory;
  excerpt: string;
  publishedAt: string;
  description: string;
  status: PostStatus;
  tags: string[];
  language: PostLanguage;
  updatedAt?: string;
  featured?: boolean;
  coverPrompt?: string;
  socialSummary?: string;
  canonicalUrl?: string;
  series?: {
    title: string;
    order: number;
  };
};

export type PostHeading = {
  heading: number;
  text: string;
  slug: string;
};

export type Post = PostFrontmatter & {
  slug: string;
  content: string;
  shortDate: string;
  headings: PostHeading[];
};
