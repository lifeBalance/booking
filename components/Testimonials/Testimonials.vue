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
    testimonial:
      'I had lots of fun shooting my guns at Gun Range Demo. Namaste bitches!',
  },
]
</script>

<template>
  <section>
    <h2>What our customers say about us</h2>

    <div class="testimonials-wrapper">
      <section class="img-section"></section>

      <ul role="list" class="testimonials-section">
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
  max-width: 90%;
  margin: 6rem auto;
}

h2 {
  font-size: 1.2rem;
  text-transform: uppercase;
  font-weight: 400;
  color: rgb(var(--color-accent-1));
  padding-bottom: 2rem;
  // outline: 1px solid red;
}

.testimonials-wrapper {
  display: flex;
  justify-content: center;
}

.img-section {
  display: none;
}

.testimonials-section {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  // outline: 1px solid green;
}

/* MEDIA QUERIES */
@media (min-width: 350px) {
}

@media (min-width: 480px) {
}

@media (min-width: 768px) {
  section {
    max-width: 85%;
  }

  h2 {
    font-size: 2rem;
  }
}

@media (min-width: 992px) {
  section {
    max-width: 80%;
  }

  h2 {
    font-size: 2.5rem;
  }

  .testimonials-wrapper {
    gap: 2rem;
  }

  .img-section {
    display: block;
    border-radius: 0.5rem;
    margin: 0;
    width: 100%;
    min-width: 40%;
    background-image: url('~/assets/images/testimonials.jpg');
    background-size: cover;
    background-position: center;
    // outline: 1px solid greenyellow;
  }

  .testimonials-section {
    grid-template-columns: 1fr;
    margin: 0;
  }
}

@media (min-width: 1200px) {
  .testimonials-section {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }
}
</style>
