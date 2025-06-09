import type { Events } from 'vue'

// Custom Tres events that aren't part of Vue's Events type
type CustomTresEvents = 'onPointermissed' | 'onLostpointercapture'

// All supported pointer events (Vue Events + custom Tres events)
type SupportedPointerEvents = Extract<keyof Events, 'onClick'
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
  | 'onWheel'> | CustomTresEvents

export const supportedPointerEvents = [
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
] as const satisfies readonly SupportedPointerEvents[]

export type PointerEvent = typeof supportedPointerEvents[number]

export const pointerEventsMapVueToThree: Record<PointerEvent, string> = {
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
