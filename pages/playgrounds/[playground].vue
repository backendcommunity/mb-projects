<template>
  <div class="bg-[#191919]" style="height: 90vh">
    <div class="h-full">
      <div class="border-b flex p-3 justify-between w-full border-gray-800">
        <div class="w-60">
          <img class="w-full h-full" src="~/assets/img/logo.svg" alt="" />
        </div>
        <div>
          <button
            @click.prevent="runCode"
            class="bg-blue-600 px-4 rounded py-2 text-white flex items-center gap-2"
            :disabled="processing"
            :class="{ '!bg-gray-300': processing }"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 16 16"
              class="shrink-0"
              height="20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"
              ></path>
            </svg>
            {{ processing ? "Compiling..." : "Run" }}
          </button>
        </div>
        <div class="flex items-center gap-2 text-gray-200">
          <p class="text-sm">My Playground</p>
          <button
            class="inline-flex min-w-max items-center gap-2 flex-shrink-0 dark:ring-offset-gray-900 border border-transparent font-semibold focus:outline-none disabled:shadow-none disabled:cursor-not-allowed disabled:opacity-50 focus:ring-primary-500 rounded-md px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-offset-2 shadow bg-gray-500 text-gray-900 dark:bg-gray-300 dark:text-gray-100 dark:border-gray-300/30 !bg-opacity-10 bg-clip-padding backdrop-blur-xl backdrop-filter hover:!bg-opacity-20"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 1024 1024"
              color="#eeeeee"
              class="h-4 w-4"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
              style="color: rgb(238, 238, 238)"
            >
              <path
                d="M512 244c176.18 0 319 142.82 319 319v233a32 32 0 0 1-32 32H225a32 32 0 0 1-32-32V563c0-176.18 142.82-319 319-319zM484 68h56a8 8 0 0 1 8 8v96a8 8 0 0 1-8 8h-56a8 8 0 0 1-8-8V76a8 8 0 0 1 8-8zM177.25 191.66a8 8 0 0 1 11.32 0l67.88 67.88a8 8 0 0 1 0 11.31l-39.6 39.6a8 8 0 0 1-11.31 0l-67.88-67.88a8 8 0 0 1 0-11.31l39.6-39.6zm669.6 0l39.6 39.6a8 8 0 0 1 0 11.3l-67.88 67.9a8 8 0 0 1-11.32 0l-39.6-39.6a8 8 0 0 1 0-11.32l67.89-67.88a8 8 0 0 1 11.31 0zM192 892h640a32 32 0 0 1 32 32v24a8 8 0 0 1-8 8H168a8 8 0 0 1-8-8v-24a32 32 0 0 1 32-32zm148-317v253h64V575h-64z"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <section class="h-full flex">
        <div
          ref="wrapper"
          class="h-full !bg-[#191919]"
          :class="{ 'full-screen': false }"
        >
          <Menu />
        </div>
        <ClientOnly>
          <Splitpanes
            :push-other-panes="false"
            style="height: 100%; background-color: #191919"
          >
            <pane class="border-b border-gray-800 min-h-full h-full" size="20">
              <FileExplorer @onTab="setTab" />
            </pane>

            <pane class="h-full">
              <splitpanes vertical style="height: 100%">
                <pane class="border border-gray-800" size="100">
                  <splitpanes horizontal style="height: 100%">
                    <pane v-if="showEditor" size="70">
                      <FileEditor :tab="tab" />
                    </pane>

                    <pane
                      v-if="showTerminal"
                      class="border-t border-gray-800"
                      size="30"
                    >
                      <Terminal />
                    </pane>
                  </splitpanes>
                </pane>
                <pane
                  v-if="showBrowser"
                  class="border-y border-gray-800"
                  size="35"
                >
                  <BrowserView />
                </pane>
              </splitpanes>
            </pane>
          </Splitpanes>
        </ClientOnly>
      </section>

      <div class="bg-[#191919]">
        <div class="flex w-full justify-end text-gray-400 px-4 gap- text-sm">
          <button
            @click="showTerminal = !showTerminal"
            :class="{ 'bg-[#27272a]': showTerminal }"
            class="border-x rounded px-2 h-full hover:bg-[#27272a] border-gray-800 py-1"
          >
            Terminal
          </button>
          <button
            @click="showEditor = !showEditor"
            class="border-x rounded px-2 h-full hover:bg-[#27272a] border-gray-800 py-1"
            :class="{ 'bg-[#27272a]': showEditor }"
          >
            Editor
          </button>
          <button
            @click="showBrowser = !showBrowser"
            :class="{ 'bg-[#27272a]': showBrowser }"
            class="border-x rounded px-2 h-full hover:bg-[#27272a] border-gray-800 py-1"
          >
            Browser
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const showBrowser = ref(false);
const showTerminal = ref(true);
const showEditor = ref(true);
const tab = ref("");
const processing = ref(false);
function setTab(newTab) {
  tab.value = newTab;
}
</script>

<style>
.splitpanes__splitter {
  position: relative;
}

.splitpanes__splitter:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  transition: opacity 0.4s;
  background-color: #027fd4;
  opacity: 0;
  z-index: 1;
}

.splitpanes__splitter:hover:before {
  opacity: 1;
}
.splitpanes--vertical > .splitpanes__splitter:before {
  left: -2px;
  right: -2px;
  height: 100%;
}
.splitpanes--horizontal > .splitpanes__splitter:before {
  top: -2px;
  bottom: -2px;
  width: 100%;

  /* color: #27272a; */
}
</style>