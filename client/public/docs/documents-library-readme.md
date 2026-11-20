# Document library integration

The `/docs/` landing page now uses a shared searchable document library with topic and content-language filters, sorting, file sizes, modification dates, loading/error states, and six-result pagination. It includes both English handbooks. The interface supports English and Chinese, independently of the document language filter.

## Homepage integration is staged

The session could write only under `client/public/docs`, so the homepage replacement and build-script edits are provided in `homepage-documents.patch`. They have not been applied to the homepage source.

From the repository root:

```bash
git apply --check client/public/docs/homepage-documents.patch
git apply client/public/docs/homepage-documents.patch
pnpm check
pnpm build
```

The patch replaces the six hard-coded cards in `client/src/components/sections/Documents.tsx` with the shared library. It also refreshes the catalog before `dev` and `build` and adds a `docs:catalog` script. The custom element uses scoped styles and inherits the portfolio's color variables. No new package is needed.

## Adding documents

1. Add a public `.html`, `.pdf`, `.docx`, `.md`, `.txt`, `.pptx`, or `.xlsx` file directly to this directory.
2. Optionally add its bilingual title/description, topic, language, and tags to `document-metadata.json`. Supported topics: `ai`, `ml`, `frontend`, `resources`; languages: `en`, `zh`, `und`.
3. Run the catalog generator. After applying the integration patch, development startup and builds also run it. If adding files while the development server is already running, rerun it manually.

```bash
node client/public/docs/generate-docs-catalog.mjs
node --test client/public/docs/documents-library.test.mjs
```

Unknown files receive a filename-derived title, an unspecified-language badge, and the Resources topic. Metadata alone does not list a missing file. Discovery is limited to top-level supported files; scripts, styles, JSON, patches, this guide, and `index.html` are excluded. Review the generated catalog before publishing; this is a public collection.

The displayed date is the filesystem modification time, not an editorial review date; a fresh checkout may change it. Static hosting cannot enumerate directories, so the generated catalog must be refreshed after adding/removing documents. Search covers titles, descriptions, filenames, tags, and topic labels, not the full contents of each document.

## Validation performed

- Shared JavaScript syntax check and Node tests for catalog integrity, real file links, bilingual and combined filtering, sorting, empty results, a 101-file collection, and unsafe metadata rejection.
- TypeScript check against a virtual application of the staged React component.
- Patch application dry run against the current repository files.
- A local preview server could not be started under this session's sandbox permissions; visual browser verification and a production build remain to be run after integration.
