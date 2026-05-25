import { useLoop } from '@tresjs/core'
import type { Object3D } from 'three'
import type { Ref } from 'vue'
import { shallowRef, unref, watch } from 'vue'

// NOTE: Inspiration
// https://github.com/pmndrs/drei/blob/master/src/core/useIntersect.tsx

type UseIntersectCallback = (isIntersected: boolean) => void

// NOTE: As of this writing, Cientos components
// use `defineExpose` in this form:
// defineExpose({ instance: THE_COMPONENT })
//
// This means they have to be accessed like
// `obj.instance`, and not merely `obj`
interface CientosExposed { instance: Object3D }
type ObjOrCientosExposed = Object3D | CientosExposed
function normalizeCientosInstance(obj: ObjOrCientosExposed) {
  if ('onBeforeRender' in obj && 'onAfterRender' in obj) { return obj }
  return obj.instance
}

export function useIntersect<T extends Object3D>(onChange: Ref<UseIntersectCallback> | UseIntersectCallback = () => {}) {
  const ref = shallowRef<T>()
  const intersect = shallowRef(false)
  let _isIntersected = false
  let _oldIsIntersected = false

  const loop = useLoop()

  function setup(objOrCientosExposed: ObjOrCientosExposed) {
    const obj = normalizeCientosInstance(objOrCientosExposed)

    let oldOnRender = obj.onBeforeRender

    const { off: off0 } = loop.onBeforeRender(() => {
      _isIntersected = false

      // NOTE: If the object is inside the frustum, THREE will call onBeforeRender.
      oldOnRender = obj.onBeforeRender
      obj.onBeforeRender = () => (_isIntersected = true)
    })

    const { off: off1 } = loop.onRender(() => {
      if (_isIntersected !== _oldIsIntersected) {
        intersect.value = _isIntersected
        unref(onChange)?.(_isIntersected)
        _oldIsIntersected = _isIntersected
      }
    })

    return () => {
      off0()
      off1()
      obj.onBeforeRender = oldOnRender
    }
  }

  let teardown = () => { }

  watch(ref, () => {
    teardown()
    if (ref.value) {
      teardown = setup(ref.value)
    }
  })

  return { ref, intersect, off: () => teardown() }
}
