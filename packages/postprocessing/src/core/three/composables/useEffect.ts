import type { Pass } from 'three/examples/jsm/postprocessing/Pass.js'
import type { Reactive, ShallowRef } from 'vue'
import { useTres } from '@tresjs/core'
import { inject, nextTick, onUnmounted, shallowRef, watch, watchEffect } from 'vue'
import { effectComposerInjectionKey } from '../EffectComposer.vue'

/**
 * @param newPassFunction - A function that returns a new pass instance.
 * @param passDependencies - A reactive object that the pass depends on (usually props). Changes to this object will trigger re-rendering.
 * @param dependencyFieldsTriggeringRecreation - fields in passDependencies that require effect recreation when changed
 */
export const useEffect = <T extends Pass, D extends Record<PropertyKey, any>>(
  newPassFunction: () => T,
  passDependencies?: Reactive<D>,
  dependencyFieldsTriggeringRecreation?: (keyof D)[],
): { pass: ShallowRef<T> } => {
  if (!passDependencies && dependencyFieldsTriggeringRecreation) {
    throw new Error('passDependencies is required when dependencyFieldsTriggeringRecreation is provided')
  }

  const composer = inject(effectComposerInjectionKey)

  const pass = shallowRef<T>(newPassFunction()) as ShallowRef<T>
  const { sizes, invalidate } = useTres()

  if (passDependencies) {
    watch(passDependencies, () => invalidate())
  }

  const removePass = () => {
    composer?.value?.removePass(pass.value)
    pass.value.dispose()
  }

  const unwatch = watchEffect(() => {
    if (!composer?.value || !sizes.height.value || !sizes.width.value) { return }

    composer.value.addPass(pass.value)
    nextTick(() => unwatch())
  })

  if (dependencyFieldsTriggeringRecreation) {
    watch(
      () => dependencyFieldsTriggeringRecreation.map(field => passDependencies?.[field]),
      () => {
        if (!composer?.value) { return }

        const index = composer.value.passes.findIndex(p => p === pass.value)

        if (!~index) { return }

        removePass()
        pass.value = newPassFunction()
        composer.value.insertPass(pass.value, index)
      },
    )
  }

  onUnmounted(() => {
    removePass()
  })

  return { pass }
}
