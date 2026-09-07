import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { LanguageProvider } from "./i18n";
import Starfield from "./components/Starfield";
import CursorFX from "./components/CursorFX";
import Splash from "./components/Splash";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Corridor from "./components/Corridor";
import About from "./components/About";
import Experience from "./components/Experience";
import Insights from "./components/Insights";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [entered, setEntered] = useState(false);

  return (
    <LanguageProvider>
      <div className="noise relative min-h-screen overflow-x-clip">
        {/* ambient layers */}
        <Starfield />
        <CursorFX />

        {/* retro enter-gate */}
        <AnimatePresence>
          {!entered && <Splash key="splash" onDone={() => setEntered(true)} />}
        </AnimatePresence>

        {entered && (
          <>
            <Navbar />
            <main>
              <Hero />
              <Corridor />
              <About />
              <Experience />
              <Insights />
              <Contact />
            </main>
            <Footer />
          </>
        )}
      </div>
    </LanguageProvider>
  );
}
