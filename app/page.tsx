import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { HeroVideo } from "@/components/hero-video";
import { ProjectsBrowse } from "@/components/projects-browse";
import type { ProjectItem } from "@/components/project-card";
import { RecommendedProjects } from "@/components/recommended-projects";
import {
  CompanyMarquee,
  type MarqueeCompany,
} from "@/components/company-marquee";
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
  const facets = [
    ...f.levels,
    ...f.languages,
    ...f.categories,
    ...f.technologies,
  ];

  const titleCore = facets.length
    ? `${facets.join(", ")} Backend Projects`
    : f.q
      ? `Projects matching “${f.q}”`
      : "Build Real-World Backend Projects";

  const description = facets.length
    ? `Browse ${facets.join(", ")} backend projects on MasteringBackend. Build real-world systems in our in-browser playground and grow your engineering portfolio.`
    : "Practice backend engineering by building real-world projects. From Go to Rust, Docker to system design, build with our in-browser playground and grow your engineering skills.";

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
  } catch (error) {
    console.error("Failed to fetch projects", error);
    return { projects: [], recommended: [] };
  }
}

function technologiesFor(projects: ProjectItem[]): MarqueeCompany[] {
  // `technologies` already covers language names in clean casing (Go, Ruby,
  // Rust, ...); `languages` is a raw ALL-CAPS enum field, so only pull from
  // `technologies` here to avoid case-duplicate entries (e.g. "Ruby" + "RUBY").
  const seen = new Map<string, string>();
  for (const p of projects) {
    for (const raw of p.technologies ?? []) {
      const name = raw.trim();
      if (!name) continue;
      const key = name.toLowerCase();
      if (!seen.has(key)) seen.set(key, name);
    }
  }
  return Array.from(seen.values())
    .sort((a, b) => a.localeCompare(b))
    .map((name) => ({ name }));
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
        style={{ backgroundColor: "#0B152A" }}
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

        <section className="relative z-10 container mx-auto flex flex-col justify-center items-stretch min-h-[640px] lg:min-h-[720px] px-6 pt-8 pb-20 md:pt-12 lg:pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.12] font-bold text-white mb-6">
                Build Real-World <br className="hidden md:block" />
                <span className="text-[#98D4E3]">Backend Projects</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 mb-8 leading-relaxed max-w-lg">
                Learn backend engineering through real-world projects. From
                backend to AI to product engineering, build and run code in our
                in-browser playground and turn every project into a portfolio
                piece.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link
                  href="https://app.masteringbackend.com/projects?ref=projects-hero"
                  className="px-8 py-3 rounded-full bg-[#13AECE] text-white font-semibold text-center hover:bg-[#0f8b9e] transition-colors"
                >
                  Start Building
                </Link>
                <a
                  href="#how-it-works"
                  className="px-8 py-3 rounded-full border border-white/20 text-white font-semibold text-center hover:bg-white/10 transition-colors"
                >
                  See How It Works
                </a>
              </div>
              <p className="text-sm text-slate-400 mb-4">
                Join thousands of MasteringBackend learners working at
              </p>
              <div className="flex items-center gap-6 flex-wrap opacity-50">
                {[
                  "Kuda",
                  "SentinelOne",
                  "Paystack",
                  "Salesforce",
                  "Flutterwave",
                ].map((label, i) => (
                  <span
                    key={i}
                    className="text-lg font-bold tracking-tight text-slate-300"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div
                className="absolute -inset-8 rounded-[2rem] bg-[#13AECE] opacity-[0.18] blur-3xl pointer-events-none"
                aria-hidden="true"
              />
              <HeroVideo
                size="lg"
                browserChrome
                chromeUrl="projects.masteringbackend.com"
              />
            </div>
          </div>
        </section>
      </div>

      {/* ── Recommended ("Our Build Approach" intro + demo-card grid) ───────── */}
      <RecommendedProjects projects={recommended} />

      {/* ── Practice projects across (trust marquee, real language/tech facets) */}
      <CompanyMarquee
        label="Practice projects across"
        companies={technologiesFor(projects)}
      />

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
