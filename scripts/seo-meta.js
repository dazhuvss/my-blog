/* global hexo */

const MIN_LEN = 100;
const MAX_LEN = 160;

function normalizeText(input) {
  return input
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function truncateDescription(text) {
  const normalized = normalizeText(text);
  if (!normalized) return normalized;
  if (normalized.length <= MAX_LEN) return normalized;

  let result = normalized.slice(0, MAX_LEN);
  const cut = Math.max(result.lastIndexOf(' '), result.lastIndexOf('，'), result.lastIndexOf('。'));
  if (cut >= MIN_LEN) result = result.slice(0, cut);
  return `${result}...`;
}

hexo.extend.filter.register('after_render:html', function (html) {
  if (typeof html !== 'string' || !html) return html;

  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  if (!descMatch || !descMatch[1]) return html;

  const trimmed = truncateDescription(descMatch[1]);
  if (!trimmed) return html;

  let output = html.replace(
    /(<meta[^>]*name=["']description["'][^>]*content=["'])([^"']*)(["'][^>]*>)/i,
    `$1${trimmed}$3`
  );
  output = output.replace(
    /(<meta[^>]*property=["']og:description["'][^>]*content=["'])([^"']*)(["'][^>]*>)/i,
    `$1${trimmed}$3`
  );

  const defaultImage = `${hexo.config.url.replace(/\/$/, '')}/img/avatar.jpg`;
  if (!/property=["']og:image["']/i.test(output)) {
    output = output.replace(
      /<\/head>/i,
      `<meta property="og:image" content="${defaultImage}">\n</head>`
    );
  }
  if (!/name=["']twitter:image["']/i.test(output)) {
    output = output.replace(
      /<\/head>/i,
      `<meta name="twitter:image" content="${defaultImage}">\n</head>`
    );
  }
  return output;
});
