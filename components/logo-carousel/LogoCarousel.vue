<script setup></script>

<template>
  <section class="logos">
    <div class="logos-slide">
      <GlockLogo />
      <BerettaLogo />
      <SigSauerLogo />
      <MPLogo />
    </div>

    <div class="logos-slide">
      <GlockLogo />
      <BerettaLogo />
      <SigSauerLogo />
      <MPLogo />
    </div>

    <div class="logos-slide">
      <GlockLogo />
      <BerettaLogo />
      <SigSauerLogo />
      <MPLogo />
    </div>
  </section>
</template>

<style>
.logos {
  margin: 2rem 0;
  white-space: nowrap;
  overflow: hidden;
  padding: 0.5rem 0;
}

.logos:hover .logos-slide {
  animation-play-state: paused;
}

.logos-slide {
  animation: 18s slide infinite linear;
  display: inline-block;
}

.logos-slide > * {
  /* border: 1px solid greenyellow; */
  height: 5rem;
  width: 15rem;
  fill: rgba(var(--color-text-2));
}

@keyframes slide {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>
