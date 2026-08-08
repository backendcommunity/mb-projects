import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TaxonomyLanding } from "@/components/taxonomy-landing";
import { fetchProjects } from "@/lib/projects";
import { TAXONOMY, findTerm, filterByTerm, termCopy } from "@/lib/taxonomy";

const SITE_URL = "https://projects.masteringbackend.com";

export const revalidate = 3600;

// Pre-render every taxonomy page. The legacy slugs here are already indexed and
// ranking (python 6.9% CTR, java 7.0% CTR) — they must resolve on day one.
export function generateStaticParams() {
  return TAXONOMY.map((t) => ({ tag: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const term = findTerm(tag);
  if (!term || term.kind === "category") {
    return { title: "Backend Projects | MasteringBackend" };
  }

  const projects = await fetchProjects();
  const count = filterByTerm(projects, term).length;
  const copy = termCopy(term, count);
  const url = `${SITE_URL}/projects/tags/${term.slug}`;

  return {
    title: copy.title,
    description: copy.description,
    alternates: { canonical: url },
    // Avoid indexing an empty page if the API fails or returns nothing.
    robots: count === 0 ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      url,
      title: copy.title,
      description: copy.description,
      images: [{ url: "/home-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
    },
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const term = findTerm(tag);

  // Categories live under /projects/category/* — don't serve them from both paths.
  if (!term || term.kind === "category") notFound();

  const projects = await fetchProjects();
  const filtered = filterByTerm(projects, term);

  return (
    <TaxonomyLanding term={term} projects={filtered} basePath="tags" />
  );
}
