import { useState, useEffect, useMemo, useCallback } from "react";
import type { PostWithStats } from "@/app/lib/posts/postWithStats";
import { fetchLikesAndViews } from "./fetchLikesAndViews";
import {
  FILTER_CATEGORIES as categories,
  type FilterCategory as Category,
} from "../constants/postCategories";

export const sortings = {
  DATE: "date",
  LIKES: "likes",
  VIEWS: "views",
} as const;

export type SortType = (typeof sortings)[keyof typeof sortings];

type StatsMap = Record<string, { likes: number; views: number }>;

const useFilteredAndSortedPosts = (posts: PostWithStats[]) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    categories.ALL,
  );
  const [sortType, setSortType] = useState<SortType>(sortings.DATE);
  const [statsBySlug, setStatsBySlug] = useState<StatsMap>({});

  useEffect(() => {
    let cancelled = false;

    const loadStats = async () => {
      const likesAndViews = await fetchLikesAndViews();
      if (cancelled) return;

      const nextStats: StatsMap = {};
      for (const item of likesAndViews) {
        nextStats[item.slug] = {
          likes: item.likes ?? 0,
          views: item.views ?? 0,
        };
      }
      setStatsBySlug(nextStats);
    };

    loadStats();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredAndSortedPosts = useMemo(() => {
    const mergedPosts: PostWithStats[] = posts.map((post) => {
      const stats = statsBySlug[post.slug];

      return {
        ...post,
        likes: stats ? stats.likes : (post.likes ?? 0),
        views: stats ? stats.views : (post.views ?? 0),
      };
    });

    const filteredPosts =
      selectedCategory === categories.ALL
        ? mergedPosts
        : mergedPosts.filter((post) => post.category === selectedCategory);

    return [...filteredPosts].sort((a, b) => {
      if (sortType === sortings.LIKES) {
        return b.likes - a.likes;
      }

      if (sortType === sortings.VIEWS) {
        return b.views - a.views;
      }

      return (
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    });
  }, [posts, statsBySlug, selectedCategory, sortType]);

  const handleFilter = useCallback((category: Category) => {
    setSelectedCategory(category);
  }, []);

  const handleSort = useCallback((type: SortType) => {
    setSortType(type);
  }, []);

  return {
    filteredAndSortedPosts,
    handleFilter,
    handleSort,
    selectedCategory,
    sortType,
  };
};

export default useFilteredAndSortedPosts;
