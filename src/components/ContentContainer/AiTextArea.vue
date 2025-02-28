<script setup lang="ts">
import WrapperButtonActions from "@/components/ContentContainer/WrapperButtonActions.vue";
import { CopyIcon, VIcon, VTextarea } from "@/shared/components";
import { Color } from "@/shared/constants";
import { injectAreaStore } from "@/store/AreaStore.provide";

const { aiText, isLoading } = injectAreaStore();

const copyText = () =>
  navigator.clipboard.writeText(aiText.value).then(
    () => {
      console.log("Текст успешно скопирован в буфер обмена");
    },
    (err) => {
      console.warn("Произошла ошибка при копировании текста: ", err);
    }
  );
</script>

<template>
  <div class="container__right-wrapper">
    <VTextarea
      v-model="aiText"
      placeholder="Тут будет сгенерированный текст..."
      :is-loading="isLoading"
      color="neutral"
      readonly
      size="m"
      resize="resize-none"
      is-stretch
      is-rounded
    />
    <WrapperButtonActions v-if="!isLoading">
      <VIcon @click="copyText" :color="Color.neutral">
        <CopyIcon />
      </VIcon>
    </WrapperButtonActions>
  </div>
</template>

<style lang="scss" scoped></style>
