---
name: project-docs-index
description: "Use when adding, updating, renaming, or removing a document under client/public/docs, when the homepage #documents section or /docs/ library must show a file, or when a long-form docs page needs the shared reader shell, menu, or prev/next links. Covers document-metadata.json, the generated docs-catalog.json, the wj-documents-library web component, docs-shell.js DOCS, bilingual metadata, and the docs catalog test."
---

# Index project documents

Project-specific to `williamjxj.github.io`. Files under `client/public/docs` are
surfaced by two different systems. Decide which one applies before editing.

| Surface | What it is | Source of truth |
| --- | --- | --- |
| Searchable library | Homepage `#documents` and the `/docs/` landing page, both rendering `<wj-documents-library>` | `client/public/docs/document-metadata.json` → `docs-catalog.json` |
| Reader shell | Top bar menu and prev/next footer on curated long-form HTML docs | `DOCS` in `client/public/js/docs-shell.js` |

The library component is `client/public/js/documents-library.js` (shadow DOM; styles in
`client/public/css/documents-library.css`). It owns search, topic/language filters, sorting,
six-item pagination, and `validateCatalog`. `Documents.tsx` only imports that script and renders
the element; there is no per-document card array in React or in the translations.

The reader shell is plain static CSS/JS: `client/public/css/docs-shell.css` and
`client/public/js/docs-shell.js`. It styles only its own `docs-*` classes and does not restyle
document content. Vite copies `client/public` verbatim into `dist/public`, so there is no build
step for either system.

## Add or update a library document

1. Put the file at the **top level** of `client/public/docs`. The catalog scans top-level files
   only; `index.html` is ignored. Supported extensions: `.html`, `.pdf`, `.docx`, `.md`, `.txt`,
   `.pptx`, `.xlsx`. Every docs HTML page must also link the site favicon in its `<head>`:
   `<link rel="icon" type="image/svg+xml" href="/favicon.svg">`. Use the same root-relative icon
   as the homepage; the docs test checks every HTML page.
2. Edit `client/public/docs/document-metadata.json` using the exact filename as the key. Provide:
   - `title` and `description`, each with both `en` and `zh` strings;
   - `topic`: `git-apps`, `ai`, `ml`, `frontend`, or `resources`;
   - `language`: `en`, `zh`, or `und`;
   - `tags`: an array of strings.
   Do not add `format`, `bytes`, or `updated`; the generator derives them.
3. Run `pnpm docs:catalog`. It rewrites `client/public/docs/docs-catalog.json`, which is generated
   and must never be hand-edited.
4. Library-only is the default. Add the page to the curated reader only when it is a
   self-contained long-form HTML reference that should appear in the reader menu and prev/next;
   DOCX, PDF, slides, and spreadsheets stay library-only.
   - add `{ file: "my-page.html", en: "English title", zh: "中文标题" }` to `DOCS` in
     `client/public/js/docs-shell.js` — place it in reading order next to related documents;
   - link `../css/docs-shell.css` and `../js/docs-shell.js` from the page;
   - preserve the page's own theme. The shell bar is light, and several handbooks also expose
     their own light/dark toggle; do not force a theme conversion just for the shell.
5. Verify: `node --test tests/documents-library.test.mjs`, `pnpm check`, and `pnpm build`. Check
   `/docs/` and `/#documents` show the file with the right language/topic, and on shell pages
   check `/docs/<file>`: current menu entry marked, prev/next correct, shell present, and no
   page-level horizontal scroll at 390px.

## Rename or remove a document

Change the file, its `document-metadata.json` key, and (for shell pages) its `DOCS` entry in the
same change, then run `pnpm docs:catalog`. A renamed shell page keeps its position in `DOCS`.
Prev/next is computed from that array, so removing or reordering an entry updates the neighbouring
pages automatically; no other page needs editing. No React or translation edits are needed — the
library reads the catalog. A rename that misses the metadata key or a DOCS entry leaves a stale
card or a dead menu link.

## Catalog rules

- `docs-catalog.json` is generated from top-level files, sorted by filename. `updated` comes from
  the file mtime, so `pnpm dev`, `pnpm build`, and `pnpm docs:catalog` can all change dates; commit
  the catalog deliberately.
- `validateCatalog` fails closed on unsafe paths, duplicate ids, unknown topics/languages/formats,
  negative byte counts, invalid dates, or malformed bilingual text. The test asserts this, so bad
  metadata breaks the library rather than silently dropping a file.
- DOCX files are always library-only; do not add them to `DOCS`, edit them, or convert them.

## Editing long-form handbook content

- `llm-workflow.html` and `llm-workflow-en.html` keep their Markdown in a JSON-encoded
  `var MD = "..."` string rendered by marked from cdnjs. Edit the Markdown string, not the rendered
  DOM.
- Raw HTML/SVG blocks pass through marked, but an HTML block ends at the first blank line. Keep an
  inline `<figure>` block free of blank lines, as in the hybrid retrieval figure in §1.11.2.
- Put figure styles in the page's existing `<style>` block. For wide diagrams, use an
  `overflow-x: auto` wrapper so the page itself stays within the viewport at 390px.
- The shell menu and the handbooks' in-page search index are generated at runtime.

## Non-goals

- Do not put publishable files in the root `docs/` directory; it is not served. Only
  `client/public/docs/` is published.
- Do not hand-write the shell menu or duplicate the document list; it comes from `DOCS`.
- Do not edit `docs-catalog.json` or add generated fields to the metadata.
- Do not add a build step, framework, or dependency to the docs shell.

## Examples

- `autodrive-ml-training-overview.docx` — library-only downloadable document, not in `DOCS`.
- `llm-workflow.html` — shell page plus library document; includes the inline hybrid retrieval
  figure in §1.11.2.
- `client/public/docs/index.html` — the dark `/docs/` landing page; uses the library, not the shell.

Related: `docs/documents-library.md` and `AGENTS.md`.
