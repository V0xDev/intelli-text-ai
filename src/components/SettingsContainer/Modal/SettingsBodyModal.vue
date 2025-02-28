<script setup lang="ts">
import { VButton } from "@/shared/components";

const { isVisibleButtonSave = true } = defineProps<{
  isVisibleButtonSave?: boolean;
}>();

type EmitsBodyModal = {
  (e: "saveSettings", event?: () => void): void;
};

const emits = defineEmits<EmitsBodyModal>();
</script>

<template>
  <div class="settings-model">
    <slot />
    <div v-if="isVisibleButtonSave" class="settings-item button-save">
      <VButton @click="emits('saveSettings')" variant="system" size="s"
        >Сохранить</VButton
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/components/SettingsModal.scss" as *;
</style>
