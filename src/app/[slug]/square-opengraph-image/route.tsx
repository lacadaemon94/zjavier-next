import { notFound } from "next/navigation";
import {
  getPublishedPostBySlug,
  getPublishedPosts,
} from "../../lib/posts/getPosts";
import {
  openGraphContentType,
  renderPostOpenGraphImage,
} from "../../lib/posts/openGraphImage";

export const runtime = "nodejs";
export const contentType = openGraphContentType;

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
