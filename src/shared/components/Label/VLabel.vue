<script setup lang="ts">
import { VLabel } from "@/shared/components/Label/VLabel.types";

const { size = "s1", isBold = false } = defineProps<VLabel>();
</script>

<template>
  <span class="ui-label" :class="['--' + size, { '--bold': isBold }]">
    <div v-if="$slots.before" class="before">
      <slot name="before" />
    </div>
    <slot name="default" />
    <div v-if="$slots.after" class="after">
      <slot name="after" />
    </div>
  </span>
</template>

<style lang="scss" scoped>
.ui-label {
  display: flex;
  color: v-bind(color);

  &.--bold {
    font-weight: bold;
  }

  &.--s1 {
    font-size: map.get($font-size, s1);
  }

  &.--s2 {
    font-size: map.get($font-size, s2);
  }

  &.--s3 {
    font-size: map.get($font-size, s3);
  }

  &.--m1 {
    font-size: map.get($font-size, m1);
  }

  &.--m2 {
    font-size: map.get($font-size, m2);
  }

  &.--m3 {
    font-size: map.get($font-size, m3);
  }

  &.--l1 {
    font-size: map.get($font-size, l1);
  }

  &.--l2 {
    font-size: map.get($font-size, l2);
  }

  &.--l3 {
    font-size: map.get($font-size, l3);
  }

  &.--xl1 {
    font-size: map.get($font-size, xl1);
  }

  &.--xl2 {
    font-size: map.get($font-size, xl2);
  }

  &.--xl3 {
    font-size: map.get($font-size, xl3);
  }
}
</style>
