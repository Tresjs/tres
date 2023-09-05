import { Texture, MathUtils, Color } from 'three'
import { TresColor } from '@tresjs/core'
import RandUtils from './RandUtils'
import { linear, easeInCubic, easeInOutCubic, easeInQuart, easeOutBounce } from '../../../utils/easing'
import Lensflare from './component.vue'
import * as constant from './constants'

export { Lensflare };

export const partialLensflarePropsArrayToLensflarePropsArray = (
  partialProps: Partial<LensflareElementProps>[] | undefined,
  seed: number | undefined,
) =>
  partialPropsArrayToPropsArray<LensflareElementProps>(
    partialProps,
    seed,
    getSeededLensflareElementProps,
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
  texture: `${constant.TEXTURE_PATH}cirlceBlur.png`,
  size: 64,
  distance: 0,
  color: new Color('white'),
}

const getSeededLensflareElementProps = (seed: number): LensflareElementProps[] => {
  const rand: RandUtils = new RandUtils(seed)

  const easingFn = rand.choice(easingFunctions) as (n: number) => number

  const oversizeTexturesSelected = rand.sample(
    constant.oversizeTexturesOptional,
    rand.int(constant.oversizeElementsNumMin, constant.oversizeElementsNumMax),
  )
  const oversizeElementProps: LensflareElementProps[] = oversizeTexturesSelected.map(texture => ({
    texture,
    size: rand.int(constant.oversizeSizeMin, constant.oversizeSizeMax),
    distance: 0,
    color: rand.defaultChoice(constant.oversizeColors, 'white'),
  }))

  const bodyTexturesOptionalSelected = rand.sample(
    constant.bodyTexturesOptional,
    rand.int(constant.bodyTexturesOptionalNumMin, constant.bodyTexturesOptionalNumMax),
  )

  const bodyElementProps: LensflareElementProps[] = [
    ...constant.bodyTexturesRequired.map(texture => ({
      texture,
      size: rand.int(constant.bodySizeMin, constant.bodySizeMax),
      distance: 0,
      color: rand.defaultChoice(constant.bodyColors, defaultElement.color),
    })),
    ...bodyTexturesOptionalSelected.map(texture => ({
      texture,
      size: rand.int(constant.bodySizeMin, constant.bodySizeMax),
      distance: 0,
      color: rand.defaultChoice(constant.bodyColors, defaultElement.color),
    })),
  ]

  const frontTexturesSelected = rand.sample(constant.frontTexturesOptional, rand.int(constant.frontTexturesNumMin, constant.frontTexturesNumMax))
  const frontNumElements = rand.int(constant.frontElementsNumMin, constant.frontElementsNumMax)
  const frontDistanceStart = rand.float(constant.frontOffsetMin, constant.frontOffsetMax)
  const frontDistanceEnd = frontDistanceStart + rand.float(constant.frontLengthMin, constant.frontLengthMax)
  const frontElementProps: LensflareElementProps[] = new Array(frontNumElements).fill(0).map(() => {
    const progress = easingFn(rand.rand())
    return {
      texture: rand.defaultChoice(frontTexturesSelected, defaultElement.texture),
      size: lerp(constant.frontSizeMin, constant.frontSizeMax, easingFn(1 - progress)),
      distance: lerp(frontDistanceStart, frontDistanceEnd, progress),
      color: rand.defaultChoice(constant.frontColors, defaultElement.color),
    }
  })

  const backTexturesSelected = rand.sample(constant.backTexturesOptional, rand.int(constant.backTexturesNumMin, constant.backTexturesNumMax))
  const backNumElements = rand.int(constant.backElementsNumMin, constant.backElementsNumMax)
  const backDistanceStart = rand.float(constant.backOffsetMin, constant.backOffsetMax)
  const backDistanceEnd = backDistanceStart + rand.float(constant.backLengthMin, constant.backLengthMax)
  const backElementProps = new Array(backNumElements).fill(0).map(() => {
    const progress = easingFn(rand.rand())
    return {
      texture: rand.defaultChoice(backTexturesSelected, defaultElement.texture),
      size: lerp(constant.backSizeMin, constant.backSizeMax, easingFn(1 - progress)),
      distance: -lerp(backDistanceStart, backDistanceEnd, progress),
      color: rand.defaultChoice(constant.backColors, defaultElement.color),
    }
  })

  return [...oversizeElementProps, ...bodyElementProps, ...frontElementProps, ...backElementProps]
}
