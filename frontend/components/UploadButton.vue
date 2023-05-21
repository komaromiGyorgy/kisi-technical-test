<template>
  <label for="upload">
    <button
      v-bind="$attrs"
      class="upload-btn custom-font heading-small"
      :disabled="disabled"
      @click="open"
    >
      <slot></slot>
    </button>
    <transition name="fade">
      <p v-if="error" class="custom-font heading-small erorr-message">
        {{ error }}
      </p>
    </transition>
  </label>
</template>

<script setup lang="ts">
import { useFileDialog } from "@vueuse/core";

interface ButtonProps {
  disabled?: boolean;
  error?: string;
}
const emit = defineEmits<{
  (event: "file", file: File): void;
}>();
defineProps<ButtonProps>();

const { open, onChange } = useFileDialog({
  multiple: false,
  accept: "image/*",
});

onChange((files) => {
  if (files?.length) emit("file", files[0]);
});
</script>

<style scoped lang="scss">
.upload-btn {
  cursor: pointer;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  -webkit-font-smoothing: antialiased;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  text-align: center;
  vertical-align: middle;
  border-radius: 9999px;
  background: var(--connect-blue);
  color: var(--pure-white);
  border: 1px solid transparent;
  border-color: var(--connect-blue);
  outline-width: 2px;
  outline-style: solid;
  outline-color: transparent !important;
  outline-offset: 1px;
  transition: all 0.1s ease-out;
  transition-property: background, color, border-color, outline-color;
  padding: 4px 20px;
  &:hover {
    background: #7c83ff;
    border-color: #7c83ff;
  }
  &:active {
    outline: 0;
  }
  &:disabled,
  [disabled] {
    background: #e1e2fc;
    border-color: #c0c3fd;
    cursor: no-drop;
  }
}

.erorr-message {
  margin-top: 5px;
  color: red !important;
}
</style>
