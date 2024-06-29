<template>
  <div>
    <div class="px-10 pt-20 md:pt-40"></div>

    <section class="bg-white mb-20 max-w-7xl mx-auto px-5">
      <h1 class="text-4xl text-primary text-center font-bold">
        {{ project?.title }}
      </h1>
      <div class="lg:grid grid-cols-7 my-10 flex flex-col gap-10">
        <div class="col-span-5 p-">
          <article
            data-v-3d56a840=""
            data-clarity-region="article"
            class="w-full h-full"
            v-html="project?.description"
          ></article>
        </div>

        <div class="self-start sticky top-40 col-span-2 md:w-full">
          <div class="h-full w-full shadow p-5">
            <div class="w-full bg-white mb-5">
              <div class="flex">
                <div
                  class="text-center w-full justify-center flex flex-col gap-3 p-2"
                >
                  <a
                    :href="project?.prd ?? '#'"
                    target="_blank"
                    class="px-6 py-3 border border-solid w-full bg-secondary text-white font-bold text-lg rounded block"
                  >
                    Download PRD
                  </a>

                  <a
                    :href="project?.frontend ?? '#'"
                    target="_blank"
                    class="px-6 py-3 border border-secondary border-solid w-ful text-secondary font-bold text-lg rounded block"
                  >
                    Preview Frontend
                  </a>
                </div>
              </div>
            </div>

            <div class="w-full bg-white">
              <div class="grid grid-cols-2 w-full gap-5">
                <div class="flex items-center gap-2">
                  <span class="w-6">
                    <img
                      class="star-rating"
                      src="~/assets/img/blue-check.png"
                      alt=""
                    />
                  </span>
                  <div class="flex flex-1 flex-col">
                    <h3 class="text-lg leading-6">{{ project.level }}</h3>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-6">
                    <img
                      class="star-rating"
                      src="~/assets/img/blue-check.png"
                      alt=""
                    />
                  </span>
                  <div class="flex flex-1 flex-col">
                    <h3 class="text-lg leading-6">2 Tasks</h3>
                  </div>
                </div>

                <div class="flex items-center gap-2">
                  <span class="w-6">
                    <img
                      class="star-rating"
                      src="~/assets/img/blue-check.png"
                      alt=""
                    />
                  </span>
                  <div class="flex flex-1 flex-col">
                    <h3 class="text-lg leading-6">{{ project.duration }}</h3>
                  </div>
                </div>

                <div class="flex items-center gap-2">
                  <span class="w-6">
                    <img
                      class="star-rating"
                      src="~/assets/img/blue-check.png"
                      alt=""
                    />
                  </span>
                  <div class="flex flex-1 flex-col">
                    <h3 class="text-lg leading-6 w-full">
                      {{ project.category }}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="w-full my-5 bg-white shadow p-5">
            <h4 class="text-2xl text-bold mb-5">Tags</h4>
            <div class="grid grid-cols-2 w-full gap-5">
              <div
                class="flex items-center gap-2"
                v-for="(item, i) in project?.tags"
                :key="i"
              >
                <span class="w-6">
                  <img
                    class="star-rating"
                    src="~/assets/img/blue-check.png"
                    alt=""
                  />
                </span>
                <div class="flex flex-1 flex-col">
                  <h3 class="text-lg leading-6">{{ item }}</h3>
                </div>
              </div>
            </div>
          </div>

          <div class="w-full my-5 bg-white shadow p-5">
            <div class="mb-5">
              <h4 class="text-2xl text-bold mb-5">Want Your Certificate?</h4>
              <p>
                Complete all the tasks in the project to claim your certificate
              </p>
            </div>
            <!-- Certificate Sample here -->
            <button
              disabled="true"
              class="px-6 py-3 border border-solid w-full bg-gray-500 text-gray-300 font-bold text-lg rounded block"
            >
              {{ "Claim Your Certificate" }}
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
  
  <script setup>
const { getProject } = await useProjects("/projects");
const project = await getProject(useRoute().params.slug);

console.log(project);
</script>
  
  <style scoped>
article img {
  height: auto;
  width: 100%;
  background-size: cover;
}

article table {
  border: 1px solid #eee;
}

article > * {
  font-family: "Georgia", serif !important;
}

article p,
article {
  margin-bottom: 1.3rem;
  font-weight: 400;
  line-height: 2;
}

article h1,
article h2,
article h3,
article h4,
article h5,
article h6 {
  padding-bottom: 0.8rem;
  padding-top: 0.8rem;
  font-weight: bold;
}

article h2 {
  font-size: 1.6rem;
}

article h3 {
  font-size: 1.4rem;
}

article h4 {
  font-size: 1.2rem;
}

article h5 {
  font-size: 1rem;
}

article h6 {
  font-size: 0.8rem;
}

article > ul {
  list-style: disc !important;
}

article > ol {
  list-style: decimal !important;
}
article ul,
article ol {
  margin-bottom: 1.3rem;
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
}

article ul li,
article ol li {
  line-height: 32px;
  font-size: 1.125rem;
  font-weight: 400;
}

article figure figcaption {
  line-height: 32px;
  text-align: center;
  font-style: italic;
  font-weight: 400;
}

article figure img {
  outline: none !important;
  margin: 0 auto !important;
  border: 5px solid #cccccc;
  display: inline-block;
  width: 10%;
  height: auto;
  border-radius: 0 !important;
}

article a,
article a:hover {
  color: #191488;
  transition: all 0.2s ease-in-out 0s;
  background-color: transparent;
}
</style>