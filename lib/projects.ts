import { API_URL } from "@/lib/config";
import type { ProjectItem } from "@/components/project-card";

// Below this, the environment is almost certainly pointed at dev rather than prod.
// Production has 200+ projects; the dev API returns 15. Wiring the wrong API_URL
// silently produces thin taxonomy pages and a near-empty sitemap, which is worse
// for SEO than not shipping at all — so make it loud at build time.
const EXPECTED_MIN_PROJECTS = 50;

export async function fetchProjects(): Promise<ProjectItem[]> {
  try {
    const res = await fetch(`${API_URL}/public/projects?size=500`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      console.error(`[projects] ${API_URL} returned ${res.status}`);
      return [];
    }
    const data = await res.json();
    const projects = (data.projects ?? []) as ProjectItem[];

    if (projects.length < EXPECTED_MIN_PROJECTS) {
      console.warn(
        `[projects] Only ${projects.length} projects from ${API_URL}. ` +
          `Expected ${EXPECTED_MIN_PROJECTS}+. This looks like a dev API — check ` +
          `API_URL / NEXT_PUBLIC_API_URL before deploying, or taxonomy pages and ` +
          `the sitemap will ship thin.`,
      );
    }

    return projects;
  } catch (error) {
    console.error(`[projects] Failed to fetch from ${API_URL}`, error);
    return [];
  }
}
