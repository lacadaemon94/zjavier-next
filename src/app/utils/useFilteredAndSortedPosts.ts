import { useState, useEffect, useMemo, useCallback } from "react";
import type { PostWithStats } from "@/app/lib/posts/postWithStats";
import type { PostLanguage } from "@/app/lib/posts/types";
import { fetchLikesAndViews } from "./fetchLikesAndViews";
import {
  FILTER_CATEGORIES as categories,
  POST_CATEGORIES,
  type FilterCategory as Category,
  type PostCategory,
} from "../constants/postCategories";

export const sortings = {
  DATE: "date",
  LIKES: "likes",
  VIEWS: "views",
} as const;

export type SortType = (typeof sortings)[keyof typeof sortings];
export type LanguageFilter = "all" | PostLanguage;

type StatsMap = Record<string, { likes: number; views: number }>;

const useFilteredAndSortedPosts = (posts: PostWithStats[]) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    categories.ALL,
  );
  const [selectedLanguage, setSelectedLanguage] =
    useState<LanguageFilter>("all");
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

  const availableCategories = useMemo<PostCategory[]>(() => {
    const present = new Set(posts.map((post) => post.category));
    return POST_CATEGORIES.filter((category) => present.has(category));
  }, [posts]);

  const availableLanguages = useMemo<PostLanguage[]>(() => {
    const present = new Set(posts.map((post) => post.language));
    return (["en", "es"] as const).filter((lang) => present.has(lang));
  }, [posts]);

  const filteredAndSortedPosts = useMemo(() => {
    const mergedPosts: PostWithStats[] = posts.map((post) => {
      const stats = statsBySlug[post.slug];

      return {
        ...post,
        likes: stats ? stats.likes : (post.likes ?? 0),
        views: stats ? stats.views : (post.views ?? 0),
      };
    });

    const filteredPosts = mergedPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === categories.ALL ||
        post.category === selectedCategory;
      const matchesLanguage =
        selectedLanguage === "all" || post.language === selectedLanguage;

      return matchesCategory && matchesLanguage;
    });

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
  }, [posts, statsBySlug, selectedCategory, selectedLanguage, sortType]);

  const handleFilter = useCallback((category: Category) => {
    setSelectedCategory(category);
  }, []);

  const handleLanguageFilter = useCallback((language: LanguageFilter) => {
    setSelectedLanguage(language);
  }, []);

  const handleSort = useCallback((type: SortType) => {
    setSortType(type);
  }, []);

  const resetFilters = useCallback(() => {
    setSelectedCategory(categories.ALL);
    setSelectedLanguage("all");
  }, []);

  return {
    filteredAndSortedPosts,
    availableCategories,
    availableLanguages,
    handleFilter,
    handleLanguageFilter,
    handleSort,
    resetFilters,
    selectedCategory,
    selectedLanguage,
    sortType,
  };
};

export default useFilteredAndSortedPosts;
