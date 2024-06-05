<script setup>
const { img, name, text, testimonial } = defineProps([
  'img',
  'name',
  'text',
  'testimonial',
])
</script>

<template>
  <li class="card">
    <p class="testimonial">{{ testimonial }}</p>

    <div class="person">
      <img :src="img" :alt="`Photo of ${name}`" class="pic" />

      <div class="author">
        <h4>{{ name }}</h4>
        <p>{{ text }}</p>
      </div>
    </div>
  </li>
</template>

<style lang="scss" scoped>
.card {
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  background-color: #23262d;
  padding: 1rem;
  border-radius: 7px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  color: white;
  min-height: 12rem;
}

.testimonial {
  font-style: italic;
  position: relative;
  transform-style: preserve-3d;
}

.testimonial::after {
  content: '“';
  transform: scaleY(-1);
  font-family: 'Arial', serif;
  font-size: 14rem;
  color: rgba(var(--color-text-3), 0.5);
  position: absolute;
  top: -10rem;
  left: -1rem;
  transform: translateZ(-1px) scaleY(-1);
}

.person {
  display: flex;
  gap: 1rem;
}

.pic {
  border-radius: 50%;
  width: 15%;
  height: auto;
}

.author {
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  h4 {
    color: rgb(var(--color-text-2));
  }

  p {
    color: rgb(var(--color-text-3));
  }
}
</style>
