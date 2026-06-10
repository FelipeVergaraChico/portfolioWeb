# Portfolio Product Premium Redesign

## Context

This redesign targets the `redesign/product-premium` branch of the portfolio in `/home/felipe/dev/portfolioWeb`.
The goal is to replace the current generic portfolio presentation with a cleaner, premium product-style landing page that improves credibility, hierarchy, and project storytelling without inventing new content.

The redesign must preserve the existing bilingual setup and keep both translation files updated:

- `public/locales/pt/translation.json`
- `public/locales/en/translation.json`

## Goals

- Present Felipe as a credible full stack developer with a stronger first impression.
- Reframe the homepage as a curated portfolio of execution, not a flat section stack.
- Highlight featured projects as stronger case studies with clearer CTAs.
- Improve visual polish, spacing, hierarchy, and section transitions across desktop and mobile.
- Preserve accessibility, reduced-motion handling, and current core functionality.

## Non-Goals

- No experimental motion-heavy direction in this branch.
- No new backend integrations or content management changes.
- No fabricated metrics, employers, or project outcomes.
- No removal of i18n support or fallback to hardcoded single-language copy.

## Recommended Direction

The homepage will follow a premium product landing approach with restrained styling, stronger typography, larger spacing, and compact credibility blocks.
The page should feel more intentional and commercial, while still reading as a personal portfolio.

Signature qualities:

- Clean premium layout instead of an experimental or neon treatment.
- Stronger visual hierarchy in the hero.
- Tighter project curation and more editorial case-study presentation.
- Better grouping of experience, education, and stack information.
- Clearer conversion path toward project exploration and contact.

## Information Architecture

The current order (`Hero`, `Projects`, `About`, `Skills`, `Contact`) may be reorganized into the following flow:

1. Hero
2. Credibility strip
3. Featured case studies
4. Experience and education narrative
5. Technology clusters
6. Contact close

This keeps the same content base but changes how it is framed and consumed.

## Section Design

### 1. Hero

The hero should become more concise and high-confidence.
It should introduce Felipe with stronger positioning, a cleaner headline block, and clearer primary actions.

Expected content:

- Name and role
- Short positioning statement
- Primary CTA to projects
- Secondary CTA to contact
- Supporting visual treatment that feels premium but not loud

The hero illustration may be retained if it still fits the redesigned composition; otherwise the section can shift to a more abstract or layout-driven presentation using existing assets and CSS styling.

### 2. Credibility Strip

Immediately below the hero, add a compact proof section that reinforces profile quality at a glance.

Possible content sources:

- Current working domains and stack focus
- Experience signal such as Serpro
- Delivery focus such as full stack, security, product thinking, or teamwork

This section should be lightweight and scannable, not verbose.

### 3. Featured Case Studies

Projects should move from a uniform card grid to a stronger featured layout.

Recommended treatment:

- First 3 projects remain the main highlights
- The first featured project can receive a larger visual footprint
- Project cards should emphasize description, stack, and actions more clearly
- CTA hierarchy should remain explicit for GitHub, live site, and APK when available

The implementation should preserve the current data sources and project ordering decisions already validated in the repo unless intentionally revised inside this redesign.

### 4. Experience and Education Narrative

The current about/experience/education content should be reorganized into a more premium editorial block.

Recommended treatment:

- Experience cards or timeline-style panels with stronger hierarchy
- Education integrated as part of the same narrative system instead of an isolated weak aside
- Better scannability of company, role, date, and responsibilities

This section should feel more curated and less like default bordered boxes.

### 5. Technology Clusters

The current flat chip cloud should be upgraded into grouped capability clusters.

Recommended grouping examples:

- Frontend
- Backend
- Mobile
- Data / infrastructure

This keeps the same skill inventory while making it easier to scan and more visually intentional.

### 6. Contact Close

The contact area should feel like a polished closing section instead of a generic form block.

Recommended treatment:

- Short closing pitch
- Social/contact actions with stronger presentation
- Form visually integrated into the redesigned system
- Existing EmailJS behavior preserved

GitHub stats should only remain if they still support the premium visual direction; otherwise they may be simplified or reframed.

## Visual System

The design language should align with the selected `product premium` direction:

- Restrained palette, avoiding the current default purple-heavy look
- More premium type hierarchy
- Strong spacing rhythm
- Sharper surface treatment and clearer section framing
- Subtle gradients, panels, or texture where useful, but no noisy or flashy effects

The design should preserve theme toggle support and remain coherent in both light and dark themes.

## Motion

Motion should remain present but more disciplined.

Guidelines:

- Preserve `prefers-reduced-motion` respect
- Use meaningful entrance and reveal motion
- Avoid excessive floating or decorative movement
- Favor clarity and polish over spectacle

## Internationalization

Any structural or copy changes must update both locale files:

- `public/locales/pt/translation.json`
- `public/locales/en/translation.json`

Requirements:

- No orphan keys
- No PT-only or EN-only content changes
- New section labels and descriptive text must be mirrored in both languages

## Accessibility

The redesign must maintain:

- One clear `h1`
- Logical heading structure
- Visible focus states
- Sufficient contrast
- Mobile readability
- Reduced-motion support

## Technical Scope

Likely implementation surfaces:

- `src/pages/Index.tsx`
- `src/components/sections/Hero.tsx`
- `src/components/sections/Projects.tsx`
- `src/components/sections/About.tsx`
- `src/components/sections/Skills.tsx`
- `src/components/sections/Contact.tsx`
- `src/components/ThemeToggle.tsx`
- `src/index.css`
- `public/locales/pt/translation.json`
- `public/locales/en/translation.json`

Additional small presentational components may be introduced if that improves clarity and keeps section files manageable.

## Verification

Before considering the redesign complete:

- Run the project locally
- Check responsive behavior on desktop and mobile widths
- Verify light and dark themes
- Validate the contact form still behaves correctly when configured
- Run the repo build and relevant checks
- Confirm PT and EN translations remain consistent

## Implementation Constraints

- Keep the redesign inside `redesign/product-premium`
- Do not start the experimental direction in this branch
- Prefer improving structure and design quality over adding new features
- Preserve real project links and existing validated content unless intentionally revised
