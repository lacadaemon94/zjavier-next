import { useState, useEffect } from "react";
import { allPosts, Post } from "contentlayer/generated";

export const categories = {
  ALL: "All",
  TUTORIAL: "Tutorial",
  OPINION: "Opinion",
  NOTE: "Note",
} as const;

export type Category = (typeof categories)[keyof typeof categories];

/**
 * Custom hook to manage filtering of posts based on selected category
 * @returns An object containing filtered posts, a function to handle category change, and the selected category
 */
const useFilteredPosts = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    categories.ALL
  );

  const [filteredPosts, setFilteredPosts] = useState<Post[]>(allPosts);

  useEffect(() => {
    if (selectedCategory === categories.ALL) {
      setFilteredPosts(allPosts);
    } else {
      setFilteredPosts(
        allPosts.filter((post) => post.category === selectedCategory)
      );
    }
  }, [selectedCategory]);

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
