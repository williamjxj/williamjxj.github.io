/** Run from any directory: node scripts/generate-docs-catalog.mjs
 * Re-run before deploying additions/removals. Static hosting cannot list directories.
 * Optional curated titles, topics and language live in document-metadata.json.
 */
import {readdir, readFile, stat, writeFile} from 'node:fs/promises';
import {dirname, join, extname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../client/public/docs');
const metadata = JSON.parse(await readFile(join(root, 'document-metadata.json'), 'utf8'));
const allowed = new Set(['.html','.pdf','.docx','.md','.txt','.pptx','.xlsx']);
const ignored = new Set(['index.html']);
const documents = [];
for (const entry of await readdir(root, {withFileTypes:true})) {
  if (!entry.isFile() || entry.name.startsWith('.') || ignored.has(entry.name)) continue;
  const extension = extname(entry.name).toLowerCase();
  if (!allowed.has(extension)) continue;
  const file = entry.name;
  const info = await stat(join(root,file));
  const custom = metadata[file] || {};
  const fallback = file.slice(0,-extension.length).replace(/[-_]+/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
  documents.push({id:file, file, title:custom.title || {en:fallback,zh:fallback},
    description:custom.description || {en:'Reference document. Open to explore.',zh:'参考文档，打开查看详情。'},
    topic:custom.topic || 'resources', language:custom.language || 'und', tags:custom.tags || [],
    format:extension.slice(1).toUpperCase(), bytes:info.size, updated:info.mtime.toISOString()});
}
documents.sort((a,b)=>a.file.localeCompare(b.file));
const result = {version:1,documents};
await writeFile(join(root,'docs-catalog.json'),JSON.stringify(result,null,2)+'\n');
console.log(`Catalog updated: ${documents.length} documents.`);
