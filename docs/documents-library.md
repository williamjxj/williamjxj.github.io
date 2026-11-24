# Document library

The homepage `#documents` section and `/docs/` landing page share the searchable library in
`client/public/js/documents-library.js`. It provides topic and language filters, sorting, search,
and six-item pagination. Its scoped stylesheet is `client/public/css/documents-library.css`.
Topics include Git Apps (interactive project diagrams), AI engineering, machine learning,
frontend craft, and resources.

## Git Apps diagram collection

The **Git Apps / Git 项目** topic groups nine interactive, tabbed architecture and workflow
galleries. Each gallery opens from its document card and is also listed in the curated reader:

| Project | Diagram gallery | Repository |
| --- | --- | --- |
| AgenticAP | [Open diagrams](../client/public/docs/agenticap-architecture-diagrams.html) | [GitHub](https://github.com/williamjxj/AgenticAP) |
| AgenticOmni | [Open diagrams](../client/public/docs/agenticomni-architecture.html) | [GitHub](https://github.com/williamjxj/AgenticOmni) |
| LianHuanAI | [Open diagrams](../client/public/docs/lianhuanai-architecture.html) | [GitHub](https://github.com/williamjxj/LianHuanAI) |
| wenyan2video | [Open diagrams](../client/public/docs/wenyan2video-architecture.html) | [GitHub](https://github.com/williamjxj/wenyan2video) |
| Jin Yong QLoRA fine-tuning | [Open diagrams](../client/public/docs/jinyong-finetune-qlora-architecture.html) | [GitHub](https://github.com/jxjwilliam/jinyong-finetune-qlora) |
| Wuxia Jiangyunxing | [Open diagrams](../client/public/docs/wuxia-jiangyunxing-architecture.html) | [GitHub](https://github.com/jxjwilliam/wuxia-jiangyunxing) |
| hairflow | [Open diagrams](../client/public/docs/hairflow-architecture.html) | [GitHub](https://github.com/jxjwilliam/hairflow) |
| Yuan Kuocheng voice project | [Open diagrams](../client/public/docs/yuan-kuocheng-architecture.html) | [GitHub](https://github.com/jxjwilliam/yuan_kuocheng) |
| Everheart | [Open diagrams](../client/public/docs/everheart-architecture.html) | [GitHub](https://github.com/williamjxj/everheart) |

On `/docs/` and the homepage Documents section, select **Git Apps** in the topic filter to show
this collection. The shared bilingual metadata and generated catalog provide the titles, links,
and topic counts; keep the topic filter, metadata, catalog, and this list in sync when adding or
removing a gallery.

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
