import { Texture, MathUtils, Color } from 'three'
import { TresColor } from '@tresjs/core'
import RandUtils from './RandUtils'
import { linear, easeInCubic, easeInOutCubic, easeInQuart, easeOutBounce } from '../../../utils/easing'
import Lensflare from './component.vue'
import { defaultSeedProps, TEXTURE_PATH } from './constants'

export { Lensflare }

export type SeedProps = {
  texture: string[],
  color: TresColor[],
  distance: [number, number],
  size: [number, number],
  length: [number, number]
}

export const partialLensflarePropsArrayToLensflarePropsArray = (
  partialProps: Partial<LensflareElementProps>[] | undefined,
  seed?: number | undefined,
  seedProps?: SeedProps[],
) =>
  partialPropsArrayToPropsArray<LensflareElementProps>(
    partialProps,
    seed,
    (seed) => getSeededLensflareElementProps(seed, seedProps),
    defaultElement,
  )

const easingFunctions = [linear, easeInCubic, easeInOutCubic, easeInQuart, easeOutBounce]

const lerp = MathUtils.lerp

export type LensflareElementProps = {
  texture: Texture | string
  size: number
  distance: number
  color: TresColor
}

/**
 * Fill in missing values for each element in an array of partial props.
 * Depending on arguments, missing values are filled in as follows:
 * | has partialProps | has seed  | Effect                                                                          |
 * |------------------|-----------|---------------------------------------------------------------------------------|
 * | `true`           | `true`    | return seeded elements with partialProps as tweaks; ignore excess partialProps. |
 * | `true`           | `false`   | return copy of partialProps; missing values are filled in with defaultProps.    |
 * | `false`          | `true`    | Use the seeded props.                                                           |
 * | `false`          | `false`   | Use seeded props with seed == 0.                                                |
 *
 * @param partialProps - `undefined` or an array of (potentially) incomplete props
 * @param seed - `undefined` or a number to seed random prop generation
 * @param getSeededPropsArray - function that returns an array of pseudorandom props
 * @param defaultProps - props used to fill in missing fields, if seeded random props are not used
 * @returns T[] - An array of complete props
 **/
function partialPropsArrayToPropsArray<T>(
  partialProps: Partial<T>[] | undefined,
  seed: number | undefined,
  getSeededPropsArray: (seed: number) => T[],
  defaultProps: T,
): T[] {
  const hasPartialProps = Array.isArray(partialProps)
  const hasSeed = typeof seed === 'number'

  if (hasPartialProps) {
    if (hasSeed) {
      return getSeededPropsArray(seed).map((seededProps, i) => Object.assign({}, seededProps, partialProps[i]))
    } else {
      return partialProps.map(props => Object.assign({}, defaultProps, props))
    }
  } else {
    if (hasSeed) {
      return getSeededPropsArray(seed)
    } else {
      return getSeededPropsArray(0)
    }
  }
}

const defaultElement: LensflareElementProps = {
  texture: `${TEXTURE_PATH}cirlceBlur.png`,
  size: 64,
  distance: 0,
  color: new Color('white'),
}

const getSeededLensflareElementProps = (seed=0, seedProps=defaultSeedProps): LensflareElementProps[] => {
  const rand: RandUtils = new RandUtils(seed)

  const easingFn = rand.choice(easingFunctions) as (n: number) => number
  
  return seedProps.map((preset, i) => {
    const rand: RandUtils = new RandUtils(seed * (i * 7907 + 1))
    const numElements = rand.int(preset.length[0], preset.length[1])
    return new Array(numElements).fill(0).map(() => {
      const progress = easingFn(rand.rand())
      return {
        texture: rand.defaultChoice(preset.texture, defaultElement.texture),
        size: lerp(preset.size[0], preset.size[1], easingFn(1 - progress)),
        distance: lerp(preset.distance[0], preset.distance[1], progress),
        color: rand.defaultChoice(preset.color, defaultElement.color),
      }
    })
  }).flat()
}
