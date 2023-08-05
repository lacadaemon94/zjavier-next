// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var Post = defineDocumentType(() => ({
  name: "Post",
  contentType: "mdx",
  // Location of Post source files, global `**` pattern to match any number of levels
  filePathPattern: `posts/**/*.mdx`,
  fields: {
    // ...
  }
}));
var contentlayer_config_default = makeSource({
  // Location of source files for all defined documentTypes
  contentDirPath: "content",
  documentTypes: [Post]
});
export {
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-Z2X3ONIW.mjs.map
