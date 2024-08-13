<template>
  <div ref="menu" class="h-full monaco-menu-pane !bg-[#191919]" />
</template>


<script setup>
const { $NiceMonacoTree } = useNuxtApp(); // Fork this and add all icons under getFileIconLabel => file-utils.js

let monacoTree = null;

const emit = defineEmits(["onTab"]);

const props = defineProps({
  files: {
    type: Array,
    default: () => [
      "package.json",
      "README.md",
      "index.js",
      "src/test.js",
      "src/index.js",
      "public/index.html",
      "tests/tt.rs",
    ],
  },

  defaultOpenFiles: {
    type: Array,
    default: () => ["README.md"],
  },
  readonly: {
    type: Boolean,
    default: true,
  },
  getFileContent: {
    type: Function,
    default: (filePath) => {
      return [`${filePath}-left`, `${filePath}-right`];
    },
  },
  getFileTitle: {
    type: Function,
    default: (filePath) => filePath.split("/").pop(),
  },
  monacoConfig: {
    type: Object,
    default: () => ({}),
  },
});

const currentTab = ref("");
const menu = ref(null);

watch(
  () => currentTab.value,
  (val) => {
    if (val) {
      openFile(val);
      monacoTree.setSelection(val);
    }
  }
);
onMounted(() => {
  initMonacoTree();
});

function initMonacoTree() {
  monacoTree = $NiceMonacoTree.init(menu.value, {
    files: props.files,
    onClick: (filePath, file, fileIcon) => {
      openFile(filePath, file, fileIcon, true);
    },
    onDoubleClick: (filePath, file, fileIcon) => {
      openFile(filePath, file, fileIcon, true);
    },
  });
  // monacoTree.expandAll();
  setTimeout(() => {
    if (props.defaultOpenFiles && props.defaultOpenFiles[0]) {
      monacoTree.setSelection(props.defaultOpenFiles[0]);
    }
  });
}

function openFile(filePath, file, fileIcon, isDoubleClick = true) {
  emit("onTab", {
    label: props.getFileTitle(filePath),
    key: filePath,
    closable: true,
    favicon: `/vscode-icons/${fileIcon}.svg`,
    class: `monaco-icon-label ${fileIcon}`,
    currentTab: filePath,
    isDoubleClick: isDoubleClick,
  });
}
</script>

<style lang="scss">
.monaco-with-tree {
  height: 100%;
  background: #191919;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  &.full-screen {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh !important;
    z-index: 100000;
  }
  .monaco-menu-pane {
    height: 100%;
  }
  .monaco-right-pane {
    height: 100%;
    position: relative;
    .vue-tabs-chrome {
      *,
      *::before,
      *::after {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }
      font-size: 14px;
      .tabs-item.monaco-icon-label::before {
        box-sizing: content-box;
        position: absolute;
        left: 22px;
        top: 5px;
        z-index: 1;
      }
    }
    .no-tab-pane {
      background-color: #1e1e1e;
      text-align: center;
      position: absolute;
      left: 0;
      top: 48px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .btn-fullscreen {
    position: absolute;
    top: 10px;
    right: 8px;
    z-index: 2000;
    color: white;
    width: 24px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    cursor: pointer;
    opacity: 0.8;
    &.fullscreen {
      position: fixed;
    }
    &:hover {
      opacity: 1;
    }
  }
}
</style>



