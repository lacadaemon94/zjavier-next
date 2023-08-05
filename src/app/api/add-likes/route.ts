import { createClient } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const client = createClient();
  await client.connect();

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const likes = searchParams.get("likes");
  const views = searchParams.get("views");

  try {
    if (!slug || !likes) throw new Error("Error bitch");
    await client.sql`INSERT INTO posts_metrics (Slug, Likes, Views) VALUES (${slug}, ${likes}, ${views});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    await client.end();
  }

  const pets = await client.sql`SELECT * FROM posts_metrics;`;
  return NextResponse.json({ pets }, { status: 200 });
}
