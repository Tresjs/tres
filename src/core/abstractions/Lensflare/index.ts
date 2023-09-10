import { MathUtils } from 'three'
import type { TresColor } from '@tresjs/core'
import {
  linear,
  easeInCubic,
  easeInOutCubic,
  easeInQuart,
  easeOutBounce,
} from '../../../utils/easing'
import RandUtils from './RandUtils'
import Lensflare from './component.vue'
import { defaultSeedProps, defaultLensflareElementProps } from './constants'

export { Lensflare }

export interface SeedProps {
  texture: string[]
  color: TresColor[]
  distance: [number, number]
  size: [number, number]
  length: [number, number]
  seed?: number
}

/**
 * To make creating a complex lensflare simpler, the component can generate some or all `LensflareElement` properties.
 * You only needs to specify what's important to you.
 * 
 * Below are the different ways to specify props, showing how the component will fill in properties you don't specify.
 * 
 * In the table:
 * `elements` is `Partial<LensflareElementProps>[]` passed as `:elements` on the component.
 * `userDefaultElement` is an object of the `:color` `:distance` `:size` and `:texture` props on the component, if they exist.
 * `userDefaultElement` is "complete" if it has values for all four fields.
 * `seed` is a number, passed on the component's `:seed` prop.
 * `seedProps` is `SeedProps[]`, passed on the component's `:seedProps` prop. It contains the "recipe" for generating random props.
 * `systemDefaultElement` is built in to the system.
 * 
 * A field on a "high priority" element takes precendence over the same field on a "low priority" element.
 * Priority order depends on which props are set by the user.
 * 
 * | Use case                     | has `elements` | `userDefaultElement` is complete | has `seed` or `seedProps` | Fill-in priority (high to low)                             | Note                                 |
 * |------------------------------|----------------|----------------------------------|---------------------------|------------------------------------------------------------|--------------------------------------|
 * | Maximum control              | `true`         | `true`                           | *                         | `elements`, `userDefaultElement`, `systemDefaultElement`   | `seed` and `seedProps` ignored       |
 * | Tweak seeded random elements | `true`         | `false`                          | `true`                    | `elements`, `userDefaultElement`, seeded random properties | excess `elements` are dropped        |
 * | Maximum control              | `true`         | `false`                          | `false`                   | `elements`, `userDefaultElement`, `systemDefaultElement`   |                                      |
 * | Show a single element        | `false`        | `true`                           | *                         | `userDefaultElement`                                       | `seed` and `seedProps` ignored       |
 * | Get something on screen      | `false`        | `false`                          | `false`                   | seeded random props                                        | seed = 0, seedProps = system default |
 *
 * @param elements - `undefined` or an array of (potentially) incomplete element props
 * @param userDefaultElement - values to "fill in" missing partial elements fields – or overwrite seeded props
 * @param seed - `undefined` or a number to seed random prop generation
 * @param seedProps - `undefined` or an array of SeedProps for generating random seeded properties
 * @param systemDefaultElement - default values to "fill in" any remaining missing props
 * @returns LensflareElementProps[] - An array of complete props
 **/

export const partialLensflarePropsArrayToLensflarePropsArray = (
  elements: Partial<LensflareElementProps>[] | undefined,
  userDefaultElement: Partial<LensflareElementProps>,
  seed: number | undefined = undefined,
  seedProps: SeedProps[] | undefined = undefined,
  systemDefaultElement = defaultLensflareElementProps,
): LensflareElementProps[] => {

  if (elements && elementIsComplete(userDefaultElement)) {
    const fullDefaultProps = userDefaultElement as LensflareElementProps
    return elements.map(element => Object.assign({}, fullDefaultProps, element))
  }

  if (elements && (typeof seed === 'number' || typeof seedProps !== 'undefined')) {
    const seededProps = getSeededRandomProps( seed ?? 0, seedProps ?? defaultSeedProps)
    const partialPropsLength = elements.length
    return seededProps.map((seeded, i) => 
      Object.assign({}, seeded, userDefaultElement, i < partialPropsLength ? elements[i] : {}),
    )
  }

  if (elements) {
    const fullDefaultProps = Object.assign( {}, systemDefaultElement, userDefaultElement)
    return elements.map(element => Object.assign({}, fullDefaultProps, element))
  }

  if (elementIsComplete(userDefaultElement)) {
    return [Object.assign({}, userDefaultElement as LensflareElementProps)]
  }

  const seededProps = getSeededRandomProps( seed ?? 0, seedProps ?? defaultSeedProps)
  return seededProps.map(props => Object.assign({}, props, userDefaultElement))
}

const easingFunctions = [
  linear,
  easeInCubic,
  easeInOutCubic,
  easeInQuart,
  easeOutBounce,
]

const lerp = MathUtils.lerp

export interface LensflareElementProps {
  texture: Texture | string
  size: number
  distance: number
  color: TresColor
}

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
      return new Array(numElements).fill(0).map(() => {
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

export function partialLensflareElementPropsFromComponentProps(
  props: Partial<LensflareElementProps>,
): Partial<LensflareElementProps> {
  return (Object.keys(defaultLensflareElementProps) as (keyof LensflareElementProps)[]).reduce((obj, key) => {
    if (typeof props[key] !== 'undefined') {
      obj[key] = props[key]
    }
    return obj
  }, {} as Partial<LensflareElementProps>)
}

function elementIsComplete(
  props: Partial<LensflareElementProps>,
) {
  return (
    typeof props.color !== 'undefined'
    && typeof props.distance !== 'undefined'
    && typeof props.size !== 'undefined'
    && typeof props.texture !== 'undefined'
  )
}
