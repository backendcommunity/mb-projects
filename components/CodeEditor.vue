<template>
  <section
    class="overflow-hidden w-full h-full dark:bg-[#191919]"
    v-if="showEditor"
    :class="{}"
  >
    <div class="flex justify-between fileTab">
      <div class="w-full">
        <vue-tabs-chrome
          ref="tabRef"
          theme="dark"
          v-model="currentTab"
          @click="handleTabClick"
          :tabs="tabs"
          :style="{ backgroundColor: `#${editorTheme}` }"
          class="theme-dark pl-2"
          insert-to-after
        >
        </vue-tabs-chrome>
      </div>
      <div
        :style="{ backgroundColor: `#${editorTheme}` }"
        class="px-2 w-ful text-gray-400 flex justify-end items-center"
      >
        <div class="border-wite flex cursor-pointer gap-3 items-center pr-2">
          <div
            class="action-label codicon codicon-split-horizontal"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
            title="Views and More Actions..."
            aria-label="Views and More Actions..."
            tabindex="0"
          ></div>

          <div
            class="action-label codicon codicon-toolbar-more"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
            title="Views and More Actions..."
            aria-label="Views and More Actions..."
            tabindex="0"
          ></div>
        </div>
      </div>
    </div>
    <div class="h-full w-full">
      <div class="overflow-hidden w-full h-full shadow-full">
        <div
          :style="{ backgroundColor: `#${editorTheme}` }"
          class="text-[#cccccc] text-sm px-5 py-4 flex gap-0.5 items-center"
        >
          <span>code</span>
          <span
            class="flex items-center"
            v-for="(menu, i) in splitMenu(currentTab)"
            :key="i"
          >
            <div class="codicon codicon-chevron-right"></div>
            <img
              width="16px"
              height="22px"
              :src="`/vscode-icons/${getFileIconLabel(
                menu?.title,
                menu?.isDirectory
              )}.svg`"
              alt=""
              class="pr-0.5"
            />
            {{ menu?.title }}</span
          >
        </div>

        <i
          @click="toggleFullScreen"
          :class="[
            'btn-fullscreen',
            'luyou-icon',
            isFullScreen ? 'icontuichuquanping' : 'iconquanping1',
            isFullScreen ? 'fullscreen' : '',
          ]"
        ></i>

        <Suspense>
          <ClientOnly>
            <div
              class="no-scrollbar"
              ref="monacoRef"
              :style="{
                height: `1000px`,
                width: '100%',
                visibility: currentTab ? 'visible' : 'hidden',
              }"
            />
          </ClientOnly>
        </Suspense>

        <div
          v-show="!currentTab"
          class="no-tab-pane"
          :style="{ height: `calc(100% - ${tabHeight}px)` }"
        >
          <div class="center-wrapper">Please open a file from the left</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onBeforeMount, watch } from "vue";
import { getFileIconLabel } from "~/helpers";

const monaco = useMonaco();
const tabHeight = ref(48);
let monacoEditor = null;
const loading = ref(false);
const showEditor = ref(true);
const tabRef = ref(null);
const monacoRef = ref(null);
const props = defineProps(["id", "lang", "tab"]);
const editorTheme = ref("");
const currentTab = ref("google");
const tabs = ref([]);

const isFullScreen = ref(false);
const options = ref({
  automaticLayout: true,
  lineNumbers: "on",
  roundedSelection: false,
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  readOnly: false,
});

watch(
  () => currentTab.value,
  async (value) => {
    if (!monacoEditor) {
      monacoEditor = monaco.editor.create(monacoRef.value, {
        ...options.value,
        fontSize: "13px",
        language: getLanguage.value,
      });

      monacoEditor?.setValue(getContent.value);
    }

    const model = monaco.editor.createModel(
      getContent.value,
      getLanguage.value
    );
    monacoEditor?.setModel(model);
  }
);

function toggleFullScreen() {
  isFullScreen.value = !isFullScreen.value;
}
onBeforeMount(() => {
  loading.value = true;
});

onUnmounted(() => {
  monacoEditor && monacoEditor.dispose();
  monacoEditor = null;
});

watch(
  () => props.tab,
  (tab) => {
    // Get File Content

    if (tabsMap.value[tab.currentTab]) {
      currentTab.value = tab.currentTab;
      if (tab.isDoubleClick && tabsMap.value[tab.currentTab].tempOpen) {
        tabsMap.value[tab.currentTab].tempOpen = false;
      }
    } else {
      if (tab.isDoubleClick) {
        currentTab.value = tab.currentTab;
        tabRef.value?.addTab({
          label: tab.label,
          key: tab.key,
          closable: tab.closable,
          favico: tab.favicon,
          class: tab.class,
        });
      }
    }
  }
);

const getLanguage = computed(() => {
  const modeMap = {
    js: "javascript",
    json: "json",
    html: "html",
    md: "markdown",
    rs: "rust",
  };

  const ext = currentTab.value?.slice(currentTab.value?.lastIndexOf(".") + 1);
  const lang = modeMap[ext?.toLowerCase()] || "markdown";

  return lang;
});

const getContent = computed(() => {
  return getFileContent(currentTab.value);
});

function handleTabClick(e) {}

const tabsMap = computed(() => {
  const map = {};
  tabs.value.forEach((item) => (map[item.key] = item));
  return map;
});

onMounted(() => {
  loading.value = false;

  import("monaco-themes/themes/krTheme.json").then((data) => {
    editorTheme.value = data?.rules[0]?.background;
    monaco.editor.defineTheme("Blackboard", data);
    monaco.editor.setTheme("Blackboard");
  });

  // import("monaco-themes/themes/vs-dark.json").then((data) => {
  //   monaco?.editor?.defineTheme("vs-dark", data);
  //   monaco?.editor?.setTheme("vs-dark");
  // });
});

function getFileContent(filePath) {
  return `
  // ${filePath}
// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler
    
console.log("Try masteringbackend.com");`;
}

function splitMenu(filePath) {
  const files = filePath?.split("/");
  return files?.map((f, i, filesArr) => {
    return {
      title: f,
      isDirectory: filesArr[filesArr.length - 1] !== filesArr[i],
    };
  });
}
</script>

<style>
/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none !important;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none !important;
  /* IE and Edge */
  scrollbar-width: none !important;
  /* Firefox */
}

.fileTab .active {
  @apply border-t border-[#027fd4];
}

.vue3-tabs-chrome {
  padding: 0px !important;
  margin: 0px !important;
}

.full-screen {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh !important;
  z-index: 100000;
}
</style>