"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { fetchLikes, saveLike } from "../utils/likesUtil";
import { saveView } from "../utils/viewsUtil";

type PostStatsContextValue = {
  isLoading: boolean;
  likes: number;
  views: number;
  isLiked: boolean;
  isLiking: boolean;
  handleLike: () => Promise<void>;
};

const PostStatsContext = createContext<PostStatsContextValue | null>(null);

const inFlightStats = new Map<
  string,
  Promise<{ likes: number; views: number }>
>();

function loadPostStatsOnce(slug: string) {
  let pending = inFlightStats.get(slug);
  if (!pending) {
    pending = Promise.all([fetchLikes(slug), saveView(slug)]).then(
      ([likes, views]) => {
        window.setTimeout(() => {
          inFlightStats.delete(slug);
        }, 1000);
        return { likes, views };
      },
    );
    inFlightStats.set(slug, pending);
  }
  return pending;
}

type Props = {
  slug: string;
  children: React.ReactNode;
};

export function PostStatsProvider({ slug, children }: Props) {
  const [isLoading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;

    loadPostStatsOnce(slug).then(({ likes: fetchedLikes, views: updatedViews }) => {
      if (cancelled) return;

      setLikes(fetchedLikes);
      setViews(updatedViews);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const handleLike = useCallback(async () => {
    if (isLiked || isLiking) return;
    setIsLiking(true);

    try {
      const nextLikes = await saveLike(slug);
      setLikes(nextLikes);
      setIsLiked(true);
    } finally {
      setIsLiking(false);
    }
  }, [slug, isLiked, isLiking]);

  const value = useMemo(
    () => ({
      isLoading,
      likes,
      views,
      isLiked,
      isLiking,
      handleLike,
    }),
    [isLoading, likes, views, isLiked, isLiking, handleLike],
  );

  return (
    <PostStatsContext.Provider value={value}>
      {children}
    </PostStatsContext.Provider>
  );
}

export function usePostStats() {
  const context = useContext(PostStatsContext);

  if (!context) {
    throw new Error("usePostStats must be used within a PostStatsProvider");
  }

  return context;
}
