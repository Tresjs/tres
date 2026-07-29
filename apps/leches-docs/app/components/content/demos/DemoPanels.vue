<script setup lang="ts">
import { TresLeches, useControls } from '@tresjs/leches'

useControls({ exposure: 1 }, { uuid: 'demo-lighting' })
useControls('Camera', { fov: { value: 45, min: 10, max: 120, step: 1 } }, { uuid: 'demo-camera' })
</script>

<template>
  <div class="my-6 rounded-lg border border-default bg-muted/50 p-4">
    <ClientOnly>
      <div class="flex flex-wrap items-start gap-4">
        <div class="w-[280px] max-w-full shrink-0">
          <TresLeches uuid="demo-lighting" :float="false" />
        </div>
        <div class="w-[280px] max-w-full shrink-0">
          <TresLeches uuid="demo-camera" :float="false" />
        </div>
      </div>
      <template #fallback>
        <div class="h-28 animate-pulse rounded-md bg-elevated"></div>
      </template>
    </ClientOnly>
  </div>
</template>
