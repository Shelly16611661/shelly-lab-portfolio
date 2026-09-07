import { useEffect, useRef } from "react";

interface P {
  x: number; y: number;
  vx: number; vy: number;
  life: number; max: number;
  size: number; rot: number; vr: number;
  hue: string;
}

const HUES = ["190,174,219", "230,239,247", "242,167,216", "249,230,168"];

/** Sparkle trail + aurora glow + click bursts. Works for mouse & touch (pointer events). */
export default function CursorFX() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    const parts: P[] = [];
    const cursor = { x: -200, y: -200, gx: -200, gy: -200, seen: false };
    let downScale = 0;
    let hovering = false;
    let last = { x: -200, y: -200 };
    const fineQuery = matchMedia("(hover:hover) and (pointer:fine)");
    let finePointer = fineQuery.matches;
    const onFineChange = (e: MediaQueryListEvent) => { finePointer = e.matches; };
    fineQuery.addEventListener("change", onFineChange);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const emit = (x: number, y: number, n: number, power = 1) => {
      for (let i = 0; i < n; i++) {
        if (parts.length > 140) parts.shift();
        const a = Math.random() * Math.PI * 2;
        const sp = (0.3 + Math.random() * 1.4) * power;
        parts.push({
          x, y,
          vx: Math.cos(a) * sp + (Math.random() - 0.5) * 0.4,
          vy: Math.sin(a) * sp + (Math.random() - 0.5) * 0.4 - 0.3,
          life: 0,
          max: 34 + Math.random() * 26,
          size: 2 + Math.random() * 4.5,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.12,
          hue: HUES[Math.floor(Math.random() * HUES.length)],
        });
      }
    };

    const drawStar = (p: P, alpha: number) => {
      const s = p.size * (0.6 + 0.4 * (1 - p.life / p.max));
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const ang = (Math.PI / 4) * i;
        const len = i % 2 === 0 ? s : s * 0.36;
        ctx.lineTo(Math.cos(ang) * len, Math.sin(ang) * len);
      }
      ctx.closePath();
      ctx.fillStyle = `rgba(${p.hue},${alpha})`;
      ctx.fill();
      ctx.restore();
    };

    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      cursor.gx += (cursor.x - cursor.gx) * 0.16;
      cursor.gy += (cursor.y - cursor.gy) * 0.16;

      // aurora glow trailing the cursor
      if (cursor.seen && finePointer) {
        const g = ctx.createRadialGradient(cursor.gx, cursor.gy, 0, cursor.gx, cursor.gy, 170);
        g.addColorStop(0, "rgba(190,174,219,0.075)");
        g.addColorStop(0.55, "rgba(117,97,157,0.03)");
        g.addColorStop(1, "rgba(117,97,157,0)");
        ctx.fillStyle = g;
        ctx.fillRect(cursor.gx - 170, cursor.gy - 170, 340, 340);

        // reticle ring
        const ringR = (hovering ? 21 : 13) + downScale * 6;
        ctx.beginPath();
        ctx.arc(cursor.x - 0, cursor.y - 0, ringR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(190,174,219,${hovering ? 0.75 : 0.45})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cursor.x, cursor.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(230,239,247,0.9)";
        ctx.fill();
      }

      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.life += 1;
        if (p.life > p.max) { parts.splice(i, 1); continue; }
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.018; // gentle gravity drift
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.rot += p.vr;
        drawStar(p, 0.9 * (1 - p.life / p.max));
      }
      downScale *= 0.86;
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      cursor.seen = true;
      cursor.x = e.clientX;
      cursor.y = e.clientY;
      const moved = Math.hypot(e.clientX - last.x, e.clientY - last.y);
      if (moved > 14) {
        emit(e.clientX, e.clientY, moved > 60 ? 3 : 2);
        last = { x: e.clientX, y: e.clientY };
      }
      const t = e.target as HTMLElement | null;
      hovering = !!t?.closest?.("a,button,[data-cursor]");
    };
    const onDown = (e: PointerEvent) => {
      downScale = 1;
      emit(e.clientX, e.clientY, 16, 2.6);
    };

    resize();
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      fineQuery.removeEventListener("change", onFineChange);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="fixed inset-0 z-[70] pointer-events-none" />;
}
