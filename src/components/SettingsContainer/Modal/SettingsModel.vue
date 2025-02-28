<script setup lang="ts">
import { VInput, VLabel, VSelect } from "@/shared/components";
import { Models } from "@/shared/models.settings";
import { injectSettingsStore } from "@/store/Settings.provide";
import SettingsBodyModal from "./SettingsBodyModal.vue";
import { settingsModelController } from "@/composables/settingsModelController";

const { selectModel, apiModelKey } = injectSettingsStore();
const { saveModelSettings } = settingsModelController();
</script>

<template>
  <SettingsBodyModal @save-settings="saveModelSettings">
    <div class="settings-item">
      <VLabel color="#fff" size="s2">Выберите модель</VLabel>
      <VSelect v-model="selectModel.temp" :options="Models" variant="system" />
    </div>
    <div class="settings-item">
      <VLabel color="#fff" size="s2">API ключ</VLabel>
      <VInput v-model="apiModelKey.temp" />
    </div>
  </SettingsBodyModal>
</template>

<style lang="scss" scoped></style>
