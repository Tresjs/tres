import type { TresColor } from '@tresjs/core'
import type { Color, Side, Texture, Vector2 } from 'three'
import { FrontSide } from 'three'

// Imports `three` only: the root entry reaches this file.

export interface ImageBaseProps {
  /**
   * Number of divisions in the the default geometry.
   */
  segments?: number
  /**
   * Scale of the geometry.
   */
  scale?: number | [number, number]
  /**
   * Color multiplied into the image texture. Default is white.
   */
  color?: TresColor
  /**
   * Shrinks or enlarges the image texture.
   */
  zoom?: number
  /**
   * Border radius applied to image texture. Intended for rectangular geometries.
   */
  radius?: number
  /**
   * Power of grayscale effect. 0 is no grayscale. 1 is full grayscale.
   */
  grayscale?: number
  /**
   * Whether this material is tone mapped according to the renderer's toneMapping setting. [See THREE.material.tonemapped](https://threejs.org/docs/?q=material#api/en/materials/Material.toneMapped)
   */
  toneMapped?: boolean
  /**
   * Whether the image material should be transparent. [See THREE.material.transparent](https://threejs.org/docs/?q=material#api/en/materials/Material.transparent)
   */
  transparent?: boolean
  /**
   * Opacity of the image material. [See THREE.material.transparent](https://threejs.org/docs/?q=material#api/en/materials/Material.transparent)
   */
  opacity?: number
  /**
   * THREE.Side of the image material. [See THREE.material.side](https://threejs.org/docs/?q=material#api/en/materials/Material.side)
   */
  side?: Side
}

export type ImageProps = ImageBaseProps & (
  | {
    /**
       * Image texture to display on the geometry.
       */
    texture: Texture
    url?: never
  }
  | {
    texture?: never
    /**
       * Image URL to load and display on the geometry.
       */
    url: string
  }
)

export const imageDefaults = {
  segments: 1,
  scale: 1,
  color: 'white',
  zoom: 1,
  radius: 0,
  grayscale: 0,
  toneMapped: true,
  transparent: false,
  opacity: 1,
  side: FrontSide,
} satisfies ImageBaseProps

/** The uniform accessors that both image materials expose, with the GLSL uniform names. */
export interface ImageMaterialUniforms {
  readonly color: Color
  map: Texture | null
  /** Scale of the geometry, to fit the image like CSS `object-fit: cover` */
  readonly scale: Vector2
  /** Width and height of the image, in pixels */
  readonly imageBounds: Vector2
  /** Larger side of the canvas, in pixels. `radius` is relative to it */
  resolution: number
  zoom: number
  radius: number
  grayscale: number
  opacity: number
}
