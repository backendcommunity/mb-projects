<template>
  <span>
    <Tree @onContent="setContent" @onTab="setTab" />
  </span>
</template>

<script setup>
const emit = defineEmits(["onContent", "onTab"]);

function setContent(content) {
  emit("onContent", content);
}

function setTab(tab) {
  emit("onTab", tab);
}
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