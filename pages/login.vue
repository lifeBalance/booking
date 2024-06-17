<script setup>
onMounted(() => {
  const mainNavSticky = useState('stickyNav')
  mainNavSticky.value = true

  console.log('login page mounted - header sticky?', mainNavSticky.value)
})

const accessType = ref('login')

const switchAccessType = (type) => {
  console.log('switching access type to', type)
  accessType.value = type
}
</script>

<template>
  <section>
    <Login v-if="accessType === 'login'" :switchAccessType="switchAccessType" />
    <SignUp v-else-if="accessType === 'signUp'" :switchAccessType="switchAccessType" />
    <Reset v-else-if="accessType === 'reset'" :switchAccessType="switchAccessType" />
  </section>
</template>

<style lang="scss" scoped>
section {
  margin-top: 2rem;
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
