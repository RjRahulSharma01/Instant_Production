import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useIsTouch } from '../../lib/useMediaQuery';

/**
 * StudioWave — an interactive audio/video timeline visual.
 *
 * A bank of bars breathes on a slow sine wave with a playhead sweeping across,
 * the way a waveform looks in an edit timeline. Bars near the pointer swell,
 * so the whole thing reacts as you move across it.
 *
 * Drawn on a canvas rather than as DOM nodes so 64 animated bars cost one
 * paint instead of 64 layout operations. Under prefers-reduced-motion it
 * renders a single static frame and never starts the loop.
 */
export default function StudioWave({ className = '', bars = 64, height = 132 }) {
  // fewer, shorter bars on a narrow screen
  const reduce = useReducedMotion();
  const touch = useIsTouch();
  // A 60fps canvas loop is a real battery and jank cost on a phone, and the
  // pointer interaction it exists for does not apply to touch.
  const still = reduce || touch;
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const pointer = useRef({ x: -999, active: false });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return undefined;

    const ctx = canvas.getContext('2d');
    let raf;
    let width = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let draw = () => {};

    const resize = () => {
      width = wrap.clientWidth;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // When static there is no animation loop to pick up the new size, so
      // repaint here. Without this the canvas stays blank whenever the first
      // measurement happens before layout (which is the norm on mobile).
      if (still) draw(0);
    };

    draw = (t) => {
      const gap = width < 480 ? 2 : 3;
      const barW = Math.max(2, width / bars - gap);
      ctx.clearRect(0, 0, width, height);

      const playhead = still ? 0.35 : ((t / 4200) % 1);
      const px = playhead * width;

      for (let i = 0; i < bars; i += 1) {
        const x = i * (barW + gap);
        const centre = x + barW / 2;

        // base shape: two offset sines so it never looks mechanically regular
        const phase = still ? 0 : t / 620;
        let amp =
          0.42 +
          0.3 * Math.sin(i * 0.32 + phase) +
          0.18 * Math.sin(i * 0.11 - phase * 0.7);

        // swell toward the pointer
        if (pointer.current.active) {
          const d = Math.abs(centre - pointer.current.x);
          amp += Math.max(0, 1 - d / 140) * 0.75;
        }

        // brighten just behind the playhead
        const trail = Math.max(0, 1 - Math.abs(centre - px) / 90);

        amp = Math.max(0.06, Math.min(1.25, amp));
        const h = amp * (height * 0.66);
        const y = (height - h) / 2;

        const g = ctx.createLinearGradient(0, y, 0, y + h);
        const a = 0.22 + trail * 0.7;
        g.addColorStop(0, `rgba(245, 158, 11, ${Math.min(1, a)})`);
        g.addColorStop(1, `rgba(245, 158, 11, ${Math.min(1, a * 0.28)})`);
        ctx.fillStyle = g;

        const r = Math.min(barW / 2, 2);
        ctx.beginPath();
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(x, y, barW, h, r);
        } else {
          // Safari < 16.4 has no roundRect
          ctx.rect(x, y, barW, h);
        }
        ctx.fill();
      }

      // playhead
      if (!still) {
        ctx.fillStyle = 'rgba(245, 158, 11, 0.85)';
        ctx.fillRect(px, 0, 1, height);
        ctx.fillStyle = 'rgba(245, 158, 11, 0.14)';
        ctx.fillRect(px - 14, 0, 14, height);
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    if (still) {
      draw(0);
    } else {
      const loop = (t) => {
        draw(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [bars, height, still]);

  const onMove = (e) => {
    const r = wrapRef.current?.getBoundingClientRect();
    if (!r) return;
    pointer.current = { x: e.clientX - r.left, active: true };
  };
  const onLeave = () => {
    pointer.current = { x: -999, active: false };
    setHovered(false);
  };

  return (
    <div
      ref={wrapRef}
      onPointerMove={onMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={onLeave}
      className={`relative overflow-hidden rounded-card border border-white/10 bg-black/40 ${className}`}
      aria-hidden="true"
    >
      <div className="flex items-center justify-between px-5 pt-4 text-[11px] uppercase tracking-[0.28em] text-zinc-500">
        <span className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
          </span>
          In the studio
        </span>
        <span className={`transition-opacity duration-300 ${hovered ? 'opacity-100 text-brand' : 'opacity-50'}`}>
          {hovered ? 'scrubbing' : 'timeline'}
        </span>
      </div>
      <canvas ref={canvasRef} className="block w-full" />
    </div>
  );
}
