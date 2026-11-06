import { useEffect, useState } from 'react';

/* Shows a post's view count once it passes a small floor, so a brand-new post
   does not advertise "3 views". The count itself is always recorded. */
export const VIEW_THRESHOLD = 50;

const host = (url) => {
  try { return new URL(url).hostname; } catch { return ''; }
};

/* Counts this page view once per tab session and returns the running total, or
   null when the counter is unavailable (local dev, storage not connected,
   network error). Failing quietly is deliberate: a missing number must never
   break an article. */
export function useViews(slug, enabled = true) {
  const [views, setViews] = useState(null);

  useEffect(() => {
    if (!enabled || !slug) return undefined;
    let cancelled = false;
    const key = `ip-view:${slug}`;
    let already = false;
    try { already = sessionStorage.getItem(key) === '1'; } catch { /* storage blocked */ }

    const body = already
      ? null
      : JSON.stringify({
        slug,
        ref: host(document.referrer),
        utm: new URLSearchParams(window.location.search).get('utm_source') || '',
      });

    const req = body
      ? fetch('/api/views', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true })
      : fetch(`/api/views?slug=${encodeURIComponent(slug)}`);

    req
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (body) { try { sessionStorage.setItem(key, '1'); } catch { /* ignore */ } }
        if (!cancelled && j && typeof j.views === 'number') setViews(j.views);
      })
      .catch(() => {});

    return () => { cancelled = true; };
  }, [slug, enabled]);

  return views;
}
