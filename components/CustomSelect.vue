<script setup>
const { options, label } = defineProps(['label', 'options'])
</script>

<template>
  <div class="custom-select">
    <select>
      <option
        v-for="option in options"
        :value="option.value"
        :key="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <span class="custom-arrow"></span>
  </div>
</template>

<style>
.custom-select {
  position: relative;

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    padding: 0.5rem;
    padding-right: 2rem;
    font-size: 1.2rem;
    font-family: inherit;
    color: rgb(var(--color-text-2));
    border: 1px solid rgba(var(--color-text-1), 0.2);
    background-color: rgba(var(--color-bg), 0.9);
    border-radius: 7px;
    box-shadow: 0 1px 2px rgba(var(--color-bg), 0.1);
    width: 100%;
    cursor: pointer;
  }

  .custom-arrow {
    position: absolute;
    display: block;
    top: 0;
    right: 0;
    height: 100%;
    width: 2rem;
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
    background-color: rgb(var(--color-text-2), 0.7);
    pointer-events: none;
  }

  .custom-arrow::before,
  .custom-arrow::after {
    --size: .5rem;
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .custom-arrow::before {
    border-left: var(--size) solid transparent;
    border-right: var(--size) solid transparent;
    border-bottom: var(--size) solid rgb(var(--color-bg));
    top: 30%;
  }
  .custom-arrow::after {
    border-left: var(--size) solid transparent;
    border-right: var(--size) solid transparent;
    border-top: var(--size) solid rgb(var(--color-bg));
    top: 60%;
  }
}
</style>
