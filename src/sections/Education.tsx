import { Container, Img, Reveal, SectionHeading } from "@/components/ui";
import { education } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/utils/cn";

export function Education() {
  const { t, l } = useLanguage();

  return (
    <section id="education" className="relative border-y border-slate-200/70 bg-white/50 py-24 md:py-32 dark:border-white/[0.05] dark:bg-white/[0.015]">
      <Container>
        <SectionHeading index="02" eyebrow={t.education.eyebrow} title={`🎓 ${t.education.title}`} subtitle={t.education.subtitle} />

        <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* connecting line (desktop) */}
          <li aria-hidden className="pointer-events-none absolute inset-x-8 top-[58px] hidden h-px bg-gradient-to-r from-brand-500/10 via-brand-500/50 to-leaf-500/60 lg:block" />
          {education.map((item, i) => (
            <li key={item.period.en} className="relative">
              <Reveal delay={i * 110} className="h-full">
                <article
                  className={cn(
                    "card group relative flex h-full flex-col p-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-900/5",
                    item.current && "ring-2 ring-brand-500/40 dark:ring-brand-400/40",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="relative z-10 flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-2xl bg-white p-2.5 shadow-sm ring-1 ring-slate-200 dark:ring-white/10">
                      <Img src={item.logo} alt={`${l(item.school)} logo`} className="h-full w-full object-contain" />
                    </span>
                    <span className="font-mono text-4xl font-bold leading-none text-slate-100 transition-colors group-hover:text-brand-100 dark:text-white/[0.06] dark:group-hover:text-brand-400/20">
                      0{i + 1}
                    </span>
                  </div>
                  <p className="mt-6 font-mono text-xs font-medium text-brand-600 dark:text-brand-400">{l(item.period)}</p>
                  <h3 className="mt-2 text-lg font-bold leading-snug text-slate-900 dark:text-white">{l(item.school)}</h3>
                  <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{l(item.level)}</p>
                  {item.program && <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{l(item.program)}</p>}
                  {item.current && (
                    <div className="mt-auto pt-5">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-500" />
                        {t.education.inProgress}
                      </span>
                    </div>
                  )}
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
