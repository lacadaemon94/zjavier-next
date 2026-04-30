# Content Automation Strategy

This document defines the strategy for the `zjavier-next` content automation system.

The goal is to create a practical, review-based content engine that can generate blog drafts, MDX support components, social media content, and image prompts while preserving quality, voice, and brand consistency.

---

## Core Principle

Automation should accelerate content creation, not replace judgment.

The system should help generate drafts, options, assets, and reusable structures, but publishing should remain intentional and human-reviewed.

Generated content should be treated as a strong first draft, not a final product.

---

## Primary Goal

Build a low-budget, version-controlled content workflow that can turn a topic or rough idea into:

- A draft MDX blog post
- Frontmatter that follows the blog schema
- A blog cover image prompt
- Optional MDX component suggestions
- A social media content pack
- Social image prompts
- A GitHub branch and pull request

The system should support future expansion into image generation, scheduling, analytics, and video production.

---

## Current Automation Direction

The target workflow is:

n8n input → draft MDX post → optional generated MDX component → social pack → image prompts → GitHub PR → manual review → publish

Generated posts must always start with:

status: "draft"

Publishing should remain manual.

---

## MVP Scope

The first production-ready version should focus on two workflows:

1. Blog Post PR Generator
2. Social Pack Generator

These can be part of the same n8n workflow at first.

The MVP should generate:

- One MDX blog draft under `content/posts/`
- Valid frontmatter
- A clear post outline
- Body content written in the correct style
- A blog cover image prompt
- A social media content pack
- Platform-specific captions/posts
- Social image prompts
- A GitHub PR for review

The MVP should not automatically publish to the website or directly post to social platforms.

---

## Manual Trigger Strategy

The first trigger should be manual.

The preferred first interface is an n8n form-style trigger or manual execution input.

The trigger should collect:

- Topic
- Language
- Category
- Content pillar
- Audience
- Tone
- Personal notes or context
- Desired depth
- Whether image prompts are needed
- Whether MDX components are allowed
- Whether a social pack should be generated

This keeps the system simple, visible, and easy to debug.

Later trigger options may include:

- GitHub Issue as content request
- Notion or spreadsheet content calendar
- Custom web form
- Telegram or chat-style quick capture
- Local CLI script
- Scheduled idea backlog workflow

---

## Content Pillars

The content system should organize posts around the following pillars:

1. Full-stack builds
2. Automation systems
3. AI-assisted development
4. Product experiments
5. Dev notes and lessons learned
6. LATAM tech and practical digital tools
7. Visual coding and creative UI
8. Tech, Society and Power
9. Human-Centered Tech Reflections

---

## Pillar Definitions

### 1. Full-stack builds

Technical posts about building real applications, features, architecture, components, APIs, databases, auth flows, and deployment workflows.

Example topics:

- Building a Next.js content system
- Structuring a Supabase-backed app
- Creating reusable UI components
- Deploying a full-stack project with Vercel

---

### 2. Automation systems

Posts about using automation tools, scripts, workflows, and integrations to reduce manual work.

Example topics:

- Automating blog drafts with n8n
- Creating GitHub PRs from workflow inputs
- Using Power Automate for internal operations
- Building small automations that save hours

---

### 3. AI-assisted development

Posts about using AI as a development partner, code assistant, planning tool, debugging helper, or design collaborator.

Example topics:

- Using AI to scaffold feature ideas
- AI-assisted refactoring workflows
- Prompting AI for better technical drafts
- Where AI helps and where it still needs review

---

### 4. Product experiments

Posts about product ideas, MVPs, experiments, validation, monetization, and lessons from trying to build useful digital products.

Example topics:

- Designing a small SaaS idea
- Testing a landing page before building
- Choosing what not to build
- Turning internal tools into products

---

### 5. Dev notes and lessons learned

Shorter, practical posts based on specific issues, bugs, decisions, fixes, or lessons from real development work.

Example topics:

- A TypeScript error I ran into and how I fixed it
- Why I changed a project structure
- Lessons from migrating away from a dependency
- Small refactors that improved maintainability

---

### 6. LATAM tech and practical digital tools

Posts focused on practical technology, automation, digital tools, and product opportunities in El Salvador, LATAM, and similar local contexts.

Example topics:

- Practical automation for small businesses in LATAM
- Why local context matters in software products
- AI tools for bilingual teams
- Building digital systems for resource-constrained environments

---

### 7. Visual coding and creative UI

Posts about interface design, creative coding, motion, generative visuals, branding systems, and visually expressive development.

Example topics:

- Building a dot-matrix logo animation
- Designing with motion in React
- Creating visual identity through code
- UI experiments with typography and animation

---

### 8. Tech, Society and Power

Posts that explore technology from a social, political, institutional, or economic lens.

This pillar gives room to discuss how AI, automation, platforms, data, surveillance, digital labor, open-source, decentralization, and infrastructure affect society.

Example topics:

- AI is not neutral infrastructure
- The politics of platform dependency
- Digital sovereignty for LATAM
- Automation and small institutions
- Why open-source still matters in the AI era
- Who benefits when work becomes automated?

---

### 9. Human-Centered Tech Reflections

Posts that explore the personal, philosophical, cultural, and human side of technology.

This pillar gives room for reflective essays that are still connected to software, AI, creativity, work, learning, and digital life.

Example topics:

- Using AI without outsourcing your taste
- Why personal websites still matter
- The difference between automation and laziness
- Building tools that feel humane
- Technology should make people more capable, not more dependent
- The quiet value of making your own tools

---

## Recommended Content Mix

A healthy content mix should balance technical authority, personal perspective, and broader reflection.

Suggested distribution:

- 40% technical builds and tutorials
- 20% automation and AI-assisted workflows
- 15% product experiments
- 10% visual coding and creative UI
- 10% tech/social/political reflections
- 5% personal dev notes or lightweight posts

This is flexible. The system should not force exact ratios, but it should help avoid publishing only one type of content.

---

## Quality Bar

Generated content should be useful, specific, and connected to real experience.

A good post should usually include:

- A clear problem or question
- Why the topic matters
- Concrete examples
- Practical takeaways
- Personal context or judgment
- Clear structure
- No fake certainty
- No unsupported claims
- No generic filler

Avoid content that feels like:

- Generic AI productivity advice
- Empty thought leadership
- Overly polished but vague writing
- Technical content without working examples
- Political takes disconnected from technology
- Social posts that sound like engagement bait

---

## Voice Direction

The content should feel:

- Practical
- Sharp
- Personal
- Curious
- Technically credible
- Slightly opinionated
- Human, not corporate
- Clear enough for developers and technical generalists

The voice should avoid:

- Hype
- Empty futurism
- Buzzword-heavy writing
- Fake motivational tone
- Overexplaining simple ideas
- Pretending every idea is revolutionary

---

## Blog Post Types

The system should support several post formats.

### Tutorial

Step-by-step technical guide.

Best for:

- Implementation guides
- Tool setup
- Code walkthroughs
- Practical how-to posts

---

### Build Log

Narrative explanation of something being built.

Best for:

- Project updates
- Architecture decisions
- Experiments
- Work-in-progress systems

---

### Case Study

Problem, solution, process, results, and lessons learned.

Best for:

- Automation projects
- Portfolio pieces
- Client-style examples
- Internal tools turned into public lessons

---

### Note

Shorter post with one idea, fix, lesson, or reflection.

Best for:

- Dev notes
- Quick insights
- Small discoveries
- Lightweight publishing cadence

---

### Opinion

Argument-driven essay with a clear point of view.

Best for:

- Tech and society posts
- Product opinions
- AI reflections
- Platform critiques

---

## Blog Output Requirements

Generated blog drafts should include:

- Valid frontmatter
- Draft status
- Clear title
- Excerpt
- SEO description
- Tags
- Language
- Category
- Strong introduction
- Logical sections
- Practical conclusion
- Suggested cover image prompt
- Optional social summary

Posts should be created under:

content/posts/

Posts should always start as:

status: "draft"

---

## Social Pack Scope

Each blog post should be repurposed into a social pack.

The social pack should include:

- LinkedIn post
- X.com post or thread
- Instagram caption
- Facebook post
- WhatsApp short version
- Carousel copy
- Social image prompts
- Suggested hashtags
- CTA options

The social pack should adapt tone and structure by platform instead of copying the same text everywhere.

---

## Platform Direction

### LinkedIn

Tone:

- Professional
- Practical
- Reflective
- Story-driven

Best structure:

- Strong opening line
- Short context
- Practical lesson
- Personal insight
- Soft CTA

---

### X.com

Tone:

- Punchy
- Opinionated
- Concise
- Thread-friendly

Best structure:

- Hook
- Short claim
- Supporting points
- Useful takeaway
- Link to post

---

### Instagram

Tone:

- Visual
- Human
- Short
- Engaging

Best structure:

- Hook
- Relatable context
- Simple takeaway
- CTA
- Optional carousel text

---

### Facebook

Tone:

- Conversational
- Clear
- Slightly warmer

Best structure:

- Short intro
- Main idea
- Practical point
- Link or CTA

---

### WhatsApp

Tone:

- Short
- Direct
- Informal
- Easy to forward

Best structure:

- One or two short paragraphs
- Clear link or action
- No heavy formatting

---

## Image Prompt Scope

The MVP should generate image prompts, not necessarily final images.

Prompt types:

- Blog cover image prompt
- LinkedIn image prompt
- Instagram carousel prompt
- X.com visual prompt
- Facebook visual prompt

The prompts should follow the visual brand system once defined.

Initial visual direction:

- Developer-lab aesthetic
- Strong black and white base
- Orange as a recurring accent
- Modern minimal layouts
- Dot matrix or dithered visual language
- Clean typography direction
- Subtle technical/interface motifs
- Human-centered technology feel

---

## MDX Component Scope

Generated MDX components should be optional.

The workflow may suggest or generate a component when the post would benefit from a visual or structured content block.

Good component candidates:

- Workflow diagrams
- Timeline cards
- Architecture maps
- Before/after comparison cards
- Case study metric blocks
- Step-by-step process cards
- Stack comparison blocks
- Lesson learned callouts

Avoid generating components for simple paragraphs, normal lists, or content that can be handled with regular markdown.

Generated components must:

- Live under `src/app/components/mdxComponents/generated/`
- Be TypeScript
- Export a named React component
- Use explicit prop types
- Avoid secrets
- Avoid external API calls
- Avoid `dangerouslySetInnerHTML`
- Be registered before use
- Be included in the same PR as the post that uses it

---

## Review Workflow

The system should create drafts and PRs, not final public content.

Human review should check:

- Does the post sound like Javier?
- Is the technical content correct?
- Are claims supported or framed as opinion?
- Does the post fit a content pillar?
- Is the MDX valid?
- Are generated components necessary and safe?
- Do social posts match platform tone?
- Are image prompts aligned with the visual system?
- Does the post deserve to be published?

---

## Budget Strategy

The system should start lean.

Suggested budget tiers:

### Tier 1: Draft-only workflow

Estimated monthly budget: low.

Includes:

- Text generation
- Blog draft
- Social pack
- Image prompts
- GitHub PR creation

Best for validating the workflow before spending on media generation.

---

### Tier 2: Drafts plus image generation

Estimated monthly budget: moderate.

Includes:

- Everything in Tier 1
- Generated images for covers or social posts
- More visual experimentation

Best once the writing workflow is stable.

---

### Tier 3: Full content engine

Estimated monthly budget: higher.

Includes:

- Blog posts
- Social packs
- Image generation
- Content calendar
- Scheduling
- Analytics
- Optional video scripts
- Optional template-based video rendering

Best after the system consistently produces content worth publishing.

---

## Recommended Implementation Strategy

Build in this order:

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

---

## MVP Success Criteria

The MVP is successful when one manual trigger can produce:

- A valid MDX draft
- A blog cover prompt
- A complete social pack
- Platform-specific image prompts
- A GitHub PR
- No build errors
- A draft that is good enough to edit instead of rewrite

The first goal is not full automation.

The first goal is a reliable draft machine.
