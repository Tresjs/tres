import { Clock, EventDispatcher, Raycaster, Scene, Vector2, WebGLRenderer } from 'three'
import { ComputedRef, shallowReactive, toRefs } from 'vue'
import { Camera } from '/@/core'

export interface TresState {
  camera?: ComputedRef<Camera>
  aspectRatio?: ComputedRef<number>
  renderer?: WebGLRenderer
  scene?: Scene
  raycaster?: Raycaster
  clock?: Clock
  pointer?: Vector2
  currentInstance?: any
  controls?: (EventDispatcher & { enabled: boolean }) | null
  [key: string]: any
}

const state: TresState = shallowReactive({})

export function useTres() {
  function getState(key: string) {
    return state[key]
  }

  function setState(key: string, value: any) {
    state[key] = value
  }

  return {
    state,
    ...toRefs(state),
    getState,
    setState,
  }
}
