export async function useProjects(url: string) {
  const config = useRuntimeConfig();

  async function init(url: string, data: any) {
    return await useFetch(url, {
      ...data,
      baseURL: config.public.BASE_ENDPOINT_URL,
      query: {
        ...data?.query,
      },
      headers: {
        Authorization: `bearer ${config.public.STRAPI_TOKEN}`,
        "Content-Type": "application/json",
        ...data?.headers,
      },
    });
  }

  async function getProjects(data: any = {}) {
    const res = await init(url, data);
    const projects = res.data.value?.data;

    if (!projects?.length) return;

    return resolveProjects(projects);
  }

  async function getFeaturedProjects(data: any = {}) {
    let res = await init(`${url}/?filters[isFeatured][$eq]=true`, data);

    const projects = res.data.value?.data;

    if (!projects?.length) return;

    return resolveProjects(projects);
  }

  async function getProject(slug: string, data: any = {}) {
    let res = await init(`${url}/?filters[slug][$eq]=${slug}`, data);

    const projects = res.data?.value?.data;

    if (!projects?.length) return;

    return resolveProjects(projects)[0];
  }

  const resolveProjects = (projects: any) => {
    return projects?.map((project: any) => {
      return {
        id: project.id,
        ...project.attributes,
      };
    });
  };

  return {
    getProjects,
    getProject,
    getFeaturedProjects,
  };
}
