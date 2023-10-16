// contentlayer.config.ts
import {
  defineDocumentType,
  makeSource,
  defineNestedType,
} from "contentlayer/source-files";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { formatDate } from "./src/app/utils/formatDate";
import GithubSlugger from 'github-slugger'

const Series = defineNestedType(() => ({
  name: "Series",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    order: {
      type: "number",
      required: true,
    },
  },
}));

const allTagNames = ["Next.js", "MDX", "Next Conf", "React Conf"];
const allTagSlugs = ["next", "mdx", "next-conf", "react-conf"];

const Tag = defineNestedType(() => ({
  name: "Tag",
  fields: {
    title: {
      type: "enum",
      required: true,
      options: allTagNames,
    },
    slug: {
      type: "enum",
      required: true,
      options: allTagSlugs,
    },
  },
}));

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
    publishedAt: { type: "string", required: true },
    description: { type: "string", required: true },
    status: { type: "enum", options: ["draft", "published"], required: true },
    series: {
      type: "nested",
      of: Series,
    },
    tags: {
      type: "list",
      of: { type: 'string' },
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (post) =>
        post._raw.sourceFileName
          // hello-world.mdx => hello-world
          .replace(/\.mdx$/, ""),
    },
    shortDate: {
      type: "string",
      resolve: (doc) => {
        return formatDate(doc.publishedAt);
      },
    },
    headings: {
      type: "json",
      resolve: async (doc) => {
        // use same package as rehypeSlug so toc and sluggified headings match
        // https://github.com/rehypejs/rehype-slug/blob/main/package.json#L36
        const slugger = new GithubSlugger()

        // https://stackoverflow.com/a/70802303
        const regXHeader = /\n\n(?<flag>#{1,6})\s+(?<content>.+)/g

        const headings = Array.from(doc.body.raw.matchAll(regXHeader)).map(
          ({ groups }) => {
            const flag = groups?.flag
            const content = groups?.content
            return {
              heading: flag?.length,
              text: content,
              slug: content ? slugger.slug(content) : undefined,
            }
          },
        )

        return headings
      },
    },
  },
}));

/** @type {import('rehype-pretty-code').Options} */
const options = {
  theme: "dracula-soft",
  tokensMap: {
    // VScode command palette: Inspect Editor Tokens and Scopes
    // https://github.com/Binaryify/OneDark-Pro/blob/47c66a2f2d3e5c85490e1aaad96f5fab3293b091/themes/OneDark-Pro.json
    fn: "entity.name.function",
    objKey: "meta.object-literal.key",
  },
};

export default makeSource({
  // Location of source files for all defined documentTypes
  contentDirPath: "content",
  documentTypes: [Post],
  mdx: {
    esbuildOptions(options) {
      options.target = "esnext"
      return options
    },
    rehypePlugins: [
      [rehypeSlug],
      [rehypePrettyCode, options],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          // properties: {
          //   className: [HEADING_LINK_ANCHOR],
          // },
        },
      ],
    ],
  },
});
