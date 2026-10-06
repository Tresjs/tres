import { useLoop } from '@tresjs/core'
import { AnimationMixer } from 'three'
import { computed, ref, shallowReactive, unref, watch } from 'vue'
import type { AnimationAction, AnimationClip, Object3D } from 'three'
import type { MaybeRef, Ref } from 'vue'

/**
 * Creates an AnimationMixer and returns it.
 *
 * `actions` is keyed by clip name. Pass the model's clip names as `TName` to get those
 * keys typed instead of a bare string index — `tres gltf` generates that union for you.
 *
 * @example
 * ```ts
 * type ActionName = 'Idle' | 'Run'
 * const { actions } = useAnimations<AnimationClip, ActionName>(animations, modelRef)
 * actions.Idle?.play()
 * ```
 *
 * @export
 * @template T
 * @template TName
 * @param {T[]} animations
 * @param {(Scene | Ref<Object3D | undefined | null>)} [modelRef]
 * @return {*}
 */
export function useAnimations<T extends AnimationClip, TName extends string = string>(
  animations: MaybeRef<T[]>,
  modelRef?: MaybeRef<Object3D | undefined | null>,
  options?: {
    manualUpdate?: boolean
  },
) {
  const reference: Ref<Object3D> = ref(modelRef) as Ref<Object3D>

  const mixer = computed(() => new AnimationMixer(reference.value))

  const actions = shallowReactive<{ [key: string]: AnimationAction | undefined }>({})

  const setupActions = () => {
    const items = unref(animations)
    // A template ref binds a flush after the clips land, so the root can still be
    // empty here. The watcher below re-runs this once it arrives.
    if (reference.value && items && items.length > 0) {
      Object.keys(actions).forEach(key => delete actions[key])
      items.forEach((animation: T) => {
        const action = mixer.value.clipAction(animation, reference.value)
        actions[animation.name] = action
      })
    }
  }

  // Post-flush on purpose: three resolves an action's property bindings when it is
  // played, and a consumer watching `actions` reacts one flush after they are filled.
  // Setting up before the render would hand that consumer a root whose children are
  // not in the graph yet, and every track would bind to nothing.
  watch(animations, setupActions, { deep: true, immediate: true, flush: 'post' })

  watch(reference, (newRef) => {
    if (newRef) {
      mixer.value.uncacheRoot(reference.value)
      setupActions()
    }
  }, { flush: 'post' })

  if (!options?.manualUpdate) {
    const { onBeforeRender } = useLoop()

    onBeforeRender(({ delta }) => {
      mixer.value.update(delta)
    })
  }

  return {
    // Filled in from the clips at runtime, so the declared keys are the caller's claim.
    actions: actions as Record<TName, AnimationAction | undefined>,
    mixer,
  }
}
