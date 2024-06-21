<script setup>
import { useUserStore } from '~/stores'

// Get the user store
const userStore = useUserStore()

const router = useRouter()

/**
 * When we directly call userStore.isLoggedIn() during setup, we're getting
 * the value of isLoggedIn at the time of component initialization. This means 
 * if the isLoggedIn state changes in the store after the component has been 
 * initialized, those changes won't be reflected in our component because 
 * isLoggedIn in your component is not reactive. 
 *
 * To fix this, we should access isLoggedIn as a computed property to ensure
 * it remains reactive and updates whenever the store's state changes.
 */
const isLoggedIn = computed(() => userStore.isLoggedIn())

// Define the allowed props this component can receive.
const { modalNavExpanded, toggleModalNav } = defineProps([
  'modalNavExpanded',
  'toggleModalNav',
])

const logOutHandler = () => {
  console.log('logOutHandler')
  userStore.logout()

  router.push('/')

  setTimeout(() => {
    toggleModalNav()
  }, 500)
}

const links = [
  { name: 'Book a Range', path: '/book' },
  { name: 'Courses', path: '/courses' },
  { name: 'Home', path: '/' },
]

// Define the allowed events this component can emit.
// const emit = defineEmits(['closeModalNav'])
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <section class="modal" :class="{ expanded: modalNavExpanded }">
        <ul>
          <li v-if="isLoggedIn">
            <span class="logout" @click="logOutHandler">Log Out</span>
          </li>

          <li v-else>
            <NuxtLink class="nav-link" to="/login" @click="toggleModalNav"
              >Login</NuxtLink
            >
          </li>

          <li v-for="link in links">
            <NuxtLink
              class="nav-link"
              :to="link.path"
              @click="toggleModalNav"
              >{{ link.name }}</NuxtLink
            >
          </li>

          <li @click="toggleModalNav">
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

    .logout {
      cursor: pointer;
      color: rgb(var(--color-text-1));
      transition: all 0.3s ease;
    }

    .logout:hover {
      color: rgb(var(--color-accent-2));
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
