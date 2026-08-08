import type { MetadataRoute } from "next";
import { fetchProjects } from "@/lib/projects";
import { TAXONOMY, CATEGORIES, filterByTerm } from "@/lib/taxonomy";

const SITE_URL = "https://projects.masteringbackend.com";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await fetchProjects();
  const now = new Date();

  // ── Project detail pages ────────────────────────────────────────────────────
  const projectEntries: MetadataRoute.Sitemap = projects
    .filter((p) => p.slug)
    .map((p) => ({
      url: `${SITE_URL}/projects/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  // ── Taxonomy landing pages ──────────────────────────────────────────────────
  //
  // CHANGED 8 Aug 2026. This previously emitted query-string facets:
  //     /?language=Go   /?category=FinTech   /?technology=Redis
  // Google generally consolidates query-param URLs into the canonical, so those
  // were unlikely to be indexed as separate pages. The path-based equivalents are
  // proven — /projects/tags/java-backend-projects converts at 7.0% CTR, the best
  // on the whole masteringbackend.com domain.
  //
  // Only emit terms that actually have projects, so we never submit a thin page.
  const taxonomyEntries: MetadataRoute.Sitemap = TAXONOMY.filter(
    (t) => filterByTerm(projects, t).length > 0,
  ).map((t) => ({
    url: `${SITE_URL}/projects/tags/${t.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const categoryEntries: MetadataRoute.Sitemap = CATEGORIES.filter(
    (t) => filterByTerm(projects, t).length > 0,
  ).map((t) => ({
    url: `${SITE_URL}/projects/category/${t.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    ...taxonomyEntries,
    ...categoryEntries,
    ...projectEntries,
  ];
}
