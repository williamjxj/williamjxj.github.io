---
name: project-docs-index
description: Keep everything under client/public/docs in sync with the williamjxj.github.io site — both the React "Professional Documents" section and the in-docs navigation shell (docs-shell.js DOCS array, /docs/index.html cards, light theme, prev/next order). Use whenever a document, image, video or other viewable/downloadable asset is added, renamed or removed in client/public/docs, when a docs page needs the shared shell, or when asked to add/link a file from that folder on the site.
---

# Index project documents

This skill is specific to the `williamjxj.github.io` project. Assets under
`client/public/docs/` are surfaced in **two** places, and adding a file means
touching both:

| Surface | File | Purpose |
| --- | --- | --- |
| Marketing section | `client/src/components/sections/Documents.tsx` + `client/src/lib/translations.ts` | Cards in the homepage "Professional Documents" section |
| Docs shell | `client/public/docs/docs-shell.js` (`DOCS` array) | Top bar menu and prev/next footer on every docs page |
| Docs landing | `client/public/docs/index.html` | The `/docs/` index page cards |

The shell is plain static CSS/JS — no build step, no framework, no bundler.
`client/public/docs` is copied verbatim into `dist/public/docs` by Vite.

## The docs shell contract

- `client/public/docs/docs-shell.css` — every class prefixed `docs-` (`--docs-shell-h: 44px`,
  `.docs-shell`, `.docs-shell-in`, `.docs-menu*`, `.docs-foot*`). It never restyles document content.
- `client/public/docs/docs-shell.js` — injects the bar and footer; `DOCS` at the top is the single
  source of truth for **order, filenames and titles**. The menu is generated from it on every page
  including `index.html`, so never hand-write menu links.
- Every docs HTML page links `<link rel="stylesheet" href="docs-shell.css">` in `<head>` and
  `<script src="docs-shell.js"></script>` before `</body>`. Paths are **relative** — the pages live
  at `/docs/`.
- Docs are **light only**. `frontend-animation-reference.html` carries a page-level
  `/* light theme (docs shell) */` override block; a dark page among light ones is a bug.
- Nav labels are bilingual (`EN · 中文`), because two pages are English and two are Chinese.
- The shell bar is sticky at every width; the handbooks' own `.bar`/`.side` are offset below it by
  `--docs-shell-h` in `docs-shell.css`. Do not add page-level overrides for that.
- `docs/index.html` is hand-written and works without JavaScript: its menu starts empty and the
  script fills it from `DOCS`; its four cards are static and must be kept in sync by hand.

## Workflow — adding a document

1. Confirm the new file exists under `client/public/docs` and note its exact filename and extension.
   Do not rename or move it unless asked.
2. **Shell registration** — for a self-contained HTML page, add one entry to `DOCS` in
   `client/public/docs/docs-shell.js`:

   ```js
   { file: "my-page.html", en: "English title", zh: "中文标题" }
   ```

   Array order is the reading order used by the menu and by prev/next. Give the page the two
   shell references (see the contract above) and keep it light-themed.
3. **Docs landing** — add a matching `<a class="docs-card">` card in `client/public/docs/index.html`
   in the same position as the `DOCS` entry: language chip (`EN` or `中文`), English title,
   Chinese subtitle, one-sentence description, `Open →`. Leave the existing
   "keep these cards in sync with DOCS" comment in place.
4. **Homepage section** — read `client/src/components/sections/Documents.tsx` and
   `client/src/lib/translations.ts` before editing, follow the existing card style, and do not
   replace or reorder unrelated cards. Add one object to the `docs` array:
   - `href: "/docs/<exact-filename>"` — Vite serves `client/public` from the site root.
   - Pick a `lucide-react` icon; reuse an existing import when it fits.
   - HTML references: `download: false` (opens in a new tab with `rel="noreferrer"`).
   - DOCX and other saved/consumed files: `download: true`.
   - PDF, image, audio, video: prefer opening in a new tab; use download only when the file type
     or the request calls for it.
5. **Translations** — add title/description/action strings to the `documents` section of both the
   English and Chinese objects in `client/src/lib/translations.ts`, including the `Translations`
   type. Reuse the existing `open` and `download` labels.
6. **Review** — `pnpm check` (types) and `pnpm build`; confirm `dist/public/docs/` contains the new
   file plus `docs-shell.css`, `docs-shell.js` and `index.html`. Serve `client/public` and check
   `/docs/<file>`: shell bar present, current entry marked, prev/next correct, light theme, no
   horizontal scroll at 390px. Report the files changed.

## Workflow — renaming or removing a document

Update, in the same commit: the file itself, its `DOCS` entry, its `index.html` card, its
`Documents.tsx` object, and both translation dictionaries. Renaming only the file leaves a dead
menu link and a broken card — check every `href` matches the filename exactly.

## Non-goals

- Do not edit the `.docx` files, and do not convert them.
- Do not add a build step, framework, dependency or external CDN to the docs shell.
- Do not reintroduce a dark theme for one page; flip to light instead.
- Do not duplicate the document list by hand-editing the menu in a page — it comes from `DOCS`.

## Existing examples

- `autodrive-ml-training-overview.docx` — downloadable document, homepage card only (not in `DOCS`).
- `llm-workflow.html` — shell page, `DOCS` entry, `/docs/` card, homepage card opening in a new tab.

Use these as behavioural examples; do not hard-code their titles, descriptions or metadata.
