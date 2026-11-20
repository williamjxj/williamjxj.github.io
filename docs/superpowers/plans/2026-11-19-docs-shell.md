# Docs Shell Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give all four standalone documents under `client/public/docs/` a shared light navigation shell — home link, cross-document menu, prev/next footer — plus a `/docs/` index page, without changing their content or the React portfolio.

**Architecture:** Two shared static assets (`docs-shell.css`, `docs-shell.js`) live beside the documents and are referenced by two added lines per page. The script injects a top bar and a footer; the stylesheet styles them and offsets the documents' existing sticky chrome. `frontend-animation-reference.html` additionally gets a page-level light override block. `/docs/index.html` is hand-written with the shell markup already in place.

**Tech Stack:** Plain HTML/CSS/JS, no build step. Served by GitHub Pages from `client/public`.

**Spec:** `docs/superpowers/specs/2026-11-19-docs-shell-design.md`

## Global Constraints

- Only these files change: `client/public/docs/docs-shell.css` (new), `client/public/docs/docs-shell.js` (new), `client/public/docs/index.html` (new), and the 4 existing documents in `client/public/docs/`. Nothing in `client/src`, nothing in the `.docx` files.
- No external fonts, scripts, or CDNs added. No build step, no framework.
- All emitted class names and CSS custom properties are prefixed `docs-`.
- Asset references are relative (`docs-shell.css`, not `/docs/docs-shell.css`) so the pages work under any base path.
- Document order is fixed everywhere (menu, prev/next, index): `frontend-animation-reference.html`, `llm-workflow.html`, `rag-pipelines-animation.html`, `genai-handbook.html`.
- Bilingual labels: the four documents are `["Frontend Animation Reference", "前端动画参考"]`, `["LLM Workflow Handbook", "LLM 工作流手册"]`, `["RAG Pipelines", "RAG 流水线 (动画)"]`, `["GenAI Multimedia Handbook", "GenAI 多媒体手册"]`.
- Light only. No dark mode, no theme toggle.

## Review Focus

- **A page's own sticky bar under the shell bar** (`genai-handbook.html`, `llm-workflow.html`): when scrolled, the page bar must sit directly below the 44px shell, never overlap it, and never cover the shell's links.
- **Narrow-screen sidebar** on those two pages: the opened chapter drawer must start below the shell bar and stay scrollable.
- **Horizontal overflow** from the full-bleed shell (`width: 100vw`): no page may gain a horizontal scrollbar at 390px or 1440px.
- **`frontend-animation-reference.html` legibility after the light flip**: its heading is gradient-clipped text starting at `#fff`, and badges/callouts/tags carry pastel-on-dark text colours — all must be re-coloured, not just the `:root` variables.
- **First and last document in prev/next order**: no dead links, no wrap-around surprise, and `aria-current="page"` only on the current document.

---

### Task 1: Shell assets and the simplest page

**Files:**
- Create: `client/public/docs/docs-shell.css`
- Create: `client/public/docs/docs-shell.js`
- Modify: `client/public/docs/rag-pipelines-animation.html` (head + tail)

**Interfaces:**
- Produces: global `window.__DOCS__` — not used by later tasks; internal only.
- Produces CSS contract used by every later task: `--docs-shell-h: 44px`, `--docs-shell-bg`, `--docs-shell-line`, `--docs-shell-ink`, `--docs-shell-muted`, `--docs-shell-hover`, `--docs-shell-violet`, classes `.docs-shell`, `.docs-shell-in`, `.docs-brand`, `.docs-mark`, `.docs-brand-text`, `.docs-kicker`, `.docs-menu`, `.docs-menu-btn`, `.docs-menu-panel`, `.docs-menu-link`, `.docs-menu-title`, `.docs-menu-sub`, `.docs-home`, `.docs-foot`, `.docs-foot-in`, `.docs-foot-link`, `.docs-foot-prev`, `.docs-foot-next`, `.docs-foot-dir`, `.docs-foot-title`, body class `docs-shelled`, root class `docs-shelled`.
- Produces JS contract: `docs-shell.js` is a self-invoking script; it injects nothing when `document.querySelector('[data-docs-shell]')` already exists, but always adds the two `docs-shelled` classes.

- [ ] **Step 1: Write `docs-shell.css`**

Tokens on `:root`: `--docs-shell-h: 44px; --docs-shell-bg: #f8f9fb; --docs-shell-line: #e3e7ee; --docs-shell-ink: #17202c; --docs-shell-muted: #5c6676; --docs-shell-hover: #eef1f6; --docs-shell-violet: #6d4bd8;`. Font stack: `"IBM Plex Sans", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif`; mono bits `"IBM Plex Mono", ui-monospace, monospace`.

Structural rules that matter, exactly:

```css
html.docs-shelled { overflow-x: clip; scroll-padding-top: calc(env(safe-area-inset-top, 0px) + var(--docs-shell-h) + 8px); }
body.docs-shelled { overflow-x: clip; }
.docs-shell { width: 100vw; margin-left: calc(50% - 50vw); background: var(--docs-shell-bg);
  border-bottom: 1px solid var(--docs-shell-line); height: var(--docs-shell-h); }
@media (min-width: 760px) { .docs-shell { position: sticky; top: 0; z-index: 60; } }
.docs-shell-in { max-width: 1280px; margin: 0 auto; height: 100%; display: flex; align-items: center;
  gap: 10px; padding: 0 max(16px, env(safe-area-inset-left, 0px)); }
/* page chrome offset — must out-specify the pages' own .bar rule */
@media (min-width: 760px) { body.docs-shelled .bar { top: var(--docs-shell-h); } }
@media (min-width: 760px) and (max-width: 900px) { body.docs-shelled .side { top: calc(var(--docs-shell-h) + var(--bar-h)); } }
```

`.docs-mark` is a 26px rounded square, `background: linear-gradient(135deg, #8b5cf6, #3ecf8e 55%, #d97757)`, colour `#0b0f19`, 11px/700, letter-spacing `.02em`, content `WJ`. `.docs-menu-panel` is an absolutely positioned white card (`background:#fff; border:1px solid var(--docs-shell-line); border-radius:10px; box-shadow:0 12px 32px rgba(16,22,38,.14)`), hidden unless `details[open]`, `min-width: 320px`, `max-width: calc(100vw - 32px)`, `z-index: 70`; each `.docs-menu-link` shows title (13px/600) over sub (11.5px mono, muted), with `[aria-current="page"]` marked by `border-left: 2px solid var(--docs-shell-violet)` and a `docs-shell-hover` background.
`.docs-foot` mirrors the shell's full-bleed width, `margin-top: 48px; padding: 18px 0 36px; border-top: 1px solid var(--docs-shell-line)`; `.docs-foot-in` is the same 1280px centred flex row with `justify-content: space-between` and `gap: 12px`, stacking to a column at ≤700px. `.docs-home` and `.docs-foot-link` are 13px, `color: var(--docs-shell-ink)`, underline on hover in `--docs-shell-violet`; `:focus-visible` outline `2px solid var(--docs-shell-violet)` with `outline-offset: 2px` on every interactive element.
At ≤700px hide `.docs-kicker` and `.docs-brand-text`, and let `.docs-home` collapse to its arrow.

- [ ] **Step 2: Write `docs-shell.js`**

```js
(function () {
  var DOCS = [
    { file: "frontend-animation-reference.html", en: "Frontend Animation Reference", zh: "前端动画参考" },
    { file: "llm-workflow.html", en: "LLM Workflow Handbook", zh: "LLM 工作流手册" },
    { file: "rag-pipelines-animation.html", en: "RAG Pipelines", zh: "RAG 流水线 (动画)" },
    { file: "genai-handbook.html", en: "GenAI Multimedia Handbook", zh: "GenAI 多媒体手册" }
  ];
  var HOME = "/";
  // current file from location.pathname; "" and "index.html" both mean no current document
})();
```

Behaviour: if `[data-docs-shell]` is absent, prepend the shell markup to `document.body` and append the footer beside it; always add `docs-shelled` to `document.documentElement` and `document.body`. The current document gets `aria-current="page"` and its menu entry is rendered first is **not** allowed — order stays as declared. Footer: previous entry omitted on the first document, next omitted on the last, and `index.html` is the "All documents · 全部文档" target. Menu closes on `Escape` and on outside click (a single `document` `click` listener that closes any open `details` not containing the target). Markup strings are static — no user input, so `innerHTML` is fine.

- [ ] **Step 3: Wire `rag-pipelines-animation.html`**

Add `<link rel="stylesheet" href="docs-shell.css">` in `<head>` after the Google Fonts link (line 8), and `<script src="docs-shell.js"></script>` immediately before `</body>`.

- [ ] **Step 4: Verify in the browser**

```bash
python3 -m http.server 4321 --directory client/public   # background
chrome-devtools-axi open http://localhost:4321/docs/rag-pipelines-animation.html
chrome-devtools-axi eval 'JSON.stringify({shell:!!document.querySelector(".docs-shell"),links:[...document.querySelectorAll(".docs-menu-link")].map(a=>a.getAttribute("href")),cur:document.querySelector("[aria-current=page]")?.getAttribute("href"),home:document.querySelector(".docs-brand").getAttribute("href"),overflow:document.documentElement.scrollWidth<=window.innerWidth,footPrev:!!document.querySelector(".docs-foot-prev"),footNext:!!document.querySelector(".docs-foot-next")})'
```

Expected: `shell:true`, four `links` in declared order, `cur:"rag-pipelines-animation.html"`, `home:"/"`, `overflow:true`, `footPrev:true`, `footNext:true`.

- [ ] **Step 5: Screenshot and eyeball**

```bash
chrome-devtools-axi resize 1440 900 && chrome-devtools-axi screenshot /private/var/folders/72/vj88fhds6r10s5ns9mbww4cc0000gn/T/opencode/rag-1440.png
chrome-devtools-axi resize 390 844 && chrome-devtools-axi screenshot /private/var/folders/72/vj88fhds6r10s5ns9mbww4cc0000gn/T/opencode/rag-390.png
```

Expected: bar sits above the diagram, nothing cropped, menu opens over content when clicked, no horizontal scrollbar at 390px.

- [ ] **Step 6: Commit**

```bash
git add client/public/docs/docs-shell.css client/public/docs/docs-shell.js client/public/docs/rag-pipelines-animation.html
git commit -m "feat(docs): add shared docs shell and wire up RAG page"
```

---

### Task 2: The two sticky-bar pages

**Files:**
- Modify: `client/public/docs/genai-handbook.html`
- Modify: `client/public/docs/llm-workflow.html`

**Interfaces:**
- Consumes: `docs-shell.css`, `docs-shell.js` and the `.docs-shelled .bar` offset from Task 1.

- [ ] **Step 1: Wire `genai-handbook.html`**

Add the `<link>` right after the Google Fonts stylesheet (line 10) and the `<script>` just before the closing `</body>` (line 458).

- [ ] **Step 2: Verify genai offsets**

```bash
chrome-devtools-axi open http://localhost:4321/docs/genai-handbook.html
chrome-devtools-axi eval 'JSON.stringify({barTop:getComputedStyle(document.querySelector(".bar")).top,overflow:document.documentElement.scrollWidth<=window.innerWidth,shellH:document.querySelector(".docs-shell").getBoundingClientRect().height})'
```

Expected: `barTop:"44px"`, `overflow:true`, `shellH` between 43 and 45.

- [ ] **Step 3: Check the scrolled state and the drawer**

Scroll 600px, then assert the two bars do not overlap and the drawer starts below the shell:

```bash
chrome-devtools-axi scroll down
chrome-devtools-axi eval 'JSON.stringify({shellBottom:document.querySelector(".docs-shell").getBoundingClientRect().bottom,barTop:document.querySelector(".bar").getBoundingClientRect().top})'
```

Expected: `barTop` greater than or equal to `shellBottom`. Then at 390px, open the drawer (`document.getElementById("side").classList.add("open")`) and assert `document.querySelector(".side").getBoundingClientRect().top >= document.querySelector(".docs-shell").getBoundingClientRect().bottom`.

- [ ] **Step 4: Wire `llm-workflow.html` and spot-check**

The whole document head is on line 1: replace `</style></head><body>` with `</style><link rel="stylesheet" href="docs-shell.css"></head><body>`, and replace the final `</body></html>` with `<script src="docs-shell.js"></script></body></html>`. Re-run the Step 2 assertions against `http://localhost:4321/docs/llm-workflow.html`. Expected: same values, and the search box, chapter nav and rendered markdown still work.

- [ ] **Step 5: Commit**

```bash
git add client/public/docs/genai-handbook.html client/public/docs/llm-workflow.html
git commit -m "feat(docs): add docs shell to GenAI and LLM handbooks"
```

---

### Task 3: The reference page, flipped to light

**Files:**
- Modify: `client/public/docs/frontend-animation-reference.html`

**Interfaces:**
- Consumes: `docs-shell.css`, `docs-shell.js`.

- [ ] **Step 1: Wire the page**

Add the `<link>` after `<title>` in `<head>` and the `<script>` before `</body>`.

- [ ] **Step 2: Write the light override block**

Append a `<style>` block to `<head>` (after the existing one) starting with the comment `/* light theme (docs shell) */`, overriding only values — no selector is added to the markup:

- `:root` → `--bg:#f7f8fa; --bg2:#f1f2f6; --bg3:#e9ebf1; --surface:#ffffff; --surface2:#f4f5f9; --border:rgba(20,25,40,.10); --border2:rgba(20,25,40,.18); --text:#151821; --text2:#4c5464; --text3:#767e8f; --accent:#6a52e8; --accent2:#5a41d0;`
- `.doc-header h1` gradient → `linear-gradient(135deg,#151821 0%,#3b2f8f 55%,#6a52e8 100%)`
- Accent text that was pastel-on-dark, each colour at least 4.5:1 on `#ffffff`:
  `.badge-purple`/`.callout-purple` `#5b46c9`, `.badge-green`/`.tag-easy`/`.tag-gsap` `#0e7a52`, `.badge-amber`/`.tag-medium` `#8a5a05`, `.badge-teal`/`.tag-perf` `#0b6d80`, `.callout-info`/`.tag-react` `#1d4ed8`, `.callout-warn` `#7d5205`, `.callout-tip` `#0e6f4b`, `.callout-danger`/`.tag-hard`/`.dont-box h4` `#b3261e`, `.tag-css` `#a02a55`, `.tag-new` `#5b46c9`, `.do-box h4` `#0e7a52`; keep each rule's existing `border-color`/`background` shape but lower the tint alpha to `.07`–`.14`.
- `.code-block` and `pre` keep their dark surface (intentional contrast), so leave those colours alone.

- [ ] **Step 3: Verify nothing reads as dark-page leftovers**

```bash
chrome-devtools-axi open http://localhost:4321/docs/frontend-animation-reference.html
chrome-devtools-axi eval 'JSON.stringify({bodyBg:getComputedStyle(document.body).backgroundColor,bodyInk:getComputedStyle(document.body).color,h1Fill:getComputedStyle(document.querySelector(".doc-header h1")).webkitTextFillColor,callout:getComputedStyle(document.querySelector(".callout-tip")).color,tag:getComputedStyle(document.querySelector(".tag-easy")).color,overflow:document.documentElement.scrollWidth<=window.innerWidth})'
```

Expected: light `bodyBg`, dark `bodyInk`, `h1Fill` not `rgba(0, 0, 0, 0)` (the gradient still paints), `callout:rgb(14, 111, 75)`, `tag:rgb(14, 122, 82)`, `overflow:true`.

- [ ] **Step 4: Screenshot desktop and phone**

Same two `resize`/`screenshot` calls as Task 1 against this page. Expected: white paper, dark text, dark code cards, no washed-out text in badges/callouts, gradient heading visible.

- [ ] **Step 5: Commit**

```bash
git add client/public/docs/frontend-animation-reference.html
git commit -m "feat(docs): wire up reference page and convert it to the light theme"
```

---

### Task 4: The `/docs/` index page

**Files:**
- Create: `client/public/docs/index.html`

**Interfaces:**
- Consumes: `.docs-shell`, `.docs-foot` class contract and the tokens from Task 1.

- [ ] **Step 1: Write `index.html`**

Static markup: `<html lang="en">`, `<link rel="stylesheet" href="docs-shell.css">`, `<body class="docs-shelled">` (plus `docs-shelled` on `<html>`), the shell bar written out by hand with no entry marked `aria-current`, then `<main class="docs-index">`: `<h1>Documents · 文档</h1>`, a one-line deck, and four `<a class="docs-card">` cards in the fixed document order — each with the English title, the Chinese title as a subtitle, one sentence of description, and a language chip (`EN` / `中文`). The GenAI one-liner is "Audio, image, video and animation pipelines with generative AI, from prompt to deployment."; the RAG one-liner is "Animated walkthrough of RAG offline indexing and online retrieval."; the LLM one is "RAG, LoRA, SFT/RL and LLM-wiki workflows."; the frontend one is "CSS, Motion and GSAP patterns, component libraries and typography."
- Page-level `<style>`: `.docs-index` max-width `1000px` with `margin: 0 auto; padding: 48px 24px 0`, `.docs-card` grid `repeat(auto-fit, minmax(260px, 1fr))` at ≥700px with 16px gap, white cards on `--docs-shell-line` borders, radius `12px`, hover lift, 13px mono language chip. No script tag on this page.

- [ ] **Step 2: Verify the directory resolves and the cards work**

```bash
chrome-devtools-axi open http://localhost:4321/docs/
chrome-devtools-axi eval 'JSON.stringify({cards:[...document.querySelectorAll(".docs-card")].map(a=>a.getAttribute("href")),home:document.querySelector(".docs-brand").getAttribute("href"),overflow:document.documentElement.scrollWidth<=window.innerWidth})'
```

Expected: `/docs/` serves the page (no 404), `cards` equals the four filenames in order, `home:"/"`, `overflow:true`.

- [ ] **Step 3: Screenshot**

`resize 1440 900` then `390 844`, screenshotting both. Expected: two columns on desktop, one on phone, no clipped text.

- [ ] **Step 4: Commit**

```bash
git add client/public/docs/index.html
git commit -m "feat(docs): add documents index page"
```

---

### Task 5: Whole-set sweep

**Files:**
- Modify: none expected; fix regressions found here.

- [ ] **Step 1: Walk every page and click through**

For each of the five URLs (`/docs/`, the four documents): assert the shell exists, the menu has four links in order, `aria-current` matches the open document (none on the index), the footer's prev/next hrefs are the correct neighbours, `overflow:true` at `1440x900` and `390x844`. Then activate `.docs-brand` and confirm `location.pathname === "/"`.

- [ ] **Step 2: Keyboard pass**

On one page: `Tab` to the menu summary, `Enter` to open, `Escape` to close, and confirm focus stays visible. Expected: the panel opens and closes, focus is never lost.

- [ ] **Step 3: Build and confirm the files ship**

```bash
pnpm run build && ls -l dist/public/docs/
```

Expected: build succeeds and `docs-shell.css`, `docs-shell.js`, `index.html` and all four documents exist in `dist/public/docs/`.

- [ ] **Step 4: Commit any fixes, then report**

List the five URLs checked with the size at which each was checked.
