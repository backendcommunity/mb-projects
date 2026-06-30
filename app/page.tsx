import type { Metadata } from "next";
import { Suspense } from "react";
import { Layers, Code, Trophy } from "lucide-react";
import { Header } from "@/components/header";
import { HeroVideo } from "@/components/hero-video";
import { ProjectsBrowse } from "@/components/projects-browse";
import type { ProjectItem } from "@/components/project-card";
import { RecommendedProjects } from "@/components/recommended-projects";
import { PracticeSteps } from "@/components/practice-steps";
import { ProjectsCTA } from "@/components/projects-cta";
import Testimonials from "@/components/testimonials";
import { Footer } from "@/components/Footer";

// ─── Config ───────────────────────────────────────────────────────────────────

import { API_URL } from "@/lib/config";
const SITE_URL = "https://projects.masteringbackend.com";

// Render per-request so filter query params drive metadata (canonical/OG/title).
export const dynamic = "force-dynamic";

// ─── Filter-aware metadata (programmatic SEO) ──────────────────────────────────

type SearchParams = { [key: string]: string | string[] | undefined };

function readFilters(sp: SearchParams) {
  const list = (k: string): string[] => {
    const v = sp[k];
    const s = Array.isArray(v) ? v.join(",") : v || "";
    return s
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);
  };
  const q = (Array.isArray(sp.q) ? sp.q[0] : sp.q) || "";
  return {
    q,
    languages: list("language"),
    categories: list("category"),
    technologies: list("technology"),
    levels: list("level"),
  };
}

function canonicalFor(f: ReturnType<typeof readFilters>): string {
  const params = new URLSearchParams();
  if (f.q) params.set("q", f.q);
  if (f.languages.length) params.set("language", f.languages.join(","));
  if (f.categories.length) params.set("category", f.categories.join(","));
  if (f.technologies.length) params.set("technology", f.technologies.join(","));
  if (f.levels.length) params.set("level", f.levels.join(","));
  const qs = params.toString();
  return qs ? `${SITE_URL}/?${qs}` : SITE_URL;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const f = readFilters(await searchParams);
  const facets = [...f.levels, ...f.languages, ...f.categories, ...f.technologies];

  const titleCore = facets.length
    ? `${facets.join(", ")} Backend Projects`
    : f.q
      ? `Projects matching “${f.q}”`
      : "Build Real-World Backend Projects";

  const description = facets.length
    ? `Browse ${facets.join(", ")} backend projects on MasteringBackend. Build real-world systems in our in-browser playground and grow your engineering portfolio.`
    : "Practice backend engineering by building real-world projects. From Go to Rust, Docker to system design — build with our in-browser playground and grow your engineering portfolio.";

  // NOTE: canonical + og:url are rendered manually in the page component
  // (React hoists them to <head>) because Next strips query strings from
  // `alternates.canonical` / `openGraph.url`, which we need for faceted pSEO.
  return {
    title: `${titleCore} | MasteringBackend`,
    description,
    keywords: [
      "backend projects",
      "build backend api",
      ...f.languages.map((l) => `${l} projects`),
      ...f.categories.map((c) => `${c} backend projects`),
      ...f.technologies,
      "backend engineering portfolio",
    ],
    openGraph: {
      type: "website",
      title: `${titleCore} | MasteringBackend`,
      description,
      images: [
        {
          url: "/home-image.png",
          width: 1200,
          height: 630,
          alt: titleCore,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${titleCore} | MasteringBackend`,
      description,
      images: ["/home-image.png"],
    },
  };
}

// ─── Data fetching ────────────────────────────────────────────────────────────

async function getProjects(): Promise<{
  projects: ProjectItem[];
  recommended: ProjectItem[];
}> {
  try {
    const res = await fetch(`${API_URL}/public/projects?size=100`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return { projects: [], recommended: [] };
    const data = await res.json();
    return {
      projects: (data.projects ?? []) as ProjectItem[],
      recommended: (data.recommended ?? []) as ProjectItem[],
    };
  } catch {
    return { projects: [], recommended: [] };
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProjectsHomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { projects, recommended } = await getProjects();
  const canonical = canonicalFor(readFilters(await searchParams));

  return (
    <div className="min-h-screen bg-background">
      {/* Faceted canonical + og:url (query-string aware; hoisted to <head>) */}
      <link rel="canonical" href={canonical} />
      <meta property="og:url" content={canonical} />

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden text-slate-50"
        style={{ backgroundColor: "#0e2036" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.1,
            backgroundImage: `linear-gradient(rgba(19,174,206,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(19,174,206,0.4) 1px,transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        <Header />

        <section className="relative z-10 container mx-auto px-6 pt-8 pb-20 md:pt-12 lg:pt-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-10 items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.12] font-bold text-white mb-6">
                Build Real-World <br className="hidden md:block" />
                <span className="text-[#98D4E3]">Backend Projects</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 mb-8 leading-relaxed max-w-lg">
                Learn advanced tech engineering through real-world projects.
                From backend, AI to product engineering. We help you scale your
                engineering skills.
              </p>
              <ul className="space-y-4 text-slate-200">
                <li className="flex items-center gap-4">
                  <Layers className="w-5 h-5 text-slate-300" />
                  <span className="text-lg">
                    Real-world projects across every language
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <Code className="w-5 h-5 text-slate-300" />
                  <span className="text-lg">
                    Build and run code in our playground
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <Trophy className="w-5 h-5 text-slate-300" />
                  <span className="text-lg">
                    Turn every build into a portfolio piece
                  </span>
                </li>
              </ul>
            </div>

            <HeroVideo />
          </div>
        </section>
      </div>

      {/* ── "Build" approach intro ──────────────────────────────────────────── */}
      <section className="pt-16 md:pt-20 px-4 bg-[#F8FAFC] text-slate-900">
        <div className="container mx-auto">
          <h2 className="text-[2rem] font-extrabold text-[#0B152A] mb-3">
            Our &ldquo;Build&rdquo; Approach
          </h2>
          <p className="text-slate-500 text-base max-w-2xl">
            Build your tech engineering career with interactive projects for
            backend, AI, product engineering and more, curated by real-world
            experts.
          </p>
        </div>
      </section>

      {/* ── Recommended (most popular) ──────────────────────────────────────── */}
      <RecommendedProjects projects={recommended} />

      {/* ── Divider ─────────────────────────────────────────────────────────── */}
      {recommended.length > 0 && (
        <div className="bg-[#F8FAFC] px-4 pt-12">
          <div className="container mx-auto">
            <hr className="border-slate-200" />
          </div>
        </div>
      )}

      {/* ── Browse Projects ─────────────────────────────────────────────────── */}
      <Suspense fallback={null}>
        <ProjectsBrowse projects={projects} />
      </Suspense>

      {/* ── Three ways to practice ──────────────────────────────────────────── */}
      <PracticeSteps />

      {/* ── Get Inspired (testimonials) ─────────────────────────────────────── */}
      <Testimonials />

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <ProjectsCTA />

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
