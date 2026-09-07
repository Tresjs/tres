<script setup lang="ts">
import { TresLeches } from '@tresjs/leches'

const route = useRoute()
const uuid = `leches-${route.path.split('/').pop()}`

provide(`uuid`, uuid)

const { demoData, sourceUrl, showSource, sourceMarkdown } = useDemoSource()
</script>

<template>
  <div class="w-full">
    <ClientOnly>
      <div class="aspect-video overflow-hidden rounded-lg border-1 border-muted dark:border-transparent">
        <slot></slot>
      </div>
      <TresLeches :uuid="uuid" :float="false" class="!rounded-none" />
    </ClientOnly>

    <div class="flex items-center justify-between px-2 py-1.5">
      <USwitch
        v-model="showSource"
        label="View source"
        size="sm"
      />

      <a
        v-if="sourceUrl"
        :href="sourceUrl"
        target="_blank"
        rel="noopener"
        aria-label="View source on GitHub"
        class="flex items-center justify-center w-7 h-7 rounded-full bg-white/50 dark:bg-black/50 text-black dark:text-white hover:bg-white/80 dark:hover:bg-black/80 transition-colors"
      >
        <Icon name="i-lucide-external-link" class="w-4 h-4" />
      </a>
    </div>

    <div v-show="showSource" class="source-view aspect-video">
      <MDC
        v-if="sourceMarkdown"
        :value="sourceMarkdown"
        class="h-full [&_.group]:h-full [&_.group]:!my-0 [&_pre]:h-full [&_pre]:!my-0 [&_pre]:pr-12 [&_pre]:overflow-hidden [&_pre]:overflow-y-auto"
      />
      <pre v-else class="text-sm p-4 text-white/80">{{ demoData?.raw || '…' }}</pre>
    </div>
  </div>
</template>
