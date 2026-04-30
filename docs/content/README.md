# Content Automation Docs

This folder contains documentation for the `zjavier-next` blog/content automation workflow.

The goal of these docs is to define a safe, review-based content automation system that can generate blog drafts, social packs, image prompts, and optional MDX support components while preserving quality, voice, and brand consistency.

---

## Files

### `blog-post-template.mdx`

Reusable MDX template for manually or automatically drafted blog posts.

Use this when creating a new post under:

```txt
content/posts/
```

This template defines the expected frontmatter and basic body structure for new posts.

---

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

Use this as the technical contract for generated MDX content.

---

### `content-automation-strategy.md`

High-level strategy for the full content automation system.

This document defines:

- The purpose of the automation system
- MVP scope
- Content pillars
- Blog post types
- Social pack scope
- Image prompt scope
- MDX component scope
- Review workflow
- Budget tiers
- Recommended implementation order

Use this as the strategic blueprint for the content engine.

---

### `content-style-guide.md`

Writing style, voice, tone, and editorial guidance for generated and manually written content.

This document defines:

- Core voice
- Brand personality
- Writing principles
- Blog structure
- Technical writing style
- AI writing style
- Automation writing style
- Product writing style
- Social content style
- Editing checklist

Use this to keep generated writing aligned with Javier's voice.

---

### `visual-brand-system.md`

Visual direction for blog covers, social visuals, image prompts, MDX components, and future videos.

This document defines:

- Core visual idea
- Color system
- Typography direction
- Layout system
- Texture and pattern system
- Illustration direction
- Blog cover direction
- Social visual direction
- Carousel direction
- Video direction
- Image prompt templates
- Visual quality checklist

Use this to keep generated visuals consistent and recognizable.

---

### `social-pack-contract.md`

Rules and structure for generating platform-specific social media content packs from blog posts.

This contract defines:

- Social pack metadata
- Output location
- Platform-specific requirements
- LinkedIn structure
- X.com structure
- Instagram structure
- Facebook structure
- WhatsApp structure
- Image prompt rules
- Hashtag rules
- CTA rules
- Hook rules
- Review checklist

Use this when generating social content from a blog draft.

---

### `n8n-trigger-input-spec.md`

Input specification for the manual n8n trigger that starts the content generation workflow.

This document defines:

- Trigger input object
- Required fields
- Optional fields
- Default values
- Dropdown values
- Validation rules
- Output files
- Slug rules
- GitHub PR output expectations
- Example trigger inputs

Use this when building the first n8n workflow interface.

---

## Current Automation Direction

The target workflow is:

```txt
n8n input → draft MDX post → social pack → image prompts → optional generated MDX component → GitHub PR → manual review → publish
```

Generated posts should always start as:

```yaml
status: "draft"
```

Publishing should remain manual.

---

## Current Content Pillars

The content system is organized around these pillars:

```txt
1. Full-stack builds
2. Automation systems
3. AI-assisted development
4. Product experiments
5. Dev notes and lessons learned
6. LATAM tech and practical digital tools
7. Visual coding and creative UI
8. Tech, Society and Power
9. Human-Centered Tech Reflections
```

These pillars should guide blog drafts, social packs, image prompts, and future video formats.

---

## MVP Workflow

The first production-ready automation should generate:

```txt
Manual n8n trigger
→ MDX blog draft
→ Social media content pack
→ Blog cover image prompt
→ Platform-specific image prompts
→ GitHub branch
→ GitHub PR
→ Human review
```

The MVP should not:

- Publish posts automatically
- Post directly to social media
- Generate final images by default
- Generate complex MDX components by default
- Skip human review

---

## Recommended First n8n Workflow

Workflow name:

```txt
Generate Blog Post PR
```

Primary input source:

```txt
Manual n8n form-style trigger
```

Primary output:

```txt
GitHub PR containing the generated draft content package
```

Generated files may include:

```txt
content/posts/[post-slug].mdx
content/social/[post-slug]-social-pack.md
```

Optional future files:

```txt
src/app/components/mdxComponents/generated/[ComponentName].tsx
```

---

## Review-First Rule

The system should create drafts and reviewable files.

It should not make final publishing decisions.

Before publishing, review:

- Technical accuracy
- Voice and tone
- MDX formatting
- Frontmatter
- Image prompts
- Social pack quality
- Platform-specific adaptations
- Claims and opinions
- Overall usefulness

Only after review should a post be changed from:

```yaml
status: "draft"
```

to:

```yaml
status: "published"
```

---

## Implementation Order

Recommended order:

```txt
1. Content automation strategy
2. Content style guide
3. Visual brand system
4. Social pack contract
5. n8n trigger input spec
6. n8n VPS checkup
7. MVP Blog Post PR Generator
8. Social Pack Generator
9. Image prompt generation
10. Optional MDX component generation
11. Content calendar
12. Platform posting
13. Video series framework
```

---

## Final Rule

The automation should make content creation easier, faster, and more structured.

It should not remove taste, judgment, or review.

The draft can be automated.

The final decision should remain human.
