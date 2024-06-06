<script setup>
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}

.slide-enter-from {
  // opacity: 0;
  transform: translateX(100%);
  filter: grayscale(1);
}

.slide-leave-to {
  // opacity: 0;
  transform: translateX(-100%);
  filter: grayscale(1);
}
</style>
