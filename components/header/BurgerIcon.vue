<script setup>
const emit = defineEmits(['burgerClick'])
const { modalNavExpanded } = defineProps(['modalNavExpanded'])

const handleClick = (el) => {
  console.log('clicked on burger button')

  // Emit the burgerClick event so the parent component can handle it
  emit('burgerClick')
}
</script>

<template>
  <button
    @click="handleClick"
    class="burger-btn"
    :aria-expanded="modalNavExpanded"
    data-burger-btn
  >
    <svg class="burger-icon" viewBox="0 0 100 100">
      <rect
        class="line top-bun"
        rx="5"
        x="10"
        :y="modalNavExpanded ? 45 : 25"
      ></rect>
      <rect class="line meat" rx="5" x="10" y="50"></rect>
      <rect
        class="line bottom-bun"
        rx="5"
        x="10"
        :y="modalNavExpanded ? 45 : 75"
      ></rect>
    </svg>
  </button>
</template>

<style>
/* Burger button */
.burger-btn {
  all: unset;
  cursor: pointer;
  /* border: 0.1rem solid var(--text-color-3);
    border-radius: 0.5rem; */
  background-color: transparent;
  width: 40px;
  z-index: 2;
}

.burger-icon {
  width: 40px;
}

.line {
  height: 8px;
  width: 80px;
  stroke: rgb(var(--color-text-2));
  fill: rgb(var(--color-text-2));
}

.burger-btn:hover .line {
  stroke: rgb(var(--color-accent-1));
  fill: rgb(var(--color-accent-1));
}

.burger-btn .burger-icon .line {
  transition: 0.5s;
  transform-origin: center;
  color: rgb(var(--color-text-2));
}

.burger-btn[aria-expanded='true'] rect {
  fill: rgb(var(--color-text-1));
  border-color: white;
}

.burger-btn[aria-expanded='true'] {
  border-color: white;
}

.burger-btn[aria-expanded='true'] .top-bun {
  rotate: 45deg; /* Rotate the top line */
}

.burger-btn[aria-expanded='true'] .meat {
  opacity: 0; /* Erase the middle line */
}

.burger-btn[aria-expanded='true'] .bottom-bun {
  rotate: -45deg; /* Rotate the bottom line */
}
</style>
