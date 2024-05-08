import { ref } from 'vue'
import { Quaternion, Vector3 } from 'three'
import type { TresObject } from '../types'
import { useLogger, useRenderLoop } from '../composables'

const { logWarning } = useLogger()

export const vRotate = {
  mounted: (
    el: TresObject,
    binding: {
      arg: 'x' | 'y' | 'z'
      value: number
      modifiers: Partial<{ x: boolean, y: boolean, z: boolean }>
    },
  ) => {
    if (el.isCamera) {
      logWarning(`Rotate the ${el.type} is not a good idea`)
      return
    }
    const radiansPerFrame = binding.value ?? 0.01
    const x = ref(binding.modifiers.x || binding.arg === 'x' ? 1 : 0)
    const y = ref(binding.modifiers.y || binding.arg === 'y' ? 1 : 0)
    const z = ref(binding.modifiers.z || binding.arg === 'z' ? 1 : 0)

    if (x.value + y.value + z.value === 0) {
      x.value = 1
      y.value = 1
    }

    const quaternion = new Quaternion().setFromAxisAngle(new Vector3(x.value, y.value, z.value)
      .normalize(), radiansPerFrame)

    const { onLoop } = useRenderLoop()
    onLoop(() => {
      el.applyQuaternion(quaternion)
    })
  },
}
