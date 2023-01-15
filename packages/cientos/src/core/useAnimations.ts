import { AnimationMixer, Clock, Object3D } from 'three'
import { useRenderLoop } from '@tresjs/core'
import { ref, Ref, shallowReactive } from 'vue'

export function useAnimations<T extends Animation>(animations: T[], modelRef?: Ref<Object3D | undefined | null>) {
  const reference: Ref<Object3D> = ref(modelRef) as Ref<Object3D>

  const mixer = new AnimationMixer(reference.value)

  const actions = shallowReactive({})

  animations.forEach(animation => {
    const action = mixer.clipAction(animation, reference.value)
    actions[animation.name] = action
  })

  const { onLoop } = useRenderLoop()

  // TODO: Workaround for https://github.com/Tresjs/tres/issues/81
  const clock = new Clock()

  onLoop(() => {
    const delta = clock.getDelta()
    mixer.update(delta)
  })

  return {
    actions,
    mixer,
  }
}
