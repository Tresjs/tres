<script lang="ts" setup></script>

<template>
  <div>
    <TheHeader />
    <NuxtLoadingIndicator />
    <div class="pattern-bg">
      <UContainer class="pt-56px">
        <main
          class="bg-(--ui-bg) border-x border-gray-100 dark:border-gray-800 min-h-[calc(100vh-var(--ui-header-height))]">
          <slot />
        </main>
      </UContainer>
    </div>
  </div>
</template>

<style scoped></style>
