<script setup lang="ts">
import { VButton, VLabel, VTextarea } from "@/shared/components";
import { injectSettingsStore } from "@/store/Settings.provide";
import SettingsBodyModal from "./SettingsBodyModal.vue";
import { settingsModelController } from "@/composables/settingsModelController";

const { systemPrompt } = injectSettingsStore();
const { saveSystemSettings } = settingsModelController();
</script>

<template>
  <SettingsBodyModal @save-settings="saveSystemSettings">
    <div class="settings-item">
      <VLabel color="#fff" size="s2">Системный промпт</VLabel>
      <div class="wrapper-textarea">
        <VTextarea
          v-model="systemPrompt.temp"
          placeholder="Напиши свои подсказки для AI"
          is-stretch
          resize="resize-none"
          is-rounded
        />
      </div>
    </div>
  </SettingsBodyModal>
</template>

<style lang="scss" scoped>
.wrapper-textarea {
  width: 100%;
  height: 200px;
}
</style>
