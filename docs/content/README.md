# Content Automation Docs

This folder contains documentation for the `zjavier-next` blog/content automation workflow.

## Files

### `blog-post-template.mdx`

Reusable MDX template for manually or automatically drafted blog posts.

Use this when creating a new post under:

```txt
content/posts/
```

### `n8n-mdx-generation-contract.md`

Rules and expectations for n8n-generated blog drafts and optional MDX components.

This contract defines:

- Required frontmatter
- Optional frontmatter
- Allowed categories
- Allowed languages
- File naming rules
- Draft-first publishing rules
- MDX component generation rules
- GitHub PR workflow
- Validation checklist

## Current Automation Direction

The target workflow is:

```txt
n8n input → draft MDX post → optional generated MDX component → GitHub PR → manual review → publish
```

Generated posts should always start as:

```yaml
status: "draft"
```

Publishing should remain manual.
