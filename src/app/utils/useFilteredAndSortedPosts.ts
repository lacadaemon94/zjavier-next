import { useState, useEffect } from "react";
import { allPosts, Post } from "contentlayer/generated";
import { fetchLikesAndViews } from "./fetchLikesAndViews";

export const categories = {
  ALL: "All",
  TUTORIAL: "Tutorial",
  OPINION: "Opinion",
  NOTE: "Note",
} as const;

export type Category = (typeof categories)[keyof typeof categories];

export const sortings = {
  DATE: "date",
  LIKES: "likes",
  VIEWS: "views",
} as const;

export type SortType = (typeof sortings)[keyof typeof sortings];

/**
 * Custom hook to manage filtering and sorting of posts based on selected criteria
 * @returns An object containing filtered and sorted posts, functions to handle category and sort type changes, and the selected category and sort type
 */
const useFilteredAndSortedPosts = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    categories.ALL
  );
  const [sortType, setSortType] = useState<SortType>(sortings.DATE);
  const [filteredAndSortedPosts, setFilteredAndSortedPosts] =
    useState<any>(allPosts);

  useEffect(() => {
    const fetchAndCombineData = async () => {
      const likesAndViews = await fetchLikesAndViews();

      const mergedPosts = allPosts.map((post) => {
        const stats = likesAndViews.find((item) => item.slug === post.slug);
        return {
          ...post,
          likes: stats ? stats.likes : 0,
          views: stats ? stats.views : 0,
        };
      });

      let filteredPosts;
      if (selectedCategory === categories.ALL) {
        filteredPosts = mergedPosts;
      } else {
        filteredPosts = mergedPosts.filter(
          (post) => post.category === selectedCategory
        );
      }

      let sortedAndFilteredPosts;
      if (sortType === sortings.DATE) {
        sortedAndFilteredPosts = filteredPosts.sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
        );
      } else if (sortType === sortings.LIKES) {
        sortedAndFilteredPosts = filteredPosts.sort(
          (a, b) => b.likes - a.likes
        );
      } else if (sortType === sortings.VIEWS) {
        sortedAndFilteredPosts = filteredPosts.sort(
          (a, b) => b.views - a.views
        );
      }

      setFilteredAndSortedPosts(sortedAndFilteredPosts);
    };

    fetchAndCombineData();
  }, [selectedCategory, sortType]);

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
