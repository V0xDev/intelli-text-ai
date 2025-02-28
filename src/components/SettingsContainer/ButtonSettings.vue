<script setup lang="ts">
import {
  CloseIcon,
  GearIcon,
  VButton,
  VIcon,
  VLabel,
  VModal,
} from "@/shared/components";
import { NavBarButtons } from "./ButtonSettings.constants";
import {
  SETTINGS_MODAL_KEY,
  settingsModelController,
} from "@/composables/settingsModelController";
import { useModalsHooks } from "@/hooks/useModalsHooks";
import SystemSettings from "./Modal/SystemSettings.vue";

const { openModal, closeModal, bodyModel, setBodyModal, updateData } =
  settingsModelController();

const { onModalAfterUnmounted } = useModalsHooks(SETTINGS_MODAL_KEY);

onModalAfterUnmounted(() => {
  bodyModel.value = SystemSettings;
  updateData();
});
</script>

<template>
  <VButton @click="openModal" variant="solid" size="s" color="neutral">
    <template #before>
      <VIcon>
        <GearIcon />
      </VIcon>
    </template>
  </VButton>
  <VModal :id="SETTINGS_MODAL_KEY" size="700px">
    <div class="wrapper-model">
      <div class="wrapper-model__header">
        <VLabel size="m1" color="#fff">Настройки</VLabel>
        <VIcon color="#fff" @click="closeModal">
          <CloseIcon />
        </VIcon>
      </div>
      <div class="wrapper-model__navbar">
        <VButton
          v-for="navItem in NavBarButtons"
          @click="setBodyModal(navItem.component)"
          :is-selected="navItem.component === bodyModel"
          size="m"
          variant="system"
        >
          <template #before>
            <VIcon>
              <Component :is="navItem.icon" />
            </VIcon>
          </template>
          <template #default>
            <VLabel color="#fff" size="s2">{{ navItem.name }}</VLabel>
          </template>
        </VButton>
      </div>
      <div class="wrapper-model__body">
        <Component :is="bodyModel" />
      </div>
    </div>
  </VModal>
</template>

<style lang="scss" scoped>
.wrapper-model {
  height: 400px;
  display: grid;
  grid-template-areas: "h h" "n b";
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
  gap: $base-gap * 2.8;

  & span {
    user-select: none;
  }

  &__header {
    grid-area: h;
    padding-left: 1rem;
    padding-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid map.get($neutral, 100);

    :deep(.ui-icon) {
      cursor: pointer;
      padding: 0.4rem;
      padding-right: 0;
      padding-top: 0;
      transition: transform 0.2s ease;

      &:active {
        transform: translateY(2px);
      }
    }
  }

  &__navbar {
    grid-area: n;
    display: flex;
    flex-direction: column;
    gap: $base-gap;
  }

  &__body {
    grid-area: b;
  }
}
</style>
