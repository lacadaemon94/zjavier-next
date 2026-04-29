import { supabase } from "@/supabaseClient";

/**
 * Fetches the number of views for a given post.
 * @param flatPath The slug of the post to fetch views for.
 * @returns A promise that resolves to the number of views for the post, or 0 if an error occurs.
 */
export const fetchViews = async (flatPath: string): Promise<number> => {
  const { data, error } = await supabase
    .from("post")
    .select("views")
    .eq("slug", flatPath)
    .single();

  if (error) {
    console.error("Error fetching views", error);
    return 0;
  }

  return data?.views ?? 0;
};

/**
 * Increments the number of views for a given post.
 * @param flatPath The slug of the post to update views for.
 * @returns A promise that resolves to the updated number of views, or 1 if an error occurs.
 */
export const saveView = async (flatPath: string): Promise<number> => {
  const { data, error } = await supabase.rpc("increment_post_views", {
    post_slug: flatPath,
  });

  if (error) {
    console.error("Error incrementing views", error);
    return 1;
  }

  return data ?? 1;
};
