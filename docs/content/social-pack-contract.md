# Social Pack Contract

This document defines the rules, structure, and quality expectations for generating social media content packs from `zjavier-next` blog drafts.

The goal is to turn each blog post into platform-specific social content while preserving Javier's voice, visual identity, and review-first publishing workflow.

---

## Core Rule

A social pack should adapt one core idea across multiple platforms.

It should not copy and paste the same caption everywhere.

Each platform should receive content that fits its format, tone, audience behavior, and visual expectations.

---

## Primary Purpose

The social pack should help convert one blog post into reusable social content for:

- LinkedIn
- X.com
- Instagram
- Facebook
- WhatsApp

It should also generate:

- Platform-specific image prompts
- Carousel copy when relevant
- Hook variations
- CTA options
- Suggested hashtags
- Optional short video concept

The social pack should be treated as draft content for review, not final automated publishing.

---

## Output Location

Generated social packs should be saved under:

```txt
content/social/
```

Recommended filename format:

```txt
post-slug-social-pack.md
```

Example:

```txt
content/social/automating-blog-drafts-with-n8n-social-pack.md
```

The social pack filename should match the related blog post slug.

---

## Source Inputs

A generated social pack should be based on:

- Blog post title
- Blog post slug
- Blog post excerpt
- Blog post description
- Blog post category
- Blog post language
- Blog post content pillar
- Blog post body
- Social summary if available
- Cover image prompt if available
- Personal notes if provided

The social pack should preserve the main argument or lesson of the blog post.

---

## Required Metadata

Each social pack should begin with a short metadata section.

Use this structure:

```md
# Social Pack: [Blog Post Title]

Related post: `content/posts/[post-slug].mdx`

Post slug: `[post-slug]`

Language: `en`

Category: `[Category]`

Content pillar: `[Content Pillar]`

Primary angle: `[One-sentence description of the social angle]`

Status: `draft`
```

The social pack must always start as:

```txt
Status: draft
```

---

## Supported Languages

The social pack should match the blog post language by default.

Supported languages:

```txt
en
es
```

Rules:

- Use `en` for English social content.
- Use `es` for Spanish social content.
- Do not mix languages unless explicitly requested.
- If the blog post is bilingual or translation-focused, the social pack may include both languages if requested.

---

## Platform List

The MVP social pack should include:

1. LinkedIn
2. X.com
3. Instagram
4. Facebook
5. WhatsApp

Optional later additions:

- YouTube Shorts description
- TikTok caption
- Threads post
- Newsletter blurb
- Personal website announcement
- Video script

---

## General Quality Rules

Every generated social post should be:

- Specific
- Useful
- Clear
- Human
- Platform-aware
- Connected to the original post
- Written in Javier's voice
- Easy to review and edit

Avoid:

- Generic AI captions
- Fake urgency
- Engagement bait
- Excessive hashtags
- Overly polished corporate tone
- Repeating the blog intro word-for-word
- Making claims not supported by the blog post
- Pretending the draft is already a finished product

---

## Voice Rules

The social pack should sound:

- Practical
- Curious
- Slightly opinionated
- Technically credible
- Human and direct
- Builder-oriented
- Clear without being boring
- Reflective without being vague

It should not sound:

- Corporate
- Overhyped
- Robotic
- Like a growth-hacking account
- Like generic AI productivity content
- Like empty thought leadership

---

## Content Pillar Alignment

Each social pack should identify the related content pillar.

Supported content pillars:

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

The social angle should match the pillar.

Examples:

- A technical build post should emphasize process, implementation, and lessons.
- An automation post should emphasize friction removed and review preserved.
- A product experiment post should emphasize validation, tradeoffs, and small bets.
- A Tech, Society and Power post should emphasize the argument and implications.
- A Human-Centered Tech Reflections post should emphasize personal judgment, taste, and meaning.

---

## LinkedIn Contract

### Purpose

LinkedIn content should position the post as a practical, thoughtful lesson for developers, builders, technical generalists, and product-minded people.

### Tone

LinkedIn should feel:

- Professional
- Practical
- Reflective
- Story-driven
- Useful
- Clear

Avoid:

- Broetry
- Fake vulnerability
- Overdramatic one-line paragraphs
- Corporate thought leadership tone
- Excessive emojis
- Hashtag stuffing

### Recommended Structure

Use this structure:

1. Strong opening line
2. Short context
3. What was built, learned, or argued
4. Practical lesson
5. Link or soft CTA

### Output Requirements

Generate:

- 1 primary LinkedIn post
- 2 alternate hooks
- 1 shorter version
- 3 to 5 hashtags
- 1 LinkedIn image prompt

### LinkedIn Post Template

```md
## LinkedIn

### Primary Post

[Text]

### Alternate Hooks

1. [Hook]
2. [Hook]

### Short Version

[Text]

### Hashtags

- #[tag]
- #[tag]
- #[tag]

### Image Prompt

[Prompt]
```

---

## X.com Contract

### Purpose

X.com content should be concise, sharp, and easy to skim.

It can be either:

- A single post
- A short thread

### Tone

X.com should feel:

- Punchy
- Clear
- Opinionated
- Useful
- Slightly sharper than LinkedIn

Avoid:

- Forced controversy
- Engagement bait
- Vague hot takes
- Long explanations in one post
- Excessive hashtags

### Recommended Structure

For a single post:

1. Hook or claim
2. One supporting point
3. Link or CTA

For a thread:

1. Hook
2. Context
3. Key points
4. Lesson
5. Link or CTA

### Output Requirements

Generate:

- 1 single-post version
- 1 short thread version
- 3 hook options
- 1 visual prompt
- 1 no-link version if needed

### X.com Template

```md
## X.com

### Single Post

[Text]

### Short Thread

1. [Post 1]
2. [Post 2]
3. [Post 3]
4. [Post 4]

### Hook Options

1. [Hook]
2. [Hook]
3. [Hook]

### No-Link Version

[Text]

### Image Prompt

[Prompt]
```

---

## Instagram Contract

### Purpose

Instagram content should be visual, simple, and human.

It should support either:

- A single image post
- A carousel
- A short reel concept

### Tone

Instagram should feel:

- Visual
- Clean
- Human
- Accessible
- Slightly more expressive

Avoid:

- Dense technical explanations
- Too many hashtags
- Overloaded captions
- Corporate design language
- Tiny text in visuals

### Recommended Structure

For captions:

1. Short hook
2. Relatable context
3. Simple takeaway
4. CTA

For carousels:

1. Hook slide
2. Problem slide
3. Core idea slide
4. Example/process slide
5. Lesson slide
6. CTA slide

### Output Requirements

Generate:

- 1 Instagram caption
- 1 carousel outline
- 6 carousel slide texts
- 1 single-image prompt
- 1 carousel visual prompt
- 5 to 10 hashtags
- Optional Reel concept

### Instagram Template

```md
## Instagram

### Caption

[Text]

### Carousel Outline

1. [Slide title]
2. [Slide title]
3. [Slide title]
4. [Slide title]
5. [Slide title]
6. [Slide title]

### Carousel Slide Copy

#### Slide 1

[Text]

#### Slide 2

[Text]

#### Slide 3

[Text]

#### Slide 4

[Text]

#### Slide 5

[Text]

#### Slide 6

[Text]

### Single Image Prompt

[Prompt]

### Carousel Visual Prompt

[Prompt]

### Optional Reel Concept

[Concept]

### Hashtags

- #[tag]
- #[tag]
- #[tag]
```

---

## Facebook Contract

### Purpose

Facebook content should be conversational and clear.

It can be slightly warmer and less technical than LinkedIn.

### Tone

Facebook should feel:

- Conversational
- Clear
- Human
- Slightly warmer
- Easy to understand

Avoid:

- Overly formal tone
- Long technical dumps
- Dense code explanations
- Too many hashtags
- Overly promotional language

### Recommended Structure

1. Short intro
2. Main idea
3. Practical point
4. Link or CTA

### Output Requirements

Generate:

- 1 Facebook post
- 1 shorter version
- 1 image prompt
- 2 CTA options

### Facebook Template

```md
## Facebook

### Primary Post

[Text]

### Short Version

[Text]

### CTA Options

1. [CTA]
2. [CTA]

### Image Prompt

[Prompt]
```

---

## WhatsApp Contract

### Purpose

WhatsApp content should be short, direct, and easy to forward.

It should work as a quick share message.

### Tone

WhatsApp should feel:

- Short
- Natural
- Direct
- Informal
- Clear

Avoid:

- Long explanations
- Heavy formatting
- Too many links
- Excessive hashtags
- Corporate tone

### Recommended Structure

1. Quick note
2. One-sentence summary
3. Link or action

### Output Requirements

Generate:

- 1 primary WhatsApp version
- 1 ultra-short version
- 1 optional image/share card prompt

### WhatsApp Template

```md
## WhatsApp

### Primary Message

[Text]

### Ultra-Short Version

[Text]

### Share Card Prompt

[Prompt]
```

---

## Image Prompt Rules

Every social pack should include image prompts when requested.

Image prompts should follow the visual brand system.

Default visual direction:

```txt
black and white developer-lab aesthetic, orange accent, minimal editorial layout, dot-matrix/dither texture, clean technical grid, high contrast, modern typography direction, human-centered technology feel
```

Image prompts should include:

- Platform
- Format
- Topic
- Main visual idea
- Composition
- Style
- Mood
- What to avoid
- Aspect ratio if relevant

Avoid vague prompts like:

- make it modern
- AI style
- tech image
- futuristic design
- professional graphic

---

## Platform Image Sizes

Use these aspect ratios as guidance:

```txt
LinkedIn: 1.91:1 or 4:5
X.com: 16:9 or 1:1
Instagram post: 4:5
Instagram carousel: 4:5
Facebook: 1.91:1 or 4:5
WhatsApp share card: 1:1 or 16:9
Blog cover: 16:9
```

The prompt should mention the intended aspect ratio when useful.

---

## Hashtag Rules

Hashtags should be useful, not excessive.

Recommended counts:

```txt
LinkedIn: 3 to 5
X.com: 0 to 2
Instagram: 5 to 10
Facebook: 0 to 3
WhatsApp: none
```

Hashtags should be:

- Relevant
- Clear
- Not spammy
- Not overly broad unless useful

Good examples:

```txt
#Automation
#WebDevelopment
#AI
#NextJS
#BuildInPublic
#CreativeCoding
#ProductDevelopment
#OpenSource
#LATAMTech
```

Avoid:

```txt
#viral
#success
#hustle
#grind
#millionairemindset
#AIRevolution
#futureisnow
```

---

## CTA Rules

Calls to action should feel natural.

Good CTA styles:

- Read the full post
- I wrote more about it here
- Full breakdown on the blog
- Notes and implementation details here
- Curious how others are handling this
- This is the kind of workflow I want to keep refining

Avoid:

- Click now
- You do not want to miss this
- This changed everything
- Share if you agree
- Comment YES for the link
- Follow me for more

---

## Hook Rules

Hooks should be specific and honest.

Good hooks:

- I wanted my blog workflow to stop depending on manual copy-paste.
- The useful part of AI is not the draft. It is the workflow around the draft.
- Automation should remove friction, not judgment.
- I replaced a fragile content workflow with a review-based system.
- A personal website is still one of the best places to own your work.

Avoid hooks like:

- This will change everything.
- Nobody is talking about this.
- AI just replaced developers.
- The future is here.
- You are doing automation wrong.
- This one trick will save you hours.

---

## Social Pack Output Structure

Every generated social pack should follow this structure:

```md
# Social Pack: [Blog Post Title]

Related post: `content/posts/[post-slug].mdx`

Post slug: `[post-slug]`

Language: `[en/es]`

Category: `[Category]`

Content pillar: `[Content Pillar]`

Primary angle: `[Primary social angle]`

Status: `draft`

---

## Source Summary

[Short summary of the source blog post.]

---

## Core Message

[The main idea that should stay consistent across platforms.]

---

## LinkedIn

[LinkedIn content]

---

## X.com

[X.com content]

---

## Instagram

[Instagram content]

---

## Facebook

[Facebook content]

---

## WhatsApp

[WhatsApp content]

---

## Image Prompts

[All platform image prompts]

---

## Hashtags

[Grouped hashtags by platform]

---

## CTA Options

[Reusable CTA options]

---

## Review Checklist

[Checklist]
```

---

## Review Checklist

Before using or scheduling a social pack, review:

- Does it match the source post?
- Does each platform have a different adaptation?
- Does it sound like Javier?
- Is the tone specific and human?
- Are the claims accurate?
- Are the hooks honest?
- Are CTAs natural?
- Are hashtags relevant and not excessive?
- Are image prompts aligned with the visual brand system?
- Is anything too generic?
- Is anything too hype-driven?
- Is anything factually unsupported?
- Is anything too long for the platform?

---

## Automation Rules

When n8n generates a social pack, it should:

- Read the blog post draft.
- Extract the core message.
- Identify the content pillar.
- Generate platform-specific content.
- Generate image prompts when requested.
- Save the social pack as a markdown file.
- Include the social pack in the same PR as the blog draft.
- Keep the social pack in draft status.
- Never publish directly to social platforms in the MVP.

---

## MVP Rule

The MVP should generate social content, not publish it.

Publishing should remain manual until the workflow has proven quality and consistency.

The first goal is to reduce the effort of repurposing content.

The first goal is not full social media autopilot.

---

## Final Rule

Social content should feel adapted, not duplicated.

The blog post is the source.

The social pack is the translation layer.

Each platform should receive the same core idea in a format that feels native to that platform.
