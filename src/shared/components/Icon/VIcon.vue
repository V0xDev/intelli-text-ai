<script lang="ts" setup>
import { Icon } from "@/shared/components/Icon/VIcon.types";

withDefaults(defineProps<Icon>(), {
  height: "24px",
  width: "24px",
  color: "currentColor",
});
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="ui-icon"
    :viewBox="`0 0 24 24`"
  >
    <g :fill="color">
      <slot />
    </g>
  </svg>
</template>

<style scoped lang="scss">
.ui-icon {
  width: v-bind(width);
  height: v-bind(height);
  position: relative;
  display: block;
}
</style>
