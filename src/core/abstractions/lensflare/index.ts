import { Texture, MathUtils, Color } from 'three'
import { TresColor } from '@tresjs/core'
import RandUtils from './RandUtils'
import { linear, easeInCubic, easeInOutCubic, easeInQuart, easeOutBounce } from './easing'
import Lensflare from './component.vue'

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

const TEXTURE_PATH =
  'https://raw.githubusercontent.com/andretchen0/tresjs_assets/' +
  'b1bc3780de73a9328a530767c9a7f4cbab060396/textures/lensflare/'

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

const getSeededLensflareElementProps = (seed: number): LensflareElementProps[] => {
  const rand: RandUtils = new RandUtils(seed)

  const numPoints = rand.choice([4, 6, 8]) as 4 | 6 | 8

  const circle = `${TEXTURE_PATH}circle.png`
  const circleBlur = `${TEXTURE_PATH}cirlceBlur.png`
  const circleRainbow = `${TEXTURE_PATH}circleRainbow.png`
  const line = `${TEXTURE_PATH}line.png`
  const poly = `${TEXTURE_PATH}poly${numPoints}.png`
  const polyStroke = `${TEXTURE_PATH}polyStroke${numPoints}.png`
  const rays = `${TEXTURE_PATH}rays${numPoints}.png`
  const ring = `${TEXTURE_PATH}ring.png`
  const starThin = `${TEXTURE_PATH}starThin${numPoints}.png`

  // NOTE:
  // Flare elements are divided into back, oversize, body, front.
  // They are arranged as such, relative to the light source and camera:
  //
  // [distance < 0]   [distance == 0]   [distance > 0]
  //                      light                          camera
  //      back        body, oversize       front

  const oversizeTexturesOptional = [line, ring]
  const oversizeColors = ['white']
  const oversizeSizeMin = 750
  const oversizeSizeMax = 1024
  const oversizeElementsNumMin = 0
  const oversizeElementsNumMax = 2

  const bodyTexturesRequired = [circleBlur, rays]
  const bodyTexturesOptional = [circle, circleRainbow, ring, starThin]
  const bodyColors = ['white']
  const bodySizeMin = 180
  const bodySizeMax = 512
  const bodyTexturesOptionalNumMin = 2
  const bodyTexturesOptionalNumMax = 3

  const frontTexturesOptional = [circleBlur, circle, ring, poly, polyStroke]
  const [darkPurple, darkBlue] = [0x38235f, 0x02055a]
  const frontColors = ['dimgray', 'gray', 'darkgray', darkPurple, darkBlue]
  const frontTexturesNumMin = 2
  const frontTexturesNumMax = 4
  const frontSizeMin = 20
  const frontSizeMax = 180
  const frontOffsetMin = 0.5
  const frontOffsetMax = 1
  const frontLengthMin = 0.75
  const frontLengthMax = 2.5
  const frontElementsNumMin = 5
  const frontElementsNumMax = 21

  const backTexturesOptional = frontTexturesOptional
  const backColors = frontColors
  const backTexturesNumMin = 2
  const backTexturesNumMax = 4
  const backSizeMin = 180
  const backSizeMax = 360
  const backOffsetMin = 0.1
  const backOffsetMax = 0.2
  const backLengthMin = 0.5
  const backLengthMax = 0.6
  const backElementsNumMin = 0
  const backElementsNumMax = 5

  const easingFn = rand.choice(easingFunctions) as (n: number) => number

  const oversizeTexturesSelected = rand.sample(
    oversizeTexturesOptional,
    rand.int(oversizeElementsNumMin, oversizeElementsNumMax),
  )
  const oversizeElementProps: LensflareElementProps[] = oversizeTexturesSelected.map(texture => ({
    texture,
    size: rand.int(oversizeSizeMin, oversizeSizeMax),
    distance: 0,
    color: rand.defaultChoice(oversizeColors, 'white'),
  }))

  const bodyTexturesOptionalSelected = rand.sample(
    bodyTexturesOptional,
    rand.int(bodyTexturesOptionalNumMin, bodyTexturesOptionalNumMax),
  )

  const bodyElementProps: LensflareElementProps[] = [
    ...bodyTexturesRequired.map(texture => ({
      texture,
      size: rand.int(bodySizeMin, bodySizeMax),
      distance: 0,
      color: rand.defaultChoice(bodyColors, defaultElement.color),
    })),
    ...bodyTexturesOptionalSelected.map(texture => ({
      texture,
      size: rand.int(bodySizeMin, bodySizeMax),
      distance: 0,
      color: rand.defaultChoice(bodyColors, defaultElement.color),
    })),
  ]

  const frontTexturesSelected = rand.sample(frontTexturesOptional, rand.int(frontTexturesNumMin, frontTexturesNumMax))
  const frontNumElements = rand.int(frontElementsNumMin, frontElementsNumMax)
  const frontDistanceStart = rand.float(frontOffsetMin, frontOffsetMax)
  const frontDistanceEnd = frontDistanceStart + rand.float(frontLengthMin, frontLengthMax)
  const frontElementProps: LensflareElementProps[] = new Array(frontNumElements).fill(0).map(() => {
    const progress = easingFn(rand.rand())
    return {
      texture: rand.defaultChoice(frontTexturesSelected, defaultElement.texture),
      size: lerp(frontSizeMin, frontSizeMax, easingFn(1 - progress)),
      distance: lerp(frontDistanceStart, frontDistanceEnd, progress),
      color: rand.defaultChoice(frontColors, defaultElement.color),
    }
  })

  const backTexturesSelected = rand.sample(backTexturesOptional, rand.int(backTexturesNumMin, backTexturesNumMax))
  const backNumElements = rand.int(backElementsNumMin, backElementsNumMax)
  const backDistanceStart = rand.float(backOffsetMin, backOffsetMax)
  const backDistanceEnd = backDistanceStart + rand.float(backLengthMin, backLengthMax)
  const backElementProps = new Array(backNumElements).fill(0).map(() => {
    const progress = easingFn(rand.rand())
    return {
      texture: rand.defaultChoice(backTexturesSelected, defaultElement.texture),
      size: lerp(backSizeMin, backSizeMax, easingFn(1 - progress)),
      distance: -lerp(backDistanceStart, backDistanceEnd, progress),
      color: rand.defaultChoice(backColors, defaultElement.color),
    }
  })

  return [...oversizeElementProps, ...bodyElementProps, ...frontElementProps, ...backElementProps]
}
