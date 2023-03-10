import { Scene } from 'three'
import { shallowRef } from 'vue'

const scene = shallowRef(new Scene())

/**
 * Composable for accessing the scene.
 *
 * @export
 * @return {*} {ShallowRef<Scene>}
 */
export function useScene() {
  return {
    scene,
  }
}
