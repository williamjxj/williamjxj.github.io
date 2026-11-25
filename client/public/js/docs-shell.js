/* Docs shell — injects the shared bar and footer into every document in /docs/.
   DOCS is the single source of truth for order, filenames and titles: it drives
   the menu and prev/next footer on each long-form HTML document. */
(function () {
  var DOCS = [
    { file: "frontend-animation-reference.html", en: "Frontend Animation Reference", zh: "前端动画参考" },
    { file: "llm-workflow.html", en: "LLM Workflow Handbook", zh: "LLM 工作流手册" },
    { file: "llm-workflow-en.html", en: "LLM Workflow Handbook (English)", zh: "LLM 工作流手册（英文版）" },
    { file: "rag-pipelines-animation.html", en: "RAG Pipelines", zh: "RAG 流水线 (动画)" },
    { file: "agenticap-architecture-diagrams.html", en: "AgenticAP Architecture Diagrams", zh: "AgenticAP 动态架构图集" },
    { file: "agenticomni-architecture.html", en: "AgenticOmni Architecture Diagrams", zh: "AgenticOmni 动态架构图集" },
    { file: "lianhuanai-architecture.html", en: "LianHuanAI Architecture Diagrams", zh: "LianHuanAI 动态架构图集" },
    { file: "wenyan2video-architecture.html", en: "wenyan2video Architecture Diagrams", zh: "wenyan2video 动态架构图集" },
    { file: "jinyong-finetune-qlora-architecture.html", en: "Jin Yong QLoRA Architecture Diagrams", zh: "Jin Yong QLoRA 动态架构图集" },
    { file: "wuxia-jiangyunxing-architecture.html", en: "Wuxia Jiangyunxing Architecture Diagrams", zh: "Wuxia Jiangyunxing 动态架构图集" },
    { file: "hairflow-architecture.html", en: "hairflow Architecture Diagrams", zh: "hairflow 动态架构图集" },
    { file: "yuan-kuocheng-architecture.html", en: "Yuan Kuocheng GPT-SoVITS Diagrams", zh: "袁阔成 GPT-SoVITS 动态图集" },
    { file: "everheart-architecture.html", en: "Everheart Architecture Diagrams", zh: "Everheart 动态架构图集" },
    { file: "nsfw-app-architecture.html", en: "RunningHub NSFW Generator Workflows", zh: "RunningHub NSFW Generator 动态工作流图集" },
    { file: "genai-handbook.html", en: "GenAI Multimedia Handbook", zh: "GenAI 多媒体手册" },
    { file: "genai-handbook-en.html", en: "GenAI Multimedia Handbook (English)", zh: "GenAI 多媒体手册（英文版）" }
  ];
  var HOME = "/";

  var file = (window.location.pathname.split("/").pop() || "").toLowerCase();
  var current = null;
  for (var i = 0; i < DOCS.length; i++) {
    if (DOCS[i].file === file) current = DOCS[i];
  }
  var index = current ? DOCS.indexOf(current) : -1;

  document.documentElement.classList.add("docs-shelled");
  document.body.classList.add("docs-shelled");
  bindMenu();

  var existing = document.querySelector("[data-docs-shell]");
  if (existing) {
    var panel = existing.querySelector(".docs-menu-panel");
    if (panel && !panel.children.length) panel.innerHTML = DOCS.map(menuItem).join("");
    return;
  }

  function esc(value) {
    return String(value).replace(/[&<>"]/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch];
    });
  }

  function menuItem(doc) {
    return '<a class="docs-menu-link" href="' + doc.file + '"' +
      (doc === current ? ' aria-current="page"' : "") + ">" +
      '<span class="docs-menu-title">' + esc(doc.en) + "</span>" +
      '<span class="docs-menu-sub">' + esc(doc.zh) + "</span>" +
      "</a>";
  }

  function footLink(doc, direction) {
    return '<a class="docs-foot-link docs-foot-' + direction + '" href="' + doc.file + '">' +
      '<span class="docs-foot-dir">' + (direction === "prev" ? "← Previous" : "Next →") + "</span>" +
      '<span class="docs-foot-title">' + esc(doc.en) + "</span>" +
      "</a>";
  }

  var shell = document.createElement("div");
  shell.className = "docs-shell";
  shell.setAttribute("data-docs-shell", "");
  shell.innerHTML =
    '<div class="docs-shell-in">' +
      '<a class="docs-brand" href="' + HOME + '">' +
        '<span class="docs-mark" aria-hidden="true">WJ</span>' +
        '<span class="docs-brand-text">William Jiang</span>' +
      "</a>" +
      '<span class="docs-kicker">Docs · 文档</span>' +
      '<details class="docs-menu">' +
        '<summary class="docs-menu-btn">' +
          '<span class="docs-menu-btn-long">All documents · 全部文档</span>' +
          '<span class="docs-menu-btn-short">Docs · 文档</span>' +
        "</summary>" +
        '<nav class="docs-menu-panel" aria-label="Documents · 文档">' +
          DOCS.map(menuItem).join("") +
        "</nav>" +
      "</details>" +
      '<a class="docs-home" href="' + HOME + '">' +
        '<span aria-hidden="true">←</span>' +
        '<span class="docs-home-long">Portfolio · 返回作品集</span>' +
        '<span class="docs-home-short">Home · 主页</span>' +
      "</a>" +
    "</div>";
  document.body.insertBefore(shell, document.body.firstChild);

  var foot = document.createElement("nav");
  foot.className = "docs-foot";
  foot.setAttribute("aria-label", "Document navigation · 文档导航");
  foot.innerHTML =
    '<div class="docs-foot-in">' +
      (index > 0 ? footLink(DOCS[index - 1], "prev") : "<span></span>") +
      '<a class="docs-foot-link docs-foot-all" href="index.html">All documents · 全部文档</a>' +
      (index > -1 && index < DOCS.length - 1 ? footLink(DOCS[index + 1], "next") : "<span></span>") +
    "</div>";
  document.body.appendChild(foot);

  function bindMenu() {
    document.addEventListener("click", function (event) {
      var open = document.querySelectorAll("details.docs-menu[open]");
      for (var i = 0; i < open.length; i++) {
        if (!open[i].contains(event.target)) open[i].removeAttribute("open");
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;
      var open = document.querySelector("details.docs-menu[open]");
      if (!open) return;
      open.removeAttribute("open");
      var summary = open.querySelector("summary");
      if (summary) summary.focus();
    });
  }
})();
