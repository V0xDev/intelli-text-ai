<script setup lang="ts">
import { computed } from "vue";
import { VInput } from "./VInput.types";
import VLinearLoader from "../LinearLoader/VLinearLoader.vue";

const props = withDefaults(defineProps<VInput>(), {
  size: "s",
  color: "neutral",
  isStretch: true,
  isRounded: true,
  placeholder: "Введите значение",
});

const mergedProps = computed<VInput["inputParams"] | VInput>(() => ({
  type: "text",
  ...props.inputParams,
}));

const modelValue = defineModel<string | null>({
  required: true,
  default: null,
});
</script>

<template>
  <div
    class="ui-input"
    :class="[
      '--' + props.size,
      '--' + props.color,
      { '--stretch': isStretch },
      { '--rounded': isRounded },
    ]"
  >
    <div v-if="$slots.default" class="--label">
      <slot />
    </div>
    <div class="ui-input__wrapper">
      <div v-if="$slots.before" class="--before">
        <slot name="before" />
      </div>
      <input
        placeholder="Введите API ключ от модели... "
        v-bind="mergedProps"
        v-model="modelValue"
      />
      <div v-if="$slots.after" class="--after">
        <slot name="after" />
      </div>
      <VLinearLoader v-if="isLoading" position="bottom" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
$iconMargin: 5px;
$inputPadding: 33px;

@mixin input-styles($color) {
  input {
    border: 1px solid map.get($color, 80);

    &::placeholder {
      color: map.get($neutral, 80);
      opacity: 0.8;
    }

    &:focus {
      outline: 0;
      box-shadow: 0 0 0 0.2rem map.get($color, 20);
    }

    &:disabled,
    &[readonly] {
      background-color: map.get($color, 10);
      pointer-events: stroke;
    }
  }

  :deep(.ui-icon) {
    color: map.get($color, 100);
  }

  :deep(.ui-linear-spinner) {
    &::after {
      @if $color == $neutral {
        background-color: map.get($neutral, 100);
      } @else {
        background-color: map.get($color, 80);
      }
    }
  }
}

.ui-input {
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  &.--rounded input {
    border-radius: $base-rounded;
  }

  &.--stretch input,
  &.--stretch &__wrapper {
    width: 100%;
  }

  input {
    line-height: inherit;
    margin: 0;
    border: none;
    color: map.get($neutral, 140);
    line-height: 1.5;
    padding: map.get($spacing, small_3x) map.get($spacing, small_3x);
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  .--label {
    display: block;
    margin-bottom: map.get($spacing, small_4x);
  }

  &__wrapper {
    width: fit-content;
    position: relative;
    @include flex-with-gap(row, left, center, $base-size * 2);

    &:has(.ui-icon) {
      gap: normal;
    }

    :deep(.--after),
    :deep(.--before) {
      .ui-icon {
        top: 0;
        height: 100%;
        position: absolute;
        user-select: none;
      }
    }

    &:has(.--after .ui-icon) input {
      padding-right: $inputPadding;
    }

    &:has(.--before .ui-icon) input {
      padding-left: $inputPadding;
    }

    :deep(.--after) {
      .ui-icon {
        right: 0;
        margin-right: $iconMargin;
      }
    }

    :deep(.--before) {
      .ui-icon {
        margin-left: $iconMargin;
      }
    }
  }

  &.--rounded {
    border-radius: $base-rounded;
  }

  &.--violet {
    @include input-styles($violet);
  }

  &.--green {
    @include input-styles($green);
  }

  &.--red {
    @include input-styles($red);
  }

  &.--blue {
    @include input-styles($blue);
  }

  &.--yellow {
    @include input-styles($yellow);
  }

  &.--azure {
    @include input-styles($azure);
  }

  &.--orange {
    @include input-styles($orange);
  }

  &.--neutral {
    @include input-styles($neutral);
  }

  &.--s input {
    font-size: map.get($size, small);
  }

  &.--m input {
    font-size: map.get($size, medium);
  }

  &.--l input {
    font-size: map.get($size, large);
  }
}
</style>
