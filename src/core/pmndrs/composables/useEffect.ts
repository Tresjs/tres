import type { Effect } from 'postprocessing'
import type { Reactive, ShallowRef } from 'vue'
import { useTresContext } from '@tresjs/core'
import { EffectPass } from 'postprocessing'
import { inject, nextTick, onUnmounted, shallowRef, watch, watchEffect } from 'vue'
import { effectComposerInjectionKey } from '../EffectComposer.vue'

export const useEffect = <T extends Effect>(
  newEffectFunction: () => T,
  passDependencies: Reactive<object>,
): {
  pass: ShallowRef<EffectPass | null>
  effect: ShallowRef<T | null>
} => {
  const composer = inject(effectComposerInjectionKey)
  const pass = shallowRef<EffectPass | null>(null) as ShallowRef<EffectPass | null>
  const effect = shallowRef<T | null>(null) as ShallowRef<T | null>

  const { scene, camera, invalidate } = useTresContext()

  if (passDependencies) {
    watch(passDependencies, () => invalidate())
  }

  watchEffect(() => {
    if (!camera.value || !effect?.value) { return }

    effect.value.mainCamera = camera.value
  })

  const unwatch = watchEffect(() => {
    if (!camera.value || !composer?.value || !scene.value) { return }

    nextTick(() => unwatch())
    if (effect.value) { return }

    effect.value = newEffectFunction()
    pass.value = new EffectPass(camera.value, effect.value)

    composer.value.addPass(pass.value)
  })

  onUnmounted(() => {
    if (pass.value) { composer?.value?.removePass(pass.value) }
    effect.value?.dispose()
    pass.value?.dispose()
  })

  return {
    pass,
    effect,
  }
}
