import { capitalize } from 'vue'
import { isProd, useLogger } from '../../composables'
import * as is from '../is'
import { DOM_TO_THREE, THREE_EVENT_NAMES } from './const'
import type { EventHandler, ThreeEvent, TresInstance } from '../../types'
import type { DomEventName } from './const'

const SYSTEM_MODIFIERS = ['ctrl', 'shift', 'alt', 'meta'] as const
type SystemModifier = typeof SYSTEM_MODIFIERS[number]

const EXACT_MODIFIER = ['exact'] as const
type ExactModifier = typeof EXACT_MODIFIER[number]

const MOUSE_EVENT_MODIFIERS = ['left', 'right', 'middle'] as const
type MouseEventModifier = typeof MOUSE_EVENT_MODIFIERS[number]

const VUE_EVENT_MODIFIERS = ['capture', 'once', 'passive', 'prevent', 'self', 'stop'] as const
type VueEventModifier = typeof VUE_EVENT_MODIFIERS[number]

type EventModifier =
  | SystemModifier
  | ExactModifier
  | MouseEventModifier
  | VueEventModifier

export const EVENT_MODIFIERS: EventModifier[] = [...SYSTEM_MODIFIERS, ...EXACT_MODIFIER, ...MOUSE_EVENT_MODIFIERS, ...VUE_EVENT_MODIFIERS] as const
const eventModifierRE = new RegExp(`(?:${EVENT_MODIFIERS.map(capitalize).join('|')})$`)

type ModifierGuards = SystemModifier | MouseEventModifier | ExactModifier | 'stop' | 'prevent' | 'self'

type KeyedEvent = KeyboardEvent | MouseEvent | TouchEvent

const modifierGuards: Record<
  ModifierGuards,
  | ((e: ThreeEvent<Event>) => void | boolean)
  | ((e: ThreeEvent<Event>, modifiers: string[]) => void | boolean)
> = {
  prevent: (e: ThreeEvent<Event>) => e.nativeEvent.preventDefault(),
  self: (e: ThreeEvent<Event>) => e.currentTarget !== e.target,
  stop: (e: ThreeEvent<Event>) => e.stopPropagation(),
  shift: (e: ThreeEvent<Event>) => !(e.nativeEvent as KeyedEvent).shiftKey,
  alt: (e: ThreeEvent<Event>) => !(e.nativeEvent as KeyedEvent).altKey,
  ctrl: (e: ThreeEvent<Event>) => !(e.nativeEvent as KeyedEvent).ctrlKey,
  meta: (e: ThreeEvent<Event>) => !(e.nativeEvent as KeyedEvent).metaKey,
  left: (e: ThreeEvent<Event>) => 'button' in e.nativeEvent && (e.nativeEvent as MouseEvent).button !== 0,
  middle: (e: ThreeEvent<Event>) => 'button' in e.nativeEvent && (e.nativeEvent as MouseEvent).button !== 1,
  right: (e: ThreeEvent<Event>) => 'button' in e.nativeEvent && (e.nativeEvent as MouseEvent).button !== 2,
  exact: (e: ThreeEvent<Event>, modifiers: string[]) =>
    SYSTEM_MODIFIERS.some(m => (e.nativeEvent as any)[`${m}Key`] && !modifiers.includes(m))
  ,
}

const cacheStringFunction = <T extends (str: string) => string>(fn: T): T => {
  const cache: Record<string, string> = Object.create(null)
  return ((str: string) => {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }) as T
}

export function patchEvent(
  obj: TresInstance,
  rawName: string,
  prevValue: EventHandler<any> | null,
  nextValue: EventHandler<any> | unknown,
): void {
  const handlers = obj.__tres.handlers || (obj.__tres.handlers = { })

  console.log(rawName, "patchEvent", obj.uuid, nextValue)
  if (!prevValue && nextValue) {
    // NOTE: add
    handlers[rawName] = { value: sanitizeEventValue(nextValue, rawName) }
    updateEventInvoker(obj, rawName)
  }
  else if (prevValue && nextValue) {
    // NOTE: patch
    handlers[rawName].value = sanitizeEventValue(nextValue, rawName)
    updateEventInvoker(obj, rawName)
  }
  else if (prevValue) {
    // NOTE: remove
    delete handlers[rawName]
    updateEventInvoker(obj, rawName)
  }
}

function updateEventInvoker(obj: TresInstance, rawName: string) {
  // NOTE:
  // We need to unify all the different event handlers for an event
  // behind a single function call.
  //
  // PROBLEMS:
  // - An event prop's value can be a function or an array of functions.
  // - Tres supports most event modifiers here:
  //   https://vuejs.org/guide/essentials/event-handling.html#event-modifiers
  //
  // That means if  we get this ...
  // `<TresMesh @click="fn0" @click.self="fn1" @click.self.once="[fn2, fn3]" />`
  // ... we (may need to) call fn0, fn1, fn2, fn3 when we fire a `click` event.
  //
  // We need to put all of these functions and the logic for their event
  // modifiers behind a single function call.

  // NOTE: Gather events to be fired at the same time as `rawName`,
  // e.g. `onClick`, `onClickStop`, `onClickStopSelf`
  const domEventName = parseName(rawName)[0] as DomEventName
  const threeEventName = DOM_TO_THREE[domEventName]
  const rawNamesForDomEvent = Object.keys(obj.__tres.handlers).filter(key => key.startsWith(threeEventName))

  // NOTE: No events handlers. Delete the key.
  if (rawNamesForDomEvent.length === 0) {
    delete obj[threeEventName]
    return
  }

  // NOTE: Only one event handler. Only a single invoker is required.
  if (rawNamesForDomEvent.length === 1) {
    obj[threeEventName] = createInvoker(obj, rawNamesForDomEvent[0])
    return
  }

  // NOTE: There are multiple event handlers for this event
  // Create an "invoker" for each.
  const invokers = [] as ((event: ThreeEvent<Event>) => void)[]
  for (const rawName of rawNamesForDomEvent) {
    invokers.push(createInvoker(obj, rawName))
  }
  // NOTE: Place the invokers' calls behind a single function call.
  obj[threeEventName] = (event: ThreeEvent<Event>) => {
    for (const invoker of invokers) {
      invoker(event)
    }
  }
}

// Source: https://github.com/vuejs/core/blob/817dca8712206e0d88787a107b711d4a2f495ba9/packages/runtime-dom/src/directives/vOn.ts
const withModifiers = <
  T extends (event: ThreeEvent<Event>, ...args: unknown[]) => any,
>(
  fn: T & { _withMods?: { [key: string]: T } },
  modifiers: EventModifier[],
): T => {
  const cache = fn._withMods || (fn._withMods = {})
  const cacheKey = modifiers.join('.')
  return (
    cache[cacheKey]
    || (cache[cacheKey] = ((event, ...args) => {
      for (let i = 0; i < modifiers.length; i++) {
        const guard = modifierGuards[modifiers[i] as ModifierGuards]
        if (guard && guard(event, modifiers)) { return }
      }
      return fn(event, ...args)
    }) as T)
  )
}

function withOnce(handler: { _called?: boolean }, fn: (event: ThreeEvent<Event>) => any) {
  if (!('_called' in handler)) { handler._called = false }
  return (event: ThreeEvent<Event>) => { if (!handler._called) { handler._called = true; fn(event) } }
}

/**
 * Creates and returns an "invoker": a function that calls an
 * objects' event handlers that respond to the same event type –
 * e.g., `onClick` and `onClickStop`.
 * @param obj the object with the event handlers
 * @param rawName the raw event name provided by Vue
 * @returns an "invoker"
 */
function createInvoker(obj: TresInstance, rawName: string): (event: ThreeEvent<Event>) => void {
  const eventModifiers: EventModifier[] | undefined = parseName(rawName)[1]
  const handlerInfo = obj.__tres.handlers[rawName]
  const fnOrFns = handlerInfo.value
  const fn = is.arr(fnOrFns) ? (event: ThreeEvent<Event>) => fnOrFns.forEach(fn => fn(event)) : fnOrFns

  // NOTE:
  // This is largely for performance. We *could* always return the
  // most complex "invoker" setup, which includes checks for all
  // event modifiers. But we don't want to penalize users who aren't
  // using event modifiers, so we'll return faster functions in some
  // those cases.
  if (!eventModifiers) {
    return fn
  } if (eventModifiers.includes('once')) {
    return withOnce(handlerInfo as { _called?: boolean }, withModifiers(fn, eventModifiers))
  }
  else {
    return withModifiers(fn, eventModifiers)
  }
}

const hyphenateRE = /\B([A-Z])/g

const hyphenate: (str: string) => string = cacheStringFunction(
  (str: string) => str.replace(hyphenateRE, '-$1').toLowerCase(),
)

/**
 * Parses a THREE-style DOM event name and returns a DOM-style event name with Vue event modifiers.
 * @example `parseName('onEventname')` returns `['eventname', undefined]`
 * `parseName('onEventnameSelfStop')` returns `['eventname', { self: true, stop: true }]`
 */
function parseName(threeStyleDomEventName: string): [string, EventModifier[] | undefined] {
  let eventModifiers: EventModifier[] | undefined
  if (eventModifierRE.test(threeStyleDomEventName)) {
    eventModifiers = []
    let m
    // eslint-disable-next-line no-cond-assign
    while ((m = threeStyleDomEventName.match(eventModifierRE))) {
      threeStyleDomEventName = threeStyleDomEventName.slice(0, threeStyleDomEventName.length - m[0].length)
      // NOTE: Must unshift here (alternatively `reverse` later)
      // Modifier order is important, e.g.:
      // `shift.stop` stops only if shift is down
      // `stop.shift` always stops
      eventModifiers.unshift(m[0].toLowerCase() as EventModifier)
    }
  }
  const eventName = threeStyleDomEventName[2] === ':' ? threeStyleDomEventName.slice(3) : hyphenate(threeStyleDomEventName.slice(2))
  return [eventName, eventModifiers]
}

const NOOP = () => {}
const WARNINGS_EMITTED = { passive: false, capture: false }

/**
 * If this is not a production build, checks:
 * - `value` is an acceptable event value: a function or an array.
 * - unsupported modifiers `passive` and `capture` were not used as event modifiers in the prop name.
 * Warns if either are `false`.
 * @param value – event value to test
 * @param propName – prop name to test
 * @returns the event value
 */
function sanitizeEventValue(value: unknown, propName: string): EventHandler<unknown> {
  if (isProd) {
    return value as EventHandler<unknown>
  }

  const eventModifiers = parseName(propName)[1] ?? []
  if (!WARNINGS_EMITTED.passive && eventModifiers.includes('passive')) {
    WARNINGS_EMITTED.passive = true
    useLogger().logWarning(`Event modifier \`passive\` seen in ${propName}. This event modifier is unsupported and will have no effect.`)
  }
  if (!WARNINGS_EMITTED.capture && eventModifiers.includes('capture')) {
    WARNINGS_EMITTED.capture = true
    useLogger().logWarning(`Event modifier \`capture\` seen in ${propName}. This event modifier is unsupported and will have no effect.`)
  }

  if (is.fun(value) || is.arr(value)) {
    return value as EventHandler<unknown>
  }
  useLogger().logWarning(
    `Wrong type passed as event handler to ${propName} - did you forget @ or : `
    + `in front of your prop?\nExpected function or array of functions, received type ${typeof value}.`,
  )
  return NOOP
}

const patchPropDomEventRE = new RegExp(`^(${THREE_EVENT_NAMES.join('|')})`)
/**
 * Return whether this is a THREE-style DOM event name, as passed to
 * `nodeOps` by Vue.
 * @param str - the string to test
 * @example `onClick`: `true`
 * `onDblclickSelfCapture`: `true`
 * `onDoubleClick`: `false` – deprecated THREE-style DOM name
 */
export function isVueEventName(str: string) {
  return patchPropDomEventRE.test(str)
}
