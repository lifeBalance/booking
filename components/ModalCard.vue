<script setup>
const { title, date, time, cancelHandler, nextHandler } = defineProps([
  'title',
  'date',
  'time',
  'cancelHandler',
  'nextHandler',
])
</script>

<template>
  <header class="modal-card">
    <div class="modal-content">
      <h4>{{ title }}</h4>
      <p class="content">
        <Icon name="ph:calendar-check" class="icon" />{{ date }}
      </p>
      <p class="content"><Icon name="ph:clock" class="icon" />{{ time }}</p>
    </div>
    <div class="btn-box">
      <button class="btn btn-cancel" @click="cancelHandler">Cancel</button>
      <button class="btn" @click="nextHandler">Next</button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.modal-card {
  font-family: 'Inter', sans-serif;
  background-color: rgb(var(--color-bg));
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  padding: 1rem;
  border-radius: var(--radius-default);
  border: 0.5px solid rgba(var(--color-text-3), 0.9);
  color: white;
}

.modal-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h4 {
    text-align: center;
    font-size: 1.2rem;
    font-weight: 400;
    padding-bottom: 0.5rem;
    color: rgb(var(--color-accent-1));
  }

  p {
    margin-left: 4rem;
    color: rgb(var(--color-text-1));
  }

  .content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .icon {
    color: rgb(var(--color-text-3));
  }
}

.btn-box {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}

.btn {
  all: unset;
  color: rgb(var(--color-accent-1));
  padding: 0.5rem 2em;
  border: 1px solid rgb(var(--color-accent-1));
  border-radius: 5px;
  text-align: center;
  display: inline-block;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  min-width: 4rem;

  &:hover {
    background-color: rgb(var(--color-accent-1));
    color: rgb(var(--color-bg));
    scale: 1.05;
  }
}

.btn-cancel {
  color: rgb(var(--color-text-3));
  border: 1px solid rgb(var(--color-text-3));

  &:hover {
    background-color: transparent;
    color: rgb(var(--color-accent-2));
    border: 1px solid rgb(var(--color-accent-2));
  }
}

h4 {
  color: rgb(var(--color-text-2));
}

p {
  color: rgb(var(--color-text-1));
}
</style>
