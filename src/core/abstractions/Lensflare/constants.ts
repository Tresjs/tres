export const TEXTURE_PATH =
  'https://raw.githubusercontent.com/andretchen0/tresjs_assets/' +
  'b1bc3780de73a9328a530767c9a7f4cbab060396/textures/lensflare/'

export const circle = `${TEXTURE_PATH}circle.png`
export const circleBlur = `${TEXTURE_PATH}cirlceBlur.png`
export const circleRainbow = `${TEXTURE_PATH}circleRainbow.png`
export const line = `${TEXTURE_PATH}line.png`
export const poly4 = `${TEXTURE_PATH}poly4.png`
export const poly6 = `${TEXTURE_PATH}poly6.png`
export const poly8 = `${TEXTURE_PATH}poly8.png`
export const polyStroke4 = `${TEXTURE_PATH}polyStroke4.png`
export const polyStroke6 = `${TEXTURE_PATH}polyStroke6.png`
export const polyStroke8 = `${TEXTURE_PATH}polyStroke8.png`
export const rays4 = `${TEXTURE_PATH}rays4.png`
export const rays6 = `${TEXTURE_PATH}rays6.png`
export const rays8 = `${TEXTURE_PATH}rays8.png`
export const ring = `${TEXTURE_PATH}ring.png`
export const starThin4 = `${TEXTURE_PATH}starThin4.png`
export const starThin6 = `${TEXTURE_PATH}starThin6.png`
export const starThin8 = `${TEXTURE_PATH}starThin8.png`

// NOTE:
// Flare elements are divided into back, oversize, body, front.
// They are arranged as such, relative to the light source and camera:
//
// [distance < 0]   [distance == 0]   [distance > 0]
//                      light                          camera
//      back        body, oversize       front

export const oversizeTexturesOptional = [line, ring]
export const oversizeColors = ['white']
export const oversizeSizeMin = 750
export const oversizeSizeMax = 1024
export const oversizeElementsNumMin = 0
export const oversizeElementsNumMax = 2

export const bodyTexturesRequired = [circleBlur, rays6]
export const bodyTexturesOptional = [circle, circleRainbow, ring, starThin6]
export const bodyColors = ['white']
export const bodySizeMin = 180
export const bodySizeMax = 512
export const bodyTexturesOptionalNumMin = 2
export const bodyTexturesOptionalNumMax = 3

export const frontTexturesOptional = [circleBlur, circle, ring, poly6, polyStroke6]
export const [darkPurple, darkBlue] = [0x38235f, 0x02055a]
export const frontColors = ['dimgray', 'gray', 'darkgray', darkPurple, darkBlue]
export const frontTexturesNumMin = 2
export const frontTexturesNumMax = 4
export const frontSizeMin = 20
export const frontSizeMax = 180
export const frontOffsetMin = 0.5
export const frontOffsetMax = 1
export const frontLengthMin = 0.75
export const frontLengthMax = 2.5
export const frontElementsNumMin = 5
export const frontElementsNumMax = 21

export const backTexturesOptional = frontTexturesOptional
export const backColors = frontColors
export const backTexturesNumMin = 2
export const backTexturesNumMax = 4
export const backSizeMin = 180
export const backSizeMax = 360
export const backOffsetMin = 0.1
export const backOffsetMax = 0.2
export const backLengthMin = 0.5
export const backLengthMax = 0.6
export const backElementsNumMin = 0
export const backElementsNumMax = 5