/* global hexo */

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildSidebarHtml() {
  const posts = hexo.locals.get('posts').sort('-date').toArray();
  const recentPosts = posts.slice(0, 3);

  const recentList = recentPosts.map((post) => {
    const title = post.title && String(post.title).trim() ? post.title : '未命名文章';
    return `<li><a href="${hexo.config.root}${post.path}">${escapeHtml(title)}</a></li>`;
  }).join('');

  return `
    <aside class="pencil-sidebar">
      <section class="pencil-side-card pencil-profile-card">
        <img class="pencil-author-avatar" src="/img/avatar.jpg" alt="Yang avatar">
        <p class="pencil-card-kicker">PERSONAL PROFILE</p>
        <h3>Yang</h3>
        <p>一名持续学习中的开发者，正在把 Java 后端、AI Agent、算法复盘和项目踩坑记录，慢慢沉淀成清晰可复用的技术笔记。</p>
        <div class="pencil-profile-meta">
          <span>方向：后端 / Agent</span>
          <span>状态：持续更新中</span>
        </div>
        <div class="pencil-profile-actions">
          <a href="/about/">了解更多</a>
          <a href="https://github.com/dazhuvss" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="mailto:211138379@qq.com">Email</a>
        </div>
      </section>
      <section class="pencil-side-card">
        <h3>关注方向</h3>
        <p class="pencil-tag-text">Java 后端 · AI Agent · Redis · 算法 · 项目复盘</p>
      </section>
      <section class="pencil-side-card">
        <h3>最近文章</h3>
        <ul>${recentList}</ul>
      </section>
    </aside>
  `;
}

function buildFeaturedHtml() {
  const posts = hexo.locals.get('posts').sort('-date').toArray().slice(0, 3);

  const cards = posts.map((post) => {
    const title = post.title && String(post.title).trim() ? post.title : '未命名文章';
    const excerpt = post.excerpt
      ? String(post.excerpt).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
      : '';
    const fallback = post.content
      ? String(post.content).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
      : '';
    const summary = escapeHtml((excerpt || fallback || '记录一次学习、实践或排查过程。').slice(0, 46));

    return `
      <article class="pencil-feature-card">
        <h3><a href="${hexo.config.root}${post.path}">${escapeHtml(title)}</a></h3>
        <p>${summary}${summary.length >= 46 ? '...' : ''}</p>
        <a class="pencil-feature-link" href="${hexo.config.root}${post.path}">继续阅读 -></a>
      </article>
    `;
  }).join('');

  return `
    <section class="pencil-featured">
      <div class="pencil-featured-head">
        <p class="pencil-card-kicker">START HERE</p>
        <h2>推荐阅读</h2>
        <p>如果你是第一次来到这里，可以先从这几篇文章开始了解我最近在写什么。</p>
      </div>
      <div class="pencil-feature-grid">${cards}</div>
    </section>
  `;
}

function buildCategoryOverviewHtml() {
  const categories = [
    {
      title: '学习笔记',
      desc: '记录对后端、Agent、算法等知识点的理解与整理。',
      link: '/categories/学习笔记/',
      meta: '概念理解 / 方法沉淀'
    },
    {
      title: '技术实践',
      desc: '整理真实项目中的排查过程、实现细节和方案选择。',
      link: '/categories/技术实践/',
      meta: '问题定位 / 实战复盘'
    },
    {
      title: '项目复盘',
      desc: '后续会集中记录项目设计、踩坑经验和阶段性总结。',
      link: '/archives/',
      meta: '设计思路 / 经验总结'
    }
  ];

  const cards = categories.map((item) => `
    <article class="pencil-category-card">
      <h3><a href="${item.link}">${item.title}</a></h3>
      <p>${item.desc}</p>
      <span>${item.meta}</span>
    </article>
  `).join('');

  return `
    <section class="pencil-category-overview">
      <div class="pencil-section-head">
        <p class="pencil-card-kicker">CONTENT MAP</p>
        <h2>精选分类</h2>
        <p>如果你想按主题浏览，可以先从这几个内容方向进入。</p>
      </div>
      <div class="pencil-category-grid">${cards}</div>
    </section>
  `;
}

function buildNowLearningHtml() {
  const items = [
    'Redis 缓存与高并发场景下的问题处理',
    'ReAct Agent、工具调用与多轮任务执行',
    '算法高频题复盘与解题模板整理'
  ];

  const list = items.map((item) => `<li>${item}</li>`).join('');

  return `
    <section class="pencil-now-learning">
      <div class="pencil-section-head">
        <p class="pencil-card-kicker">NOW LEARNING</p>
        <h2>最近在学</h2>
        <p>这部分会跟着我的阶段重点变化，保持一个正在持续更新的状态。</p>
      </div>
      <ul class="pencil-now-list">${list}</ul>
    </section>
  `;
}

const PENCIL_STYLE = `<link id="pencil-home-font" rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@500;600&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style id="pencil-home-style">
  body.pencil-home {
    background: #f5f7fa;
    color: #0f172a;
  }

  body.pencil-home .header-inner {
    height: auto !important;
  }

  body.pencil-home #banner {
    display: none !important;
  }

  body.pencil-home #navbar {
    background: #fff !important;
    border-bottom: 1px solid #e2e8f0;
    box-shadow: none !important;
    min-height: 72px;
  }

  body.pencil-home #navbar .container {
    max-width: 1440px;
    padding-left: 40px;
    padding-right: 40px;
  }

  body.pencil-home .navbar-brand strong {
    color: #0f172a;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 28px;
    font-weight: 500;
  }

  body.pencil-home #navbar .nav-link {
    color: #334155 !important;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 14px;
  }

  body.pencil-home #navbar .nav-link i,
  body.pencil-home #mobile-grid-menu .mobile-grid-item i {
    display: none;
  }

  body.pencil-home #search-btn,
  body.pencil-home #color-toggle-btn,
  body.pencil-home #mobile-search-btn,
  body.pencil-home #mobile-color-toggle-btn {
    display: none !important;
  }

  body.pencil-home main {
    padding-top: 72px;
  }

  body.pencil-home #board {
    background: transparent !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    margin-top: 0 !important;
  }

  body.pencil-home #board > .container {
    max-width: 1440px;
    padding-left: 0;
    padding-right: 0;
  }

  body.pencil-home #board .container .row .col-12.col-md-10.m-auto {
    max-width: 100%;
    flex: 0 0 100%;
    padding-left: 0;
    padding-right: 0;
  }

  .pencil-home-wrap {
    width: 100%;
  }

  .pencil-hero {
    min-height: 300px;
    background: #eaf1f8;
    border: 1px solid #d7e1ec;
    padding: 52px 72px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 10px;
  }

  .pencil-hero-tag {
    color: #475569;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    letter-spacing: 1.4px;
    text-transform: uppercase;
  }

  .pencil-hero-title {
    color: #0f172a;
    font-family: 'Geist Mono', monospace;
    font-size: clamp(42px, 6.8vw, 72px);
    font-weight: 500;
    line-height: 1.06;
    margin: 0;
  }

  .pencil-hero-desc {
    color: #334155;
    font-family: 'Geist', sans-serif;
    font-size: 18px;
    line-height: 1.5;
    margin: 0;
    max-width: 760px;
  }

  .pencil-main {
    display: grid;
    grid-template-columns: 260px minmax(0, 1fr);
    column-gap: 36px;
    align-items: start;
    padding: 36px 30px 56px 20px;
  }

  .pencil-sidebar {
    width: 260px;
    max-width: 260px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    margin-left: -6px;
    position: sticky;
    top: 96px;
    align-self: start;
  }

  .pencil-side-card {
    background: #fff;
    border: 1px solid #e2e8f0;
    padding: 18px;
  }

  .pencil-profile-card {
    background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
  }

  .pencil-author-avatar {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    object-fit: cover;
    display: block;
    margin-bottom: 12px;
    border: 1px solid #e2e8f0;
  }

  .pencil-card-kicker {
    margin: 0 0 8px !important;
    color: #64748b !important;
    font-family: 'IBM Plex Mono', monospace !important;
    font-size: 11px !important;
    letter-spacing: 1.3px;
    text-transform: uppercase;
  }

  .pencil-side-card h3 {
    margin: 0 0 10px;
    color: #0f172a;
    font-family: 'Geist Mono', monospace;
    font-size: 24px;
    font-weight: 500;
  }

  .pencil-side-card p,
  .pencil-side-card li a {
    margin: 0;
    color: #475569;
    font-family: 'Geist', sans-serif;
    font-size: 15px;
    line-height: 1.45;
    text-decoration: none;
  }

  .pencil-side-card ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .pencil-profile-meta {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 14px;
  }

  .pencil-profile-meta span {
    color: #64748b;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
  }

  .pencil-profile-actions {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    margin-top: 16px;
  }

  .pencil-profile-actions a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px 10px;
    border: 1px solid #d7e1ec;
    color: #0f172a;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    text-decoration: none;
    background: #fff;
  }

  .pencil-profile-actions a:hover {
    color: #2563eb;
    border-color: #bfdbfe;
  }

  .pencil-tag-text {
    color: #475569;
    font-family: 'IBM Plex Mono', monospace !important;
    font-size: 13px !important;
    line-height: 1.4 !important;
  }

  .pencil-posts {
    display: flex;
    flex-direction: column;
    gap: 18px;
    min-width: 0;
  }

  .pencil-featured {
    border: 1px solid #d7e1ec;
    background: #eef4fb;
    padding: 24px;
  }

  .pencil-section-head {
    margin-bottom: 18px;
  }

  .pencil-featured-head h2,
  .pencil-section-head h2 {
    margin: 0 0 8px;
    color: #0f172a;
    font-family: 'Geist Mono', monospace;
    font-size: 28px;
    font-weight: 500;
  }

  .pencil-featured-head p:last-child,
  .pencil-section-head p:last-child {
    margin: 0;
    color: #475569;
    font-family: 'Geist', sans-serif;
    font-size: 15px;
    line-height: 1.5;
    max-width: 720px;
  }

  .pencil-feature-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
  }

  .pencil-category-overview,
  .pencil-now-learning {
    border: 1px solid #e2e8f0;
    background: #fff;
    padding: 22px 24px;
  }

  .pencil-category-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
  }

  .pencil-category-card {
    border: 1px solid #e2e8f0;
    background: #f8fbff;
    padding: 18px;
  }

  .pencil-category-card h3 {
    margin: 0 0 8px;
    font-family: 'Geist', sans-serif;
    font-size: 20px;
    line-height: 1.2;
  }

  .pencil-category-card h3 a {
    color: #0f172a;
    text-decoration: none;
  }

  .pencil-category-card h3 a:hover {
    color: #2563eb;
  }

  .pencil-category-card p {
    margin: 0 0 12px;
    color: #475569;
    font-size: 14px;
    line-height: 1.45;
  }

  .pencil-category-card span {
    color: #64748b;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
  }

  .pencil-now-list {
    margin: 0;
    padding-left: 18px;
    color: #475569;
    font-family: 'Geist', sans-serif;
    font-size: 15px;
    line-height: 1.7;
  }

  .pencil-now-list li + li {
    margin-top: 8px;
  }

  .pencil-feature-card {
    background: #fff;
    border: 1px solid #d7e1ec;
    padding: 18px;
  }

  .pencil-feature-card h3 {
    margin: 0 0 8px;
    font-family: 'Geist', sans-serif;
    font-size: 20px;
    line-height: 1.2;
  }

  .pencil-feature-card h3 a {
    color: #0f172a;
    text-decoration: none;
  }

  .pencil-feature-card h3 a:hover {
    color: #2563eb;
  }

  .pencil-feature-card p {
    margin: 0;
    color: #475569;
    font-family: 'Geist', sans-serif;
    font-size: 14px;
    line-height: 1.45;
  }

  .pencil-feature-link {
    display: inline-block;
    margin-top: 14px;
    color: #2563eb;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    text-decoration: none;
  }

  .pencil-feature-link:hover {
    text-decoration: underline;
  }

  body.pencil-home .index-card {
    margin: 0;
    width: 100%;
    border: 1px solid #e2e8f0;
    background: #fff;
    padding: 22px 24px;
    border-radius: 0;
    box-shadow: none;
  }

  body.pencil-home .index-info {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  body.pencil-home .index-info .index-btm {
    order: 1;
    margin-top: 0;
    color: #64748b;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
  }

  body.pencil-home .index-info .index-btm .post-meta {
    color: #64748b;
  }

  body.pencil-home .index-header {
    order: 2;
    margin: 0;
    line-height: 1.12;
  }

  body.pencil-home .index-header a {
    color: #0f172a;
    font-family: 'Geist', sans-serif;
    font-size: clamp(26px, 3vw, 34px);
    font-weight: 600;
  }

  body.pencil-home .index-excerpt {
    order: 3;
    margin-top: 0;
    min-height: 3.2em;
    color: #475569;
    font-family: 'Geist', sans-serif;
    font-size: 14px;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  body.pencil-home .pencil-readmore {
    order: 4;
    margin-top: 0;
    color: #2563eb;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 13px;
    text-decoration: none;
    width: fit-content;
  }

  body.pencil-home .pencil-readmore:hover {
    text-decoration: underline;
  }

  body.pencil-home footer,
  body.pencil-home .footer-content {
    border-top: 1px solid #e2e8f0;
    background: #fff;
  }

  body.pencil-home .footer-inner,
  body.pencil-home .footer-content {
    max-width: 1440px;
    margin: 0 auto;
    padding-left: 40px;
    padding-right: 40px;
    color: #64748b;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 13px;
  }

  body.pencil-home .footer-content a {
    color: #334155;
    text-decoration: none;
  }

  body.pencil-home .footer-content a:hover {
    text-decoration: underline;
  }

  @media (max-width: 991px) {
    body.pencil-home #navbar .container,
    body.pencil-home .footer-content {
      padding-left: 20px;
      padding-right: 20px;
    }

    .pencil-hero {
      min-height: 220px;
      padding: 30px 20px;
    }

    .pencil-main {
      display: flex;
      flex-direction: column;
      padding: 20px;
    }

    .pencil-featured {
      padding: 18px;
    }

    .pencil-feature-grid {
      grid-template-columns: 1fr;
    }

    .pencil-category-grid {
      grid-template-columns: 1fr;
    }

    .pencil-sidebar {
      width: 100%;
      max-width: 100%;
      margin-left: 0;
      position: static;
    }

    .pencil-profile-actions {
      grid-template-columns: 1fr;
    }
  }
</style>`;

function createHomeScript(sidebarHtml) {
  const featuredHtml = JSON.stringify(buildFeaturedHtml().replace(/\n/g, '').replace(/\s{2,}/g, ' '));
  const categoryOverviewHtml = JSON.stringify(buildCategoryOverviewHtml().replace(/\n/g, '').replace(/\s{2,}/g, ' '));
  const nowLearningHtml = JSON.stringify(buildNowLearningHtml().replace(/\n/g, '').replace(/\s{2,}/g, ' '));
  return `<script id="pencil-home-script">(function(){
    var featuredHtml=${featuredHtml};
    var categoryOverviewHtml=${categoryOverviewHtml};
    var nowLearningHtml=${nowLearningHtml};
    var boardCol=document.querySelector('#board .container .row .col-12.col-md-10.m-auto');
    if(!boardCol||boardCol.dataset.pencilReady){return;}
    boardCol.dataset.pencilReady='1';
    document.body.classList.add('pencil-home');

    var wrap=document.createElement('div');
    wrap.className='pencil-home-wrap';

    var hero=document.createElement('section');
    hero.className='pencil-hero';
    hero.innerHTML='\
      <p class="pencil-hero-tag">JAVA / AGENT / LEARNING NOTES</p>\
      <h1 class="pencil-hero-title">记录学习，整理实践，也留下自己的技术思考</h1>\
      <p class="pencil-hero-desc">这里记录我对 Java 后端、AI Agent、算法和开发工具的理解，也整理项目中的问题排查、方案设计和阶段性复盘。</p>';

    var main=document.createElement('section');
    main.className='pencil-main';

    var posts=document.createElement('div');
    posts.className='pencil-posts';

    while(boardCol.firstChild){
      posts.appendChild(boardCol.firstChild);
    }

    Array.prototype.forEach.call(posts.querySelectorAll('.index-card .index-info'), function(info){
      var titleLink=info.querySelector('.index-header a');
      if(!titleLink||info.querySelector('.pencil-readmore')){return;}
      var read=document.createElement('a');
      read.className='pencil-readmore';
      read.href=titleLink.getAttribute('href')||'#';
      read.target=titleLink.getAttribute('target')||'_self';
      read.textContent='阅读全文 ->';
      info.appendChild(read);
    });

    main.innerHTML=${JSON.stringify(sidebarHtml)};
    posts.insertAdjacentHTML('afterbegin', nowLearningHtml);
    posts.insertAdjacentHTML('afterbegin', categoryOverviewHtml);
    posts.insertAdjacentHTML('afterbegin', featuredHtml);
    main.appendChild(posts);

    wrap.appendChild(hero);
    wrap.appendChild(main);
    boardCol.appendChild(wrap);
  })();</script>`;
}

hexo.extend.filter.register('after_render:html', function (html, data) {
  if (typeof html !== 'string' || !data || data.path !== 'index.html') return html;

  let output = html;
  const sidebarHtml = buildSidebarHtml().replace(/\n/g, '').replace(/\s{2,}/g, ' ');

  if (!output.includes('pencil-home-style')) {
    output = output.replace(/<\/head>/i, `${PENCIL_STYLE}\n</head>`);
  }

  if (!output.includes('id="pencil-home-script"')) {
    output = output.replace(/<\/body>/i, `${createHomeScript(sidebarHtml)}\n</body>`);
  }

  return output;
});
