import type { EventHookOff, IsAny } from '@vueuse/core'
import { tryOnScopeDispose } from '@vueuse/core'

// NOTE: Based on vueuse's createEventHook
// https://github.com/vueuse/vueuse/blob/1558cd2b5b019abc1feda6d702caa1053a182903/packages/shared/createEventHook/index.ts#L19

// NOTE: any extends void = true
// So we need to check if T is any first
type Callback<T> = IsAny<T> extends true
  ? (param: any) => void
  : (
      [T] extends [void]
        ? () => void
        : (param: T) => void
    )

type PriorityEventHookOn<T> = (fn: Callback<T>, priority?: number) => { off: () => void }
type PriorityEventHookTrigger<T = any> = (param?: T) => void

export interface PriorityEventHook<T = any> {
  on: PriorityEventHookOn<T>
  off: EventHookOff<T>
  trigger: PriorityEventHookTrigger<T>
  dispose: () => void
  count: number
  countPositive: number
}

export function createPriorityEventHook<T = any>(): PriorityEventHook<T> {
  const eventToPriority = new Map<Callback<T>, { priority: number, addI: number }>()
  const ascending = new Set<Callback<T>>()
  let ADD_COUNT = 0
  let dirty = false
  let countPositive = 0

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
    const priority = eventToPriority.get(fn)?.priority ?? -1
    if (priority > 0) {
      countPositive--
    }
    eventToPriority.delete(fn)
    ascending.delete(fn)
  }

  const on = (fn: Callback<T>, priority = 0) => {
    if (priority > 0) {
      countPositive++
    }
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
    ascending.forEach(fn => fn(...(args as [T])))
  }

  const dispose = () => {
    eventToPriority.clear()
    ascending.clear()
  }

  return { on, off, trigger, dispose, get count() { return eventToPriority.size }, get countPositive() { return countPositive } }
}
