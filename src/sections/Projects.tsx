import { useMemo, useRef, useState } from "react";
import { ArrowRight, CalendarDays, ChevronLeft, ChevronRight, CircleCheck, ExternalLink, FlaskConical, HandHeart, MapPin, MonitorSmartphone, ScanSearch, User } from "lucide-react";
import { Modal } from "@/components/Modal";
import { Container, FilterTabs, Img, Reveal, SectionHeading } from "@/components/ui";
import { projects, type Project, type ProjectCategory } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/utils/cn";

type Filter = "all" | ProjectCategory;

const categoryStyle: Record<ProjectCategory, { icon: typeof FlaskConical; className: string }> = {
  research: { icon: FlaskConical, className: "bg-brand-600/90 text-white" },
  design: { icon: MonitorSmartphone, className: "bg-sky-500/90 text-white" },
  social: { icon: HandHeart, className: "bg-leaf-600/90 text-white" },
};

export function Projects() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<Filter>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const lastIndex = useRef(0);

  const filtered = useMemo(() => (filter === "all" ? projects : projects.filter((p) => p.category === filter)), [filter]);
  if (openIndex !== null) lastIndex.current = openIndex;
  const current = filtered[lastIndex.current] ?? filtered[0];

  const options: { value: Filter; label: string; count: number }[] = [
    { value: "all", label: t.projects.filters.all, count: projects.length },
    ...(["research", "design", "social"] as const).map((c) => ({
      value: c,
      label: t.projects.filters[c],
      count: projects.filter((p) => p.category === c).length,
    })),
  ];

  const step = (dir: 1 | -1) => setOpenIndex((i) => (i === null ? i : (i + dir + filtered.length) % filtered.length));

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <Container>
        <SectionHeading index="05" eyebrow={t.projects.eyebrow} title={`📚 ${t.projects.title}`} subtitle={t.projects.subtitle} />

        <FilterTabs label={t.projects.title} options={options} value={filter} onChange={setFilter} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <Reveal key={`${filter}-${project.id}`} delay={(i % 3) * 90} className="h-full">
              <ProjectCard project={project} onOpen={() => setOpenIndex(i)} />
            </Reveal>
          ))}
        </div>
      </Container>

      <Modal
        open={openIndex !== null && !!current}
        onClose={() => setOpenIndex(null)}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
        closeLabel={t.a11y.close}
        labelledBy="project-modal-title"
        className="max-w-3xl"
      >
        {current && <ProjectDetail project={current} onPrev={() => step(-1)} onNext={() => step(1)} total={filtered.length} />}
      </Modal>
    </section>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const { t, l } = useLanguage();
  const cat = categoryStyle[project.category];
  const CatIcon = cat.icon;

  return (
    <article className="card group flex h-full flex-col overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand-900/10">
      <button type="button" onClick={onOpen} className="relative block aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-white/5" aria-label={`${t.projects.viewDetails}: ${l(project.title)}`}>
        <Img src={project.image} alt="" className="h-full w-full object-cover object-top group-hover:scale-105" />
        <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent" />
        <span className={cn("absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-lg backdrop-blur", cat.className)}>
          <CatIcon className="h-3.5 w-3.5" />
          {t.projects.filters[project.category]}
        </span>
        <span aria-hidden className="absolute inset-0 flex items-center justify-center bg-ink-950/0 opacity-0 transition-all duration-500 group-hover:bg-ink-950/35 group-hover:opacity-100">
          <span className="flex h-14 w-14 scale-75 items-center justify-center rounded-full bg-white text-ink-950 shadow-xl transition-transform duration-500 group-hover:scale-100">
            <ScanSearch className="h-6 w-6" />
          </span>
        </span>
      </button>

      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-1.5 font-mono text-[11px] text-slate-500 dark:text-slate-400">
          <CalendarDays className="h-3.5 w-3.5" />
          {l(project.period)}
        </p>
        <h3 className="mt-3 text-lg font-bold leading-snug text-slate-900 dark:text-white">{l(project.title)}</h3>
        <p className={cn("mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400", project.category === "research" && "italic")}>{l(project.summary)}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.badge && (
            <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800 dark:bg-amber-400/15 dark:text-amber-300">{l(project.badge)}</span>
          )}
          {project.tools.map((tool) => (
            <span key={tool} className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-600 dark:bg-white/[0.06] dark:text-slate-300">
              {tool}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <button type="button" onClick={onOpen} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-all hover:gap-2.5 dark:text-brand-400">
            🔍 {t.projects.viewDetails}
            <ArrowRight className="h-4 w-4" />
          </button>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={project.linkLabel ? l(project.linkLabel) : t.projects.openLink}
              title={project.linkLabel ? l(project.linkLabel) : t.projects.openLink}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-brand-400 hover:text-brand-600 dark:border-white/10 dark:text-slate-400 dark:hover:text-white"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function ProjectDetail({ project, onPrev, onNext, total }: { project: Project; onPrev: () => void; onNext: () => void; total: number }) {
  const { t, l } = useLanguage();
  const cat = categoryStyle[project.category];
  const CatIcon = cat.icon;

  const meta = [
    { icon: CalendarDays, label: t.projects.period, value: l(project.period) },
    { icon: MapPin, label: t.projects.location, value: l(project.location) },
    { icon: User, label: t.projects.role, value: l(project.role) },
  ];

  return (
    <div>
      <div className="relative flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200/60 p-4 pt-14 sm:p-8 sm:pt-12 dark:from-white/[0.04] dark:to-white/[0.01]">
        <img key={project.image} src={project.image} alt={l(project.title)} className="max-h-[38vh] w-auto animate-fade-in rounded-xl object-contain shadow-xl" />
      </div>

      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold", cat.className)}>
            <CatIcon className="h-3.5 w-3.5" />
            {t.projects.filters[project.category]}
          </span>
          {project.badge && (
            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-800 dark:bg-amber-400/15 dark:text-amber-300">{l(project.badge)}</span>
          )}
        </div>

        <h3 id="project-modal-title" className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
          {l(project.title)}
        </h3>
        <p className={cn("mt-3 leading-relaxed text-slate-600 dark:text-slate-300", project.category === "research" && "font-medium italic")}>{l(project.summary)}</p>

        <dl className="mt-6 grid gap-3 sm:grid-cols-3">
          {meta.map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-2xl bg-slate-50 p-4 dark:bg-white/[0.04]">
              <dt className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                <Icon className="h-3.5 w-3.5" /> {label}
              </dt>
              <dd className="mt-1.5 text-sm font-semibold leading-snug text-slate-800 dark:text-slate-100">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{t.projects.tools}:</span>
          {project.tools.map((tool) => (
            <span key={tool} className="rounded-lg bg-brand-50 px-2.5 py-1 font-mono text-xs font-medium text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
              {tool}
            </span>
          ))}
        </div>

        <h4 className="mt-7 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">{t.projects.highlights}</h4>
        <ul className="mt-3 space-y-2.5">
          {l(project.details).map((d) => (
            <li key={d} className="flex gap-3 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
              <CircleCheck className="mt-[3px] h-[18px] w-[18px] shrink-0 text-leaf-500" />
              {d}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col-reverse gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
          {total > 1 ? (
            <div className="flex items-center gap-2">
              <button type="button" onClick={onPrev} aria-label={t.a11y.previous} className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-brand-400 hover:text-brand-600 dark:border-white/10 dark:text-slate-300">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button type="button" onClick={onNext} aria-label={t.a11y.next} className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-brand-400 hover:text-brand-600 dark:border-white/10 dark:text-slate-300">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <span />
          )}
          {project.link ? (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-primary">
              {project.linkLabel ? l(project.linkLabel) : t.projects.openLink}
              <ExternalLink className="h-4 w-4" />
            </a>
          ) : (
            <span className="text-sm text-slate-400">{t.projects.noLink}</span>
          )}
        </div>
      </div>
    </div>
  );
}
