import { useState } from "react";
import { ArrowUpRight, Briefcase, Camera, ChevronDown, GraduationCap, MapPin, Quote, School } from "lucide-react";
import { Container, Reveal, SectionHeading } from "@/components/ui";
import { aboutParagraphs, profile, quickFacts, roles } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/utils/cn";

const factIcons = {
  degree: GraduationCap,
  currently: Briefcase,
  studying: School,
  interests: Camera,
};

const COLLAPSED_COUNT = 2;

export function About() {
  const { t, l } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const paragraphs = l(aboutParagraphs);

  return (
    <section id="about" className="relative py-24 md:py-32">
      <Container>
        <SectionHeading index="01" eyebrow={t.about.eyebrow} title={t.about.title} subtitle={t.about.subtitle} />

        <div className="grid gap-6 lg:grid-cols-[1.45fr_1fr] lg:gap-8">
          {/* Story */}
          <Reveal className="card relative overflow-hidden p-7 sm:p-10">
            <Quote aria-hidden className="absolute right-6 top-6 h-20 w-20 rotate-180 text-brand-500/[0.07] dark:text-white/[0.04]" />
            <div className="relative space-y-5 text-[15px] leading-[1.85] text-slate-600 sm:text-base dark:text-slate-300">
              {paragraphs.map((p, i) => {
                const hidden = !expanded && i >= COLLAPSED_COUNT;
                if (hidden) return null;
                return (
                  <p key={i} className={cn(i === 0 && "text-slate-800 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-6xl first-letter:font-extrabold first-letter:leading-[0.8] first-letter:text-brand-600 dark:text-slate-100 dark:first-letter:text-brand-400", i >= COLLAPSED_COUNT && "animate-fade-up")}>
                    {p}
                  </p>
                );
              })}
            </div>

            {paragraphs.length > COLLAPSED_COUNT && (
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition hover:gap-2.5 dark:text-brand-400"
              >
                {expanded ? t.about.readLess : t.about.readMore}
                <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", expanded && "rotate-180")} />
              </button>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-slate-200/80 pt-6 dark:border-white/10">
              <img src={profile.logo} alt="" className="h-9 w-auto" loading="lazy" />
              <div>
                <p className="font-bold text-slate-900 dark:text-white">
                  {profile.name}, {profile.degree}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{l(roles).join(" · ")}</p>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-6 lg:gap-8">
            {/* Based in */}
            <Reveal delay={100} className="card group relative overflow-hidden">
              <div className="relative h-40 overflow-hidden bg-gradient-to-br from-brand-50 via-white to-leaf-300/20 dark:from-brand-500/10 dark:via-transparent dark:to-leaf-500/10">
                <div aria-hidden className="bg-dots absolute inset-0 opacity-70" />
                {/* stylised map rings */}
                <div aria-hidden className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-500/20" />
                <div aria-hidden className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-500/10" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="absolute inset-0 animate-pulse-ring rounded-full bg-brand-500/40" />
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-brand-500 text-white shadow-lg shadow-brand-600/40 transition-transform duration-500 group-hover:-translate-y-1">
                    <MapPin className="h-5 w-5" />
                  </span>
                </div>
                <span className="absolute bottom-3 right-4 font-mono text-[10px] tracking-wider text-slate-400 dark:text-slate-500">6°29′ S · 106°48′ E</span>
              </div>
              <div className="flex items-start justify-between gap-4 p-6">
                <div>
                  <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400">📍 {t.about.basedIn}</p>
                  <p className="mt-2 text-lg font-bold text-slate-900 dark:text-white">{l(profile.location)}</p>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Bojong+Gede,+Bogor,+Indonesia"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Google Maps"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-brand-400 hover:text-brand-600 dark:border-white/10 dark:text-slate-400 dark:hover:text-white"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>

            {/* Quick facts */}
            <Reveal delay={200} className="card p-6 sm:p-7">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">{t.about.factsTitle}</p>
              <ul className="mt-5 space-y-4">
                {quickFacts.map(({ key, value }) => {
                  const Icon = factIcons[key];
                  return (
                    <li key={key} className="flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-brand-600 dark:bg-white/[0.06] dark:text-brand-300">
                        <Icon className="h-[18px] w-[18px]" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{t.about[key]}</p>
                        <p className="text-sm font-semibold leading-snug text-slate-800 dark:text-slate-100">{l(value)}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
