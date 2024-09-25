export async function useProjects(url: string = "/projects") {
  const config = useRuntimeConfig();

  async function init(url: string = "/projects", data: any) {
    try {
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
    } catch (err) {
      console.log(err, "dada");
    }
  }

  async function getProjects(data: any = { page: 0, count: 100 }) {
    const res: any = await init(
      `/projects?pagination[page]=${data.page}&pagination[pageSize]=${data.count}`,
      data
    );
    const projects = res?.data.value?.data;

    if (!projects?.length) return;

    return resolveProjects(projects);
  }

  async function getFeaturedProjects(data: any = {}) {
    let res: any = await init(`${url}/?filters[isFeatured][$eq]=true`, data);

    const projects = res?.data.value?.data;

    if (!projects?.length) return;

    return resolveProjects(projects);
  }

  async function getProjectsByLevel(data: any = { page: 0, count: 100 }) {
    let res: any = await init(
      `${url}/?filters[level][$eq]=${data.level}&pagination[page]=${data.page}&pagination[pageSize]=${data.count}`,
      data
    );

    const projects = res?.data.value?.data;

    if (!projects?.length) return;

    return resolveProjects(projects);
  }

  async function getProjectsByCategory(data: any = { page: 0, count: 100 }) {
    let res: any = await init(
      `${url}/?filters[category][$eq]=${data.category}&pagination[page]=${data.page}&pagination[pageSize]=${data.count}`,
      data
    );

    const projects = res?.data.value?.data;

    if (!projects?.length) return;

    return resolveProjects(projects);
  }

  async function getProject(slug: string, data: any = {}) {
    let res: any = await init(`${url}/?filters[slug][$eq]=${slug}`, data);

    const projects = res?.data?.value?.data;

    if (!projects?.length) return;

    return resolveProjects(projects)[0];
  }

  async function getLanguageProjects(data: any = { page: 0, count: 100 }) {
    try {
      const customURL = `${url}?tags[]=${data?.language}&pagination[page]=${data.page}&pagination[pageSize]=${data.count}`;
      let res: any = await init(customURL, data);
      const projects = res?.data?.value?.data;
      if (!projects?.length) return [];

      return filterByTags(resolveProjects(projects), data?.language);
    } catch (er) {
      console.log(er);
    }
  }

  const resolveProjects = (projects: any) => {
    return projects?.map((project: any) => {
      return {
        id: project.id,
        ...project.attributes,
      };
    });
  };

  const filterByTags = (projects: any, tag: string) => {
    return projects.filter((project: any) =>
      project.tags.map((t: any) => t.toLowerCase()).includes(tag.toLowerCase())
    );
  };

  return {
    getProjects,
    getProject,
    getFeaturedProjects,
    getLanguageProjects,
    getProjectsByCategory,
    getProjectsByLevel,
  };
}
