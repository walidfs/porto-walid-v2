import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function LinkedinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

/** Small round flags used in the language switch (no clipPath → safe to render many times). */
export function FlagGB({ className }: { className?: string }) {
  return (
    <span className={`inline-block overflow-hidden rounded-full ring-1 ring-black/10 ${className ?? ""}`}>
      <svg viewBox="0 0 60 60" className="block h-full w-full" aria-hidden>
        <rect width="60" height="60" fill="#012169" />
        <path d="M0 0L60 60M60 0L0 60" stroke="#fff" strokeWidth="12" />
        <path d="M0 0L60 60M60 0L0 60" stroke="#C8102E" strokeWidth="4" />
        <path d="M30 0V60M0 30H60" stroke="#fff" strokeWidth="18" />
        <path d="M30 0V60M0 30H60" stroke="#C8102E" strokeWidth="10" />
      </svg>
    </span>
  );
}

export function FlagID({ className }: { className?: string }) {
  return (
    <span className={`inline-block overflow-hidden rounded-full ring-1 ring-black/10 ${className ?? ""}`}>
      <svg viewBox="0 0 60 60" className="block h-full w-full" aria-hidden>
        <rect width="60" height="30" fill="#E70011" />
        <rect y="30" width="60" height="30" fill="#ffffff" />
      </svg>
    </span>
  );
}
