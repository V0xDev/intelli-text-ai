<script lang="ts" setup>
import { VButton } from "./VButton.types";

withDefaults(defineProps<VButton>(), {
  color: "neutral",
  size: "s",
  isRounded: true,
  variant: "solid",
});
</script>

<template>
  <button
    v-bind="$attrs"
    class="ui-button"
    :class="[
      '--' + color,
      '--' + size,
      '--' + variant,
      { '--rounded': isRounded },
      { '--selected': isSelected },
      { '--stretch': isStretch },
      { '--disabled': isDisabled },
    ]"
  >
    <div v-if="$slots.before" class="before">
      <slot name="before" />
    </div>
    <slot name="default" class="label" />
    <div v-if="$slots.after" class="after">
      <slot name="after" />
    </div>
  </button>
</template>

<style scoped lang="scss">
@mixin button-styles($backColor) {
  &.--system {
    display: flex;
    justify-content: start;
    background-color: transparent;
    color: map.get($neutral, 10);
    border-color: transparent;

    &.--selected {
      color: map.get($neutral, 10);
      background-color: map.get($backColor, 140);
      border-color: map.get($backColor, 120);
    }
  }

  &.--outline {
    color: map.get($backColor, 100);
    border-color: map.get($backColor, 80);
    background-color: transparent;

    &:not(.--selected):hover {
      color: map.get($backColor, 140);
      background-color: map.get($backColor, 10);
      border-color: map.get($backColor, 140);
    }

    &.--selected {
      color: map.get($backColor, 140);
      background-color: map.get($backColor, 60);
      border-color: map.get($backColor, 120);
    }
  }

  &.--solid {
    color: map.get($backColor, 120);
    background-color: map.get($backColor, 20);
    border-color: map.get($backColor, 40);

    &:not(.--selected):hover {
      color: map.get($backColor, 140);
      background-color: map.get($backColor, 40);
      border-color: map.get($backColor, 60);
    }

    &.--selected {
      color: map.get($backColor, 160);
      background-color: map.get($backColor, 80);
      border-color: map.get($backColor, 120);
    }
  }

  &.--magic {
    $violet: map.get($gradientLogo, start);
    $blue: map.get($gradientLogo, end);

    color: map.get($neutral, 10);
    background: linear-gradient(to left, $violet, $blue);
    border-color: map.get($neutral, 120);
    position: relative;
    overflow: hidden;
    box-shadow: 0 0 0 rgba(237, 0, 255, 0);
    transition: all 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

    :deep(.ui-icon) {
      color: map.get($yellow, 10);
      transform: rotate(0deg); // Начальное положение иконки
      transition: transform 0.3s ease, color 0.3s ease;
    }

    &::after {
      content: "";
      position: absolute;
      width: 200%;
      height: 200%;
      top: -50%;
      left: -50%;
      background: linear-gradient(
        45deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.3) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      transform: rotate(30deg);
      transition: left 0.6s ease;
    }

    &:hover {
      color: map.get($neutral, 0);
      background: linear-gradient(to right, $violet, $blue);
      border-color: map.get($neutral, 100);
      box-shadow: 0 0 15px transparentize($violet, 0.4);

      &::after {
        left: 150%;
      }

      :deep(.ui-icon) {
        transform: rotate(10deg);
      }
    }
  }
}

%disabled-styles {
  cursor: default;
  pointer-events: none;
  user-select: none;
}

.ui-button {
  white-space: nowrap;
  user-select: none;
  position: relative;
  backface-visibility: hidden;
  background-color: transparent;
  border: none;
  font-weight: 500;
  border: 2px solid;
  @include flex-with-gap(row, center, center, $base-gap);
  transition: box-shadow 0s, all 0.2s ease;

  &.--stretch {
    width: 100%;
  }

  &:hover {
    cursor: pointer;
  }

  &:active {
    transform: translateY(2px) translateZ(0);
  }

  &.--disabled,
  &:disabled {
    @extend %disabled-styles;
  }

  &.--rounded {
    border-radius: $base-rounded;
  }

  &.--violet {
    @include button-styles($violet);
  }

  &.--green {
    @include button-styles($green);
  }

  &.--red {
    @include button-styles($red);
  }

  &.--blue {
    @include button-styles($blue);
  }

  &.--yellow {
    @include button-styles($yellow);
  }

  &.--azure {
    @include button-styles($azure);
  }

  &.--orange {
    @include button-styles($orange);
  }

  &.--neutral {
    @include button-styles($neutral);
  }

  &.--s,
  &.--m,
  &.--l {
    padding: map.get($spacing, small_4x) map.get($spacing, small_3x);
  }

  &.--s {
    font-size: map.get($size, small);
  }

  &.--m {
    padding: calc(map.get($spacing, small_3x) / 1.2) map.get($spacing, small_3x);
    font-size: map.get($size, medium);
  }

  &.--l {
    font-size: map.get($size, large);
  }
}
</style>
