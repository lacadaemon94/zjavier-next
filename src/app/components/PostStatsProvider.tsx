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
import { fetchViews, saveView } from "../utils/viewsUtil";

const LIKED_STORAGE_KEY = "zj_liked_posts";
const VIEWED_STORAGE_KEY = "zj_viewed_posts";

function readSlugSet(storage: Storage | undefined, key: string): Set<string> {
  if (!storage) return new Set();
  try {
    const raw = storage.getItem(key);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? new Set(parsed.filter((item): item is string => typeof item === "string"))
      : new Set();
  } catch {
    return new Set();
  }
}

function writeSlugToSet(storage: Storage | undefined, key: string, slug: string) {
  if (!storage) return;
  try {
    const slugs = readSlugSet(storage, key);
    slugs.add(slug);
    storage.setItem(key, JSON.stringify(Array.from(slugs)));
  } catch {
    // Storage unavailable (private mode or quota)
  }
}

function hasLikedPost(slug: string): boolean {
  if (typeof window === "undefined") return false;
  return readSlugSet(window.localStorage, LIKED_STORAGE_KEY).has(slug);
}

function markPostLiked(slug: string) {
  if (typeof window === "undefined") return;
  writeSlugToSet(window.localStorage, LIKED_STORAGE_KEY, slug);
}

function hasViewedPostInSession(slug: string): boolean {
  if (typeof window === "undefined") return false;
  return readSlugSet(window.sessionStorage, VIEWED_STORAGE_KEY).has(slug);
}

function markPostViewedInSession(slug: string) {
  if (typeof window === "undefined") return;
  writeSlugToSet(window.sessionStorage, VIEWED_STORAGE_KEY, slug);
}

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
    const alreadyViewed = hasViewedPostInSession(slug);
    const viewsPromise = alreadyViewed ? fetchViews(slug) : saveView(slug);

    if (!alreadyViewed) {
      markPostViewedInSession(slug);
    }

    pending = Promise.all([fetchLikes(slug), viewsPromise]).then(
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
    const storedLiked = hasLikedPost(slug);

    loadPostStatsOnce(slug).then(({ likes: fetchedLikes, views: updatedViews }) => {
      if (cancelled) return;

      setIsLiked(storedLiked);
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
      markPostLiked(slug);
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
