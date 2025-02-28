<script setup lang="ts" generic="T">
import { computed, useTemplateRef } from "vue";
import { SelectOption, VSelectBase } from "./VSelect.types";
import VIcon from "../Icon/VIcon.vue";
import CloseIcon from "../Icons/CloseIcon.vue";
import { onClickOutside } from "@vueuse/core";
import ArrowDown from "../Icons/ArrowDown.vue";
import { VLinearLoader } from "@/shared/components";

const props = withDefaults(defineProps<VSelectBase<T>>(), {
  variant: "basic",
  color: "neutral",
  size: "s",
  placeholder: "Выберите значение",
  isRounded: true,
  isStretch: true,
});

const target = useTemplateRef<HTMLElement>("selectRef");

const modelValue = defineModel<SelectOption<T>>({ required: true });
const isOpen = defineModel("is-open", { default: false });

const selectOption = (value: SelectOption<T>) => {
  modelValue.value = value;
  isOpen.value = false;
};

const clearSelection = () => {
  modelValue.value = null;
  isOpen.value = false;
};

const onDisplayClick = () => {
  isOpen.value = !isOpen.value;
};

const isValidOptions = computed(
  () => !props.options || props.options.length === 0
);

const isButtonClose = computed(() => props.isButtonClear && modelValue.value);

onClickOutside(target, (_event) => (isOpen.value = false));
</script>

<template>
  <div
    ref="selectRef"
    class="ui-select"
    :class="[
      '--' + color,
      '--' + size,
      '--' + variant,
      { '--rounded': isRounded },
      { '--stretch': isStretch },
      { '--loading': isLoading },
      { '--disabled': isDisabled },
      { '--open': isOpen },
    ]"
    @click="onDisplayClick"
    @keydown.esc="isOpen = false"
  >
    <div v-if="$slots.before" class="--before">
      <slot name="before" />
    </div>
    <label v-if="label" class="--label --title">{{ label }}</label>
    <div class="ui-select__wrapper">
      <div class="selected-value">
        <span v-if="modelValue" class="--label">
          {{ modelValue.display }}
        </span>
        <span v-else class="--placeholder --label">
          {{ placeholder }}
        </span>
      </div>

      <div class="icons-wrapper">
        <div v-if="$slots.icon" class="--icon">
          <slot name="icon" />
        </div>

        <VIcon
          v-if="isButtonClose"
          class="button-clear"
          @click.stop="clearSelection"
        >
          <CloseIcon />
        </VIcon>

        <VIcon class="button-arrow">
          <ArrowDown />
        </VIcon>
      </div>

      <VLinearLoader v-if="isLoading" position="bottom" />

      <Transition name="slide-fade">
        <ul v-show="isOpen" class="options-list">
          <li v-if="isValidOptions" class="option-item --no-content">
            <slot name="no-content"> Данных пока нет... </slot>
          </li>
          <li
            v-else
            v-for="{ key, display, raw } in options"
            :key="key"
            class="option-item"
            :class="{ '--selected': modelValue?.key === key }"
            @click.stop="selectOption({ key, display, raw })"
          >
            <slot :key="key" :display="display" :raw="raw">
              {{ display }}
            </slot>
          </li>
        </ul>
      </Transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@mixin select-style($color, $intensive: 80) {
  .selected-value {
    border: 1px solid map.get($color, $intensive);
  }

  .icons-wrapper {
    .button-clear {
      color: map.get($color, $intensive);
    }

    .button-arrow {
      color: map.get($color, 140);
    }
  }

  .options-list {
    border: 1px solid map.get($color, $intensive);

    .option-item {
      &:hover {
        background-color: map.get($color, 20);
      }

      &.--selected {
        background-color: map.get($color, 40);
      }
    }
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

  &.--open {
    .selected-value {
      box-shadow: 0 0 0 0.2rem map.get($color, 20);
    }
  }

  &.--system {
    .selected-value {
      background-color: map.get($neutral, 10);
      box-shadow: none;
    }

    .options-list {
      background-color: map.get($neutral, 05);
    }

    .option-item {
      &:hover {
        background-color: map.get($color, 20);
      }

      &.--selected {
        background-color: map.get($color, 40);
      }
    }
  }
}

@mixin setSize($fontSize, $paddingY, $paddingX) {
  $paddingIcon: 54px;
  $multiplierSpacingSize: 2.5;
  $spacingX: calc(map.get($spacing, $paddingX) / $multiplierSpacingSize);
  $spacingY: map.get($spacing, $paddingY);

  .--label {
    font-size: map.get($size, $fontSize);
  }

  .--title {
    margin-bottom: map.get($spacing, small_4x);
  }

  .selected-value {
    padding: $spacingY calc($spacingX + $paddingIcon) $spacingY $spacingX;
  }

  .icons-wrapper {
    right: $spacingX;
  }

  .option-item {
    padding: $spacingY $spacingX;
    font-size: map.get($size, $fontSize);
  }
}

.ui-select {
  position: relative;
  box-sizing: border-box;
  width: fit-content;
  user-select: none;

  .--label {
    display: block;
  }

  &__wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  &.--loading,
  &.--disabled {
    pointer-events: none;
    opacity: 0.7;
  }

  .icons-wrapper {
    position: absolute;
    display: flex;
    gap: 4px;
    align-items: center;
  }

  .button-arrow {
    transition: transform 0.2s ease;
  }

  .selected-value {
    @extend %ellipsis;

    width: 100%;
    cursor: pointer;
    text-align: left;

    .--placeholder {
      opacity: 0.7;
    }
  }

  .options-list {
    position: absolute;
    width: 100%;
    top: calc(100% + 10px);
    z-index: 10;
    margin: 0;
    padding: 0;
    list-style: none;
    max-height: 200px;
    overflow-y: auto;
    overflow-x: hidden;

    .option-item {
      @extend %ellipsis;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .--no-content {
      user-select: none;
      background-color: initial;
      pointer-events: none;
    }
  }

  .icons-wrapper {
    cursor: pointer;
  }

  &.--stretch {
    width: 100%;
    max-width: none;
  }

  &.--rounded {
    .selected-value,
    .options-list {
      border-radius: $base-rounded;
    }
  }

  &.--violet {
    @include select-style($violet);
  }

  &.--green {
    @include select-style($green);
  }

  &.--red {
    @include select-style($red);
  }

  &.--blue {
    @include select-style($blue);
  }

  &.--yellow {
    @include select-style($yellow);
  }

  &.--azure {
    @include select-style($azure);
  }

  &.--orange {
    @include select-style($orange);
  }

  &.--neutral {
    @include select-style($neutral);
  }

  &.--s {
    @include setSize(small, small_3x, medium);
  }

  &.--m {
    @include setSize(medium, small_2x, large);
  }

  &.--l {
    @include setSize(large, small_2x, large_x);
  }

  &.--open {
    .options-list {
      display: block;
    }

    .button-arrow {
      transform: rotate(180deg);
    }
  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.1s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
