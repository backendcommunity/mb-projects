<template>
  <div>
    <CodeEditor :content="content" :tab="tab" />
  </div>
</template>

<script setup>
const props = defineProps(["content", "tab"]);
</script>

<style>
</style>