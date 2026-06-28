# Data Narrative Studio Quality Pass

## Independent Analysis
- Portfolio slug: `data-narrative-studio`
- Local repo: present
- Source type: Web/Node
- README: portfolio-grade; updated-quality-section
- Install: passed via npm install --ignore-scripts
- Run: local dev server launched and Playwright media captured
- Build: failed: failed (1)
- Test: no test script detected
- Lint: failed: failed (1)

## Assets
- Screenshots: real screenshots present; captured 4 new
- Demo video: real video present
- Deployment: portfolio case-study fallback; external deployment still needed

## Copied / Captured Assets
- /projects/data-narrative-studio/screenshots/01-real-screenshot.png
- /projects/data-narrative-studio/videos/playwright-local-dev-server.webm
- /projects/data-narrative-studio/screenshots/01-overview.png
- /projects/data-narrative-studio/screenshots/02-core-feature.png
- /projects/data-narrative-studio/screenshots/03-detail-view.png
- /projects/data-narrative-studio/screenshots/04-architecture-or-data-flow.png

## Manual Follow-up Needed
- Fix the local build before publishing this as a fully runnable demo.
- Deploy an external live demo if this project should be showcased as runnable.

## Notes
- Build output tail: ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  4 | import mongoose from 'mongoose';
  5 |
  6 | export async function GET(

Import map: aliased to relative './src/lib/db/models/dataset.model' inside of [project]/


https://nextjs.org/docs/messages/module-not-found


    at <unknown> (./src/app/api/datasets/[slugs]/records/route.ts:3:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)

Command failed: npm run build --if-present

> Build error occurred
Error: Turbopack build failed with 1 errors:
./src/app/api/datasets/[slugs]/records/route.ts:3:1
Module not found: Can't resolve '@/lib/db/models/dataset.model'
  1 | import { NextRequest, NextResponse } from 'next/server';
  2 | import { connectDB } from '@/lib/db/mongoose';
> 3 | import { Dataset } from '@/lib/db/models/dataset.model';
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  4 | import mongoose from 'mongoose';
  5 |
  6 | export async function GET(

Import map: aliased to relative './src/lib/db/models/dataset.model' inside of [project]/


https://nextjs.org/docs/messages/module-not-found


    at <unknown> (./src/app/api/datasets/[slugs]/records/route.ts:3:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
- Lint output tail: BlockList.tsx
   3:10  warning  'useMemo' is defined but never used             @typescript-eslint/no-unused-vars
  11:50  error    Unexpected any. Specify a different type        @typescript-eslint/no-explicit-any
  23:13  warning  'reordered' is assigned a value but never used  @typescript-eslint/no-unused-vars

[local-path]
  11:10  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  12:12  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

[local-path]
  5:18  error  An interface declaring no members is equivalent to its supertype  @typescript-eslint/no-empty-object-type

[local-path]
  5:18  error  An interface declaring no members is equivalent to its supertype  @typescript-eslint/no-empty-object-type

[local-path]
  70:53  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  75:30  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

[local-path]
   9:25  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  11:23  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

✖ 20 problems (17 errors, 3 warnings)



Command failed: npm run lint --if-present
