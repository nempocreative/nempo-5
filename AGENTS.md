<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture rules
- Nempo Buddy lives within the shared Layout with its original mode and chat state; its chat answers and service matching live in browser-safe `src/data/buddy-chat.ts` with routing tests; why: update chat content without replacing the restored widget or changing other modes.
- Service-page prices and inclusions (wedding WO, wedding invitation, sosmed management, web development, design creative, talent management, business system) live in browser-safe data modules under `src/data/` shared by the page and its rule tests; why: one source per price so pages and tests stay consistent with the Kenalan Nempo / price-list sources. Each service page has a leaf route that mounts NempoShell for its own metadata and is registered in the `Switch` in `src/nempo-app.tsx`.
- The NEMPO site (migrated from Replit repo nempocreative/organizer, artifact nempo-garut-web) renders client-only through `src/components/nempo-shell.tsx`, mounted by `src/routes/index.tsx` and the catch-all `src/routes/$.tsx`; why: its 100+ pages rely on browser APIs and were ported as-is.
- Page-level routing inside the NEMPO app goes through `src/lib/wouter.tsx`, a wouter-compatible API backed by TanStack Router; why: keeps one router without rewriting every page. New pages are added to the `Switch` in `src/nempo-app.tsx`.
- tsconfig strict extras (noUncheckedIndexedAccess, exactOptionalPropertyTypes, etc.) are off; why: the imported code was written without them.
- Other Replit artifacts live in `src/apps/<key>/` (own `@/apps/<key>/` imports, `entry.tsx`, public files under `public/<base>/`) and mount at `/<base>` via `src/routes/<base>.index.tsx` + `<base>.$.tsx` using `AppShell`; why: each was a separate Vite app and they must not collide.
- Full-data JSON backup: `src/lib/backup.ts` lists every database table (a type check fails if a table is missing), `/api/backup` serves the file, and `/backup` is the download page; why: one source for "everything" so new tables can't silently drop out of backups.
- Sub-app stylesheets (`src/apps/*/index.css`) can end up loaded on main-site pages, so they must never set shared theme variables (`--primary`, `--primary-foreground`, ...) to placeholder values; why: a leaked placeholder made white text on every main-site page fall back to dark.
- Lazily loaded pages and apps use `lazyWithRetry` from `src/lib/lazy-with-retry.ts` instead of React `lazy`; why: a page file that fails to load after an update ("Importing a module script failed") otherwise blanks the whole screen — it retries once, then reloads once.
