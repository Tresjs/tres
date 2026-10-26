import type { MeshPhysicalMaterialParameters } from 'three'

/**
 * The values where the glass differs from a default `MeshPhysicalMaterial`. Both the GLSL material
 * and the node material start from these, so the two entries render the same glass.
 */
export const glassDefaults = {
  roughness: 0,
  clearcoat: 0.5,
  transmission: 1,
  thickness: 0.5,
} satisfies MeshPhysicalMaterialParameters
