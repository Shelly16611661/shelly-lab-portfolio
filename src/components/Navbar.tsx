import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Palette, Sparkles, X, Sparkle } from "lucide-react";
import { useLang } from "../i18n";
import { scrollToId } from "../config";

/* eyeshadow-pan swatch colors, in menu order */
const PAN_TINTS = ["#BEAEDB", "#3F2A52", "#75619D", "#5A3F72", "#F2A7D8", "#F9E6A8"];
const LIGHT_PANS = new Set(["#BEAEDB", "#F2A7D8", "#F9E6A8"]);

/* ── 色盤內容（手機全螢幕版與桌機卡片版共用） ── */
function PaletteContent({ onPick, onClose }: { onPick: (id: string) => void; onClose: () => void }) {
  const { c } = useLang();
  return (
    <div className="w-full">
      {/* lid + mirror sheen */}
      <div className="mb-3 flex items-center justify-between px-1.5 pt-1">
        <div>
          <p className="font-sticker text-sm text-mist">{c.nav.paletteTitle}</p>
          <p className="mt-0.5 font-retro text-[11px] tracking-[0.25em] text-lav">
            {c.nav.paletteSub}
          </p>
        </div>
        <button
          onClick={onClose}
          className="grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-full border border-wisteria/25 text-wisteria transition hover:rotate-90 hover:border-wisteria/70"
          aria-label={c.nav.close}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="sheen mb-4 h-2.5 rounded-full bg-gradient-to-r from-jacarta via-lav/60 to-jacarta-2/60" />

      {/* the pans */}
      <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3">
        {c.nav.items.map((item, i) => {
          const tint = PAN_TINTS[i % PAN_TINTS.length];
          const light = LIGHT_PANS.has(tint);
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, scale: 0.2, rotate: i % 2 ? 10 : -10, y: -22 }}
              animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.4 }}
              transition={{ delay: 0.05 + i * 0.055, type: "spring", stiffness: 320, damping: 17 }}
              whileHover={{ y: -5, rotate: i % 2 ? 1.5 : -1.5 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => onPick(item.id)}
              className="sheen group relative aspect-[5/4] cursor-pointer overflow-hidden rounded-2xl text-left shadow-[inset_0_-10px_24px_rgba(0,0,0,.28),0_8px_20px_rgba(0,0,0,.35)]"
              style={{
                background: `radial-gradient(120% 130% at 30% 15%, ${tint} 0%, ${tint}cc 55%, rgba(13,6,19,.55) 130%)`,
              }}
            >
              <span
                className={`absolute top-2 left-2.5 font-retro text-base tracking-widest ${
                  light ? "text-coffee/60" : "text-wisteria/50"
                }`}
              >
                0{i + 1}
              </span>
              <Sparkle
                className={`absolute top-2 right-2 h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-180 ${
                  light ? "text-coffee/50" : "text-wisteria/60"
                }`}
                fill="currentColor"
              />
              <span className="absolute right-2.5 bottom-2.5 left-2.5">
                <span
                  className={`block text-[15px] leading-tight font-bold ${
                    light ? "text-coffee" : "text-mist"
                  }`}
                  style={{ fontFamily: "'Noto Serif TC','Playfair Display',serif" }}
                >
                  {item.label}
                </span>
                <span
                  className={`mt-0.5 block text-[9px] font-semibold tracking-[0.22em] uppercase ${
                    light ? "text-coffee/60" : "text-wisteria/70"
                  }`}
                >
                  {item.en}
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>

      <p className="mt-4 mb-1 text-center font-retro text-[11px] tracking-[0.3em] text-lav/50">
        ✦ PICK A SHADE TO TRAVEL ✦
      </p>
    </div>
  );
}

export default function Navbar() {
  const { lang, toggle } = useLang();
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });

  const desktopHover = () =>
    typeof window !== "undefined" &&
    matchMedia("(hover:hover) and (pointer:fine) and (min-width:768px)").matches;

  /* hover 關閉緩衝：滑鼠從按鈕移向色盤的空檔不會誤關 */
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelClose = () => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
  };
  const scheduleClose = (ms: number) => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), ms);
  };

  const go = (id: string) => {
    scrollToId(id);
    setOpen(false);
  };

  /* 選單開啟時鎖定背景捲動 */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-[90]">
      <div className="glass border-x-0 border-t-0">
        <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between gap-3 px-4 sm:px-6">
          {/* ── Logo ── */}
          <button
            onClick={() => scrollToId("home")}
            className="group flex cursor-pointer items-center gap-2.5 text-left"
            aria-label="Home"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-jacarta-2 to-jacarta shadow-[0_0_18px_rgba(190,174,219,.25)] transition-transform duration-300 group-hover:rotate-12">
              <Sparkles className="h-4.5 w-4.5 text-wisteria" />
            </span>
            <span className="leading-none">
              <span className="block font-sticker text-[17px] text-mist">
                SHELLY<span className="text-wisteria">✦</span>LAB
              </span>
              <span className="mt-1 block text-[9px] font-medium tracking-[0.32em] text-lav">
                吳宣萱 · VISUAL LAB
              </span>
            </span>
          </button>

          {/* ── Right cluster ── */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* language pill */}
            <button
              onClick={toggle}
              className="relative flex h-9 cursor-pointer items-center rounded-full border border-wisteria/20 bg-void/40 p-1 text-[11px] font-bold tracking-wider"
              aria-label="Toggle language"
            >
              {(["zh", "en"] as const).map((l) => (
                <span
                  key={l}
                  className={`relative z-10 grid w-9 place-items-center rounded-full py-1 transition-colors duration-300 ${
                    lang === l ? "text-void" : "text-wisteria/70"
                  }`}
                >
                  {l === "zh" ? "中" : "EN"}
                </span>
              ))}
              <motion.span
                layout
                className="absolute top-1 bottom-1 w-9 rounded-full bg-wisteria shadow-[0_0_14px_rgba(190,174,219,.5)]"
                animate={{ left: lang === "zh" ? 4 : "calc(100% - 2.5rem)" }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            </button>

            {/* ── MENU button（手機點擊、桌機 hover 都可開） ── */}
            <div
              onMouseEnter={() => { if (desktopHover()) { cancelClose(); setOpen(true); } }}
              onMouseLeave={() => desktopHover() && scheduleClose(280)}
            >
              <motion.button
                onClick={() => setOpen((o) => !o)}
                whileTap={{ scale: 0.92 }}
                className={`flex h-9 items-center gap-2 rounded-full border px-4 text-[11px] font-bold tracking-[0.22em] transition-all duration-300 ${
                  open
                    ? "border-wisteria bg-wisteria text-void shadow-[0_0_24px_rgba(190,174,219,.45)]"
                    : "border-wisteria/30 bg-void/40 text-wisteria hover:border-wisteria/70 hover:bg-jacarta/50"
                }`}
                aria-expanded={open}
              >
                {open ? <X className="h-4 w-4" /> : <Palette className="h-4 w-4" />}
                <span className="hidden sm:inline">MENU</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* scroll progress */}
        <motion.div
          className="h-[2px] origin-left bg-gradient-to-r from-jacarta-2 via-wisteria to-bubble"
          style={{ scaleX: progress }}
        />
      </div>

      {/*
        ══ 關鍵修復 ══
        導航列的 backdrop-filter 會讓 position:fixed 改以導航列為定位基準
        → 全螢幕選單被關在 64px 高的列裡。
        解法：用 createPortal 把選單傳到 <body>，脫離 blur 上下文。
        桌機：按鈕下方錨點卡片｜手機：真・全螢幕色盤
      */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <>
                {/* 點外關閉遮罩 */}
                <motion.div
                  key="veil"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setOpen(false)}
                  className="fixed inset-0 z-[80] bg-void/60 backdrop-blur-sm"
                />

                {/* ── 手機版：全螢幕色盤（< md） ── */}
                <motion.div
                  key="palette-mobile"
                  initial={{ opacity: 0, y: 26, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 16, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  className="fixed inset-0 z-[85] overflow-y-auto overscroll-contain bg-abyss/92 backdrop-blur-2xl md:hidden"
                >
                  <div className="mx-auto flex min-h-full w-full max-w-sm flex-col justify-center px-5 pt-[84px] pb-10">
                    <PaletteContent onPick={go} onClose={() => setOpen(false)} />
                  </div>
                </motion.div>

                {/* ── 桌機版：右上角錨點卡片（≥ md） ── */}
                <motion.div
                  key="palette-desktop"
                  initial={{ opacity: 0, scale: 0.82, y: -14, rotate: 1.5 }}
                  animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.86, y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  style={{ transformOrigin: "top right" }}
                  onMouseEnter={() => desktopHover() && cancelClose()}
                  onMouseLeave={() => desktopHover() && scheduleClose(150)}
                  className="fixed top-[80px] right-4 z-[85] hidden w-[478px] rounded-[28px] border border-wisteria/25 bg-abyss/95 p-3.5 shadow-[0_30px_80px_rgba(0,0,0,.6),0_0_50px_rgba(190,174,219,.12)] backdrop-blur-2xl md:block"
                >
                  <PaletteContent onPick={go} onClose={() => setOpen(false)} />
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </header>
  );
}
