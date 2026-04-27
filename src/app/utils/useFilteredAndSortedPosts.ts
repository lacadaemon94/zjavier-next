import { useState, useEffect } from "react";
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

const useFilteredAndSortedPosts = (posts: PostWithStats[]) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    categories.ALL,
  );
  const [sortType, setSortType] = useState<SortType>(sortings.DATE);
  const [filteredAndSortedPosts, setFilteredAndSortedPosts] =
    useState<PostWithStats[]>(posts);

  useEffect(() => {
    const fetchAndCombineData = async () => {
      const likesAndViews = await fetchLikesAndViews();

      const mergedPosts: PostWithStats[] = posts.map((post) => {
        const stats = likesAndViews.find((item) => item.slug === post.slug);

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

      const sortedAndFilteredPosts = [...filteredPosts].sort((a, b) => {
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

      setFilteredAndSortedPosts(sortedAndFilteredPosts);
    };

    fetchAndCombineData();
  }, [posts, selectedCategory, sortType]);

  const handleFilter = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleSort = (type: SortType) => {
    setSortType(type);
  };

  return {
    filteredAndSortedPosts,
    handleFilter,
    handleSort,
    selectedCategory,
    sortType,
  };
};

export default useFilteredAndSortedPosts;
