import { useState, type FormEvent } from "react";
import { Check, Copy, Download, FileText, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/BrandIcons";
import { Container, Reveal, SectionHeading } from "@/components/ui";
import { profile } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/utils/cn";

/* --------------------------------- CV ---------------------------------- */
export function CV() {
  const { t } = useLanguage();

  return (
    <section id="cv" className="relative py-12 md:py-16">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-700 via-brand-600 to-sky-500 px-6 py-12 text-white shadow-2xl shadow-brand-900/20 sm:px-12 md:py-14">
            <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-40" />
            <div aria-hidden className="absolute -right-20 -top-20 -z-10 h-72 w-72 rounded-full bg-leaf-400/40 blur-3xl" />
            <div aria-hidden className="absolute -bottom-24 left-1/3 -z-10 h-64 w-64 rounded-full bg-sky-300/30 blur-3xl" />
            <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-5">
                <span className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur sm:flex">
                  <FileText className="h-8 w-8" />
                </span>
                <div>
                  <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">📄 {t.cv.title}</h2>
                  <p className="mt-3 max-w-xl text-base text-white/80 sm:text-lg">{t.cv.subtitle}</p>
                </div>
              </div>
              <a
                href={profile.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-brand-700 shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl"
              >
                <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                {t.cv.download}
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ------------------------------- Contact ------------------------------- */
async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const el = document.createElement("textarea");
    el.value = text;
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(el);
    return ok;
  }
}

function CopyButton({ value }: { value: string }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    if (await copyText(value)) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={`${t.contact.copy} ${value}`}
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition",
        copied
          ? "border-leaf-500/40 bg-leaf-300/20 text-leaf-700 dark:text-leaf-300"
          : "border-slate-200 text-slate-500 hover:border-brand-400 hover:text-brand-600 dark:border-white/10 dark:text-slate-400 dark:hover:text-white",
      )}
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? t.contact.copied : t.contact.copy}
    </button>
  );
}

const inputClass =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-brand-400";

export function Contact() {
  const { t, l } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const phoneDigits = profile.phone.replace(/\D/g, "");
  const hasWhatsApp = phoneDigits.length >= 9;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = form.subject.trim() || t.contact.defaultSubject;
    const body = `${form.message.trim()}\n\n—\n${t.contact.from}: ${form.name.trim()}${form.email.trim() ? ` <${form.email.trim()}>` : ""}`;
    window.location.href = `mailto:${profile.primaryEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const socials = [
    { href: profile.socials.linkedin, label: "LinkedIn", handle: "Walid Fernando Sastriana", Icon: LinkedinIcon },
    { href: profile.socials.instagram, label: "Instagram", handle: "@liddddd_14", Icon: InstagramIcon },
    { href: profile.socials.facebook, label: "Facebook", handle: "walid.fernando.s", Icon: FacebookIcon },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div aria-hidden className="absolute left-1/2 top-1/3 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-brand-500/10 blur-3xl" />
      <Container>
        <SectionHeading index="08" eyebrow={t.contact.eyebrow} title={`📞 ${t.contact.title}`} subtitle={t.contact.subtitle} />

        <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-8">
          <div className="grid content-start gap-5">
            {/* Email */}
            <Reveal className="card p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
                  <Mail className="h-5 w-5" />
                </span>
                <p className="font-bold text-slate-900 dark:text-white">{t.contact.email}</p>
              </div>
              <ul className="mt-4 space-y-2.5">
                {profile.emails.map((email) => (
                  <li key={email} className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3 dark:bg-white/[0.04]">
                    <a href={`mailto:${email}`} className="min-w-0 truncate text-sm font-medium text-slate-700 hover:text-brand-600 dark:text-slate-200 dark:hover:text-brand-300">
                      {email}
                    </a>
                    <CopyButton value={email} />
                  </li>
                ))}
              </ul>
              <a href={`mailto:${profile.primaryEmail}`} className="btn-primary mt-5 w-full sm:w-auto">
                <Send className="h-4 w-4" />
                {t.contact.sendEmail}
              </a>
            </Reveal>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Phone */}
              <Reveal delay={80} className="card p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-leaf-300/30 text-leaf-700 dark:bg-leaf-500/15 dark:text-leaf-300">
                  <Phone className="h-5 w-5" />
                </span>
                <p className="mt-4 text-xs font-medium text-slate-500 dark:text-slate-400">{t.contact.phone}</p>
                <p className="mt-1 font-bold text-slate-900 dark:text-white">{profile.phone}</p>
                {hasWhatsApp && (
                  <a href={`https://wa.me/${phoneDigits}`} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-leaf-600 hover:underline dark:text-leaf-400">
                    <MessageCircle className="h-4 w-4" />
                    {t.contact.chat}
                  </a>
                )}
              </Reveal>
              {/* Location */}
              <Reveal delay={140} className="card p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300">
                  <MapPin className="h-5 w-5" />
                </span>
                <p className="mt-4 text-xs font-medium text-slate-500 dark:text-slate-400">{t.contact.location}</p>
                <p className="mt-1 font-bold leading-snug text-slate-900 dark:text-white">{l(profile.location)}</p>
              </Reveal>
            </div>

            {/* Socials */}
            <Reveal delay={200} className="card p-6">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{t.contact.social}</p>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-3">
                {socials.map(({ href, label, handle, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-2xl border border-slate-200 p-3 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md sm:flex-col sm:items-start dark:border-white/10 dark:hover:border-brand-400/50"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition group-hover:bg-brand-600 group-hover:text-white dark:bg-white/[0.06] dark:text-slate-200">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-bold text-slate-900 dark:text-white">{label}</span>
                        <span className="block truncate text-xs text-slate-500 dark:text-slate-400">{handle}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={120} className="card relative overflow-hidden p-6 sm:p-9">
            <div aria-hidden className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-brand-500/20 to-leaf-500/20 blur-2xl" />
            <h3 className="relative text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">{t.contact.formTitle}</h3>
            <p className="relative mt-2 text-sm text-slate-500 dark:text-slate-400">{t.contact.formNote}</p>

            <form onSubmit={onSubmit} className="relative mt-7 grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t.contact.name}</span>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={t.contact.namePh} autoComplete="name" className={inputClass} />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t.contact.yourEmail}</span>
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder={t.contact.emailPh} autoComplete="email" className={inputClass} />
                </label>
              </div>
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t.contact.subject}</span>
                <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder={t.contact.subjectPh} className={inputClass} />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t.contact.message}</span>
                <textarea required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder={t.contact.messagePh} className={cn(inputClass, "resize-y")} />
              </label>
              <button type="submit" className="btn-primary w-full py-3.5 sm:w-fit sm:px-8">
                <Send className="h-4 w-4" />
                {t.contact.submit}
              </button>
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
