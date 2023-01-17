import { AnimationAction, AnimationClip, AnimationMixer, Object3D, Scene } from 'three'
import { useRenderLoop } from '@tresjs/core'
import { ref, Ref, shallowReactive } from 'vue'

export function useAnimations<T extends AnimationClip>(
  animations: T[],
  modelRef?: Scene | Ref<Object3D | undefined | null>,
) {
  const reference: Ref<Object3D> = ref(modelRef) as Ref<Object3D>

  const mixer = new AnimationMixer(reference.value)

  const actions = shallowReactive<{ [key: string]: AnimationAction }>({})

  animations.forEach(animation => {
    const action = mixer.clipAction(animation, reference.value)
    actions[animation.name] = action
  })

  const { onLoop } = useRenderLoop()

  onLoop(({ delta }) => {
    mixer.update(delta)
  })

  return {
    actions,
    mixer,
  }
}
