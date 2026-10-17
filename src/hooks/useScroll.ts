import { useEffect, useState } from "react";

/** True once the page has been scrolled past `threshold` pixels. */
export function useScrolled(threshold = 10) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

/** Map of observed section ids → the nav item that should be highlighted. */
const SECTION_TO_NAV: Record<string, string> = {
  home: "",
  about: "about",
  education: "about",
  skills: "about",
  experience: "experience",
  projects: "projects",
  certificates: "certificates",
  activities: "activities",
  cv: "contact",
  contact: "contact",
};

/** Returns the nav id of the section currently in the middle of the viewport. */
export function useActiveSection() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const elements = Object.keys(SECTION_TO_NAV)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!elements.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(SECTION_TO_NAV[entry.target.id] ?? "");
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}
