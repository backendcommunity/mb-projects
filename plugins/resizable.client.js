import { Splitpanes, Pane } from "splitpanes";
import Vue3TabsChrome from "vue3-tabs-chrome";
import "splitpanes/dist/splitpanes.css";
import "vue3-tabs-chrome/dist/vue3-tabs-chrome.css";

export default defineNuxtPlugin((ctx) => {
  ctx.vueApp.component("Splitpanes", Splitpanes);
  ctx.vueApp.component("Pane", Pane);
  ctx.vueApp.component("vueTabsChrome", Vue3TabsChrome);
});
