<script setup>
import '@vuepic/vue-datepicker/dist/main.css'
import VueDatePicker from '@vuepic/vue-datepicker'
import soundEffect from '~/assets/sounds/gunreloading.m4a'
import soundEffect2 from '~/assets/sounds/gunshot.mp3'

definePageMeta({
  layout: 'default',
  pageTransition: {
    name: 'slide',
    mode: 'out-in', // default
  },
})

const date = ref(new Date())
console.log('date', date)

const slots = ref([
  { time: '9:00 AM', available: true },
  { time: '10:00 AM', available: true },
  { time: '11:00 AM', available: true },
  { time: '12:00 PM', available: true },
  { time: '1:00 PM', available: true },
  { time: '2:00 PM', available: false },
  { time: '3:00 PM', available: true },
  { time: '4:00 PM', available: false },
  { time: '5:00 PM', available: true },
  { time: '6:00 PM', available: true },
  { time: '7:00 PM', available: true },
  { time: '8:00 PM', available: true },
])

function book(idx) {
  if (slots.value[idx].available) {
    navigator.vibrate(200) // vibrate for 200ms
    slots.value[idx].available = false
    const cockingSound = new Audio(soundEffect)
    cockingSound.play()
  }
}
</script>

<template>
  <div class="book-container">
    <section class="img-section"></section>

    <section class="book-section">
      <h2>Book a Range</h2>
      <h3>Select Date and Time</h3>
      <div class="picker">
        <VueDatePicker
          v-model="date"
          auto-apply
          :enable-time-picker="false"
          dark
          menu-class-name="dp-custom-menu"
        />
      </div>

      <div class="time-slots">
        <div
          class="time-slot"
          :class="{ 'time-slot--booked': !slot.available }"
          v-for="(slot, idx) of slots"
          :data-available="slot.available"
          @click="book(idx)"
        >
          {{ slot.time }} - {{ slot.available ? 'Available' : 'Booked' }}
        </div>

        <!-- <button class="next">next</button> -->
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.book-container {
  max-width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: stretch;
  align-items: center;
  gap: 4rem;
  padding: 4rem 0;
}

.img-section {
  display: none;
}

.book-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  gap: 2rem;
  min-width: 50%;
  padding-top: 2rem;
  color: rgb(var(--color-text-1));

  h2 {
    color: rgb(var(--color-accent-1));
    font-size: 2rem;
  }

  & .time-slots {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    min-width: 100%;
    margin: 0 auto;

    & .time-slot {
      width: 100%;
      padding: 0.8rem 1rem;
      border: 1px solid rgb(var(--color-accent-1));
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      text-align: center;

      &:hover {
        background-color: rgb(var(--color-accent-1));
        color: rgb(var(--color-bg));
      }
    }

    & .time-slot--booked {
      border: 1px solid rgb(var(--color-text-3));
      color: rgb(var(--color-text-3));
      cursor: not-allowed;

      &:hover {
        background-color: rgb(var(--color-accent-2));
        color: rgb(var(--color-bg));
      }
    }
  }

  // .next {
  //   margin-top: 4rem;
  //   all: unset;
  //   color: rgb(var(--color-accent-1));
  //   padding: 1em 2em;
  //   border: 1px solid rgb(var(--color-accent-1));
  //   border-radius: 5px;
  //   text-align: center;
  //   display: inline-block;
  //   cursor: pointer;
  //   transition: all 0.3s ease-in-out;

  //   &:hover {
  //     background-color: rgb(var(--color-accent-1));
  //     color: rgb(var(--color-bg));
  //     scale: 1.05;
  //   }
  // }
}

/* MEDIA QUERIES */
@media (min-width: 350px) {
}

@media (min-width: 480px) {
}

@media (min-width: 768px) {
  .img-section {
    display: block;
    border-radius: 0.5rem;
    flex-grow: 1;
    align-self: stretch;
    margin-top: 2rem;
    background-image: url('~/assets/images/hero.jpeg');
    background-size: cover;
    background-position: center;
  }
}

@media (min-width: 992px) {
}

@media (min-width: 1200px) {
}
</style>

<!-- The date picker custom class can't be scoped styled -->
<style>
.dp-custom-menu {
  box-shadow: 0 0 .75rem rgb(var(--color-accent-1));
}
</style>
