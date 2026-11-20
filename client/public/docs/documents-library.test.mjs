import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import {selectDocuments,validateCatalog} from './documents-library.js';
const catalog=JSON.parse(await readFile(new URL('docs-catalog.json',import.meta.url),'utf8'));
const docs=validateCatalog(catalog);
const defaults={query:'',topic:'all',language:'all',sort:'recent'};
test('catalog links resolve to actual public documents',async()=>{
  for(const doc of docs)await access(new URL(encodeURIComponent(doc.file),import.meta.url));
  assert(docs.some(doc=>doc.file==='genai-handbook-en.html'));
  assert(docs.some(doc=>doc.file==='llm-workflow-en.html'));
});
test('combined search distinguishes English and Chinese editions',()=>{
  const result=selectDocuments(docs,{...defaults,query:'LLM LoRA',language:'en'});
  assert.deepEqual(result.map(doc=>doc.file),['llm-workflow-en.html']);
  assert(selectDocuments(docs,{...defaults,query:'前端'},'zh').some(doc=>doc.file==='frontend-animation-reference.html'));
});
test('topic, language, empty search and sorting behave independently',()=>{
  const result=selectDocuments(docs,{...defaults,topic:'ml',language:'zh'});
  assert.equal(result.length,0);
  assert.equal(selectDocuments(docs,{...defaults,query:'not-a-matching-term'}).length,0);
  const alphabetical=selectDocuments(docs,{...defaults,sort:'az'});
  assert.equal(alphabetical[0].title.en,'AutoDrive ML Training Details');
  assert.equal(selectDocuments(docs,defaults).length,docs.length);
});
test('large collections retain all results for pagination without mutating the catalog',()=>{
  const large=Array.from({length:101},(_,i)=>({...docs[0],id:`file-${i}.html`,file:`file-${i}.html`}));
  const original=large.map(doc=>doc.id);
  const results=selectDocuments(large,defaults);
  assert.equal(results.length,101);
  assert.equal(Math.ceil(results.length/6),17);
  assert.equal(results.slice(96,102).length,5);
  assert.deepEqual(large.map(doc=>doc.id),original);
});
test('unsafe paths, duplicates and malformed metadata fail closed',()=>{
  const invalid=[{...docs[0],id:'../bad.html',file:'../bad.html'},{...docs[0],updated:'invalid'},{...docs[0],title:null},{...docs[0],bytes:-1}];
  for(const doc of invalid)assert.throws(()=>validateCatalog({version:1,documents:[doc]}));
  assert.throws(()=>validateCatalog({version:1,documents:[docs[0],docs[0]]}));
});
