import { Navbar } from "@/components/Navbar";
import { BackToTop, LanguageToast, ScrollProgress } from "@/components/ScrollExtras";
import { LanguageProvider, useLanguage } from "@/i18n/LanguageContext";
import { About } from "@/sections/About";
import { Activities } from "@/sections/Activities";
import { Certificates } from "@/sections/Certificates";
import { Contact, CV } from "@/sections/Contact";
import { Education } from "@/sections/Education";
import { Experience } from "@/sections/Experience";
import { Footer } from "@/sections/Footer";
import { Hero } from "@/sections/Hero";
import { Projects } from "@/sections/Projects";
import { Skills } from "@/sections/Skills";
import { ThemeProvider } from "@/theme/ThemeContext";

function Portfolio() {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <a
        href="#main"
        className="fixed left-4 top-4 z-[80] -translate-y-24 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition focus:translate-y-0"
      >
        {t.a11y.skip}
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Education />
        <Skills />
        <Experience />
        <Projects />
        <Certificates />
        <Activities />
        <CV />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <LanguageToast />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Portfolio />
      </LanguageProvider>
    </ThemeProvider>
  );
}
