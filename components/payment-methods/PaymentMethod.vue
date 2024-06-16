<script setup>
const props = defineProps({
  title: String,
})
</script>

<template>
  <section class="payment-method">
    <h3 class="title">{{ title }}</h3>

    <div class="payment-options">
      <slot></slot>
    </div>
  </section>
</template>

<style>
.payment-method {
  .title {
    font-weight: 500;
    padding-left: 1.2rem;
    padding-bottom: 1rem;
    color: rgb(var(--color-text-2));
  }

  & .payment-options {
    background-color: rgb(var(--color-bg-2));
    overflow: hidden;
    border-radius: var(--radius-default);
  }
}
</style>
