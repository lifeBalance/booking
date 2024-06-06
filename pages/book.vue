<script setup>
import '@vuepic/vue-datepicker/dist/main.css'
import VueDatePicker from '@vuepic/vue-datepicker'
import cockingSoundFile from '~/assets/sounds/gunreloading.m4a'
import shotSoundFile from '~/assets/sounds/gunshot.mp3'

const router = useRouter()

definePageMeta({
  layout: 'default',
  pageTransition: {
    name: 'slide',
    mode: 'out-in', // default
  },
})

const date = ref(new Date())
let booked = reactive({
  date: null,
  time: null,
})

console.log('date', date)
const modalOpen = ref(false)
const modalText = computed(() => {
  return `You are about to book a range for ${booked.date} at ${booked.time}`
})

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

function bookSlot(idx) {
  if (slots.value[idx].available) {
    const cockingSound = new Audio(cockingSoundFile)
    cockingSound.play()
    navigator.vibrate(200) // vibrate for 200ms

    // Set the booked date and time (websocket call)
    booked = {
      date: date.value.toDateString(),
      time: slots.value[idx].time,
    }

    // We have to do this to trigger the reactivity
    slots.value = [...slots.value]
    setTimeout(() => {
      openModal()
    }, 1000)
  }
}

function freeSlot() {
  setTimeout(() => {
    for (let slot of slots.value) {
      if (slot.time === booked.time) {
        slot.available = true
        console.log(`slot ${booked.time} is now available`)
        booked.time = null
        break
      }
    }
    slots.value = [...slots.value]
  }, 1000)
}

const openModal = () => {
  console.log('Header: clicked on time slot')
  modalOpen.value = true
  document.body.style.overflow = 'hidden' // Prevent scrolling
}

const handleCloseModal = () => {
  console.log('Header: clicked on modal overlay')
  modalOpen.value = false
  document.body.style.overflow = 'auto' // Allow scrolling
}

const handleCancel = () => {
  console.log('Header: clicked on cancel button')
  modalOpen.value = false
  document.body.style.overflow = 'auto' // Allow scrolling
  freeSlot()
}

const handleNext = () => {
  console.log('Header: clicked on next button')
  const shotSound = new Audio(shotSoundFile)
  shotSound.play()
  modalOpen.value = false
  document.body.style.overflow = 'auto' // Allow scrolling
  router.push('/')
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
          :class="{
            'time-slot--booked': !slot.available && !booked.time,
            'time-slot--booking': slot.available && booked.time === slot.time,
          }"
          v-for="(slot, idx) of slots"
          :data-available="slot.available"
          @click="bookSlot(idx)"
        >
          {{ slot.time }} - {{ slot.available ? 'Available' : 'Booked' }}
        </div>

        <!-- <button class="next">next</button> -->
        <Modal :modalOpen="modalOpen" @closeModal="handleCloseModal">
          <ModalCard
            title="You're about to book a range:"
            :date="booked.date"
            :time="booked.time"
            :cancelHandler="handleCancel"
            :nextHandler="handleNext"
          />
        </Modal>
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

      &:hover,
      &:active {
        background-color: transparent;
        color: rgb(var(--color-text-3));
      }
    }

    & .time-slot--booking {
      border: 1px solid rgb(var(--color-accent-1));
      color: rgb(var(--color-bg));
      background-color: rgb(var(--color-accent-1));
      cursor: not-allowed;
    }
  }
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
  box-shadow: 0 0 0.75rem rgb(var(--color-accent-1));
}
</style>
