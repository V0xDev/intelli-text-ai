<script setup lang="ts">
import { VModal } from "@/shared/components/Modal/VModal.types";
import { getModalById, useModals } from "@/utils/Modal";

const props = defineProps<VModal>();

const { state, setState, getIndexContent, getIndexOverlay } = getModalById(
  props.id
);

const { getContainerName } = useModals();
</script>

<template>
  <Teleport :to="getContainerName">
    <div
      class="ui-modal"
      :class="{ '--open': state, '--set-size': props.size }"
    >
      <div
        class="ui-modal__overlay"
        :class="{ '--active': state }"
        :style="{ zIndex: getIndexOverlay }"
        @click.stop="setState(false)"
      />

      <div
        class="ui-modal__content"
        :class="{ '--center': state }"
        :style="{ zIndex: getIndexContent }"
      >
        <div v-if="$slots['header']" class="ui-modal__header">
          <slot name="header" />
        </div>
        <div class="ui-modal__body">
          <slot />
        </div>
        <div v-if="$slots['footer']" class="ui-modal__footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
@use "@/assets/components/modal.scss" as *;

@mixin set-modal-style() {
  &__header,
  &__body,
  &__footer {
    padding: map.get($spacing, small_2x);
  }

  &__header {
    border-bottom: 1px solid map.get($neutral, 10);
  }

  &__body {
    overflow-y: auto;
    flex-grow: 1;
  }

  &__footer {
    border-top: 1px solid map.get($neutral, 10);
  }
}

.ui-modal {
  position: relative;
  @include set-modal-style;

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: $modalBackgroundColor;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;

    &.--active {
      opacity: 1;
      pointer-events: auto;
    }
  }

  &__content {
    background-color: map.get($neutral, 120);
    border-radius: $base-rounded;
    position: fixed;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;

    &.--center {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &.--open &__content {
    opacity: 1;
    visibility: visible;
  }

  &.--set-size &__content {
    width: v-bind(size);
  }
}
</style>
