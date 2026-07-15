<script setup lang="ts">
import { TresLeches } from '@tresjs/leches'

const route = useRoute()

const uuid = `leches-${route.path.split('/').pop()}`

provide(`uuid`, uuid)
</script>

<template>
  <div class="w-full relative rounded-lg overflow-hidden border-1 border-muted dark:border-transparent">
    <ClientOnly>
      <div class="aspect-video">
        <slot></slot>
      </div>
      <TresLeches :uuid="uuid" :float="false" class="!rounded-none" />
    </ClientOnly>
  </div>
</template>
