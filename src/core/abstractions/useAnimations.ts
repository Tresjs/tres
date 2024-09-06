import { useLoop } from '@tresjs/core'
import { AnimationMixer } from 'three'
import { ref, shallowReactive } from 'vue'
import type { AnimationAction, AnimationClip, Object3D, Scene } from 'three'
import type { Ref } from 'vue'

/**
 * Creates an AnimationMixer and returns it.
 *
 * @export
 * @template T
 * @param {T[]} animations
 * @param {(Scene | Ref<Object3D | undefined | null>)} [modelRef]
 * @return {*}
 */
export function useAnimations<T extends AnimationClip>(
  animations: T[],
  modelRef?: Scene | Ref<Object3D | undefined | null>,
) {
  const reference: Ref<Object3D> = ref(modelRef) as Ref<Object3D>

  const mixer = new AnimationMixer(reference.value)

  const actions = shallowReactive<{ [key: string]: AnimationAction }>({})

  animations.forEach((animation) => {
    const action = mixer.clipAction(animation, reference.value)
    actions[animation.name] = action
  })

  const { onBeforeRender } = useLoop()

  onBeforeRender(({ delta }) => {
    mixer.update(delta)
  })

  return {
    actions,
    mixer,
  }
}
