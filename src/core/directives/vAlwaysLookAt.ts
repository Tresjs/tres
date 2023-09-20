import { useRenderLoop } from '@tresjs/core'
import { Vector3 } from 'three'
import type { Object3D } from 'three'

export const vAlwaysLookAt = {
  updated: (el: Object3D, binding: any) => {
    let observer = binding.value
    if (binding.value && binding.value?.value?.isMesh) {
      observer = binding.value.value.position
    }
    if (Array.isArray(binding.value)) {
      observer = new Vector3(...observer)
    }
    const { onLoop } = useRenderLoop()
    onLoop(() => {
      el.lookAt(observer)
    })
  },
}
