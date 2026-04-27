export const POST_CATEGORIES = [
  "Tutorial",
  "Opinion",
  "Note",
  "Case Study",
  "Build Log",
  "Automation",
  "AI",
  "Web Development",
  "Product",
  "Career",
] as const;

export const FILTER_CATEGORIES = {
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

export type PostCategory = (typeof POST_CATEGORIES)[number];
export type FilterCategory =
  (typeof FILTER_CATEGORIES)[keyof typeof FILTER_CATEGORIES];
