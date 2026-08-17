/**
 * Daily analytics snapshot.
 *
 * Writes one dated JSON file into public/analytics/ and rebuilds the index the
 * admin reads. Run by the existing 06:00 IST GitHub Action, so there is no new
 * infrastructure and no second schedule to remember.
 *
 * WHY SNAPSHOT AT ALL
 * Vercel's free plan keeps roughly a month of analytics and Search Console
 * keeps sixteen. Both windows slide. Committing a daily file means the history
 * is yours permanently, in the repo, in a format you could open in a
 * spreadsheet in five years. It also means the admin tab loads instantly from
 * a static file rather than waiting on two APIs.
 *
 * Zero dependencies, including the Google service-account handshake, which is
 * a JWT signed with the key you already have. Adding googleapis to this repo
 * for one request would be 40 MB of node_modules on every Vercel build.
 *
 * ENVIRONMENT — everything is optional. A source that is not configured is
 * recorded as such and the run continues. It never fails the build.
 *   GSC_SERVICE_ACCOUNT   the service account JSON, as a single-line string
 *   GSC_SITE_URL          e.g. sc-domain:instantproduction.in
 *   VERCEL_API_TOKEN      read-only token
 *   VERCEL_PROJECT_ID     prj_…
 *   VERCEL_TEAM_ID        team_…
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'public', 'analytics');

const today = new Date().toISOString().slice(0, 10);
const daysAgo = (n) => new Date(Date.now() - n * 864e5).toISOString().slice(0, 10);

/* ------------------------------------------------- google service account */

async function googleAccessToken(sa) {
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/webmasters.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
  const unsigned = `${b64({ alg: 'RS256', typ: 'JWT' })}.${b64(claim)}`;

  const signer = crypto.createSign('RSA-SHA256');
  signer.update(unsigned);
  signer.end();
  const jwt = `${unsigned}.${signer.sign(sa.private_key, 'base64url')}`;

  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });
  if (!r.ok) throw new Error(`Google refused the service account: ${r.status} ${(await r.text()).slice(0, 200)}`);
  return (await r.json()).access_token;
}

async function gscQuery(token, site, body) {
  const r = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/searchAnalytics/query`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
  );
  if (!r.ok) throw new Error(`Search Console said ${r.status}: ${(await r.text()).slice(0, 200)}`);
  return r.json();
}

async function searchConsole() {
  const raw = process.env.GSC_SERVICE_ACCOUNT;
  const site = process.env.GSC_SITE_URL;
  if (!raw || !site) {
    return { ok: false, reason: 'not-configured', message: 'GSC_SERVICE_ACCOUNT and GSC_SITE_URL are not set.' };
  }

  try {
    const sa = JSON.parse(raw);

    /* The commonest setup mistake by a distance. Pasting the service account
       JSON into an environment variable leaves the private key as one line
       with literal backslash-n instead of real newlines, and OpenSSL then
       reports "DECODER routines::unsupported", which tells you nothing.
       Repair it rather than make anyone debug that message. */
    if (typeof sa.private_key === 'string' && sa.private_key.includes('\\n')) {
      sa.private_key = sa.private_key.replace(/\\n/g, '\n');
    }
    if (!/-----BEGIN [A-Z ]*PRIVATE KEY-----/.test(sa.private_key || '')) {
      throw new Error('The private_key in GSC_SERVICE_ACCOUNT does not look like a PEM key. Paste the whole downloaded JSON file, unedited.');
    }

    const token = await googleAccessToken(sa);

    /* Search Console data lags by two to three days. Asking for yesterday
       returns nothing and looks like a broken integration. */
    const range = { startDate: daysAgo(31), endDate: daysAgo(3) };

    const [totals, queries, pages, byDay] = await Promise.all([
      gscQuery(token, site, { ...range, dimensions: [] }),
      gscQuery(token, site, { ...range, dimensions: ['query'], rowLimit: 25 }),
      gscQuery(token, site, { ...range, dimensions: ['page'], rowLimit: 25 }),
      gscQuery(token, site, { ...range, dimensions: ['date'], rowLimit: 100 }),
    ]);

    const row = (r) => ({
      key: r.keys?.[0] ?? '',
      clicks: r.clicks ?? 0,
      impressions: r.impressions ?? 0,
      ctr: Number(((r.ctr ?? 0) * 100).toFixed(2)),
      position: Number((r.position ?? 0).toFixed(1)),
    });

    return {
      ok: true,
      range,
      totals: totals.rows?.length ? row(totals.rows[0]) : { clicks: 0, impressions: 0, ctr: 0, position: 0 },
      queries: (queries.rows || []).map(row),
      pages: (pages.rows || []).map(row),
      byDay: (byDay.rows || []).map(row),
    };
  } catch (e) {
    return { ok: false, reason: 'error', message: e.message };
  }
}

/* ---------------------------------------------------------------- vercel */
/* Same probing approach as api/analytics.js, and the same reason: the
   endpoint has moved before and availability depends on the plan. */

const VERCEL_ENDPOINTS = [
  ['Web Analytics API (v1)', (a) => `https://api.vercel.com/v1/web-analytics/stats?projectId=${a.projectId}&teamId=${a.teamId}&from=${a.from}&to=${a.to}`],
  ['Web Analytics timeseries', (a) => `https://api.vercel.com/v1/web-analytics/timeseries?projectId=${a.projectId}&teamId=${a.teamId}&from=${a.from}&to=${a.to}`],
  ['Insights bucket API', (a) => `https://api.vercel.com/v1/insights/buckets?projectId=${a.projectId}&teamId=${a.teamId}&from=${a.from}&to=${a.to}`],
];

async function vercel() {
  const token = process.env.VERCEL_API_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  if (!token || !projectId) {
    return { ok: false, reason: 'not-configured', message: 'VERCEL_API_TOKEN and VERCEL_PROJECT_ID are not set.' };
  }
  const args = {
    projectId,
    teamId: process.env.VERCEL_TEAM_ID || '',
    from: new Date(Date.now() - 30 * 864e5).toISOString(),
    to: new Date().toISOString(),
  };
  const tried = [];
  for (const [name, build] of VERCEL_ENDPOINTS) {
    try {
      const r = await fetch(build(args), { headers: { Authorization: `Bearer ${token}` } });
      tried.push({ endpoint: name, status: r.status });
      if (r.ok) {
        const text = await r.text();
        try { return { ok: true, endpoint: name, data: JSON.parse(text), tried }; } catch { /* not JSON */ }
      }
    } catch (e) {
      tried.push({ endpoint: name, status: `network: ${e.message}` });
    }
  }
  return {
    ok: false,
    reason: 'no-endpoint-worked',
    message: 'No Vercel analytics endpoint returned data. Most likely the API is not on this plan.',
    tried,
  };
}

/* ------------------------------------------------------------------ main */

async function main() {
  fs.mkdirSync(OUT, { recursive: true });

  const [gsc, vc] = await Promise.all([searchConsole(), vercel()]);
  const snapshot = { date: today, takenAt: new Date().toISOString(), searchConsole: gsc, vercel: vc };

  fs.writeFileSync(path.join(OUT, `${today}.json`), `${JSON.stringify(snapshot, null, 2)}\n`);

  /* Rebuild the index from whatever dated files exist, so a manual deletion
     or a backfill is picked up without any extra bookkeeping. */
  const days = fs.readdirSync(OUT)
    .filter((f) => /^\d{4}-\d{2}-\d{2}\.json$/.test(f))
    .sort()
    .map((f) => {
      const s = JSON.parse(fs.readFileSync(path.join(OUT, f), 'utf8'));
      const t = s.searchConsole?.ok ? s.searchConsole.totals : null;
      return {
        date: s.date,
        clicks: t?.clicks ?? null,
        impressions: t?.impressions ?? null,
        ctr: t?.ctr ?? null,
        position: t?.position ?? null,
      };
    });

  const latest = JSON.parse(fs.readFileSync(path.join(OUT, `${today}.json`), 'utf8'));
  fs.writeFileSync(
    path.join(OUT, 'index.json'),
    `${JSON.stringify({ updated: new Date().toISOString(), days, latest }, null, 2)}\n`,
  );

  console.log(`[analytics] snapshot ${today} — search console: ${gsc.ok ? 'ok' : gsc.reason} · vercel: ${vc.ok ? 'ok' : vc.reason}`);
  console.log(`[analytics] ${days.length} day${days.length === 1 ? '' : 's'} of history`);
}

/* Never fail the build over analytics. A missing number is not worth a failed
   deploy, and this runs in the same job that publishes scheduled articles. */
main().catch((e) => {
  console.error(`[analytics] snapshot failed, continuing anyway: ${e.message}`);
  process.exit(0);
});
