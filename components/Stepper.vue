<script setup>
const steps = [{ position: 1 }, { position: 2 }, { position: 3 }]
const { activeStep } = defineProps(['activeStep'])
</script>

<template>
  <section>
    <div class="stepper">
      <ul class="step-list">
        <li v-for="(step, idx) in steps">
          <span
            :class="{
              active: activeStep == step.position,
              completed: step.position < activeStep,
            }"
            v-if="step.position < activeStep"
          >
            <Icon name="ph:check" class="icon" />
          </span>

          <span
            :class="{
              active: activeStep == step.position,
              completed: step.position < activeStep,
            }"
            v-else
          >
            {{ step.position }}
          </span>

          <div
            v-if="idx < steps.length - 1"
            class="line"
            :class="{ completed: step.position < activeStep }"
          >
            <hr />
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.step-list {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  list-style: none;
}

li {
  display: flex;
  justify-content: center;
  align-items: center;
}

// Default styling for the spans
span {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  background-color: rgb(var(--color-text-3));
  color: rgb(var(--color-bg));
  border-radius: 50%;
}

span.completed,
span.active {
  background-color: rgb(var(--color-bg));
  border: 1px solid rgb(var(--color-accent-1));
  color: rgb(var(--color-accent-1));
}

li:not(:last-child) {
  flex: 1;

  & div.line {
    flex: 1;
    margin: 0 0.2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    & hr {
      flex: 1;
      border: 1px solid rgb(var(--color-text-3));
    }

    &.completed hr {
      border: 1px solid rgb(var(--color-accent-1));
    }
  }
}
</style>
