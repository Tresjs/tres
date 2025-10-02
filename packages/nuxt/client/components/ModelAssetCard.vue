<script setup lang="ts">
import { formatMemorySize } from '~/utils/assets'
import type { AssetInfo } from '../utils/assets'

defineProps<{
  asset: AssetInfo
}>()
</script>

<template>
  <UCard
    :key="asset.id"
    class="hover:shadow-md transition-shadow"
  >
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon
          name="i-tabler:burger"
          class="w-4 h-4"
        />
        <div class="text-sm font-medium truncate">
          {{ asset.source }}
        </div>
      </div>
    </template>

    <div class="pb-3">
      <!-- Texture Preview -->
      <div
        v-if="asset.preview"
        class="w-full h-32 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden"
      >
        <img
          :src="asset.preview"
          :alt="asset.name"
          class="w-full h-full object-contain"
        >
      </div>

      <!-- Fallback for textures without preview -->
      <div
        v-else
        class="w-full h-32 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center"
      >
        <UIcon
          name="i-tabler:photo-off"
          class="w-8 h-8 text-gray-400"
        />
      </div>

      <div class="flex flex-col gap-1 py-2 text-sm">
        <div
          v-if="asset.format"
          class="flex justify-between"
        >
          <span class="text-gray-600 dark:text-gray-400 font-semibold">Format</span>
          <span>{{ asset.format }}</span>
        </div>

        <div
          v-if="asset.usage"
          class="flex justify-between"
        >
          <span class="text-gray-600 dark:text-gray-400 font-semibold">Memory</span>
          <span class="font-mono">{{ formatMemorySize(asset.usage) }}</span>
        </div>
      </div>
    </div>
  </UCard>
</template>
