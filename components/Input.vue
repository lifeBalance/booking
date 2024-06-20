<script setup>
const { label, inputName, inputType, inputValue, setInputValue } = defineProps([
  'label',
  'inputName',
  'inputType',
  'inputValue',
  'setInputValue',
])
</script>

<template>
  <section class="input">
    <label :for="inputName">{{ label }}</label>
    <input
      :type="inputType"
      :name="inputName"
      :id="inputName"
      :value="inputValue"
      @input="setInputValue"
    />
  </section>
</template>

<style lang="scss" scoped>
.input {
  & label {
    color: rgb(var(--color-text-1));
    display: block;
    font-weight: 500;
    margin-bottom: 0.8rem;
    margin-left: 0.8rem;
  }

  & input {
    padding: 0.5rem;
    font-size: 1.2rem;
    font-family: inherit;
    color: rgb(var(--color-text-2));
    border: 1px solid rgba(var(--color-text-1), 0.2);
    background-color: rgba(var(--color-bg), 0.9);
    border-radius: var(--radius-default);
    box-shadow: 0 1px 2px rgba(var(--color-bg), 0.1);
    width: 100%;

    &:focus {
      outline: none;
      box-shadow: 0 0 0 0.2rem rgba(var(--color-accent-1), 0.9);
    }
  }
}
</style>
