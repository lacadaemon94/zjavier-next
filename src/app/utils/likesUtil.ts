import { supabase } from "@/supabaseClient";

/**
 * Fetches the number of likes for a given post.
 * @param flatPath The slug of the post to fetch likes for.
 * @returns A promise that resolves to the number of likes for the post, or 0 if an error occurs.
 */
export const fetchLikes = async (flatPath: string): Promise<number> => {
  const { data, error } = await supabase
    .from("post")
    .select("likes")
    .eq("slug", flatPath)
    .single();

  if (error) {
    console.error("Error fetching likes", error);
    return 0;
  }

  return data?.likes ?? 0;
};

/**
 * Increments the number of likes for a given post.
 * @param flatPath The slug of the post to update likes for.
 * @returns A promise that resolves to the updated number of likes, or 1 if an error occurs.
 */
export const saveLike = async (flatPath: string): Promise<number> => {
  const { data, error } = await supabase.rpc("increment_post_likes", {
    post_slug: flatPath,
  });

  if (error) {
    console.error("Error incrementing likes", error);
    return 1;
  }

  return data ?? 1;
};
