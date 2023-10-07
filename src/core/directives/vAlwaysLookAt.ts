import { useRenderLoop, useLogger } from '@tresjs/core'
import type { Object3D } from 'three'
import { extractBindingPosition } from '../../utils/index'

const { logWarning } = useLogger()

export const vAlwaysLookAt = {
  updated: (el: Object3D, binding: any) => {
    const observer = extractBindingPosition(binding)
    if (!observer) {
      logWarning(`v-always-look-at: problem with binding value: ${binding.value}`)
      return
    }
    const { onLoop } = useRenderLoop()
    onLoop(() => {
      el.lookAt(observer)
    })
  },
}
