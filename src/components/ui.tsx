import { useEffect, useRef, useState, type ImgHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/utils/cn";

/* ------------------------------ Container ------------------------------ */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>{children}</div>;
}

/* -------------------------------- Reveal ------------------------------- */
interface RevealProps {
  children: ReactNode;
  className?: string;
  /** delay in ms */
  delay?: number;
}

/** Fades + slides its children in the first time they enter the viewport. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/* ---------------------------- SectionHeading --------------------------- */
interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({ index, eyebrow, title, subtitle, align = "left", className }: SectionHeadingProps) {
  const center = align === "center";
  return (
    <Reveal className={cn("mb-12 md:mb-16", center && "mx-auto max-w-3xl text-center", className)}>
      <div
        className={cn(
          "flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-brand-600 dark:text-brand-400",
          center && "justify-center",
        )}
      >
        <span>{index}</span>
        <span aria-hidden className="h-px w-10 bg-gradient-to-r from-brand-500 to-leaf-500" />
        <span>{eyebrow}</span>
      </div>
      <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl dark:text-white">{title}</h2>
      {subtitle && (
        <p className={cn("mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg dark:text-slate-400", center && "mx-auto")}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

/* ---------------------------------- Img -------------------------------- */
/** Lazy image that fades in once loaded. Don't pass `transition-*` classes. */
export function Img({ className, alt = "", ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, []);

  return (
    <img
      ref={ref}
      alt={alt}
      loading="lazy"
      decoding="async"
      onLoad={() => setLoaded(true)}
      className={cn("transition-[opacity,transform,filter] duration-700 ease-out", loaded ? "opacity-100" : "opacity-0", className)}
      {...props}
    />
  );
}

/* ------------------------------ FilterTabs ----------------------------- */
interface FilterTabsProps<T extends string> {
  options: { value: T; label: string; count: number }[];
  value: T;
  onChange: (value: T) => void;
  label: string;
}

export function FilterTabs<T extends string>({ options, value, onChange, label }: FilterTabsProps<T>) {
  return (
    <div role="tablist" aria-label={label} className="no-scrollbar -mx-5 mb-10 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300",
              active
                ? "border-transparent bg-slate-900 text-white shadow-lg shadow-slate-900/10 dark:bg-white dark:text-ink-950"
                : "border-slate-200 bg-white/70 text-slate-600 hover:border-brand-300 hover:text-brand-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-brand-400/60 dark:hover:text-white",
            )}
          >
            {opt.label}
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 font-mono text-[10px] leading-none",
                active ? "bg-white/20 dark:bg-ink-950/10" : "bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-slate-400",
              )}
            >
              {opt.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
