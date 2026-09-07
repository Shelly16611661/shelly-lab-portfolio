import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { RotateCw, Wrench, NotebookPen, ExternalLink, FileText, Clapperboard, ChevronLeft, ChevronRight, MoveHorizontal } from "lucide-react";
import { useLang } from "../i18n";
import { trackA, trackB, trackC, type GalleryItem } from "../data/gallery";

/* ══════════════════════════════════════════════════════════
   FlipCard — image & doc 兩種正面，共用 3D 翻面與背面敘事
   ══════════════════════════════════════════════════════════ */
function FlipCard({ item }: { item: GalleryItem }) {
  const { t, c } = useLang();
  const [pinned, setPinned] = useState(false);

  return (
    <div
      className={`flip group w-52 shrink-0 cursor-pointer sm:w-60 lg:w-[276px] ${pinned ? "is-flipped" : ""}`}
      onClick={() => setPinned((p) => !p)}
      role="button"
      aria-label={t(item.title)}
    >
      <div className="flip-inner relative aspect-[3/4] w-full">
        {/* ── FRONT ── */}
        <div className="flip-face rounded-2xl border border-wisteria/15 bg-jacarta shadow-[0_16px_44px_rgba(0,0,0,.45)] transition-colors duration-300 hover:border-wisteria/40">
          {item.kind === "image" ? (
            <>
              <img
                src={item.img}
                alt={t(item.title)}
                loading="lazy"
                draggable={false}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <span className="absolute top-2.5 right-2.5 font-retro text-base tracking-widest text-mist/85 drop-shadow-[0_1px_6px_rgba(0,0,0,.8)]">
                {item.no}
              </span>
            </>
          ) : (
            <div
              className="relative flex h-full w-full flex-col items-center justify-center gap-2 px-5 text-center"
              style={{
                background: `radial-gradient(130% 90% at 20% 0%, ${item.tint}30 0%, transparent 55%), linear-gradient(160deg, #3F2A52 0%, #160B21 80%)`,
              }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-2 right-3 font-display text-[72px] leading-none font-black italic text-wisteria/10 select-none"
              >
                {item.no}
              </span>
              <span className="grid h-16 w-16 place-items-center rounded-2xl border border-wisteria/25 bg-void/40 shadow-[0_0_30px_rgba(190,174,219,.15)]">
                {item.badgeIcon === "film" ? (
                  <Clapperboard className="h-7 w-7 text-bubble" />
                ) : (
                  <FileText className="h-7 w-7 text-wisteria" />
                )}
              </span>
              <p className="font-retro text-sm tracking-[0.3em] text-lav">{t(item.tag)}</p>
              <p
                className="px-1 text-[15.5px] leading-snug font-bold text-mist"
                style={{ fontFamily: "'Noto Serif TC',serif" }}
              >
                {t(item.title)}
              </p>
              <p className="text-[11px] text-wisteria/75">{t(item.sub)}</p>
              <span className="mt-2 flex items-center gap-1.5 text-[9px] font-bold tracking-[0.24em] text-wisteria/55 uppercase">
                <RotateCw className="h-3 w-3" /> {c.lab.flipHint}
              </span>
              <span className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-wisteria/40 to-transparent" />
            </div>
          )}
          {item.kind === "image" && (
            <span className="absolute top-2.5 left-2.5 rounded-full border border-mist/20 bg-void/55 px-2.5 py-1 font-retro text-[11px] tracking-[0.18em] text-wisteria backdrop-blur-sm">
              {t(item.tag)}
            </span>
          )}
          {item.kind === "image" && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-void/95 via-void/45 to-transparent px-3.5 pt-12 pb-3">
              <p className="font-display text-[15px] font-bold tracking-wide text-mist">{t(item.title)}</p>
              <p className="mt-0.5 text-[11px] leading-snug text-wisteria/85">{t(item.sub)}</p>
            </div>
          )}
          <span className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_0_1px_rgba(230,239,247,.06)]" />
        </div>

        {/* ── BACK ── */}
        <div
          className="flip-face flip-back-face flex flex-col rounded-2xl border border-wisteria/25 p-4 sm:p-5"
          style={{
            background: `radial-gradient(130% 90% at 15% 0%, ${item.tint}2e 0%, transparent 55%), linear-gradient(155deg, #3F2A52 0%, #160B21 78%)`,
          }}
        >
          <span aria-hidden className="pointer-events-none absolute -top-3 right-2 font-display text-[64px] leading-none font-black italic text-wisteria/10 select-none">
            {item.no}
          </span>
          <p className="font-display text-[15px] leading-snug font-bold text-wisteria sm:text-base">{t(item.title)}</p>
          <p className="mt-1 text-[10px] tracking-wide text-mist/45 sm:text-[11px]">{t(item.sub)}</p>

          <div className="mt-2.5 flex items-center gap-1.5 border-t border-dashed border-wisteria/25 pt-2.5">
            <NotebookPen className="h-3.5 w-3.5 shrink-0 text-stardust" />
            <span className="text-[10px] font-bold tracking-[0.24em] text-stardust/90 uppercase">{c.lab.story}</span>
          </div>
          <p className="mt-2 flex-1 overflow-y-auto pr-1 text-[12px] leading-6 text-mist/75 sm:text-[12.5px]">
            {t(item.story)}
          </p>

          <div className="mt-2 flex items-center gap-1.5">
            <Wrench className="h-3 w-3 shrink-0 text-lav" />
            <span className="text-[9px] font-bold tracking-[0.24em] text-lav uppercase">{c.lab.tools}</span>
          </div>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {item.tools.map((tool) => (
              <span key={tool} className="rounded-full border border-wisteria/25 bg-wisteria/8 px-2 py-0.5 text-[10px] font-semibold text-wisteria/90">
                {tool}
              </span>
            ))}
          </div>

{item.link && item.linkLabel && (
  <a
    href={item.link}
    target="_blank"
    rel="noreferrer"
    download // 添加这一行，强制下载
    onClick={(e) => {
      e.stopPropagation();
      // 让浏览器默认行为处理下载，不用preventDefault
    }}
    aria-label={`${c.lab.openLink}: ${t(item.title)}`}
    className="sheen mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-gradient-to-r from-jacarta-2 to-lav px-4 py-1.5 text-[11px] font-bold text-mist shadow-[0_6px_18px_rgba(117,97,157,.35)] transition-transform duration-300 hover:-translate-y-0.5"
  >
    <ExternalLink className="h-3 w-3" />
    {t(item.linkLabel)}
  </a>
)}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   Track — rAF marquee + 使用者可拖曳滑動 + 箭頭跳頁
   ══════════════════════════════════════════════════════════ */
interface TrackMeta { code: string; name: string; en: string; speed: string }

function Track({
  items, dir, baseSpeed, meta,
}: {
  items: GalleryItem[];
  dir: "left" | "right";
  baseSpeed: number;
  meta: TrackMeta;
}) {
  const { c } = useLang();
  const vpRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLDivElement>(null);
  const seqW = useRef(0);
  const pos = useRef(0);
  const cur = useRef(baseSpeed);
  const target = useRef(baseSpeed);
  const boost = useRef(0);
  const jump = useRef(0);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const drag = useRef({ active: false, x: 0, dist: 0 });
  const suppressClick = useRef(0);
  const [copies, setCopies] = useState(4);
  const [paused, setPaused] = useState(false);
  const [grabbing, setGrabbing] = useState(false);
  const sign = dir === "left" ? 1 : -1;

  useLayoutEffect(() => {
    const measure = () => {
      const s = seqRef.current?.offsetWidth ?? 0;
      if (s > 0) {
        seqW.current = s;
        const vp = vpRef.current?.offsetWidth || window.innerWidth;
        setCopies(Math.max(3, Math.ceil((vp + s * 2) / s)));
      }
    };
    measure();
    const late = setTimeout(measure, 800);
    window.addEventListener("resize", measure);
    return () => { window.removeEventListener("resize", measure); clearTimeout(late); };
  }, []);

  /* scroll-velocity boost */
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      boost.current = Math.min(220, boost.current + Math.abs(y - lastY) * 1.1);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* trackpad / wheel horizontal scroll (does NOT hijack vertical page scroll) */
  useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > 3 && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        pos.current += e.deltaX;
        pauseNow();
        resumeSoon(2500);
      }
    };
    vp.addEventListener("wheel", onWheel, { passive: false });
    return () => vp.removeEventListener("wheel", onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* rAF engine */
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      cur.current += (target.current - cur.current) * 0.1;
      boost.current *= 0.94;
      // arrow jump easing
      if (Math.abs(jump.current) > 0.5) {
        const step = jump.current * 0.11;
        pos.current -= step;
        jump.current -= step;
      } else {
        jump.current = 0;
      }
      pos.current -= (cur.current + boost.current) * sign * dt;
      const s = seqW.current;
      if (s > 0) {
        while (pos.current <= -s) pos.current += s;
        while (pos.current > 0) pos.current -= s;
      }
      const el = vpRef.current?.firstElementChild as HTMLElement | null;
      if (el) el.style.transform = `translate3d(${pos.current}px,0,0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [sign]);

  const pauseNow = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    target.current = 0;
    setPaused(true);
  };
  const resumeSoon = (ms: number) => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      target.current = baseSpeed;
      setPaused(false);
    }, ms);
  };

  /* ── drag to scrub ── */
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { active: true, x: e.clientX, dist: 0 };
    setGrabbing(true);
    pauseNow();
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.x;
    drag.current.x = e.clientX;
    drag.current.dist += dx;
    pos.current += dx;
  };
  const onPointerUp = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setGrabbing(false);
    if (Math.abs(drag.current.dist) > 8) {
      suppressClick.current = Date.now(); // 拖曳後不觸發卡片翻面
    }
    resumeSoon(2000);
  };
  const onClickCapture = (e: React.SyntheticEvent) => {
    if (Date.now() - suppressClick.current < 120) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div className="relative" data-track>
      <div className="mx-auto mb-3 flex max-w-[1500px] items-center gap-3 px-5 sm:px-8">
        <span className="flex items-center gap-2 rounded-full border border-wisteria/25 bg-jacarta/40 px-3 py-1 font-retro text-[13px] tracking-[0.2em] text-wisteria">
          <span className={`h-1.5 w-1.5 rounded-full ${paused ? "bg-stardust" : "bg-bubble pulse-dot"}`} />
          {meta.code}
        </span>
        <span className="font-display text-sm font-bold text-mist/90 sm:text-base">
          {meta.name}
          <span className="ml-2 font-retro text-xs tracking-[0.25em] text-lav/80">{meta.en}</span>
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-wisteria/35 to-transparent" />
        <span className="hidden font-retro text-xs tracking-[0.2em] text-lav/60 sm:block">{meta.speed}</span>
        <span className="hidden items-center gap-1 text-[9px] font-bold tracking-[0.18em] text-lav/45 uppercase md:flex">
          <MoveHorizontal className="h-3 w-3" /> {c.lab.dragHint}
        </span>
        {/* arrows */}
        <div className="flex gap-1.5">
          <button
            onClick={() => { jump.current -= 840; pauseNow(); resumeSoon(2600); }}
            aria-label="Previous"
            className="grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-wisteria/25 bg-jacarta/40 text-wisteria transition-all duration-200 hover:border-wisteria/70 hover:bg-jacarta hover:shadow-[0_0_16px_rgba(190,174,219,.25)]"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => { jump.current += 840; pauseNow(); resumeSoon(2600); }}
            aria-label="Next"
            className="grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-wisteria/25 bg-jacarta/40 text-wisteria transition-all duration-200 hover:border-wisteria/70 hover:bg-jacarta hover:shadow-[0_0_16px_rgba(190,174,219,.25)]"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={vpRef}
        className={`overflow-hidden py-3 select-none [mask-image:linear-gradient(90deg,transparent,black_5%,black_95%,transparent)] ${
          grabbing ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerEnter={(e) => e.pointerType === "mouse" && pauseNow()}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse" && !drag.current.active) resumeSoon(2000);
        }}
        onClickCapture={onClickCapture}
      >
        <div className="flex w-max">
          {Array.from({ length: copies }).map((_, k) => (
            <div key={k} ref={k === 0 ? seqRef : undefined} className="flex gap-5 pr-5" aria-hidden={k > 0}>
              {items.map((item) => (
                <FlipCard key={`${k}-${item.id}`} item={item} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   Section — 作品廊道（極簡標頭）
   ══════════════════════════════════════════════════════════ */
export default function Corridor() {
  const { c } = useLang();
  const metas = c.lab.tracks;

  return (
    <section id="lab" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="font-retro text-sm tracking-[0.4em] text-lav"
        >
          {c.lab.kicker}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.08 }}
          className="mt-3 flex flex-wrap items-baseline gap-x-4 font-display text-[clamp(2.6rem,7vw,5rem)] leading-none font-black"
        >
          <span className="bg-gradient-to-br from-mist to-wisteria bg-clip-text text-transparent">{c.lab.titleA}</span>
          <span className="font-sticker text-bubble" style={{ textShadow: "0 0 30px rgba(242,167,216,.35)" }}>
            {c.lab.titleB}
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.16 }}
          className="mt-5 max-w-2xl text-[15px] leading-8 text-mist/55"
        >
          {c.lab.desc}
        </motion.p>
      </div>

      <div className="mt-12 space-y-10">
        <Track items={trackA} dir="left" baseSpeed={30} meta={metas[0]} />
        <Track items={trackB} dir="right" baseSpeed={48} meta={metas[1]} />
        <Track items={trackC} dir="left" baseSpeed={14} meta={metas[2]} />
      </div>

      <p className="mx-auto mt-10 max-w-[1500px] px-5 text-[11px] leading-6 text-lav/45 sm:px-8">
        {c.lab.docNote}
      </p>
    </section>
  );
}
