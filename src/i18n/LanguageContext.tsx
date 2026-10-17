import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { dictionary, type Dictionary } from "./dictionary";
import type { Lang, Localized } from "./types";

const STORAGE_KEY = "wfs-lang";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  /** Interface strings for the active language */
  t: Dictionary;
  /** Pick the active-language value from a localized object */
  l: <T>(value: Localized<T>) => T;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const isLang = (value: unknown): value is Lang => value === "en" || value === "id";

/** Priority: ?lang= URL param → saved preference → browser language → English */
function detectInitialLang(): Lang {
  if (typeof window === "undefined") return "en";
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (isLang(fromUrl)) return fromUrl;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) return saved;
  } catch {
    /* storage might be blocked — ignore */
  }
  const browser = (navigator.languages?.[0] || navigator.language || "en").toLowerCase();
  return browser.startsWith("id") || browser.startsWith("ms") ? "id" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitialLang);

  useEffect(() => {
    const t = dictionary[lang];
    document.documentElement.lang = lang;
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.meta.description);
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
      // Keep a shared ?lang= link in sync if one is present
      const url = new URL(window.location.href);
      if (url.searchParams.has("lang") && url.searchParams.get("lang") !== lang) {
        url.searchParams.set("lang", lang);
        window.history.replaceState(null, "", url.toString());
      }
    } catch {
      /* ignore */
    }
  }, [lang]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);
  const toggleLang = useCallback(() => setLangState((prev) => (prev === "en" ? "id" : "en")), []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      toggleLang,
      t: dictionary[lang],
      l: <T,>(v: Localized<T>) => v[lang],
    }),
    [lang, setLang, toggleLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
