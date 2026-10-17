import { useEffect, useId, useMemo, useState, type ReactNode } from "react";
import { ArrowRight, BookOpen, Briefcase, ChartColumn, ChevronDown, CodeXml, Download, GraduationCap, Mail, PenTool } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/BrandIcons";
import { Container } from "@/components/ui";
import { certificates, experiences, greetings, profile, projects, roles } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/utils/cn";

function GreetingRotator({ first }: { first: string }) {
  const list = useMemo(() => [first, ...greetings.filter((g) => g !== first)], [first]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % list.length), 2200);
    return () => window.clearInterval(id);
  }, [list]);

  return (
    <span key={index} className="inline-block animate-fade-up" dir="auto">
      {list[index]}
    </span>
  );
}

/** Decorative PCB traces echoing the circuit pattern of the WFS logo. */
function CircuitLines({ className }: { className?: string }) {
  const gid = useId().replace(/:/g, "");
  const paths = [
    "M0 70 H150 L190 110 H330",
    "M0 190 H80 L120 150 H250 L290 190 H430",
    "M0 310 H190 L230 270 H370 L410 310 H560",
    "M60 400 V350 L100 310 H150",
  ];
  const nodes: [number, number][] = [
    [330, 110],
    [430, 190],
    [560, 310],
    [150, 310],
    [190, 110],
    [250, 150],
  ];
  return (
    <svg viewBox="0 0 600 400" fill="none" className={className} aria-hidden>
      <defs>
        <linearGradient id={`flow-${gid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#3377ff" />
          <stop offset="1" stopColor="#66c23a" />
        </linearGradient>
      </defs>
      <g stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        {paths.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g stroke={`url(#flow-${gid})`} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="28 372" className="animate-dash">
        {paths.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g fill="#f8fafc" stroke="currentColor" strokeWidth="1.5" className="dark:[fill:#060b17]">
        {nodes.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="4.5" />
        ))}
      </g>
    </svg>
  );
}

const roleIcons = [PenTool, CodeXml, ChartColumn];

export function Hero() {
  const { t, l, lang } = useLanguage();

  const stats = [
    { value: experiences.length, label: t.stats.experiences },
    { value: projects.length, label: t.stats.projects },
    { value: certificates.length, label: t.stats.certificates },
    { value: certificates.filter((c) => c.category === "conference").length, label: t.stats.conferences },
  ];

  const socials = [
    { href: profile.socials.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
    { href: profile.socials.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: profile.socials.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: `mailto:${profile.primaryEmail}`, label: "Email", Icon: Mail },
  ];

  return (
    <section id="home" className="relative isolate flex items-center overflow-hidden pb-20 pt-28 sm:pt-32 lg:min-h-[100svh] lg:pb-16 lg:pt-24">
      {/* Background */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid" />
      <div aria-hidden className="absolute -top-48 left-[-10%] -z-10 h-[34rem] w-[34rem] rounded-full bg-brand-500/20 blur-3xl dark:bg-brand-600/25" />
      <div aria-hidden className="absolute -right-32 top-1/4 -z-10 h-[30rem] w-[30rem] rounded-full bg-leaf-400/15 blur-3xl dark:bg-leaf-500/10" />
      <CircuitLines className="absolute -left-10 bottom-0 -z-10 hidden w-[42rem] text-slate-300 opacity-70 md:block dark:text-white/10" />

      <Container className="grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        {/* Text */}
        <div className="max-w-2xl">
          <div className="inline-flex animate-fade-up items-center gap-2.5 rounded-full border border-slate-200 bg-white/80 py-1.5 pl-2 pr-4 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 dark:bg-white/10">
              <span className="inline-block origin-[70%_70%] animate-wave">👋</span>
            </span>
            <GreetingRotator key={lang} first={lang === "id" ? "Halo" : "Hello"} />
          </div>

          <h1 className="mt-7 animate-fade-up text-[2.6rem] font-extrabold leading-[1.04] tracking-tight text-slate-900 [animation-delay:80ms] sm:text-6xl xl:text-7xl dark:text-white">
            <span className="block text-2xl font-semibold tracking-normal text-slate-500 sm:text-3xl dark:text-slate-400">{t.hero.intro}</span>
            <span className="text-gradient animate-shimmer">{profile.name}</span>
          </h1>

          <ul className="mt-7 flex animate-fade-up flex-wrap gap-2 [animation-delay:160ms]">
            {l(roles).map((role, i) => {
              const Icon = roleIcons[i] ?? PenTool;
              return (
                <li key={role} className="chip py-1.5 text-[13px] font-semibold text-slate-700 dark:text-slate-200">
                  <Icon className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400" />
                  {role}
                </li>
              );
            })}
          </ul>

          <p className="mt-6 max-w-xl animate-fade-up text-base leading-relaxed text-slate-600 [animation-delay:220ms] sm:text-lg dark:text-slate-400">
            {t.hero.summary}
          </p>

          <div className="mt-9 flex animate-fade-up flex-wrap items-center gap-3 [animation-delay:280ms]">
            <a href="#projects" className="btn-primary group">
              {t.hero.ctaProjects}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href={profile.cvUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <Download className="h-4 w-4" />
              {t.hero.ctaCv}
            </a>
            <div className="ml-1 flex items-center gap-1">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-white hover:text-brand-600 hover:shadow-md dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <dl className="mt-12 grid max-w-xl animate-fade-up grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 [animation-delay:340ms] sm:grid-cols-4 dark:border-white/10 dark:bg-white/10">
            {stats.map((s) => (
              <div key={s.label} className="bg-white/90 px-4 py-4 backdrop-blur dark:bg-ink-950/90">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                    {s.value}
                  </span>
                  <span className="mt-0.5 block text-xs font-medium leading-snug text-slate-500 dark:text-slate-400">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Photo */}
        <div className="relative mx-auto w-full max-w-[22rem] animate-fade-up [animation-delay:200ms] sm:max-w-sm lg:max-w-[26rem]">
          <div aria-hidden className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-brand-500/30 via-sky-400/10 to-leaf-500/30 blur-2xl" />
          <div className="relative rounded-[2.25rem] bg-gradient-to-br from-brand-500 via-sky-400 to-leaf-500 p-[2px] shadow-2xl shadow-brand-900/20">
            <div className="relative overflow-hidden rounded-[calc(2.25rem-2px)] bg-slate-100 dark:bg-ink-900">
              <img
                src={profile.photo}
                alt={profile.name}
                width={650}
                height={812}
                fetchPriority="high"
                className="aspect-[4/5] w-full object-cover"
              />
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink-950/85 via-ink-950/40 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3 text-white">
                <div>
                  <p className="text-base font-bold leading-tight">Walid F. Sastriana</p>
                  <p className="mt-0.5 text-xs text-white/70">{l(profile.location).replace(/\.$/, "")}</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-leaf-400" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-leaf-400" />
                  </span>
                  {t.hero.status}
                </span>
              </div>
            </div>
          </div>

          {/* Floating badges */}
          <FloatingBadge className="-left-3 top-8 animate-float sm:-left-12" icon={<GraduationCap className="h-4 w-4" />} tone="brand">
            {t.hero.badgeDegree}
          </FloatingBadge>
          <FloatingBadge className="-right-3 top-[42%] animate-float-slow sm:-right-14" icon={<Briefcase className="h-4 w-4" />} tone="leaf" sub={t.hero.badgeWorkSub}>
            {t.hero.badgeWork}
          </FloatingBadge>
          <FloatingBadge className="-bottom-6 left-4 animate-float [animation-delay:1.5s] sm:-left-6" icon={<BookOpen className="h-4 w-4" />} tone="amber">
            {t.hero.badgePublish}
          </FloatingBadge>
        </div>
      </Container>

      <a
        href="#about"
        aria-label={t.hero.scroll}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400 transition hover:text-brand-600 lg:flex dark:text-slate-500"
      >
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
}

function FloatingBadge({
  className,
  icon,
  tone,
  sub,
  children,
}: {
  className?: string;
  icon: ReactNode;
  tone: "brand" | "leaf" | "amber";
  sub?: string;
  children: ReactNode;
}) {
  const tones = {
    brand: "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300",
    leaf: "bg-leaf-300/30 text-leaf-700 dark:bg-leaf-500/15 dark:text-leaf-300",
    amber: "bg-amber-100 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300",
  };
  return (
    <div
      className={cn(
        "absolute z-10 flex max-w-[15rem] items-center gap-2.5 rounded-2xl border border-white/60 bg-white/90 py-2 pl-2 pr-3.5 shadow-xl shadow-slate-900/10 backdrop-blur-md dark:border-white/10 dark:bg-ink-800/90 dark:shadow-black/30",
        className,
      )}
    >
      <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-xl", tones[tone])}>{icon}</span>
      <span className="min-w-0">
        <span className="block text-[12px] font-bold leading-tight text-slate-800 dark:text-white">{children}</span>
        {sub && <span className="mt-0.5 block text-[11px] leading-tight text-slate-500 dark:text-slate-400">{sub}</span>}
      </span>
    </div>
  );
}
