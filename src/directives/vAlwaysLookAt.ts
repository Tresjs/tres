import type { Object3D } from 'three'
import type { Ref } from 'vue'
import { extractBindingPosition } from '../utils'
import type { TresVector3 } from '../types'
import { useLogger, useUpdate } from '../composables'

const { logWarning } = useLogger()

export const vAlwaysLookAt = {
  updated: (el: Object3D, binding: Ref<TresVector3>) => {
    const observer = extractBindingPosition(binding)
    if (!observer) {
      logWarning(`v-always-look-at: problem with binding value: ${binding.value}`)
      return
    }
    useUpdate(() => {
      el.lookAt(observer)
    })
  },
}
