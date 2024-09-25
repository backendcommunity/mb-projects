<template>
  <div class="">
    <div class="px-10 pt-20 md:pt-40 md:w-60 w-full">
      <nuxt-link to="/projects" class="flex items-center gap-2 text-secondary"><svg width="1em" height="1em"
          viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M24 13.3a.2.2 0 01-.2.2H5.74l8.239 8.239a.2.2 0 010 .282L12.14 23.86a.2.2 0 01-.282 0L.14 12.14a.2.2 0 010-.282L11.86.14a.2.2 0 01.282 0L13.98 1.98a.2.2 0 010 .282L5.74 10.5H23.8c.11 0 .2.09.2.2v2.6z"
            fill="currentColor"></path>
        </svg>
        <span> All Projects</span></nuxt-link>
    </div>


    <section class="bg-white mb-20 px-10">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-4xl text-primary py-2 font-bold">
          All
          <span class="text-secondary capitalize italic">{{ language }}</span>
          Backend Projects
        </h2>
        <p class="text-gray-500 text-sm italic">
          Access a catalog of {{ projects?.length ?? 0 }}+ advanced
          {{ language }} backend projects, {{ language }} backend project ideas,
          {{ language }} backend projects for portfolio, {{ language }} backend
          development projects and {{ language }} backend developer projects to
          help you practice and belong great {{ language }} backend engineer.
        </p>
      </div>
      <div class="md:grid md:grid-cols-12 my-10 flex flex-col gap-10">
        <div class="shadow md:self-start md:sticky md:top-40 col-span-2">
          <SearchFilter />
        </div>

        <div class="md:col-span-9 border-t py-5">
          <div v-if="projects?.length" class="flex lg:flex-row flex-col md:grid grid-cols-3 gap-10 w-full">
            <Project :project="project" v-for="(project, index) in projects" :key="index" />
          </div>

          <h2 v-else class="text-4xl text-primary font-bold">
            No Projects Found
          </h2>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup></script>

<style></style>

<script setup>
  const {  getProjectsByCategory } = await useProjects("/projects");
  
  const route = useRoute();
  const language = ref("");
  const title = ref("");
  const projects = ref([]);
  
  function generateQuery() {
    const slug = route.params?.slug;


    language.value = slug?.split("-backend-projects")[0];
    return { type: "category" };
  }
  
  async function loadProjects() {
    const query = generateQuery();
  
    if (query.type.includes("category"))
      return await getProjectsByCategory({
        category: language.value,
        page: 0, count: 100
      });
  
  }
  
  projects.value = await loadProjects();

  console.log(projects.value)
  
  useHead({
    title: `Advanced ${language.value} Backend Projects`,
    meta: [
      {
        hid: "description",
        name: "description",
        content: `Access a catalog of ${projects?.length ?? 0}+ advanced ${
          language.value
        } backend projects, ${language.value} backend project ideas, ${
          language.value
        } backend projects for portfolio, ${
          language.value
        } backend development projects and ${
          language.value
        } backend developer projects to help you practice and belong great ${
          language.value
        } backend engineer.`,
      },
  
      {
        hid: "og:title",
        property: "og:title",
        content: `Advanced ${language.value} Backend Projects`,
      },
      {
        hid: "og:description",
        property: "og:description",
        content: `Access a catalog of ${projects?.length ?? 0}+ advanced ${
          language.value
        } backend projects, ${language.value} backend project ideas, ${
          language.value
        } backend projects for portfolio, ${
          language.value
        } backend development projects and ${
          language.value
        } backend developer projects to help you practice and belong great ${
          language.value
        } backend engineer.`,
      },
      {
        hid: "og:image",
        property: "og:image",
        content: `/hero.png`,
      },
      {
        hid: "og:url",
        property: "og:url",
        content: `/${route.params?.slug}`,
      },
      {
        hid: "og:image:width",
        property: "og:image:width",
        content: "100",
      },
      {
        hid: "og:image:height",
        property: "og:image:height",
        content: "100",
      },
      {
        hid: "og:type",
        property: "og:type",
        content: "website",
      },
      {
        hid: "twitter:card",
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
  });
  </script>

<style></style>