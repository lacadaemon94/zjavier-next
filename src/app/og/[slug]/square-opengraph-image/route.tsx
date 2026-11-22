import { notFound } from "next/navigation";
import {
  getPublishedPostBySlug,
  getPublishedPosts,
} from "@/app/lib/posts/getPosts";
import { renderPostOpenGraphImage } from "@/app/lib/posts/openGraphImage";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  return getPublishedPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = getPublishedPostBySlug(slug);

  if (!post) notFound();

  return renderPostOpenGraphImage(post, "square");
}
