export type Lang = "en" | "id";

/** A value that has a version for every supported language. */
export type Localized<T = string> = Record<Lang, T>;

export const LANGS: { code: Lang; label: string; name: string }[] = [
  { code: "en", label: "EN", name: "English" },
  { code: "id", label: "ID", name: "Bahasa Indonesia" },
];
