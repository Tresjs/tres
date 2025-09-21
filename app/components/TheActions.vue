<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import type { Page } from '~/app/types'

defineProps<{
  page: Page
}>()

const isDark = useDark()
const visible = ref(true)
const openInfo = ref(false)
const toggleDark = useToggle(isDark)

defineShortcuts({
  i: () => {
    openInfo.value = !openInfo.value
  },
  h: () => {
    visible.value = !visible.value
  }
})
</script>
<template>
  <UButtonGroup v-if="visible" size="sm">
    <TheCodeButton />
    <USlideover v-model:open="openInfo" size="lg" :title="page.title" :ui="{
      content: 'max-w-2xl'
    }">
      <UButton :icon="'i-carbon-document'" color="neutral" variant="subtle" />
      <template #title>
        <div class="flex items-center gap-8">
          <h2 class="text-2xl font-bold">{{ page.title }}</h2>
          <UAvatarGroup size="xs">
            <UTooltip v-for="author in page.authors" :key="author.slug" :text="author.name">
              <UAvatar :src="author.avatar" :alt="author.name" />
            </UTooltip>
          </UAvatarGroup>
        </div>
      </template>
      <template #body>
        <ContentRenderer :value="page" />
      </template>
    </USlideover>
    <UButton variant="subtle" color="neutral" :icon="isDark ? 'i-carbon-sun' : 'i-carbon-moon'" class="rounded-full"
      @click="toggleDark()" />
  </UButtonGroup>
</template>