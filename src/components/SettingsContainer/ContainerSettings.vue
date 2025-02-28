<script setup lang="ts">
import ButtonSendMessage from "@/components/SettingsContainer/ButtonSendMessage.vue";
import ButtonSettings from "@/components/SettingsContainer/ButtonSettings.vue";
</script>

<template>
  <div class="container__settings">
    <ButtonSendMessage />
    <ButtonSettings />
  </div>
</template>

<style lang="scss" scoped>
$containerGap: 8px;

.container__settings {
  @extend %container-actions;
  display: flex;
  gap: $containerGap;
}
</style>
