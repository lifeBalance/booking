<script setup>
const { companyName } = defineProps(['companyName'])
</script>

<template>
  <footer>
    <div class="flex-row-container">
      <div class="logo-social">
        <h3 class="logo">
          <TargetIcon class="icon" />
          <NuxtLink to="/">{{ companyName }}</NuxtLink>
          <br />
        </h3>

        <div class="social">
          <a href="https://www.instagram.com/"><Icon name="ph:instagram-logo" class="icon" /></a>
          <a href="https://x.com/"><Icon name="ph:x-logo" class="icon" /></a>
          <a href="https://www.facebook.com/"><Icon name="ph:facebook-logo" class="icon" /></a>
          <a href="https://www.whatsapp.com/"><Icon name="ph:whatsapp-logo" class="icon" /></a>
        </div>
      </div>

      <div class="small-print">
        <small>Copyright &copy; 2024 by {{ companyName }} Inc. </small>
        <small>All rights reserved.</small>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  box-shadow: 0 0 5rem rgba(var(--color-text-1), 0.2);
  padding: 2rem 0;
  background-color: rgb(var(--color-bg));
  color: #fff;
}

.flex-row-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0 auto;
  max-width: 90%;
}

.logo-social {
  display: flex;
  flex-direction: column-reverse;
  gap: 2rem;

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    gap: 1rem;

    .icon {
      color: rgb(var(--color-text-2));
      transition: all 0.3s ease-in-out;
    }

    &:hover .icon {
      color: rgb(var(--color-accent-1));
    }
  }

  .social {
    display: flex;
    justify-content: center;
    gap: 3rem;

    .icon {
      font-size: 3rem;
      color: rgb(var(--color-text-2));
      cursor: pointer;
      transition: all 0.3s ease-in-out;
    }

    a:hover .icon {
      color: rgb(var(--color-accent-1));
    }
  }
}

.small-print {
  font-size: 0.7rem;
  color: rgb(var(--color-text-2));
}

a:link,
a:visited {
  color: #fff;
  text-decoration: none;
  font-weight: 600;
}

/* MEDIA QUERIES */
@media (min-width: 350px) {
  footer .flex-row-container {
    max-width: 90%;
  }
}

@media (min-width: 480px) {
}

@media (min-width: 768px) {
  footer .flex-row-container {
    gap: 0.5rem;
  }

  .logo-social {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;

    .social {
      gap: 1.5rem;

      .icon {
        font-size: 2.5rem;
      }
    }
  }

  .flex-row-container .small-print {
    width: 100%;
    justify-self: flex-start;
  }
}

@media (min-width: 992px) {
  footer .flex-row-container {
    max-width: 80%;
  }
}

@media (min-width: 1200px) {
}
</style>
