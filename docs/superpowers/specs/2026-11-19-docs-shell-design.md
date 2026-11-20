# Docs shell — design

2026-11-19

## Intent

The four standalone HTML documents under `client/public/docs/` were made at
different times and read as four unrelated pages: two palettes, three font
stacks, one dark page among three light ones, no way back to the portfolio,
and no link from one document to another. A visitor who lands on
`/docs/genai-handbook.html` from search or a shared link is in a dead end.

Add a shared, light "docs shell" on top of the existing pages: a brand mark
that returns to the portfolio, a menu that reaches every document in the set,
and prev/next links at the end of each page. The documents themselves keep
their own typography, palettes and layouts.

## Goals

- One light navigation bar on all four pages: WJ mark → `/`, a Docs menu
  listing all four documents (current one marked), and a back-to-portfolio link.
- Prev/next footer on each page, plus an "all documents" link.
- `/docs/` resolves to a light index page listing the four documents.
- Every page renders on light paper, including
  `frontend-animation-reference.html` (currently the only dark page).
- One place to add a fifth document later.

## Non-goals

- No change to the `.docx` files, and no change to the React portfolio
  (`Documents.tsx`, translations, homepage cards stay as they are).
- No rewrite of document bodies, section structure, or prose.
- No dark mode added to the docs, and no manual theme toggle.
- No build step, no framework, no bundler: the docs are static files on
  GitHub Pages.

## Anti-goals

- A shell that visually overrides the documents' own content styling.
- A shell that breaks the existing sticky chapter bars, collapsible sidebars,
  search, or the RAG step player.
- Four copies of nav markup that drift apart.

## Constraints

- Served from `/docs/` on GitHub Pages; relative asset paths only.
- `genai-handbook.html` and `llm-workflow.html` already put a
  `position: sticky; top: 0` bar at the top of the page, and a fixed sidebar on
  narrow screens — the shell must sit above both without overlap.
- The reference page is 2,291 hand-authored lines; its structural colours come
  from `:root` variables, but ~20 rules hard-code pastel accents that only work
  on a dark background.
- Content language is mixed (two English, two Chinese), so nav labels are
  bilingual.
- Three of the four pages already require JavaScript to render their content,
  so a JS-injected shell costs nothing.

## Approaches

1. **Shared shell, per-page styles** (chosen). Two shared files,
   `docs/docs-shell.css` and `docs/docs-shell.js`; each page gains a `<link>`
   and a `<script>`. The shell injects a bar and footer; per-page styles are
   untouched. Cheapest to keep in sync, smallest blast radius.
2. **Self-contained per page.** Same bar and footer copied inline into each
   file. Portable per file, but four copies of the nav to maintain — rejected.
3. **Full re-theme.** Rebuild all four on one shared light stylesheet and
   one type scale. Most uniform, but risks the 2,291-line reference page and
   the animated SVG player, and erases the documents' distinct voices —
   rejected.

## How it works

- **`docs/docs-shell.js`** injects, unless a shell is already present:
  - a 44px top bar with the WJ gradient mark linking to `/`, the word
    "Docs · 文档", a native `<details>` dropdown listing the four documents with
    the current one marked `aria-current="page"`, and a
    "← Portfolio / 返回作品集" link. It is sticky at 760px and wider, and
    static on phones, so the documents' own sticky bars keep the top slot
    where vertical space is scarce;
  - a footer before `</body>` with prev/next document links, "All documents",
    and the back-to-portfolio link.
  It adds a `docs-shelled` class to `<body>`. Document order for prev/next is
  the order used on the index page.
- **`docs/docs-shell.css`** carries all shell styling (self-contained, no
  external fonts beyond what pages already load, system/IBM Plex stack),
  plus two offsets scoped to `body.docs-shelled`: the pages' existing `.bar`
  sticks below the shell, and the narrow-screen `.side` panel starts below it.
  Full-bleed is achieved with `width: 100vw; margin-left: calc(50% - 50vw)`
  under `html { overflow-x: clip }`.
- **`docs/index.html`** — new, light, hand-written (static nav, same classes),
  cards for the four documents, same footer. `docs-shell.js` detects its bar
  and does nothing.
- **`frontend-animation-reference.html`** — a short page-level `<style>` block
  after the existing styles redefines `:root` to light paper and dark ink, and
  overrides the ~20 rules that hard-code dark-only accents (badges, callouts,
  tags, do/don't boxes, inline code). Code blocks keep a dark surface, which
  reads correctly on light paper. No markup changes.
- Each page gets exactly two added lines (link, script), plus the override
  block on the reference page.

## Risks

- Breakout width could introduce horizontal scrolling on some pages; guarded
  with `overflow-x: clip` and verified per page.
- Light accents on the reference page may land at low contrast; verified by
  screenshot and by computing contrast for the text colours.
- Duplicate `id`/class collisions with page markup; all shell classes are
  `docs-`-prefixed.

## Verification

- Build (`pnpm run build`) still emits all four documents.
- Screenshot every page at 1440px and 390px via headless Chrome, top of page
  and scrolled; confirm no overlap with each page's own bar, sidebar, or
  player, and that text is legible.
- Click-through: each nav entry reaches its page, "Portfolio" returns to `/`,
  prev/next footer links resolve.

## Left to the builder

Exact dropdown interaction polish, spacing values, and the wording of the
one-line document descriptions on the index page.
