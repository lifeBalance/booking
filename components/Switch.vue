<script setup>
// Composable (aka custom hook) to manage the theme, state and toggle function.
const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <div class="switch" @click="toggleTheme" :data-toggled="isDark">
    <input type="checkbox" name="switch" v-model="isDark" />
    <div class="circle"></div>
    <Icon name="ph:sun" class="icon-sun" />
    <Icon name="ph:moon" class="icon-moon" />
  </div>
</template>

<style lang="scss" scoped>
.switch {
  cursor: pointer;
  color: rgb(var(--color-text-1));
  padding: 0.2rem;
  border: 1px solid rgb(var(--color-text-3));
  border-radius: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  position: relative;

  input {
    display: none;
  }
}

.switch[data-toggled='false'] {
  border-color: rgb(var(--color-accent-3));
}

.circle {
  position: absolute;
  background-color: rgb(var(--color-text-3));
  border-radius: 50%;
  width: 1.6rem;
  height: 1.6rem;
  transition: transform 0.3s;
}

input:checked + .circle {
  transform: translateX(2rem);
}

.icon-sun {
  color: rgb(var(--color-accent-1));
}

.icon-moon {
  color: rgb(var(--color-accent-3));
}

.switch[data-toggled='false'] .circle {
  background-color: rgb(var(--color-accent-3));
}
</style>
