import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Clock,
  Layers,
  Trophy,
  Check,
  BarChart2,
  Code2,
  ListChecks,
  CheckCircle,
  Users,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Testimonials from "@/components/testimonials";
import { DescriptionSection } from "@/components/description-section";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/header";
import { ProjectTaskList } from "@/components/project-task-list";
import type { ProjectMilestone } from "@/components/project-task-list";
import { CertificatePreview } from "@/components/certificate-preview";
import { stripHtml } from "@/lib/utils";

import { API_URL } from "@/lib/config";
const SITE_URL = "https://projects.masteringbackend.com";

// ─── data ─────────────────────────────────────────────────────────────────────

async function getProject(slug: string) {
  try {
    const res = await fetch(`${API_URL}/public/projects/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.project ?? null;
  } catch {
    return null;
  }
}

function asArray(v: unknown): string[] {
  if (Array.isArray(v)) return v.filter(Boolean).map(String);
  return [];
}

// Pre-render every project page (programmatic SEO).
export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_URL}/public/projects?size=500`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return ((data.projects ?? []) as { slug: string }[])
      .filter((p) => p.slug)
      .map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

// ─── SEO ──────────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project || !project.title)
    return { title: "Project Not Found | MasteringBackend" };

  const description =
    stripHtml(project.summary || project.description).slice(0, 160) ||
    `Build ${project.title} step by step with MasteringBackend's in-browser playground.`;
  const url = `${SITE_URL}/projects/${slug}`;
  const images = project.banner
    ? [{ url: project.banner, width: 1200, height: 630, alt: project.title }]
    : [{ url: `${SITE_URL}/home-image.png`, width: 1200, height: 630, alt: project.title }];

  const langs = asArray(project.languages);
  const tech = asArray(project.technologies);

  return {
    title: `${project.title} | MasteringBackend Projects`,
    description,
    keywords: [
      project.title,
      "backend project",
      "build backend",
      `${project.title} tutorial`,
      ...langs.map((l) => `${l} project`),
      ...tech,
      "MasteringBackend",
    ],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: project.title,
      description,
      images,
      siteName: "MasteringBackend",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
      images: images.map((i) => i.url),
    },
  };
}

// ─── page ─────────────────────────────────────────────────────────────────────

export default async function ProjectDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project || !project.title) notFound();

  const technologies = asArray(project.technologies);
  const skills = asArray(project.skills);
  const prerequisites = asArray(project.prerequisites);

  const milestones: ProjectMilestone[] = (
    Array.isArray(project.projectTasks) ? project.projectTasks : []
  ).map((m: any) => ({
    id: m.id,
    title: m.title,
    summary: m.summary,
    tasks: (Array.isArray(m.tasks) ? m.tasks : []).map((t: any) => ({
      id: t.id,
      title: t.title,
      description: t.description,
      mb: Number(t.mb) || 0,
      required: t.required,
    })),
  }));
  const taskCount = milestones.reduce((a, m) => a + m.tasks.length, 0);
  const totalPoints = milestones.reduce(
    (a, m) => a + m.tasks.reduce((s, t) => s + (Number(t.mb) || 0), 0),
    0,
  );
  const totalStudents = Number(project.total ?? 0);

  const fullDescription = stripHtml(
    project.description || project.summary || "",
  );

  const level = project.level || "Basic";
  const duration = project.duration || 0;

  const appUrl = `https://app.masteringbackend.com/projects/${project.slug ?? slug}?ref=${encodeURIComponent(`/projects/${slug}`)}`;

  const chips: { icon: any; label: string }[] = [
    { icon: BarChart2, label: level },
    ...(duration
      ? [{ icon: Clock, label: `${duration} ${duration === 1 ? "week" : "weeks"}` }]
      : []),
    ...(taskCount ? [{ icon: ListChecks, label: `${taskCount} tasks` }] : []),
    ...(totalPoints ? [{ icon: Award, label: `${totalPoints} pts` }] : []),
  ];

  // JSON-LD structured data (programmatic SEO).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: project.title,
    description: fullDescription.slice(0, 500),
    url: `${SITE_URL}/projects/${slug}`,
    provider: {
      "@type": "Organization",
      name: "MasteringBackend",
      sameAs: "https://masteringbackend.com",
    },
    ...(project.banner ? { image: project.banner } : {}),
    educationalLevel: level,
    ...(technologies.length ? { teaches: technologies } : {}),
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      ...(duration ? { courseWorkload: `P${duration}W` } : {}),
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden text-slate-50"
        style={{ backgroundColor: "#0e2036" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.1,
            backgroundImage: `linear-gradient(rgba(19,174,206,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(19,174,206,0.4) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        <Header />

        <section className="relative z-10 container mx-auto px-6 pt-12 pb-24 md:pt-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="max-w-2xl">
              <div className="text-[#13AECE] font-bold tracking-widest text-sm uppercase mb-3">
                BACKEND PROJECT
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.15] font-bold text-white mb-4">
                {project.title}
              </h1>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-lg">
                {stripHtml(project.summary || project.description).slice(0, 220)}
              </p>

              <div className="mb-8">
                {project.isWaiting ? (
                  <Button
                    className="bg-amber-500/90 hover:bg-amber-500 text-white border-0 h-12 px-8 font-semibold text-[15px] rounded-md"
                    disabled
                  >
                    Coming Soon
                  </Button>
                ) : (
                  <Button
                    className="bg-gradient-to-r from-[#13AECE] to-[#3b82f6] hover:from-[#0f8b9e] hover:to-[#2563eb] text-white border-0 h-12 px-8 font-semibold text-[15px] rounded-md shadow-lg shadow-[#13AECE]/20"
                    asChild
                  >
                    <Link href={appUrl} target="_blank" rel="noopener noreferrer">
                      Start Project for Free
                    </Link>
                  </Button>
                )}
                <p className="text-slate-400 text-sm pt-2">
                  <CheckCircle className="w-4 h-4 inline mr-2" />
                  Build in our in-browser playground · Earn a portfolio piece
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {chips.map((c, i) => {
                  const Icon = c.icon;
                  return (
                    <span
                      key={i}
                      className="bg-slate-800/60 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-md border border-slate-700/50 flex items-center gap-1.5 capitalize"
                    >
                      <Icon className="w-3.5 h-3.5" /> {c.label}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="w-full max-w-[640px] mx-auto lg:ml-auto">
              {project.banner ? (
                <img
                  src={project.banner}
                  alt={project.title}
                  className="w-full rounded-2xl object-cover object-center border border-white/10"
                />
              ) : (
                <div className="w-full aspect-video rounded-2xl bg-slate-800/60 border border-white/10 flex items-center justify-center">
                  <Code2 className="w-16 h-16 text-[#13AECE]/40" />
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* ── Body ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#f8fafc] text-slate-900 py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-12">
              {fullDescription && (
                <DescriptionSection
                  fullText={fullDescription}
                  title="Project Description"
                />
              )}

              {skills.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="bg-slate-100 p-2 rounded-lg">
                      <Trophy className="w-5 h-5 text-slate-700" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">
                      What you'll learn
                    </h2>
                  </div>
                  <ul className="space-y-4">
                    {skills.map((s, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-slate-900 shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {stripHtml(s)}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {milestones.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="bg-slate-100 p-2 rounded-lg">
                      <ListChecks className="w-5 h-5 text-slate-700" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Project tasks
                    </h2>
                  </div>
                  <ProjectTaskList milestones={milestones} appUrl={appUrl} />

                  {/* Certificate card */}
                  <div className="mt-12 bg-white border-2 border-[#13AECE] rounded-xl p-8 shadow-sm flex flex-col md:flex-row items-center gap-8">
                    <div className="w-full md:w-1/3 shrink-0">
                      <CertificatePreview courseTitle={project.title} />
                    </div>
                    <div className="w-full md:w-2/3 flex flex-col gap-3">
                      <h3 className="text-xl font-bold text-slate-800">
                        Earn Certificate of Completion
                      </h3>
                      <p className="text-sm text-slate-600 mb-4">
                        Add this credential to your LinkedIn profile, resume, or
                        CV. Share it on social media and in your performance
                        review.
                      </p>
                      {!project.isWaiting && (
                        <Button
                          className="bg-[#13AECE] hover:bg-[#0f8b9e] text-white border-0 w-full rounded-md h-11"
                          asChild
                        >
                          <Link
                            href={appUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Enroll Now
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
                <h3 className="text-xl font-bold text-slate-800">
                  Ready to build {project.title}?
                </h3>
                {!project.isWaiting && (
                  <Button
                    className="bg-[#13AECE] hover:bg-[#0f8b9e] text-white border-0 px-8 rounded-md w-full sm:w-auto"
                    asChild
                  >
                    <Link href={appUrl} target="_blank" rel="noopener noreferrer">
                      Start Project for Free
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart2 className="w-5 h-5 text-slate-700" />
                  <h3 className="font-bold text-slate-900 text-[15px]">
                    Project Overview
                  </h3>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center mb-4">
                  <div>
                    <div className="text-2xl font-bold text-[#0B152A]">
                      {duration || "—"}
                    </div>
                    <div className="text-xs text-slate-500">Weeks</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0B152A]">
                      {taskCount || "—"}
                    </div>
                    <div className="text-xs text-slate-500">Tasks</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0B152A]">
                      {totalPoints || "—"}
                    </div>
                    <div className="text-xs text-slate-500">Points</div>
                  </div>
                </div>
                <dl className="space-y-3 text-sm border-t border-slate-100 pt-4">
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Difficulty</dt>
                    <dd className="font-medium text-slate-800 capitalize">
                      {level}
                    </dd>
                  </div>
                  {totalStudents > 0 && (
                    <div className="flex justify-between">
                      <dt className="text-slate-500 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" /> Builders
                      </dt>
                      <dd className="font-medium text-slate-800">
                        {totalStudents.toLocaleString()}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              {technologies.length > 0 && (
                <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Code2 className="w-5 h-5 text-slate-700" />
                    <h3 className="font-bold text-slate-900 text-[15px]">
                      Technologies
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((t, i) => (
                      <span
                        key={i}
                        className="bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {prerequisites.length > 0 && (
                <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Layers className="w-5 h-5 text-slate-700" />
                    <h3 className="font-bold text-slate-900 text-[15px]">
                      Prerequisites
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {prerequisites.map((p, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-slate-600"
                      >
                        <Check className="w-4 h-4 text-[#13AECE] shrink-0 mt-0.5" />
                        {stripHtml(p)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
      <Footer />
    </div>
  );
}
