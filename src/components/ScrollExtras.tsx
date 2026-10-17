import { useEffect, useRef, useState } from "react";
import { ArrowUp, Languages } from "lucide-react";
import { useScrolled } from "@/hooks/useScroll";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/utils/cn";

/** Thin gradient bar at the very top showing reading progress. */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
        if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-[3px]">
      <div ref={barRef} className="h-full origin-left scale-x-0 bg-gradient-to-r from-brand-600 via-sky-400 to-leaf-500" />
    </div>
  );
}

export function BackToTop() {
  const { t } = useLanguage();
  const visible = useScrolled(700);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={t.a11y.backToTop}
      title={t.a11y.backToTop}
      className={cn(
        "fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white shadow-xl shadow-slate-900/20 ring-1 ring-white/10 transition-all duration-500 hover:-translate-y-1 hover:bg-brand-600 sm:bottom-8 sm:right-8 dark:bg-white dark:text-ink-950 dark:hover:bg-brand-400",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

/** Small confirmation toast whenever the language is switched. */
export function LanguageToast() {
  const { lang, t } = useLanguage();
  const [show, setShow] = useState(false);
  const prevLang = useRef(lang);

  useEffect(() => {
    if (prevLang.current === lang) return;
    prevLang.current = lang;
    setShow(true);
    const timer = window.setTimeout(() => setShow(false), 2000);
    return () => window.clearTimeout(timer);
  }, [lang]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "pointer-events-none fixed bottom-6 left-1/2 z-[70] -translate-x-1/2 transition-all duration-500",
        show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
      )}
    >
      <div className="flex items-center gap-2.5 whitespace-nowrap rounded-full bg-slate-900/95 px-5 py-3 text-sm font-medium text-white shadow-2xl ring-1 ring-white/10 backdrop-blur dark:bg-white/95 dark:text-ink-950">
        <Languages className="h-4 w-4 text-brand-300 dark:text-brand-600" />
        {t.toast.language}
      </div>
    </div>
  );
}
