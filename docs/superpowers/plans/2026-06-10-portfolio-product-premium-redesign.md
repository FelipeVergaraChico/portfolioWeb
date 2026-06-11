# Portfolio Product Premium Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the portfolio homepage into a premium product-style landing page with stronger hierarchy, curated case studies, grouped skills, and synchronized PT/EN copy.

**Architecture:** Keep the app as a single-route Vite/React portfolio and improve it through focused section refactors rather than a full app restructure. The new homepage will reuse the existing content model where possible, add only small presentational structure, and centralize most of the visual direction in `src/index.css` and section-level composition.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, GSAP, react-i18next, EmailJS

---

## File Structure

- Modify: `src/pages/Index.tsx` to reorder the page flow and introduce the new credibility strip section.
- Create: `src/components/sections/CredibilityStrip.tsx` for the compact proof block under the hero.
- Modify: `src/components/sections/Hero.tsx` to strengthen layout, positioning copy, CTA framing, and premium composition.
- Modify: `src/components/sections/Projects.tsx` to convert the grid into a featured case-study layout while preserving real links.
- Modify: `src/components/sections/About.tsx` to merge experience and education into a stronger narrative block.
- Modify: `src/components/sections/Skills.tsx` to group technologies into capability clusters.
- Modify: `src/components/sections/Contact.tsx` to create a stronger closing section and keep EmailJS behavior intact.
- Modify: `src/components/ThemeToggle.tsx` for better placement/styling if needed in the redesigned shell.
- Modify: `src/index.css` to replace the current purple-heavy tokens with a premium palette and add reusable section utilities.
- Modify: `public/locales/pt/translation.json` and `public/locales/en/translation.json` to keep all new/changed copy synchronized.
- Verify: `package.json` scripts `npm run lint` and `npm run build`.

### Task 1: Establish the Premium Visual System

**Files:**
- Modify: `src/index.css`
- Modify: `tailwind.config.ts`
- Modify: `src/components/ui/button.tsx`

- [ ] **Step 1: Replace the base tokens with a premium palette and typography emphasis**

Update the root and dark tokens in `src/index.css` to move away from the current purple-default design and support warmer neutrals, sharper surfaces, and calmer accents.

- [ ] **Step 2: Add reusable layout and surface utilities**

Add section-level utilities in `src/index.css` for premium panels, eyebrow labels, grid rails, soft gradients, and consistent spacing so section files stay readable.

- [ ] **Step 3: Tune shared typography and button variants**

Adjust `tailwind.config.ts` font priorities if needed and refine `src/components/ui/button.tsx` variants so primary, secondary, and soft CTAs match the new visual system.

- [ ] **Step 4: Run lint for shared styling changes**

Run: `npm run lint`
Expected: `eslint` completes without new errors from the shared styling updates.

- [ ] **Step 5: Commit**

```bash
git add src/index.css tailwind.config.ts src/components/ui/button.tsx
git commit -m "feat: establish premium portfolio design system"
```

### Task 2: Rebuild the Homepage Flow

**Files:**
- Modify: `src/pages/Index.tsx`
- Create: `src/components/sections/CredibilityStrip.tsx`
- Modify: `public/locales/pt/translation.json`
- Modify: `public/locales/en/translation.json`

- [ ] **Step 1: Insert the credibility strip into the homepage structure**

Reorder `src/pages/Index.tsx` so the new flow is `Hero`, `CredibilityStrip`, `Projects`, `About`, `Skills`, `Contact`.

- [ ] **Step 2: Implement the new credibility strip section**

Create `src/components/sections/CredibilityStrip.tsx` with 3 concise proof blocks sourced from real profile themes already present in the portfolio: full stack delivery, product/security mindset, and current professional context.

- [ ] **Step 3: Add translation keys for the new section in PT and EN**

Extend both locale files with mirrored keys for the credibility strip heading, description, and proof items.

- [ ] **Step 4: Run lint for structure and i18n changes**

Run: `npm run lint`
Expected: no missing imports, no JSX/type issues, and no lint regressions.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Index.tsx src/components/sections/CredibilityStrip.tsx public/locales/pt/translation.json public/locales/en/translation.json
git commit -m "feat: add premium homepage structure and credibility strip"
```

### Task 3: Redesign the Hero and Featured Projects

**Files:**
- Modify: `src/components/sections/Hero.tsx`
- Modify: `src/components/sections/Projects.tsx`
- Modify: `public/locales/pt/translation.json`
- Modify: `public/locales/en/translation.json`

- [ ] **Step 1: Upgrade the hero composition**

Refactor `src/components/sections/Hero.tsx` to present a stronger headline, concise supporting copy, better CTA framing, and a premium visual composition while preserving reduced-motion handling.

- [ ] **Step 2: Convert projects into premium case studies**

Refactor `src/components/sections/Projects.tsx` so the first featured project has more visual weight and the first three projects read as curated highlights, with the remaining projects in a supporting layout.

- [ ] **Step 3: Update translations for hero/project framing**

Mirror any changed or added copy in both locale files. Preserve all project descriptions unless intentionally rewritten for clarity in both languages.

- [ ] **Step 4: Run lint after the main content refactor**

Run: `npm run lint`
Expected: the section rewrites compile cleanly under ESLint.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Hero.tsx src/components/sections/Projects.tsx public/locales/pt/translation.json public/locales/en/translation.json
git commit -m "feat: redesign hero and featured project presentation"
```

### Task 4: Reframe Experience, Skills, and Contact

**Files:**
- Modify: `src/components/sections/About.tsx`
- Modify: `src/components/sections/Skills.tsx`
- Modify: `src/components/sections/Contact.tsx`
- Modify: `src/components/ThemeToggle.tsx`
- Modify: `public/locales/pt/translation.json`
- Modify: `public/locales/en/translation.json`

- [ ] **Step 1: Turn About into a stronger experience narrative**

Refactor `src/components/sections/About.tsx` so experience and education share the same visual system and read as a premium narrative block instead of default bordered cards.

- [ ] **Step 2: Group technologies into capability clusters**

Refactor `src/components/sections/Skills.tsx` from a flat chip cloud into labeled groups such as frontend, backend, mobile, and platform/tooling.

- [ ] **Step 3: Redesign the contact close**

Update `src/components/sections/Contact.tsx` so the section closes the page with a stronger pitch, cleaner form presentation, and better-framed social actions while preserving EmailJS behavior.

- [ ] **Step 4: Reposition the theme toggle if needed**

Adjust `src/components/ThemeToggle.tsx` only as much as necessary so it integrates cleanly into the new layout without becoming visually intrusive.

- [ ] **Step 5: Synchronize all translation changes**

Mirror any new labels, grouped-skill headings, and contact copy in both locale files.

- [ ] **Step 6: Run lint**

Run: `npm run lint`
Expected: no issues across the remaining section updates.

- [ ] **Step 7: Commit**

```bash
git add src/components/sections/About.tsx src/components/sections/Skills.tsx src/components/sections/Contact.tsx src/components/ThemeToggle.tsx public/locales/pt/translation.json public/locales/en/translation.json
git commit -m "feat: redesign narrative, skills, and contact sections"
```

### Task 5: Verify the Redesign End-to-End

**Files:**
- Verify only: current branch working tree

- [ ] **Step 1: Run lint on the final branch state**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 2: Run the production build**

Run: `npm run build`
Expected: Vite production build succeeds with no blocking errors.

- [ ] **Step 3: Review responsive and theme behavior**

Run the app locally and verify desktop/mobile widths plus light/dark theme coherence.

- [ ] **Step 4: Confirm translation parity**

Review `public/locales/pt/translation.json` and `public/locales/en/translation.json` to ensure no new content exists in only one locale.

- [ ] **Step 5: Commit final polish if needed**

```bash
git add .
git commit -m "chore: finalize premium portfolio redesign"
```

## Self-Review

- Spec coverage is complete: hero, credibility strip, featured projects, narrative experience block, grouped technologies, contact close, visual system, motion discipline, accessibility, and translation sync all map to tasks above.
- Placeholder scan is clean: every modified surface is named directly and every verification command is explicit.
- Naming consistency is maintained across the new section (`CredibilityStrip`) and the reordered page flow.
