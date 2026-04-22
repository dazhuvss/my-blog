/* global hexo */

const PENCIL_GLOBAL_STYLE = `<link id="pencil-global-font" rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@500;600&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style id="pencil-global-style">
  :root {
    --p-bg: #f5f7fa;
    --p-card: #ffffff;
    --p-border: #e2e8f0;
    --p-hero: #eaf1f8;
    --p-text: #0f172a;
    --p-muted: #475569;
    --p-link: #2563eb;
  }

  html,
  body {
    min-height: 100%;
  }

  body.pencil-global {
    background: var(--p-bg);
    color: var(--p-text);
    font-family: 'Geist', sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  body.pencil-global .header-inner {
    height: auto !important;
  }

  body.pencil-global #navbar {
    background: #fff !important;
    border-bottom: 1px solid var(--p-border);
    box-shadow: none !important;
    min-height: 72px;
  }

  body.pencil-global #navbar .container {
    max-width: 1440px;
    padding-left: 40px;
    padding-right: 40px;
  }

  body.pencil-global .navbar-brand strong {
    color: var(--p-text);
    font-family: 'IBM Plex Mono', monospace;
    font-size: 28px;
    font-weight: 500;
  }

  body.pencil-global #navbar .nav-link {
    color: #334155 !important;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 14px;
  }

  body.pencil-global #navbar .nav-link i {
    display: none;
  }

  body.pencil-global main {
    padding-top: 72px;
    flex: 1 0 auto;
  }

  body.pencil-global footer {
    margin-top: auto;
  }

  body.pencil-global:not(.pencil-home) #banner {
    min-height: 200px;
    background: var(--p-hero) !important;
    border-bottom: 1px solid #d7e1ec;
  }

  body.pencil-global:not(.pencil-home) #banner .mask {
    background: transparent !important;
  }

  body.pencil-global:not(.pencil-home) #banner .banner-text .h2,
  body.pencil-global:not(.pencil-home) #banner .banner-text .h1 {
    color: var(--p-text);
    font-family: 'Geist Mono', monospace;
    font-weight: 500;
  }

  body.pencil-global #board,
  body.pencil-global #board-ctn #board {
    margin-top: 0 !important;
    background: transparent !important;
    box-shadow: none !important;
    border-radius: 0 !important;
  }

  body.pencil-global #board > .container,
  body.pencil-global #board-ctn > #board > .container {
    max-width: 1440px;
    padding-left: 24px;
    padding-right: 24px;
  }

  body.pencil-global:not(.pencil-home) .index-card,
  body.pencil-global .post-content,
  body.pencil-global .archive:not(.archive-collapse) .post-item,
  body.pencil-global .category-list .category-list-item,
  body.pencil-global .tagcloud a,
  body.pencil-global .links-content .card,
  body.pencil-global .note {
    background: var(--p-card);
    border: 1px solid var(--p-border) !important;
    border-radius: 0;
    box-shadow: none !important;
  }

  body.pencil-global .post-content {
    padding: 28px 30px;
  }

  body.pencil-global .category-list .category-list-item,
  body.pencil-global .archive .post-item {
    padding: 12px 14px;
    margin-bottom: 10px;
  }

  body.pencil-global .tagcloud a {
    color: #334155 !important;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 13px !important;
    padding: 6px 10px;
    margin: 6px 8px 0 0 !important;
    display: inline-block;
  }

  body.pencil-global .archive .post-item a,
  body.pencil-global .category-list .category-list-link,
  body.pencil-global .post-content a,
  body.pencil-global .index-header a {
    color: var(--p-text);
  }

  body.pencil-global .post-content a:hover,
  body.pencil-global .index-header a:hover,
  body.pencil-global .archive .post-item a:hover,
  body.pencil-global .category-list .category-list-link:hover {
    color: var(--p-link);
  }

  body.pencil-global .markdown-body h1,
  body.pencil-global .markdown-body h2,
  body.pencil-global .markdown-body h3,
  body.pencil-global .post-content h1,
  body.pencil-global .post-content h2,
  body.pencil-global .post-content h3 {
    color: var(--p-text);
    font-family: 'Geist Mono', monospace;
    font-weight: 500;
  }

  body.pencil-global .markdown-body,
  body.pencil-global .post-content,
  body.pencil-global .index-excerpt {
    color: var(--p-muted);
    font-family: 'Geist', sans-serif;
  }

  body.pencil-global .post-metas,
  body.pencil-global .post-meta,
  body.pencil-global .archive .year,
  body.pencil-global .category-list-count {
    color: #64748b !important;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
  }

  body.pencil-global .page-link,
  body.pencil-global .pagination .page-number,
  body.pencil-global .pagination .extend {
    border: 1px solid var(--p-border);
    background: #fff;
    color: #334155;
    border-radius: 0;
  }

  body.pencil-global .pagination .current {
    background: #eaf1f8;
    color: var(--p-text);
  }

  body.pencil-global footer,
  body.pencil-global .footer-content {
    border-top: 1px solid var(--p-border);
    background: #fff;
  }

  body.pencil-global .footer-content {
    color: #64748b;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 13px;
  }

  body.pencil-global .footer-content a {
    color: #334155;
  }

  @media (max-width: 991px) {
    body.pencil-global #navbar .container {
      padding-left: 20px;
      padding-right: 20px;
    }

    body.pencil-global #board > .container,
    body.pencil-global #board-ctn > #board > .container {
      padding-left: 14px;
      padding-right: 14px;
    }

    body.pencil-global:not(.pencil-home) #banner {
      min-height: 150px;
    }
  }
</style>`;

const PENCIL_GLOBAL_SCRIPT = `<script id="pencil-global-script">(function(){
  if (document.body) {
    document.body.classList.add('pencil-global');
  }
})();</script>`;

hexo.extend.filter.register('after_render:html', function (html) {
  if (typeof html !== 'string' || !html.length) return html;

  let output = html;

  if (!output.includes('id="pencil-global-style"')) {
    output = output.replace(/<\/head>/i, `${PENCIL_GLOBAL_STYLE}\n</head>`);
  }

  if (!output.includes('id="pencil-global-script"')) {
    output = output.replace(/<\/body>/i, `${PENCIL_GLOBAL_SCRIPT}\n</body>`);
  }

  return output;
});
