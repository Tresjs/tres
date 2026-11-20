// Imports nothing from `three/webgpu`: the root entry reaches this file.
import type { TresColor } from '@tresjs/core'
import type { Color, Side, Texture } from 'three'

export interface MeshTransmissionMaterialProps {
  /** Number of refraction samples. Baked into the shader at compile time. Default: 6 */
  samples?: number
  /** Sample the renderer's own transmission texture instead of an FBO pass. Baked at compile time. Default: false */
  transmissionSampler?: boolean
  /** Transmission amount (maps to the custom _transmission uniform). Default: 1 */
  transmission?: number
  /** Thickness of the glass. Default: 0 */
  thickness?: number
  /** Thickness used for the backside pass. Default: 0 */
  backsideThickness?: number
  /** Roughness of the surface. Default: 0 */
  roughness?: number
  /** Chromatic aberration intensity. Default: 0.03 */
  chromaticAberration?: number
  /** Anisotropic blur amount. Default: 0.1 */
  anisotropicBlur?: number
  /** Distortion amount. Default: 0 */
  distortion?: number
  /** Scale of the distortion. Default: 0.5 */
  distortionScale?: number
  /** Temporal distortion speed. Default: 0 */
  temporalDistortion?: number
  /** Index of refraction. Default: 1.5 */
  ior?: number
  /** Base color of the glass. Default: white */
  color?: TresColor
  /** Clearcoat layer intensity. Default: 0 */
  clearcoat?: number
  /** Clearcoat roughness. Default: 0 */
  clearcoatRoughness?: number
  /** Distance at which light is attenuated through the volume. Default: Infinity */
  attenuationDistance?: number
  /** Color the light shifts to as it passes through the volume. Default: white */
  attenuationColor?: TresColor
  /** Resolution of the FBO render target. Default: 256 */
  resolution?: number
  /** Resolution of the backside FBO. Defaults to resolution. */
  backsideResolution?: number
  /** Render the back faces into a separate buffer for proper glass thickness. Default: false */
  backside?: boolean
  /** Override the scene background during the FBO pass. */
  background?: Color | null
  /** Supply your own render-target texture, skipping the internal FBO pass. */
  buffer?: Texture | null
}

export const meshTransmissionMaterialDefaults = {
  samples: 6,
  transmissionSampler: false,
  transmission: 1,
  thickness: 0,
  backsideThickness: 0,
  roughness: 0,
  chromaticAberration: 0.03,
  anisotropicBlur: 0.1,
  distortion: 0,
  distortionScale: 0.5,
  temporalDistortion: 0,
  ior: 1.5,
  resolution: 256,
  backside: false,
} satisfies MeshTransmissionMaterialProps

/** The accessors both transmission materials expose, so the shared FBO pass drives them the same way. */
export interface MeshTransmissionMaterialUniforms {
  _transmission: number
  time: number
  thickness: number
  buffer: Texture | null
  side: Side
}
