import type { Post } from "./types";

export type PostWithStats = Post & {
  likes: number;
  views: number;
};
