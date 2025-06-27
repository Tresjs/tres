import type { EventHookOff, EventHookTrigger } from '@vueuse/core'
import { tryOnScopeDispose } from '@vueuse/core'

// NOTE: Based on vueuse's createEventHook
// https://github.com/vueuse/vueuse/blob/1558cd2b5b019abc1feda6d702caa1053a182903/packages/shared/createEventHook/index.ts

export type Callback<T> = Parameters<EventHookOff<T>>[0]
export type PriorityEventHookOn<T> = (fn: Callback<T>, priority?: number) => { off: () => void }
export type PriorityEventHookOff<T> = EventHookOff<T>
export type PriorityEventHookTrigger<T> = EventHookTrigger<T>

export interface PriorityEventHook<T = any> {
  on: PriorityEventHookOn<T>
  off: (fn: Callback<T>) => void
  trigger: PriorityEventHookTrigger<T>
  dispose: () => void
  count: number
}

export function createPriorityEventHook<T>(): PriorityEventHook<T> {
  const eventToPriority = new Map<Callback<T>, { priority: number, addI: number }>()
  const ascending = new Set<Callback<T>>()
  let ADD_COUNT = 0
  let dirty = false

  const sort = () => {
    const sorted = Array.from(eventToPriority.entries())
      .sort((a, b) => {
        const priorityDiff = a[1].priority - b[1].priority
        return priorityDiff === 0 ? a[1].addI - b[1].addI : priorityDiff
      })
    ascending.clear()
    sorted.forEach(entry => ascending.add(entry[0]))
  }

  const off = (fn: Callback<T>) => {
    eventToPriority.delete(fn)
    ascending.delete(fn)
  }

  const on = (fn: Callback<T>, priority = 0) => {
    eventToPriority.set(fn, { priority, addI: ADD_COUNT++ })
    const offFn = () => off(fn)
    tryOnScopeDispose(offFn)
    dirty = true
    return {
      off: offFn,
    }
  }

  const trigger: PriorityEventHookTrigger<T> = (...args) => {
    if (dirty) {
      sort()
      dirty = false
    }

    return Promise.all(
      Array.from(ascending).map(fn => fn(...args)),
    )
  }

  const dispose = () => {
    eventToPriority.clear()
    ascending.clear()
  }

  return { on, off, trigger, dispose, get count() { return eventToPriority.size } }
}
