import { supabase } from "@/supabaseClient";

/**
 * Fetches the number of likes and views for a all post.
 * @returns A promise that resolves to the number of likes and views for all posts, or an empty array if an error occurs.
 */

export const fetchLikesAndViews = async () => {
  const { data, error } = await supabase
    .from("post")
    .select("slug, likes, views");

  if (error) {
    console.error("Error fetching likes and views:", error);
    return [];
  }

  return data;
};
