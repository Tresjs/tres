import type { EventHookOff, IsAny } from '@vueuse/core'
import { tryOnScopeDispose } from '@vueuse/core'

// any extends void = true
// so we need to check if T is any first
type Callback<T> = IsAny<T> extends true
  ? (param: any) => void
  : (
      [T] extends [void]
        ? () => void
        : (param: T) => void
    )

type PrioritizedEventHookOn<T> = (fn: Callback<T>, priority?: number) => { off: () => void }
type PrioritizedEventHookTrigger<T = any> = (param?: T) => void

export interface PrioritizedEventHook<T = any> {
  on: PrioritizedEventHookOn<T>
  off: EventHookOff<T>
  trigger: PrioritizedEventHookTrigger<T>
  size: number
}

export function createPrioritizedEventHook<T = any>(): PrioritizedEventHook<T> {
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

  const trigger: PrioritizedEventHookTrigger<T> = (...args) => {
    if (dirty) {
      sort()
      dirty = false
    }
    ascending.forEach(fn => fn(...(args as [T])))
  }

  return { on, off, trigger, get size() { return eventToPriority.size } }
}
