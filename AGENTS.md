# AGENTS.md

Personal portfolio for williamjxj.github.io: React 19 + Vite 7 (Tailwind v4) client, a small Express server, and static long-form documents. Deployed to GitHub Pages by `.github/workflows/deploy.yml` on push to `main`.

## Commands

```bash
pnpm install                          # pnpm 10.4.1 is pinned via packageManager
pnpm dev                              # regenerates docs catalog, then Vite on http://localhost:3000
pnpm build                            # catalog -> vite build (dist/public) -> esbuild server (dist/index.js)
pnpm check                            # tsc --noEmit (the only typecheck)
pnpm docs:catalog                     # regenerate client/public/docs/docs-catalog.json
node --test tests/documents-library.test.mjs   # docs catalog + library tests (no pnpm test script)
pnpm format                           # Prettier, repo-wide
```

There is no linter. Verify changes with `pnpm check`, the docs test, and `pnpm build` when docs/build output is involved.

## Architecture

- Vite `root` is `client/`, so the HTML entry is `client/index.html` and `client/public/*` is served at `/` (copied verbatim to `dist/public`). Alias `@` -> `client/src`, `@shared` -> `shared`.
- Routes are only `/` and `/404` in `client/src/App.tsx` (wouter). Add new React pages there.
- The Express server (`server/index.ts`) only serves `dist/public` with an SPA fallback. GitHub Pages deploys `dist/public` directly, so the server does not run in production. A Vite plugin copies `index.html` to `404.html` for SPA routing on Pages.
- Bilingual EN/ZH: strings live in `client/src/lib/translations.ts` and must be added to both the `en` and `zh` objects plus the `Translations` type. A few sections (e.g. `Documents.tsx`) keep inline `isChinese ? ... : ...` copy.
- Tailwind v4 is configured CSS-first in `client/src/index.css` (`@import "tailwindcss"`, `@theme inline`); there is no `tailwind.config.js`. shadcn/ui components use the `new-york` style under `client/src/components/ui`.
- Env vars load from the repo root (`envDir`). Umami analytics is injected only when both `VITE_ANALYTICS_ENDPOINT` and `VITE_ANALYTICS_WEBSITE_ID` are set. The dev-only Manus debug collector writes `.manus-logs/*.log`; ignore those.

## Documents pipeline

Only `client/public/docs/` is published. The root `docs/` directory is notes/staging and is not served.

- Supported catalog files: `.html .pdf .docx .md .txt .pptx .xlsx`; `index.html` is skipped. Displayed dates come from file mtime, so rerunning `pnpm dev`, `pnpm build`, or `pnpm docs:catalog` can dirty the tracked `docs-catalog.json` — commit it deliberately.
- Add/rename/remove a document: edit `client/public/docs/document-metadata.json` (bilingual title/description, topic, language, tags), then run `pnpm docs:catalog`. Never hand-edit `docs-catalog.json`; it is generated.
- The `/docs/` landing page and the homepage `#documents` section share the `<wj-documents-library>` custom element from `client/public/js/documents-library.js` (shadow DOM, styles in `client/public/css/documents-library.css`). Search/filter/pagination logic and `validateCatalog` live there; tests import the module in Node, so keep the `window` guard.
- Long-form HTML documents opt into the shared bar/prev-next shell via `../css/docs-shell.css` and `../js/docs-shell.js`; the `DOCS` array at the top of `docs-shell.js` is the single source of truth for order, filenames, and bilingual titles. `/docs/index.html` does **not** use the shell. The shell bar is light; several handbooks also expose their own light/dark toggle, so preserve each page's existing theme.
- `.agents/skills/project-docs-index/SKILL.md` documents the current docs pipeline (metadata → catalog, the shared library component, and the reader shell). Keep it in sync when any of those surfaces change.

## Gotchas

- README claims React 18 and port 5173; the real values are React 19 and port 3000 (`vite.config.ts`).
- `client/public/.nojekyll` must stay for GitHub Pages.
- The `.docx` files are large binaries; do not edit, convert, or regenerate them.
