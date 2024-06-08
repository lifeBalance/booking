<script setup>
const router = useRouter()
import cockingSoundFile from '~/assets/sounds/gunreloading.m4a'

function handleBookGun() {
  const cockingSound = new Audio(cockingSoundFile)
  cockingSound.play()
  navigator.vibrate(200) // vibrate for 200ms
  setTimeout(() => {
    router.push('/')
  }, 1000)
}
</script>

<template>
  <section>
    <div class="armory-pic">
      <!-- <img src="~/assets/images/armory.jpeg" alt="weapons" /> -->
    </div>

    <div class="armory-content">
      <h2>Need a Weapon?</h2>
      <p>
        Book a weapon if you need one, or skip if you prefer to bring your own.
      </p>

      <div class="armory">
        <div class="btn" @click="handleBookGun">
          <p>pistol</p>
          <PistolIcon class="svg-icon" />
        </div>

        <div class="btn" @click="handleBookGun">
          <p>revolver</p>
          <RevolverIcon class="svg-icon" />
        </div>

        <div class="btn" @click="handleBookGun">
          <p>semi</p>
          <AkIcon class="svg-icon" />
        </div>

        <div class="btn" @click="handleBookGun">
          <p>rifle</p>
          <ShotgunIcon class="svg-icon" />
        </div>

        <div class="btn" @click="handleBookGun">
          <p>auto</p>
          <AkIcon class="svg-icon" />
        </div>

        <div class="btn" @click="handleBookGun">
          <p>I'll bring my own</p>
          <ShotgunIcon class="svg-icon" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 1fr;
  max-width: 80%;
  margin: 0 auto;
  margin-top: 4rem;
  gap: 1rem;
}

// img {
//   width: 100%;
// }

.armory-pic {
  display: none;
}

.armory-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  //   border: 1px solid aqua;

  & h2 {
    color: rgb(var(--color-accent-1));
    font-size: 2rem;
    letter-spacing: 0.75px;
  }

  & p {
    color: rgb(var(--color-text-1));
    line-height: 1.3;
    letter-spacing: 0.6px;
  }

  & .armory {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    & .btn {
      border: 1px solid rgb(var(--color-accent-1));
      border-radius: 7px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: start;
      padding: 0.5rem 1rem;
      cursor: pointer;
      position: relative;
      transition: all 0.3s ease;
      height: 15%;

      &:hover {
        background-color: rgba(var(--color-accent-1), 0.1);
        scale: 1.01;

        & p {
          color: rgb(var(--color-text-1));
        }
      }

      & p {
        position: absolute;
        text-transform: uppercase;
        bottom: 1rem;
        right: 1rem;
        color: rgb(var(--color-text-2));
        font-weight: 600;
        letter-spacing: 0.8px;
      }

      & .svg-icon {
        fill: rgb(var(--color-text-3));
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
    grid-template-columns: 1fr 1fr;
  }

  .armory-pic {
    display: block;
    background-image: url('~/assets/images/armory.jpeg');
    min-height: 100%;
    background-size: cover;
    background-position: center;
    border-radius: 7px;
  }
}

@media (min-width: 992px) {
}

@media (min-width: 1200px) {
}
</style>
