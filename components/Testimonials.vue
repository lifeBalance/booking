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
    testimonial: 'I had lots of fun shooting my guns at Gun Range Demo.',
  },
]
</script>

<template>
  <ul role="list" class="card-list">
    <Card
      v-for="card in cards"
      :img="card.img"
      :name="card.name"
      :text="card.text"
      :testimonial="card.testimonial"
    />
  </ul>
</template>

<style lang="scss" scoped>
.card-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
    padding: 2rem 0;
    max-width: 90%;
    margin: 0 auto;
  }

  /* MEDIA QUERIES */
  @media (min-width: 350px) {
  }

  @media (min-width: 480px) {
    .card-list {
      max-width: 85%;
    }
  }

  @media (min-width: 768px) {
  }

  @media (min-width: 992px) {
    .card-list {
      max-width: 80%;
    }
  }

  @media (min-width: 1200px) {
    .card-list {
      max-width: 70%;
    }
  }
</style>
