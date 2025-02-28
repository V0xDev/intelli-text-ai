<script setup lang="ts">
import { ButtonAction } from "@/components/ButtonsContainer/ContainerButtons.types";
import { VButton, VIcon } from "@/shared/components";
import { injectAreaStore } from "@/store/AreaStore.provide";
import { ButtonsActionsArr } from "./ContainerButtons.constants";

const { buttonActive } = injectAreaStore();

const setActiveButton = (button: ButtonAction) => {
  if (buttonActive.value === button) {
    buttonActive.value = null;
    return;
  }
  buttonActive.value = button;
};
</script>

<template>
  <div class="container__buttons">
    <VButton
      v-for="actionButton in ButtonsActionsArr"
      :is-selected="actionButton === buttonActive"
      @click="setActiveButton(actionButton)"
      size="s"
      variant="outline"
      :color="actionButton.color"
    >
      <template #before>
        <VIcon>
          <Component :is="actionButton.icon" />
        </VIcon>
      </template>
      <template #default>{{ actionButton.label }}</template>
    </VButton>
  </div>
</template>

<style lang="scss" scoped>
$containerGap: 8px;

.container__buttons {
  @extend %container-actions;

  position: relative;
  width: 100%;
  display: flex;
  gap: $containerGap;
  overflow-x: auto;
  box-sizing: border-box;
}
</style>
