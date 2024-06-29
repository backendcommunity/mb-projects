
<template>
  <div>
    <div class="px-10 pt-20 md:pt-40"></div>

    <section class="bg-white mb-20 px-10">
      <h2 class="text-4xl text-primary text-center font-bold">
        <span class="text-secondary italic">All</span> Backend Projects
      </h2>
      <div class="md:grid md:grid-cols-12 my-10 flex flex-col gap-10">
        <div class="shadow md:self-start md:sticky md:top-40 col-span-2">
          <SearchFilter />
        </div>

        <div class="md:col-span-9">
          <div
            class="flex lg:flex-row flex-col md:grid grid-cols-3 gap-10 w-full"
          >
            <Project
              :project="project"
              v-for="(project, index) in projects"
              :key="index"
            />
          </div>
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