<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')
</script>

<template>
  <div class="bg-pattern px-8 w-full ">
    <UPage class="bg-default border-l border-r border-gray-200 dark:border-gray-800 px-4">
      <template #left>
        <UPageAside>
          <UContentNavigation
            class="pr-4"
            highlight
            :navigation="navigation"
          />
        </UPageAside>
      </template>
      <slot />
    </UPage>
  </div>
</template>
