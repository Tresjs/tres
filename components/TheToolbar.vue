<script lang="ts" setup>
import Logo from '/assets/logo.svg'
</script>

<template>
  <header class="fixed top-0 z-10 w-full bg-white bg-opacity-60 py-4">
    <div class="px-4 sm:px-0 container mx-auto flex justify-between">
      <div class="flex items-center">
        <Logo class="mr-8" />
        <a
          class="font-bold"
          href="/"
          title="Home"
        >Playground</a>
      </div>
      <ul class="flex justify-between w-50px">
        <a
          href="https://tresjs.org/"
          target="_blank"
          class="i-carbon-document"
        />
        <a
          href="https://github.com/Tresjs/playground"
          target="_blank"
          class="i-logos-github-icon"
        />
      </ul>
    </div>
  </header>
</template>

<style scoped>
header {
  backdrop-filter: blur(10px);
}
</style>
