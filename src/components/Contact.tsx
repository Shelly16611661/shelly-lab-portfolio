import { useEffect, useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, Mail, School, MessageCircle, Send, Sparkle, Pin } from "lucide-react";
import { useLang } from "../i18n";
import { LINKS } from "../config";

interface Note { name: string; msg: string; rot: number; tint: string; id: number }

const TINTS = ["#F4F1FA", "#EFE8F8", "#FBEFF7", "#F5F3E8"];
const SEED: Note[] = [
  { id: 1, name: "Midjourney Bot", msg: "你的 prompt，我收下了 ✦", rot: -3, tint: "#EFE8F8" },
  { id: 2, name: "路過的小星星", msg: "紫藤色宇宙，配色好美！", rot: 2.5, tint: "#FBEFF7" },
  { id: 3, name: "Recruiter 2046", msg: "這個翻卡設計有戲 ★", rot: -1.5, tint: "#F5F3E8" },
];

export default function Contact() {
  const { c } = useLang();
  const [notes, setNotes] = useState<Note[]>(SEED);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [toast, setToast] = useState(false);

  /* persist the wall */
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("star-wall") || "null");
      if (Array.isArray(saved) && saved.length) setNotes(saved);
    } catch { /* fresh sky */ }
  }, []);
  useEffect(() => {
    try { localStorage.setItem("star-wall", JSON.stringify(notes)); } catch { /* full */ }
  }, [notes]);

  const rows = useMemo(
    () => [
      { icon: Phone, label: c.contact.phone, value: "0913-051-530", href: LINKS.phone },
      { icon: Mail, label: c.contact.email, value: "sy1615870@gmail.com", href: LINKS.email },
      { icon: School, label: c.contact.school, value: "NTUB · Business Administration", href: undefined },
    ],
    [c]
  );

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !msg.trim()) return;
    setNotes((n) => [
      { id: Date.now(), name: name.trim().slice(0, 16), msg: msg.trim().slice(0, 60), rot: Math.random() * 10 - 5, tint: TINTS[Math.floor(Math.random() * TINTS.length)] },
      ...n.slice(0, 17),
    ]);
    setName("");
    setMsg("");
    setToast(true);
    setTimeout(() => setToast(false), 2200);
  };

  return (
    <section id="contact" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} className="font-retro text-sm tracking-[0.4em] text-lav">
          {c.contact.kicker}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ delay: 0.08 }}
          className="mt-3 flex flex-wrap items-baseline gap-x-4 font-display text-[clamp(2.6rem,7vw,5rem)] leading-none font-black"
        >
          <span className="bg-gradient-to-br from-mist to-wisteria bg-clip-text text-transparent">{c.contact.title}</span>
          <span className="font-sticker text-bubble">{c.contact.titleEn.split("★")[0]}</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.16 }} className="mt-5 max-w-xl text-[15px] leading-8 text-mist/55">
          {c.contact.desc}
        </motion.p>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* ── coordinates ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
            className="glass flex flex-col rounded-[28px] p-7 sm:p-9"
          >
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-bubble/30 bg-bubble/8 px-3.5 py-1.5 text-[11px] font-bold tracking-[0.2em] text-bubble uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-bubble pulse-dot" />
              Open to collabs ★ 實習 / 合作
            </span>
            <div className="mt-7 space-y-4">
              {rows.map((r, i) => (
                <motion.div
                  key={r.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                >
                  {r.href ? (
                    <a href={r.href} className="group flex items-center gap-4 rounded-2xl border border-wisteria/12 bg-void/40 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-wisteria/40 hover:shadow-[0_10px_30px_rgba(0,0,0,.35)]">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-jacarta/70 text-wisteria transition-transform duration-300 group-hover:rotate-6">
                        <r.icon className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block font-retro text-[12px] tracking-[0.3em] text-lav/80">{r.label}</span>
                        <span className="mt-0.5 block text-[15px] font-semibold text-mist">{r.value}</span>
                      </span>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 rounded-2xl border border-wisteria/12 bg-void/40 p-4">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-jacarta/70 text-wisteria">
                        <r.icon className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block font-retro text-[12px] tracking-[0.3em] text-lav/80">{r.label}</span>
                        <span className="mt-0.5 block text-[15px] font-semibold text-mist">{r.value}</span>
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={LINKS.line}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-jacarta-2 to-lav px-6 py-3 text-sm font-bold text-mist shadow-[0_10px_30px_rgba(117,97,157,.35)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                <MessageCircle className="h-4 w-4" /> LINE
              </a>
              <a
                href={LINKS.email}
                className="flex items-center gap-2 rounded-full border border-wisteria/40 px-6 py-3 text-sm font-bold text-wisteria transition-all duration-300 hover:-translate-y-0.5 hover:bg-wisteria/10"
              >
                <Mail className="h-4 w-4" /> Email
              </a>
            </div>
          </motion.div>

          {/* ── guestbook / star wall ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ delay: 0.08 }}
            className="glass relative overflow-hidden rounded-[28px] p-7 sm:p-9"
          >
            <Sparkle aria-hidden className="absolute top-6 right-7 h-5 w-5 text-stardust/50" fill="currentColor" />
            <p className="font-display text-xl font-bold text-mist">
              {c.contact.gbTitle}
              <span className="ml-2.5 font-retro text-xs tracking-[0.3em] text-lav">{c.contact.gbEn}</span>
            </p>

            <form onSubmit={submit} className="mt-5 flex flex-col gap-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={c.contact.gbName}
                maxLength={16}
                className="w-full rounded-xl border border-wisteria/20 bg-void/50 px-4 py-3 text-sm text-mist outline-none transition-colors placeholder:text-lav/40 focus:border-wisteria/70"
              />
              <div className="flex gap-3">
                <input
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder={c.contact.gbMsg}
                  maxLength={60}
                  className="min-w-0 flex-1 rounded-xl border border-wisteria/20 bg-void/50 px-4 py-3 text-sm text-mist outline-none transition-colors placeholder:text-lav/40 focus:border-wisteria/70"
                />
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  type="submit"
                  className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-xl bg-gradient-to-br from-bubble to-lav text-void shadow-[0_8px_24px_rgba(242,167,216,.3)]"
                  aria-label={c.contact.gbBtn}
                >
                  <Send className="h-4.5 w-4.5" />
                </motion.button>
              </div>
            </form>

            {/* the wall */}
            <div className="mt-6 flex max-h-72 flex-wrap content-start gap-3 overflow-y-auto pr-1">
              <AnimatePresence initial={false}>
                {notes.map((n) => (
                  <motion.div
                    key={n.id}
                    layout
                    initial={{ opacity: 0, scale: 0.4, rotate: n.rot * 3 }}
                    animate={{ opacity: 1, scale: 1, rotate: n.rot }}
                    transition={{ type: "spring", stiffness: 280, damping: 17 }}
                    whileHover={{ rotate: 0, scale: 1.08, zIndex: 10 }}
                    className="relative w-[46%] cursor-default rounded-lg p-3 pt-4 pb-3 shadow-[0_8px_20px_rgba(0,0,0,.4)] sm:w-[31%]"
                    style={{ background: n.tint }}
                  >
                    <Pin className="absolute -top-1.5 left-1/2 h-4 w-4 -translate-x-1/2 text-coffee/50" fill="currentColor" />
                    <p className="text-[12px] leading-5 font-medium break-words text-coffee">{n.msg}</p>
                    <p className="mt-1.5 text-right font-retro text-[11px] tracking-wider text-coffee/60">— {n.name}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
              {notes.length === 0 && (
                <p className="py-8 text-sm text-lav/50">{c.contact.gbEmpty}</p>
              )}
            </div>

            {/* toast */}
            <AnimatePresence>
              {toast && (
                <motion.div
                  initial={{ opacity: 0, y: 16, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-stardust/40 bg-void/90 px-4 py-2 text-xs font-bold tracking-wider text-stardust shadow-[0_10px_30px_rgba(0,0,0,.5)]"
                >
                  <Sparkle className="h-3.5 w-3.5" fill="currentColor" />
                  {c.contact.gbThanks}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
