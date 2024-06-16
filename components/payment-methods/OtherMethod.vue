<script setup>
const props = defineProps({
  brand: String,
  details: String,
})
const emits = defineEmits(['selectPayment'])

const { brand, details } = props
</script>

<template>
  <section class="other-method" @click="emits('selectPayment', brand)">
    <h3>{{ brand }}</h3>
    <p>{{ details }}</p>
  </section>
</template>

<style>
.other-method {
  padding: 1rem;
  cursor: pointer;
  &:hover * {
    color: rgb(var(--color-accent-1));
  }

  h3 {
    padding-bottom: 0.5rem;
    text-transform: capitalize;
    font-weight: 400;
    color: rgb(var(--color-text-1));
  }

  p {
    letter-spacing: 1px;
    color: rgb(var(--color-text-2));
  }
}

.other-method.separator {
  border-bottom: 1px solid rgba(var(--color-text-3), .6);
}
</style>
