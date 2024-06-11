<script setup>
const props = defineProps({
  title: String,
})
</script>

<template>
  <section class="payment-method">
    <h3>{{ title }}</h3>

    <div class="payment-options">
      <slot></slot>
    </div>
  </section>
</template>

<style>
.payment-method {
  h3 {
    font-weight: 500;
    padding-bottom: 1rem;
    color: rgb(var(--color-text-2));
  }

  & .payment-options {
    background-color: #23262d;
    overflow: hidden;
    border-radius: 7px;
  }
}
</style>
