<script setup lang="ts">
import ContentWrapper from "@/components/ContentWrapper.vue";
import { provideAreaStore } from "@/store/AreaStore.provide";
import { provideSettingsStore } from "./store/Settings.provide";
import { createModal } from "@/utils/Modal";
import { SETTINGS_MODAL_KEY } from "@/composables/settingsModelController";

provideSettingsStore();
provideAreaStore();

createModal(SETTINGS_MODAL_KEY);
</script>

<template>
  <ContentWrapper />
</template>

<style lang="scss" scoped></style>
