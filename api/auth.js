/**
 * Step 1 of the GitHub OAuth handshake — starts it.
 *
 * The admin at /admin opens this in a popup. We redirect to GitHub, GitHub asks
 * the person to authorise, then sends them to /api/callback.
 *
 * NOTHING SECRET LIVES IN THIS FILE. The client ID is public by design; the
 * client secret is only ever read from the environment, only in the callback,
 * and is never sent to the browser.
 *
 * Required environment variables (set in Vercel, not in the repo):
 *   GITHUB_CLIENT_ID
 *   GITHUB_CLIENT_SECRET   (used by callback.js only)
 */

import crypto from 'node:crypto';

export default function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;

  if (!clientId) {
    res.status(500).send(
      'GITHUB_CLIENT_ID is not set. Add it in Vercel → Settings → Environment Variables.',
    );
    return;
  }

  /* A random, single-use value echoed back by GitHub. If what comes back does
     not match what we set, the request did not start here and we reject it.
     This is what stops someone tricking an admin into completing a login they
     did not begin. */
  const state = crypto.randomBytes(16).toString('hex');

  /* Host-only cookie, not readable by JavaScript, not sent on cross-site
     requests, expires in ten minutes. */
  res.setHeader(
    'Set-Cookie',
    `ip_oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
  );

  const url = new URL('https://github.com/login/oauth/authorize');
  url.searchParams.set('client_id', clientId);
  /* `repo` is the narrowest scope that still allows committing to a repository.
     GitHub has no "write to one repo" OAuth scope — access is limited instead
     by who you add as a collaborator. */
  url.searchParams.set('scope', 'repo,user');
  url.searchParams.set('state', state);

  res.redirect(302, url.toString());
}
