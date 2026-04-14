/* global hexo */

function formatDate(d) {
  const date = new Date(d);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function formatMonth(d) {
  const date = new Date(d);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

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
  const postCount = posts.length;
  const latestPosts = posts.slice(0, 8);

  const latestUpdate = posts.length ? formatDate(posts[0].updated || posts[0].date) : '-';

  const latestHtml = latestPosts.map((post) => {
    const title = post.title && String(post.title).trim() ? post.title : '未命名文章';
    return `<li><a href="${hexo.config.root}${post.path}">${escapeHtml(title)}</a></li>`;
  }).join('');

  return `
    <aside class="custom-home-sidebar">
      <section class="sidebar-card author-card">
        <img src="/img/avatar.png" alt="avatar">
        <h3>Yang</h3>
        <p>后端 / Agent / 算法学习者</p>
        <div class="author-links">
          <a class="author-link" href="https://space.bilibili.com/3546855875020826?spm_id_from=333.1007.0.0" target="_blank" rel="noopener noreferrer" aria-label="Bilibili">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <rect x="4" y="7" width="16" height="12" rx="3" fill="currentColor"></rect>
              <path d="M9.5 4.5L7.5 6.5M16.5 4.5L14.5 6.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
              <circle cx="10" cy="12.5" r="1.2" fill="#fff"></circle>
              <circle cx="14" cy="12.5" r="1.2" fill="#fff"></circle>
              <path d="M9.3 16c.8.6 1.6.9 2.7.9s1.9-.3 2.7-.9" stroke="#fff" stroke-width="1.2" fill="none" stroke-linecap="round"></path>
            </svg>
          </a>
          <a class="author-link" href="https://github.com/dazhuvss" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path fill="currentColor" d="M12 .5a11.5 11.5 0 0 0-3.64 22.4c.57.1.78-.24.78-.55v-2.1c-3.18.69-3.85-1.35-3.85-1.35-.52-1.32-1.27-1.67-1.27-1.67-1.04-.7.08-.7.08-.7 1.15.08 1.76 1.17 1.76 1.17 1.02 1.75 2.68 1.25 3.33.96.1-.73.4-1.25.72-1.54-2.54-.29-5.2-1.26-5.2-5.62 0-1.24.44-2.26 1.17-3.05-.12-.29-.5-1.47.11-3.07 0 0 .95-.3 3.1 1.16a10.8 10.8 0 0 1 5.64 0c2.14-1.46 3.09-1.16 3.09-1.16.62 1.6.24 2.78.12 3.07.73.79 1.16 1.81 1.16 3.05 0 4.37-2.66 5.33-5.2 5.61.41.35.77 1.03.77 2.08v3.08c0 .31.2.66.79.55A11.5 11.5 0 0 0 12 .5Z"/>
            </svg>
          </a>
        </div>
      </section>
      <section class="sidebar-card">
        <h4>公告</h4>
        <p>欢迎来到编程和游戏小屋，持续更新技术笔记与项目实践。</p>
      </section>
      <section class="sidebar-card">
        <h4>最新文章</h4>
        <ul>${latestHtml}</ul>
      </section>
      <section class="sidebar-card">
        <h4>站点统计</h4>
        <ul class="site-stats">
          <li><span>文章数</span><strong>${postCount}</strong></li>
          <li><span>最后更新时间</span><strong>${latestUpdate}</strong></li>
        </ul>
      </section>
    </aside>
  `;
}

const LAYOUT_STYLE = `<style>
  #board{
    background: transparent !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    margin-left: -72px !important;
    margin-right: 16px !important;
  }
  #board > .container{max-width:1560px;padding-left:18px;padding-right:18px}
  #board .container .row .col-12.col-md-10.m-auto{max-width:100%;flex:0 0 100%}
  .home-two-column{display:flex;gap:40px;align-items:flex-start;justify-content:space-between}
  .home-main{
    flex:0 0 73%;
    max-width:73%;
    background:
      linear-gradient(rgba(255,255,255,0.92), rgba(255,255,255,0.92)),
      url('/img/home-bg-generated.svg') center/cover no-repeat;
    box-shadow: 0 8px 28px rgba(0,0,0,0.08);
    border-radius: 18px;
    padding: 22px 26px;
  }
  .custom-home-sidebar{flex:0 0 27%;max-width:27%;position:sticky;top:90px;margin-left:10px}
  .sidebar-card{
    background:rgba(255,255,255,0.96);
    border-radius:14px;
    padding:16px;
    margin-bottom:16px;
    box-shadow: 0 6px 20px rgba(0,0,0,0.07);
  }
  .author-card{text-align:center}
  .author-card img{width:72px;height:72px;border-radius:50%;object-fit:cover;margin-bottom:10px}
  .author-links{display:flex;justify-content:center;gap:10px;margin-top:10px}
  .author-link{
    width:34px;height:34px;border-radius:50%;
    display:inline-flex;align-items:center;justify-content:center;
    color:#2f4154;background:#e9f2ff;text-decoration:none;
    transition:all .2s ease;
  }
  .author-link:hover{background:#2f4154;color:#fff;transform:translateY(-1px)}
  .sidebar-card h4{margin:0 0 10px;font-size:1rem}
  .sidebar-card ul{list-style:none;padding:0;margin:0}
  .sidebar-card li{display:flex;justify-content:space-between;gap:8px;margin:6px 0}
  .sidebar-card li a{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .site-stats li span{color:var(--sec-text-color)}
  @media (max-width: 991px){
    #board{
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
    .home-two-column{display:block}
    .home-main,.custom-home-sidebar{max-width:100%;flex:1 1 100%}
    .custom-home-sidebar{position:static}
  }
</style>`;

hexo.extend.filter.register('after_render:html', function (html) {
  if (typeof html !== 'string' || !html.includes('index-card')) return html;

  let output = html;

  const sidebarHtml = buildSidebarHtml().replace(/\n/g, '').replace(/\s{2,}/g, ' ');
  const script = `<script>(function(){var c=document.querySelector('#board .container .row .col-12.col-md-10.m-auto');if(!c)return;var wrap=document.createElement('div');wrap.className='home-two-column';var main=document.createElement('div');main.className='home-main';while(c.firstChild){main.appendChild(c.firstChild);}wrap.appendChild(main);wrap.insertAdjacentHTML('beforeend', ${JSON.stringify(sidebarHtml)});c.appendChild(wrap);})();</script>`;

  if (!output.includes('home-two-column')) {
    output = output.replace(/<\/head>/i, `${LAYOUT_STYLE}\n</head>`);
    output = output.replace(/<\/body>/i, `${script}\n</body>`);
  }

  return output;
});
