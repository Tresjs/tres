<script setup lang="ts">
import { TresLeches } from '@tresjs/leches'

const route = useRoute()
const uuid = `leches-${route.path.split('/').pop() || 'demo'}`

provide('uuid', uuid)
</script>

<template>
  <div class="w-full relative rounded-lg overflow-hidden border-1 border-muted dark:border-transparent my-8">
    <ClientOnly>
      <div class="aspect-video">
        <Suspense>
          <slot></slot>
        </Suspense>
      </div>
      <TresLeches
        :uuid="uuid"
        :float="false"
        class="!rounded-none"
      />
    </ClientOnly>
  </div>
</template>
