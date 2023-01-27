import { WebGLRenderer } from 'three'
import { shallowReactive, toRefs } from 'vue'
import { Camera } from '/@/core'

export interface TresState {
  camera?: Camera
  renderer?: WebGLRenderer
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
