<script setup>
const { msg } = defineProps(['msg'])
</script>

<template>
  <section class="loading">
    <Icon name="svg-spinners:gooey-balls-1" class="loading-icon" />
    <p>{{ msg }}</p>
  </section>
</template>

<style lang="scss">
.loading {
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  color: rgb(var(--color-text-2));
  transition: all 0.3s ease;

  .loading-icon {
    font-size: 3rem;
    color: rgb(var(--color-accent-1));
  }
}
</style>
