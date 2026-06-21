# Content Review

This document tracks portfolio content that must be reviewed before the site is treated as final public material.

## Current Snapshot

- Scanned candidate projects: 86
- Public catalog records currently generated: 85
- Records marked `needsReview`: 46
- Auto-generated Dothost `/p/[slug]` live demo links in final catalog: 0
- Records with at least one verified link in final catalog: 59

## Review Rules

- Do not publish guessed business outcomes, fake metrics, fake demos, or fake screenshots.
- Keep generated summaries only as drafts until the project README/source evidence supports them.
- If a project has no verified demo, GitHub, documentation, screenshots, or video, show a pending/metadata state instead of an empty button.
- Every public project must have both `zh-TW.md` and `en.md`; if either language uses placeholder text, keep `metadata.needsReview` enabled.

## Strong Candidate Projects

Prioritize these for polished bilingual case studies and media capture:

| Project | Evidence | Current Gap |
| :--- | :--- | :--- |
| `digital-archive-review-board` | Next.js / React / Tailwind / TypeScript, README, build scripts | Needs screenshots and richer case study proof |
| `ai-knowledge-workspace` | Next.js / React / Tailwind / TypeScript, GitHub remote, README | Needs screenshots and reviewed bilingual case study |
| `prism-runner-3d` | React Three Fiber / Three.js / Zustand, GitHub remote, README | Needs screenshots or demo clip |
| `signal-diver-3d` | React Three Fiber / Phaser / Three.js, GitHub remote, README | Needs screenshots or demo clip |
| `datalab-studio` | Java / Maven / Spring Boot, GitHub remote, README | Needs backend architecture summary and screenshots/docs |
| `libradesk` | Java / Maven, GitHub remote, README | Needs clearer library-system case study and UI/media proof |

## Current Known Gaps

- Many generated case studies still include thin README-derived summaries rather than reviewed project narratives.
- Most records do not yet have copied media under `public/portfolio/projects/[slug]/`.
- Several learning exercises are still visible in the public catalog because older override files set `visibility: "public"`.
- The scanner now avoids publishing new projects by default, but existing override files need manual curation in later passes.

## Next Content Pass

1. Select 8-12 strongest public projects for the first polished portfolio release.
2. Set weaker learning exercises to `visibility: "hidden"` or group them into collection records.
3. For each selected project, write reviewed `zh-TW.md` and `en.md` sections from README/source evidence.
4. Capture or copy real screenshots and mark missing media honestly.
5. Keep `needsReview` active until bilingual content and media are verified.
