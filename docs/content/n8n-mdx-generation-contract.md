# n8n MDX Generation Contract

This document defines the rules n8n must follow when generating blog post drafts and optional MDX components for `zjavier-next`.

The goal is to keep automated content generation safe, reviewable, version-controlled, and compatible with the current Next.js + MDX setup.

---

## Core Rule

n8n must always create blog posts as drafts.

```yaml
status: "draft"
```

Only a human reviewer should change:

```yaml
status: "published"
```

This keeps publishing manual and intentional.

---

## Required Frontmatter

Every generated post must include these fields:

```yaml
title: "Post title"
category: "Automation"
excerpt: "Short public-facing summary."
publishedAt: "YYYY-MM-DD"
description: "SEO-friendly description."
status: "draft"
tags:
  - "tag-one"
  - "tag-two"
language: "en"
```

Required fields:

| Field         | Type        | Notes                               |
| ------------- | ----------- | ----------------------------------- |
| `title`       | string      | Human-readable post title           |
| `category`    | string      | Must match one allowed category     |
| `excerpt`     | string      | Short summary shown in listings     |
| `publishedAt` | date string | Format: `YYYY-MM-DD`                |
| `description` | string      | SEO/meta description                |
| `status`      | string      | Must be `draft` when created by n8n |
| `tags`        | string[]    | Lowercase preferred                 |
| `language`    | string      | Must be `en` or `es`                |

---

## Optional Frontmatter

Generated posts may include:

```yaml
updatedAt: "YYYY-MM-DD"
featured: false
coverPrompt: ""
socialSummary: ""
canonicalUrl: ""
series: ""
```

Optional fields:

| Field           | Type        | Notes                                |
| --------------- | ----------- | ------------------------------------ |
| `updatedAt`     | date string | Use when updating existing content   |
| `featured`      | boolean     | Defaults to `false`                  |
| `coverPrompt`   | string      | Image/banner generation prompt       |
| `socialSummary` | string      | Short summary for social repurposing |
| `canonicalUrl`  | string      | Use only when cross-posting          |
| `series`        | string      | Optional series/group name           |

---

## Allowed Languages

```txt
en
es
```

Rules:

- Use `en` for English posts.
- Use `es` for Spanish posts.
- Do not generate mixed-language posts unless explicitly requested.
- The value must be lowercase.

---

## Allowed Categories

```txt
Tutorial
Opinion
Note
Case Study
Build Log
Automation
AI
Web Development
Product
Career
```

Rules:

- Category must match exactly.
- Do not invent new categories automatically.
- If unsure, use `Note`.

---

## File Naming Convention

Generated posts must be placed in:

```txt
content/posts/
```

Filename format:

```txt
kebab-case-post-title.mdx
```

Examples:

```txt
content/posts/automating-blog-drafts-with-n8n.mdx
content/posts/building-a-safe-mdx-workflow.mdx
content/posts/como-automatizar-borradores-con-n8n.mdx
```

Rules:

- Use lowercase.
- Use hyphens instead of spaces.
- Avoid special characters.
- Use `.mdx`.
- Slug is derived from filename.

---

## Draft-First Publishing Rule

n8n must create every post with:

```yaml
status: "draft"
```

The generated post should not be public until manually reviewed.

Publishing requires a human to:

1. Review the content.
2. Confirm frontmatter.
3. Check links and code examples.
4. Confirm MDX components render correctly.
5. Change `status` to `published`.
6. Commit and deploy.

---

## MDX Body Guidelines

Generated content should use simple, stable MDX by default.

Preferred structure:

```md
# Title

## Section

Paragraph text.
```

Preferred code block example:

```ts
const example = "code";
```

Avoid by default:

- Raw HTML
- Complex nested JSX
- External script tags
- Inline styles
- Experimental components
- Unreviewed interactive elements

---

## Allowed Existing MDX Components

Current manually maintained MDX components:

```txt
BlurImage
AsideImage
FullCode
```

These are registered in:

```txt
src/app/components/mdxComponents/registry.tsx
```

Rules:

- n8n may use existing registered components.
- n8n must not use unregistered components.
- Any new component must be generated, registered, and included in the same change set as the post that uses it.

---

## Generated MDX Components

Generated components must live in:

```txt
src/app/components/mdxComponents/generated/
```

Example:

```txt
src/app/components/mdxComponents/generated/WorkflowDiagram.tsx
```

Rules:

- Use TypeScript.
- Export a named React component.
- Define explicit prop types.
- Keep components small and focused.
- Prefer static/presentational components.
- Use `"use client"` only when interactivity is required.
- Do not access secrets.
- Do not call external APIs directly.
- Do not import server-only modules.
- Do not use `dangerouslySetInnerHTML`.
- Do not modify unrelated app files.
- Must be added to the MDX registry before use.

---

## Registry Update Rule

If n8n creates a new MDX component, it must update:

```txt
src/app/components/mdxComponents/registry.tsx
```

Example:

```tsx
import { WorkflowDiagram } from "./generated/WorkflowDiagram";

export const mdxComponents = {
  BlurImage,
  AsideImage,
  FullCode: (props: FullCodeProps) => <FullCode {...props} />,
  WorkflowDiagram,
};
```

Rules:

- Import from `./generated/ComponentName`.
- Add the component to `mdxComponents`.
- Keep manually maintained imports separate from generated imports when possible.
- Do not remove existing components.

---

## GitHub Workflow

The preferred workflow for n8n-generated blog drafts is:

1. Create a new branch.
2. Add the generated `.mdx` draft.
3. Add any generated components if needed.
4. Update the registry if needed.
5. Add optional social content if requested.
6. Open a GitHub PR.
7. Human reviews and edits.
8. Human changes `status` from `draft` to `published`.
9. Merge PR.
10. Vercel deploys.

For manual low-risk documentation changes, direct commits to `main` are acceptable.

---

## Main n8n Workflow

Workflow name:

```txt
Generate Blog Post PR
```

Suggested input:

```json
{
  "topic": "How to automate blog posting with n8n and Next.js",
  "language": "en",
  "category": "Automation",
  "audience": "developers and small business owners",
  "tone": "practical, polished, personal",
  "allowNewComponents": true
}
```

Expected output:

```txt
- New MDX draft under content/posts/
- Optional generated MDX components
- Optional social pack
- GitHub PR
```

---

## Optional Sub-Workflow

Workflow name:

```txt
Generate MDX Component
```

Suggested input:

```json
{
  "componentName": "WorkflowDiagram",
  "purpose": "Show the flow from n8n to GitHub PR to Vercel deployment",
  "props": ["steps", "title"],
  "interactive": false
}
```

Expected output:

```txt
- Component file
- Registry update
- Usage example
```

---

## Validation Checklist

Before merging generated content:

```txt
npm run check
```

Reviewer should verify:

- Frontmatter is valid.
- Post starts as draft.
- Category is allowed.
- Language is allowed.
- Filename matches slug expectations.
- MDX renders correctly.
- Any new component is registered.
- No secrets or unsafe code are included.
- Build passes.
