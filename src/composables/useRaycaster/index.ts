import { Raycaster, Vector2 } from 'three'
import { Ref, ref, ShallowRef, shallowRef } from 'vue'
import { useTres } from '/@/composables'

const raycaster = shallowRef(new Raycaster())
const pointer = ref(new Vector2())
const currentInstance = ref(null)

/**
 * Raycaster composable return type
 *
 * @export
 * @interface UseRaycasterReturn
 */
export interface UseRaycasterReturn {
  /**
   * Raycaster instance
   *
   * @type {ShallowRef<Raycaster>}
   * @memberof UseRaycasterReturn
   */
  raycaster: ShallowRef<Raycaster>
  /**
   * Pointer position
   *
   * @type {Ref<Vector2>}
   * @memberof UseRaycasterReturn
   */
  pointer: Ref<Vector2>
}

/**
 * Composable to provide raycaster support and pointer information
 *
 * @see https://threejs.org/docs/index.html?q=raycas#api/en/core/Raycaster
 * @export
 * @return {*} {UseRaycasterReturn}
 */
export function useRaycaster(): UseRaycasterReturn {
  const { setState } = useTres()
  setState('raycaster', raycaster.value)
  setState('pointer', pointer)
  setState('currentInstance', currentInstance)

  function onPointerMove(event: MouseEvent) {
    pointer.value.x = (event.clientX / window.innerWidth) * 2 - 1
    pointer.value.y = -(event.clientY / window.innerHeight) * 2 + 1
  }

  window.addEventListener('pointermove', onPointerMove)

  /*  onUnmounted(() => {
    window.removeEventListener('pointermove', onPointerMove)
  }) */
  return {
    raycaster,
    pointer,
  }
}
