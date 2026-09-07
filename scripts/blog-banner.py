#!/usr/bin/env python3
"""
blog-banner.py — Instant Production blog banner compositor.

Takes an AI-generated base image and composites the brand layer onto it:
amber category eyebrow, Inter Black headline, amber rule, footer, and the
Instant Production logo. Outputs a 1200x630 WebP for public/images/blog/.

Brand tokens mirror tailwind.config.js — brand #f59e0b, ink #050505, Inter.
Fonts and logo are fetched on first run and cached in /tmp, so the script is
self-contained and needs no repo checkout.

Usage:
  python3 blog-banner.py BASE_IMAGE OUT.webp "Title" "Category" "07 Sep 2026" [left|right]

If BASE_IMAGE is the literal string "none", a procedural on-brand backdrop is
generated instead, so the daily automation still produces a usable banner when
image generation is rate-limited or out of credits.
"""
import os, sys, math, random, urllib.request
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H = 1200, 630
AMBER, INK, WHITE = (245, 158, 11), (5, 5, 5), (255, 255, 255)
PAD, TEXT_W, LOGO_W = 64, 640, 190
CACHE = "/tmp/ip-banner-assets"
LOGO_URL = "https://raw.githubusercontent.com/RjRahulSharma01/Instant_Production/main/public/brand/logo-light-800.png"


def _get(url, path):
    if not os.path.exists(path) or os.path.getsize(path) == 0:
        os.makedirs(os.path.dirname(path), exist_ok=True)
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/4.0"})
        open(path, "wb").write(urllib.request.urlopen(req).read())
    return path


def assets():
    """Fetch Inter (Regular/Bold/Black) + the light logo, cached."""
    out = {}
    for key, wght in (("reg", 400), ("bold", 700), ("black", 900)):
        p = f"{CACHE}/Inter-{wght}.ttf"
        if not os.path.exists(p):
            req = urllib.request.Request(
                f"https://fonts.googleapis.com/css2?family=Inter:wght@{wght}",
                headers={"User-Agent": "Mozilla/4.0"})   # old UA => ttf, not woff2
            css = urllib.request.urlopen(req).read().decode()
            url = css.split("url(")[1].split(")")[0]
            _get(url, p)
        out[key] = p
    out["logo"] = _get(LOGO_URL, f"{CACHE}/logo-light-800.png")
    return out


def procedural(seed_text):
    """On-brand abstract backdrop used when no AI base image is available."""
    rnd = random.Random(seed_text)
    im = Image.new("RGB", (W, H), INK)
    d = ImageDraw.Draw(im, "RGBA")
    cx, cy = int(W * 0.76), int(H * 0.5)
    for r in range(430, 0, -6):                       # amber radial bloom
        a = int(30 * (1 - r / 430) ** 2.2)
        d.ellipse([cx - r, cy - int(r * .8), cx + r, cy + int(r * .8)], fill=AMBER + (a,))
    for i in range(46):                               # drifting geometric shards
        s = rnd.randint(12, 74)
        x = int(rnd.gauss(cx, 190)); y = int(rnd.gauss(cy, 150))
        a = rnd.randint(20, 130)
        d.rounded_rectangle([x, y, x + s, y + int(s * .62)], radius=5,
                            outline=AMBER + (a,), width=2)
    for i in range(150):                              # particles
        x, y = int(rnd.gauss(cx, 240)), int(rnd.gauss(cy, 190))
        s = rnd.randint(1, 4)
        d.ellipse([x, y, x + s, y + s], fill=AMBER + (rnd.randint(60, 210),))
    return im.filter(ImageFilter.GaussianBlur(0.4))


def fit_cover(im, w, h):
    im = im.convert("RGB")
    s = max(w / im.width, h / im.height)
    im = im.resize((max(w, int(im.width * s)), max(h, int(im.height * s))), Image.LANCZOS)
    l, t = (im.width - w) // 2, (im.height - h) // 2
    return im.crop((l, t, l + w, t + h))


def wrap(draw, text, font, maxw):
    lines, cur = [], ""
    for wd in text.split():
        t = (cur + " " + wd).strip()
        if draw.textlength(t, font=font) <= maxw or not cur:
            cur = t
        else:
            lines.append(cur); cur = wd
    if cur: lines.append(cur)
    return lines


def build(base_path, out_path, title, category, date_str, logo_side="right"):
    A = assets()
    canvas = procedural(title) if base_path in ("none", "", None) \
        else fit_cover(Image.open(base_path), W, H)

    canvas = Image.blend(canvas, Image.new("RGB", (W, H), INK), 0.34)

    scrim = Image.new("L", (W, H), 0); sd = ImageDraw.Draw(scrim)
    edge = PAD + TEXT_W + 150
    for x in range(W):
        a = 235 if x < PAD else (int(235 * (1 - ((x - PAD) / (edge - PAD)) ** 1.6)) if x < edge else 0)
        sd.line([(x, 0), (x, H)], fill=a)
    canvas = Image.composite(Image.new("RGB", (W, H), INK), canvas, scrim)

    vig = Image.new("L", (W, H), 0); vd = ImageDraw.Draw(vig)
    for y in range(H - 190, H):
        vd.line([(0, y), (W, y)], fill=int(150 * ((y - (H - 190)) / 190) ** 1.5))
    canvas = Image.composite(Image.new("RGB", (W, H), INK), canvas, vig)

    d = ImageDraw.Draw(canvas)

    ey = ImageFont.truetype(A["bold"], 19); y = PAD + 4
    d.rectangle([PAD, y + 3, PAD + 4, y + 21], fill=AMBER)
    cx = PAD + 20
    for ch in category.upper():
        d.text((cx, y), ch, font=ey, fill=AMBER); cx += d.textlength(ch, font=ey) + 5.2

    for size in range(62, 33, -2):
        hf = ImageFont.truetype(A["black"], size)
        lines = wrap(d, title, hf, TEXT_W); lh = int(size * 1.16)
        if len(lines) <= 4 and len(lines) * lh <= 300:
            break
    ty = y + 58
    for ln in lines:
        d.text((PAD + 2, ty + 2), ln, font=hf, fill=(0, 0, 0))
        d.text((PAD, ty), ln, font=hf, fill=WHITE)
        ty += lh

    ry = H - PAD - 46
    d.rectangle([PAD, ry, PAD + 74, ry + 4], fill=AMBER)
    ff = ImageFont.truetype(A["bold"], 20); rf = ImageFont.truetype(A["reg"], 20)
    d.text((PAD, ry + 20), "instantproduction.in", font=ff, fill=WHITE)
    dw = d.textlength("instantproduction.in", font=ff)
    d.text((PAD + dw + 14, ry + 20), "·", font=rf, fill=AMBER)
    d.text((PAD + dw + 30, ry + 20), date_str, font=rf, fill=(168, 168, 172))

    logo = Image.open(A["logo"]).convert("RGBA")
    logo = logo.resize((LOGO_W, int(logo.height * LOGO_W / logo.width)), Image.LANCZOS)
    lx = W - PAD - LOGO_W if logo_side == "right" else PAD
    ly = PAD - 12
    if logo_side == "right":
        halo = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        hm = logo.split()[3].filter(ImageFilter.GaussianBlur(16)).point(lambda p: min(255, int(p * 1.5)))
        halo.paste(Image.new("RGBA", logo.size, INK + (255,)), (lx, ly), hm)
        canvas = Image.alpha_composite(canvas.convert("RGBA"), halo).convert("RGB")
    canvas.paste(logo, (lx, ly), logo)

    canvas.save(out_path, "WEBP", quality=82, method=6)
    return out_path


if __name__ == "__main__":
    if len(sys.argv) < 6:
        print(__doc__); sys.exit(1)
    print(build(*sys.argv[1:7]) if len(sys.argv) > 6 else build(*sys.argv[1:6]))
