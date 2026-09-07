import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Clapperboard, Sparkle, Star, MailOpen } from "lucide-react";
import { useLang } from "../i18n";
import { LINKS, scrollToId } from "../config";
import { heroShots } from "../data/gallery";

const [eyeshadowImg, museImg, serumImg] = heroShots;

/* ── typewriter ─────────────────────────────── */
function useTypewriter(lines: string[]) {
  const [text, setText] = useState("");
  useEffect(() => {
    let li = 0, ci = 0, del = false, timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const line = lines[li];
      if (!del) {
        ci++;
        setText(line.slice(0, ci));
        timer = setTimeout(tick, ci === line.length ? 1600 : 85);
        if (ci === line.length) del = true;
      } else {
        ci--;
        setText(line.slice(0, ci));
        if (ci === 0) { del = false; li = (li + 1) % lines.length; }
        timer = setTimeout(tick, 32);
      }
    };
    timer = setTimeout(tick, 350);
    return () => clearTimeout(timer);
  }, [lines]);
  return text;
}

/* ── rotating text badge ────────────────────── */
function OrbitBadge({ text }: { text: string }) {
  return (
    <div className="relative grid h-28 w-28 place-items-center sm:h-32 sm:w-32">
      <svg viewBox="0 0 100 100" className="animate-spin-slower absolute inset-0 h-full w-full">
        <defs>
          <path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-wisteria" style={{ fontSize: "9.2px", letterSpacing: "2.6px", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600 }}>
          <textPath href="#circ">{text}</textPath>
        </text>
      </svg>
      <span className="grid h-12 w-12 place-items-center rounded-full border border-wisteria/40 bg-jacarta/60 shadow-[0_0_28px_rgba(190,174,219,.3)]">
        <Star className="h-5 w-5 text-stardust" fill="currentColor" />
      </span>
    </div>
  );
}

/* ── polaroid (float on wrapper, tilt/hover on figure → no transform conflicts) ── */
function Polaroid({ src, cap, tilt, delay, dur }: { src: string; cap: string; tilt: number; delay: number; dur: number }) {
  return (
    <div className="animate-floaty" style={{ ["--tilt" as string]: "0deg", ["--fl-dur" as string]: `${dur}s` }}>
      <motion.figure
        initial={{ opacity: 0, y: 46, rotate: tilt * 2.4 }}
        animate={{ opacity: 1, y: 0, rotate: tilt }}
        transition={{ delay, type: "spring", stiffness: 70, damping: 13 }}
        whileHover={{ rotate: 0, scale: 1.07, zIndex: 30 }}
        className="relative w-28 cursor-pointer rounded-md bg-[#f4f1fa] p-1.5 pb-5 shadow-[0_14px_36px_rgba(0,0,0,.5)] sm:w-32 md:w-36"
      >
        <span className="absolute -top-2 left-1/2 h-4 w-12 -translate-x-1/2 -rotate-3 rounded-sm bg-wisteria/50 backdrop-blur-[1px]" />
        <img src={src} alt={cap} draggable={false} className="aspect-square w-full rounded-[3px] object-cover" loading="eager" />
        <figcaption className="absolute inset-x-0 bottom-1 text-center font-retro text-[13px] tracking-wider text-coffee/80">
          {cap}
        </figcaption>
      </motion.figure>
    </div>
  );
}

export default function Hero() {
  const { c } = useLang();
  const typed = useTypewriter(c.hero.roles);

  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col overflow-hidden pt-16">
      {/* oversized ghost type */}
      <div aria-hidden className="pointer-events-none absolute -top-6 right-[-4%] hidden select-none font-display text-[24vw] leading-none font-black italic text-outline opacity-[0.13] lg:block">
        AIGC
      </div>
      <Sparkle aria-hidden className="animate-twinkle absolute top-[18%] left-[46%] hidden h-6 w-6 text-bubble/70 md:block" fill="currentColor" style={{ ["--tw-dur" as string]: "3s" }} />
      <Sparkle aria-hidden className="animate-twinkle absolute bottom-[30%] left-[6%] hidden h-4 w-4 text-wisteria/60 md:block" fill="currentColor" style={{ ["--tw-dur" as string]: "2.2s", animationDelay: ".7s" }} />

      <div className="mx-auto flex w-full max-w-[1500px] flex-1 flex-col items-center gap-10 px-5 pb-24 sm:px-8 lg:flex-row lg:items-center lg:gap-6">
        {/* ── Copy ── */}
        <div className="relative z-10 flex-1 pt-10 text-center lg:pt-16 lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-wisteria/25 bg-jacarta/40 px-4 py-1.5 font-retro text-xs tracking-[0.25em] text-wisteria sm:text-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-bubble pulse-dot" />
            {c.hero.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 font-display text-[clamp(2.6rem,8vw,5.8rem)] leading-[1.02] font-black"
          >
            <span className="block text-lg font-medium tracking-wide text-lav sm:text-xl" style={{ fontFamily: "'Noto Sans TC',sans-serif" }}>
              {c.hero.hi}
            </span>
            <span className="mt-1 block bg-gradient-to-br from-mist via-wisteria to-bubble bg-clip-text text-transparent">
              {c.hero.name}
            </span>
            <span className="mt-2 block font-display text-[0.42em] font-bold tracking-[0.14em] text-mist/85 italic">
              {c.hero.nameEn}
            </span>
          </motion.h1>

          {/* typewriter */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-5 flex h-9 items-center justify-center gap-2 font-retro text-xl text-stardust sm:text-2xl">
            <Sparkle className="h-4 w-4 shrink-0" fill="currentColor" />
            <span className="block w-[15ch] text-left">
              {typed}
              <span className="animate-blink text-wisteria">▌</span>
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42 }}
            className="mx-auto mt-5 max-w-xl text-[15px] leading-8 text-mist/55 sm:text-base lg:mx-0"
          >
            {c.hero.desc}
          </motion.p>

          {/* anti-scam note — her original words */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mx-auto mt-3 flex max-w-xl items-start justify-center gap-2 text-[12.5px] leading-6 text-lav/60 lg:mx-0 lg:justify-start"
          >
            <MailOpen className="mt-0.5 h-3.5 w-3.5 shrink-0 text-stardust/70" />
            {c.hero.note}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3.5 lg:justify-start"
          >
            <button
              onClick={() => scrollToId("lab")}
              className="group relative cursor-pointer overflow-hidden rounded-full bg-gradient-to-r from-jacarta-2 to-lav px-7 py-3.5 text-sm font-bold tracking-wide text-mist shadow-[0_10px_36px_rgba(117,97,157,.4)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span className="sheen absolute inset-0" />
              <span className="relative flex items-center gap-2">
                {c.hero.cta1}
                <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </span>
            </button>
            <a
              href={LINKS.film}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 rounded-full border border-wisteria/40 px-7 py-3.5 text-sm font-bold tracking-wide text-wisteria transition-all duration-300 hover:-translate-y-0.5 hover:border-wisteria hover:bg-wisteria/10 hover:shadow-[0_0_30px_rgba(190,174,219,.2)]"
            >
              <Clapperboard className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
              {c.hero.cta2}
            </a>
          </motion.div>
        </div>

        {/* ── Polaroid cluster + badge ── */}
        <div className="relative z-10 mt-4 flex shrink-0 items-end justify-center gap-2 pr-2 lg:mt-0 lg:flex-1 lg:justify-center lg:pb-6">
          <div className="z-10 -mr-7 sm:-mr-9"><Polaroid src={eyeshadowImg} cap={c.hero.polaroids[1]} tilt={-9} delay={0.35} dur={6.2} /></div>
          <div className="z-20 -mb-4"><Polaroid src={museImg} cap={c.hero.polaroids[2]} tilt={3} delay={0.5} dur={5.2} /></div>
          <div className="z-10 -ml-7 sm:-ml-9"><Polaroid src={serumImg} cap={c.hero.polaroids[0]} tilt={10} delay={0.65} dur={7} /></div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.85, type: "spring", stiffness: 160, damping: 14 }}
            className="absolute -top-16 right-0 sm:-right-2 lg:-top-10 lg:right-6"
          >
            <OrbitBadge text={c.hero.badge} />
          </motion.div>
        </div>
      </div>

      {/* scroll hint */}
      <motion.button
        onClick={() => scrollToId("lab")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-[4.6rem] left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 text-wisteria/50 transition-colors hover:text-wisteria md:flex"
      >
        <span className="text-[10px] font-bold tracking-[0.4em] uppercase">{c.hero.scroll}</span>
        <ArrowDown className="animate-bob h-4 w-4" />
      </motion.button>

      {/* ── crossing marquee ribbons (retro fan-site ticker) ── */}
      <div className="pointer-events-none relative -mt-6 mb-0 h-20 select-none">
        <div className="absolute top-6 left-1/2 w-[120%] -translate-x-1/2 rotate-[-2deg] overflow-hidden border-y border-bubble/30 bg-jacarta/80 py-2 backdrop-blur-sm">
          <div className="ribbon-l flex w-max items-center gap-6 whitespace-nowrap" style={{ ["--dur" as string]: "30s" }}>
            {[...Array(2)].flatMap((_, k) =>
              c.hero.marquee.map((m, i) => (
                <span key={`${k}-${i}`} className="flex items-center gap-6 font-sticker text-[13px] tracking-wider text-wisteria">
                  {m}
                  <Sparkle className="h-3 w-3 text-bubble" fill="currentColor" />
                </span>
              ))
            )}
          </div>
        </div>
        <div className="absolute top-9 left-1/2 w-[120%] -translate-x-1/2 rotate-[1.4deg] overflow-hidden border-y border-wisteria/20 bg-abyss/90 py-1.5">
          <div className="ribbon-r flex w-max items-center gap-6 whitespace-nowrap" style={{ ["--dur" as string]: "38s" }}>
            {[...Array(2)].flatMap((_, k) =>
              [...c.hero.marquee].reverse().map((m, i) => (
                <span key={`${k}-${i}`} className="flex items-center gap-6 font-retro text-[13px] tracking-[0.25em] text-lav/80">
                  {m}
                  <Star className="h-2.5 w-2.5 text-stardust/70" fill="currentColor" />
                </span>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
