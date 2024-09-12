const PASSIVE = true

export const POINTER_DOM_THREE_PASSIVE = ([
  ['click', 'click', 'onClick', !PASSIVE],
  ['click', 'pointermissed', 'onPointermissed', PASSIVE],
  ['contextmenu', 'contextmenu', 'onContextmenu', !PASSIVE],
  ['dblclick', 'dblclick', 'onDblclick', !PASSIVE],
  ['pointerup', 'pointerup', 'onPointerup', PASSIVE],
  ['pointerdown', 'pointerdown', 'onPointerdown', PASSIVE],
  ['pointermove', 'pointerover', 'onPointerover', PASSIVE],
  ['pointermove', 'pointerout', 'onPointerout', PASSIVE],
  ['pointermove', 'pointerenter', 'onPointerenter', PASSIVE],
  ['pointermove', 'pointerleave', 'onPointerleave', PASSIVE],
  ['pointermove', 'pointermove', 'onPointermove', PASSIVE],
  ['pointerup', 'lostpointercapture', 'onLostpointercapture', PASSIVE],
  ['wheel', 'wheel', 'onWheel', !PASSIVE],
]) as const

export type DomEvent = (typeof POINTER_DOM_THREE_PASSIVE)[number][0]
export type DomEventName = keyof DomEventMap
export type ThreeEventName = (typeof POINTER_DOM_THREE_PASSIVE)[number][2]

export const POINTER_EVENT_NAMES: (keyof DomEventMap)[] = POINTER_DOM_THREE_PASSIVE.map(row => row[0]) as DomEventName[]
export const DOM_EVENT_NAMES: DomEventName[] = POINTER_DOM_THREE_PASSIVE.map(row => row[1]) as DomEventName[]
export const THREE_EVENT_NAMES: ThreeEventName[] = POINTER_DOM_THREE_PASSIVE.map(row => row[2]) as ThreeEventName[]
export const RESERVED_PATCH_PROP_NAMES: (ThreeEventName | 'blocking')[] = [...THREE_EVENT_NAMES, 'blocking']

export const DOM_TO_THREE: Record<DomEventName, ThreeEventName> = POINTER_DOM_THREE_PASSIVE.reduce((acc, row) => { acc[row[1]] = row[2]; return acc }, {} as Record<keyof DomEventMap, ThreeEventName>)
export const DOM_TO_PASSIVE = POINTER_DOM_THREE_PASSIVE.reduce((acc, row) => { acc[row[1]] = row[3]; return acc }, {} as Record<keyof DomEventMap, boolean>)

// NOTE: Allow typing for DOM events
interface DomEventMap {
  click: MouseEvent
  contextmenu: MouseEvent
  dblclick: MouseEvent
  pointerup: PointerEvent
  pointerdown: PointerEvent
  pointerover: PointerEvent
  pointerout: PointerEvent
  pointerenter: PointerEvent
  pointerleave: PointerEvent
  pointermove: PointerEvent
  pointermissed: PointerEvent
  pointercancel: PointerEvent
  lostpointercapture: PointerEvent
  wheel: WheelEvent
}

// NOTE: Allow typing for attached events
export class DomEventTarget extends HTMLElement {
  public addEventListener<T extends keyof DomEventMap>(
    // the event name, a key of MyEventMap
    type: T,
    // the listener, using a value of MyEventMap
    listener: (this: DomEventTarget, ev: DomEventMap[T]) => any,
    // any options
    options?: boolean | AddEventListenerOptions
  ): void

  // NOTE: the fallback for any event names not in our map
  public addEventListener(
    type: string,
    listener: (this: DomEventTarget, ev: Event) => any,
    options?: boolean | AddEventListenerOptions,
  ): void {
    super.addEventListener(type, listener, options)
  }

  public removeEventListener<T extends keyof DomEventMap>(
    type: T,
    listener: (this: DomEventTarget, ev: DomEventMap[T]) => any,
    options?: boolean | EventListenerOptions,
  ): void

  // NOTE: the fallback for any event names not in our map
  public removeEventListener(
    type: string,
    listener: (this: DomEventTarget, ev: Event) => any,
    options?: boolean | EventListenerOptions,
  ): void {
    super.removeEventListener(type, listener, options)
  }
}
