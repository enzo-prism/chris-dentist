# Repository Guidelines

## Project Structure & Module Organization
The workspace splits into `client`, `server`, and `shared`. `client/src` contains the Vite React app—UI primitives in `components`, pages in `pages`, hooks in `hooks`, utilities in `lib`. Express lives in `server` (`index.ts` bootstrap, `routes.ts` handlers, `storage.ts` in-memory data, `vite.ts` dev wiring) and shares schema types from `shared/schema.ts`; deployable assets sit in `public`, while `attached_assets/` is reference-only.

## Build, Test, and Development Commands
Install dependencies once, then run `npm run dev` for the Express+Vite development server on port 5000. `npm run build` generates the client bundle and an esbuild server bundle in `dist/`; launch production locally with `npm run start`. Guard type safety with `npm run check` and sync schema changes made in `shared/schema.ts` via `DATABASE_URL=… npm run db:push`.

## Coding Style & Naming Conventions
Strict TypeScript is enabled, so prefer explicit return types and readonly data. Name React components in PascalCase, hooks with a `use` prefix, and shared helpers with camelCase filenames. Tailwind drives styling—extend tokens in `tailwind.config.ts` and rely on editor Prettier/Tailwind plugins to keep formatting aligned with existing files.

## Testing Guidelines
Tests are minimal; run the analytics smoke check with `tsx client/src/lib/analytics.test.ts`. Co-locate new `.test.ts` or `.test.tsx` files beside the code they cover so Vite or tsx can execute them. Favour direct imports of handler functions from `server/routes.ts` for integration coverage and keep `npm run check` as the required pre-push gate.

## Commit & Pull Request Guidelines
With no Git history in this snapshot, adopt Conventional Commits (`feat: add booking form validation`) and keep subject lines under 72 characters. Pull requests should explain motivation, outline key code paths, flag schema or env changes, and add UI screenshots when relevant. Confirm `npm run build` or at minimum `npm run check` before requesting review.

## Security & Configuration Tips
`drizzle.config.ts` requires `DATABASE_URL`; load it through a local, untracked `.env`. Avoid logging patient identifiers or session data, especially when touching `server/storage.ts`. Update the redirect guard in `server/index.ts` when new domains are introduced and keep `public/` assets optimized for the one-year cache header.
