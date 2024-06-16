<script setup>
// Define the allowed props this component can receive.
const { modalNavExpanded, toggleModalNav } = defineProps([
  'modalNavExpanded',
  'toggleModalNav',
])

const links = [
  { name: 'Home', path: '/' },
  { name: 'Book a Range', path: '/book' },
  { name: 'Courses', path: '/courses' },
  { name: 'Login', path: '/login' },
]

// Define the allowed events this component can emit.
// const emit = defineEmits(['closeModalNav'])
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <section class="modal" :class="{ expanded: modalNavExpanded }">
        <ul>
          <li v-for="link in links">
            <NuxtLink
              class="nav-link"
              :to="link.path"
              @click="toggleModalNav"
              >{{ link.name }}</NuxtLink
            >
          </li>

          <li>
            <Switch />
          </li>
        </ul>
      </section>
    </Teleport>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.modal {
  font-family: 'Inter', sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgb(var(--color-bg));
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s ease-in-out;
  transform: translateX(-100%);
  // Burger button has z-index of 2; this modal goes behind it.
  z-index: 1;

  ul {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    font-size: 3rem;

    & a:link,
    & a:visited {
      color: rgb(var(--color-text-1));
      text-decoration: none;
    }

    & a:hover {
      color: rgb(var(--color-accent-1));
    }
  }

  &.expanded {
    opacity: 1;
    visibility: visible;
    transform: translateX(0);
  }
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
