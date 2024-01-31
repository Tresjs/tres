import { shallowRef } from 'vue'
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
      modifiers: Partial<{ x: boolean; y: boolean; z: boolean }>
    },
  ) => {
    if (el.isCamera) {
      logWarning(`Rotate the ${el.type} is not a good idea`)
      return
    }
    const speed = binding.value ?? 0.01
    const defaultQuaternion = new Quaternion()
    const quaternionX = shallowRef(
      binding.modifiers.x || binding.arg === 'x'
        ? new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), speed)
        : defaultQuaternion,
    )
    const quaternionY = shallowRef(
      binding.modifiers.y || binding.arg === 'y'
        ? new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), speed)
        : defaultQuaternion,
    )
    const quaternionZ = shallowRef(
      binding.modifiers.z || binding.arg === 'z'
        ? new Quaternion().setFromAxisAngle(new Vector3(0, 0, 1), speed)
        : defaultQuaternion,
    )
    if (
      quaternionX.value === defaultQuaternion
      && quaternionY.value === defaultQuaternion
      && quaternionZ.value === defaultQuaternion
    ) {
      quaternionZ.value = new Quaternion().setFromAxisAngle(
        new Vector3(0, 0, 1),
        speed,
      )
      quaternionY.value = new Quaternion().setFromAxisAngle(
        new Vector3(0, 1, 0),
        speed,
      )
    }

    const { onLoop } = useRenderLoop()

    onLoop(() => {
      el.applyQuaternion(quaternionX.value)
      el.applyQuaternion(quaternionY.value)
      el.applyQuaternion(quaternionZ.value)
    })
  },
}
