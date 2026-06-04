// TSL port of blendSoftLight with opacity.

import { Fn, float, sqrt, vec3, mix } from 'three/tsl'

/**
 * Per-channel soft-light blend for a single float component.
 */
const softLightChannel = Fn(([base, blend]: [any, any]) => {
  const dark = base.mul(blend).mul(2.0).add(base.mul(base).mul(blend.mul(2.0).oneMinus()))
  const light = sqrt(base).mul(blend.mul(2.0).sub(1.0)).add(base.mul(float(2.0).sub(blend.mul(2.0))))
  return blend.lessThan(0.5).select(dark, light)
})

/**
 * vec3 soft-light blend with opacity fallback.
 */
export const blendSoftLight = Fn(([base, blend, opacity]: [any, any, any]) => {
  const blended = vec3(
    softLightChannel(base.x, blend.x),
    softLightChannel(base.y, blend.y),
    softLightChannel(base.z, blend.z),
  )
  return mix(base, blended, opacity)
})
