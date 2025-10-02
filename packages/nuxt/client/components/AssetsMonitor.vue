<script setup lang="ts">
import { computed } from '#imports'
import { useDevtoolsHook } from '../composables/useDevtoolsHook'

const { scene } = useDevtoolsHook()

// Store geometry previews

// Group assets by type
const groupedAssets = computed(() => {
  const assets = scene.assets || []
  return {
    textures: assets.filter(asset => asset.type === 'texture'),
    materials: assets.filter(asset => asset.type === 'material'),
    models: assets.filter(asset => asset.type === 'model'),
  }
})

// Asset statistics
const assetStats = computed(() => {
  const assets = scene.assets || []
  const totalMemory = assets.reduce((sum, asset) => sum + (asset.usage || 0), 0)

  return {
    total: assets.length,
    textures: groupedAssets.value.textures.length,
    materials: groupedAssets.value.materials.length,
    models: groupedAssets.value.models.length,
    totalMemory: Math.round(totalMemory),
  }
})

// Get icon for asset type
const getAssetIcon = (type: string) => {
  switch (type) {
    case 'texture':
      return 'i-tabler:photo'
    case 'geometry':
      return 'i-tabler:box'
    case 'material':
      return 'i-tabler:palette'
    case 'model':
      return 'i-tabler:burger'
    default:
      return 'i-tabler:file'
  }
}

// Get color for asset type
const getAssetColor = (type: string) => {
  switch (type) {
    case 'texture':
      return 'purple'
    case 'geometry':
      return 'blue'
    case 'material':
      return 'orange'
    default:
      return 'gray'
  }
}
</script>

<template>
  <div class="pb-6">
    <!-- Assets Overview Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 pb-4">
      <UCard>
        <div class="text-center">
          <div class="font-bold text-gray-900 dark:text-white">
            {{ assetStats.total }}
          </div>
          <div class="text-sm">
            Total Assets
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="text-center">
          <div class="flex items-center justify-center gap-2 mb-1">
            <UIcon
              name="i-tabler:photo"
              class="w-5 h-5"
            />
            <div class="font-bold ">
              {{ assetStats.textures }}
            </div>
          </div>
          <div class="text-sm">
            Textures
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="text-center">
          <div class="flex items-center justify-center gap-2 mb-1">
            <UIcon
              name="i-tabler:burger"
              class="w-5 h-5"
            />
            <div class="font-bold">
              {{ assetStats.models }}
            </div>
          </div>
          <div class="text-sm">
            Models
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="text-center">
          <div class="flex items-center justify-center gap-2 mb-1">
            <UIcon
              name="i-tabler:database"
              class="w-5 h-5"
            />
            <!-- <div class="font-bold">
              {{ formatMemorySize(assetStats.totalMemory) }}
            </div> -->
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">
            Memory Used
          </div>
        </div>
      </UCard>
    </div>

    <!-- Assets Grid -->
    <div v-if="scene.assets && scene.assets.length > 0">
      <!-- Textures -->
      <div
        v-if="groupedAssets.textures.length > 0"
        class="pb-4"
      >
        <div class="flex items-center gap-2 my-2 mb-4">
          <UIcon
            name="i-tabler:photo"
            class="w-5 h-5"
          />
          <h3 class="font-semibold">
            Textures
          </h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <TextureAssetCard
            v-for="asset in groupedAssets.textures"
            :key="asset.id"
            :asset="asset"
          />
        </div>
      </div>

      <!-- Models -->

      <div
        v-if="groupedAssets.models.length > 0"
        class="pb-4"
      >
        <div class="flex items-center gap-2 my-2 mb-4">
          <UIcon
            name="i-tabler:burger"
            class="w-5 h-5"
          />
          <h3 class="text-lg font-semibold">
            Models
          </h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <ModelAssetCard
            v-for="asset in groupedAssets.models"
            :key="asset.id"
            :asset="asset"
          />
        </div>
      </div>

      <!-- Materials -->
      <div
        v-if="groupedAssets.materials.length > 0"
        class="pb-4"
      >
        <div class="flex items-center gap-2 my-2 mb-4">
          <UIcon
            name="i-tabler:palette"
            class="w-5 h-5"
          />
          <h3 class="text-lg font-semibold">
            Materials
          </h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <UCard
            v-for="asset in groupedAssets.materials"
            :key="asset.id"
            class="hover:shadow-md transition-shadow"
          >
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon
                  :name="getAssetIcon(asset.type)"
                  class="w-4 h-4"
                  :class="`text-${getAssetColor(asset.type)}-500`"
                />
                <div class="text-sm font-medium truncate">
                  {{ asset.name }}
                </div>
              </div>
            </template>

            <div class="pb-2 text-sm">
              <div
                v-if="asset.format"
                class="flex justify-between"
              >
                <span class="text-gray-600 dark:text-gray-400">Type:</span>
                <span>{{ asset.format }}</span>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <UCard v-else>
      <div class="text-center py-8">
        <UIcon
          name="i-tabler:file-x"
          class="w-12 h-12 text-gray-400 mx-auto mb-4"
        />
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          No Assets Found
        </h3>
        <p class="text-gray-600 dark:text-gray-400">
          No textures, geometries, or materials detected in the current scene.
        </p>
      </div>
    </UCard>
  </div>
</template>
