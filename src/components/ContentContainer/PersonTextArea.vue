<script setup lang="ts">
import { CloseIcon, CopyIcon, VIcon, VTextarea } from "@/shared/components";
import { Color } from "@/shared/constants";
import { computed, onMounted, useTemplateRef } from "vue";
import { injectAreaStore } from "@/store/AreaStore.provide";
import { injectTextAreaContainer } from "@/components/ContentContainer/TextAreaContainer.provide";
import WrapperButtonActions from "@/components/ContentContainer/WrapperButtonActions.vue";

const { personText } = injectAreaStore();

const leftWrapper = useTemplateRef<HTMLDivElement>("left-wrapper");

const { leftWidth, leftWrapper: leftWrapperInstance } =
  injectTextAreaContainer();

const setWidthLeftTextArea = computed(() =>
  leftWidth.value ? leftWidth.value + "px" : "50%"
);

onMounted(() => (leftWrapperInstance.value = leftWrapper.value));

const copyText = () =>
  navigator.clipboard.writeText(personText.value).then(
    () => {
      console.log("Текст успешно скопирован в буфер обмена");
    },
    (err) => {
      console.warn("Произошла ошибка при копировании текста: ", err);
    }
  );

const clearText = () => (personText.value = "");
</script>

<template>
  <div
    ref="left-wrapper"
    class="container__left-wrapper"
    :style="{ width: setWidthLeftTextArea }"
  >
    <VTextarea
      v-model="personText"
      color="azure"
      size="m"
      resize="resize-none"
      is-stretch
      is-rounded
    />
    <WrapperButtonActions>
      <VIcon @click="copyText" :color="Color.neutral">
        <CopyIcon />
      </VIcon>
      <VIcon @click="clearText" :color="Color.neutral">
        <CloseIcon />
      </VIcon>
    </WrapperButtonActions>
  </div>
</template>

<style lang="scss" scoped></style>
