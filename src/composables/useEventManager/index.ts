import type { PointerEventsMap } from '@pmndrs/pointer-events'
import { forwardHtmlEvents, getVoidObject } from '@pmndrs/pointer-events'
import type { TresCamera, TresObject, TresScene } from '../../types'
import { toValue } from 'vue'
import type { ComputedRef, MaybeRef } from 'vue'
import type { Object3D, Object3DEventMap } from 'three'

export const supportedPointerEvents = [
  'onClick',
  'onContextMenu',
  'onPointerMove',
  'onPointerEnter',
  'onPointerLeave',
  'onPointerOver',
  'onPointerOut',
  'onDoubleClick',
  'onPointerDown',
  'onPointerUp',
  'onPointerCancel',
  'onPointerMissed',
  'onLostPointerCapture',
  'onWheel',
]

export const pointerEventsMap = {
  onClick: 'click',
  onContextMenu: 'contextmenu',
  onPointerMove: 'pointermove',
  onPointerEnter: 'pointerenter',
  onPointerLeave: 'pointerleave',
  onPointerOver: 'pointerover',
  onPointerOut: 'pointerout',
  onDoubleClick: 'dblclick',
  onPointerDown: 'pointerdown',
  onPointerUp: 'pointerup',
  onPointerCancel: 'pointercancel',
  onPointerMissed: 'pointermissed',
  onLostPointerCapture: 'lostpointercapture',
  onWheel: 'wheel',
} as const

export function useEventManager({
  scene,
  canvas,
  camera,
}: {
  scene: TresScene
  canvas: MaybeRef<HTMLCanvasElement>
  camera: ComputedRef<TresCamera>
}) {
  const { update } = forwardHtmlEvents(toValue(canvas), () => toValue(camera), scene)
  const voidObject = getVoidObject(scene) as Object3D<Object3DEventMap & PointerEventsMap>

  function addEventListener(object: TresObject) {
    Object.entries(object.__tres?.handlers ?? {}).forEach(([event, handler]) => {
      object.addEventListener(pointerEventsMap[event as keyof typeof pointerEventsMap], handler)
      if (event === 'onPointerMissed') {
        voidObject.addEventListener('click', handler)
      }
    })
  }

  function deregisterObject(object: TresObject) {
    Object.entries(object.__tres?.handlers ?? {}).forEach(([event, handler]) => {
      object.removeEventListener(pointerEventsMap[event as keyof typeof pointerEventsMap], handler)
    })
  }
  return {
    addEventListener,
    deregisterObject,
    update,
  }
}
