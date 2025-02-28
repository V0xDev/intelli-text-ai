<script setup lang="ts">
import VLabel from "@/shared/components/Label/VLabel.vue";
</script>

<template>
  <div class="container__logo">
    <div class="text-container">
      <div class="blob-outer-container">
        <div class="blob-inner-container">
          <div class="blob"></div>
        </div>
      </div>
      <VLabel class="gradient-text" size="xl2" is-bold>IntelliText AI</VLabel>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// Цвета текста
$color-start: map.get($gradientLogo, start);
$color-mid: map.get($gradientLogo, end);
$color-end: $color-start;

// Цвета blob
$blob-color-1: #08f;
$blob-color-2: #cd5200;
$blob-color-3: #bbffa1;
$blob-color-4: #4c00ff;
$blob-color-5: #ab2666;
$blob-color-6: #09f;

// Переменные для размеров и параметров
$blob-width: 800px; // Ширина blob
$blob-height: 400px; // Высота blob
$blob-border-radius: 40%; // Радиус скругления blob
$blob-scale: 0.7; // Масштаб внутреннего контейнера blob
$blob-animation-duration: 8s; // Длительность анимации blob
$blob-opacity: 0.6; // Прозрачность blob
$gradient-animation-duration: 5s; // Длительность анимации градиента текста

.container__logo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: map.get($spacing, large_3x);
  padding-bottom: map.get($spacing, large_x);
}

.text-container {
  position: relative;
  display: inline-block;
}

.blob-outer-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: $blob-width;
  height: $blob-height;
  z-index: map.get($z-index, blob);
  filter: blur(100px);
  opacity: $blob-opacity;
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

.gradient-text {
  font-family: "Nunito", serif;
  font-optical-sizing: auto;
  font-style: normal;

  background: linear-gradient(to right, $color-start, $color-mid, $color-end);
  background-size: 200% auto;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-flow $gradient-animation-duration linear infinite;
}

// Анимация для blob
@keyframes spinBlob {
  0% {
    transform: rotate(0deg) scale(2);
  }
  100% {
    transform: rotate(1turn) scale(2);
  }
}

// Анимация текста
@keyframes gradient-flow {
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: 200% center;
  }
}
</style>
