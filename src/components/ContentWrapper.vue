<script setup lang="ts">
import TextAreaContainer from "@/components/ContentContainer/TextAreaContainer.vue";
import LogoContainer from "./LogoContainer.vue";
import NavbarActions from "./NavbarActions.vue";
</script>

<template>
  <div class="container">
    <LogoContainer />
    <NavbarActions />
    <TextAreaContainer />
  </div>
</template>

<style lang="scss" scoped>
.container {
  max-width: 1440px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
}

@media (max-width: 1600px) {
  .container {
    max-width: 1200px;
  }
}

@media (max-width: 1280px) {
  .container {
    max-width: 992px;
    padding: 0 15px;
  }
}
</style>
