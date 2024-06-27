import NiceMonacoTree from "nice-monaco-tree";

export default defineNuxtPlugin((ctx) => {
  return {
    provide: {
      NiceMonacoTree: NiceMonacoTree,
    },
  };
});
