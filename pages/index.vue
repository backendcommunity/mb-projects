<template>
  <div class="">
    <section class="bg-primary">
      <div
        class="flex lg:flex-col flex-row max-w-7xl mx-auto items-center justify-evenly px-10 pt-20 md:pt-40 gap-x-10"
      >
        <div class="flex w-full flex-row items-ceter pt-[72px] mb-10">
          <div class="md:mt-0">
            <div
              class="mb-20 pb-20 flex w-full lg:w-4/5 flex-col items-center space-y-3 md:items-start md:space-y-5"
            >
              <h1 class="text-5xl md:text-6xl font-bold text-white lg:text-8xl">
                Build Real-World Backend
                <span class="text-secondary"> Projects. </span>
              </h1>
            </div>
            <div
              class="flex w-full flex-col lg:flex-row gap-5 items-center lg:items-start justify-evenly"
            >
              <div class="mb-10 w-full flex flex-col items-start">
                <div
                  class="flex flex-col items-start space-y-3 text-white md:text-lg"
                >
                  <h2
                    class="text-2xl font-bold text-white sm:text-3xl lg:text-4xl"
                  >
                    <!-- Want to join us? -->
                  </h2>
                  <p class="">
                    Helping you become a great backend engineer through
                    practicing and building real world backend engineering
                    projects.
                  </p>
                  <div
                    class="text-xs font-medium text-gray-300 md:text-sm py-5"
                  >
                    <div class="flex space-x-4">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewbox="0 0 24 24"
                          stroke-width="4"
                          stroke="currentColor"
                          class="h-7 w-7 text-green-400"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          ></path>
                        </svg>
                      </div>
                      <p class="">
                        No frontend skill required (Frontend already built)
                      </p>
                    </div>
                    <div class="flex space-x-4">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewbox="0 0 24 24"
                          stroke-width="4"
                          stroke="currentColor"
                          class="h-7 w-7 text-green-400"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          ></path>
                        </svg>
                      </div>
                      <p>Personal Backend Portfolio to showcase your skills</p>
                    </div>
                    <div class="flex space-x-4">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewbox="0 0 24 24"
                          stroke-width="4"
                          stroke="currentColor"
                          class="h-7 w-7 text-green-400"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          ></path>
                        </svg>
                      </div>
                      <p>Learn to build from hundreds of real-world projects</p>
                    </div>

                    <div class="flex space-x-4">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewbox="0 0 24 24"
                          stroke-width="4"
                          stroke="currentColor"
                          class="h-7 w-7 text-green-400"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          ></path>
                        </svg>
                      </div>
                      <p>
                        Map courses to backend projecs to help you master your
                        skills.
                      </p>
                    </div>
                    <div class="flex space-x-4">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewbox="0 0 24 24"
                          stroke-width="4"
                          stroke="currentColor"
                          class="h-7 w-7 text-green-400"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          ></path>
                        </svg>
                      </div>
                      <p>
                        Pick projects from different business domains, level,
                        and categories.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="w-1/2 md:w-20 lg:w-1/2 flex justify-center items-start"
              >
                <img
                  class="hidden lg:block"
                  src="https://cdn.prod.website-files.com/6478b97e8a7a81e06c1cff93/647a530ed656289ded2a9788_arrow-right.svg"
                />

                <div class="text-secondary lg:hidden self-center block">
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 80 81"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M40.0013 16.9111V63.5778M40.0013 63.5778L63.3346 40.2445M40.0013 63.5778L16.668 40.2445"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="mx-auto w-full mb-10">
                <h2
                  class="text-2xl font-bold text-white sm:text-3xl lg:text-4xl"
                >
                  Start here.
                </h2>
                <div class="py-5 flex flex-col w-ful gap-5">
                  <nuxt-link
                    to="/projects"
                    class="bg-secondary md:w-60 w-full text-center px-4 py-3 font-bold rounded-md text-[#fff]"
                  >
                    View All Backend Projects
                  </nuxt-link>

                  <a
                    href="https://playground.masteringbackend.com"
                    target="_blank"
                    class="border-secondary md:w-60 w-full text-center border border-outline px-4 py-3 font-bold rounded-md text-white"
                  >
                    Try Playground
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white mb-20 px-10">
      <div class="max-w-7xl container mx-auto my-10">
        <div class="flex justify-center flex-col items-center">
          <h2 class="text-4xl text-primary text-center font-bold">
            <span class="text-secondary italic">Featured</span> Backend Projects
          </h2>

          <div
            class="flex lg:flex-row flex-col md:grid grid-cols-3 my-10 gap-10"
          >
            <Project
              v-for="(project, i) in projects"
              :key="i"
              :project="project"
            />
          </div>

          <div>
            <nuxt-link
              to="/projects"
              class="border-secondary border border-outline px-8 py-3 font-bold rounded-2xl text-secondary"
            >
              View all projects
            </nuxt-link>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-secondary text-white">
      <div
        class="flex flex-col max-w-7xl mx-auto items-centr justify-evenly px-10 pt-20 md:pt-40 gap-x-10"
      >
        <div class="flex flex-col lg:flex-row">
          <div class="lg:w-2/3 w-full md:w-full pb-10 lg:pb-0">
            <h2 class="lg:text-7xl text-4xl md:text-6xl">
              Three simple ways <br class="md:hidden hidden lg:block" />to
              practice backend engineering.
            </h2>
          </div>
          <div class="lg:w-1/2 w-full">
            <div
              class="flex justify-between gap-5 py-6 border-b border-solid border-white"
            >
              <span class="text-4xl self-start text-green-400">01</span>
              <div class="">
                <h3 class="text-2xl pb-4 font-medium">Pick a project</h3>
                <p>
                  Pick an backend project of your choice from hundreds of
                  backend projects.
                </p>

                <div class="mx-auto w-full mb-5">
                  <div class="py-5">
                    <nuxt-link
                      to="/projects"
                      class="bg-primary px-4 py-3 font-bold rounded-md text-[#fff]"
                    >
                      View Projects
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="flex justify-between gap-5 py-6 border-b border-solid border-white"
            >
              <span class="text-4xl self-start text-green-400">02</span>
              <div class="">
                <h3 class="text-2xl pb-4 font-medium">
                  Build with our playground
                </h3>
                <p>
                  We have already set up every project with customized
                  playground and install all the dependencies including the
                  Frontend. So you can just focus on building the backend.
                </p>

                <div class="mx-auto w-full mb-5">
                  <div class="py-5">
                    <a
                      target="_blank"
                      href="https://playground.masteringbackend.com"
                      class="bg-primary px-4 py-3 font-bold rounded-md text-[#fff]"
                    >
                      Use Playground
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex justify-between gap-5 py-6">
              <span class="text-4xl self-start text-green-400">03</span>
              <div class="">
                <h3 class="text-2xl pb-4 font-medium">
                  Create Backend Portfolio
                </h3>
                <p>
                  Add every backend project your build to your backend portfolio
                  and share it with potential employees.
                </p>

                <div class="mx-auto w-full mb-5">
                  <div class="py-5">
                    <a
                      href="#"
                      class="bg-primary px-4 py-3 font-bold rounded-md text-[#fff]"
                    >
                      Create portfolio
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white pt-20 px-10">
      <div class="max-w-7xl container mx-auto my-10">
        <div class="flex justify-center flex-col items-center">
          <div class="uppercase text-tertiary py-5">
            <p class="text-gray-500 font-thin">Learn to build from experts</p>
          </div>
          <h2 class="text-4xl text-primary text-center font-bold">
            <span class="text-secondary italic">Featured</span> Project-based
            Courses
          </h2>

          <div
            class="flex lg:flex-row flex-col md:grid grid-cols-3 my-10 gap-10"
          >
            <!-- 1 -->
            <div
              v-for="(course, i) in featuredCourses"
              :key="i"
              class="flex flex-col mx-auto overflow-hidden border border-solid border-gray-200 rounded bg-white transform transition hover:-translate-y-1.5 hover:shadow:xl duration-500"
            >
              <div class="relative flex h-40 w-ful items-center justify-center">
                <div class="w-full">
                  <div class="h-full w-full">
                    <figure
                      style="
                        box-sizing: border-box;
                        display: block;
                        overflow: hidden;
                        width: initial;
                        height: initial;
                        background: none;
                        opacity: 1;
                        border: 0px;
                        margin: 0px;
                        padding: 0px;
                        position: absolute;
                        inset: 0px;
                      "
                    >
                      <img
                        v-if="course?.banner"
                        class="img-fluid w-full"
                        :src="course?.banner"
                        :alt="course?.title"
                      />

                      <img
                        v-else
                        src="~/assets/img/UX img.png"
                        :alt="course?.title"
                      />
                    </figure>
                  </div>
                </div>
              </div>
              <div
                class="p-5 mb-1.5 relative space-y-2"
                style="min-height: 148px"
              >
                <div class="flex justify-between mb-5">
                  <h3
                    class="rounded-md border p-2 bg-green-300/40 border-green-400/50 text-green-900/90"
                  >
                    {{ course?.type }}
                  </h3>

                  <h3
                    class="rounded-md border p-2 bg-red-300/40 border-red-400/50 text-red-900/90"
                  >
                    {{ course?.isPremium ? `$${course?.amount}` : "Free" }}
                  </h3>
                </div>
                <div class="my-5">
                  <h2 class="font-medium text-xl">
                    {{ course?.title }}
                  </h2>
                </div>
                <div
                  class="text-sm text-gray-600"
                  v-html="course?.summary"
                ></div>
              </div>

              <div class="flex justify-between items-center text-secondary p-5">
                <div class="flex items-center">
                  <span>
                    <img
                      class="star-img"
                      src="~/assets/img/openbook-icon.png"
                      alt=""
                    />
                  </span>
                  <span class="text-sm px-2"
                    >{{ totalContent(course) }}+ Contents</span
                  >
                </div>
                <a
                  class="px-4 py-2 border-solid border border-secondary rounded"
                  :href="`https://app.masteringbackend.com/courses/${course?.slug}?ref=project_featured_courses`"
                >
                  <p class="text-sm font-semibold">Start Watching</p>
                </a>
              </div>
            </div>
          </div>

          <div>
            <a
              target="_blank"
              href="https://masteringbackend.com/courses/single"
              class="border-secondary border border-outline px-8 py-3 font-bold rounded-2xl text-secondary"
            >
              View all courses
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white pt-40 px-10">
      <div class="max-w-7xl container mx-auto my-10">
        <div class="flex justify-center flex-col items-center">
          <div class="uppercase text-tertiary py-5">
            <p class="text-gray-500 font-thin">Recent Blog Post</p>
          </div>
          <h2 class="text-4xl text-primary text-center font-bold">
            <span class="text-secondary italic">Get</span> Inspired
          </h2>

          <div
            class="flex lg:flex-row flex-col md:grid grid-cols-3 my-10 gap-10"
          >
            <div class="w-full">
              <a
                href="https://masteringbackend.com/posts/getting-started-with-docker-for-python-developers"
                target="_blank"
                class="flex flex-col justify-center p-2 rounded-lg hover:shadow"
              >
                <div class="rounded-lg border">
                  <div class="w-full">
                    <img
                      class="w-full rounded-lg"
                      src="https://strapi-images-aws-s3.s3.us-west-2.amazonaws.com/Docker_for_Python_Developers_ce6ff87443.png"
                      alt="Getting Started with Docker for Python Developers"
                    />
                  </div>
                </div>
                <div class="flex w-ful py-5 gap-0">
                  <h2 class="text-xl font-medium">
                    Getting Started with Docker for Python Developers
                  </h2>
                  <div class="self-start">
                    <img
                      src="https://cdn.prod.website-files.com/6478b97e8a7a81e06c1cff93/6487d987cbba18ae13639439_arrow-right-tss.svg"
                      alt=""
                    />
                  </div>
                </div>
              </a>
            </div>

            <div class="w-full">
              <a
                target="_blank"
                href="https://masteringbackend.com/posts/software-architecture-with-golang"
                class="flex flex-col justify-center p-2 rounded-lg hover:shadow"
              >
                <div class="rounded-lg border">
                  <div class="w-full">
                    <img
                      class="w-full rounded-lg"
                      src="https://strapi-images-aws-s3.s3.us-west-2.amazonaws.com/Definitive_Guide_to_Software_Architecture_with_Golang_a00ef95e06.png"
                      alt="Definitive Guide to Software Architecture with Golang"
                    />
                  </div>
                </div>
                <div class="flex w-ful py-5 gap-0">
                  <h2 class="text-xl font-medium">
                    Definitive Guide to Software Architecture with Golang
                  </h2>
                  <div class="self-start">
                    <img
                      src="https://cdn.prod.website-files.com/6478b97e8a7a81e06c1cff93/6487d987cbba18ae13639439_arrow-right-tss.svg"
                      alt=""
                    />
                  </div>
                </div>
              </a>
            </div>

            <div class="w-full">
              <a
                href="https://masteringbackend.com/posts/how-to-deploy-your-node-js-backend-project-to-vercel-a-step-by-step-guide"
                target="_blank"
                class="flex flex-col justify-center p-2 rounded-lg hover:shadow"
              >
                <div class="rounded-lg border">
                  <div class="w-full">
                    <img
                      class="w-full rounded-lg"
                      src="https://strapi-images-aws-s3.s3.us-west-2.amazonaws.com/1_g74t1mdjn2_Ye_J_Tx_A5m2_Ig_22eade294b.jpeg"
                      alt="How to Deploy Your Node.js Backend Project to Vercel: A Step-by-Step Guide"
                    />
                  </div>
                </div>
                <div class="flex w-ful py-5 gap-0">
                  <h2 class="text-xl font-medium">
                    How to Deploy Your Node.js Backend Project to Vercel: A
                    Step-by-Step Guide
                  </h2>
                  <div class="self-start">
                    <img
                      src="https://cdn.prod.website-files.com/6478b97e8a7a81e06c1cff93/6487d987cbba18ae13639439_arrow-right-tss.svg"
                      alt=""
                    />
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div>
            <a
              target="_blank"
              href="https://masteringbackend.com/posts"
              class="border-secondary border border-outline px-8 py-3 font-bold rounded-2xl text-secondary"
            >
              View all posts
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white py-20 px-10">
      <div class="max-w-md mx-auto my-10">
        <div class="flex justify-center flex-col items-center">
          <h3 class="text-3xl text-primary text-center font-medium">
            Subscribe to begin.
          </h3>

          <div class="py-6">
            <p class="text-center">
              Join 10K+ Readers of The Backend Weekly for tips, strategies, and
              resources to improve your Backend Engineering Skills.
            </p>
          </div>

          <div class="mx-auto w-full mb-10">
            <div class="py-2">
              <iframe
                src="https://embeds.beehiiv.com/a83d67f4-ee9c-44b5-aa62-eaa85847f2db?slim=true"
                data-test-id="beehiiv-embed"
                height="52"
                frameborder="0"
                scrolling="no"
                style="
                  margin: 0;
                  border-radius: 0px !important;
                  background-color: transparent;
                  width: 100%;
                  border-radius: 0px !important;
                  background-color: transparent;
                  border-radius: 0px !important;
                  background-color: transparent;
                  border-radius: 0px !important;
                  background-color: transparent;
                "
              ></iframe>
            </div>
            <p class="text-gray-500 font-thin">
              I will never spam or sell your info. Ever.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { getFeaturedProjects } = await useProjects("/projects");
const { getCourses } = await useCourses();
const projects = await getFeaturedProjects();
const courses = await getCourses();

const featuredCourses = computed(() => courses?.slice(0, 6));

function totalContent(course) {
  return course?.chapters?.reduce((a, c) => {
    return a + (c.videos?.length + c.articles?.length);
  }, 0);
}
</script>

<style>
</style>