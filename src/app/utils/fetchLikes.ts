import { supabase } from "@/supabaseClient";

export const fetchLikes = async (flatPath: string) => {
  const { data, error } = await supabase
    .from("posts_metrics")
    .select("likes")
    .eq("slug", flatPath)
    .single();

  if (error) {
    console.error("Error fetching likes", error);
    return 0;
  }

  if (data) {
    return data.likes;
  }
};

export const saveLike = async (flathPath: string, likes: number) => {
  const { data, error } = await supabase
    .from("posts_metrics")
    .update({
      likes: likes,
    })
    .eq("slug", flathPath)
    .select()
    .single();

  if (error) {
    console.error("Error updating likes", error);
    return 1;
  }

  if (data) {
    return data.likes;
  }
};
