import { motion } from "framer-motion";
import { Sparkle, Music2, ArrowUp, Star } from "lucide-react";
import { useLang } from "../i18n";
import { LINKS } from "../config";

export default function Footer() {
  const { c } = useLang();
  const marquee = c.footer.marquee.repeat(4).split("✦").filter(Boolean);

  return (
    <footer className="relative border-t border-wisteria/10 bg-abyss/70 backdrop-blur">
      {/* giant exit marquee */}
      <div className="overflow-hidden border-b border-wisteria/10 py-5 select-none">
        <div className="ribbon-l flex w-max items-center gap-8 whitespace-nowrap" style={{ ["--dur" as string]: "44s" }}>
          {[0, 1].map((k) =>
            marquee.map((m, i) => (
              <span
                key={`${k}-${i}`}
                className={`flex items-center gap-8 font-sticker text-2xl sm:text-4xl ${
                  i % 2 ? "text-outline" : "bg-gradient-to-r from-wisteria to-lav bg-clip-text text-transparent"
                }`}
              >
                {m.trim()}
                <Sparkle className="h-5 w-5 text-bubble/80" fill="currentColor" />
              </span>
            ))
          )}
        </div>
      </div>

      <div className="mx-auto flex max-w-[1500px] flex-col items-center justify-between gap-6 px-5 py-10 sm:px-8 md:flex-row">
        {/* brand + rights */}
        <div className="text-center md:text-left">
          <p className="font-sticker text-lg text-mist">
            SHELLY<span className="text-wisteria">✦</span>LAB
          </p>
          <p className="mt-1.5 text-xs text-lav/60">{c.footer.rights}</p>
          {/* retro "best viewed" badges — but responsive this time */}
          <div className="mt-3 flex flex-wrap justify-center gap-2 md:justify-start">
            {[c.footer.best, "1024×768 ✓", "MOBILE ✓", "TABLET ✓"].map((b) => (
              <span key={b} className="rounded border border-lav/30 bg-void/50 px-2 py-1 font-retro text-[10px] tracking-[0.18em] text-lav/70">
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* now showing */}
        <a
          href={LINKS.film}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-3 rounded-2xl border border-wisteria/20 bg-jacarta/30 px-5 py-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-wisteria/50 hover:shadow-[0_12px_36px_rgba(0,0,0,.4)]"
        >
          <span className="relative grid h-10 w-10 place-items-center rounded-full bg-bubble/15 text-bubble">
            <Music2 className="h-4.5 w-4.5 animate-bob" />
            <span className="absolute inset-0 animate-ping rounded-full border border-bubble/30" />
          </span>
          <span>
            <span className="block font-retro text-[11px] tracking-[0.3em] text-lav">{c.footer.nowPlaying}</span>
            <span className="mt-0.5 block text-[13px] font-semibold text-mist transition-colors group-hover:text-wisteria">
              {c.footer.film}
            </span>
          </span>
        </a>

        {/* back to top */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.92 }}
          className="group grid cursor-pointer place-items-center gap-2"
          aria-label={c.footer.top}
        >
          <span className="relative grid h-14 w-14 place-items-center rounded-full border border-wisteria/30 bg-jacarta/40 text-wisteria transition-colors group-hover:border-wisteria group-hover:bg-wisteria group-hover:text-void">
            <ArrowUp className="h-5 w-5" />
            <Star className="absolute -top-1.5 -right-1.5 h-4 w-4 text-stardust transition-transform duration-500 group-hover:rotate-180" fill="currentColor" />
          </span>
          <span className="text-[10px] font-bold tracking-[0.3em] text-lav/60 uppercase transition-colors group-hover:text-wisteria">
            {c.footer.top}
          </span>
        </motion.button>
      </div>
    </footer>
  );
}
