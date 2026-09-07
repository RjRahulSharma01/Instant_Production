#!/usr/bin/env python3
"""
blog-banner.py — Instant Production blog banner compositor.

Takes an AI-generated base image and produces a 1200x630 WebP for
public/images/blog/. The artwork runs full-bleed and carries no article copy:
the only overlay is the Instant Production logo, placed in whichever top
corner is quieter, with a soft dark halo so it stays legible over any image.

The headline is deliberately NOT drawn — it already sits directly above the
banner on the article page, and repeating it there is redundant.

Brand assets (Inter, logo) are fetched on first run and cached in /tmp, so the
script is self-contained and needs no repo checkout.

Usage:
  python3 blog-banner.py BASE_IMAGE OUT.webp [seed-text-for-fallback]

If BASE_IMAGE is the literal string "none", a procedural on-brand backdrop is
generated instead, so the daily automation still produces a usable banner when
image generation is rate-limited or out of credits. Pass the post title as the
third argument in that case, purely to seed the pattern — it is never drawn.
"""
import os, sys, random, urllib.request
from PIL import Image, ImageDraw, ImageFilter, ImageStat, ImageEnhance

W, H = 1200, 630
AMBER, INK = (245, 158, 11), (5, 5, 5)
PAD, LOGO_W = 52, 176
CACHE = "/tmp/ip-banner-assets"
LOGO_URL = "https://raw.githubusercontent.com/RjRahulSharma01/Instant_Production/main/public/brand/logo-light-800.png"


def _get(url, path):
    if not os.path.exists(path) or os.path.getsize(path) == 0:
        os.makedirs(os.path.dirname(path), exist_ok=True)
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/4.0"})
        open(path, "wb").write(urllib.request.urlopen(req).read())
    return path


def logo_asset():
    return _get(LOGO_URL, f"{CACHE}/logo-light-800.png")


def procedural(seed_text):
    """On-brand abstract backdrop used when no AI base image is available."""
    rnd = random.Random(seed_text or "instant")
    im = Image.new("RGB", (W, H), INK)
    d = ImageDraw.Draw(im, "RGBA")
    cx, cy = int(W * (0.42 + rnd.random() * 0.24)), int(H * (0.42 + rnd.random() * 0.2))
    for r in range(470, 0, -6):
        d.ellipse([cx - r, cy - int(r * .8), cx + r, cy + int(r * .8)],
                  fill=AMBER + (int(30 * (1 - r / 470) ** 2.2),))
    for _ in range(60):
        s = rnd.randint(14, 92)
        x, y = int(rnd.gauss(cx, 230)), int(rnd.gauss(cy, 175))
        d.rounded_rectangle([x, y, x + s, y + int(s * .62)], radius=6,
                            outline=AMBER + (rnd.randint(20, 135),), width=2)
    for _ in range(220):
        x, y = int(rnd.gauss(cx, 280)), int(rnd.gauss(cy, 215))
        s = rnd.randint(1, 4)
        d.ellipse([x, y, x + s, y + s], fill=AMBER + (rnd.randint(60, 210),))
    return im.filter(ImageFilter.GaussianBlur(0.4))


def fit_cover(im, w, h):
    im = im.convert("RGB")
    s = max(w / im.width, h / im.height)
    im = im.resize((max(w, int(im.width * s)), max(h, int(im.height * s))), Image.LANCZOS)
    l, t = (im.width - w) // 2, (im.height - h) // 2
    return im.crop((l, t, l + w, t + h))


def quieter_corner(im, box_w, box_h):
    """Return 'left' or 'right' — whichever top corner is darker and flatter,
    so the logo lands on the calmest part of the artwork."""
    def score(x0):
        crop = im.crop((x0, 0, x0 + box_w + PAD, box_h + PAD)).convert("L")
        st = ImageStat.Stat(crop)
        return st.mean[0] + st.stddev[0] * 1.4      # bright + busy = bad
    return "left" if score(0) <= score(W - box_w - PAD) else "right"


def build(base_path, out_path, seed_text=""):
    canvas = procedural(seed_text) if base_path in ("none", "", None) \
        else fit_cover(Image.open(base_path), W, H)

    # Very light global grade only — the artwork is the point now, so it is not
    # dimmed the way it was when type had to sit on top of it.
    canvas = Image.blend(canvas, Image.new("RGB", (W, H), INK), 0.08)
    canvas = ImageEnhance.Color(canvas).enhance(1.06)

    logo = Image.open(logo_asset()).convert("RGBA")
    logo = logo.resize((LOGO_W, int(logo.height * LOGO_W / logo.width)), Image.LANCZOS)

    side = quieter_corner(canvas, LOGO_W, logo.height)
    lx = PAD if side == "left" else W - PAD - LOGO_W
    ly = PAD - 8

    # Soft dark halo so the logo holds against bright or busy artwork
    halo = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    mask = logo.split()[3].filter(ImageFilter.GaussianBlur(22)).point(lambda p: min(255, int(p * 1.7)))
    halo.paste(Image.new("RGBA", logo.size, INK + (255,)), (lx, ly), mask)
    canvas = Image.alpha_composite(canvas.convert("RGBA"), halo).convert("RGB")
    canvas.paste(logo, (lx, ly), logo)

    canvas.save(out_path, "WEBP", quality=84, method=6)
    return out_path


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(__doc__); sys.exit(1)
    print(build(sys.argv[1], sys.argv[2], sys.argv[3] if len(sys.argv) > 3 else ""))
