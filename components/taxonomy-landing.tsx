import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import type { ProjectItem } from "@/components/project-card";
import { Header } from "@/components/header";
import { Footer } from "@/components/Footer";
import { ProjectsCTA } from "@/components/projects-cta";
import {
  TAXONOMY,
  CATEGORIES,
  termCopy,
  type TaxonomyTerm,
} from "@/lib/taxonomy";

const SITE_URL = "https://projects.masteringbackend.com";

/**
 * Server-rendered taxonomy landing page.
 *
 * Deliberately NOT using <ProjectsBrowse>: that is a client component driven by
 * query params, so its project list is not in the server-rendered HTML. These
 * pages exist to rank, so the projects must be in the initial HTML response.
 */
export function TaxonomyLanding({
  term,
  projects,
  basePath,
}: {
  term: TaxonomyTerm;
  projects: ProjectItem[];
  basePath: "tags" | "category";
}) {
  const copy = termCopy(term, projects.length);

  const siblings = (term.kind === "category" ? CATEGORIES : TAXONOMY)
    .filter((t) => t.slug !== term.slug)
    .slice(0, 12);

  const siblingBase = term.kind === "category" ? "category" : "tags";

  return (
    <div className="min-h-screen bg-background">
      <link rel="canonical" href={`${SITE_URL}/projects/${basePath}/${term.slug}`} />

      <Header />

      <div
        className="relative overflow-hidden text-slate-50"
        style={{ backgroundColor: "#0B152A" }}
      >
        <div className="max-w-6xl mx-auto px-4 py-14">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-400 mb-4">
            <Link href="/" className="hover:text-white">
              Backend Projects
            </Link>
            <span className="mx-2">/</span>
            <span className="text-slate-200">{copy.heading}</span>
          </nav>

          <h1 className="text-3xl md:text-5xl font-bold">{copy.heading}</h1>
          <p className="mt-4 max-w-3xl text-slate-300 leading-relaxed">
            {copy.intro}
          </p>
          <p className="mt-4 text-sm text-slate-400">
            {projects.length} project{projects.length === 1 ? "" : "s"} available
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {projects.length === 0 ? (
          <p className="text-slate-600">
            No projects are available in this category right now.{" "}
            <Link href="/" className="text-[#13AECE] underline">
              Browse all backend projects
            </Link>
            .
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        )}

        <section className="mt-16 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold text-slate-900">
            Browse other backend projects
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
            {siblings.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/projects/${siblingBase}/${t.slug}`}
                  className="text-[#13AECE] underline hover:no-underline"
                >
                  {t.label} Backend Projects
                </Link>
              </li>
            ))}
            <li>
              <Link href="/" className="text-[#13AECE] underline hover:no-underline">
                All Backend Projects
              </Link>
            </li>
          </ul>
        </section>
      </main>

      <ProjectsCTA />
      <Footer />
    </div>
  );
}
