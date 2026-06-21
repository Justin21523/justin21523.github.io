# Portfolio Project Audit

This document compiles the findings from auditing the `justin-portfolio` codebase.

## 0. Current Audit Update
- Current branch: `master`.
- Current workspace: contains existing local modifications and generated catalog/content files; do not reset or overwrite unrelated changes.
- Package manager: npm, based on `package-lock.json`.
- Node.js: `v22.22.3`.
- `npm run lint` currently passes with warnings only after the latest local fixes.
- `npm run catalog:scan` currently scans 86 candidate projects.
- `npm run catalog:validate` currently generates 85 public catalog records.
- Final generated catalog now strips unverified auto-generated `https://neojustin.dothost.net/p/[slug]/` live demo links.
- 46 generated records are currently marked `needsReview` because bilingual content or media evidence is incomplete.

## 1. Current Tech Stack and Actual Versions
From `package.json`:
- **Next.js**: `16.2.9` (App Router)
- **React**: `19.2.4`
- **React-DOM**: `19.2.4`
- **TypeScript**: `^5` (specifically `5.x`)
- **next-intl**: `^4.13.0`
- **next-themes**: `^0.4.6`
- **framer-motion** / **motion**: `^12.40.0`
- **zustand**: `^5.0.14`
- **shadcn**: `^4.11.0`
- **zod**: `^4.4.3`
- **react-hook-form**: `^7.79.0`
- **Tailwind CSS**: `^4` (using `@tailwindcss/postcss` devDependency)
- **lucide-react**: `^1.21.0`
- **postcss**: `^8` (implicit)

## 2. Existing Pages & Routing Paths
- `src/app/[locale]/page.tsx` - Homepage with Hero, featured projects, tech overview, about, contact.
- `src/app/[locale]/about/page.tsx` - Resume/About page with work experience, skills, and timeline.
- `src/app/[locale]/contact/page.tsx` - Contact page with a contact form.
- `src/app/[locale]/tech/page.tsx` - Advanced tech skills page.
- `src/app/[locale]/projects/[slug]/page.tsx` - Case study detailed view.
- `src/app/[locale]/projects/all/page.tsx` - Main faceted project explorer.
- `src/app/[locale]/projects/compare/page.tsx` - Side-by-side project comparison.
- `src/app/[locale]/projects/design/page.tsx` - Redirects to `all`.
- `src/app/[locale]/projects/mobile/page.tsx` - Redirects to `all`.
- `src/app/[locale]/projects/opensource/page.tsx` - Redirects to `all`.
- `src/app/[locale]/projects/web/page.tsx` - Redirects to `all`.

## 3. Existing Components
- **Global / Shared**:
  - `src/components/header.tsx` - Mega menu with links, language selector, theme toggle.
  - `src/components/mobile-menu.tsx` - Drawer/sheet-based menu for mobile.
  - `src/components/theme-provider.tsx` & `theme-toggle.tsx`
  - `src/components/language-toggle.tsx`
  - `src/components/motion/motion-provider.tsx` - Framer motion setup.
  - `src/components/motion/scroll-progress.tsx` - Scroll indicator.
  - `src/components/motion/reveal.tsx` - Entrance animations.
- **Home**:
  - `src/components/hero.tsx` - Hero section with floating background animations.
  - `src/components/home/home-sections.tsx` - Sections for featured projects, tech skills evidence, contact.
- **Projects**:
  - `src/components/projects/project-card.tsx` - Shared card component.
  - `src/components/projects/project-explorer.tsx` - Explorer skeleton (there is also another explorer in `archive/project-explorer.tsx`).
  - `src/components/projects/archive/project-explorer.tsx` - Detailed Client-side faceted explorer.
  - `src/components/projects/archive/project-archive-card.tsx` - Custom layouts (Grid, List, Catalog Record).
  - `src/components/projects/archive/project-archive-overview.tsx` - Search & query metadata display.
  - `src/components/projects/archive/project-preview-dialog.tsx` - Quick preview modal.
  - `src/components/projects/compare/project-compare-bar.tsx` - Persistent bottom bar for project selection.
  - `src/components/projects/detail/project-media-gallery.tsx` - Media slides.
- **Command Palette**:
  - `src/components/command/project-command-palette.tsx` - Global command search.

## 4. Existing Animations
- **Motion config**: Framer Motion 12 / `motion/react`.
- **Hero**: floating background circles, delayed entrance, text fade in.
- **Scroll Reveal**: `src/components/motion/reveal.tsx` wrapping blocks.
- **Card animations**: Hover lift, image scales, hover shadow transitions.
- **Reordering**: `LayoutGroup` and `m.li` layout transition during filter adjustments.

## 5. Existing Search & Filtering
- Fully client-side search in `project-explorer.tsx`.
- Synchronizes search state (`q`, `category`, `status`, `tech`, `sort`, `view`) to URL `searchParams`.
- Performs direct string match on title and technology names.
- Does not have fuzzy matching or advanced logic yet.

## 6. Previously Identified TypeScript Issues
Earlier audit notes listed the following issues. Several have since been addressed in the current working tree, and the current source of truth should be `npm run lint`, `npm run build`, and the generated catalog validation output:
1. `layout.tsx` attempts to read `locale` at top-level scope (ReferenceError and TS compile error).
2. `compare/page.tsx` imports `getProjectsBySlugs` which does not exist in `src/lib/projects.ts`.
3. `compare/page.tsx` implicit `any` parameter error in `(project) => ...`.
4. `redirect` parameters in `design/page.tsx`, `mobile/page.tsx`, `opensource/page.tsx`, `web/page.tsx` are missing the required `locale` field.
5. `home-sections.tsx` and `project-card.tsx` try to access `project.repositoryUrl`, but the `Project` interface only has `links` array with `kind: "github"`.
6. Transition `ease: [0.22, 1, 0.36, 1]` in `home-sections.tsx` is typed as `number[]` which is incompatible with the expected 4-number tuple. Requires `as const` or explicit tuple cast.
7. `archive/project-explorer.tsx` uses `searchParams` on line 116 before it is initialized on line 122.

## 7. Duplicate Components or Logic
- **Project Explorer**: There are two `project-explorer.tsx` files:
  - `src/components/projects/project-explorer.tsx` (simplified shell)
  - `src/components/projects/archive/project-explorer.tsx` (faceted explorer)
  We should clarify the route files to ensure the archive version is the main active one and clean up or deprecate the redundant copy.
- **Metadata Labels**: Hardcoded in multiple views. Controlled taxonomy should be consolidated.

## 8. Next.js 16 & React 19 Considerations
- **Async API for Page Params**: Next.js 16 requires awaiting `params` and `searchParams` inside pages. The current layout page and compare page have begun doing this, but parameters like `locale` in layout top-level are broken. We will refactor to resolve this cleanly.
- **React 19 Server/Client Boundaries**: Keep metadata calculations server-side where possible. The search index can be built at build-time.

## 9. Performance & Accessibility
- **Performance**:
  - Empty `public/portfolio/projects` folder indicates currently no assets.
  - Image scaling and next/image implementation are used, but remote pattern allows `images.unsplash.com`.
  - Command palette and dialogs are loaded directly, which may impact initial JS bundle. We should lazy load or import dynamically.
- **Accessibility**:
  - Focus outlines are standard Tailwind defaults.
  - `dialog` needs proper focus-trapping (shadcn handles this, but custom layout needs verification).
  - No `aria-live` announcing screen reader messages for active faceted updates.
- **SEO**:
  - Simple static metadata in pages.
  - No dynamic metadata based on current slug or locale for case studies.

## 10. Metadata Schema & Fake Data
- Currently defined project in `src/data/projects.ts` is `project-digital-archive-001`, which contains placeholder URLs (`https://github.com/YOUR_ACCOUNT/...`, `https://YOUR_DEMO_URL`).
- All other projects are missing, or represent placeholder text.
- No automated pipeline exists; projects are hardcoded in `src/data/projects.ts`.

## 11. Refactoring Plan
- Move `portfolioLocale` resolution inside `LocaleLayout` to resolve layout compiler error.
- Add `getProjectsBySlugs` helper in `src/lib/projects.ts`.
- Fix redirect parameter calls by passing `locale` from page context.
- Replace `project.repositoryUrl` calls with a safe helper like `getGitHubUrl(project)`.
- Use `as const` on Framer Motion `ease` configurations.
- Re-order variables in `archive/project-explorer.tsx` to initialize `searchParams` before accessing it.
