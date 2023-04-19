import { useCore } from '../useCore'
import { BlendFunction, EffectPass, OutlineEffect } from 'postprocessing'
import { defineComponent, inject, onUnmounted, shallowRef, toRaw, watch, watchEffect } from 'vue'

import type { Object3D } from 'three'

export interface OutlineProps {
  outlinedObjects?: Object3D<Event>[]
}

export const Outline = defineComponent<OutlineProps>({
  name: 'Outline',
  props: ['outlinedObjects'] as unknown as undefined, // TODO add props
  setup(props) {
    const { state } = useCore()
    const composer = inject<any>('effectComposer') // TODO inject type
    const pass = shallowRef<EffectPass | null>(null)
    const effect = shallowRef<OutlineEffect | null>(null)

    watchEffect(() => {
      // TODO watchOnce ?
      if (state.camera && composer && composer.value && state.scene) {
        effect.value = new OutlineEffect(state.scene, state.camera, {
          blendFunction: BlendFunction.SCREEN,
          edgeStrength: 2.5,
          pulseSpeed: 0.0,
          visibleEdgeColor: 0xffffff,
          hiddenEdgeColor: 0x22090a,
          height: 480,
          blur: false,
          xRay: true,
        })
        pass.value = new EffectPass(state.camera, effect.value)

        composer.value?.addPass(pass.value)
      }
    })

    watch(
      [() => props.outlinedObjects, effect], // whatchEffect is intentionally not used here as it would result in an endless loop
      () => {
        effect.value?.selection.set(props.outlinedObjects || [])
      },
    )

    onUnmounted(() => {
      pass.value?.dispose() // TODO check if this redundant (maybe it is done by tres?)
    })

    return () => {
      pass
    }
  },
})
