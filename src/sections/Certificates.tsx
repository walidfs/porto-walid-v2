import { useMemo, useRef, useState } from "react";
import { Award, BadgeCheck, ChevronDown, ChevronLeft, ChevronRight, Expand, Mic, Presentation, ScanSearch } from "lucide-react";
import { Modal } from "@/components/Modal";
import { Container, FilterTabs, Img, Reveal, SectionHeading } from "@/components/ui";
import { certificates, type Certificate, type CertificateCategory } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/utils/cn";

type Filter = "all" | CertificateCategory;
const INITIAL_COUNT = 6;
const CATEGORIES: CertificateCategory[] = ["competency", "conference", "training", "seminar"];

const categoryMeta: Record<CertificateCategory, { icon: typeof Award; className: string }> = {
  competency: { icon: BadgeCheck, className: "bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300" },
  conference: { icon: Presentation, className: "bg-amber-100 text-amber-800 dark:bg-amber-400/15 dark:text-amber-300" },
  training: { icon: Award, className: "bg-leaf-300/30 text-leaf-700 dark:bg-leaf-500/15 dark:text-leaf-300" },
  seminar: { icon: Mic, className: "bg-sky-100 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300" },
};

export function Certificates() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<Filter>("all");
  const [expanded, setExpanded] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const lastIndex = useRef(0);

  const filtered = useMemo(() => (filter === "all" ? certificates : certificates.filter((c) => c.category === filter)), [filter]);
  const visible = expanded || filtered.length <= INITIAL_COUNT + 1 ? filtered : filtered.slice(0, INITIAL_COUNT);
  if (openIndex !== null) lastIndex.current = openIndex;
  const current = filtered[lastIndex.current] ?? filtered[0];

  const options: { value: Filter; label: string; count: number }[] = [
    { value: "all", label: t.certificates.filters.all, count: certificates.length },
    ...CATEGORIES.map((c) => ({ value: c, label: t.certificates.filters[c], count: certificates.filter((x) => x.category === c).length })),
  ];

  const changeFilter = (f: Filter) => {
    setFilter(f);
    setExpanded(false);
  };
  const step = (dir: 1 | -1) => setOpenIndex((i) => (i === null ? i : (i + dir + filtered.length) % filtered.length));

  return (
    <section id="certificates" className="relative border-y border-slate-200/70 bg-white/50 py-24 md:py-32 dark:border-white/[0.05] dark:bg-white/[0.015]">
      <Container>
        <SectionHeading index="06" eyebrow={t.certificates.eyebrow} title={`📜 ${t.certificates.title}`} subtitle={t.certificates.subtitle} />

        <FilterTabs label={t.certificates.title} options={options} value={filter} onChange={changeFilter} />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((cert, i) => (
            <Reveal key={`${filter}-${cert.id}`} delay={(i % 3) * 80} className="h-full">
              <CertificateCard cert={cert} onOpen={() => setOpenIndex(i)} />
            </Reveal>
          ))}
        </div>

        {filtered.length > INITIAL_COUNT + 1 && (
          <div className="mt-10 flex justify-center">
            <button type="button" onClick={() => setExpanded((v) => !v)} aria-expanded={expanded} className="btn-ghost">
              {expanded ? t.certificates.showLess : `${t.certificates.showAll} (${filtered.length})`}
              <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", expanded && "rotate-180")} />
            </button>
          </div>
        )}
      </Container>

      <Modal
        open={openIndex !== null && !!current}
        onClose={() => setOpenIndex(null)}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
        closeLabel={t.a11y.close}
        labelledBy="cert-modal-title"
        className="max-w-4xl"
      >
        {current && <CertificateDetail cert={current} index={lastIndex.current} total={filtered.length} onPrev={() => step(-1)} onNext={() => step(1)} />}
      </Modal>
    </section>
  );
}

function CertificateCard({ cert, onOpen }: { cert: Certificate; onOpen: () => void }) {
  const { t, l } = useLanguage();
  const meta = categoryMeta[cert.category];
  const Icon = meta.icon;

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${t.certificates.view}: ${l(cert.title)}`}
      className="card group flex h-full w-full flex-col overflow-hidden text-left transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand-900/10"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-white/[0.04]">
        <div aria-hidden className="bg-dots absolute inset-0 opacity-60" />
        <Img src={cert.image} alt="" className="relative h-full w-full object-contain p-5 drop-shadow-lg group-hover:scale-[1.04]" />
        <span aria-hidden className="absolute inset-0 flex items-center justify-center bg-ink-950/0 opacity-0 transition-all duration-500 group-hover:bg-ink-950/30 group-hover:opacity-100">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink-950 shadow-xl">
            <ScanSearch className="h-5 w-5" />
          </span>
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className={cn("inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold", meta.className)}>
          <Icon className="h-3.5 w-3.5" />
          {t.certificates.filters[cert.category]}
        </span>
        <h3 className="mt-3 line-clamp-3 text-[15px] font-bold leading-snug text-slate-900 dark:text-white">{l(cert.title)}</h3>
        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <span className="truncate font-mono text-[11px] text-slate-400">{cert.issuer ?? ""}</span>
          <span aria-hidden className="text-base transition-transform duration-300 group-hover:scale-125">🔍</span>
        </div>
      </div>
    </button>
  );
}

function CertificateDetail({ cert, index, total, onPrev, onNext }: { cert: Certificate; index: number; total: number; onPrev: () => void; onNext: () => void }) {
  const { t, l } = useLanguage();
  const meta = categoryMeta[cert.category];
  const Icon = meta.icon;

  return (
    <div>
      <div className="relative flex items-center justify-center bg-slate-100 px-4 pb-4 pt-16 sm:px-14 sm:pb-8 sm:pt-14 dark:bg-black/30">
        <img key={cert.image} src={cert.image} alt={l(cert.title)} className="max-h-[62vh] w-auto animate-fade-in rounded-lg object-contain shadow-2xl" />
        {total > 1 && (
          <>
            <button type="button" onClick={onPrev} aria-label={t.a11y.previous} className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-lg transition hover:scale-105 sm:flex dark:bg-ink-800/90 dark:text-white">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button type="button" onClick={onNext} aria-label={t.a11y.next} className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-lg transition hover:scale-105 sm:flex dark:bg-ink-800/90 dark:text-white">
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
      <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-7">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold", meta.className)}>
              <Icon className="h-3.5 w-3.5" />
              {t.certificates.filters[cert.category]}
            </span>
            <span className="font-mono text-[11px] text-slate-400">
              {index + 1} / {total}
            </span>
          </div>
          <h3 id="cert-modal-title" className="mt-3 text-lg font-bold leading-snug text-slate-900 sm:text-xl dark:text-white">
            {l(cert.title)}
          </h3>
          {cert.issuer && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{cert.issuer}</p>}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {total > 1 && (
            <div className="flex gap-2 sm:hidden">
              <button type="button" onClick={onPrev} aria-label={t.a11y.previous} className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 dark:border-white/10">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button type="button" onClick={onNext} aria-label={t.a11y.next} className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 dark:border-white/10">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
          <a href={cert.image} target="_blank" rel="noopener noreferrer" className="btn-ghost py-2.5">
            <Expand className="h-4 w-4" />
            {t.certificates.openFull}
          </a>
        </div>
      </div>
    </div>
  );
}
