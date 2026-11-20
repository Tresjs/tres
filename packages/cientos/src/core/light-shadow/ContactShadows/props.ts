import type { TresColor } from '@tresjs/core'
import type { Color, Material, Texture } from 'three'

export interface ContactShadowsProps {
  /**
   * The opacity of the shadows.
   *
   * @default 1
   */
  opacity?: number
  /**
   * The blur of the shadows.
   *
   * @default 1
   */
  blur?: number
  /**
   * The color of the shadows.
   *
   * @default '#000000'
   */
  color?: TresColor
  /**
   * The tint at the "core" of the shadows.
   *
   * @default undefined
   */
  tint?: TresColor
  /**
   * The scale of the shadows.
   *
   * @default 10
   */
  scale?: number | [x: number, y: number]
  /**
   * The width of the shadow plane.
   *
   * @default 1
   */
  width?: number
  /**
   * The height of the shadow plane.
   *
   * @default 1
   */
  height?: number
  /**
   * How far the OrthographicCamera should be to capture the shadows.
   *
   * @default 10
   */
  far?: number
  /**
   * Whether the shadows should be smooth or not.
   *
   * @default true
   */
  smooth?: boolean
  /**
   * The resolution of the shadows.
   *
   * @default 512
   */
  resolution?: number
  /**
   * The number of frames to render the shadows.
   *
   * @default Infinity
   */
  frames?: number
  /**
   * Whether the shadows should write to the depth buffer or not.
   *
   * @default false
   */
  depthWrite?: boolean
}

export const contactShadowsDefaults = {
  opacity: 1,
  blur: 1,
  color: '#000000',
  tint: undefined,
  scale: 10,
  width: 1,
  height: 1,
  far: 10,
  smooth: true,
  resolution: 512,
  frames: Number.POSITIVE_INFINITY,
  depthWrite: false,
} satisfies ContactShadowsProps

export type BlurDirection = 'horizontal' | 'vertical'

/** The material that renders the scene depth as the shadow alpha. */
export interface ContactShadowsDepthMaterial extends Material {
  /** The color at the core of the shadow. */
  readonly tint: Color
}

/** One 9-tap gaussian blur pass that reads the texture it was created with. */
export interface ContactShadowsBlurMaterial extends Material {
  /** The distance between two taps, in UV units. */
  offset: number
}

/** The materials of one entry, so `useContactShadows` works with GLSL or TSL. */
export interface ContactShadowsMaterialFactory {
  createDepthMaterial: () => ContactShadowsDepthMaterial
  createBlurMaterial: (direction: BlurDirection, source: Texture) => ContactShadowsBlurMaterial
}
