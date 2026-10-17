import { Heart, Mail } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/BrandIcons";
import { Container } from "@/components/ui";
import { NAV_SECTIONS, profile, roles } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageContext";

export function Footer() {
  const { t, l } = useLanguage();
  const year = new Date().getFullYear();

  const socials = [
    { href: `mailto:${profile.emails[1]}`, label: "Email", Icon: Mail },
    { href: profile.socials.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
    { href: profile.socials.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: profile.socials.facebook, label: "Facebook", Icon: FacebookIcon },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-white dark:border-white/[0.06] dark:bg-[#040814]">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/60 to-transparent" />
      <Container className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <img src={profile.logo} alt="WFS" className="h-10 w-auto" loading="lazy" />
          <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">{profile.name}</h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{l(roles).join(" | ")}</p>
        </div>

        <div>
          <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{t.footer.quickLinks}</h3>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-1">
            {NAV_SECTIONS.map((id) => (
              <li key={id}>
                <a href={`#${id}`} className="text-sm font-medium text-slate-600 transition hover:text-brand-600 dark:text-slate-300 dark:hover:text-white">
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{t.footer.contact}</h3>
          <ul className="mt-5 space-y-2">
            {profile.emails.map((email) => (
              <li key={email}>
                <a href={`mailto:${email}`} className="break-all text-sm font-medium text-slate-600 transition hover:text-brand-600 dark:text-slate-300 dark:hover:text-white">
                  {email}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex gap-2">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:-translate-y-0.5 hover:border-brand-500 hover:bg-brand-600 hover:text-white dark:border-white/10 dark:text-slate-300"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </Container>

      <div className="border-t border-slate-200 dark:border-white/[0.06]">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-slate-500 sm:flex-row dark:text-slate-500">
          <p>
            © {year} {profile.name}. {t.footer.rights}
          </p>
          <p className="inline-flex items-center gap-1.5">
            {t.footer.made} <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" /> {t.footer.madeIn}
          </p>
        </Container>
      </div>
    </footer>
  );
}
