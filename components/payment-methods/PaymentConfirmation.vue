<script setup>
const { closeModal } = defineProps(['closeModal'])
const emits = defineEmits(['selectPayment'])
</script>

<template>
  <section class="payment-confirmation">
    <h3>Congratulations</h3>
    <p>Your order went through</p>
    <p>Confirmation mail is on the way</p>
    <button @click="closeModal">Close</button>
  </section>
</template>

<style>
.payment-confirmation {
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  background-color: rgb(var(--color-bg-2));
  border: 1px solid rgba(var(--color-text-3), 0.3);
  border-radius: var(--radius-default);

  h3 {
    padding-bottom: 0.5rem;
    text-transform: capitalize;
    font-weight: 400;
    color: rgb(var(--color-accent-1));
  }

  p, small {
    letter-spacing: 1px;
    color: rgb(var(--color-text-2));
  }

  button {
    display: flex;
    width: max-content;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    color: rgb(var(--color-accent-1));
    background-color: transparent;
    border: 1px solid rgb(var(--color-accent-1));
    border-radius: var(--radius-default);
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: rgba(var(--color-accent-1), 0.3);
      scale: 1.01;
    }
  }
}
</style>
