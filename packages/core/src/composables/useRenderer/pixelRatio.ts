import { isFunction, isNumber } from '../../utils/is'
import { MathUtils } from 'three'

export const setPixelRatio = (
  renderer: { setPixelRatio?: (dpr: number) => void, getPixelRatio?: () => number },
  systemDpr: number,
  userDpr?: number | [number, number],
) => {
  // NOTE: Optional `setPixelRatio` allows this function to accept
  // THREE renderers like SVGRenderer.
  if (!isFunction(renderer.setPixelRatio)) { return }

  let newDpr = 0

  if (userDpr && Array.isArray(userDpr) && userDpr.length >= 2) {
    const [min, max] = userDpr
    newDpr = MathUtils.clamp(systemDpr, min, max)
  }
  else if (isNumber(userDpr)) { newDpr = userDpr }
  else { newDpr = systemDpr }

  // NOTE: Don't call `setPixelRatio` unless both:
  // - the dpr value has changed
  // - the renderer has `setPixelRatio`; this check allows us to pass any THREE renderer
  if (newDpr !== renderer.getPixelRatio?.()) { renderer.setPixelRatio(newDpr) }
}
