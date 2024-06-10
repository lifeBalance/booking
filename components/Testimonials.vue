<script setup>
// IMAGES FOR TESTIMONIALS
import baldy from '~/assets/images/testimonials/baldy.jpeg'
import cap from '~/assets/images/testimonials/cap.jpeg'
import hat from '~/assets/images/testimonials/hat.jpeg'
import salla from '~/assets/images/testimonials/salla.jpeg'

const cards = [
  {
    img: baldy,
    name: 'Baldy',
    text: 'Professional Beard Model',
    testimonial: 'I had lots of fun shooting my guns at Gun Range Demo.',
  },
  {
    img: cap,
    name: 'Teemu',
    text: 'Barista at Starbucks',
    testimonial: `To whoever double parked his Tesla, please move it, I start my shift in 10min, and those frapuccinos are not gonna make themselves.`,
  },
  {
    img: hat,
    name: 'Henri',
    text: 'Pet Groomer',
    testimonial:
      'I wanted to do ballet, but my dad signed me up here against my will.',
  },
  {
    img: salla,
    name: 'Salla',
    text: 'Yoga Instructor',
    testimonial: 'I had lots of fun shooting my guns at Gun Range Demo. Namaste bitches!',
  },
]
</script>

<template>
  <section>
    <h2>What our customers say about us</h2>

    <div class="testimonials-wrapper">
      <section class="img-section"></section>

      <ul role="list" class="card-list">
        <Card
          v-for="card in cards"
          :img="card.img"
          :name="card.name"
          :text="card.text"
          :testimonial="card.testimonial"
        />
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgb(var(--color-text-1));
  padding: 4rem 2.5%;
  margin: 0 auto;
}

h2 {
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: 400;
  color: rgb(var(--color-accent-1));
}

.testimonials-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.img-section {
  display: none;
}

.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
  max-width: 90%;
  margin: 0 auto;
}

/* MEDIA QUERIES */
@media (min-width: 350px) {
}

@media (min-width: 480px) {
  section {
    padding: 6rem 5%;
  }

  .card-list {
    max-width: 85%;
  }
}

@media (min-width: 768px) {
  section {
    padding: 6rem 7%;
  }
}

@media (min-width: 992px) {
  section {
    padding: 6rem 10%;
  }

  h2 {
    font-size: 2.5rem;
  }
  .card-list {
    max-width: 0;
    gap: 2rem;
    padding: 0;
  }

  .testimonials-wrapper {
    grid-template-columns: 1fr 1fr;
    padding: 2rem 0;
  }

  .img-section {
    display: block;
    border-radius: 0.5rem;
    min-width: 100%;
    background-image: url('~/assets/images/armory2.jpeg');
    background-size: cover;
    background-position: center;
  }
}

@media (min-width: 1200px) {
  .card-list {
    max-width: 70%;
  }
}
</style>
