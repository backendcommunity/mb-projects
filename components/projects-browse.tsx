"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  ChevronUp,
  ChevronDown,
  FolderOpen,
  Search,
  X,
} from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import type { ProjectItem } from "@/components/project-card";

export type { ProjectItem };

const LEVELS = ["Basic", "Intermediate", "Advanced"];
const ITEMS_PER_PAGE = 12;
const FACET_PREVIEW = 5;

const parseParam = (v: string | null): string[] =>
  (v || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

// ─── Pagination ───────────────────────────────────────────────────────────────

function PaginationBar({
  currentPage,
  totalPages,
  onPage,
}: {
  currentPage: number;
  totalPages: number;
  onPage: (n: number) => void;
}) {
  if (totalPages <= 1) return null;
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, start + 4);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <div className="flex items-center justify-center gap-1 mt-10">
      <button
        disabled={currentPage === 1}
        onClick={() => onPage(currentPage - 1)}
        className="flex items-center text-sm font-semibold text-[#13AECE] mr-3 hover:text-[#0f8b9e] disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
      >
        <ChevronLeft className="w-4 h-4 mr-1" /> Previous
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPage(p)}
          className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium transition-colors ${
            p === currentPage
              ? "bg-[#0B152A] text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          {p}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPage(currentPage + 1)}
        className="flex items-center text-sm font-semibold text-[#13AECE] ml-3 hover:text-[#0f8b9e] disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
      >
        Next <ChevronRight className="w-4 h-4 ml-1" />
      </button>
    </div>
  );
}

// ─── Filter row ───────────────────────────────────────────────────────────────

function CheckboxRow({
  label,
  count,
  checked,
  onToggle,
}: {
  label: string;
  count?: number;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="w-4 h-4 rounded border-slate-300 accent-[#0A101D]"
      />
      <span className="text-sm text-slate-600 flex-1">{label}</span>
      {typeof count === "number" && (
        <span className="text-xs text-slate-400 font-medium">{count}</span>
      )}
    </label>
  );
}

// ─── Collapsible facet group (Show More) ───────────────────────────────────────

function FacetGroup({
  title,
  facets,
  selected,
  onToggle,
}: {
  title: string;
  facets: { name: string; count?: number }[];
  selected: string[];
  onToggle: (name: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  if (facets.length === 0) return null;
  const visible = expanded ? facets : facets.slice(0, FACET_PREVIEW);

  return (
    <div>
      <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">
        {title}
      </h3>
      <div className="space-y-3">
        {visible.map((f) => (
          <CheckboxRow
            key={f.name}
            label={f.name}
            count={f.count}
            checked={selected.includes(f.name)}
            onToggle={() => onToggle(f.name)}
          />
        ))}
      </div>
      {facets.length > FACET_PREVIEW && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="text-sm font-semibold text-[#13AECE] flex items-center gap-1 mt-3 hover:text-[#0f8b9e]"
        >
          {expanded ? "Show Less" : "Show More"}
          {expanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      )}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function ProjectsBrowse({ projects }: { projects: ProjectItem[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize filter state from the URL (deep-linkable / SEO-friendly).
  const [searchQuery, setSearchQuery] = useState(
    () => searchParams.get("q") || "",
  );
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(() =>
    parseParam(searchParams.get("language")),
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() =>
    parseParam(searchParams.get("category")),
  );
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    () => parseParam(searchParams.get("technology")),
  );
  const [selectedLevels, setSelectedLevels] = useState<string[]>(() =>
    parseParam(searchParams.get("level")),
  );
  const [page, setPage] = useState(() => {
    const p = Number(searchParams.get("page"));
    return Number.isFinite(p) && p > 0 ? p : 1;
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sync filters → URL query string (history.replace, no scroll jump).
  const didMount = useRef(false);
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedLanguages.length)
      params.set("language", selectedLanguages.join(","));
    if (selectedCategories.length)
      params.set("category", selectedCategories.join(","));
    if (selectedTechnologies.length)
      params.set("technology", selectedTechnologies.join(","));
    if (selectedLevels.length) params.set("level", selectedLevels.join(","));
    if (page > 1) params.set("page", String(page));

    const qs = params.toString();
    const url = qs ? `${pathname}?${qs}` : pathname;

    // Skip the first run so we don't rewrite the URL the user arrived with.
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    router.replace(url, { scroll: false });
  }, [
    searchQuery,
    selectedLanguages,
    selectedCategories,
    selectedTechnologies,
    selectedLevels,
    page,
    pathname,
    router,
  ]);

  // Some seeded rows store an array field as a JSON-encoded string
  // (e.g. languages = ['["Go"]']). Flatten those so facets stay clean.
  const norm = (arr?: string[]): string[] =>
    (arr || []).flatMap((v) => {
      if (typeof v === "string" && v.trim().startsWith("[")) {
        try {
          const parsed = JSON.parse(v);
          return Array.isArray(parsed) ? parsed.map(String) : [v];
        } catch {
          return [v];
        }
      }
      return [v];
    });

  // Facets (with counts) derived from the full project set.
  const facetCounts = (pick: (p: ProjectItem) => string[]) => {
    const counts = new Map<string, number>();
    for (const p of projects) {
      for (const v of norm(pick(p))) {
        if (!v) continue;
        counts.set(v, (counts.get(v) || 0) + 1);
      }
    }
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  };

  const languageFacets = useMemo(
    () => facetCounts((p) => p.languages),
    [projects],
  );
  const categoryFacets = useMemo(
    () => facetCounts((p) => p.industries || []),
    [projects],
  );
  const technologyFacets = useMemo(
    () => facetCounts((p) => p.technologies || []),
    [projects],
  );

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return projects.filter((p) => {
      const searchOk =
        !q ||
        p.title.toLowerCase().includes(q) ||
        (p.summary || "").toLowerCase().includes(q);
      const langOk =
        selectedLanguages.length === 0 ||
        norm(p.languages).some((l) => selectedLanguages.includes(l));
      const catOk =
        selectedCategories.length === 0 ||
        norm(p.industries || []).some((c) => selectedCategories.includes(c));
      const techOk =
        selectedTechnologies.length === 0 ||
        norm(p.technologies || []).some((t) => selectedTechnologies.includes(t));
      const levelOk =
        selectedLevels.length === 0 || selectedLevels.includes(p.level);
      return searchOk && langOk && catOk && techOk && levelOk;
    });
  }, [
    projects,
    searchQuery,
    selectedLanguages,
    selectedCategories,
    selectedTechnologies,
    selectedLevels,
  ]);

  // Reset to first page whenever filters/search change.
  useEffect(() => {
    setPage(1);
  }, [
    searchQuery,
    selectedLanguages,
    selectedCategories,
    selectedTechnologies,
    selectedLevels,
  ]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const activeCount =
    selectedLanguages.length +
    selectedCategories.length +
    selectedTechnologies.length +
    selectedLevels.length +
    (searchQuery ? 1 : 0);
  const hasActiveFilters = activeCount > 0;

  const toggle = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    item: string,
  ) =>
    setter((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );

  const clearAll = () => {
    setSearchQuery("");
    setSelectedLanguages([]);
    setSelectedCategories([]);
    setSelectedTechnologies([]);
    setSelectedLevels([]);
  };

  return (
    <section className="pt-10 pb-16 md:pb-20 px-4 bg-[#F8FAFC] text-slate-900">
      <div className="container mx-auto">
        <h3 className="text-lg font-bold text-[#0B152A] mb-6">
          Browse <span className="text-[#13AECE]">Projects</span>
        </h3>

        <div className="flex flex-col lg:flex-row gap-8 lg:items-start">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0 lg:sticky lg:top-6 lg:self-start lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto">
            <button
              onClick={() => setSidebarOpen((p) => !p)}
              className="lg:hidden w-full mb-4 flex items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700"
            >
              <span className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {hasActiveFilters && (
                  <span className="ml-1 w-2 h-2 rounded-full bg-[#13AECE]" />
                )}
              </span>
              {sidebarOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            <div className={`${sidebarOpen ? "block" : "hidden"} lg:block`}>
              <button
                onClick={clearAll}
                className="w-full mb-5 px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
              >
                Clear All
                {hasActiveFilters && (
                  <span className="px-1.5 py-0.5 rounded text-xs bg-[#0B152A] text-white">
                    {activeCount}
                  </span>
                )}
              </button>

              <div className="space-y-8 bg-white border border-slate-200 rounded-xl p-5">
                <FacetGroup
                  title="Language"
                  facets={languageFacets}
                  selected={selectedLanguages}
                  onToggle={(n) => toggle(setSelectedLanguages, n)}
                />

                {categoryFacets.length > 0 && (
                  <>
                    <hr className="border-slate-100" />
                    <FacetGroup
                      title="Category"
                      facets={categoryFacets}
                      selected={selectedCategories}
                      onToggle={(n) => toggle(setSelectedCategories, n)}
                    />
                  </>
                )}

                {technologyFacets.length > 0 && (
                  <>
                    <hr className="border-slate-100" />
                    <FacetGroup
                      title="Technology"
                      facets={technologyFacets}
                      selected={selectedTechnologies}
                      onToggle={(n) => toggle(setSelectedTechnologies, n)}
                    />
                  </>
                )}

                <hr className="border-slate-100" />

                <FacetGroup
                  title="Skill Level"
                  facets={LEVELS.map((name) => ({ name }))}
                  selected={selectedLevels}
                  onToggle={(n) => toggle(setSelectedLevels, n)}
                />
              </div>
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Search bar */}
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0A101D]/20 transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 mb-5">
              <span className="text-sm text-slate-500">
                {filtered.length} {filtered.length === 1 ? "project" : "projects"}
              </span>
            </div>

            {paginated.length === 0 ? (
              <div className="text-center py-20 text-slate-400">
                <FolderOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">
                  {hasActiveFilters
                    ? "No projects match your filters."
                    : "No projects available yet."}
                </p>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {paginated.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
                <PaginationBar
                  currentPage={page}
                  totalPages={totalPages}
                  onPage={setPage}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
