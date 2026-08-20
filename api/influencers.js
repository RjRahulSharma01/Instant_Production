/**
 * /api/influencers — reads the Creator Database responses straight out of the
 * linked Google Sheet and returns them as JSON.
 *
 * Same shape of trick as api/analytics.js: a JWT signed with a Google service
 * account's private key, no dependency on googleapis (40 MB of node_modules
 * for one request). The credential lives only on the server; the browser never
 * sees it.
 *
 * WHY LIVE RATHER THAN SNAPSHOTTED
 * Search Console reports with a two-to-three day lag and a sliding window, which
 * is why analytics.js snapshots it daily. A Sheet has neither problem — every
 * read is current — so there is nothing to gain from caching it, and a lot to
 * lose: whoever is looking at this the moment a creator submits the form wants
 * to see them immediately, not tomorrow morning.
 *
 * ENVIRONMENT VARIABLES
 *   SHEETS_SERVICE_ACCOUNT   the service account JSON, as a single-line string
 *                            (same account you already use for GSC works fine —
 *                            just add the Sheets scope's access, see APPLY.md)
 *   INFLUENCERS_SHEET_ID     the spreadsheet ID from its URL. Defaults to the
 *                            sheet Link to Sheets created, so this works with
 *                            zero configuration beyond the service account.
 */

const DEFAULT_SHEET_ID = '1_YP0KtElTEONhKO8HD65C4G5w7ml9XkgU3cr7XYRpRw';

/* Header text (as Google Forms wrote it into row 1) → the field name this API
   returns. Matched by "starts with", case-insensitive, so tweaking a question's
   wording slightly in the Form later does not silently break every column. */
const FIELD_MAP = [
  ['timestamp', 'timestamp'],
  ['full name', 'name'],
  ['email address', 'email'],
  ['whatsapp', 'phone'],
  ['city', 'city'],
  ['primary platform', 'platform'],
  ['profile link', 'handle'],
  ['follower count', 'followers'],
  ['content niche', 'niche'],
  ['rate card', 'rateCard'],
  ['portfolio', 'portfolio'],
  ['anything else', 'notes'],
];

function fieldFor(header) {
  const h = header.trim().toLowerCase();
  const hit = FIELD_MAP.find(([prefix]) => h.startsWith(prefix));
  return hit ? hit[1] : null;
}

/* ------------------------------------------------- google service account */
/* Identical handshake to scripts/snapshot-analytics.mjs, different scope. */

async function googleAccessToken(sa) {
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
  const unsigned = `${b64({ alg: 'RS256', typ: 'JWT' })}.${b64(claim)}`;

  const crypto = await import('node:crypto');
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

async function sheetsRequest(token, path) {
  const r = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!r.ok) {
    const body = await r.text();
    const notShared = r.status === 403 || r.status === 404;
    throw new Error(
      notShared
        ? `Sheets said ${r.status}. Most likely the sheet is not shared with the service account's email — see APPLY.md. (${body.slice(0, 150)})`
        : `Sheets said ${r.status}: ${body.slice(0, 200)}`,
    );
  }
  return r.json();
}

async function readSheet(sheetId) {
  const raw = process.env.SHEETS_SERVICE_ACCOUNT;
  if (!raw) {
    return { ok: false, reason: 'not-configured', message: 'SHEETS_SERVICE_ACCOUNT is not set, so the responses cannot be read yet. See APPLY.md.' };
  }

  let sa;
  try {
    sa = JSON.parse(raw);
    if (typeof sa.private_key === 'string' && sa.private_key.includes('\\n')) {
      sa.private_key = sa.private_key.replace(/\\n/g, '\n');
    }
    if (!/-----BEGIN [A-Z ]*PRIVATE KEY-----/.test(sa.private_key || '')) {
      throw new Error('The private_key in SHEETS_SERVICE_ACCOUNT does not look like a PEM key. Paste the whole downloaded JSON file, unedited.');
    }
  } catch (e) {
    return { ok: false, reason: 'error', message: `SHEETS_SERVICE_ACCOUNT could not be parsed: ${e.message}` };
  }

  try {
    const token = await googleAccessToken(sa);

    /* Find the first sheet's title rather than assume "Form Responses 1" —
       renaming the tab is a thing people do, and this way it never breaks. */
    const meta = await sheetsRequest(token, `${sheetId}?fields=sheets.properties.title`);
    const title = meta.sheets?.[0]?.properties?.title;
    if (!title) return { ok: false, reason: 'error', message: 'The spreadsheet has no sheets.' };

    const range = encodeURIComponent(`'${title}'!A1:Z`);
    const data = await sheetsRequest(token, `${sheetId}/values/${range}?majorDimension=ROWS`);
    const [headerRow, ...body] = data.values || [];
    if (!headerRow) return { ok: true, rows: [], count: 0, headers: [] };

    const fields = headerRow.map(fieldFor);

    const rows = body
      .filter((r) => r.some((c) => c && c.trim()))
      .map((r) => {
        const row = {};
        fields.forEach((field, i) => {
          if (!field) return;
          const val = (r[i] || '').trim();
          row[field] = field === 'niche'
            ? val.split(',').map((s) => s.trim()).filter(Boolean)
            : val;
        });
        return row;
      });

    return { ok: true, rows, count: rows.length, headers: headerRow, sheetTitle: title };
  } catch (e) {
    return { ok: false, reason: 'error', message: e.message };
  }
}

export default async function handler(req, res) {
  const sheetId = process.env.INFLUENCERS_SHEET_ID || DEFAULT_SHEET_ID;
  const result = await readSheet(sheetId);

  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.status(200).json({
    generatedAt: new Date().toISOString(),
    sheetUrl: `https://docs.google.com/spreadsheets/d/${sheetId}/edit`,
    ...result,
  });
}
