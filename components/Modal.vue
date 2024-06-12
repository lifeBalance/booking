<script setup>
import { ref, onMounted } from 'vue'

// Define the allowed events this component can emit.
const emit = defineEmits(['closeModal'])

// Define the allowed props this component can receive.
const { modalOpen } = defineProps(['modalOpen'])

// When the overlay is clicked, emit the 'closeModel'
// event, so the parent can close the modal.
const closeModal = () => {
  emit('closeModal')
}
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <section
        class="modal"
        :class="{ open: modalOpen }"
        :modalOpen="modalOpen"
      >
        <slot></slot>
      </section>
    </Teleport>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgba(var(--color-bg), 0.9);
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s ease-in-out;
  color: white;
}

.modal.open {
  opacity: 1;
  visibility: visible;
}

@media (min-width: 350px) {
}

@media (min-width: 480px) {
}

@media (min-width: 768px) {
}

@media (min-width: 992px) {
}

@media (min-width: 1200px) {
}
</style>
