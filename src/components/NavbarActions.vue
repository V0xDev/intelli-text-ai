<script setup lang="ts">
import ContainerButtons from "./ButtonsContainer/ContainerButtons.vue";
import ContainerSettings from "./SettingsContainer/ContainerSettings.vue";
</script>

<template>
  <div class="container__actions">
    <ContainerButtons />
    <ContainerSettings />
  </div>
</template>

<style lang="scss" scoped>
$containerBorderRadius: 12px;
$containerGap: 8px;

.container__actions {
  display: flex;
  gap: $containerGap;
  background-color: map.get($base, contrast);
  padding: $base-padding;
  border-radius: $containerBorderRadius;
  border: 3px solid map.get($neutral, 60);
}
</style>
