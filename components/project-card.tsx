import Link from "next/link";
import { BarChart2, Clock, ListChecks, Code2 } from "lucide-react";
import { stripHtml } from "@/lib/utils";

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  banner?: string | null;
  level: string;
  languages: string[];
  industries?: string[];
  technologies?: string[];
  duration: number;
  taskCount: number;
  isPremium?: boolean;
  isWaiting?: boolean;
}

export function ProjectCard({
  project,
  popular = false,
}: {
  project: ProjectItem;
  popular?: boolean;
}) {
  const language = project.languages?.[0];
  return (
    <Link href={`/projects/${project.slug}`}>
      <div
        className={`bg-white h-full rounded-xl border p-6 flex flex-col transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer group ${
          popular ? "border-[#13AECE]/40 ring-1 ring-[#13AECE]/10" : "border-slate-200"
        }`}
      >
        <h3 className="text-lg font-bold text-[#0B152A] mb-2 leading-snug group-hover:text-[#13AECE] transition-colors line-clamp-2">
          {project.title}
        </h3>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-3">
          <BarChart2 className="w-3.5 h-3.5 text-[#13AECE]" />
          {project.level}
          {project.isWaiting && (
            <span className="ml-2 px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-wide">
              Coming Soon
            </span>
          )}
        </div>
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 flex-1 mb-5">
          {stripHtml(project.summary) || "Build this project step by step."}
        </p>
        <div className="flex items-center gap-4 pt-4 border-t border-slate-100 text-xs font-medium text-slate-500">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {project.duration || 0} {project.duration === 1 ? "week" : "weeks"}
          </span>
          <span className="flex items-center gap-1.5">
            <ListChecks className="w-3.5 h-3.5" />
            {project.taskCount || 0} tasks
          </span>
          {language && (
            <span className="flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5" />
              {language}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
