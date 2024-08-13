<template>
  <div ref="wrapper" class="monaco-with-tree">
    <ClientOnly>
      <Splitpanes
        v-if="defaultSplitPercent"
        @resize="resize"
        :min-percent="minSplitPercent"
        horizontal
        :first-splitter="false"
        class="default-them"
        :push-other-panes="false"
        :default-percent="defaultSplitPercent"
      >
        <pane size="10" min-size="10" max-size="10">
          <div
            class="flex justify-between mb-2 items-enter text-gray-400 px-2 pt-2"
          >
            <div class="uppercase text-xs">
              <p>Explorer</p>
            </div>
            <div>
              <a
                class="action-label codicon codicon-toolbar-more"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                title="Views and More Actions..."
                aria-label="Views and More Actions..."
                tabindex="0"
              ></a>
            </div>
          </div>

          <div
            class="w-full text-gray-200 flex justify-between pb-2 items-center"
          >
            <div class="uppercase text-xs px-3">
              <p>Workspace</p>
            </div>

            <div class="px-3 hidden absolute right-0 group-hover:block">
              <div class="flex gap-2">
                <div>
                  <button
                    data-testid="explorr"
                    id="explorer-tab"
                    class="relative w-full disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <div class="codicon codicon-new-file"></div>
                  </button>
                </div>

                <div>
                  <button
                    data-testid="explorr"
                    id="explorer-tab"
                    class="relative w-full disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <div class="codicon codicon-new-folder"></div>
                  </button>
                </div>

                <div>
                  <button
                    data-testid="explorr"
                    id="explorer-tab"
                    class="relative w-full disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <div class="codicon codicon-refresh"></div>
                  </button>
                </div>

                <div>
                  <button
                    data-testid="explorr"
                    id="explorer-tab"
                    class="relative w-full disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <div class="codicon codicon-collapse-all"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </pane>
        <pane size="100" class="mb-5">
          <Tree @onTab="setTab" />
        </pane>
      </Splitpanes>
    </ClientOnly>
  </div>
  <!-- </div> -->
</template>

<script setup>
const emit = defineEmits(["onTab"]);
const isFullScreen = ref(false);
const tabHeight = ref(48);
const wrapper = ref(null);
const defaultSplitPercent = ref(0); // 默认菜单分隔宽度百分比
const minSplitPercent = ref(0); // 最小宽度百分比

onMounted(() => {
  const totalWith =
    parseInt(getComputedStyle(wrapper.value).width) ||
    document.documentElement.offsetWidth;
  defaultSplitPercent.value = (200 / totalWith) * 100;
  minSplitPercent.value = (100 / totalWith) * 100;
});

function resize() {}
function setTab(tab) {
  emit("onTab", tab);
}
</script>

<style >
.icon {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #979797;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
}

.icon.active {
  color: #fff;
  border-left: 3px solid #fff;
}

.monaco-with-tree .splitpanes__splitter {
  /* position: relative; */
}

.monaco-with-tree .splitpanes__splitter:before {
  content: "";
  /* position: absolute; */
  /* left: 0; */
  /* top: 0; */
  transition: opacity 0.4s;
  background-color: #000 !important;
  /* opacity: 0; */
  /* z-index: 1; */
}

.monaco-with-tree .splitpanes__splitter:hover:before {
  opacity: 0 !important;
}
.monaco-with-tree .splitpanes--vertical > .splitpanes__splitter:before {
  top: 0px;
  bottom: 0px;
  width: 0%;
}
.monaco-with-tree .splitpanes--horizontal > .splitpanes__splitter:before {
  top: 0px !important;
  bottom: 0px !important;
  width: 0% !important;
  /* color: #27272a; */
}
</style>