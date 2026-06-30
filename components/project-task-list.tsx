"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { stripHtml } from "@/lib/utils";

export interface ProjectTaskItem {
  id?: string;
  title: string;
  description?: string;
  mb?: number; // points earned
  required?: boolean;
}

export interface ProjectMilestone {
  id?: string;
  title: string;
  summary?: string;
  tasks: ProjectTaskItem[];
}

// ── task row (mirrors the course VideoRow) ─────────────────────────────────────

function TaskRow({ title, mb, required }: ProjectTaskItem) {
  return (
    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white transition-colors group">
      {/* Brand task icon — black square with white check */}
      <div className="w-6 h-6 rounded-sm bg-[#0B152A] flex items-center justify-center shrink-0">
        <svg
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-3 h-3"
        >
          <path
            d="M2.5 6.2 5 8.5 9.5 3.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <span className="flex-1 text-[13px] text-slate-600 leading-snug group-hover:text-slate-800 transition-colors truncate">
        {title}
      </span>

      {required && (
        <span className="text-[8px] font-black text-amber-600 bg-amber-50 px-1.5 py-[3px] rounded tracking-[0.14em] shrink-0 leading-none uppercase mr-1">
          Required
        </span>
      )}

      {Number(mb) > 0 && (
        <span className="text-[8px] font-black text-white bg-[#0B152A] px-1.5 py-[3px] rounded tracking-[0.18em] shrink-0 leading-none">
          {mb} MB
        </span>
      )}
    </div>
  );
}

// ── milestone card (mirrors the course ChapterCard) ────────────────────────────

function MilestoneCard({
  milestone,
  num,
  appUrl,
}: {
  milestone: ProjectMilestone;
  num: number;
  appUrl?: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const tasks = milestone.tasks || [];
  const summary = stripHtml(milestone.summary || "");

  return (
    <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden transition-shadow hover:shadow-md">
      <div className="p-6">
        {/* Number + title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-[#0B152A] text-white flex items-center justify-center font-bold text-[13px] shrink-0 tabular-nums">
            {String(num).padStart(2, "0")}
          </div>
          <h3 className="font-bold text-slate-800 text-[15px] leading-snug">
            {milestone.title}
          </h3>
        </div>

        <div className="h-px bg-slate-100 mb-4" />

        {summary && (
          <p className="text-[13px] text-slate-500 leading-relaxed mb-5">
            {summary.substring(0, 300)}
            {summary.length > 300 && "…"}
          </p>
        )}

        {/* Actions row */}
        <div className="flex items-center">
          <button
            onClick={() => setIsExpanded((v) => !v)}
            className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-700 hover:text-[#13AECE] transition-colors"
            aria-expanded={isExpanded}
          >
            {isExpanded ? "Hide Details" : "View Details"}
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Expanded task list */}
      {isExpanded && tasks.length > 0 && (
        <div className="border-t border-slate-100 bg-slate-50/60 px-4 py-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.12em] px-3 mb-2">
            Tasks in this milestone
          </p>
          <div className="space-y-0.5">
            {tasks.map((t, i) => (
              <TaskRow
                key={t.id ?? i}
                title={t.title}
                mb={t.mb}
                required={t.required}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── list ───────────────────────────────────────────────────────────────────────

export function ProjectTaskList({
  milestones,
  appUrl,
}: {
  milestones: ProjectMilestone[];
  appUrl?: string;
}) {
  if (!milestones?.length) return null;

  return (
    <div className="space-y-4">
      {milestones.map((m, i) => (
        <MilestoneCard
          key={m.id ?? i}
          milestone={m}
          num={i + 1}
          appUrl={appUrl}
        />
      ))}
    </div>
  );
}
