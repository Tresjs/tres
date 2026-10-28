import type { TresColor } from '@tresjs/core'
import type { Color, Material, Vector2 } from 'three'

// Imports `three` only: the root entry reaches this file.

export interface OutlineProps {
  /** Outline color, default: black */
  color?: TresColor
  /** Thickness in world units, so the outline gets thinner with distance. Off, thickness is in pixels at any distance. Default: false */
  screenspace?: boolean
  /** Outline opacity, default: 1 */
  opacity?: number
  /** Outline transparency, default: false */
  transparent?: boolean
  /** Outline thickness, default 0.05 */
  thickness?: number
  /** Geometry crease angle (-1 === no crease), default: Math.PI, See [BufferGeometryUtils.toCreasedNormals](https://threejs.org/docs/#examples/en/utils/BufferGeometryUtils.toCreasedNormals) */
  angle?: number
  /** Apply the renderer tone mapping to the outline. WebGPURenderer tone-maps the whole frame and ignores this. Default: true */
  toneMapped?: boolean
  polygonOffset?: boolean
  polygonOffsetFactor?: number
  /** Render order of the outline mesh. Default: 0 */
  renderOrder?: number
}

export const outlineDefaults = {
  color: 'black',
  opacity: 1,
  transparent: false,
  screenspace: false,
  toneMapped: true,
  polygonOffset: false,
  polygonOffsetFactor: 0,
  renderOrder: 0,
  thickness: 0.05,
  angle: Math.PI,
} satisfies OutlineProps

/** The accessors both outline materials expose, with the GLSL uniform names, so `useOutline` works with either one. */
export interface OutlineMaterialUniforms {
  thickness: number
  screenspace: boolean
  /** Canvas size in CSS pixels. The clip-space offset divides by it. */
  readonly size: Vector2
  readonly color: Color
}

/** Either outline material: a three material with the outline accessors. */
export type OutlineMaterialLike = Material & OutlineMaterialUniforms
