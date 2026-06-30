import { ProjectCard } from "@/components/project-card";
import type { ProjectItem } from "@/components/project-card";

export function RecommendedProjects({
  projects,
}: {
  projects: ProjectItem[];
}) {
  if (!projects?.length) return null;

  return (
    <section className="pt-10 px-4 bg-[#F8FAFC] text-slate-900">
      <div className="container mx-auto">
        <h3 className="text-lg font-bold text-[#0B152A] mb-5">
          Recommended Projects
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} project={project} popular />
          ))}
        </div>
      </div>
    </section>
  );
}
