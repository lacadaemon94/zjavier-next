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
    console.error("Error fetching likes", error);
    return 0;
  }

  if (data) {
    return data.views;
  }

  return 0; // Return 0 if data is undefined
};

/**
 * Updates the number of likes for a given post.
 * @param flatPath The slug of the post to update likes for.
 * @param likes The new number of likes to set.
 * @returns A promise that resolves to the updated number of likes, or 1 if an error occurs.
 */
export const saveView = async (
  flatPath: string,
  views: number
): Promise<number> => {
  const { data, error } = await supabase
    .from("post")
    .update({
      views: views,
    })
    .eq("slug", flatPath)
    .select()
    .single();

  if (error) {
    console.error("Error updating likes", error);
    return 1;
  }

  if (data) {
    return data.views;
  }

  return 1; // Return 1 if data is undefined
};
