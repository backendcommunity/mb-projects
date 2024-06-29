
<template>
  <div>
    <div class="px-10 pt-20 md:pt-40"></div>

    <section class="bg-white mb-20 px-10">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-4xl text-primary py-2 font-bold">
          <span class="text-secondary italic">All</span> Backend Projects
        </h2>
        <p class="text-gray-500 text-sm italic">
          Access a catalog of 200+ advanced backend projects, backend project
          ideas, backend projects for portfolio, backend development projects
          and backend developer projects to help you practice and belong great
          backend engineer.
        </p>
      </div>
      <div class="md:grid md:grid-cols-12 my-10 flex flex-col gap-10">
        <div class="shadow md:self-start md:sticky md:top-40 col-span-2">
          <SearchFilter />
        </div>

        <div class="md:col-span-9 border-t py-5">
          <div
            v-if="projects?.length"
            class="flex lg:flex-row flex-col md:grid grid-cols-3 gap-10 w-full"
          >
            <Project
              :project="project"
              v-for="(project, index) in projects"
              :key="index"
            />
          </div>

          <h2 v-else class="text-4xl text-primary font-bold">
            No Projects Found
          </h2>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
</script>

<style>
</style>




<script setup>
const { getProjects } = await useProjects("/projects");
const projects = await getProjects();
</script>

<style>
</style>