import type { Object3D } from 'three'
import type { MaybeRefOrGetter } from 'vue'
import { onBeforeUnmount, shallowRef, toValue, watchEffect } from 'vue'
import type { TresObject } from '@tresjs/core'
import { useLoop, useTres } from '@tresjs/core'

// NOTE: Source
// https://github.com/pmndrs/drei/blob/master/src/core/Helper.tsx

type HelperType = Object3D & { update: () => void, dispose: () => void }
type HelperConstructor = new (...args: any[]) => any

export function useHelper<T extends HelperConstructor>(
  object3D: MaybeRefOrGetter<TresObject | null | undefined | false>,
  helperConstructor: T,
  ...args: any[]
) {
  const helper = shallowRef<HelperType>()
  const { scene } = useTres()

  let currentHelper: HelperType = undefined!

  watchEffect(() => {
    if (object3D && toValue(object3D) && helperConstructor) {
      // eslint-disable-next-line new-cap
      helper.value = currentHelper = new helperConstructor(toValue(object3D), ...args)
    }

    if (currentHelper) {
      // NOTE: Prevent the helpers from blocking rays
      currentHelper.traverse(child => (child.raycast = () => null))
      scene.value.add(currentHelper)
    }
  })

  onBeforeUnmount(() => {
    helper.value = undefined
    scene.value.remove(currentHelper)
    currentHelper.dispose?.()
  })

  useLoop().onBeforeRender(() => {
    helper.value?.update?.()
  })

  return helper
}
