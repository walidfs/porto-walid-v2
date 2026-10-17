import { Container, Img, Reveal, SectionHeading } from "@/components/ui";
import { skills } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageContext";

export function Skills() {
  const { t, l } = useLanguage();

  return (
    <section id="skills" className="relative py-24 md:py-32">
      <Container>
        <SectionHeading index="03" eyebrow={t.skills.eyebrow} title={`🛠️ ${t.skills.title}`} subtitle={t.skills.subtitle} />

        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {skills.map((skill, i) => (
            <li key={skill.name.en}>
              <Reveal delay={(i % 6) * 70} className="h-full">
                <div className="card group relative flex h-full flex-col items-center overflow-hidden px-4 py-6 text-center transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-900/5 dark:hover:border-brand-400/40">
                  <div aria-hidden className="absolute -top-10 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-brand-500/0 blur-2xl transition-colors duration-500 group-hover:bg-brand-500/20" />
                  <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-200/80 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 dark:ring-white/10">
                    <Img src={skill.icon} alt="" className="h-full w-full object-contain" />
                  </span>
                  <p className="relative mt-4 font-bold text-slate-900 dark:text-white">{l(skill.name)}</p>
                  <p className="relative mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">{l(skill.category)}</p>
                </div>
              </Reveal>
            </li>
          ))}
          {/* "+ always learning" tile to complete the grid */}
          <li>
            <Reveal delay={350} className="h-full">
              <div className="flex h-full min-h-[10.5rem] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 px-4 py-6 text-center dark:border-white/15">
                <span className="text-gradient text-3xl font-extrabold">+</span>
                <p className="mt-2 text-sm font-semibold text-slate-500 dark:text-slate-400">{t.skills.learning}</p>
              </div>
            </Reveal>
          </li>
        </ul>
      </Container>
    </section>
  );
}
