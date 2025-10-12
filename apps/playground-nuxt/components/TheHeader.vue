<script lang="ts" setup>
</script>

<template>
  <UHeader>
    <template #title>
      <div class="flex items-center">
        <img
          src="/logo.svg"
          alt="Tres.js"
          class="h-3 mr-4"
        >
        <a
          class="font-bold text-dark font-sans text-sm"
          href="/"
          title="Home"
        ><span class="text-primary-400">Nuxt</span> Playground</a>
      </div>
    </template>

    <template #right>
      <UColorModeButton />

      <UTooltip
        text="Open on GitHub"
        :kbds="['meta', 'G']"
      >
        <UButton
          color="neutral"
          variant="ghost"
          to="https://github.com/nuxt/ui"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
        />
      </UTooltip>
    </template>
  </UHeader>
</template>
