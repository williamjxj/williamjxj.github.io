# Document library

The homepage `#documents` section and `/docs/` landing page share the searchable library in
`client/public/js/documents-library.js`. It provides topic and language filters, sorting, search,
and six-item pagination. Its scoped stylesheet is `client/public/css/documents-library.css`.

## Add a document

1. Add a supported `.html`, `.pdf`, `.docx`, `.md`, `.txt`, `.pptx`, or `.xlsx` file to
   `client/public/docs/`.
2. Optionally add bilingual title and description, topic, language, and tags to
   `client/public/docs/document-metadata.json`.
3. Run `pnpm docs:catalog` to regenerate `docs-catalog.json`.
4. For self-contained HTML documents in the curated reader sequence, update the `DOCS` array in
   `client/public/js/docs-shell.js` and add the shared shell references to that page.

The catalog is generated from top-level supported files. Search covers titles, descriptions,
filenames, tags, and topic labels; it does not search document contents. Displayed dates use file
modification times, so a fresh checkout can change them.

## Project commands

- `pnpm docs:catalog` regenerates the document catalog.
- `pnpm dev` refreshes the catalog before starting Vite.
- `pnpm build` refreshes the catalog before building the site.
- `node --test tests/documents-library.test.mjs` runs the catalog and library checks.
