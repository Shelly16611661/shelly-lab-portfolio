import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number; // depth 0.2 – 1 (parallax + size)
  r: number;
  phase: number;
  speed: number;
  sparkle: boolean;
  hue: string;
  boost: number;
}

interface Meteor {
  x: number; y: number; vx: number; vy: number; life: number; max: number;
}

const HUES = ["230,239,247", "190,174,219", "190,174,219", "117,97,157", "242,167,216"];

/** Twinkling star canvas — stars breathe, parallax with cursor, flare when you approach. */
export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let stars: Star[] = [];
    let meteors: Meteor[] = [];
    let raf = 0;
    let lastMeteor = 0;
    const mouse = { x: -9999, y: -9999, ox: 0, oy: 0, tx: 0, ty: 0 };

    const seed = () => {
      const count = Math.min(210, Math.floor((w * h) / 8500));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: 0.2 + Math.random() * 0.8,
        r: 0.4 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 1.1,
        sparkle: Math.random() < 0.16,
        hue: HUES[Math.floor(Math.random() * HUES.length)],
        boost: 0,
      }));
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const drawSparkle = (x: number, y: number, r: number, alpha: number, hue: string) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const ang = (Math.PI / 4) * i;
        const len = i % 2 === 0 ? r * 3.2 : r * 0.9;
        ctx.lineTo(Math.cos(ang) * len, Math.sin(ang) * len);
      }
      ctx.closePath();
      ctx.fillStyle = `rgba(${hue},${alpha})`;
      ctx.fill();
      ctx.restore();
    };

    const spawnMeteor = (t: number) => {
      if (t - lastMeteor < 5200 || meteors.length > 0 || Math.random() > 0.35) return;
      lastMeteor = t;
      const fromLeft = Math.random() > 0.5;
      meteors.push({
        x: fromLeft ? -40 : Math.random() * w,
        y: Math.random() * h * 0.35,
        vx: 7 + Math.random() * 5,
        vy: 2.4 + Math.random() * 1.8,
        life: 0,
        max: 90 + Math.random() * 50,
      });
    };

    const frame = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      mouse.ox += (mouse.tx - mouse.ox) * 0.04;
      mouse.oy += (mouse.ty - mouse.oy) * 0.04;

      for (const s of stars) {
        const tw = 0.24 + 0.76 * (0.5 + 0.5 * Math.sin(t * 0.001 * s.speed + s.phase));
        // cursor proximity → star flares up
        const dx = s.x + mouse.ox * 34 * s.z - mouse.x;
        const dy = s.y + mouse.oy * 34 * s.z - mouse.y;
        const d = Math.hypot(dx, dy);
        const target = d < 150 ? (1 - d / 150) * 0.85 : 0;
        s.boost += (target - s.boost) * 0.08;

        const alpha = Math.min(1, tw * (0.28 + s.z * 0.5) + s.boost);
        const px = s.x + mouse.ox * 34 * s.z;
        const py = s.y + mouse.oy * 34 * s.z;
        const size = s.r * (0.8 + s.boost * 1.1);

        if (s.sparkle) {
          drawSparkle(px, py, size + 0.4, alpha, s.hue);
        } else {
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${s.hue},${alpha})`;
          ctx.fill();
          if (s.boost > 0.25) {
            ctx.beginPath();
            ctx.arc(px, py, size * 3.4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${s.hue},${s.boost * 0.12})`;
            ctx.fill();
          }
        }
      }

      // shooting stars
      spawnMeteor(t);
      meteors = meteors.filter((m) => m.life < m.max);
      for (const m of meteors) {
        m.life += 1;
        m.x += m.vx;
        m.y += m.vy;
        const fade = 1 - m.life / m.max;
        const tail = 26 * fade;
        const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * tail * 0.28, m.y - m.vy * tail * 0.28);
        grad.addColorStop(0, `rgba(230,239,247,${0.85 * fade})`);
        grad.addColorStop(1, "rgba(190,174,219,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.vx * tail * 0.28, m.y - m.vy * tail * 0.28);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(m.x, m.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230,239,247,${0.9 * fade})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.tx = e.clientX / window.innerWidth - 0.5;
      mouse.ty = e.clientY / window.innerHeight - 0.5;
    };

    resize();
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <>
      {/* deep-space wash */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1100px 520px at 82% -10%, rgba(90,63,114,.5), transparent 60%), radial-gradient(900px 600px at -12% 30%, rgba(63,42,82,.55), transparent 62%), radial-gradient(760px 480px at 55% 115%, rgba(58,45,52,.6), transparent 60%)",
        }}
      />
      <canvas ref={ref} aria-hidden className="fixed inset-0 -z-10 pointer-events-none" />
    </>
  );
}
