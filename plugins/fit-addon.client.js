import { FitAddon } from "@xterm/addon-fit";

export default defineNuxtPlugin((ctx) => {
  return {
    provide: {
      FitAddon: FitAddon,
    },
  };
});
