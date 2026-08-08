// Project taxonomy: slug <-> value mapping for path-based SEO landing pages.
//
// WHY THIS EXISTS
// The live site ranks on path-based taxonomy URLs that this app did not have:
//   /projects/tags/python-backend-projects      126 clicks/90d, 6.9% CTR
//   /projects/tags/java-backend-projects        112 clicks/90d, 7.0% CTR
// Those are the two highest-CTR pages on the whole masteringbackend.com domain.
// The slugs below MUST keep matching the legacy URLs exactly or those rankings die.
//
// It also normalises three data-quality problems in the live API:
//   1. `level` is inconsistent — "beginners" | "intermediate" | "advance" | "advanced"
//   2. `languages` is inconsistent — "RUST" | "PYTHON" | "NODEJS" | and literally "[GO]"
//   3. `industries` casing varies — "EduTech" and "Edutech" both occur

import type { ProjectItem } from "@/components/project-card";

export type TaxonomyKind = "language" | "level" | "category";

export interface TaxonomyTerm {
  /** URL slug — legacy-compatible. Do not change without a 301. */
  slug: string;
  /** Human label used in copy, H1 and title. */
  label: string;
  kind: TaxonomyKind;
  /** Raw API values that map to this term (compared case-insensitively). */
  match: string[];
}

/** Strip the '["GO"]' / '[GO]' wrapping some rows use, and normalise for comparison. */
export function normaliseValue(raw: string): string {
  if (typeof raw !== "string") return "";
  let v = raw.trim();
  if (v.startsWith("[") && v.endsWith("]")) {
    try {
      const parsed = JSON.parse(v);
      if (Array.isArray(parsed) && parsed.length) v = String(parsed[0]);
    } catch {
      // '[GO]' is not valid JSON (unquoted). Strip the brackets manually.
      v = v.slice(1, -1);
    }
  }
  return v.replace(/^["']|["']$/g, "").trim().toLowerCase();
}

/** Flatten a possibly-messy array field into normalised values. */
export function normaliseList(arr?: string[]): string[] {
  return (arr || []).map(normaliseValue).filter(Boolean);
}

// ─── Terms ────────────────────────────────────────────────────────────────────
// `slug` values marked LEGACY are already indexed and ranking. Do not rename.

export const TAXONOMY: TaxonomyTerm[] = [
  // Languages — LEGACY slugs
  { slug: "python-backend-projects", label: "Python", kind: "language", match: ["python"] },
  { slug: "java-backend-projects", label: "Java", kind: "language", match: ["java"] },
  { slug: "node.js-backend-projects", label: "Node.js", kind: "language", match: ["nodejs", "node.js", "node"] },
  { slug: "javascript-backend-projects", label: "JavaScript", kind: "language", match: ["javascript", "js", "nodejs"] },
  { slug: "rust-backend-projects", label: "Rust", kind: "language", match: ["rust"] },
  { slug: "go-backend-projects", label: "Go", kind: "language", match: ["go", "golang"] },
  { slug: "ruby-backend-projects", label: "Ruby", kind: "language", match: ["ruby"] },
  { slug: "php-backend-projects", label: "PHP", kind: "language", match: ["php"] },
  { slug: "csharp-backend-projects", label: "C#", kind: "language", match: ["csharp", "c#"] },

  // Levels — LEGACY slug for advanced. Note the API uses BOTH "advance" and "advanced".
  { slug: "advanced-backend-projects", label: "Advanced", kind: "level", match: ["advanced", "advance"] },
  { slug: "intermediate-backend-projects", label: "Intermediate", kind: "level", match: ["intermediate"] },
  { slug: "beginner-backend-projects", label: "Beginner", kind: "level", match: ["beginners", "beginner", "basic", "easy"] },
];

export const CATEGORIES: TaxonomyTerm[] = [
  { slug: "FinTech-backend-projects", label: "FinTech", kind: "category", match: ["fintech"] },
  { slug: "AI-backend-projects", label: "AI", kind: "category", match: ["ai"] },
  { slug: "E-Commerce-backend-projects", label: "E-Commerce", kind: "category", match: ["e-commerce", "ecommerce", "ecommtech"] },
  { slug: "EduTech-backend-projects", label: "EduTech", kind: "category", match: ["edutech"] },
  { slug: "SaaS-backend-projects", label: "SaaS", kind: "category", match: ["saas"] },
  { slug: "Social-Media-backend-projects", label: "Social Media", kind: "category", match: ["social media"] },
  { slug: "MediaTech-backend-projects", label: "MediaTech", kind: "category", match: ["mediatech"] },
  { slug: "Developer-Tools-backend-projects", label: "Developer Tools", kind: "category", match: ["developer tools"] },
];

export function findTerm(slug: string): TaxonomyTerm | undefined {
  const s = decodeURIComponent(slug || "");
  return (
    TAXONOMY.find((t) => t.slug.toLowerCase() === s.toLowerCase()) ||
    CATEGORIES.find((t) => t.slug.toLowerCase() === s.toLowerCase())
  );
}

/** Does a project belong to this term? */
export function matchesTerm(project: ProjectItem, term: TaxonomyTerm): boolean {
  const wanted = term.match.map((m) => m.toLowerCase());

  if (term.kind === "language") {
    return normaliseList(project.languages).some((v) => wanted.includes(v));
  }
  if (term.kind === "level") {
    return wanted.includes(normaliseValue(project.level || ""));
  }
  return normaliseList(project.industries).some((v) => wanted.includes(v));
}

export function filterByTerm(
  projects: ProjectItem[],
  term: TaxonomyTerm,
): ProjectItem[] {
  return projects.filter((p) => matchesTerm(p, term));
}

/** Copy for the landing page. Mirrors the phrasing of the legacy pages that rank. */
export function termCopy(term: TaxonomyTerm, count: number) {
  const l = term.label;
  const n = count > 0 ? `${count}+` : "";

  const heading =
    term.kind === "level"
      ? `${l} Backend Projects`
      : `${l} Backend Projects`;

  const title = `${n ? `${count}+ ` : ""}${l} Backend Projects to Build in 2026 | MasteringBackend`;

  const description =
    term.kind === "level"
      ? `Browse ${n} ${l.toLowerCase()} backend projects with real-world requirements. Build APIs, databases and systems you can put in your portfolio — backend only, we build the frontend.`
      : `Browse ${n} ${l} backend projects and project ideas. Build real-world ${l} APIs and systems for your portfolio — backend only, we build the frontend for you.`;

  const intro =
    term.kind === "level"
      ? `A catalogue of ${n} ${l.toLowerCase()} backend projects, each with real requirements, structured tasks and a working frontend already built for you. Pick one, build the API and the data layer, and finish with something worth showing an interviewer rather than another tutorial clone.`
      : `A catalogue of ${n} ${l} backend projects and project ideas, each with real requirements and structured tasks. The frontend is already built — you focus entirely on the ${l} API, the database design and the systems work, which is what you actually get hired for.`;

  return { heading, title, description, intro };
}
