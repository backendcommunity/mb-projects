<template>
  <main>
    <div class="h-full">
      <header
        class="fixed flex justify-center w-full top-0 left-0 mb-[80px] z-50 border-solid border-[#1e293b] border-b"
      >
        <nav
          class="flex w-full items-center justify-between bg-[#0f172a] text-white p-3"
        >
          <nuxt-link to="/" class="w-16 text-2xl font-bold">
            <span class="text-secondary"> <span class="text-3xl"></span>MB</span
            >Projects
          </nuxt-link>

          <div
            class="flex-1 bg-[#0f172a] flex justify-center mx-5 bg-[#1e293b] rounded-md"
          ></div>
          <div class="justify-between my-3 gap-10 items-center hidden lg:flex">
            <div>
              <a
                target="_blank"
                href="https://masteringbackend.com/posts"
                class="flex gap-2'"
              >
                <span>Blog</span>
              </a>
            </div>

            <div>
              <a
                target="_blank"
                href="https://masteringbackend.com/hubs"
                class="flex gap-2'"
              >
                <span>Hubs</span>
              </a>
            </div>

            <div>
              <a
                target="_blank"
                href="https://masteringbackend.com/books"
                class="flex gap-2'"
              >
                <span>Books</span>
              </a>
            </div>

            <div>
              <a
                href="https://backendweekly.dev"
                target="_blank"
                class="flex gap-2'"
              >
                <span>Newsletter</span>
              </a>
            </div>

            <div>
              <a
                href="https://masteringbackend.com/courses"
                class="flex gap-2'"
              >
                <span>Courses</span>
              </a>
            </div>

            <div>
              <a
                target="_blank"
                href="https://masteringbackend.com/community"
                class="flex gap-2'"
              >
                <span>Community</span>
              </a>
            </div>

            <span class="flex gap-10 items-center">
              <div>
                <a
                  target="_blank"
                  href="https://app.masteringbackend.com/"
                  class="bg-secondary px-4 py-3 font-bold rounded-md text-[#fff]"
                >
                  Learn Backend
                </a>
              </div>
            </span>
          </div>

          <div class="lg:hidden block" @click="openSidebar()">
            <svg
              focusable="false"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 5H20.359M3 18.186H20.359M3 11.592H20.359"
                stroke="currentcolor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>
        </nav>
      </header>
    </div>

    <slot />

    <footer>
      <div class="pb-3 pt-2">
        <a
          href="https://nuxifysaas.com?ref=MBProjects&utm_source=MBProjects"
          class="flex gap-2 items-center justify-center py-1 px-5"
        >
          <p>Built with</p>
          <img
            class="w-32 h-6"
            src="https://nuxifysaas.com/images/logo.png"
            alt=""
          />
        </a>
      </div>
    </footer>
  </main>
</template>

<script>
export default {};
</script>

<style>
.layer h3 {
  bottom: 0;
  left: 14%;
  position: absolute;
  transition: 0.5s;
}
.layer:hover h3 {
  bottom: 10%;
  opacity: 1;
  color: white;
}

article p {
  padding: 0.6rem 0rem;
  font-size: 1.5rem; /* 24px */
  line-height: 2rem; /* 32px */
}

.message p {
  padding: 1rem 0rem;
}
</style>