# Campus Quest 3d Quality Pass

## Independent Analysis
- Portfolio slug: `campus-quest-3d`
- Local repo: present
- Source type: Web/Node
- README: portfolio-grade; updated-quality-section
- Install: passed via npm install --ignore-scripts
- Run: local dev server launched and Playwright media captured
- Build: failed: failed (2)
- Test: no test script detected
- Lint: failed: failed (1)

## Assets
- Screenshots: real screenshots present; captured 4 new
- Demo video: real video present
- Deployment: portfolio case-study fallback; external deployment still needed

## Copied / Captured Assets
- /projects/campus-quest-3d/screenshots/01-real-screenshot.png
- /projects/campus-quest-3d/screenshots/02-real-hero.png
- /projects/campus-quest-3d/videos/playwright-local-dev-server.webm
- /projects/campus-quest-3d/screenshots/01-overview.png
- /projects/campus-quest-3d/screenshots/02-core-feature.png
- /projects/campus-quest-3d/screenshots/03-detail-view.png
- /projects/campus-quest-3d/screenshots/04-architecture-or-data-flow.png

## Manual Follow-up Needed
- Fix the local build before publishing this as a fully runnable demo.
- Deploy an external live demo if this project should be showcased as runnable.

## Notes
- Build output tail: cript `build` failed with error:
npm error code 2
npm error path [local-path]
npm error workspace @campus-quest/api@0.1.0
npm error location [local-path]
npm error command failed
npm error command sh -c tsc

npm error Lifecycle script `build` failed with error:
npm error code 2
npm error path [local-path]
npm error workspace @campus-quest/game-data@0.1.0
npm error location [local-path]
npm error command failed
npm error command sh -c tsc

Command failed: npm run build --if-present
npm error Lifecycle script `build` failed with error:
npm error code 2
npm error path [local-path]
npm error workspace web@0.0.0
npm error location [local-path]
npm error command failed
npm error command sh -c tsc -b && vite build

npm error Lifecycle script `build` failed with error:
npm error code 2
npm error path [local-path]
npm error workspace @campus-quest/api@0.1.0
npm error location [local-path]
npm error command failed
npm error command sh -c tsc

npm error Lifecycle script `build` failed with error:
npm error code 2
npm error path [local-path]
npm error workspace @campus-quest/game-data@0.1.0
npm error location [local-path]
npm error command failed
npm error command sh -c tsc
- Lint output tail: nused-vars
  26:11  error  'zone' is assigned a value but never used  @typescript-eslint/no-unused-vars

[local-path]
  19:5  warning  React Hook useMemo has missing dependencies: 'player.position.x', 'player.position.y', and 'player.position.z'. Either include them or remove the dependency array  react-hooks/exhaustive-deps

[local-path]
  208:11  error  'resultBg' is assigned a value but never used  @typescript-eslint/no-unused-vars

[local-path]
  179:33  error  '_' is assigned a value but never used  @typescript-eslint/no-unused-vars

[local-path]
  43:36  error  '_day' is defined but never used  @typescript-eslint/no-unused-vars

✖ 12 problems (11 errors, 1 warning)


npm error Lifecycle script `lint` failed with error:
npm error code 1
npm error path [local-path]
npm error workspace web@0.0.0
npm error location [local-path]
npm error command failed
npm error command sh -c eslint .


Command failed: npm run lint --if-present
npm error Lifecycle script `lint` failed with error:
npm error code 1
npm error path [local-path]
npm error workspace web@0.0.0
npm error location [local-path]
npm error command failed
npm error command sh -c eslint .
