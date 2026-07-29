<script setup lang="ts">
import { TresLeches } from '@tresjs/leches'

defineProps<{ uuid: string, bg?: string }>()
</script>

<template>
  <div
    class="my-6 rounded-lg border border-default bg-muted/50 p-4 transition-colors duration-300"
    :style="bg ? { backgroundColor: bg } : undefined"
  >
    <ClientOnly>
      <div class="flex flex-wrap items-start gap-4">
        <div class="w-[280px] max-w-full shrink-0">
          <TresLeches :uuid="uuid" :float="false" />
        </div>
        <div v-if="$slots.default" class="min-w-40 flex-1 pt-1 font-mono text-xs leading-relaxed text-muted">
          <slot></slot>
        </div>
      </div>
      <template #fallback>
        <div class="h-28 animate-pulse rounded-md bg-elevated"></div>
      </template>
    </ClientOnly>
  </div>
</template>
