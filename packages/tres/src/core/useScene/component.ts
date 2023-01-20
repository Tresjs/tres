import { useCamera } from '/@/core/'
import type { Renderer } from 'three'
import { defineComponent, inject, provide, Ref } from 'vue'
import { useRenderLoop } from '../useRenderLoop'
import { useScene } from './'
import { useRaycaster } from '../useRaycaster'

/**
 * Vue component for rendering a Tres component.
 */
export const Scene = defineComponent({
  name: 'Scene',
  setup(_props, { slots }) {
    const { scene } = useScene()
    const renderer = inject<Ref<Renderer>>('renderer')
    const { activeCamera } = useCamera()
    const { raycaster, pointer } = useRaycaster()
    const { onLoop } = useRenderLoop()

    provide('local-scene', scene)

    onLoop(() => {
      raycaster.value.setFromCamera(pointer.value, activeCamera.value)

      if (renderer?.value && activeCamera?.value && scene?.value) {
        renderer.value.render(scene?.value, activeCamera.value)
      }
    })

    return () => {
      if (slots.default) {
        return slots.default()
      }
    }
  },
})
