import { useRef, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { Modal } from "@/components/Modal";
import { Container, Img, Reveal, SectionHeading } from "@/components/ui";
import { activities, type Activity } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/utils/cn";

export function Activities() {
  const { t, l } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [photo, setPhoto] = useState(0);
  const lastIndex = useRef(0);

  if (openIndex !== null) lastIndex.current = openIndex;
  const current = activities[lastIndex.current];

  const open = (i: number) => {
    setPhoto(0);
    setOpenIndex(i);
  };
  const stepPhoto = (dir: 1 | -1) => setPhoto((p) => (p + dir + current.images.length) % current.images.length);

  return (
    <section id="activities" className="relative py-24 md:py-32">
      <Container>
        <SectionHeading index="07" eyebrow={t.activities.eyebrow} title={`📸 ${t.activities.title}`} subtitle={t.activities.subtitle} />

        <div className="grid auto-rows-[16rem] gap-4 sm:grid-cols-2 lg:auto-rows-[14.5rem] lg:grid-cols-4">
          {activities.map((activity, i) => (
            <Reveal key={activity.id} delay={i * 80} className={cn("h-full", i === 0 && "sm:col-span-2 sm:row-span-2")}>
              <ActivityCard activity={activity} featured={i === 0} onOpen={() => open(i)} />
            </Reveal>
          ))}
        </div>
      </Container>

      <Modal
        open={openIndex !== null}
        onClose={() => setOpenIndex(null)}
        onPrev={() => stepPhoto(-1)}
        onNext={() => stepPhoto(1)}
        closeLabel={t.a11y.close}
        labelledBy="activity-modal-title"
        className="max-w-5xl"
      >
        {current && (
          <div className="grid lg:grid-cols-[1.5fr_1fr]">
            {/* Photo viewer */}
            <div className="relative flex min-h-[18rem] flex-col bg-ink-950">
              <div className="relative flex flex-1 items-center justify-center p-3 sm:p-5">
                <img
                  key={current.images[photo]}
                  src={current.images[photo]}
                  alt={`${l(current.title)} — ${photo + 1}`}
                  className="max-h-[56vh] w-auto animate-fade-in rounded-xl object-contain"
                />
                {current.images.length > 1 && (
                  <>
                    <button type="button" onClick={() => stepPhoto(-1)} aria-label={t.a11y.previous} className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white/30">
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button type="button" onClick={() => stepPhoto(1)} aria-label={t.a11y.next} className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white/30">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 font-mono text-[11px] text-white backdrop-blur">
                      {photo + 1} / {current.images.length}
                    </span>
                  </>
                )}
              </div>
              {current.images.length > 1 && (
                <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-4">
                  {current.images.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setPhoto(i)}
                      aria-label={`${i + 1}`}
                      aria-current={i === photo}
                      className={cn(
                        "h-14 w-20 shrink-0 overflow-hidden rounded-lg ring-2 transition",
                        i === photo ? "opacity-100 ring-brand-400" : "opacity-50 ring-transparent hover:opacity-90",
                      )}
                    >
                      <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-6 sm:p-8 lg:pt-14">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 font-mono text-[11px] font-medium text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
                <CalendarDays className="h-3.5 w-3.5" />
                {l(current.date)}
              </span>
              <h3 id="activity-modal-title" className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {l(current.title)}
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">{l(current.description)}</p>
              <p className="mt-6 flex items-center gap-2 text-xs font-medium text-slate-400">
                <Images className="h-4 w-4" />
                {current.images.length} {current.images.length > 1 ? t.activities.photos : t.activities.photo}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}

function ActivityCard({ activity, featured, onOpen }: { activity: Activity; featured: boolean; onOpen: () => void }) {
  const { t, l } = useLanguage();
  const count = activity.images.length;

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${t.activities.viewGallery}: ${l(activity.title)} (${l(activity.date)})`}
      className="group relative block h-full w-full overflow-hidden rounded-3xl bg-slate-200 text-left shadow-sm ring-1 ring-slate-200/70 dark:bg-white/5 dark:ring-white/10"
    >
      <Img src={activity.images[0]} alt="" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105" />
      <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/25 to-transparent transition-opacity duration-500 group-hover:opacity-95" />

      <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/35 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
        <Images className="h-3.5 w-3.5" />
        {count}
      </span>

      <span className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 font-mono text-[11px] text-white/90 backdrop-blur-md">
          <CalendarDays className="h-3.5 w-3.5" />
          {l(activity.date)}
        </span>
        <span className={cn("mt-3 block font-bold leading-snug text-white", featured ? "text-2xl sm:text-3xl" : "text-lg")}>{l(activity.title)}</span>
        {featured && <span className="mt-2 line-clamp-2 block max-w-xl text-sm text-white/75">{l(activity.description)}</span>}
        <span className="mt-3 inline-flex translate-y-2 items-center gap-1 text-xs font-semibold text-white/0 transition-all duration-500 group-hover:translate-y-0 group-hover:text-white/90">
          {t.activities.viewGallery} →
        </span>
      </span>
    </button>
  );
}
