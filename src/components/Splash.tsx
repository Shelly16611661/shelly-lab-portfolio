import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Sparkle, ChevronDown } from "lucide-react";
import { useLang } from "../i18n";

const SPARKS = [
  { top: "14%", left: "12%", s: 14, d: "2.6s", delay: "0s" },
  { top: "22%", left: "82%", s: 22, d: "3.4s", delay: ".5s" },
  { top: "64%", left: "8%", s: 18, d: "3s", delay: "1.1s" },
  { top: "72%", left: "88%", s: 12, d: "2.2s", delay: ".2s" },
  { top: "38%", left: "6%", s: 10, d: "2.8s", delay: ".8s" },
  { top: "30%", left: "94%", s: 16, d: "3.6s", delay: "1.4s" },
  { top: "84%", left: "30%", s: 14, d: "2.4s", delay: ".6s" },
  { top: "10%", left: "48%", s: 12, d: "3.2s", delay: "1.8s" },
  { top: "80%", left: "62%", s: 20, d: "2.9s", delay: ".3s" },
  { top: "48%", left: "92%", s: 10, d: "2.1s", delay: "1.5s" },
];

export default function Splash({ onDone }: { onDone: () => void }) {
  const { c, lang, toggle } = useLang();
  const [visitors, setVisitors] = useState(1024);

  // retro visitor counter ticks
  useEffect(() => {
    const id = setInterval(() => {
      setVisitors((v) => v + (Math.random() > 0.5 ? 1 : 0) + Math.floor(Math.random() * 2));
    }, 1400);
    return () => clearInterval(id);
  }, []);

  // lock scroll + auto-enter fallback
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const fallback = setTimeout(onDone, 6500);
    return () => {
      document.body.style.overflow = "";
      clearTimeout(fallback);
    };
  }, [onDone]);

  const counter = useMemo(() => visitors.toLocaleString("en-US").padStart(7, "0"), [visitors]);

  return (
    <motion.div
      role="button"
      aria-label="Enter site"
      onClick={onDone}
      className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-void px-6 text-center select-none"
      exit={{ opacity: 0, scale: 1.07, filter: "blur(10px)" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(700px_380px_at_50%_38%,rgba(90,63,114,.45),transparent_65%)]" />

      {/* language switch at the gate */}
      <button
        onClick={(e) => { e.stopPropagation(); toggle(); }}
        className="absolute top-5 right-5 flex items-center gap-1.5 rounded-full border border-wisteria/25 bg-jacarta/40 px-4 py-1.5 font-retro text-sm tracking-[0.2em] text-wisteria/80 backdrop-blur transition-colors hover:border-wisteria/70 hover:text-mist"
      >
        {lang === "zh" ? "EN" : "中文"} ✦
      </button>

      {SPARKS.map((s, i) => (
        <Sparkle
          key={i}
          aria-hidden
          className="animate-twinkle absolute text-wisteria/70"
          style={{ top: s.top, left: s.left, width: s.s, height: s.s, ["--tw-dur" as string]: s.d, animationDelay: s.delay }}
          fill="currentColor"
        />
      ))}

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="relative font-retro text-sm tracking-[0.45em] text-lav"
      >
        SHELLY WU PRESENTS 呈獻
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 26, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: -2 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 90, damping: 14 }}
        className="relative mt-4 font-sticker text-[13vw] leading-none text-transparent sm:text-7xl md:text-8xl"
        style={{
          backgroundImage: "linear-gradient(120deg,#E6EFF7 10%,#BEAEDB 45%,#F2A7D8 80%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          filter: "drop-shadow(0 0 34px rgba(190,174,219,.35))",
        }}
      >
        {c.splash.title}
      </motion.h1>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.55, duration: 0.7 }}
        className="relative my-5 flex w-56 max-w-[70vw] items-center gap-3 sm:w-72"
      >
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-wisteria/60 to-wisteria/20" />
        <Sparkle className="h-4 w-4 text-bubble" fill="currentColor" />
        <span className="h-px flex-1 bg-gradient-to-l from-transparent via-wisteria/60 to-wisteria/20" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
        className="relative text-sm tracking-[0.3em] text-wisteria/80 sm:text-base"
        style={{ fontFamily: "'Noto Serif TC', serif" }}
      >
        {c.splash.sub}
      </motion.p>

      {/* retro visitor counter */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85 }}
        className="relative mt-8 flex items-center gap-3 rounded-full border border-wisteria/20 bg-jacarta/40 px-5 py-2 backdrop-blur"
      >
        <span className="h-2 w-2 rounded-full bg-bubble pulse-dot" />
        <span className="font-retro text-base tracking-widest text-lav">{c.splash.visitors}</span>
        <span className="font-retro text-xl tracking-[0.2em] text-mist tabular-nums">{counter}</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-16 flex flex-col items-center gap-1.5 text-wisteria/60"
      >
        <span className="text-[11px] font-medium tracking-[0.4em] uppercase">{c.splash.hint}</span>
        <ChevronDown className="animate-bob h-4 w-4" />
      </motion.div>

      <p className="absolute bottom-5 font-retro text-xs tracking-[0.35em] text-lav/50">{c.splash.est}</p>
    </motion.div>
  );
}
