# BYD Georgia / GT Group Premium Website

## Project overview
A production-oriented, premium bilingual automotive experience built with Next.js App Router, JavaScript, Tailwind CSS, and Three.js-ready configurator architecture.

## Recommended folder structure
- `app/` — routes, layouts, API endpoints, sitemap, robots.
- `components/` — reusable UI, layout, forms, sections, admin, and 3D modules.
- `data/` — scalable mock content for vehicles, blog, FAQ, legal, and education.
- `lib/` — i18n helpers, SEO, validation, admin store, Zoho service abstraction, and formatting helpers.
- `public/` — placeholder path for future GLB and marketing assets.

## Setup
1. Install dependencies: `npm install`
2. Run locally: `npm run dev`
3. Open `http://localhost:3000`
4. Configure `.env.local` based on `.env.example`

## Notes about placeholder assets
- Current imagery uses Unsplash placeholders.
- `public/models/placeholder-byd.glb` is a reserved path for future official GLB assets.
- All specs, prices, and finance values are clearly marked as mock placeholders.

## How to refine 3D later
- Replace the placeholder `PlaceholderVehicle` mesh with official GLB loading via `useGLTF`.
- Map trim, door articulation, material variants, and wheel assets to vehicle-level configuration metadata.
- Add environment presets, camera choreography, screenshots, and performance adaptation per device.

## How to refine admin/blog later
- Replace mocked auth with a real auth provider and role-based permissions.
- Persist `admin-store` data in a database or headless CMS.
- Add rich text editing, scheduling, media uploads, moderation, and localization workflows.

## Troubleshooting
- If you see hydration or `Missing ActionQueueContext` errors in the browser, delete `node_modules`, `.next`, and any lockfile, then reinstall dependencies so the repo uses the pinned React/ReactDOM versions from `package.json`.
- Recommended reset flow on Windows PowerShell: `Remove-Item -Recurse -Force node_modules, .next` then `npm install` then `npm run dev`.
