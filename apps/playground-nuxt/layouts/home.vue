<script lang="ts" setup></script>

<template>
  <div>
    <TheHeader />
    <NuxtLoadingIndicator />
    <UMain>
      <slot />
    </UMain>
    <!-- <main
      class="bg-(--ui-bg) min-h-[calc(100vh-var(--ui-header-height))]"
    >
      <slot />
    </main> -->
  </div>
</template>

<style scoped></style>
