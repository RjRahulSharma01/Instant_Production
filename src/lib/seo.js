import { useEffect } from 'react';

export const SITE_URL = 'https://instantproduction.in';
const SUFFIX = 'Instant Production';

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    const [, key, val] = selector.match(/\[(\w+)="([^"]+)"\]/) || [];
    if (key && val) el.setAttribute(key, val);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Per-route title, description and canonical URL.
 *
 * Note: this runs client-side. Google executes JS and will pick these up.
 * Social crawlers (WhatsApp, LinkedIn, X) do NOT run JS. They read the
 * static og: tags in index.html, so every shared link shows the homepage
 * card. Fixing that properly needs prerendering or SSR; see APPLY notes.
 */
export function useSeo({ title, description, path }) {
  useEffect(() => {
    const full = title ? `${title} | ${SUFFIX}` : SUFFIX;
    document.title = full;

    if (description) {
      setMeta('meta[name="description"]', 'content', description);
      setMeta('meta[property="og:description"]', 'content', description);
      setMeta('meta[name="twitter:description"]', 'content', description);
    }
    setMeta('meta[property="og:title"]', 'content', full);
    setMeta('meta[name="twitter:title"]', 'content', full);

    if (path) {
      const url = `${SITE_URL}${path}`;
      setCanonical(url);
      setMeta('meta[property="og:url"]', 'content', url);
    }
  }, [title, description, path]);
}
