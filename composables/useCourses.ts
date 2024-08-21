export async function useCourses() {
  const config = useRuntimeConfig();

  async function init(url: string, data: any) {
    try {
      console.log(url, config.public.MB_API_URL);
      return await useFetch(url, {
        ...data,
        baseURL: config.public.MB_API_URL,
        query: {
          ...data?.query,
        },
        headers: {
          "Content-Type": "application/json",
          ...data?.headers,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function getCourses(data: any = {}) {
    const res: any = await init("/courses", data);
    const courses = res?.data.value?.courses;

    if (!res?.data.value?.message?.includes("Success")) return [];

    return courses;
  }

  return {
    getCourses,
  };
}
