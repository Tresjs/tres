// Imports nothing from `three/webgpu`: the root entry reaches this file.

export interface MeshWobbleMaterialProps {
  /** How fast the wobble moves, default: 1 */
  speed?: number
  /** How strongly the wobble bends the geometry, default: 1 */
  factor?: number
}

export const meshWobbleMaterialDefaults = {
  speed: 1,
  factor: 1,
} satisfies MeshWobbleMaterialProps

/** The accessors both wobble materials expose, so either SFC drives them the same way. */
export interface MeshWobbleMaterialUniforms {
  time: number
  factor: number
}
