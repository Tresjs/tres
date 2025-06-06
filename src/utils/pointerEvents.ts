import type { Events } from 'vue'

export const supportedPointerEvents: (Extract<keyof Events, 'onClick'
  | 'onContextmenu'
  | 'onPointermove'
  | 'onPointerenter'
  | 'onPointerleave'
  | 'onPointerover'
  | 'onPointerout'
  | 'onDblclick'
  | 'onPointerdown'
  | 'onPointerup'
  | 'onPointercancel'
  | 'onPointermissed'
  | 'onLostpointercapture'
  | 'onWheel'> | 'onPointermissed' | 'onLostpointercapture')[] = [
  'onClick',
  'onContextmenu',
  'onPointermove',
  'onPointerenter',
  'onPointerleave',
  'onPointerover',
  'onPointerout',
  'onDblclick',
  'onPointerdown',
  'onPointerup',
  'onPointercancel',
  'onPointermissed',
  'onLostpointercapture',
  'onWheel',
] as const
// TODO add breaking change info concerning support old style (lowercase + onDoubleClick (long form))
// TODO update docs

export type PointerEvent = typeof supportedPointerEvents[number]

export const pointerEventsMapVueToThree: Record<PointerEvent, string> = { // TODO move
  onClick: 'click',
  onContextmenu: 'contextmenu',
  onPointermove: 'pointermove',
  onPointerenter: 'pointerenter',
  onPointerleave: 'pointerleave',
  onPointerover: 'pointerover',
  onPointerout: 'pointerout',
  onDblclick: 'dblclick',
  onPointerdown: 'pointerdown',
  onPointerup: 'pointerup',
  onPointercancel: 'pointercancel',
  onPointermissed: 'pointermissed',
  onLostpointercapture: 'lostpointercapture',
  onWheel: 'wheel',
}

export const isSupportedPointerEvent = (event: string): event is PointerEvent =>
  supportedPointerEvents.includes(event as PointerEvent)
