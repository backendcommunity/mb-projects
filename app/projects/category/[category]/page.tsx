import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TaxonomyLanding } from "@/components/taxonomy-landing";
import { fetchProjects } from "@/lib/projects";
import { CATEGORIES, findTerm, filterByTerm, termCopy } from "@/lib/taxonomy";

const SITE_URL = "https://projects.masteringbackend.com";

export const revalidate = 3600;

// /projects/category/FinTech-backend-projects is a legacy indexed URL.
export function generateStaticParams() {
  return CATEGORIES.map((t) => ({ category: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const term = findTerm(category);
  if (!term || term.kind !== "category") {
    return { title: "Backend Projects | MasteringBackend" };
  }

  const projects = await fetchProjects();
  const count = filterByTerm(projects, term).length;
  const copy = termCopy(term, count);
  const url = `${SITE_URL}/projects/category/${term.slug}`;

  return {
    title: copy.title,
    description: copy.description,
    alternates: { canonical: url },
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

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const term = findTerm(category);

  if (!term || term.kind !== "category") notFound();

  const projects = await fetchProjects();
  const filtered = filterByTerm(projects, term);

  return (
    <TaxonomyLanding term={term} projects={filtered} basePath="category" />
  );
}
