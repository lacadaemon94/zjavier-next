import { useState, useEffect } from "react";
import { Post } from "contentlayer/generated";
import { getPublishedPosts } from "./posts/getPublishedPosts";

const publishedPosts = getPublishedPosts();

export const categories = {
  ALL: "All",
  TUTORIAL: "Tutorial",
  OPINION: "Opinion",
  NOTE: "Note",
  CASE_STUDY: "Case Study",
  BUILD_LOG: "Build Log",
  AUTOMATION: "Automation",
  AI: "AI",
  WEB_DEVELOPMENT: "Web Development",
  PRODUCT: "Product",
  CAREER: "Career",
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

  const [filteredPosts, setFilteredPosts] = useState<Post[]>(publishedPosts);

  useEffect(() => {
    if (selectedCategory === categories.ALL) {
      setFilteredPosts(publishedPosts);
    } else {
      setFilteredPosts(
        publishedPosts.filter((post) => post.category === selectedCategory)
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
