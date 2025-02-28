<script setup lang="ts">
import { VBlobEffect } from "./VBlobEffect.types";

const { isOpacity = false } = defineProps<VBlobEffect>();
</script>

<template>
  <div class="glow-container">
    <div class="blob-outer-container" :class="{ '--is-opacity': isOpacity }">
      <div class="blob-inner-container">
        <div class="blob"></div>
      </div>
    </div>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
$blob-color-1: #08f;
$blob-color-2: #cd5200;
$blob-color-3: #bbffa1;
$blob-color-4: #4c00ff;
$blob-color-5: #ab2666;
$blob-color-6: #09f;

$blob-border-radius: 40%;
$blob-scale: 0.7;
$blob-animation-duration: 8s;
$blob-opacity: 0.6;

.glow-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
}

.blob-outer-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  max-width: 800px;
  max-height: 400px;
  z-index: map.get($z-index, blob);
  filter: blur(100px);

  &.--is-opacity {
    opacity: $blob-opacity;
  }
}

.blob-inner-container {
  border-radius: $blob-border-radius;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #fff;
  transform: scale($blob-scale);
}

.blob {
  width: 100%;
  height: 100%;
  background: conic-gradient(
    from 0deg,
    $blob-color-1,
    $blob-color-2,
    $blob-color-3,
    $blob-color-4,
    $blob-color-5,
    $blob-color-6
  );
  animation: spinBlob $blob-animation-duration linear infinite;
}

@keyframes spinBlob {
  0% {
    transform: rotate(0deg) scale(2);
  }
  100% {
    transform: rotate(1turn) scale(2);
  }
}
</style>
