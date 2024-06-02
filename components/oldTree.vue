<template>
  <div class="h-full group flex">
    <!-- Menu Bar -->
    <div class="w-12 border-r border-gray-800 h-full">
      <div>
        <div>
          <button
            data-testid="explorr"
            id="explorer-tab"
            class="icon relative w-full text-white disabled:cursor-not-allowed disabled:opacity-50 active"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.5 0h-9L7 1.5V6H2.5L1 7.5v15.07L2.5 24h12.07L16 22.57V18h4.7l1.3-1.43V4.5L17.5 0zm0 2.12l2.38 2.38H17.5V2.12zm-3 20.38h-12v-15H7v9.07L8.5 18h6v4.5zm6-6h-12v-15H16V6h4.5v10.5z"
              ></path>
            </svg>
          </button>
        </div>
        <div>
          <button
            data-testid="search"
            id="search-tab"
            class="icon relative w-full disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.25 0a8.25 8.25 0 0 0-6.18 13.72L1 22.88l1.12 1 8.05-9.12A8.251 8.251 0 1 0 15.25.01V0zm0 15a6.75 6.75 0 1 1 0-13.5 6.75 6.75 0 0 1 0 13.5z"
              ></path>
            </svg>
          </button>
        </div>
        <div>
          <button
            data-testid="settings"
            id="settings-tab"
            class="icon relative w-full disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 16 16"
              height="24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.1 4.4L8.6 2H7.4l-.5 2.4-.7.3-2-1.3-.9.8 1.3 2-.2.7-2.4.5v1.2l2.4.5.3.8-1.3 2 .8.8 2-1.3.8.3.4 2.3h1.2l.5-2.4.8-.3 2 1.3.8-.8-1.3-2 .3-.8 2.3-.4V7.4l-2.4-.5-.3-.8 1.3-2-.8-.8-2 1.3-.7-.2zM9.4 1l.5 2.4L12 2.1l2 2-1.4 2.1 2.4.4v2.8l-2.4.5L14 12l-2 2-2.1-1.4-.5 2.4H6.6l-.5-2.4L4 13.9l-2-2 1.4-2.1L1 9.4V6.6l2.4-.5L2.1 4l2-2 2.1 1.4.4-2.4h2.8zm.6 7c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zM8 9c.6 0 1-.4 1-1s-.4-1-1-1-1 .4-1 1 .4 1 1 1z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="flex flex-col w-full">
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
        class="w-full text-gray-200 flex relative justify-between pb-2 items-center"
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

      <div class="w-full text-[#cccccc] flex justify-between pb-2 items-enter">
        <!-- File/Folder structure -->
        <div class="text-sm w-full px-4">
          <!-- Folder -->
          <div class="flex gap-1 hover:bg-gray-700 w-full items-center">
            <div class="codicon codicon-chevron-down"></div>
            <p>FinPay</p>
          </div>

          <!-- Files -->
          <div class="px-1 w-full border-l border-gray-700">
            <div
              class="px-3 py-0.5 hover:bg-gray-700 w-full flex gap-1.5 items-center"
            >
              <img
                width="16px"
                height="22px"
                src="https://codedamn.com/assets/vscode/extension-assets/material-icons/icons/javascript.svg"
                alt=""
              />
              <span>main.js</span>
            </div>

            <div
              class="px-3 py-0.5 hover:bg-gray-700 w-full flex gap-1.5 items-center"
            >
              <img
                width="16px"
                height="22px"
                src="https://codedamn.com/assets/vscode/extension-assets/material-icons/icons/javascript.svg"
                alt=""
              />
              <span>main.js</span>
            </div>
          </div>

          <div class="text-sm w-full px-4">
            <!-- Folder -->
            <div class="flex gap-1 hover:bg-gray-700 w-full items-center">
              <div class="codicon codicon-chevron-down"></div>
              <p>FinPay</p>
            </div>

            <!-- Files -->
            <div class="px-1 w-full border-l border-gray-700">
              <div
                class="px-3 py-0.5 hover:bg-gray-700 w-full flex gap-1.5 items-center"
              >
                <img
                  width="16px"
                  height="22px"
                  src="https://codedamn.com/assets/vscode/extension-assets/material-icons/icons/javascript.svg"
                  alt=""
                />
                <span>main.js</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
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
</style>