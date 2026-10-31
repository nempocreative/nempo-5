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

- The migrated nempo.id site (from nempocreative/organizer, artifacts/nempo-garut-web) runs client-only via src/legacy/LegacyApp.tsx from `/` and the `/$` splat route, with its own wouter router; keep pages in src/pages until they are converted to TanStack routes. Why: preserves the original app intact during the staged migration.
