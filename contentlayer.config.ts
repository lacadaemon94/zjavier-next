// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrettyCode from "rehype-pretty-code";

const Post = defineDocumentType(() => ({
  name: "Post",
  contentType: "mdx",
  // Location of Post source files, global `**` pattern to match any number of levels
  filePathPattern: `posts/**/*.mdx`,
  fields: {
    title: {
      type: "string",
      required: true,
    },
  },
}));

/** @type {import('rehype-pretty-code').Options} */
const options = {
  theme: 'dracula-soft'
}

export default makeSource({
  // Location of source files for all defined documentTypes
  contentDirPath: "content",
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [[rehypePrettyCode, options]]
  }
});
