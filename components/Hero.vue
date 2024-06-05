<script setup></script>

<template>
  <section>
    <h1>Gun Range Demo</h1>

    <div class="inner-container">
      <p>
        Lorem ipsum pew pew. Let's shoot some guns, bro! Hell yeah! Woohoo,
        let's fill this paragraph! Pew
      </p>

      <NuxtLink to="/book">Book</NuxtLink>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('~/assets/images/hero7.jpeg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  text-align: center;

  & h1 {
    padding: 2rem 0;
    font-size: clamp(4rem, 10vw, 8rem);
    font-weight: 700;
    line-height: 1;
    color: rgb(var(--color-accent-1));
  }

  .inner-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* outline: 1px solid blue; */

    & p {
      color: rgb(var(--color-text-1));
      font-size: clamp(1.2rem, 4vw, 2rem);
      line-height: 1.5;
      margin-bottom: 1em;
      text-align: center;
    }

    & a {
      margin-bottom: 2rem;

      &:link,
      &:visited {
        color: rgb(var(--color-accent-1));
        padding: 1em 2em;
        border: 1px solid rgb(var(--color-accent-1));
        border-radius: 5px;
        text-align: center;
        display: inline-block;
        text-decoration: none;
        font-size: clamp(1.2rem, 4vw, 2rem);
        font-weight: 700;
        transition: all 0.3s ease-in-out;
      }

      &:hover,
      &:active {
        background-color: rgba(var(--color-accent-1), 0.2);
        scale: 1.05;
      }
    }
  }
}

/* MEDIA QUERIES */
@media (min-width: 350px) {
}

@media (min-width: 480px) {
}

@media (min-width: 768px) {
  section {
    /* min-height: 70vh; */
    & h1 {
      padding-top: 5rem;
    }

    .inner-container {
      max-width: 70%;
      text-align: left;
    }
  }
}

@media (min-width: 992px) {
  section {
    /* min-height: 80vh; */

    .inner-container {
      max-width: 100%;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
      gap: 3rem;
      max-width: 90%;

      & p {
        max-width: 60%;
      }

      & a {
        margin-bottom: 0;
      }
    }
  }
}

@media (min-width: 1200px) {
  section {
    /* min-height: 90vh; */

    .inner-container {
      max-width: 70%;
      text-align: left;
    }
  }
}
</style>
