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
  border-radius: var(--radius-default);
  color: white;
  min-height: 12rem;
  transition: all 0.3s ease-in-out;
}

.card:hover {
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  scale: 1.01;
}

.testimonial {
  font-style: italic;
  position: relative;
  transform-style: preserve-3d;
  text-indent: 5%;
  padding-top: 1rem;
  padding-left: 5rem;
  background-color: transparent;
}

.testimonial::after {
  content: '“';
  font-family: 'Arial', serif;
  font-size: 12rem;
  color: rgba(var(--color-text-3), 0.5);
  position: absolute;
  top: -8rem;
  left: -1rem;
  transform: translateZ(-1px) scaleY(-1);
  z-index: -2;
  width: 25%;
}

.person {
  display: flex;
  gap: 1rem;
}

.pic {
  border-radius: 50%;
  width: 25%;
  height: auto;
}

.author {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  h4 {
    color: rgb(var(--color-text-2));
    margin-bottom: 0.5rem;
  }

  p {
    color: rgb(var(--color-text-3));
    margin-bottom: 0.5rem;
  }
}
</style>
