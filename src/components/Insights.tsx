import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Sparkle, GitFork, Cog, Minus, TriangleAlert, MessagesSquare, Stamp as StampIcon, Star,
} from "lucide-react";
import { useLang } from "../i18n";

/* ── shared bits ─────────────────────────── */
function Points({ list }: { list: string[] }) {
  return (
    <ul className="space-y-1.5">
      {list.map((p, i) => (
        <li key={i} className="flex items-start gap-2 text-[13px] leading-6 text-mist/65 sm:text-[13.5px]">
          <Minus className="mt-[7px] h-3 w-3 shrink-0 text-wisteria/60" />
          {p}
        </li>
      ))}
    </ul>
  );
}

function Punch({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mt-5 rounded-xl border-l-[3px] border-bubble bg-bubble/8 px-4 py-3 text-[13.5px] leading-7 font-medium text-wisteria"
      style={{ fontFamily: "'Noto Serif TC','Playfair Display',serif" }}
    >
      {children}
    </p>
  );
}

function Shell({
  no, tag, title, index, children,
}: {
  no: string; tag: string; title: string; index: number; children: React.ReactNode;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: 0.05 * index, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="glass group relative overflow-hidden rounded-[26px] p-6 sm:p-8"
    >
      <span aria-hidden className="pointer-events-none absolute -top-4 right-4 font-display text-[84px] leading-none font-black italic text-wisteria/8 select-none">
        {no.slice(4)}
      </span>
      <header className="relative flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="rounded-md border border-stardust/40 bg-stardust/10 px-2.5 py-1 font-retro text-sm tracking-[0.22em] text-stardust">
          {no}
        </span>
        <span className="text-[10px] font-bold tracking-[0.3em] text-lav uppercase">{tag}</span>
        <h3 className="w-full font-display text-[22px] font-black text-mist sm:text-[26px]" style={{ fontFamily: "'Playfair Display','Noto Serif TC',serif" }}>
          {title}
        </h3>
      </header>
      {children}
    </motion.article>
  );
}

/* ── OBS-01 · bridge visual ──────────────── */
function BridgeBody({ e }: { e: any }) {
  return (
    <>
      <div className="group/bridge relative mt-6 grid items-stretch gap-3 sm:grid-cols-[1fr_auto_1fr]">
        <div className="rounded-2xl border border-wisteria/20 bg-gradient-to-br from-jacarta-2/60 to-jacarta/40 p-5 text-center transition-all duration-300 group-hover/bridge:border-wisteria/45">
          <p className="font-retro text-xs tracking-[0.28em] text-lav">{e.left.h}</p>
          <p className="mt-2 text-[15px] leading-snug font-bold text-mist">{e.left.s}</p>
        </div>
        <div className="relative flex items-center justify-center py-1 sm:w-40">
          <span aria-hidden className="absolute inset-x-0 top-1/2 hidden border-t-2 border-dashed border-wisteria/30 sm:block" />
          <span aria-hidden className="absolute inset-y-0 left-1/2 border-l-2 border-dashed border-wisteria/30 sm:hidden" />
          <div className="relative z-10 rounded-2xl border border-bubble/50 bg-void px-4 py-2.5 text-center shadow-[0_0_26px_rgba(242,167,216,.18)] transition-all duration-300 group-hover/bridge:-translate-y-1 group-hover/bridge:shadow-[0_0_40px_rgba(242,167,216,.4)]">
            <p className="flex items-center gap-1.5 text-[13px] font-black tracking-wide text-bubble">
              <Sparkle className="h-3.5 w-3.5" fill="currentColor" /> {e.bridge}
            </p>
            <p className="mt-1 max-w-[16ch] text-[10px] leading-4 text-mist/60">{e.bridgeSub}</p>
          </div>
          <span className="absolute -top-1.5 right-0 hidden font-retro text-[10px] tracking-[0.2em] text-lav/60 sm:block">{e.gap}</span>
        </div>
        <div className="rounded-2xl border border-coffee/70 bg-gradient-to-br from-coffee/60 to-abyss/70 p-5 text-center transition-all duration-300 group-hover/bridge:border-lav/50">
          <p className="font-retro text-xs tracking-[0.28em] text-lav">{e.right.h}</p>
          <p className="mt-2 text-[15px] leading-snug font-bold text-mist/85">{e.right.s}</p>
        </div>
      </div>
      <div className="mt-5"><Points list={e.points} /></div>
      <Punch>{e.punch}</Punch>
    </>
  );
}

/* ── OBS-02 · race visual ────────────────── */
function RaceBar({ h, s, pct, tint, dur }: { h: string; s: string; pct: number; tint: string; dur: string }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-retro text-sm tracking-[0.22em] text-mist/85">{h}</p>
        <p className="text-[11px] text-lav/80">{s}</p>
      </div>
      <div className="mt-1.5 h-3.5 overflow-hidden rounded-full bg-void/70 shadow-[inset_0_2px_6px_rgba(0,0,0,.5)]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${tint}00 0%, ${tint} 40%, ${tint}cc 100%)`,
            backgroundSize: "220% 100%",
            animation: `gradient-pan ${dur} linear infinite`,
          }}
        />
      </div>
    </div>
  );
}

function RaceBody({ e }: { e: any }) {
  return (
    <>
      <div className="mt-6 space-y-4">
        <RaceBar h={e.fast.h} s={e.fast.s} pct={94} tint="#F2A7D8" dur="1.4s" />
        <div className="relative">
          <RaceBar h={e.slow.h} s={e.slow.s} pct={20} tint="#75619D" dur="7s" />
          <Cog aria-hidden className="absolute -top-1 left-[19%] h-5 w-5 text-lav/70 animate-spin-slower" />
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        {e.notes.map((n: string, i: number) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 12, rotate: i ? 3 : -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: i ? 2 : -2.5 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.12, type: "spring", stiffness: 200, damping: 14 }}
            whileHover={{ rotate: 0, scale: 1.05 }}
            className="cursor-default rounded-lg bg-[#F5F3E8] px-3.5 py-2 text-[12.5px] font-medium text-coffee shadow-[0_8px_18px_rgba(0,0,0,.35)]"
          >
            {n}
          </motion.span>
        ))}
      </div>
      <div className="mt-5"><Points list={e.points} /></div>
      <Punch>{e.punch}</Punch>
    </>
  );
}

/* ── OBS-03 · fork visual ────────────────── */
function ForkBody({ e }: { e: any }) {
  const Card = ({ p, hot }: { p: any; hot?: boolean }) => (
    <div className={`relative flex-1 rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 ${
      hot
        ? "border-wisteria/45 bg-gradient-to-br from-jacarta/70 to-abyss/70 shadow-[0_0_30px_rgba(190,174,219,.12)]"
        : "border-dashed border-lav/35 bg-void/40"
    }`}>
      <p className={`font-sticker text-lg ${hot ? "text-wisteria" : "text-lav/90"}`}>{p.h}</p>
      <p className="mt-0.5 font-retro text-[11px] tracking-[0.24em] text-lav/70 uppercase">{p.s}</p>
      <p className="mt-2.5 text-[12.5px] leading-6 text-mist/65">{p.d}</p>
    </div>
  );
  return (
    <>
      <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row">
        <Card p={e.pathA} />
        <div className="grid place-items-center">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-wisteria/30 bg-void text-wisteria">
            <GitFork className="h-4.5 w-4.5 rotate-90 sm:rotate-0" />
          </span>
        </div>
        <Card p={e.pathB} hot />
      </div>
      <blockquote
        className="relative mx-auto mt-6 max-w-2xl text-center font-display text-[17px] leading-8 font-bold text-mist/90 italic sm:text-[19px]"
        style={{ fontFamily: "'Playfair Display','Noto Serif TC',serif" }}
      >
        <span aria-hidden className="absolute -top-5 left-0 font-display text-4xl text-bubble/40">「</span>
        {e.quote}
        <span aria-hidden className="absolute -bottom-7 right-0 font-display text-4xl text-bubble/40">」</span>
      </blockquote>
      <Punch>{e.punch}</Punch>
    </>
  );
}

/* ── OBS-04 · echo visual ────────────────── */
function EchoBody({ e }: { e: any }) {
  return (
    <>
      <div className="relative mx-auto mt-6 grid h-44 w-full max-w-md place-items-center overflow-hidden rounded-2xl bg-void/40">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            aria-hidden
            className="absolute h-40 w-40 rounded-full border border-bubble/40"
            style={{ animation: `echoRing 3.2s ease-out ${i * 1.05}s infinite` }}
          />
        ))}
        <span
          aria-hidden
          className="absolute h-64 w-64 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(242,167,216,.12), transparent 65%)" }}
        />
        <div className="relative z-10 flex items-center gap-3">
          <span className="flex items-center gap-2 rounded-full border border-wisteria/40 bg-jacarta/70 px-5 py-2.5 font-retro text-sm tracking-[0.2em] text-mist shadow-[0_0_24px_rgba(190,174,219,.2)]">
            <MessagesSquare className="h-4 w-4 text-bubble" />
            {e.echoA} ⇄ {e.echoB}
          </span>
        </div>
        <span className="absolute bottom-3 flex items-center gap-1.5 rounded-full border border-stardust/40 bg-stardust/10 px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-stardust uppercase">
          <TriangleAlert className="h-3 w-3" />
          {e.warning}
        </span>
      </div>
      <div className="mt-5"><Points list={e.points} /></div>
      <Punch>{e.punch}</Punch>
    </>
  );
}

/* ── OBS-05 · stamp visual ───────────────── */
function StampBody({ e }: { e: any }) {
  const [sealed, setSealed] = useState(false);
  return (
    <>
      <div className="relative mt-6 grid place-items-center overflow-hidden rounded-2xl border border-dashed border-wisteria/25 bg-void/50 px-4 py-8">
        {/* paper texture dots */}
        <span aria-hidden className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(#BEAEDB 1px, transparent 1px)", backgroundSize: "16px 16px" }} />

        <div className="relative grid h-36 w-56 place-items-center">
          <AnimatePresence mode="wait">
            {sealed ? (
              <motion.div
                key="ink"
                initial={{ opacity: 0, scale: 1.7, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: -7 }}
                exit={{ opacity: 0, scale: 1.4 }}
                transition={{ type: "spring", stiffness: 420, damping: 17 }}
                className="grid place-items-center rounded-2xl border-[3px] border-bubble/85 px-6 py-4 text-center"
                style={{ boxShadow: "0 0 0 2px rgba(242,167,216,.2), inset 0 0 22px rgba(242,167,216,.12)" }}
              >
                <Star className="mb-1 h-4 w-4 text-bubble" fill="currentColor" />
                <p className="font-display text-lg font-black tracking-wide text-bubble sm:text-xl" style={{ fontFamily: "'Noto Serif TC',serif" }}>
                  {e.ink}
                </p>
                <p className="mt-1 font-retro text-[11px] tracking-[0.3em] text-bubble/70">{e.inkSub}</p>
              </motion.div>
            ) : (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="border border-dashed border-wisteria/25 px-5 py-3 font-retro text-sm tracking-[0.3em] text-lav/60"
              >
                {e.sealHint}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* the rubber stamp itself */}
        <motion.button
          onClick={() => setSealed((s) => !s)}
          whileTap={{ scale: 0.86, y: 6 }}
          transition={{ type: "spring", stiffness: 500, damping: 18 }}
          aria-label={e.sealHint}
          className="group relative mt-1 cursor-pointer"
        >
          <span className="mx-auto block h-6 w-9 rounded-t-lg bg-gradient-to-b from-[#5d4a56] to-coffee shadow-md transition-transform duration-200 group-hover:-translate-y-1" />
          <span className="mx-auto -mt-0.5 block h-2.5 w-14 rounded-sm bg-coffee/90" />
          <span className="relative mt-1 grid h-12 w-24 place-items-center rounded-lg border border-wisteria/30 bg-gradient-to-br from-jacarta-2 to-jacarta shadow-[0_8px_20px_rgba(0,0,0,.45)] transition-transform duration-200 group-hover:-translate-y-0.5">
            <StampIcon className="h-5 w-5 text-bubble" />
            <span className="absolute inset-x-2 bottom-0.5 text-center font-retro text-[9px] tracking-[0.25em] text-wisteria/70">SEAL · 印</span>
          </span>
        </motion.button>
      </div>
      <div className="mt-5"><Points list={e.points} /></div>
      <Punch>{e.punch}</Punch>
    </>
  );
}

/* ── section ─────────────────────────────── */
const BODIES: Record<string, (p: { e: any }) => React.ReactNode> = {
  bridge: BridgeBody,
  race: RaceBody,
  fork: ForkBody,
  echo: EchoBody,
  stamp: StampBody,
};

export default function Insights() {
  const { c } = useLang();

  return (
    <section id="insights" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="font-retro text-sm tracking-[0.4em] text-lav"
        >
          {c.insights.kicker}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.08 }}
          className="mt-3 flex flex-wrap items-baseline gap-x-4 font-display text-[clamp(2.6rem,7vw,5rem)] leading-none font-black"
        >
          <span className="bg-gradient-to-br from-mist to-wisteria bg-clip-text text-transparent">
            {c.insights.titleA}
          </span>
          <span className="font-sticker text-bubble" style={{ textShadow: "0 0 30px rgba(242,167,216,.35)" }}>
            {c.insights.titleB}
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.16 }}
          className="mt-5 max-w-2xl text-[15px] leading-8 text-mist/55"
        >
          {c.insights.desc}
        </motion.p>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {c.insights.entries.map((entry: any, i: number) => {
            const Body = BODIES[entry.kind] ?? BridgeBody;
            return (
              <div key={entry.no} className={i === 4 ? "lg:col-span-2 lg:mx-auto lg:max-w-2xl" : ""}>
                <Shell no={entry.no} tag={entry.tag} title={entry.title} index={i % 2}>
                  <Body e={entry} />
                </Shell>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
