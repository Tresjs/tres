import { MathUtils } from 'three'
import type { Texture } from 'three'
import type { TresColor } from '@tresjs/core'
import {
  easeInCubic,
  easeInOutCubic,
  easeInQuart,
  easeOutBounce,
  linear,
} from '../../../utils/easing'
import RandUtils from './RandUtils'
import Lensflare from './component.vue'
import { defaultLensflareElementProps, defaultSeedProps } from './constants'

export { Lensflare }

export interface SeedProps {
  texture: string[]
  color: TresColor[]
  distance: [number, number]
  size: [number, number]
  length: [number, number]
  seed?: number
}

const easingFunctions = [
  linear,
  easeInCubic,
  easeInOutCubic,
  easeInQuart,
  easeOutBounce,
]

const lerp = MathUtils.lerp

const getSeededRandomProps = (
  seed = 0,
  seedProps = defaultSeedProps,
): LensflareElementProps[] => {
  const rand: RandUtils = new RandUtils(seed)

  const easingFn = rand.choice(easingFunctions) as (n: number) => number

  return seedProps
    .map((preset, i) => {
      const rand: RandUtils = new RandUtils(
        seed * (i * 7907 + 1)
        + (typeof preset.seed === 'number' ? preset.seed : 0),
      )
      const numElements = rand.int(preset.length[0], preset.length[1])
      return Array.from({ length: numElements }).fill(0).map(() => {
        const progress = easingFn(rand.rand())
        return {
          texture: rand.defaultChoice(
            preset.texture,
            defaultLensflareElementProps.texture,
          ),
          size: lerp(preset.size[0], preset.size[1], easingFn(1 - progress)),
          distance: lerp(preset.distance[0], preset.distance[1], progress),
          color: rand.defaultChoice(
            preset.color,
            defaultLensflareElementProps.color,
          ),
        }
      })
    })
    .flat()
}

/**
 * To make creating a complex lensflare simpler, the component can generate some or all `LensflareElement` properties.
 * The precendence in creating the final elements' props is as follows:
 *
 * 1. `elements`
 * 2. `userDefaultElement` - `color`, `distance`, `size`, `texture` from component
 * 3. seeded random props - if `seed` and/or `seedProps` is not `undefined`
 * 4. system default
 *
 * @param elements - `undefined` or an array of (potentially) incomplete element props
 * @param userDefaultElement - values to "fill in" missing partial elements fields – or overwrite seeded props
 * @param seed - `undefined` or a number to seed random prop generation
 * @param seedProps - `undefined` or an array of SeedProps for generating random seeded properties
 * @param systemDefaultElement - default values to "fill in" any remaining missing props
 * @returns LensflareElementProps[] - An array of complete props
 */

export const partialLensflarePropsArrayToLensflarePropsArray = (
  elements: Partial<LensflareElementProps>[] | undefined,
  userDefaultElement: Partial<LensflareElementProps>,
  seed: number | undefined = undefined,
  seedProps: SeedProps[] | undefined = undefined,
  systemDefaultElement = defaultLensflareElementProps,
): LensflareElementProps[] => {
  if (elements !== undefined && elements.length > 0 && (typeof seed === 'number' || typeof seedProps !== 'undefined')) {
    const seeded = getSeededRandomProps(seed ?? 0, seedProps ?? defaultSeedProps)
    const seededLength = seeded.length
    const elementsLength = elements.length
    if (seededLength >= elementsLength) {
      return seeded.map((_seededProps, i) =>
        Object.assign(_seededProps, userDefaultElement, i < elementsLength ? elements[i] : {}),
      )
    }
    else {
      return elements.map((_element, i) =>
        Object.assign({}, systemDefaultElement, i < seededLength ? seeded[i] : {}, userDefaultElement, _element),
      )
    }
  }

  if (elements !== undefined && elements.length > 0) {
    const fullDefaultProps = Object.assign({}, systemDefaultElement, userDefaultElement)
    return elements.map(element => Object.assign({}, fullDefaultProps, element))
  }

  const _seedProps = (seedProps === undefined || seedProps.length === 0) ? defaultSeedProps : seedProps
  const seededProps = getSeededRandomProps(seed ?? 0, _seedProps)
  return seededProps.map(props => Object.assign({}, props, userDefaultElement))
}

export interface LensflareElementProps {
  texture: Texture | string
  size: number
  distance: number
  color: TresColor
}

export function filterLensflareElementProps(
  props: Partial<LensflareElementProps>,
): Partial<LensflareElementProps> {
  return filter(props, (v, k) => k in defaultLensflareElementProps && v !== undefined)
}

function filter<T extends object>(
  obj: T,
  predicate: <K extends keyof T>(value: T[K], key: K) => boolean,
) {
  const result: { [K in keyof T]?: T[K] } = {};
  (Object.keys(obj) as Array<keyof T>).forEach((name) => {
    if (predicate(obj[name], name)) {
      result[name] = obj[name]
    }
  })
  return result
}
