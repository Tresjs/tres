import type { Pass } from 'three/examples/jsm/postprocessing/Pass.js'
import type { Reactive, ShallowRef } from 'vue'
import { useTresContext } from '@tresjs/core'
import { inject, nextTick, onUnmounted, shallowRef, watch, watchEffect } from 'vue'
import { effectComposerInjectionKey } from '../EffectComposer.vue'

/**
 * @param newPassFunction - A function that returns a new pass instance.
 * @param passDependencies - A reactive object that the pass depends on (usually props). Changes to this object will trigger re-rendering.
 */
export const useEffect = <T extends Pass>(
  newPassFunction: () => T,
  passDependencies?: Reactive<object>,
): { pass: ShallowRef<T> } => {
  const composer = inject(effectComposerInjectionKey)

  const pass = shallowRef<T>(newPassFunction()) as ShallowRef<T>
  const { sizes, invalidate } = useTresContext()

  if (passDependencies) {
    watch(passDependencies, () => invalidate())
  }

  const unwatch = watchEffect(() => {
    if (!composer?.value || !sizes.height.value || !sizes.width.value) { return }

    composer.value.addPass(pass.value)
    nextTick(() => unwatch())
  })

  onUnmounted(() => {
    composer?.value?.removePass(pass.value)
    pass.value.dispose()
  })

  return { pass }
}
