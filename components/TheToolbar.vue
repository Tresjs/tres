<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <header class="fixed top-0 z-10 w-full bg-white dark:bg-dark bg-opacity-60 py-4 font-sans">
    <div class="px-4 sm:px-0 container mx-auto flex justify-between">
      <div class="flex items-center">
        <img
          src="/lab.svg"
          alt="Tres.js"
          class="h-3 mr-4"
        >
        <a
          class="font-bold"
          href="/"
          title="Home"
        >Lab</a>
      </div>
      <ul class="flex gap-4 justify-between items-center">
        <button
          title="Toggle dark mode"
          class="bg-transparent -mt-1"
          @click="toggleDark()"
        >
          <i
            v-if="isDark"
            class="i-carbon-sun"
          />
          <i
            v-else
            class="i-carbon-moon"
          />
        </button>
        <a
          href="https://tresjs.org/"
          target="_blank"
          class="i-carbon-document"
        />
        <a
          href="https://github.com/Tresjs/lab"
          target="_blank"
          class="i-carbon-logo-github"
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
