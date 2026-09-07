import { motion } from "framer-motion";
import { Sparkle, GraduationCap, Minus } from "lucide-react";
import { useLang } from "../i18n";

const TAG_STYLE: Record<string, string> = {
  lead: "border-bubble/40 bg-bubble/10 text-bubble",
  part: "border-stardust/40 bg-stardust/10 text-stardust",
  work: "border-lav/50 bg-lav/15 text-wisteria",
  coord: "border-wisteria/40 bg-wisteria/10 text-wisteria",
};
const NODE_STYLE: Record<string, string> = {
  lead: "#F2A7D8",
  part: "#F9E6A8",
  work: "#75619D",
  coord: "#BEAEDB",
};

export default function Experience() {
  const { c } = useLang();

  return (
    <section id="exp" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} className="font-retro text-sm tracking-[0.4em] text-lav">
          {c.exp.kicker}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ delay: 0.08 }}
          className="mt-3 flex flex-wrap items-baseline gap-x-4 font-display text-[clamp(2.6rem,7vw,5rem)] leading-none font-black"
        >
          <span className="bg-gradient-to-br from-mist to-wisteria bg-clip-text text-transparent">{c.exp.title}</span>
          <span className="font-retro text-sm tracking-[0.5em] text-lav/70 sm:text-base">{c.exp.titleEn}</span>
        </motion.h2>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.25fr,0.75fr]">
          {/* ── neon timeline ── */}
          <div className="relative pl-8 sm:pl-10">
            {/* the glowing rail */}
            <span aria-hidden className="absolute top-1 bottom-1 left-[7px] w-[2px] rounded bg-gradient-to-b from-bubble via-wisteria/70 to-jacarta shadow-[0_0_16px_rgba(190,174,219,.35)]" />
            {c.exp.items.map((it, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: 0.05 * (i % 4), duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="group relative mb-6 last:mb-0"
              >
                {/* node */}
                <span
                  aria-hidden
                  className="absolute top-6 -left-8 h-[14px] w-[14px] rounded-full border-[3px] border-void transition-transform duration-300 group-hover:scale-125 sm:-left-10"
                  style={{ background: NODE_STYLE[it.tag], boxShadow: `0 0 16px ${NODE_STYLE[it.tag]}aa` }}
                />
                <div className="glass rounded-2xl p-5 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-wisteria/30 group-hover:shadow-[0_16px_40px_rgba(0,0,0,.45)] sm:p-6">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h3 className="text-[15.5px] leading-snug font-bold text-mist sm:text-[17px]" style={{ fontFamily: "'Noto Serif TC',serif" }}>
                      {it.title}
                    </h3>
                    <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold tracking-[0.14em] uppercase ${TAG_STYLE[it.tag]}`}>
                      {c.exp.tags[it.tag as keyof typeof c.exp.tags]}
                    </span>
                  </div>
                  <p className="mt-1.5 font-retro text-[15px] tracking-[0.18em] text-lav/80">{it.date}</p>
                  <ul className="mt-3 space-y-1.5">
                    {it.pts.map((p, j) => (
                      <li key={j} className="flex items-start gap-2 text-[13px] leading-6 text-mist/60 sm:text-[13.5px]">
                        <Minus className="mt-[7px] h-3 w-3 shrink-0 text-wisteria/60" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>

          {/* ── education stop ── */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              className="glass relative overflow-hidden rounded-[28px] p-7"
            >
              <Sparkle aria-hidden className="absolute top-5 right-6 h-5 w-5 text-wisteria/25" fill="currentColor" />
              <p className="flex items-center gap-2.5 font-display text-xl font-bold text-mist">
                <GraduationCap className="h-5 w-5 text-wisteria" />
                {c.exp.eduTitle}
                <span className="font-retro text-xs tracking-[0.3em] text-lav">{c.exp.eduEn}</span>
              </p>
              <div className="mt-5 space-y-4">
                {c.exp.edu.map(([yr, name], i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.12 + i * 0.1 }}
                    className="rounded-2xl border border-wisteria/12 bg-void/40 p-4"
                  >
                    <p className="font-retro text-[15px] tracking-[0.2em] text-stardust/90">{yr}</p>
                    <p className="mt-1 text-sm leading-6 text-mist/80">{name}</p>
                  </motion.div>
                ))}
              </div>
              <div className="sheen mt-5 h-2 rounded-full bg-gradient-to-r from-jacarta via-wisteria/40 to-jacarta" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
