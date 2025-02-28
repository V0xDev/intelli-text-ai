<script setup lang="ts"></script>

<template>
  <div class="container__button-actions">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.container__button-actions {
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  gap: $base-gap;
  padding: 10px;

  :deep(.ui-icon) {
    padding: 5px;
    cursor: pointer;
    opacity: 0.2;
    transition: 0.3s;
  }

  &:hover :deep(.ui-icon) {
    opacity: 0.7;

    &:hover {
      opacity: 1;
    }
  }
}
</style>
