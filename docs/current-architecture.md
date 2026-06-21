# Current Architecture

This document outlines the routing, component hierarchy, translation patterns, and style configuration of the `justin-portfolio` application.

## 1. Page and Routing Structures (Next.js App Router)
Next.js App Router is used with dynamic path prefixing for internationalization:
- **Root routing config**: `[locale]` dynamic routing segment containing:
  - `layout.tsx` - App layout containing fonts, theme configurations, navigation Header, and the global search palette.
  - `page.tsx` - Portfolio landing page.
  - `about/page.tsx` - Profile, work timeline, skills hierarchy.
  - `contact/page.tsx` - Dynamic email form.
  - `tech/page.tsx` - Detailed tech skill analysis.
  - `projects/all/page.tsx` - Main faceted project search page.
  - `projects/compare/page.tsx` - Side-by-side project comparison.
  - `projects/[slug]/page.tsx` - Dynamic case study page.

## 2. Server vs. Client Components Boundary
- **Server Components**:
  - Main pages under `[locale]` (e.g. `page.tsx`, `projects/[slug]/page.tsx`, `projects/compare/page.tsx`) are server components that handle fetching and formatting data based on URL parameters.
  - Layout pages utilize Next.js i18n configurations.
- **Client Components**:
  - Components requiring interaction, animations, or browser APIs are marked with `"use client"`.
  - `ProjectExplorer` (`src/components/projects/archive/project-explorer.tsx`) manages faceted sidebar state, sorting selection, and active filters.
  - Preference state (bookmarks and comparisons) are managed on the client side using Zustand.
  - Animated sections (`reveal.tsx`, `hero.tsx`) run in the client scope with Framer Motion.

## 3. Style and Design System (Tailwind CSS v4 & shadcn/ui)
- Tailwind CSS v4 is configured using `@tailwindcss/postcss` in PostCSS pipeline.
- The global style rules are declared in `src/app/globals.css`, defining theme colors (dark/light), custom font-families, and utility classes.
- Shadcn ui elements are configured using `components.json` and placed under `src/components/ui/`.
- Dynamic micro-animations are provided by `motion` for smooth layout transitions and visual feedback.

## 4. Internationalization (next-intl)
- Localized translations are stored under root `messages/` folder:
  - `en.json` - English translations
  - `zh-TW.json` - Traditional Chinese translations
- Active locale navigation is wrapped using custom helpers from `src/i18n/navigation.ts`.
- Routing configuration is defined in `src/i18n/routing.ts`.
- Locale request resolving is structured in `src/i18n/request.ts`.

## 5. State Management & Local Storage (Zustand)
- `useProjectPreferences` (`src/stores/project-preferences-store.ts`) persists the user's bookmarks (`favoriteSlugs`) and comparative projects (`compareSlugs`) to localStorage.
- Limit of comparison items is set to 3.
