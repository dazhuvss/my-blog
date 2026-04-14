/* global hexo */

const HETI_CSS = '<link rel="stylesheet" href="https://unpkg.com/heti/umd/heti.min.css">';
const HETI_ADDON_CSS = '<link rel="stylesheet" href="https://unpkg.com/heti/umd/heti-addon.min.css">';
const HETI_ADDON_JS = '<script src="https://unpkg.com/heti/umd/heti-addon.min.js"></script>';
const HETI_INIT_JS = `<script>
  (function () {
    function runHeti() {
      if (typeof Heti === 'undefined') return;
      var heti = new Heti('.heti');
      heti.autoSpacing();
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', runHeti);
    } else {
      runHeti();
    }
  })();
</script>`;
const HETI_CUSTOM_STYLE = `<style>
  .article-entry.heti {
    max-width: 42em;
    margin-left: auto;
    margin-right: auto;
  }
</style>`;

hexo.extend.filter.register('after_render:html', function (html) {
  if (typeof html !== 'string' || !html.length) return html;

  let output = html.replace(
    /class=(["'])([^"']*\barticle-entry\b[^"']*)\1/g,
    (match, quote, classes) => {
      if (/\bheti\b/.test(classes)) return match;
      return `class=${quote}${classes} heti${quote}`;
    }
  );

  if (!/heti\.min\.css/.test(output)) {
    output = output.replace(/<\/head>/i, `${HETI_CSS}\n${HETI_ADDON_CSS}\n${HETI_CUSTOM_STYLE}\n</head>`);
  }

  if (!/heti-addon\.min\.js/.test(output)) {
    output = output.replace(/<\/body>/i, `${HETI_ADDON_JS}\n${HETI_INIT_JS}\n</body>`);
  }

  return output;
});
