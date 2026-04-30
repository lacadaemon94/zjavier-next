# n8n Trigger Input Spec

This document defines the manual trigger input structure for the `zjavier-next` content automation workflow.

The goal is to give n8n enough structured context to generate a high-quality MDX blog draft, social pack, image prompts, and optional MDX component suggestions while keeping the workflow review-based and predictable.

---

## Core Idea

The first version of the automation should use a manual trigger.

The user provides structured context through n8n, and the workflow generates draft content.

The MVP should not automatically publish blog posts or social media posts.

The workflow should create reviewable files and, eventually, a GitHub PR.

---

## Preferred First Interface

The preferred MVP interface is an n8n manual trigger or form-style trigger.

The trigger should collect the content request using fields such as:

- Topic
- Language
- Category
- Content pillar
- Audience
- Tone
- Personal notes
- Desired depth
- Output options
- Image prompt options
- MDX component options
- Social pack options

This keeps the system simple, visible, and easy to debug.

---

## Workflow Name

Recommended workflow name:

```txt
Generate Blog Post PR
```

Optional internal workflow name:

```txt
content_generate_blog_post_pr
```

---

## Trigger Input Object

The workflow should normalize all trigger fields into a single input object.

Recommended shape:

```json
{
  "topic": "How to automate blog drafts with n8n and Next.js",
  "workingTitle": "",
  "language": "en",
  "category": "Automation",
  "contentPillar": "Automation systems",
  "contentType": "Build Log",
  "audience": "developers, indie hackers, and technical builders",
  "tone": "practical, polished, personal",
  "depth": "standard",
  "personalContext": "I am building this for my personal blog using Next.js, MDX, GitHub, Vercel, Supabase, and n8n.",
  "keyPoints": [
    "Drafts should start as draft",
    "n8n should open a GitHub PR",
    "Social content should be generated separately",
    "Image prompts should follow the visual brand system"
  ],
  "includeBlogPost": true,
  "includeSocialPack": true,
  "includeImagePrompts": true,
  "allowMdxComponents": false,
  "allowGeneratedImages": false,
  "allowVideoConcept": false,
  "targetPlatforms": ["linkedin", "x", "instagram", "facebook", "whatsapp"],
  "references": [],
  "constraints": [
    "Do not publish automatically",
    "Keep status as draft",
    "Avoid generic AI writing",
    "Use the established content style guide"
  ]
}
```

---

## Required Fields

The minimum required trigger fields are:

```txt
topic
language
category
contentPillar
audience
```

If these are missing, the workflow should stop and return a clear validation error.

---

## Optional Fields

Optional fields:

```txt
workingTitle
contentType
tone
depth
personalContext
keyPoints
includeBlogPost
includeSocialPack
includeImagePrompts
allowMdxComponents
allowGeneratedImages
allowVideoConcept
targetPlatforms
references
constraints
```

Optional fields should have safe defaults.

---

## Field Definitions

### `topic`

Primary idea or subject of the content.

Example:

```txt
How to automate blog drafts with n8n and Next.js
```

Rules:

- Required.
- Should be specific.
- Should describe what the post is about.
- Avoid vague topics like “AI automation” without context.

---

### `workingTitle`

Optional draft title.

Example:

```txt
Building a Review-Based Blog Automation Workflow with n8n
```

Rules:

- Optional.
- If empty, the workflow should generate title options.
- Final generated MDX frontmatter should include one selected title.

---

### `language`

Language for the blog post and social pack.

Allowed values:

```txt
en
es
```

Rules:

- Required.
- Must be lowercase.
- Default should be `en`.
- Do not mix languages unless explicitly requested in `personalContext`.

---

### `category`

Blog category.

Allowed values:

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

- Required.
- Must match exactly.
- If unsure, use `Note`.

---

### `contentPillar`

Strategic content pillar.

Allowed values:

```txt
Full-stack builds
Automation systems
AI-assisted development
Product experiments
Dev notes and lessons learned
LATAM tech and practical digital tools
Visual coding and creative UI
Tech, Society and Power
Human-Centered Tech Reflections
```

Rules:

- Required.
- Should guide the angle, examples, and social positioning.
- The selected pillar should be included in the social pack metadata.

---

### `contentType`

Type of blog post to generate.

Allowed values:

```txt
Tutorial
Build Log
Case Study
Note
Opinion
```

Rules:

- Optional.
- Default should be `Build Log` for technical/process posts.
- Use `Tutorial` for step-by-step implementation.
- Use `Case Study` for problem-solution-result posts.
- Use `Note` for shorter posts.
- Use `Opinion` for argument-driven posts.

---

### `audience`

Target reader.

Examples:

```txt
developers and small business owners
full-stack developers and indie hackers
technical generalists interested in automation
LATAM builders and small teams
```

Rules:

- Required.
- Should influence explanation depth and examples.
- Avoid overly broad audiences like “everyone.”

---

### `tone`

Desired tone.

Example:

```txt
practical, polished, personal
```

Recommended values:

```txt
practical, polished, personal
technical, clear, direct
reflective, sharp, human
opinionated, grounded, thoughtful
visual, creative, experimental
```

Rules:

- Optional.
- Default should be `practical, polished, personal`.
- Tone must still follow the content style guide.

---

### `depth`

Expected post depth.

Allowed values:

```txt
short
standard
deep
```

Rules:

- Optional.
- Default should be `standard`.

Guidance:

```txt
short: 600-900 words
standard: 1000-1600 words
deep: 1800-2500 words
```

These are rough targets, not strict limits.

---

### `personalContext`

Extra context from Javier.

Example:

```txt
I am building this workflow for my personal blog. I want n8n to generate MDX drafts, social packs, and image prompts, but I still want to review everything before publishing.
```

Rules:

- Optional but strongly recommended.
- This is where the user adds personal angle, project context, constraints, or opinions.
- The workflow should use this to make the output less generic.

---

### `keyPoints`

List of points that should be included.

Example:

```json
[
  "Drafts should start as draft",
  "The workflow should create a GitHub PR",
  "Social content should be adapted by platform"
]
```

Rules:

- Optional.
- The workflow should try to incorporate all key points.
- If a key point is unclear, keep it as a note in the draft rather than inventing details.

---

### `includeBlogPost`

Whether to generate the MDX blog draft.

Allowed values:

```txt
true
false
```

Rules:

- Optional.
- Default should be `true`.
- If `false`, the workflow may generate only social content, prompts, or planning assets.

---

### `includeSocialPack`

Whether to generate the social media content pack.

Allowed values:

```txt
true
false
```

Rules:

- Optional.
- Default should be `true`.
- The social pack should follow `docs/content/social-pack-contract.md`.

---

### `includeImagePrompts`

Whether to generate image prompts.

Allowed values:

```txt
true
false
```

Rules:

- Optional.
- Default should be `true`.
- Prompts should follow `docs/content/visual-brand-system.md`.

---

### `allowMdxComponents`

Whether the workflow may suggest or generate MDX support components.

Allowed values:

```txt
true
false
```

Rules:

- Optional.
- Default should be `false` for the MVP.
- If `true`, the workflow may suggest a component.
- Generated components must follow the MDX generation contract.
- Generated components should be included in the same PR as the post that uses them.

---

### `allowGeneratedImages`

Whether the workflow may generate actual images instead of prompts only.

Allowed values:

```txt
true
false
```

Rules:

- Optional.
- Default should be `false` for the MVP.
- The MVP should generate prompts only.
- Image generation can be added after the text workflow is stable.

---

### `allowVideoConcept`

Whether the workflow should generate a short video concept.

Allowed values:

```txt
true
false
```

Rules:

- Optional.
- Default should be `false`.
- If `true`, generate a lightweight short video concept only.
- Do not generate or publish video automatically in the MVP.

---

### `targetPlatforms`

List of social platforms to generate content for.

Allowed values:

```txt
linkedin
x
instagram
facebook
whatsapp
```

Rules:

- Optional.
- Default should include all five platforms.
- Use lowercase platform IDs.
- The generated social pack should only include selected platforms.

---

### `references`

Optional list of links, notes, file paths, or source ideas.

Example:

```json
[
  "docs/content/content-automation-strategy.md",
  "docs/content/content-style-guide.md",
  "https://example.com/reference"
]
```

Rules:

- Optional.
- References should guide the draft.
- Do not invent content from inaccessible references.
- If a reference cannot be accessed by the workflow, include it as a review note.

---

### `constraints`

Optional list of constraints.

Example:

```json
[
  "Do not publish automatically",
  "Avoid generic AI writing",
  "Keep it practical and specific",
  "Use black and white visual style with orange accents"
]
```

Rules:

- Optional.
- Constraints should be respected by all generation steps.
- If constraints conflict, prioritize safety and draft-first behavior.

---

## Default Values

If optional fields are missing, use these defaults:

```json
{
  "workingTitle": "",
  "contentType": "Build Log",
  "tone": "practical, polished, personal",
  "depth": "standard",
  "personalContext": "",
  "keyPoints": [],
  "includeBlogPost": true,
  "includeSocialPack": true,
  "includeImagePrompts": true,
  "allowMdxComponents": false,
  "allowGeneratedImages": false,
  "allowVideoConcept": false,
  "targetPlatforms": ["linkedin", "x", "instagram", "facebook", "whatsapp"],
  "references": [],
  "constraints": [
    "Do not publish automatically",
    "Keep status as draft",
    "Use the established content style guide",
    "Use the established visual brand system"
  ]
}
```

---

## n8n Form Field Recommendation

For the first n8n form trigger, use these fields:

```txt
Topic
Working Title
Language
Category
Content Pillar
Content Type
Audience
Tone
Depth
Personal Context
Key Points
Include Social Pack
Include Image Prompts
Allow MDX Components
Allow Generated Images
Allow Video Concept
Target Platforms
References
Constraints
```

Recommended field types:

```txt
Topic: text
Working Title: text
Language: dropdown
Category: dropdown
Content Pillar: dropdown
Content Type: dropdown
Audience: text
Tone: dropdown or text
Depth: dropdown
Personal Context: textarea
Key Points: textarea
Include Social Pack: boolean
Include Image Prompts: boolean
Allow MDX Components: boolean
Allow Generated Images: boolean
Allow Video Concept: boolean
Target Platforms: multi-select
References: textarea
Constraints: textarea
```

---

## Dropdown Values

### Language

```txt
en
es
```

### Category

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

### Content Pillar

```txt
Full-stack builds
Automation systems
AI-assisted development
Product experiments
Dev notes and lessons learned
LATAM tech and practical digital tools
Visual coding and creative UI
Tech, Society and Power
Human-Centered Tech Reflections
```

### Content Type

```txt
Tutorial
Build Log
Case Study
Note
Opinion
```

### Depth

```txt
short
standard
deep
```

### Target Platforms

```txt
linkedin
x
instagram
facebook
whatsapp
```

---

## Validation Rules

The workflow should validate the input before generating content.

Required validation:

```txt
topic is not empty
language is en or es
category is allowed
contentPillar is allowed
audience is not empty
depth is short, standard, or deep
targetPlatforms only contains allowed values
```

If validation fails, the workflow should stop and return a clear error.

Example error:

```txt
Invalid input: category must be one of Tutorial, Opinion, Note, Case Study, Build Log, Automation, AI, Web Development, Product, Career.
```

---

## Output Files

Depending on selected options, the workflow should generate these files:

### Blog draft

```txt
content/posts/[post-slug].mdx
```

### Social pack

```txt
content/social/[post-slug]-social-pack.md
```

### Optional generated MDX component

```txt
src/app/components/mdxComponents/generated/[ComponentName].tsx
```

### Optional generated component registry update

```txt
src/app/components/mdxComponents/registry.tsx
```

---

## Slug Rules

The workflow should derive the slug from the selected title.

Rules:

- Use lowercase.
- Use hyphens.
- Remove special characters.
- Avoid accents in slugs.
- Keep slugs readable.
- Do not include dates unless intentionally needed.

Example:

```txt
Building a Review-Based Blog Automation Workflow with n8n
```

Should become:

```txt
building-a-review-based-blog-automation-workflow-with-n8n
```

Blog file:

```txt
content/posts/building-a-review-based-blog-automation-workflow-with-n8n.mdx
```

Social pack file:

```txt
content/social/building-a-review-based-blog-automation-workflow-with-n8n-social-pack.md
```

---

## Blog Draft Output Requirements

Generated MDX blog drafts must follow:

```txt
docs/content/blog-post-template.mdx
docs/content/n8n-mdx-generation-contract.md
docs/content/content-style-guide.md
```

The blog draft must include:

- Valid frontmatter
- `status: "draft"`
- Title
- Category
- Excerpt
- Published date
- Description
- Tags
- Language
- Body content
- Optional cover prompt
- Optional social summary

The post should not be published automatically.

---

## Social Pack Output Requirements

Generated social packs must follow:

```txt
docs/content/social-pack-contract.md
docs/content/content-style-guide.md
docs/content/visual-brand-system.md
```

The social pack must include:

- Metadata
- Source summary
- Core message
- Platform-specific posts
- Image prompts
- Hashtags
- CTA options
- Review checklist

The social pack should start as draft content.

---

## Image Prompt Output Requirements

Image prompts must follow:

```txt
docs/content/visual-brand-system.md
```

Each image prompt should include:

- Platform or use case
- Format
- Topic
- Style
- Composition
- Mood
- Aspect ratio when useful
- What to avoid

The MVP should generate image prompts, not images.

---

## MDX Component Output Requirements

If `allowMdxComponents` is `true`, the workflow may suggest or generate a component.

Generated components must follow:

```txt
docs/content/n8n-mdx-generation-contract.md
```

Good component candidates:

- Workflow diagram
- Timeline
- Architecture map
- Before/after comparison
- Metrics card
- Step cards
- Lesson callout

Avoid generating components for content that regular markdown can handle.

Generated components must be reviewed before publishing.

---

## GitHub Workflow Output

The preferred automated output is a GitHub PR.

The workflow should:

1. Create a new branch.
2. Add the generated blog draft.
3. Add the social pack if enabled.
4. Add generated MDX components if enabled and needed.
5. Update the MDX registry if needed.
6. Commit the generated files.
7. Open a GitHub PR.
8. Include a clear PR summary.
9. Keep everything in draft/review mode.

Recommended branch format:

```txt
content/[post-slug]
```

Example:

```txt
content/building-a-review-based-blog-automation-workflow-with-n8n
```

Recommended commit message:

```txt
content: add draft post for [post title]
```

Recommended PR title:

```txt
Content: [Post Title]
```

---

## PR Description Template

Use this PR description structure:

````md
## Summary

This PR adds a draft content package for:

`[Post Title]`

## Generated Files

- `content/posts/[post-slug].mdx`
- `content/social/[post-slug]-social-pack.md`

## Content Settings

- Language: `[language]`
- Category: `[category]`
- Content pillar: `[contentPillar]`
- Content type: `[contentType]`
- Status: `draft`

## Review Notes

- Review MDX formatting.
- Verify technical accuracy.
- Confirm the post sounds like Javier.
- Check image prompts against the visual brand system.
- Confirm social posts are platform-specific.
- Change `status` to `published` only when ready.

## Validation

Run:

```txt
npm run check
```
````

````

---

## Example Input: Technical Build Log

```json
{
  "topic": "How I built a review-based blog automation workflow with n8n and Next.js",
  "workingTitle": "Building a Review-Based Blog Automation Workflow with n8n",
  "language": "en",
  "category": "Automation",
  "contentPillar": "Automation systems",
  "contentType": "Build Log",
  "audience": "developers and indie hackers",
  "tone": "practical, polished, personal",
  "depth": "standard",
  "personalContext": "This is for my personal dev brand website. I want the system to generate MDX drafts, social packs, and image prompts, but still keep publishing manual through GitHub PR review.",
  "keyPoints": [
    "Draft-first publishing matters",
    "n8n should create the PR",
    "Social content should be generated but not posted automatically",
    "Image prompts should follow the black, white, and orange visual system"
  ],
  "includeBlogPost": true,
  "includeSocialPack": true,
  "includeImagePrompts": true,
  "allowMdxComponents": false,
  "allowGeneratedImages": false,
  "allowVideoConcept": false,
  "targetPlatforms": [
    "linkedin",
    "x",
    "instagram",
    "facebook",
    "whatsapp"
  ],
  "references": [
    "docs/content/content-automation-strategy.md",
    "docs/content/content-style-guide.md",
    "docs/content/visual-brand-system.md",
    "docs/content/social-pack-contract.md"
  ],
  "constraints": [
    "Do not publish automatically",
    "Keep the blog post as draft",
    "Avoid generic AI writing",
    "Make the workflow feel practical and specific"
  ]
}
````

---

## Example Input: Opinion Post

```json
{
  "topic": "Why automation should remove friction, not judgment",
  "workingTitle": "Automation Should Remove Friction, Not Judgment",
  "language": "en",
  "category": "Opinion",
  "contentPillar": "Human-Centered Tech Reflections",
  "contentType": "Opinion",
  "audience": "developers, builders, and technical generalists",
  "tone": "reflective, sharp, human",
  "depth": "standard",
  "personalContext": "I want to write about the difference between automating repetitive structure and outsourcing actual taste or responsibility.",
  "keyPoints": [
    "Automation is useful when it removes repeated friction",
    "Human review still matters",
    "AI-generated drafts still need taste and context",
    "The goal is leverage, not autopilot"
  ],
  "includeBlogPost": true,
  "includeSocialPack": true,
  "includeImagePrompts": true,
  "allowMdxComponents": false,
  "allowGeneratedImages": false,
  "allowVideoConcept": true,
  "targetPlatforms": ["linkedin", "x", "instagram"],
  "references": [
    "docs/content/content-style-guide.md",
    "docs/content/visual-brand-system.md"
  ],
  "constraints": [
    "Avoid AI hype",
    "Avoid generic productivity advice",
    "Keep it grounded and personal"
  ]
}
```

---

## Example Input: Tech and Society Post

```json
{
  "topic": "Digital sovereignty for LATAM in the age of AI platforms",
  "workingTitle": "Digital Sovereignty for LATAM Is Not Just a Buzzword",
  "language": "en",
  "category": "Opinion",
  "contentPillar": "Tech, Society and Power",
  "contentType": "Opinion",
  "audience": "technical builders, policy-curious developers, and LATAM tech readers",
  "tone": "opinionated, grounded, thoughtful",
  "depth": "deep",
  "personalContext": "I want to explore how dependency on external platforms affects local institutions, small businesses, and builders in LATAM, without turning it into generic political commentary.",
  "keyPoints": [
    "AI infrastructure is not neutral",
    "Platform dependency creates power asymmetries",
    "Local context matters",
    "Open-source and small local tools can matter",
    "The goal is capability, not isolation"
  ],
  "includeBlogPost": true,
  "includeSocialPack": true,
  "includeImagePrompts": true,
  "allowMdxComponents": false,
  "allowGeneratedImages": false,
  "allowVideoConcept": true,
  "targetPlatforms": ["linkedin", "x", "facebook"],
  "references": [
    "docs/content/content-automation-strategy.md",
    "docs/content/content-style-guide.md",
    "docs/content/visual-brand-system.md"
  ],
  "constraints": [
    "Separate opinion from fact",
    "Avoid unsupported claims",
    "Stay connected to technology",
    "Avoid generic political commentary"
  ]
}
```

---

## Review Checklist

Before running a generation request, check:

- Is the topic specific?
- Is the content pillar selected?
- Is the audience clear?
- Is there enough personal context?
- Are key points provided?
- Are output options correct?
- Are image prompts needed?
- Are MDX components actually needed?
- Should this be a blog post, note, case study, or opinion piece?
- Is the language correct?

Before approving generated output, check:

- Does the post follow the selected input?
- Does it match the content style guide?
- Does it use draft status?
- Does the social pack match the social pack contract?
- Do image prompts match the visual brand system?
- Does it avoid unsupported claims?
- Does it avoid generic AI writing?
- Is the content worth publishing after review?

---

## MVP Rule

The trigger should generate a content package.

It should not publish automatically.

The first goal is:

```txt
structured input → draft content package → GitHub PR → human review
```

The workflow should be reliable before it becomes more automated.

---

## Final Rule

The quality of the output depends on the quality of the input.

The trigger should make it easy to provide enough context so the generated draft feels specific, personal, and useful instead of generic.
