<script setup lang="ts">
import { provideTextAreaContainer } from "@/components/ContentContainer/TextAreaContainer.provide";
import { onMounted, useTemplateRef } from "vue";
import PersonTextArea from "@/components/ContentContainer/PersonTextArea.vue";
import AiTextArea from "@/components/ContentContainer/AiTextArea.vue";
import ResizeSlider from "@/components/ContentContainer/ResizeSlider.vue";

const container = useTemplateRef<HTMLDivElement>("container-content");

const {
  container: containerInstance,
  onMouseMove,
  onMouseUp,
} = provideTextAreaContainer();

onMounted(() => (containerInstance.value = container.value));
</script>

<template>
  <div
    ref="container-content"
    class="container__content"
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"
    @mouseleave="onMouseUp"
  >
    <PersonTextArea />
    <ResizeSlider />
    <AiTextArea />
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/components/ResizeSlider.scss" as *;

$minWidthLeftTextArea: 100px;
$maxWidthLeftTextArea: calc(
  100% - 50px + $paddingContainerResize + $sizeSlider
);
$minWidthRightTextArea: 100px;

.container__content {
  display: flex;

  box-sizing: border-box;
  padding-top: 1rem;

  height: 600px;
  min-height: 400px;
}

.container__left-wrapper,
.container__right-wrapper {
  position: relative;
}

.container__left-wrapper {
  min-width: $minWidthLeftTextArea; /* Минимальная ширина через CSS */
  max-width: $maxWidthLeftTextArea; /* Максимальная ширина = контейнер - минимальная ширина правого + ползунок */
}

.container__right-wrapper {
  flex: 1; /* Занимает оставшееся пространство */
  min-width: $minWidthRightTextArea; /* Минимальная ширина через CSS */
}
</style>
