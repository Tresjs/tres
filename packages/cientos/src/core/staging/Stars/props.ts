// Imports nothing from `three/webgpu`: the root entry reaches this file.

import type { Texture } from 'three'

export interface StarsProps {
  /**
   * The size of the stars.
   *
   * @type {number}
   * @memberof StarsProps
   * @default 0.1
   */
  size?: number
  /**
   * keep the same size regardless distance.
   *
   * @type {boolean}
   * @memberof StarsProps
   * @default true
   */
  sizeAttenuation?: boolean
  /**
   * show transparency on the stars texture.
   *
   * @type {boolean}
   * @memberof StarsProps
   * @default true
   */
  transparent?: boolean
  /**
   * enables the WebGL to know when not to render the pixel.
   *
   * @type {number}
   * @memberof StarsProps
   * @default 0.01
   */
  alphaTest?: number
  /**
   * number of stars.
   *
   * @type {number}
   * @memberof StarsProps
   * @default 5000
   */
  count?: number
  /**
   * depth of star's shape.
   *
   * @type {number}
   * @memberof StarsProps
   * @default 50
   */
  depth?: number
  /**
   * Radius of star's shape.
   *
   * @type {number}
   * @memberof StarsProps
   * @default 100
   */
  radius?: number
  /**
   * Alpha texture of the stars.
   *
   * @type {Texture | null}
   * @memberof StarsProps
   * @default null
   */
  alphaMap?: Texture | null
}

export const starsDefaults = {
  size: 0.1,
  sizeAttenuation: true,
  transparent: true,
  alphaTest: 0.01,
  alphaMap: null,
  count: 5000,
  depth: 50,
  radius: 100,
} satisfies StarsProps
