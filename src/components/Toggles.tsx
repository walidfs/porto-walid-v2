import { Moon, Sun } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { LANGS } from "@/i18n/types";
import { useTheme } from "@/theme/ThemeContext";
import { cn } from "@/utils/cn";
import { FlagGB, FlagID } from "./BrandIcons";

/** Segmented EN | ID switch with a sliding thumb. */
export function LanguageSwitch({ className }: { className?: string }) {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      role="radiogroup"
      aria-label={t.a11y.language}
      className={cn(
        "relative inline-flex items-center rounded-full border border-slate-200 bg-white/80 p-1 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute bottom-1 left-1 top-1 w-[calc(50%-4px)] rounded-full bg-gradient-to-r from-brand-600 to-brand-500 shadow-md shadow-brand-600/30 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          lang === "id" && "translate-x-full",
        )}
      />
      {LANGS.map(({ code, label, name }) => {
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={name}
            title={name}
            onClick={() => setLang(code)}
            className={cn(
              "relative z-10 flex w-[3.25rem] items-center justify-center gap-1.5 rounded-full py-1.5 text-xs font-bold tracking-wide transition-colors duration-300",
              active ? "text-white" : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white",
            )}
          >
            {code === "en" ? <FlagGB className="h-3.5 w-3.5" /> : <FlagID className="h-3.5 w-3.5" />}
            {label}
          </button>
        );
      })}
    </div>
  );
}

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const dark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? t.a11y.toLight : t.a11y.toDark}
      title={dark ? t.a11y.toLight : t.a11y.toDark}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white/80 text-slate-700 shadow-sm backdrop-blur transition hover:border-brand-300 hover:text-brand-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:text-amber-300",
        className,
      )}
    >
      <Sun className={cn("absolute h-[18px] w-[18px] transition-all duration-500", dark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0")} />
      <Moon className={cn("absolute h-[18px] w-[18px] transition-all duration-500", dark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100")} />
    </button>
  );
}
