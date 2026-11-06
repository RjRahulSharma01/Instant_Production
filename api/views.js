/**
 * /api/views: per-post view counter with traffic-source tracking.
 *
 *   POST {slug, ref, utm}  count one view (deduped per visitor per post per day), returns {views}
 *   GET  ?slug=...         returns {views} for one post
 *   GET  ?report=1         full table, views by source and last 14 days
 *                          (needs  Authorization: Bearer <VIEWS_ADMIN_TOKEN>)
 *
 * STORAGE: Upstash Redis over its REST API (free tier), added from the Vercel
 * Marketplace. Vercel injects either UPSTASH_REDIS_REST_URL / _TOKEN or
 * KV_REST_API_URL / _TOKEN; both are accepted. With neither set this endpoint
 * answers {views:null, configured:false} and the site simply shows no count.
 *
 * PRIVACY: no raw IP or user agent is stored. A visitor is represented only by
 * a one-way SHA-256 hash that includes the day, used as a 25-hour dedupe key
 * and then discarded by expiry. Referrers are reduced to a hostname/channel.
 * Nothing here identifies a person, so no consent banner is needed.
 */

import crypto from 'node:crypto';

const URL_ = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
const ADMIN = process.env.VIEWS_ADMIN_TOKEN;
const SALT = process.env.VIEWS_SALT || 'instant-production';
const SLUG_RE = /^[a-z0-9][a-z0-9-]{0,119}$/;
const BOT_RE = /bot|crawl|spider|slurp|preview|facebookexternalhit|headless|lighthouse|curl|wget|python|node-fetch|axios|monitor|uptime/i;

async function redis(commands) {
  const r = await fetch(`${URL_}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands),
  });
  if (!r.ok) throw new Error(`redis ${r.status}`);
  return (await r.json()).map((x) => x.result);
}

const SEARCH = { 'google': 'google', 'bing.com': 'bing', 'duckduckgo.com': 'duckduckgo', 'yahoo.com': 'yahoo', 'ecosia.org': 'ecosia', 'search.brave.com': 'brave' };
const SOCIAL = {
  'linkedin.com': 'linkedin', 'lnkd.in': 'linkedin', 'facebook.com': 'facebook', 'fb.com': 'facebook',
  'instagram.com': 'instagram', 't.co': 'x-twitter', 'twitter.com': 'x-twitter', 'x.com': 'x-twitter',
  'youtube.com': 'youtube', 'youtu.be': 'youtube', 'reddit.com': 'reddit', 'whatsapp.com': 'whatsapp',
  'wa.me': 'whatsapp', 't.me': 'telegram', 'telegram.org': 'telegram', 'quora.com': 'quora', 'medium.com': 'medium',
};
const AI = { 'chatgpt.com': 'chatgpt', 'chat.openai.com': 'chatgpt', 'perplexity.ai': 'perplexity', 'gemini.google.com': 'gemini', 'claude.ai': 'claude', 'copilot.microsoft.com': 'copilot' };

function classify(refHost, utm, ownHost) {
  const u = String(utm || '').toLowerCase().replace(/[^a-z0-9._-]/g, '').slice(0, 30);
  const h = String(refHost || '').toLowerCase().replace(/^www\./, '').replace(/[^a-z0-9.-]/g, '').slice(0, 60);
  if (h && ownHost && (h === ownHost || h.endsWith(`.${ownHost}`))) return 'internal';
  for (const [k, v] of Object.entries(AI)) if (h === k || h.endsWith(`.${k}`)) return `ai:${v}`;
  if (h) {
    if (/(^|\.)google\.[a-z.]+$/.test(h) && h !== 'gemini.google.com') return 'search:google';
    for (const [k, v] of Object.entries(SEARCH)) if (h.includes(k)) return `search:${v}`;
    for (const [k, v] of Object.entries(SOCIAL)) if (h === k || h.endsWith(`.${k}`)) return `social:${v}`;
    return `referral:${h}`;
  }
  if (u) return `campaign:${u}`;
  return 'direct';
}

const day = (d = new Date()) => new Date(d.getTime() + 5.5 * 3600e3).toISOString().slice(0, 10); // IST day

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (!URL_ || !TOKEN) return res.status(200).json({ views: null, configured: false });

  try {
    if (req.method === 'GET' && req.query.report) {
      if (!ADMIN || req.headers.authorization !== `Bearer ${ADMIN}`) return res.status(401).json({ error: 'unauthorised' });
      const [slugs] = await redis([['SMEMBERS', 'posts']]);
      const days = Array.from({ length: 14 }, (_, i) => day(new Date(Date.now() - i * 864e5)));
      const cmds = [];
      for (const s of slugs) { cmds.push(['GET', `views:${s}`], ['HGETALL', `refs:${s}`]); }
      for (const d of days) cmds.push(['HGETALL', `daily:${d}`]);
      const out = cmds.length ? await redis(cmds) : [];
      const toObj = (a) => { const o = {}; for (let i = 0; i < (a || []).length; i += 2) o[a[i]] = Number(a[i + 1]); return o; };
      const posts = slugs.map((s, i) => ({ slug: s, views: Number(out[i * 2] || 0), sources: toObj(out[i * 2 + 1]) }))
        .sort((a, b) => b.views - a.views);
      const daily = days.map((d, i) => ({ date: d, perPost: toObj(out[slugs.length * 2 + i]) }));
      return res.status(200).json({ generatedAt: new Date().toISOString(), posts, daily });
    }

    if (req.method === 'GET') {
      const slug = String(req.query.slug || '');
      if (!SLUG_RE.test(slug)) return res.status(400).json({ error: 'bad slug' });
      const [v] = await redis([['GET', `views:${slug}`]]);
      return res.status(200).json({ views: Number(v || 0), configured: true });
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      const slug = String(body.slug || '');
      if (!SLUG_RE.test(slug)) return res.status(400).json({ error: 'bad slug' });

      const ua = String(req.headers['user-agent'] || '');
      if (!ua || BOT_RE.test(ua)) {
        const [v] = await redis([['GET', `views:${slug}`]]);
        return res.status(200).json({ views: Number(v || 0), counted: false, configured: true });
      }

      const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
      const d = day();
      const who = crypto.createHash('sha256').update(`${SALT}|${d}|${slug}|${ip}|${ua}`).digest('hex').slice(0, 32);
      const [first] = await redis([['SET', `seen:${who}`, '1', 'NX', 'EX', '90000']]);

      if (first === 'OK') {
        const source = classify(body.ref, body.utm, String(req.headers.host || '').replace(/^www\./, '').replace(/:\d+$/, ''));
        const [views] = await redis([
          ['INCR', `views:${slug}`],
          ['HINCRBY', `refs:${slug}`, source, 1],
          ['HINCRBY', `daily:${d}`, slug, 1],
          ['EXPIRE', `daily:${d}`, 60 * 86400],
          ['SADD', 'posts', slug],
        ]);
        return res.status(200).json({ views: Number(views), counted: true, configured: true });
      }
      const [v] = await redis([['GET', `views:${slug}`]]);
      return res.status(200).json({ views: Number(v || 0), counted: false, configured: true });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'method not allowed' });
  } catch (e) {
    return res.status(200).json({ views: null, error: 'unavailable' });
  }
}
