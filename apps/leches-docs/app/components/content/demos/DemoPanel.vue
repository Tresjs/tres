<script setup lang="ts">
import { TresLeches } from '@tresjs/leches'

defineProps<{ uuid: string, bg?: string }>()
</script>

<template>
  <div
    class="my-6 flex min-h-[400px] items-center justify-center rounded-lg border border-default bg-muted/50 pattern-dot-bg p-8 transition-colors duration-300"
    :style="bg ? { backgroundColor: bg } : undefined"
  >
    <ClientOnly>
      <div class="flex w-full flex-wrap items-center justify-center gap-6">
        <div class="w-[280px] max-w-full">
          <TresLeches :uuid="uuid" :float="false" />
        </div>
        <div
          v-if="$slots.default"
          class="max-w-full rounded-md border border-default bg-default px-3 py-1.5 font-mono text-xs leading-relaxed text-muted"
        >
          <slot></slot>
        </div>
      </div>
      <template #fallback>
        <div class="h-28 w-[280px] max-w-full animate-pulse rounded-md bg-elevated"></div>
      </template>
    </ClientOnly>
  </div>
</template>
