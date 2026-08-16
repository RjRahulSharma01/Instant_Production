/**
 * Step 2 of the GitHub OAuth handshake — finishes it.
 *
 * GitHub sends the person here with a short-lived code. We swap that code for
 * an access token using the client secret, then hand the token to the admin
 * window that opened this popup.
 *
 * SECURITY NOTES, because this is the one file on the site that touches a secret:
 *
 * - The client secret is read from the environment and never leaves the server.
 * - The `state` value is compared against the cookie set in auth.js. A mismatch
 *   means the flow did not start on our site, so we refuse.
 * - The token is posted only to our own origin, never to '*'. Without that, any
 *   page that managed to open this popup could read the token.
 * - The token is handed to the admin and held in that browser tab. We do not
 *   store it, log it, or send it anywhere else.
 * - Whether the token can actually change anything is decided by GitHub, based
 *   on whether that person is a collaborator on the repository. Remove them
 *   there and this stops working immediately.
 */

export default async function handler(req, res) {
  const { code, state } = req.query;

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  const fail = (message) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Set-Cookie', 'ip_oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0');
    res.status(400).send(page(`
      <h1>Sign-in failed</h1>
      <p>${escapeHtml(message)}</p>
      <p class="muted">Close this window and try again. If it keeps happening,
      the OAuth app settings in GitHub are the first place to look.</p>
    `));
  };

  if (!clientId || !clientSecret) {
    return fail('GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET is not set on the server.');
  }
  if (!code) return fail('GitHub did not send an authorisation code.');

  /* CSRF check — the state must match the cookie auth.js set. */
  const cookies = Object.fromEntries(
    (req.headers.cookie || '').split(';').map((c) => {
      const i = c.indexOf('=');
      return [c.slice(0, i).trim(), decodeURIComponent(c.slice(i + 1))];
    }).filter(([k]) => k),
  );
  if (!state || state !== cookies.ip_oauth_state) {
    return fail('The sign-in request did not start on this site, so it was rejected.');
  }

  let token;
  try {
    const r = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    });
    const data = await r.json();
    if (data.error) return fail(data.error_description || data.error);
    token = data.access_token;
  } catch {
    return fail('Could not reach GitHub to complete sign-in.');
  }

  if (!token) return fail('GitHub did not return an access token.');

  /* The exact message shape the CMS listens for. */
  const payload = JSON.stringify({ token, provider: 'github' });

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  /* Clear the state cookie — it is single use. */
  res.setHeader('Set-Cookie', 'ip_oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0');
  res.status(200).send(page(`
    <h1>Signed in</h1>
    <p class="muted">You can close this window if it does not close itself.</p>
    <script>
      (function () {
        // Post only to our own origin. Never '*' — that would let any page that
        // opened this popup read the token.
        var origin = window.location.origin;
        function send() {
          window.opener && window.opener.postMessage(
            'authorization:github:success:${payload.replace(/'/g, "\\'")}',
            origin
          );
        }
        // The CMS announces itself first; answer it, then close.
        window.addEventListener('message', function (e) {
          if (e.origin !== origin) return;
          send();
          setTimeout(function () { window.close(); }, 400);
        }, false);
        window.opener && window.opener.postMessage('authorizing:github', origin);

        // If nothing answers, hand the token over anyway rather than sitting
        // here saying "Signed in" while the page that opened us waits. This
        // costs nothing in safety: send() posts to our own origin and only to
        // the window that opened this one, handshake or no handshake.
        setTimeout(function () { send(); }, 1200);
        setTimeout(function () { window.close(); }, 2000);
      })();
    </script>
  `));
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

function page(body) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Instant Production — sign in</title>
<style>
  body { margin:0; min-height:100vh; display:grid; place-items:center;
         background:#050505; color:#f5f5f5; font-family:Inter,system-ui,sans-serif;
         text-align:center; padding:2rem; }
  h1 { font-size:1.25rem; font-weight:600; margin:0 0 .75rem; }
  p { margin:0 0 .5rem; font-size:.9rem; line-height:1.7; max-width:32rem; }
  .muted { color:#a1a1aa; }
</style></head><body><div>${body}</div></body></html>`;
}
