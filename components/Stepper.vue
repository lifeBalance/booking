<script setup>
const steps = [{ position: 1 }, { position: 2 }, { position: 3 }]
const { activeStep } = defineProps(['activeStep'])
</script>

<template>
  <section>
    <div class="stepper">
      <div
        class="step"
        v-for="step, idx in steps"
        :class="{
          active: activeStep == step.position,
          completed: step.position < activeStep,
        }"
      >
        <span
          :class="{ active: activeStep == step.position }"
          v-if="step.position >= activeStep"
          >{{ step.position }}</span
        >
        <span class="completed" v-else
          ><Icon name="ph:check" class="icon"
        /></span>
      </div>

      <div class="line"></div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  position: relative;

  & .stepper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 30%;
  }

  & .line {
    position: absolute;
    top: 50%;
    transform: translateY(-100%);
    border-bottom: 1px dotted rgb(var(--color-text-3));
    margin: 0 1rem;
    width: 95%;
  }

  & .step {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    background-color: rgb(var(--color-text-3));
    color: rgb(var(--color-bg));
    border-radius: 50%;
    z-index: 1;

    &.completed,
    &.active {
      background-color: rgb(var(--color-bg));
      border: 1px solid rgb(var(--color-accent-1));
      color: rgb(var(--color-accent-1));
    }
  }
}
</style>
