import type { Effect } from 'postprocessing'
import { EffectPass } from 'postprocessing'
import { inject, onUnmounted, shallowRef, watchEffect, defineExpose } from 'vue'
import { useTresContext } from '@tresjs/core'
import { effectComposerInjectionKey } from '../injectionKeys'

export const useEffect = <T extends Effect>( newEffectFunction: () => T) => {
  const composer = inject(effectComposerInjectionKey)
  const pass = shallowRef<EffectPass | null>(null)
  const effect = shallowRef<T | null>(null)

  const { scene, camera } = useTresContext()

  watchEffect(() => {
    if (!camera.value || !effect?.value) return

    effect.value.mainCamera = camera.value
  })
  
  let unwatch = () => {} // seperate declaration prevents error in HMR

  unwatch = watchEffect(() => {
    if (!camera.value || !composer?.value || !scene.value) return
  
    unwatch()
    if (effect.value) return
  
    effect.value = newEffectFunction()
    pass.value = new EffectPass(camera.value, effect.value)
  
    composer.value.addPass(pass.value)
  })

  onUnmounted(() => {
    if (pass.value) composer?.value?.removePass(pass.value)
    effect.value?.dispose()
    pass.value?.dispose()
  })

  return {
    pass,
    effect,
  }
}