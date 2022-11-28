import { Scene } from 'three'
import { shallowRef } from 'vue'

const scene = shallowRef(new Scene())

export function useScene() {
  return {
    scene,
  }
}
