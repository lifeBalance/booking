<script setup>
// Reactive variable to control the theme switch (input checkbox)
const isChecked = ref(false)

// Function to toggle the theme based on the input checkbox
const toggleCheck = () => {
  isChecked.value = !isChecked.value
}

onMounted(() => {
  // Check if the user has a theme preference set in localStorage
  const localStorageTheme = localStorage.getItem('theme')
  // Check if the user has a  system's theme preference
  const theme = window.matchMedia('(prefers-color-scheme: dark)')

  // Set the theme based on the user's preference (system or local storage)
  if (localStorageTheme) {
    document.documentElement.setAttribute('data-theme', localStorageTheme)
    isChecked.value = localStorageTheme === 'dark'
  } else if (theme.matches) {
    document.documentElement.setAttribute('data-theme', 'dark')
    isChecked.value = true
  } else {
    document.documentElement.setAttribute('data-theme', 'light')
    isChecked.value = false
  }
})

watch(isChecked, (newVal) => {
  localStorage.setItem('theme', newVal ? 'dark' : 'light')
  document.documentElement.setAttribute('data-theme', newVal ? 'dark' : 'light')
})
console.log('Switch mounted', isChecked.value)
</script>

<template>
  <div class="switch" @click="toggleCheck" :data-toggled="isChecked">
    <input type="checkbox" name="switch" v-model="isChecked" />
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
