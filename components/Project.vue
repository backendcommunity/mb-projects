<template>
  <div class="w-full border rounded-lg p-4 hover:shadow">
    <div class="flex flex-col gap-4 justify-center">
      <div class="w-10 rounded-full border p-1 h-10">
        <img style="background-size: contain" class="w-full cover rounded-lg" :src="project?.image ??
          'https://pub-63da695b9ece47c5b3b49bd78b86d884.r2.dev/node.webp'
          " :alt="project?.title" />
      </div>

      <div class="flex items-center gap-5">
        <nuxt-link :to="`/projects/tags/${project?.level?.toLowerCase()}-backend-projects`">
          <span class="rounded-md border py-0.5 px-2 bg-green-300/40 border-green-400/50 text-green-900/90">{{
          project?.level }}</span>
        </nuxt-link>
        <span class="text-4xl rounded-full border bg-gray-600 w-2 h-2"></span>
        <span class="text-sm text-gray-600">202 building</span>
      </div>

      <nuxt-link :to="`/projects/${project?.slug}`" class="flex w-ful gap-0 hover:text-secondary">
        <h2 class="text-xl font-medium">{{ project?.title }}</h2>
      </nuxt-link>
      <div class="w-full">
        <article class="w-full text-gray-500 text-sm" v-html="project?.excerpt"></article>
      </div>

      <div>
        <p class="text-md uppercase font-bold text-gray-600 pb-2">
          {{ project?.skills }}
        </p>
        <div class="items-center grid md:grid-cols-3 grid-cols-2 gap-2 text-center">
          <nuxt-link :to="`/projects/category/${project?.category}-backend-projects`">
            <span class="rounded-md border py-0.5 px-2 text-xs text-gray-700 bg-white border-gray-300">{{
          project?.category }}</span>
          </nuxt-link>
          <nuxt-link :to="`/projects/tags/${item?.toLowerCase()}-backend-projects`" v-for="(item, i) in project?.tags"
            :key="i" class="rounded-md border py-0.5 px-2 text-xs text-gray-700 bg-white border-gray-300">{{
          item
        }}</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(["project"]);
</script>

<style></style>