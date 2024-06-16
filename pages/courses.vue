<script setup></script>

<template>
  <section>
    <div class="content">
      <h1>courses</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo iusto
        debitis delectus quam minus unde a ipsum, excepturi ab? Asperiores?
      </p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  padding: 0 2.5%;

  .content {
    border: 1px solid red;
    text-align: center;
    color: rgb(var(--color-text-1));
    h1 {
      font-size: 4rem;
    }
    p {
      font-size: 2rem;
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
    padding: 0 5%;
  }
}

@media (min-width: 992px) {
  section {
    padding: 0 7%;
  }
}

@media (min-width: 1200px) {
  section {
    padding: 0 10%;
  }
}
</style>
