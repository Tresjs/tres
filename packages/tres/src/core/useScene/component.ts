import { defineComponent, inject, provide, Ref } from 'vue'
import type { Renderer } from 'three'
import { useCamera, useTres, useRenderLoop, useScene, useRaycaster } from '/@/core/'

/**
 * Vue component for rendering a Tres component.
 */
export const Scene = defineComponent({
  name: 'Scene',
  setup(_props, { slots }) {
    const { setState } = useTres()
    const { scene } = useScene()
    const renderer = inject<Ref<Renderer>>('renderer')
    const { activeCamera } = useCamera()
    const { raycaster, pointer } = useRaycaster()
    const { onLoop } = useRenderLoop()

    provide('local-scene', scene)
    setState('scene', scene.value)

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
