<script setup lang="ts">
import { VLinearLoaderType } from "@/shared/components";

withDefaults(defineProps<VLinearLoaderType>(), {
  color: "#707070",
  height: "2.1px",
  width: "8.33%",
  position: "center",
});
</script>

<template>
  <div class="ui-linear-spinner" :class="['--' + position]"></div>
</template>

<style lang="scss" scoped>
.ui-linear-spinner {
  height: v-bind(height);
  width: 100%;
  display: inline-block;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.05);

  &.--top {
    top: 0;
  }

  &.--bottom {
    bottom: 0;
  }

  &::after {
    content: "";
    height: 100%;
    width: v-bind(width);
    position: absolute;
    left: 0;
    top: 0;
    box-sizing: border-box;
    animation: hitZak 2.2s linear infinite alternate;

    background-color: v-bind(color);
  }

  @keyframes hitZak {
    0% {
      left: 0;
      transform: translateX(-1%);
    }
    100% {
      left: 100%;
      transform: translateX(-99%);
    }
  }
}
</style>
