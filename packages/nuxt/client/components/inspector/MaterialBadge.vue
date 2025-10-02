<script setup lang="ts">
interface Props {
  material: unknown
  displayValue: string
}

defineProps<Props>()

/**
 * Check if value is a Material object
 */
function isMaterial(value: unknown): boolean {
  return value !== null
    && typeof value === 'object'
    && value.constructor?.name?.includes('Material')
}

/**
 * Get material color representation
 */
function getMaterialColor(material: unknown): string | null {
  if (!material || typeof material !== 'object') return null

  // Check for color property
  if ('color' in material && material.color && typeof material.color === 'object') {
    const color = material.color as { getHexString?: () => string }
    if ('getHexString' in color && typeof color.getHexString === 'function') {
      return `#${color.getHexString()}`
    }
  }

  return null
}

/**
 * Check if material is a "normal" material that should show gradient
 */
function isNormalMaterial(material: unknown): boolean {
  return material !== null
    && typeof material === 'object'
    && (material.constructor?.name === 'MeshNormalMaterial'
      || material.constructor?.name === 'MeshStandardMaterial'
      || material.constructor?.name === 'MeshBasicMaterial')
}

/**
 * Get color class for value type
 */
function getValueClass(value: unknown): string {
  if (typeof value === 'boolean') return 'text-blue-500'
  if (typeof value === 'number') return 'text-primary-500'
  if (typeof value === 'string') return 'text-red-500'
  if (typeof value === 'undefined') return 'text-gray-400'
  return 'text-gray-600'
}
</script>

<template>
  <UBadge
    v-if="isMaterial(material)"
    variant="soft"
    color="neutral"
    size="sm"
    class="flex items-center gap-1 ml-1"
  >
    <!-- Material color circle or gradient -->
    <div
      v-if="getMaterialColor(material)"
      class="w-3 h-3 rounded-full border border-gray-300 dark:border-gray-600"
      :style="{ backgroundColor: getMaterialColor(material)! }"
    />
    <!-- Normal material gradient -->
    <div
      v-else-if="isNormalMaterial(material)"
      class="w-3 h-3 rounded-full border border-gray-300 dark:border-gray-600"
      style="background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)"
    />
    <!-- Generic material icon -->
    <div
      v-else
      class="w-3 h-3 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700"
    />
    <span :class="getValueClass(material)">{{ displayValue }}</span>
  </UBadge>
</template>
