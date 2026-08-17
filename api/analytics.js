/**
 * /api/analytics — the one endpoint the analytics tab calls.
 *
 * Reads the daily snapshots committed into the repo, and optionally tops them
 * up with a live figure from Vercel. Everything that needs a credential happens
 * here, on the server. No token is ever sent to the browser.
 *
 * WHY THIS PROBES RATHER THAN ASSUMES
 * Vercel has moved its Web Analytics data endpoint more than once, and access
 * depends on the plan. Rather than hard-code one URL and present an empty tab
 * when it 404s, this tries the known shapes in order and reports exactly what
 * happened — which URL, which status. If your plan does not expose the API at
 * all, the tab says so in as many words instead of showing zeroes.
 *
 * ENVIRONMENT VARIABLES — all optional, all set in the Vercel dashboard
 *   VERCEL_API_TOKEN   a read-only token from vercel.com/account/tokens
 *   VERCEL_PROJECT_ID  prj_… from Project Settings → General
 *   VERCEL_TEAM_ID     team_… from Team Settings → General
 * With none of these set, the tab still works and shows the snapshot history.
 */

const SNAPSHOT_DIR = 'public/analytics';
const REPO = 'RjRahulSharma01/Instant_Production';

/* The endpoint shapes Vercel has used. Tried in order; the first that returns
   JSON wins. Each entry says what it is so the diagnostic is readable. */
const VERCEL_ENDPOINTS = [
  {
    name: 'Web Analytics API (v1)',
    url: ({ projectId, teamId, from, to }) =>
      `https://api.vercel.com/v1/web-analytics/stats?projectId=${projectId}` +
      `&teamId=${teamId}&from=${from}&to=${to}`,
  },
  {
    name: 'Web Analytics timeseries',
    url: ({ projectId, teamId, from, to }) =>
      `https://api.vercel.com/v1/web-analytics/timeseries?projectId=${projectId}` +
      `&teamId=${teamId}&from=${from}&to=${to}`,
  },
  {
    name: 'Insights bucket API',
    url: ({ projectId, teamId, from, to }) =>
      `https://api.vercel.com/v1/insights/buckets?projectId=${projectId}` +
      `&teamId=${teamId}&from=${from}&to=${to}`,
  },
];

async function fetchVercel() {
  const token = process.env.VERCEL_API_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  const teamId = process.env.VERCEL_TEAM_ID || '';

  if (!token || !projectId) {
    return {
      ok: false,
      reason: 'not-configured',
      message: 'VERCEL_API_TOKEN and VERCEL_PROJECT_ID are not set, so live Vercel figures are switched off. The snapshots below still work.',
      tried: [],
    };
  }

  const to = new Date();
  const from = new Date(to.getTime() - 30 * 864e5);
  const args = {
    projectId,
    teamId,
    from: from.toISOString(),
    to: to.toISOString(),
  };

  const tried = [];
  for (const ep of VERCEL_ENDPOINTS) {
    const url = ep.url(args);
    try {
      const r = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      const body = await r.text();
      tried.push({ endpoint: ep.name, status: r.status });
      if (r.ok) {
        try {
          return { ok: true, endpoint: ep.name, data: JSON.parse(body), tried };
        } catch {
          /* 200 but not JSON — keep going rather than trust it. */
        }
      }
    } catch (e) {
      tried.push({ endpoint: ep.name, status: `network: ${e.message}` });
    }
  }

  return {
    ok: false,
    reason: 'no-endpoint-worked',
    message:
      'None of the Vercel analytics endpoints returned data for this token. ' +
      'Usually that means the API is not available on this plan, or the token ' +
      'lacks access to the project. The dashboards at vercel.com still work, ' +
      'and the snapshots below are unaffected.',
    tried,
  };
}

/* The snapshots are plain files in the repo, so reading them needs no
   credential at all — they are served as static assets. */
async function fetchSnapshots(origin) {
  try {
    const r = await fetch(`${origin}/analytics/index.json`, { cache: 'no-store' });
    if (!r.ok) return { ok: false, days: [], message: 'No snapshots yet. The first one is written at 06:00 IST tomorrow.' };
    return { ok: true, ...(await r.json()) };
  } catch (e) {
    return { ok: false, days: [], message: `Could not read the snapshots: ${e.message}` };
  }
}

export default async function handler(req, res) {
  const origin = `https://${req.headers.host}`;

  const [vercel, snapshots] = await Promise.all([
    fetchVercel(),
    fetchSnapshots(origin),
  ]);

  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.status(200).json({
    generatedAt: new Date().toISOString(),
    vercel,
    snapshots,
    links: {
      vercelAnalytics: 'https://vercel.com/dashboard',
      searchConsole: 'https://search.google.com/search-console',
      repo: `https://github.com/${REPO}`,
      snapshotDir: SNAPSHOT_DIR,
    },
  });
}
