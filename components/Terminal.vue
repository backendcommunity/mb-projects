<template>
  <div class="bg-[#191919] terminal__container">
    <div class="bg-[#191919] flex justify-between items-center">
      <div
        class="terminalMenu flex w-full justify-start text-gray-400 px-4 gap- text-xs"
      >
        <button class="px-3 pt-3 uppercase h-full hover:text-gray-300 pb-1">
          <span class="pb-1"> Problems</span>
        </button>
        <button class="px-3 pt-3 uppercase h-full hover:text-gray-300 pb-1">
          <span class="pb-1"> Output </span>
        </button>
        <button class="px-3 pt-3 uppercase h-full hover:text-gray-300">
          <span class="pb-1 active"> Terminal </span>
        </button>
      </div>

      <div class="text-gray-400 px-4 w-full flex justify-end">
        <button
          class="px-1 w-ful items-center gap-1 flex flex-row text-sx pt-2 h-full hover:text-gray-300 pb-1"
        >
          <div class="codicon codicon-terminal-bash"></div>
          <div><p>bash - code</p></div>
        </button>
        <button class="px-1 pt-3 uppercase h-full hover:text-gray-300 pb-1">
          <div class="codicon codicon-add"></div>
        </button>
        <button class="px-1 pt-3 uppercase h-full hover:text-gray-300 pb-1">
          <div class="codicon codicon-chevron-down"></div>
        </button>

        <button class="px-1 pt-3 uppercase h-full hover:text-gray-300 pb-1">
          <div class="codicon codicon-split-horizontal"></div>
        </button>

        <button class="px-1 pt-3 uppercase h-full hover:text-gray-300 pb-1">
          <div class="codicon codicon-trash"></div>
        </button>

        <button class="px-1 pt-3 uppercase h-full hover:text-gray-300 pb-1">
          <div class="codicon codicon-toolbar-more"></div>
        </button>

        <button class="px-1 pt-3 uppercase h-full hover:text-gray-300 pb-1">
          <div class="codicon codicon-close"></div>
        </button>
      </div>
    </div>
    <div class="terminal__wrapper" ref="terminalRef">
      <div
        class="w-full terminal"
        id="terminal-container"
        ref="terminalEl"
      ></div>
      <!-- <div>side</div> -->
    </div>
  </div>
</template>

<script setup>
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import debounce from "../helpers/debounce";
import { ITerminalColor } from "../helpers/types";
import "xterm/css/xterm.css";

let fitAddon;
const terminal = ref(null);
const command = ref("");
const terminalRef = ref();
const terminalEl = ref();
const validCommmands = ["ls", "cat", "whoami", "clear", "ping"];

const promptValue = `${
  ITerminalColor.Cyan + "Solomon" + ITerminalColor.Purple
}@masteringbackend${ITerminalColor.Reset} $ `;

function prompt() {
  terminal.value.write(promptValue);
}

function init() {
  terminal.value = new Terminal({
    // fontFamily: "Consolas",
    fontWeight: "100",
    fontSize: 14,
    cursorBlink: true,
    cursorStyle: "bar",
    theme: { background: "#191919" },
  });

  fitAddon = new FitAddon();
  terminal.value.loadAddon(fitAddon);

  terminal.value.open(document.getElementById("terminal-container"));
  fitAddon.fit();

  terminal.value.writeln(
    "Welcome to " +
      ITerminalColor.Green +
      "Masteringbackend playground" +
      ITerminalColor.Reset +
      ". This is " +
      ITerminalColor.Red +
      "experimental" +
      ITerminalColor.Reset +
      "."
  );
  terminal.value.writeln(
    "Type commands ping, ls, cat, clear, etc. to play around.\n"
  );

  prompt();

  terminal.value.onKey((e) => {
    switch (e.domEvent.key) {
      case "Enter":
        terminal.value.writeln("");
        if (!command.value) return prompt();
        if (command.value === "clear") {
          command.value = "";
          terminal.value.clear();
          prompt();
          return;
        }
        // io?.emit("command", command.value);
        command.value = "";
        break;

      case "Backspace":
        if (command.value) {
          terminal.value.write("\b \b");
          command.value = command.value.slice(0, -1);
        }
        break;

      default:
        command.value += e.key;
        if (validCommmands.includes(command.value)) {
          terminal.value.write("\b \b".repeat(command.value.length - 1));
        } else {
          terminal.value.write(e.key);
        }
    }
  });
}

onMounted(() => {
  init();
});

onMounted(() => {
  const observeEl = terminalRef.value;
  const resizeObserver = new ResizeObserver(
    debounce(
      () => {
        if (terminalRef.value) fitAddon.fit();
      },
      500,
      null
    )
  );

  resizeObserver.observe(observeEl);

  return () => {
    resizeObserver.unobserve(observeEl);
  };
});
</script>

<style>
.terminal__wrapper {
  width: 100%;
  height: 100%;
  padding: 20px;
  padding-right: 0;
  background: #191919;
}

.terminal {
  width: 100%;
  height: 100%;
}

.terminal__container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 30px;
  background: #191919;
  overflow: hidden;
}

.terminalMenu .active {
  @apply border-b border-[#027fd4] text-gray-300;
}
</style>