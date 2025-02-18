import type { TresContext } from 'src/composables/useTresContextProvider'
import type { MaybeRefOrGetter } from 'vue'
import { toValue, watchEffect } from 'vue'
import * as is from '../is'
import { createEvents, type Events, type EventsProps } from './createEvents'
import { eventsNoop } from './eventsNoop'
import { eventsRaycast as eventsDefault } from './eventsRaycast'

export interface UseEventsProps {
  eventsEnabled?: MaybeRefOrGetter<boolean>
  eventsTarget?: MaybeRefOrGetter<EventTarget>
  events?: Partial<EventsProps>
}

/**
 * Apply reactivity to an `events`.
 * Optionally create an `events` if one is not passed.
 *
 * @param context a Partial TresContext
 * @param events an `Events` to apply reactivity to. An `events` will be created if not passed.
 * @returns an object with `stop` – a function to stop reactivity and `events`
 */
export function withEventsProps(context: TresContext, events?: Events) {
  // NOTE: Create events if one was not passed.
  if (!events) {
    if (is.und(context.props.events)) {
    // NOTE: User probably hasn't defined `:events`.
    // Use the default events setup.
      events = createEvents(eventsDefault, context)
    }
    else if (!context.props.events) {
    // NOTE: User explicitly set `:events` to a falsy value
    // other than `undefined`, e.g.:
    // `<TresCanvas :events="null" />`
    // `<TresCanvas :events="false" />`
    // This signals they do not wish to use events at all,
    // so create a "noop" `events`.
      events = createEvents(eventsNoop, context)
    }
    else if (is.obj(context.props.events)) {
    // NOTE: User set `:events` to `Partial<EventsProps>`.
    // Fill in `:events` with defaults. Don't break the user's
    // reference to the object – they may want to modify the object
    // values later. Pass their object to `createEvents`.
      const eventsProps = context.props.events as Partial<EventsProps>
      for (const [key, value] of Object.entries(eventsDefault)) {
        if (!(key in eventsProps)) {
          eventsProps[key as keyof typeof eventsProps] = value
        }
      }
      events = createEvents(context.props.events as EventsProps, context)
    }
  }

  if (!events) {
    // NOTE: User set `:events` to a non-object but truthy, e.g.:
    // `<TresCanvas :events="true" />`
    // `<TresCanvas :events="1" />`
    // Even though this goes against the type system, assume the
    // user wants to use the default events.
    events = createEvents(eventsDefault, context)
  }

  const enabledWatcher = watchEffect(() => {
    events.enabled = (toValue(context.props.eventsEnabled) ?? true) as boolean
  }, { flush: 'sync' })

  const targetWatcher = watchEffect(() => {
    events.connect(toValue(context.props.eventsTarget) ?? context.renderer.value.domElement)
  }, { flush: 'sync' })

  const unwatchers = [enabledWatcher, targetWatcher]
  return {
    stop: () => { unwatchers.forEach(fn => fn()) },
    events,
  }
}
