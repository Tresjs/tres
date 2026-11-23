import type { TresRenderer } from '@tresjs/core'
import type { Material, Object3D, Texture, Vector2 } from 'three'

export interface MeshPortalMaterialProps {
  /** 0 = world only, 1 = portal only. Cross-fades between. */
  blend?: number
  /** FBO resolution for the window pass. */
  resolution?: number
  /** Keep portal contents in world units (identity) instead of host-relative. */
  worldUnits?: boolean
  /** Render-loop priority for the blend takeover. */
  renderPriority?: number
}

export const meshPortalMaterialDefaults = {
  blend: 0,
  resolution: 512,
  worldUnits: false,
  renderPriority: 0,
} as const satisfies MeshPortalMaterialProps

export interface PortalWindowMaterial extends Material {
  map: Texture | null
  // Only the GLSL material has it: it cannot read the screen size in its shader.
  readonly resolution?: Vector2
  __tres?: { parent?: Object3D | null }
}

export interface PortalBlendPass {
  readonly blend: { value: number }
  render: (renderer: TresRenderer) => void
  dispose: () => void
}
