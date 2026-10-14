<script setup lang="ts">
import { TresLeches, useControls } from '@tresjs/leches'

useControls({ exposure: 1 }, { uuid: 'demo-lighting' })
useControls('Camera', { fov: { value: 45, min: 10, max: 120, step: 1 } }, { uuid: 'demo-camera' })
</script>

<template>
  <div class="my-6 flex min-h-[400px] items-center justify-center rounded-lg border border-default bg-muted/50 pattern-dot-bg p-8">
    <ClientOnly>
      <div class="flex flex-wrap items-start justify-center gap-6">
        <div class="w-[280px] max-w-full shrink-0">
          <TresLeches uuid="demo-lighting" :float="false" />
        </div>
        <div class="w-[280px] max-w-full shrink-0">
          <TresLeches uuid="demo-camera" :float="false" />
        </div>
      </div>
      <template #fallback>
        <div class="h-28 w-[280px] max-w-full animate-pulse rounded-md bg-elevated"></div>
      </template>
    </ClientOnly>
  </div>
</template>
