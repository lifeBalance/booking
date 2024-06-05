<script setup>
definePageMeta({
  layout: 'default',
  pageTransition: {
    name: 'slide',
    mode: 'out-in', // default
  },
})
</script>

<template>
  <div>
    <Hero />

    <Testimonials />

    <ContactForm />
  </div>
</template>
