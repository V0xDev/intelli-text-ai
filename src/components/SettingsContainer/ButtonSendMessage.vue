<script setup lang="ts">
import { fetchAIResponse } from "@/composables/fetchAIResponse";
import { MagicIcon, VButton, VIcon } from "@/shared/components";
import { injectAreaStore } from "@/store/AreaStore.provide";
import { computed } from "vue";
import { ButtonStyle } from "./ButtonSendMessage.types";

const { buttonActive, personText, isLoading } = injectAreaStore();

const isActiveButton = computed(
  () =>
    !buttonActive.value ||
    buttonActive.value === null ||
    personText.value.trim().length === 0
);

const { sendMessage, abortRequest } = fetchAIResponse();

const sendClick = computed(() =>
  isLoading.value ? abortRequest : sendMessage
);

const getStyleButton = computed(() => {
  let style: Partial<ButtonStyle>;

  if (isLoading.value) {
    style = { label: "Отмена", variant: "solid", color: "red" };
  } else {
    style = { label: "Применить", variant: "magic", color: "neutral" };
  }

  return style;
});
</script>

<template>
  <VButton
    :is-disabled="isActiveButton"
    :variant="getStyleButton.variant"
    size="s"
    :color="getStyleButton.color"
    @click="sendClick"
  >
    <template #before>
      <VIcon>
        <MagicIcon />
      </VIcon>
    </template>
    <template #default>{{ getStyleButton.label }}</template>
  </VButton>
</template>

<style lang="scss" scoped></style>
