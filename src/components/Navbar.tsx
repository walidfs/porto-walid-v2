import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { NAV_SECTIONS, profile } from "@/data/portfolio";
import { useActiveSection, useScrolled } from "@/hooks/useScroll";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/utils/cn";
import { LanguageSwitch, ThemeToggle } from "./Toggles";

export function Navbar() {
  const { t } = useLanguage();
  const scrolled = useScrolled(16);
  const active = useActiveSection();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on Escape or when resizing up to desktop
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-all duration-500",
          scrolled || open
            ? "border-b border-slate-200/70 bg-white/80 shadow-[0_8px_30px_-12px_rgb(15_23_42/0.15)] backdrop-blur-xl dark:border-white/[0.06] dark:bg-ink-950/75"
            : "border-b border-transparent",
        )}
      >
        <nav className={cn("mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 transition-all duration-500 sm:px-8", scrolled ? "h-16" : "h-20")}>
          <a href="#home" className="group flex shrink-0 items-center" aria-label={profile.name} onClick={() => setOpen(false)}>
            <img src={profile.logo} alt="WFS" className="h-8 w-auto transition-transform duration-300 group-hover:scale-105 sm:h-9" width={111} height={36} />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_SECTIONS.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "true" : undefined}
                  className={cn(
                    "relative isolate rounded-full px-3.5 py-2 text-sm font-semibold transition-colors duration-300",
                    active === id
                      ? "text-brand-700 dark:text-white"
                      : "text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white",
                  )}
                >
                  {active === id && <span aria-hidden className="absolute inset-0 -z-10 rounded-full bg-brand-50 ring-1 ring-brand-100 dark:bg-white/[0.08] dark:ring-white/10" />}
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <LanguageSwitch />
            <ThemeToggle className="hidden sm:flex" />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-800 shadow-sm lg:hidden dark:border-white/10 dark:bg-white/5 dark:text-slate-100"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={cn(
            "grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden",
            open ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="min-h-0">
            <div className="mx-auto max-w-7xl px-5 pb-6 pt-2 sm:px-8">
              <ul className="grid gap-1 sm:grid-cols-2">
                {NAV_SECTIONS.map((id, i) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      onClick={() => setOpen(false)}
                      tabIndex={open ? 0 : -1}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-4 py-3 text-base font-semibold transition",
                        active === id
                          ? "bg-brand-50 text-brand-700 dark:bg-white/[0.08] dark:text-white"
                          : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5",
                      )}
                    >
                      {t.nav[id]}
                      <span className="font-mono text-xs text-slate-400">0{i + 1}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center gap-3">
                <a href={profile.cvUrl} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1} className="btn-primary flex-1">
                  <Download className="h-4 w-4" />
                  {t.hero.ctaCv}
                </a>
                <ThemeToggle className="h-12 w-12 sm:hidden" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
