# Local Development with pnpm

A reliable `pnpm run dev` setup keeps both the Express API and Vite client running together on port 5000. Follow this checklist whenever you work locally.

## 1. Prerequisites
- Node.js **18.18+**
- pnpm **8.7+** (`npm install -g pnpm` if needed)

## 2. Install & Configure
1. Install dependencies: `pnpm install`
2. Copy `.env.example` to `.env` and tweak values as needed:
   - `HOST` / `PORT` override where the Express server listens.
   - `REUSE_PORT_ENABLED=true` only if your OS supports it (macOS often does not).
   - Leave `ALLOW_LOCAL_PORT_FALLBACK=true` to auto-hop to `DEV_FALLBACK_PORT` (defaults to 5050) when Control Center or another process hogs port 5000.
   - Optional `DATABASE_URL` for Drizzle commands.
3. (Optional) If pnpm prompts about ignored build scripts, approve them via `pnpm approve-builds`.

## 3. Run the stack
```bash
pnpm run dev
```
- Express + Vite boot together; visit `http://localhost:5000`.
- Update env vars and restart if you need a different port or host.
- React Query caches API responses indefinitely, so hard-refresh if blog/service content changes.

## 4. Verification & linting
- Type check before committing: `pnpm run check` (known third-party typing issues may still surface; track fixes separately).
- Run the analytics smoke test as needed: `pnpm exec tsx client/src/lib/analytics.test.ts`.

## 5. Troubleshooting
- **`reusePort` errors**: leave `REUSE_PORT_ENABLED=false` (default) on macOS/Windows.
- **Port already in use**: adjust `PORT` in `.env` and restart.
- **Domain redirects**: the client enforces `www` redirects in production, but `pnpm run dev` will respect whatever host/port you configure via `.env`.
