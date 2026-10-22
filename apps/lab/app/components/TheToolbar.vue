<template>
  <div class="flex items-center">
    <UColorModeButton size="xs" />
    <UTooltip text="Open on GitHub">
      <UButton
        color="neutral"
        variant="ghost"
        size="xs"
        to="https://github.com/Tresjs/tres/tree/main/apps/lab"
        target="_blank"
        icon="i-simple-icons-github"
        aria-label="GitHub"
      />
    </UTooltip>
  </div>
</template>
