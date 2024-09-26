import type { Pass } from 'three/examples/jsm/postprocessing/Pass.js'
import type { ShallowRef } from 'vue'
import { useTresContext } from '@tresjs/core'
import { inject, onUnmounted, shallowRef, watchEffect } from 'vue'
import { effectComposerInjectionKey } from '../EffectComposer.vue'

export const useEffect = <T extends Pass>(newPassFunction: () => T): { pass: ShallowRef<T> } => {
  const composer = inject(effectComposerInjectionKey)

  const pass = shallowRef<T>(newPassFunction()) as ShallowRef<T>
  const { sizes } = useTresContext()

  let unwatch = () => {} // seperate declaration prevents error in HMR
  unwatch = watchEffect(() => {
    if (!composer?.value || !sizes.height.value || !sizes.width.value) { return }

    composer.value.addPass(pass.value)
    unwatch()
  })

  onUnmounted(() => {
    composer?.value?.removePass(pass.value)
    pass.value.dispose()
  })

  return { pass }
}
