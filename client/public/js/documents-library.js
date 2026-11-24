const BASE = new URL('../docs/', import.meta.url);
const PAGE_SIZE = 6;
const TOPICS = ['all', 'git-apps', 'ai', 'ml', 'frontend', 'resources'];
const COPY = {
  en: {eyebrow:'THE REFERENCE SHELF',title:'Explore the collection',intro:'Handbooks, interactive explainers and technical notes.',files:'documents',topics:'Browse by topic',all:'All documents','git-apps':'Git Apps',ai:'AI engineering',ml:'Machine learning',frontend:'Frontend craft',resources:'Resources',search:'Search titles, topics or keywords…',searchLabel:'Search documents',language:'Document language',any:'All languages',en:'English',zh:'中文',und:'Unspecified',sortLabel:'Sort documents',recent:'Recently modified',az:'Title: A–Z',format:'File type',results:'results',reset:'Clear filters',open:'Read',download:'Download',empty:'No documents found',emptyBody:'Try another keyword or clear your filters.',previous:'Previous',next:'Next',page:'Page',of:'of',showing:'Showing',loading:'Loading the collection…',error:'The collection could not be loaded.',retry:'Try again',modified:'Modified',languageNote:'Document languages are shown on each file.'},
  zh: {eyebrow:'技术资料库',title:'探索文档收藏',intro:'手册、交互演示与技术笔记，持续更新。',files:'份文档',topics:'按主题浏览',all:'全部文档','git-apps':'Git 项目',ai:'AI 工程',ml:'机器学习',frontend:'前端技术',resources:'其他资料',search:'搜索标题、主题或关键词…',searchLabel:'搜索文档',language:'文档语言',any:'全部语言',en:'English',zh:'中文',und:'未指定',sortLabel:'文档排序',recent:'最近修改',az:'标题排序',format:'文件类型',results:'个结果',reset:'清除筛选',open:'阅读',download:'下载',empty:'没有找到相关文档',emptyBody:'试试其他关键词，或清除筛选条件。',previous:'上一页',next:'下一页',page:'第',of:'/',showing:'显示',loading:'正在加载文档…',error:'文档列表加载失败。',retry:'重试',modified:'修改于',languageNote:'每份文档均标注其内容语言。'}
};

export function selectDocuments(documents, state, locale = 'en') {
  const copy = COPY[locale] || COPY.en;
  const terms = state.query.trim().toLocaleLowerCase(locale).split(/\s+/).filter(Boolean);
  const result = documents.filter(doc => {
    if (state.topic !== 'all' && doc.topic !== state.topic) return false;
    if (state.language !== 'all' && doc.language !== state.language) return false;
    const text = [doc.title.en,doc.title.zh,doc.description.en,doc.description.zh,doc.file,doc.format,copy[doc.topic],...doc.tags].join(' ').toLocaleLowerCase(locale);
    return terms.every(term => text.includes(term));
  });
  return result.sort((a,b) => {
    if (state.sort === 'az') return (a.title[locale] || a.title.en).localeCompare(b.title[locale] || b.title.en,locale) || a.file.localeCompare(b.file);
    if (state.sort === 'format') return a.format.localeCompare(b.format) || a.file.localeCompare(b.file);
    return b.updated.localeCompare(a.updated) || a.file.localeCompare(b.file);
  });
}

export function validateCatalog(data) {
  if (data?.version !== 1 || !Array.isArray(data.documents)) throw new Error('Invalid catalog');
  const seen = new Set();
  for (const doc of data.documents) {
    if (!doc || typeof doc.file !== 'string' || doc.id !== doc.file || /[\\/\x00-\x1f]/.test(doc.file) || doc.file.startsWith('.') || !/\.(html|pdf|docx|md|txt|pptx|xlsx)$/i.test(doc.file) || seen.has(doc.id)) throw new Error('Invalid document');
    if (!TOPICS.slice(1).includes(doc.topic) || !['en','zh','und'].includes(doc.language) || !['HTML','PDF','DOCX','MD','TXT','PPTX','XLSX'].includes(doc.format) || !Number.isFinite(doc.bytes) || doc.bytes < 0 || !Number.isFinite(Date.parse(doc.updated))) throw new Error('Invalid metadata');
    for (const field of ['title','description']) if (!doc[field] || typeof doc[field].en !== 'string' || typeof doc[field].zh !== 'string') throw new Error('Invalid text');
    if (!Array.isArray(doc.tags) || doc.tags.some(tag=>typeof tag!=='string')) throw new Error('Invalid tags');
    seen.add(doc.id);
  }
  return data.documents;
}

function size(bytes) {return bytes >= 1048576 ? `${(bytes/1048576).toFixed(1)} MB` : `${Math.max(1,Math.round(bytes/1024))} KB`;}
function el(tag, className, text) {const node=document.createElement(tag);if(className)node.className=className;if(text!==undefined)node.textContent=text;return node;}
const arrow='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg>';
const download='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M5 17v4h14v-4"/></svg>';

if (typeof window !== 'undefined' && !customElements.get('wj-documents-library')) {
  customElements.define('wj-documents-library', class extends HTMLElement {
    static observedAttributes = ['lang'];
    constructor() {super();this.attachShadow({mode:'open'});this.documents=[];this.state={query:'',topic:'all',language:'all',sort:'recent',page:1};this.status='loading';}
    get locale() {return this.getAttribute('lang')==='zh'?'zh':'en';}
    connectedCallback() {this.renderShell();this.load();}
    disconnectedCallback() {this.controller?.abort();}
    attributeChangedCallback() {if(this.isConnected)this.renderShell();}
    async load() {
      this.controller?.abort();this.controller=new AbortController();this.status='loading';this.renderResults();
      try {
        const response=await fetch(new URL('docs-catalog.json',BASE),{signal:this.controller.signal});
        if(!response.ok)throw new Error('Catalog request failed');
        this.documents=validateCatalog(await response.json());this.status='ready';this.renderShell();
      } catch(error) {if(error.name!=='AbortError'){this.status='error';this.renderResults();}}
    }
    renderShell() {
      const c=COPY[this.locale];const root=this.shadowRoot;
      root.innerHTML=`<link rel="stylesheet" href="${new URL('../css/documents-library.css',BASE).href}"><div class="library">
        <div class="intro"><div><p class="eyebrow">${c.eyebrow}</p><h3>${c.title}</h3><p>${c.intro}</p></div><div class="total"><span id="total">—</span><small>${c.files}</small></div></div>
        <div class="workspace"><nav class="topics" aria-label="${c.topics}"><p class="rail-label">${c.topics}</p>${TOPICS.map(topic=>`<button class="topic" type="button" data-topic="${topic}" aria-pressed="${this.state.topic===topic}"><span>${c[topic]}</span><span data-count="${topic}">0</span></button>`).join('')}</nav>
        <div class="collection"><div class="tools"><label class="searchbox"><span class="sr-only">${c.searchLabel}</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg><input type="search" placeholder="${c.search}" autocomplete="off"></label>
        <label><span class="sr-only">${c.language}</span><select data-filter="language"><option value="all">${c.any}</option><option value="en">English</option><option value="zh">中文</option><option value="und">${c.und}</option></select></label>
        <label><span class="sr-only">${c.sortLabel}</span><select data-filter="sort"><option value="recent">${c.recent}</option><option value="az">${c.az}</option><option value="format">${c.format}</option></select></label></div>
        <div class="summary"><span id="result-count" role="status" aria-live="polite" aria-atomic="true"></span><button type="button" class="reset" data-reset hidden>${c.reset}</button></div>
        <div id="items" class="items"></div><div class="pager" hidden><span id="range"></span><div class="page-actions"><button type="button" data-page="-1">${c.previous}</button><span id="page-number"></span><button type="button" data-page="1">${c.next}</button></div></div>
        </div></div></div>`;
      root.querySelector('input').value=this.state.query;
      root.querySelector('[data-filter=language]').value=this.state.language;
      root.querySelector('[data-filter=sort]').value=this.state.sort;
      root.querySelector('input').addEventListener('input',event=>{this.state.query=event.target.value;this.state.page=1;this.renderResults();});
      root.querySelectorAll('select').forEach(select=>select.addEventListener('change',event=>{this.state[event.target.dataset.filter]=event.target.value;this.state.page=1;this.renderResults();}));
      root.querySelector('.library').addEventListener('click',event=>{
        const topic=event.target.closest('[data-topic]');if(topic){this.state.topic=topic.dataset.topic;this.state.page=1;this.renderResults();}
        const reset=event.target.closest('[data-reset]');if(reset){this.state={query:'',topic:'all',language:'all',sort:'recent',page:1};this.renderShell();this.shadowRoot.querySelector('input').focus();}
        const pager=event.target.closest('[data-page]');if(pager&&!pager.disabled){this.state.page+=Number(pager.dataset.page);this.renderResults();const first=this.shadowRoot.querySelector('.doc');if(first)first.focus({preventScroll:true});}
        if(event.target.closest('[data-retry]'))this.load();
      });
      this.renderResults();
    }
    renderResults() {
      const root=this.shadowRoot;if(!root.querySelector('#items'))return;
      const c=COPY[this.locale],items=root.querySelector('#items');items.replaceChildren();
      root.querySelector('#total').textContent=this.status==='ready'?this.documents.length:'—';
      root.querySelectorAll('[data-count]').forEach(node=>{node.textContent=this.documents.filter(doc=>node.dataset.count==='all'||doc.topic===node.dataset.count).length;});
      root.querySelectorAll('[data-topic]').forEach(node=>node.setAttribute('aria-pressed',String(node.dataset.topic===this.state.topic)));
      root.querySelector('.pager').hidden=true;
      root.querySelector('[data-reset]').hidden=!(this.state.query||this.state.topic!=='all'||this.state.language!=='all'||this.state.sort!=='recent');
      if(this.status!=='ready') {
        root.querySelector('#result-count').textContent=this.status==='loading'?c.loading:c.error;
        if(this.status==='error'){const retry=el('button','retry',c.retry);retry.type='button';retry.dataset.retry='';items.append(retry);}return;
      }
      const results=selectDocuments(this.documents,this.state,this.locale);
      const pages=Math.max(1,Math.ceil(results.length/PAGE_SIZE));this.state.page=Math.max(1,Math.min(pages,this.state.page));
      root.querySelector('#result-count').textContent=`${results.length} ${c.results} · ${c.languageNote}`;
      if(!results.length){const empty=el('div','empty');empty.append(el('h4','',c.empty),el('p','',c.emptyBody));const button=el('button','reset',c.reset);button.type='button';button.dataset.reset='';empty.append(button);items.append(empty);return;}
      const start=(this.state.page-1)*PAGE_SIZE;
      for(const doc of results.slice(start,start+PAGE_SIZE))items.append(this.documentRow(doc,c));
      if(results.length>PAGE_SIZE){root.querySelector('.pager').hidden=false;root.querySelector('#range').textContent=`${c.showing} ${start+1}–${Math.min(start+PAGE_SIZE,results.length)} / ${results.length}`;root.querySelector('#page-number').textContent=`${c.page} ${this.state.page} ${c.of} ${pages}`;root.querySelector('[data-page="-1"]').disabled=this.state.page===1;root.querySelector('[data-page="1"]').disabled=this.state.page===pages;}
    }
    documentRow(doc,c) {
      const isDownload=doc.format!=='HTML'&&doc.format!=='PDF';const a=el('a','doc');a.href=new URL(encodeURIComponent(doc.file),BASE).href;a.dataset.format=doc.format;
      if(isDownload)a.download=doc.file;else {a.target='_blank';a.rel='noopener noreferrer';}
      const icon=el('span','file-icon',doc.format);icon.setAttribute('aria-hidden','true');
      const body=el('div','doc-body'),title=el('h4','',doc.title[this.locale]||doc.title.en),description=el('p','description',doc.description[this.locale]||doc.description.en),meta=el('div','meta');
      const language=el('span','language',c[doc.language]);language.setAttribute('aria-label',`${c.language}: ${c[doc.language]}`);meta.append(language,el('span','',size(doc.bytes)));
      const date=el('time','',new Intl.DateTimeFormat(this.locale==='zh'?'zh-CN':'en-CA',{year:'numeric',month:'short',day:'numeric'}).format(new Date(doc.updated)));date.dateTime=doc.updated;date.title=c.modified;meta.append(date);
      for(const tag of doc.tags.slice(0,2))meta.append(el('span','tag',`· ${tag}`));body.append(title,description,meta);
      const action=el('span','action');action.append(el('span','action-label',isDownload?c.download:c.open));const svg=el('span');svg.innerHTML=isDownload?download:arrow;action.append(svg);a.append(icon,body,action);return a;
    }
  });
}
