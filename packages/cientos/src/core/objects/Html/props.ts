import type { TresObject3D } from '@tresjs/core'
import type { Mutable } from '@vueuse/core'
import type { Material } from 'three'
import { calculatePosition as defaultCalculatePosition } from './utils'

// Imports `three` only: the root entry reaches this file.

type PointerEventsProperties
  = | 'auto'
    | 'none'
    | 'visiblePainted'
    | 'visibleFill'
    | 'visibleStroke'
    | 'visible'
    | 'painted'
    | 'fill'
    | 'stroke'
    | 'all'
    | 'inherit'

export interface HtmlProps {
  geometry?: any
  material?: any
  as?: string
  transform?: boolean
  prepend?: boolean
  portal?: Mutable<HTMLElement>
  wrapperClass?: string
  eps?: number
  distanceFactor?: number
  fullscreen?: boolean
  center?: boolean
  pointerEvents?: PointerEventsProperties
  sprite?: boolean
  transparentMaterial?: boolean
  zIndexRange?: Array<number>
  calculatePosition?: typeof defaultCalculatePosition

  // Occlusion based off work by Jerome Etienne and James Baicoianu
  // https://www.youtube.com/watch?v=ScZcUEDGjJI
  // as well as Joe Pea in CodePen: https://codepen.io/trusktr/pen/RjzKJx
  occlude?: TresObject3D | null | (TresObject3D | null)[] | boolean | 'blending'
  castShadow?: boolean // Enable shadow casting for the occlusion plane
  receiveShadow?: boolean // Enable shadow receiving for the occlusion plane
}

export const htmlDefaults = {
  zIndexRange: () => [16777271, 0],
  as: 'div',
  transform: false,
  eps: 0.0001,
  pointerEvents: 'auto' as const,
  sprite: false,
  prepend: false,
  castShadow: false,
  receiveShadow: false,
  transparentMaterial: false,
  calculatePosition: () => defaultCalculatePosition,
}

/** The props as `withDefaults` gives them: every key present, the defaulted ones not `undefined`. */
export type HtmlResolvedProps = { [K in keyof Required<HtmlProps>]: HtmlProps[K] }
  & Required<Pick<HtmlProps, keyof typeof htmlDefaults>>

/** The accessors both occlusion materials expose, so `useHtml` works with either one. */
export interface HtmlMaterialUniforms {
  uWidth: number
  uHeight: number
}

/** A `billboard` plane faces the camera and takes its size from `uWidth` and `uHeight`. */
export type HtmlMaterialFactory = (billboard: boolean) => Material & HtmlMaterialUniforms
