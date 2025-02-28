<script setup lang="ts">
import { injectTextAreaContainer } from "@/components/ContentContainer/TextAreaContainer.provide";

const { onMouseDown } = injectTextAreaContainer();
</script>

<template>
  <div class="container__resize-slider" @mousedown="onMouseDown">
    <div class="slider"></div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/components/ResizeSlider.scss" as *;

.container__resize-slider {
  display: flex;
  justify-content: center;
  align-items: center;
  width: $paddingContainerResize;
  height: 100%;
  cursor: col-resize;

  .slider {
    width: $sizeSlider;
    height: 15%;
    border-radius: 4px;
    background-color: map.get($neutral, 100);
    transition: 0.15s ease;
  }

  &:hover .slider {
    background-color: map.get($neutral, 80);
  }
}
</style>
