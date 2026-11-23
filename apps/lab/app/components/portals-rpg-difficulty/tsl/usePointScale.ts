import { useTres } from '@tresjs/core'
import { screenSize, uniform } from 'three/tsl'
import { watchEffect } from 'vue'

/**
 * The GLSL version sized points from the canvas height while it drew into the portal target.
 * Multiply a world size by this node to keep that tuned look at every portal resolution.
 */
export function usePointScale() {
  const canvasPixelHeight = uniform(1)
  const { sizes } = useTres()

  watchEffect(() => {
    canvasPixelHeight.value = sizes.height.value * sizes.pixelRatio.value
  })

  return canvasPixelHeight.div(screenSize.y)
}
