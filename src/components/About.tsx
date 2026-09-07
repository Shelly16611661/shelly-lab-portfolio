import { motion } from "framer-motion";
import { Sparkle, Star, Fingerprint, Trophy } from "lucide-react";
import { useLang } from "../i18n";

export default function About() {
  const { c } = useLang();

  return (
    <section id="about" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        {/* header */}
        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} className="font-retro text-sm tracking-[0.4em] text-lav">
          {c.about.kicker}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ delay: 0.08 }}
          className="mt-3 flex flex-wrap items-baseline gap-x-4 font-display text-[clamp(2.6rem,7vw,5rem)] leading-none font-black"
        >
          <span className="bg-gradient-to-br from-mist to-wisteria bg-clip-text text-transparent">{c.about.title}</span>
          <span className="font-retro text-sm tracking-[0.5em] text-lav/70 sm:text-base">{c.about.titleEn}</span>
        </motion.h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.02fr,1fr]">
          {/* ── profile card ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
            className="glass relative overflow-hidden rounded-[28px] p-7 sm:p-9"
          >
            <Sparkle aria-hidden className="absolute top-6 right-7 h-5 w-5 text-wisteria/30" fill="currentColor" />
            <div className="flex items-center gap-5">
              <div className="relative grid h-20 w-20 shrink-0 place-items-center">
                <span className="absolute inset-0 animate-spin-slower rounded-full border border-dashed border-wisteria/50" />
                <span className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-jacarta-2 to-coffee font-display text-2xl font-black text-wisteria shadow-[0_0_30px_rgba(190,174,219,.25)]">
                  SW
                </span>
              </div>
              <div>
                <p className="flex items-center gap-2 font-retro text-xs tracking-[0.3em] text-lav">
                  <Fingerprint className="h-3.5 w-3.5" /> ID · PROFILE
                </p>
                <p className="mt-1 font-display text-2xl font-bold text-mist">吳宣萱 Shelly Wu</p>
              </div>
            </div>

            <dl className="mt-7 space-y-3">
              {c.about.profile.map(([k, v]) => (
                <div key={k} className="flex flex-wrap items-baseline gap-x-4 border-b border-wisteria/10 pb-2.5 text-sm last:border-0">
                  <dt className="w-14 shrink-0 font-retro text-[13px] tracking-[0.25em] text-lav/80 uppercase">{k}</dt>
                  <dd className="text-mist/85">{v}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 text-[14.5px] leading-8 text-mist/60">{c.about.bio}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {c.about.chips.map((chip, i) => (
                <motion.span
                  key={chip}
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.05, type: "spring", stiffness: 260, damping: 16 }}
                  className="cursor-default rounded-full border border-wisteria/20 bg-jacarta/50 px-3.5 py-1.5 text-xs font-semibold text-wisteria/90 transition-all duration-300 hover:-translate-y-0.5 hover:border-wisteria/60 hover:bg-wisteria hover:text-void hover:shadow-[0_6px_20px_rgba(190,174,219,.35)]"
                >
                  ✦ {chip}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* ── skill palette (eyeshadow case) ── */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ delay: 0.08 }}
              className="glass rounded-[28px] p-7 sm:p-8"
            >
              <div className="flex items-baseline justify-between gap-3">
                <div>
                  <p className="font-display text-xl font-bold text-mist">
                    {c.about.paletteTitle}
                    <span className="ml-2.5 font-retro text-xs tracking-[0.3em] text-lav">{c.about.paletteEn}</span>
                  </p>
                  <p className="mt-1 text-[11px] tracking-wider text-lav/60">{c.about.paletteNote}</p>
                </div>
                <Sparkle className="h-4 w-4 shrink-0 text-bubble" fill="currentColor" />
              </div>
              {/* mirror strip */}
              <div className="sheen mt-4 h-3 rounded-full bg-gradient-to-r from-jacarta via-lav/70 to-jacarta-2/60" />

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {c.about.skills.map((sk, i) => (
                  <motion.div
                    key={sk.en}
                    initial={{ opacity: 0, y: 22, rotate: i % 2 ? 2 : -2 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.12 + i * 0.07, type: "spring", stiffness: 200, damping: 16 }}
                    whileHover={{ y: -4 }}
                    className="group relative aspect-square overflow-hidden rounded-2xl border border-wisteria/12 bg-void/50 p-3 shadow-[inset_0_2px_10px_rgba(0,0,0,.4)]"
                  >
                    {/* pigment fill rising with mastery */}
                    <motion.div
                      initial={{ height: "0%" }}
                      whileInView={{ height: `${sk.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.35 + i * 0.09, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-x-0 bottom-0"
                      style={{ background: `linear-gradient(180deg, ${sk.tint} 0%, ${sk.tint}99 60%, ${sk.tint}55 100%)` }}
                    />
                    <div className="relative flex h-full flex-col justify-between">
                      <span className="font-sticker text-xl text-mist drop-shadow-[0_2px_6px_rgba(13,6,19,.9)]">{sk.pct}</span>
                      <div>
                        <p className="text-[12.5px] leading-tight font-bold text-mist drop-shadow-[0_2px_6px_rgba(13,6,19,.9)]" style={{ fontFamily: "'Noto Serif TC',serif" }}>
                          {sk.name}
                        </p>
                        <p className="mt-0.5 text-[9px] font-semibold tracking-[0.14em] text-mist/60 uppercase drop-shadow">{sk.en}</p>
                      </div>
                    </div>
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* highlights */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ delay: 0.14 }}
              className="glass rounded-[28px] p-7"
            >
              <p className="flex items-center gap-2 font-display text-xl font-bold text-mist">
                <Trophy className="h-5 w-5 text-stardust" />
                {c.about.honorsTitle}
                <span className="font-retro text-xs tracking-[0.3em] text-lav">{c.about.honorsEn}</span>
              </p>
              <ul className="mt-4 space-y-3">
                {c.about.honors.map((h, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.08 }}
                    className="flex items-start gap-3 text-[13.5px] leading-6 text-mist/70"
                  >
                    <Star className="mt-1 h-3.5 w-3.5 shrink-0 text-bubble" fill="currentColor" />
                    {h}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
