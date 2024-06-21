<script setup>
import '@vuepic/vue-datepicker/dist/main.css'
import VueDatePicker from '@vuepic/vue-datepicker'
import cockingSoundFile from '~/assets/sounds/gunreloading.m4a'
import shotSoundFile from '~/assets/sounds/gunshot.mp3'
import { useUserStore } from '~/stores'

// Call the user store to get the goodies
const userStore = useUserStore()

const router = useRouter()

// Get the user's login status as computed property (see comments in ModalNav.vue)
const isLoggedIn = computed(() => userStore.isLoggedIn())
console.log('book page - isLoggedIn', isLoggedIn.value)

if (!isLoggedIn.value) {
  router.push('/login')
}

// const { isDark } = useTheme()
// console.log('isDark (useTheme)', isDark.value)

// We can also pull global state from the store, using the "key" name (e.g. 'isDarkG')
const isDark = useState('isDarkG')
console.log('isDark (useState)', isDark.value)

definePageMeta({
  layout: 'default',
  pageTransition: {
    name: 'slide',
    mode: 'out-in', // default
  },
})

const date = ref(null)
const datePickerState = ref(true)
let booked = reactive({
  date: null,
  time: null,
})

// console.log('date', date)
const modalOpen = ref(false)

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

// When a date is set, reset the date picker state to true (no error)
watch(date, (newDate) => {
  console.log(newDate, date)
  if (newDate) datePickerState.value = true
})

function bookSlot(idx) {
  console.log('date', date)
  // Set error and early return if the user didn't select a date before slot
  if (date.value === null) {
    // Set error state in the date picker
    datePickerState.value = false
    return
  }

  if (slots.value[idx].available) {
    const cockingSound = new Audio(cockingSoundFile)
    cockingSound.play()
    // Safari doesn't have a 'vibrate', we gotta check otherwise it breaks.
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100)
    }

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
  router.push('/armory')
}
</script>

<template>
  <div class="booking-container">
    <Stepper activeStep="1" />

    <div class="booking-wrapper">
      <section class="img-section"></section>

      <section class="booking-section">
        <header>
          <h2>Book a Range</h2>
          <h3>Select Date and Time</h3>
        </header>

        <div class="picker">
          <VueDatePicker
            v-model="date"
            auto-apply
            :enable-time-picker="false"
            :dark="isDark"
            :ui="{
              // Custom class names
              calendarCell: 'dp__calendar_item',
            }"
            :state="datePickerState"
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
  </div>
</template>

<style lang="scss" scoped>
.booking-container {
  padding: 6rem 0 4rem;

  .booking-wrapper {
    display: flex;

    .img-section {
      display: none;
    }

    .booking-section {
      padding-top: 3rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      margin: 0 auto;
      color: rgb(var(--color-text-1));

      header {
        text-align: center;

        h2 {
          color: rgb(var(--color-accent-1));
          font-size: 2rem;
          padding-bottom: 1rem;
        }
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
          color: rgb(var(--color-accent-1));

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
    } // .booking-section
  }
}

/* MEDIA QUERIES */
@media (min-width: 350px) {
}

@media (min-width: 480px) {
}

@media (min-width: 768px) {
  .booking-container {
    width: 80%;

    .booking-wrapper {
      .img-section {
        display: block;
        border-radius: 0.5rem;
        width: 50%;
        align-self: stretch;
        margin-top: 2rem;
        background-image: url('~/assets/images/armory.jpg');
        background-size: cover;
        background-position: center;
      }
    }
  }
}

@media (min-width: 992px) {
}

@media (min-width: 1200px) {
}
</style>

<!-- The date picker custom class can't be scoped styled -->
<style lang="scss">
:root {
  /*General*/
  --dp-cell-border-radius: 2rem; /*Specific border radius for the cells*/
}
/* For the date picker to use dp__theme_dark, dark prop must be set to true. */
.dp__theme_dark {
  --dp-menu-border-color: rgb(var(--color-accent-1));
  --dp-success-color: rgb(var(--color-accent-1));
}

.dp__theme_light {
  --dp-menu-border-color: rgb(var(--color-accent-1));
  --dp-success-color: rgb(var(--color-accent-1));
}

.dp__calendar_item[aria-selected='true'] {
  .dp__active_date {
    background-color: rgb(var(--color-accent-1));
    color: rgb(var(--color-bg));
  }
}

.dp__today {
  border-color: rgb(var(--color-accent-1));
}
</style>
