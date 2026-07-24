import Link from "next/link";
import { FolderGit2, ArrowRight } from "lucide-react";
import type { ProjectItem } from "@/components/project-card";
import { stripHtml } from "@/lib/utils";

export function RecommendedProjects({ projects }: { projects: ProjectItem[] }) {
  if (!projects?.length) return null;

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-[1100px]">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-[1.75rem] font-bold text-[#0B152A] mb-2">
            Our &ldquo;Build&rdquo; Approach
          </h2>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto">
            Build your engineering skills with interactive projects for backend,
            AI, and tech engineering.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((project) => {
            const badge = project.isWaiting
              ? { label: "Coming Soon", cls: "bg-amber-50 text-amber-700" }
              : project.isPremium
                ? { label: "Premium", cls: "bg-slate-100 text-slate-600" }
                : { label: "Free", cls: "bg-emerald-50 text-emerald-700" };

            return (
              <div
                key={project.id}
                className="border border-slate-200 rounded-2xl p-6 flex flex-col"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#13AECE]/10 flex items-center justify-center shrink-0">
                      <FolderGit2 className="w-5 h-5 text-[#13AECE]" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#0B152A]">
                        {project.title}
                      </h3>
                      <p className="text-sm text-slate-500">{project.level}</p>
                    </div>
                  </div>
                  <span
                    className={`self-start shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${badge.cls}`}
                  >
                    {badge.label}
                  </span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 flex-1 mb-5">
                  {stripHtml(project.summary) ||
                    "Build this project step by step."}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-5 border-t border-slate-100 mt-auto">
                  <span className="text-sm font-medium text-slate-500">
                    {project.duration || 0}{" "}
                    {project.duration === 1 ? "week" : "weeks"} &middot;{" "}
                    {project.taskCount || 0} tasks
                  </span>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full border border-[#0B152A] text-[#0B152A] text-sm font-semibold hover:bg-[#0B152A] hover:text-white transition-colors"
                  >
                    Start Project
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
