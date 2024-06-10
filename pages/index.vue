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

    <LogoCarousel />

    <Testimonials />

    <ContactForm />
  </div>
</template>
