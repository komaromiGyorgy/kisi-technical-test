<template>
  <div class="loading-wrapper">
    <RadialProgress
      class="loading custom-font heading-small"
      :diameter="100"
      :completed-steps="progress"
      :total-steps="100"
      inner-stroke-color="#FFFFFF"
      start-color="#4a52ff"
      stop-color="#222647"
    >
      <span class="custom-font heading-small"> {{ progress }}% </span>
    </RadialProgress>
  </div>
</template>

<script setup lang="ts">
import RadialProgress from "vue3-radial-progress";

defineProps<{
  progress?: number;
}>();
</script>

<style scoped lang="scss">
.loading-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
}

.loading {
  color: white !important;
}
</style>
