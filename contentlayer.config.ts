// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";

const Post = defineDocumentType(() => ({
  name: "Post",
  contentType: "mdx",
  // Location of Post source files, global `**` pattern to match any number of levels
  filePathPattern: `posts/**/*.mdx`,
  fields: {
    // ...
  },
}));

export default makeSource({
  // Location of source files for all defined documentTypes
  contentDirPath: "content",
  documentTypes: [Post],
});
