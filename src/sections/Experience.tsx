import { CalendarDays, CircleCheck } from "lucide-react";
import { Container, Img, Reveal, SectionHeading } from "@/components/ui";
import { experiences } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/utils/cn";

export function Experience() {
  const { t, l } = useLanguage();

  return (
    <section id="experience" className="relative border-y border-slate-200/70 bg-white/50 py-24 md:py-32 dark:border-white/[0.05] dark:bg-white/[0.015]">
      <Container className="max-w-5xl">
        <SectionHeading index="04" eyebrow={t.experience.eyebrow} title={`📑 ${t.experience.title}`} subtitle={t.experience.subtitle} />

        <div className="relative">
          {/* timeline rail */}
          <div aria-hidden className="absolute bottom-6 left-[1.4rem] top-6 w-px bg-gradient-to-b from-brand-500 via-sky-400/60 to-leaf-500/30 sm:left-[1.9rem]" />

          <ol className="space-y-8">
            {experiences.map((exp, i) => (
              <li key={exp.period.en} className="relative pl-14 sm:pl-20">
                {/* timeline node */}
                <span className="absolute left-0 top-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-white p-1.5 shadow-md ring-4 ring-slate-50 sm:h-[3.75rem] sm:w-[3.75rem] sm:p-2 dark:ring-ink-950">
                  <Img src={exp.logo} alt={`${l(exp.org)} logo`} className="h-full w-full object-contain" />
                  {exp.current && (
                    <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5">
                      <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-leaf-400" />
                      <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-leaf-500 dark:border-ink-950" />
                    </span>
                  )}
                </span>

                <Reveal delay={i * 80}>
                  <article
                    className={cn(
                      "card group p-6 transition-all duration-500 hover:shadow-xl hover:shadow-brand-900/5 sm:p-8",
                      exp.current && "border-brand-200 dark:border-brand-400/25",
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 font-mono text-[11px] font-medium text-slate-600 dark:bg-white/[0.06] dark:text-slate-300">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {l(exp.period)}
                      </span>
                      <span className="rounded-full border border-slate-200 px-2.5 py-0.5 text-[11px] font-semibold text-slate-500 dark:border-white/10 dark:text-slate-400">
                        {l(exp.type)}
                      </span>
                      {exp.current && (
                        <span className="rounded-full bg-leaf-300/30 px-2.5 py-0.5 text-[11px] font-bold text-leaf-700 dark:bg-leaf-500/15 dark:text-leaf-300">
                          {t.experience.current}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white">{l(exp.role)}</h3>
                    <p className="mt-1.5 text-sm font-medium italic text-brand-700 sm:text-[15px] dark:text-brand-300">{l(exp.org)}</p>

                    <ul className="mt-5 space-y-3">
                      {l(exp.points).map((point) => (
                        <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                          <CircleCheck className="mt-[3px] h-[18px] w-[18px] shrink-0 text-leaf-500" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
