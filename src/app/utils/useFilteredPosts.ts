import { useState, useEffect } from "react";
import type { Post } from "@/app/lib/posts/types";
import { getPublishedPosts } from "@/app/lib/posts/getPosts";
import {
  FILTER_CATEGORIES as categories,
  type FilterCategory as Category,
} from "../constants/postCategories";

const publishedPosts = getPublishedPosts();

/**
 * Custom hook to manage filtering of posts based on selected category
 * @returns An object containing filtered posts, a function to handle category change, and the selected category
 */
const useFilteredPosts = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    categories.ALL,
  );

  const filteredPosts =
    selectedCategory === categories.ALL
      ? publishedPosts
      : publishedPosts.filter((post) => post.category === selectedCategory);

  /**
   * Handles the filter change
   * @param category The selected category to filter posts
   */
  const handleFilter = (category: Category) => {
    setSelectedCategory(category);
  };

  return { filteredPosts, handleFilter, selectedCategory };
};

export default useFilteredPosts;
