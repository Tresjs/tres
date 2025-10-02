<script setup lang="ts">
interface Props {
  geometry: unknown
  displayValue: string
}

defineProps<Props>()

/**
 * Icons for different geometry types
 */
const geometryIcons: Record<string, string> = {
  box: 'i-carbon-cube',
  sphere: 'i-tabler-circle',
  plane: 'i-tabler-square',
  cylinder: 'i-tabler-cylinder',
  cone: 'i-tabler-cone',
  torus: 'i-tabler-circle-dashed',
  circle: 'i-tabler-circle-filled',
  ring: 'i-tabler-circle',
  dodecahedron: 'i-carbon-polygon',
  icosahedron: 'i-carbon-polygon',
  octahedron: 'i-carbon-polygon',
  tetrahedron: 'i-carbon-polygon',
  tube: 'i-tabler-pipe',
  extrude: 'i-tabler-box',
  lathe: 'i-tabler-rotate-3d',
}

/**
 * Check if value is a Geometry object
 */
function isGeometry(value: unknown): boolean {
  return value !== null
    && typeof value === 'object'
    && value.constructor?.name?.includes('Geometry')
}

/**
 * Get icon for geometry type
 */
function getGeometryIcon(geometry: unknown): string {
  if (!geometry || typeof geometry !== 'object') {
    return 'i-carbon-cube'
  }

  const geometryType = geometry.constructor?.name?.toLowerCase() || ''
  // Clean the geometry name to match our icon mapping (remove "geometry" suffix)
  const cleanedType = geometryType.replace(/geometry$/, '').replace(/^_+/, '')
  return geometryIcons[cleanedType] || 'i-carbon-cube'
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
    v-if="isGeometry(geometry)"
    variant="soft"
    color="neutral"
    size="sm"
    class="flex items-center gap-1 ml-1"
  >
    <UIcon
      :name="getGeometryIcon(geometry)"
      class="w-3 h-3 text-gray-600"
    />
    <span :class="getValueClass(geometry)">{{ displayValue }}</span>
  </UBadge>
</template>
