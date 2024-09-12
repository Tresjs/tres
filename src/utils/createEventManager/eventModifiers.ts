import { isProd, useLogger } from '../../composables'
import * as is from '../is'
import { DOM_TO_THREE, THREE_EVENT_NAMES } from './const'
import type { EventHandler, ThreeEvent, TresInstance } from '../../types'
import type { DomEventName } from './const'

type EventModifiers = Partial<{
  capture: boolean
  once: boolean
  passive: boolean
  prevent: boolean
  self: boolean
  stop: boolean
}>
export const EVENT_MODIFIERS: string[] = 'Capture|Once|Passive|Prevent|Self|Stop'.split('|')
const eventModifierRE = /(?:Capture|Once|Passive|Prevent|Self|Stop)$/

const cacheStringFunction = <T extends (str: string) => string>(fn: T): T => {
  const cache: Record<string, string> = Object.create(null)
  return ((str: string) => {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }) as T
}

const hyphenateRE = /\B([A-Z])/g
export const patchPropDomEventRE = new RegExp(`^(${THREE_EVENT_NAMES.join('|')})`)

const hyphenate: (str: string) => string = cacheStringFunction(
  (str: string) => str.replace(hyphenateRE, '-$1').toLowerCase(),
)

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

/**
 * Parses a THREE-style DOM event name and returns a DOM-style event name with Vue event modifiers.
 * @example `parseName('onEventname')` returns `['eventname', undefined]`
 * `parseName('onEventnameSelfStop')` returns `['eventname', { self: true, stop: true }]`
 * @source https://github.com/vuejs/core/blob/d298c431cc422b53cf4e9c69bf1daf926c33b6e0/packages/shared/src/general.ts#L96C1-L102C2
 */
export function parseName(threeStyleDomEventName: string): [string, EventModifiers | undefined] {
  let eventModifiers: EventModifiers | undefined
  if (eventModifierRE.test(threeStyleDomEventName)) {
    eventModifiers = {}
    let m
    // eslint-disable-next-line no-cond-assign
    while ((m = threeStyleDomEventName.match(eventModifierRE))) {
      threeStyleDomEventName = threeStyleDomEventName.slice(0, threeStyleDomEventName.length - m[0].length)
      ;(eventModifiers as any)[m[0].toLowerCase()] = true
    }
  }
  const eventName = threeStyleDomEventName[2] === ':' ? threeStyleDomEventName.slice(3) : hyphenate(threeStyleDomEventName.slice(2))
  return [eventName, eventModifiers]
}

function NOOP() {}

const WARNINGS_EMITTED = { passive: false, capture: false }

/**
 * If this is not a production build, checks:
 * - `value` is an acceptable event value: a function or an array.
 * - `passive` and `capture` were not used as event modifiers in the prop name
 * Warns if either are `false`.
 * @param value – event value to test
 * @param propName – prop name to test
 * @returns the event value
 */
function sanitizeEventValue(value: unknown, propName: string): EventHandler<unknown> {
  if (isProd) {
    return value as EventHandler<unknown>
  }

  const eventModifiers = parseName(propName)[1] ?? {}
  if (eventModifiers.passive && !WARNINGS_EMITTED.passive) {
    WARNINGS_EMITTED.passive = true
    useLogger().logWarning(`Event modifier \`passive\` seen in ${propName}. This event modifier is unsupported and will have no effect.`)
  }
  if (eventModifiers.capture && !WARNINGS_EMITTED.capture) {
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

export function patchEvent(
  obj: TresInstance,
  rawName: string,
  prevValue: EventHandler<any> | null,
  nextValue: EventHandler<any> | unknown,
): void {
  const handlers = obj.__tres.handlers || (obj.__tres.handlers = { })

  if (!prevValue && nextValue) {
    // NOTE: add
    handlers[rawName] = { value: sanitizeEventValue(nextValue, rawName), called: 0 }
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
  const invokers = [] as ((event: ThreeEvent<any>) => void)[]
  for (const rawName of rawNamesForDomEvent) {
    invokers.push(createInvoker(obj, rawName))
  }
  // NOTE: Place the invokers' calls behind a single function call.
  obj[threeEventName] = (event: ThreeEvent<any>) => {
    for (const invoker of invokers) {
      invoker(event)
    }
  }
}

/**
 * Creates and returns an "invoker": a function that calls an
 * objects' event handlers that respond to the same event type –
 * e.g., `onClick` and `onClickStop`.
 * @param obj the object with the event handlers
 * @param rawName the raw event name provided by Vue
 * @returns an "invoker"
 */
function createInvoker(obj: TresInstance, rawName: string): (event: ThreeEvent<any>) => void {
  const eventModifiers = parseName(rawName)[1] ?? {}
  const eventValueCalled = obj.__tres.handlers[rawName]
  const fnOrFns = eventValueCalled.value

  // NOTE:
  // This is largely for performance. We *could* always return the
  // most complex "invoker" setup, which includes checks for all
  // event modifiers. But we don't want to penalize users who aren't
  // using event modifiers, so we'll return faster functions in some
  // those cases.

  // NOTE: The simple case, no event modifiers.
  if (!eventModifiers || Object.values(eventModifiers).every(v => !v)) {
    if (is.arr(fnOrFns)) {
      // NOTE: We have an array of functions.
      // Unify behind a single function call.
      return (event: ThreeEvent<any>) => fnOrFns.forEach(fn => fn(event))
    }
    else {
      // NOTE: We have a single function.
      // Simply return it.
      return fnOrFns
    }
  }

  const { once, self, prevent, stop } = eventModifiers

  // NOTE: The most complex case. We have event modifiers and
  // `once` is one of them. (`once` requires extra state.)
  if (eventModifiers && eventModifiers.once) {
    if (is.arr(fnOrFns)) {
      return (event: ThreeEvent<any>) => {
        if (once && eventValueCalled.called) { return }
        eventValueCalled.called++
        if (self && event.eventObject !== event.object) { return }
        fnOrFns.forEach(fn => fn(event))
        if (prevent) { event.nativeEvent.preventDefault() }
        if (stop) { event.stopPropagation() }
      }
    }

    return (event: ThreeEvent<any>) => {
      if (once && eventValueCalled.called) { return }
      eventValueCalled.called++
      if (self && event.eventObject !== event.object) { return }
      fnOrFns(event)
      if (prevent) { event.nativeEvent.preventDefault() }
      if (stop) { event.stopPropagation() }
    }
  }

  // NOTE: We have event modifiers, but not `once`.
  // Without `once`, no extra state updates are required.
  if (is.arr(fnOrFns)) {
    return (event: ThreeEvent<any>) => {
      if (self && event.eventObject !== event.object) { return }
      fnOrFns.forEach(fn => fn(event))
      if (prevent) { event.nativeEvent.preventDefault() }
      if (stop) { event.stopPropagation() }
    }
  }

  return (event: ThreeEvent<any>) => {
    if (self && event.eventObject !== event.object) { return }
    fnOrFns(event)
    if (prevent) { event.nativeEvent.preventDefault() }
    if (stop) { event.stopPropagation() }
  }
}
