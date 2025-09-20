<script setup lang="ts">
import { computed } from '#imports'
import { useDevtoolsHook } from '../composables/useDevtoolsHook'
import { bytesToKB } from '../utils'

const { fps, memory, renderer } = useDevtoolsHook()

// Computed values for better UX
const performanceStatus = computed(() => {
  if (fps.value >= 50) return { color: 'primary', label: 'Excellent' }
  if (fps.value >= 30) return { color: 'warning', label: 'Good' }
  return { color: 'error', label: 'Poor' }
})

const memoryStatus = computed(() => {
  const currentMB = memory.currentMem
  if (currentMB < 100) return { color: 'primary', label: 'Low' }
  if (currentMB < 500) return { color: 'warning', label: 'Moderate' }
  return { color: 'error', label: 'High' }
})
</script>

<template>
  <div class="space-y-6">
    <!-- Performance Overview Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- FPS Monitor -->
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <UIcon
                name="i-tabler:activity"
                class="w-5 h-5"
              />
              <h3 class="text-sm font-semibold">
                Frame Rate
              </h3>
            </div>
            <UBadge
              :color="performanceStatus.color"
              variant="soft"
              size="sm"
            >
              {{ performanceStatus.label }}
            </UBadge>
          </div>
        </template>

        <div class="space-y-4">
          <DevtoolsGraph
            :points="fps.accumulator"
            :value="fps.value"
            color="primary"
            unit="FPS"
            label="FPS"
          />
        </div>
      </UCard>

      <!-- Memory Monitor -->
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <UIcon
                name="i-tabler:cpu"
                class="w-5 h-5"
              />
              <h3 class="text-sm font-semibold">
                Memory Usage
              </h3>
            </div>
            <UBadge
              :color="memoryStatus.color"
              variant="soft"
              size="sm"
            >
              {{ memoryStatus.label }}
            </UBadge>
          </div>
        </template>

        <div class="space-y-4">
          <DevtoolsGraph
            :points="memory.accumulator"
            :value="memory.currentMem"
            color="warning"
            unit="MB"
            label="Memory"
          />

          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div class="text-gray-600 dark:text-gray-400">
                Current
              </div>
              <div class="font-mono font-semibold">
                {{ Math.round(memory.currentMem) }} MB
              </div>
            </div>
            <div>
              <div class="text-gray-600 dark:text-gray-400">
                Peak
              </div>
              <div class="font-mono font-semibold">
                {{ Math.round(memory.maxMemory) }} MB
              </div>
            </div>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Detailed Statistics -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Memory Details -->
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon
              name="i-tabler:database"
              class="w-5 h-5"
            />
            <h3 class="font-semibold">
              Memory Details
            </h3>
          </div>
        </template>

        <div class="space-y-4">
          <!-- GPU Memory Stats -->
          <div class="grid grid-cols-2 gap-4">
            <div class="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div class="flex items-center justify-center gap-2 mb-2">
                <UIcon
                  name="i-tabler:box"
                  class="w-5 h-5"
                />
                <span class="font-mono text-sm font-bold">{{ renderer.info?.memory?.geometries || 0 }}</span>
              </div>
              <div class="text-xs text-gray-600 dark:text-gray-400">
                Geometries
              </div>
            </div>

            <div class="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div class="flex items-center justify-center gap-2 mb-2">
                <UIcon
                  name="i-tabler:photo"
                  class="w-5 h-5"
                />
                <span class="font-mono text-sm font-bold">{{ renderer.info?.memory?.textures || 0 }}</span>
              </div>
              <div class="text-xs text-gray-600 dark:text-gray-400">
                Textures
              </div>
            </div>
          </div>

          <!-- Memory Info -->
          <UAlert
            icon="i-tabler:info-circle"
            color="primary"
            variant="soft"
            title="Memory Allocation"
            :description="`Approximately ${bytesToKB(memory.allocatedMem)} KB allocated by 3D objects`"
          />
        </div>
      </UCard>

      <!-- Render Statistics -->
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon
              name="i-tabler:chart-bar"
              class="w-5 h-5"
            />
            <h3 class="font-semibold">
              Render Statistics
            </h3>
          </div>
        </template>

        <div class="grid grid-cols-2 gap-3">
          <div class="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div class="flex items-center justify-center gap-2 mb-2">
              <UIcon
                name="i-tabler:refresh"
                class="w-4 h-4 text-primary-500"
              />
              <span class="font-mono font-bold">{{ renderer?.info?.render?.calls || 0 }}</span>
            </div>
            <div class="text-xs text-gray-600 dark:text-gray-400">
              Draw Calls
            </div>
          </div>

          <div class="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div class="flex items-center justify-center gap-2 mb-2">
              <UIcon
                name="i-tabler:triangle"
                class="w-4 h-4 text-orange-500"
              />
              <span class="font-mono font-bold">{{ renderer?.info?.render?.triangles || 0 }}</span>
            </div>
            <div class="text-xs text-gray-600 dark:text-gray-400">
              Triangles
            </div>
          </div>

          <div class="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div class="flex items-center justify-center gap-2 mb-2">
              <UIcon
                name="i-tabler:point"
                class="w-4 h-4 text-blue-500"
              />
              <span class="font-mono font-bold">{{ renderer?.info?.render?.points || 0 }}</span>
            </div>
            <div class="text-xs text-gray-600 dark:text-gray-400">
              Points
            </div>
          </div>

          <div class="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div class="flex items-center justify-center gap-2 mb-2">
              <UIcon
                name="i-tabler:line"
                class="w-4 h-4 text-red-500"
              />
              <span class="font-mono font-bold">{{ renderer?.info?.render?.lines || 0 }}</span>
            </div>
            <div class="text-xs text-gray-600 dark:text-gray-400">
              Lines
            </div>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Programs Section -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon
            name="i-tabler:code"
            class="w-5 h-5"
          />
          <h3 class="font-semibold">
            Shader Programs
          </h3>
        </div>
      </template>

      <ProgramsModule />
    </UCard>
  </div>
</template>
