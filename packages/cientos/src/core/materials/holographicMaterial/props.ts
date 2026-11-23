import type { TresColor } from '@tresjs/core'
import type { Color, Side } from 'three'
import { AdditiveBlending, FrontSide, NormalBlending } from 'three'

// Imports `three` only: the root entry reaches this file.

export interface HolographicMaterialProps {
  /** Strength of the fresnel effect, 0 to 1. Default: 0.45 */
  fresnelAmount?: number
  /** Opacity of the fresnel effect, 0 to 1. Default: 1 */
  fresnelOpacity?: number
  /** Blink only the fresnel effect. Default: true */
  blinkFresnelOnly?: boolean
  /** Enable the blinking effect. Default: true */
  enableBlinking?: boolean
  /** Use additive blending. Off, the material uses normal blending. Default: true */
  enableAdditive?: boolean
  /** Brightness of the hologram, 0 to 2. Default: 0.7 */
  hologramBrightness?: number
  /** Size of the scanlines, 1 to 15. Default: 8 */
  scanlineSize?: number
  /** Speed of the signal effect, 0 to 2. Default: 0.45 */
  signalSpeed?: number
  /** Opacity of the hologram. Default: 1 */
  hologramOpacity?: number
  /** Color of the hologram. Default: #00d5ff */
  hologramColor?: TresColor
  /** Material side. Default: THREE.FrontSide */
  side?: Side
}

export const holographicDefaults = {
  fresnelAmount: 0.45,
  fresnelOpacity: 1.0,
  blinkFresnelOnly: true,
  enableBlinking: true,
  enableAdditive: true,
  hologramBrightness: 0.7,
  scanlineSize: 8.0,
  signalSpeed: 0.45,
  hologramOpacity: 1.0,
  hologramColor: '#00d5ff',
  side: FrontSide,
} satisfies HolographicMaterialProps

/** The uniform accessors that both materials expose, with the GLSL uniform names. */
export interface HolographicMaterialUniforms extends Required<Omit<HolographicMaterialProps, 'enableAdditive' | 'hologramColor' | 'side'>> {
  readonly hologramColor: Color
}

/** The props for the material tag. Both materials take `blending` in place of `enableAdditive`. */
export function toHolographicMaterialProps({ enableAdditive, ...material }: HolographicMaterialProps) {
  return { ...material, blending: enableAdditive ? AdditiveBlending : NormalBlending }
}
