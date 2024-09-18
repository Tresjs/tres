import type { TresContext } from 'src/composables/useTresContextProvider'
import type { EmitEventFn } from 'src/types'
import type { MaybeRefOrGetter } from 'vue'
import { toValue, watchEffect } from 'vue'
import * as is from '../is'
import { createEventManager, type EventManager, type EventManagerProps } from './createEventManager'
import { eventsNoop } from './eventsNoop'
import { eventsRaycast as eventsDefault } from './eventsRaycast'

export interface UseEventsOptions {
  eventsEnabled?: MaybeRefOrGetter<boolean>
  eventsTarget?: MaybeRefOrGetter<EventTarget>
  events?: Partial<EventManagerProps>
}

/**
 * Apply reactivity to an `eventManager`.
 * Optionally create an `eventManager` if one is not passed.
 *
 * @param props `EventsOptions` values to apply to the `eventManager`
 * @param context a TresContext
 * @param emit an emit function to use in event handling
 * @param eventManager an `EventManager` to apply reactivity to.
 * @returns an object with `stop` – a function to stop reactivity and `eventManager`
 */
export function useEventsOptions(props: UseEventsOptions, context: TresContext, emit: EmitEventFn, eventManager?: EventManager) {
  // NOTE: Create eventManager if one was not passed.
  if (!eventManager) {
    if (is.und(props.events)) {
      // NOTE: User probably hasn't defined `:events`.
      // Use the default events setup.
      eventManager = createEventManager(eventsDefault, context, emit)
    }
    else if (!props.events) {
      // NOTE: User explicitly set `:events` to a falsy value
      // other than `undefined`, e.g.:
      // `<TresCanvas :events="null" />`
      // `<TresCanvas :events="false" />`
      // This signals they do not wish to use events at all,
      // so create a "noop" `eventManager`.
      eventManager = createEventManager(eventsNoop, context, emit)
    }
    else if (is.obj(props.events)) {
      // NOTE: User set `:events` to `Partial<EventManagerProps>`.
      // Fill in `:events` with defaults. But don't lose the reference
      // to the user's object – instead, pass it to `createEventManager`
      // so the user can still modify the values.
      for (const [key, value] of Object.entries(eventsDefault)) {
        if (!(key in props.events)) {
          props.events[key as keyof typeof props.events] = value
        }
      }
      eventManager = createEventManager(props.events as EventManagerProps, context, emit)
    }
    else {
      // NOTE: User set `:events` to a non-object but truthy, e.g.:
      // `<TresCanvas :events="true" />`
      // `<TresCanvas :events="1" />`
      // Even though this goes against the type system, assume the
      // user wants to use the default events.
      eventManager = createEventManager(eventsDefault, context, emit)
    }
  }

  const enabledWatcher = watchEffect(() => {
    eventManager.enabled = (toValue(props?.eventsEnabled) ?? true) as boolean
  }, { flush: 'sync' })

  const targetWatcher = watchEffect(() => {
    eventManager.connect(toValue(props?.eventsTarget) ?? context.renderer.value.domElement)
  }, { flush: 'sync' })

  const unwatchers = [enabledWatcher, targetWatcher]
  return {
    stop: () => { unwatchers.forEach(fn => fn()) },
    eventManager,
  }
}
