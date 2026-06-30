import type { MetadataRoute } from "next";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://demo.masteringbackend.com/api/v3";
const SITE_URL = "https://projects.masteringbackend.com";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  type P = {
    slug: string;
    languages?: string[];
    industries?: string[];
    technologies?: string[];
  };
  let projects: P[] = [];
  try {
    const res = await fetch(`${API_URL}/public/projects?size=500`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      projects = (data.projects ?? []) as P[];
    }
  } catch {
    // fall through with empty list
  }

  const now = new Date();

  const projectEntries: MetadataRoute.Sitemap = projects
    .filter((p) => p.slug)
    .map((p) => ({
      url: `${SITE_URL}/projects/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  // Some rows store an array as a JSON-encoded string (e.g. '["Go"]'); flatten.
  const norm = (arr?: string[]): string[] =>
    (arr || []).flatMap((v) => {
      if (typeof v === "string" && v.trim().startsWith("[")) {
        try {
          const parsed = JSON.parse(v);
          return Array.isArray(parsed) ? parsed.map(String) : [v];
        } catch {
          return [v];
        }
      }
      return [v];
    });

  // Single-facet filter landing pages (programmatic SEO).
  const collect = (pick: (p: P) => string[] | undefined) => {
    const set = new Set<string>();
    for (const p of projects) for (const v of norm(pick(p))) if (v) set.add(v);
    return Array.from(set);
  };
  const facet = (key: string, values: string[]): MetadataRoute.Sitemap =>
    values.map((v) => ({
      url: `${SITE_URL}/?${key}=${encodeURIComponent(v)}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    }));

  const filterEntries: MetadataRoute.Sitemap = [
    ...facet("language", collect((p) => p.languages)),
    ...facet("category", collect((p) => p.industries)),
    ...facet("technology", collect((p) => p.technologies)),
  ];

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    ...filterEntries,
    ...projectEntries,
  ];
}
