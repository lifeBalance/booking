<script setup>
import { ref, onMounted } from 'vue'

const mainNavExpanded = ref(false)
const headerElement = ref()

const toggleMainNav = () => {
  console.log('Header: clicked on burger button')
  mainNavExpanded.value = !mainNavExpanded.value
}

// Add the event listener when the component is mounted
onMounted(() => {
  window.addEventListener('scroll', scrollingHandler)
  console.log('mounted')
  console.log(headerElement.value) // Logs the header element
})

// Store the last scroll position
let lastScrollTop = 0
function scrollingHandler() {
  const currentScrollTop = window.scrollY || document.documentElement.scrollTop

  if (currentScrollTop > lastScrollTop) {
    // When the user scrolls down
    lastScrollTop = currentScrollTop
    // console.log('downscroll', currentScrollTop, lastScrollTop)
    headerElement.value.classList.remove('sticky')
  } else {
    // When the user scrolls up
    lastScrollTop = currentScrollTop
    // console.log('upscroll', currentScrollTop, lastScrollTop)
    headerElement.value.classList.add('sticky')
  }
  console.log('scrolling')
}
</script>

<template>
  <header ref="headerElement">
    <NuxtLink to="/" class="logo"><TargetIcon />Landing + App</NuxtLink>

    <nav class="main-nav" :aria-expanded="mainNavExpanded">
      <ul>
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/app">App</NuxtLink></li>
      </ul>
    </nav>

    <BurgerIcon class="burger-btn-main" @burgerClick="toggleMainNav" />
  </header>
</template>

<style lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;
  box-shadow: 0 0 2rem rgba(var(--color-text-1), 0.3);
  padding: 0.5rem 2.5%;
  position: fixed;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-100%);
  transition: all 0.5s ease-in-out;
  width: 100%;
}

.flex-row-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;
  max-width: 95%;
}

.sticky {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: rgb(var(--color-bg));
  transform: translateY(0%);
  opacity: 1;
  visibility: visible;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  [data-icon] {
    color: rgb(var(--color-text-2));
    font-size: 3rem;
    transition: all 0.3s ease-in-out;
  }

  span {
    color: rgb(var(--color-text-1));
    font-weight: 700;
  }

  &:link,
  &:visited {
    color: rgb(var(--color-text-1));
    text-decoration: none;
    font-weight: 600;
  }

  &:hover [data-icon] {
    color: rgb(var(--color-accent-1));
  }
}

a:link,
a:visited {
  color: rgb(var(--color-text-1));
  text-decoration: none;
  font-weight: 600;
}

.main-nav[aria-expanded='false'] {
  display: flex;
  visibility: hidden;
  opacity: 0;

  ul {
    list-style: none;
    position: absolute;
    top: 0;
    left: 0;
    gap: 1.5rem;
    align-items: center;

    & li:nth-child(1) {
      border: 1px solid rgb(var(--color-text-1));
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;

      &:hover {
        background-color: rgb(var(--color-text-1));
        a {
          color: rgb(var(--color-bg));
        }
        transition: all 0.3s;
      }
    }

    & li:nth-child(2) {
      color: rgb(var(--color-text-1));

      :hover {
        text-decoration: underline;
        text-underline-offset: 0.3rem;
        transition: all 0.3s;
      }
    }
  }
}

.main-nav[aria-expanded='true'] {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  transition: all 0.5s ease-in-out;
  min-height: 100vh;

  ul {
    /* Absolute positioning the list, removes the links
      from the nav, leaving space to the logo. */
    position: absolute;

    z-index: 1;
    min-width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    list-style: none;

    li {
      font-size: 2.5rem;
      padding: 0.2rem 1rem;
      width: 100%;
      text-align: center;

      &:hover {
        background-color: rgba(var(--color-text-1), 0.1);

        a {
          color: rgb(var(--color-accent-1));
        }
      }
      &:active {
        background-color: rgba(var(--color-accent-1), 1);

        a {
          color: rgb(var(--color-bg));
        }
      }
    }
  }
}

.main-nav::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(64, 64, 64, 0.905);
  z-index: 1;
  transition: all 0.5s ease-in;
  opacity: 0;
  visibility: hidden;
}

.main-nav[aria-expanded='true']::before {
  opacity: 1;
  visibility: visible;
}

.burger-btn-main {
  display: block;
  color: white;
}

@media (min-width: 350px) {
  .logo span {
    font-size: 1.2rem;
  }
}

@media (min-width: 480px) {
  .logo span {
    font-size: 1.5rem;
  }
}

@media (min-width: 768px) {
  .burger-btn-main {
    display: none;
  }

  .main-nav[aria-expanded='false'] {
    ul {
      /* Reset list of links to normal positioning,
        and set display flex here (not sure why). */
      position: initial;
      display: flex;
    }
    visibility: visible;
    opacity: 1;
  }

  .logo span {
    font-size: 2rem;
  }
}

@media (min-width: 992px) {
  .flex-row-container {
    max-width: 80%;
  }
}

@media (min-width: 1200px) {
}
</style>
