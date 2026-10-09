// Imports nothing from `three/webgpu`: the root entry reaches this file.

import type { TresColor } from '@tresjs/core'
import type { Texture } from 'three'

export interface PrecipitationProps {
  /**
   * The size of the drops.
   *
   * @type {number}
   * @memberof PrecipitationProps
   * @default 0.1
   */
  size?: number
  /**
   * The size of the precipitation area.
   *
   * @type {[number, number, number]}
   * @memberof PrecipitationProps
   * @default "[10, 10, 20]"
   */
  area?: [number, number, number]
  /**
   * The color of the drops.
   *
   * @default '0xffffff'
   * @type {TresColor}
   * @memberof PrecipitationProps
   *
   */
  color?: TresColor
  /**
   * Color texture of the drops.
   *
   * @type {Texture}
   * @memberof PrecipitationProps
   * @default null
   */
  map?: string | Texture | null
  /**
   * texture of the alphaMap Drops.
   *
   * @type {Texture}
   * @memberof PrecipitationProps
   * @default null
   */
  alphaMap?: string | Texture | null
  /**
   * enables the WebGL to know when not to render the pixel.
   *
   * @type {number}
   * @memberof PrecipitationProps
   * @default 0.01
   */
  alphaTest?: number
  /**
   * Set the opacity of the drops.
   *
   * @type {number}
   * @memberof PrecipitationProps
   * @default 0.8
   */
  opacity?: number
  /**
   * number of drops.
   *
   * @type {number}
   * @memberof PrecipitationProps
   * @default 5000
   */
  count?: number
  /**
   * Speed of drops.
   *
   * @type {number}
   * @memberof PrecipitationProps
   * @default 0.1
   */
  speed?: number
  /**
   * Add randomness to the drops.
   *
   * @default 0.5
   * @type {number}
   * @memberof PrecipitationProps
   *
   */
  randomness?: number
  /**
   * Whether the drops write to the depth buffer or not.
   *
   * @default false
   * @type {boolean}
   * @memberof PrecipitationProps
   *
   */
  depthWrite?: boolean
  /**
   * show transparency on the drops texture.
   *
   * @type {boolean}
   * @memberof PrecipitationProps
   * @default true
   */
  transparent?: boolean
  /**
   * keep the same size regardless distance.
   *
   * @type {boolean}
   * @memberof PrecipitationProps
   * @default true
   */
  sizeAttenuation?: boolean
}

// No `satisfies PrecipitationProps`: `area` is a factory, which the props type does not allow.
export const precipitationDefaults = {
  size: 0.1,
  area: (): [number, number, number] => [10, 10, 20],
  color: 0xFFFFFF,
  alphaTest: 0.01,
  opacity: 0.8,
  count: 5000,
  speed: 0.1,
  randomness: 0.5,
  depthWrite: false,
  transparent: true,
  sizeAttenuation: true,
}
