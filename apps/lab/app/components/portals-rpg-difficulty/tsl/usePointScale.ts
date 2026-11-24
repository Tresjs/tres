import { useTres } from '@tresjs/core'
import { screenSize, uniform } from 'three/tsl'
import { watchEffect } from 'vue'

// Canvas height over target height. The spark and note sizes are tuned with this factor; without it they grow about 2.5x.
export function usePointScale() {
  const canvasPixelHeight = uniform(1)
  const { sizes } = useTres()

  watchEffect(() => {
    canvasPixelHeight.value = sizes.height.value * sizes.pixelRatio.value
  })

  return canvasPixelHeight.div(screenSize.y)
}
