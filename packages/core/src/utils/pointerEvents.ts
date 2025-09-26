import type { Events } from 'vue'
import type { PointerEvent } from '@pmndrs/pointer-events'

// Custom Tres events that aren't part of Vue's Events type
type CustomTresEvents = 'onLostpointercapture'

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
  'onLostpointercapture',
  'onWheel',
] as const satisfies readonly SupportedPointerEvents[]

export type SupportedVuePointerEvent = typeof supportedPointerEvents[number]

export type TresPointerEventName = 'click' | 'contextmenu' | 'pointermove' | 'pointerenter' | 'pointerleave' | 'pointerover' | 'pointerout' | 'dblclick' | 'pointerdown' | 'pointerup' | 'pointercancel' | 'lostpointercapture' | 'wheel'

export const pointerEventsMapVueToThree: Record<SupportedVuePointerEvent, TresPointerEventName> = {
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
  onLostpointercapture: 'lostpointercapture',
  onWheel: 'wheel',
}

export const isSupportedPointerEvent = (event: string): event is SupportedVuePointerEvent =>
  supportedPointerEvents.includes(event as SupportedVuePointerEvent)

export type TresPointerEvent = PointerEvent<MouseEvent>
export type PointerEventHandlers = {
  [key in SupportedVuePointerEvent]: (event: TresPointerEvent) => void
}
