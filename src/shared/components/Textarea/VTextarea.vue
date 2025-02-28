<script setup lang="ts">
import { useId } from "vue";
import { VTextarea } from "./VTextarea.types";
import VLoader from "../Loader/VLoader.vue";
import VBlobEffect from "../BlobEffect/VBlobEffect.vue";
import VLabel from "../Label/VLabel.vue";

withDefaults(defineProps<VTextarea>(), {
  size: "s",
  color: "neutral",
  resize: "both",
  isStretch: false,
  isLoading: false,
});

const modelValue = defineModel<string>({ required: true, default: "" });

const unicId = useId();

defineExpose({
  unicId,
});
</script>

<template>
  <div
    class="ui-textarea"
    :class="[
      '--' + color,
      '--' + size,
      '--' + resize,
      { '--stretch': isStretch },
      { '--rounded': isRounded },
    ]"
  >
    <transition name="fade" mode="out-in">
      <div v-if="isLoading" key="loader" class="ui-textarea__wrapper-blob">
        <VBlobEffect>
          <div class="--blob-content">
            <VLoader />
            <VLabel size="m1" color="#fff">Идет обработка данных...</VLabel>
          </div>
        </VBlobEffect>
      </div>
      <div v-else key="textarea" class="textarea-container">
        <div v-if="$slots.before" class="--before">
          <slot name="before" />
        </div>
        <textarea
          v-bind="$attrs"
          v-model="modelValue"
          :placeholder="placeholder"
          :readonly="readonly"
          :disabled="disabled"
          :spellcheck="spellcheck"
          :autofocus="autofocus"
          :maxlength="maxLength"
          :id="unicId"
          :name="unicId"
          :rows="minHeight"
          :cols="minWidth"
        />
        <div v-if="$slots.after" class="--after">
          <slot name="after" />
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@mixin set-styles($color) {
  textarea {
    border: 1px solid map.get($color, 80);

    &::placeholder {
      opacity: 0.8;
    }

    &:focus {
      outline: 0;
      box-shadow: inset 0 0 0 0.2rem map.get($color, 40);
    }

    &:disabled {
      user-select: none;
      @extend %disabled-styles;
    }

    &[readonly] {
      @extend %disabled-styles;
      pointer-events: stroke;
    }

    &:disabled,
    &[readonly] {
      opacity: 90%;
    }
  }

  .ui-textarea__wrapper-blob {
    width: 100%;
    height: 100%;
    border: 1px solid map.get($color, 120);

    .--blob-content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: $base-gap;

      :deep(.ui-loader) {
        position: absolute;
        padding-bottom: 7rem;
      }

      span {
        color: white;
        font-weight: bold;
      }
    }
  }
}

@mixin set-size($fontSize) {
  textarea {
    font-size: map.get($size, $fontSize);
  }
}

@mixin set-resize($value) {
  textarea {
    resize: $value;
  }
}

.ui-textarea {
  display: flex;
  align-items: end;
  gap: map.get($spacing, small_3x);

  &,
  textarea {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    max-width: 100%;
    max-height: 100%;
  }

  textarea {
    padding: map.get($spacing, small_3x) map.get($spacing, small_3x);
  }

  &.--stretch,
  & textarea {
    width: 100%;
    height: 100%;
  }

  &.--rounded,
  &.--rounded textarea,
  .ui-textarea__wrapper-blob {
    border-radius: $base-rounded;
  }

  &.--resize-none {
    @include set-resize(none);
  }

  &.--both {
    @include set-resize(both);
  }

  &.--vertical {
    @include set-resize(vertical);
  }

  &.--horizontal {
    @include set-resize(horizontal);
  }

  &.--violet {
    @include set-styles($violet);
  }

  &.--green {
    @include set-styles($green);
  }

  &.--red {
    @include set-styles($red);
  }

  &.--blue {
    @include set-styles($blue);
  }

  &.--yellow {
    @include set-styles($yellow);
  }

  &.--azure {
    @include set-styles($azure);
  }

  &.--orange {
    @include set-styles($orange);
  }

  &.--neutral {
    @include set-styles($neutral);
  }

  &.--s {
    @include set-size(small);
  }

  &.--m {
    @include set-size(medium);
  }

  &.--l {
    @include set-size(large);
  }
}

.textarea-container {
  display: flex;
  align-items: end;
  gap: map.get($spacing, small_3x);
  width: 100%;
  height: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
