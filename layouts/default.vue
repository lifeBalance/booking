<script setup></script>

<template>
  <div class="container">
    <Header />

    <main>
      <slot />
    </main>

    <Footer companyName="Gun Range Demo" />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#just-to-see-the-color-swatches {
  --color-bg: rgb(24, 24, 26);
  --color-bg-2: rgb(35, 38, 45);
  --color-text-1: rgb(255, 255, 255);
  --color-text-2: rgb(213, 220, 231);
  --color-text-3: rgb(96, 96, 94);
  --color-text-3: rgb(158, 158, 158);
  --color-accent-1: rgb(253, 230, 138);
  --color-accent-2: rgb(255, 0, 0);
  --color-accent-3: rgb(29, 137, 232);
}

html[data-theme='dark'] {
  --color-bg: 24, 24, 26;
  --color-bg-2: 35, 38, 45;
  --color-text-1: 255, 255, 255;
  --color-text-2: 213, 220, 231;
  --color-text-3: 96, 96, 94;
  --color-accent-1: 253, 230, 138;
  --color-accent-2: 255, 0, 0;
  --color-accent-3: 29, 137, 232;
  --page-width: 100%;
  --radius-default: 7px;
  --color-bg-modal: rgba(24, 24, 26, 0.9);
}

html[data-theme='light'] {
  --color-bg: 226 232 240;
  --color-bg-2: 213, 220, 231;
  --color-text-1: 35, 38, 45;
  --color-text-2: 71 85 105;
  --color-text-3: 158, 158, 158;
  --color-accent-1: 29, 137, 232;
  --color-accent-2: 255, 0, 0;
  --color-accent-3: 29, 137, 232;
  --page-width: 100%;
  --radius-default: 7px;
  --color-bg-modal: rgba(177, 177, 184, 0.9);
}

body {
  background-color: rgb(var(--color-bg));
}

.container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-height: 100vh;
  background-color: rgb(var(--color-bg));
  font-family: 'Inter', sans-serif;
}

main {
  flex: 1;
  /* display: flex;
  align-items: center;
  justify-content: center; */
}
</style>
