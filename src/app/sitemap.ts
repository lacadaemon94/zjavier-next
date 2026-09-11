import type { MetadataRoute } from "next";
import { getPublishedPosts } from "./lib/posts/getPosts";

const BASE_URL = "https://zjavier.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const generatedAt = new Date();

  return [
    {
      url: BASE_URL,
      lastModified: generatedAt,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/cv`,
      lastModified: generatedAt,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...getPublishedPosts().map((post) => ({
      url: `${BASE_URL}/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
