import type { TresContext } from 'src/composables/useTresContextProvider'
import { describe, expect, it, vi } from 'vitest'
import { computed, ref, shallowRef } from 'vue'
import { raycastProps } from '.'
import { createEvents } from './createEvents'
import { eventsRaycast } from './eventsRaycast'
import { withEventsProps } from './withEventsProps'

let context = mockTresContext()
let events = createEvents(eventsRaycast, context)

describe('useEventsOptions', () => {
  beforeEach(() => {
    context = mockTresContext()
    events = createEvents(eventsRaycast, context)
    vi.clearAllMocks()
  })
  describe('!props', () => {
    it('sets `events.enabled` to `true`', () => {
      withEventsProps(context, events)
      expect(events.enabled).toBe(true)
    })
    it('sets `events.target` to `context.renderer.value.domElement`', () => {
      withEventsProps(context, events)
      expect(events.target).toBe(context.renderer.value.domElement)
    })
  })

  describe('props.events', () => {
    describe('`events` is not passed', () => {
      describe('!("events" in props)', () => {
        it('uses `eventsRaycast` as default `events`', () => {
          const { events } = withEventsProps(context)
          const events0 = createEvents(raycastProps, context)
          // NOTE: `props.events` is encapsulated inside of `events`
          // so we an't access it directly.
          // We can check the `events.config`s for equality,
          // since they're produced by a props method.
          expect(events.config).toStrictEqual(events0.config)
        })
      })
      describe('props.events === undefined', () => {
        it('uses `eventsRaycast` as default `events`', () => {
          const { events } = withEventsProps(context)
          const events0 = createEvents(raycastProps, context)
          // NOTE: `props.events` is encapsulated inside of `events`
          // so we an't access it directly.
          // We can check the `events.config`s for equality,
          // since they're produced by a props method.
          expect(events.config).toStrictEqual(events0.config)
        })
      })
      describe('props.events === true', () => {
        it('uses `eventsRaycast` as default `events`', () => {
          // NOTE: This isn't permitted by the type system, but it's
          // an easy case to cover and perhaps a common mistake.
          // @ts-expect-error `true` is not an accepted value for `props.events`.
          context.props.events = true
          const { events } = withEventsProps(context)
          const events0 = createEvents(raycastProps, context)
          // NOTE: `props.events` is encapsulated inside of `events`
          // so we an't access it directly.
          // We can check the `events.config`s for equality,
          // since they're produced by a props method.
          expect(events.config).toStrictEqual(events0.config)
        })
      })
      describe('props.events === 1', () => {
        it('uses `eventsRaycast` as default `events`', () => {
          // NOTE: This isn't permitted by the type system, but it's
          // an easy case to cover and perhaps a common mistake.
          // @ts-expect-error `1` is not an accepted value for `props.events`.
          context.props.events = 1
          const { events } = withEventsProps(context)
          const events0 = createEvents(raycastProps, context)
          // NOTE: `props.events` is encapsulated inside of `events`
          // so we an't access it directly.
          // We can check the `events.config`s for equality,
          // since they're produced by a props method.
          expect(events.config).toStrictEqual(events0.config)
        })
      })
      describe('props.events === null', () => {
        it('does not connect to a target', () => {
          context.props.events = null
          const { events } = withEventsProps(context)
          const spy = vi.fn()
          events.connect({ addEventListener: spy, removeEventListener: spy })
          expect(spy).not.toBeCalled()
        })
      })
      describe('props.events === false', () => {
        it('does not connect to a target', () => {
          // NOTE: This isn't permitted by the type system, but it's
          // an easy case to cover and might make sense for some users.
          // @ts-expect-error `false` is not an accepted value for `props.events`.
          context.props.events = false
          const { events } = withEventsProps(context)
          const spy = vi.fn()
          events.connect({ addEventListener: spy, removeEventListener: spy })
          expect(spy).not.toBeCalled()
        })
      })
      describe('props.events === 0', () => {
        it('does not connect to a target', () => {
          // NOTE: This isn't permitted by the type system.
          // @ts-expect-error `0` is not an accepted value for `props.events`.
          context.props.events = 0
          const { events } = withEventsProps(context)
          const spy = vi.fn()
          events.connect({ addEventListener: spy, removeEventListener: spy })
          expect(spy).not.toBeCalled()
        })
      })
      describe('props.events === { ... }', () => {
        it('fills in missing `events` methods using `eventsRaycast` methods', () => {
          context.props.events = {}
          withEventsProps(context)
          expect(context.props.events).toStrictEqual(raycastProps)

          const filter = () => []
          context.props.events = { filter }
          withEventsProps(context)
          expect(context.props.events.filter).not.toBe(raycastProps.filter)
          expect(context.props.events.filter).toBe(filter)
        })
      })
    })
  })

  describe('props.eventsEnabled', () => {
    describe('props.eventsEnabled === undefined', () => {
      it('sets `enabled` to Events to `true`', () => {
        context.props = { }
        withEventsProps(context, events)
        expect(events.enabled).toBe(true)
      })
    })
    describe('props.eventsEnabled === null', () => {
      it('sets `enabled` to Events to `true`', () => {
        context.props = { eventsEnabled: null }
        withEventsProps(context, events)
        expect(events.enabled).toBe(true)
      })
    })
    describe('props.eventsEnabled === boolean', () => {
      it('sets `enabled` on Events when used in `useEventsOptions`', () => {
        context.props = { eventsEnabled: true }
        withEventsProps(context, events)
        expect(events.enabled).toBe(true)

        context.props.eventsEnabled = false
        withEventsProps(context, events)
        expect(events.enabled).toBe(false)
      })
    })
    describe('isRef(props.eventsEnabled)', () => {
      it('sets `enabled` on Events when ref.value is updated', () => {
        const r = ref(true)
        context.props = { eventsEnabled: r }
        withEventsProps(context, events)
        expect(events.enabled).toBe(true)

        r.value = false
        expect(events.enabled).toBe(false)

        r.value = true
        expect(events.enabled).toBe(true)

        r.value = false
        expect(events.enabled).toBe(false)

        r.value = undefined
        expect(events.enabled).toBe(true)
      })
    })
    describe('isRefOrGetter(props.eventsEnabled)', () => {
      it('sets `enabled` on Events when ref.value is updated', () => {
        const myNumber = ref(0)

        const eventsEnabled = computed({
          get() { return !!(myNumber.value % 2) },
          set(n: number) { myNumber.value = n },
        })
        context.props = { eventsEnabled }
        withEventsProps(context, events)
        expect(events.enabled).toBe(false)

        myNumber.value = 1
        expect(events.enabled).toBe(true)

        myNumber.value = 2
        expect(events.enabled).toBe(false)

        myNumber.value = 3
        expect(events.enabled).toBe(true)

        myNumber.value = 4
        expect(events.enabled).toBe(false)

        myNumber.value = 5
        expect(events.enabled).toBe(true)
      })
    })
  })

  describe('props.eventsTarget', () => {
    describe('props.eventsTarget === undefined', () => {
      it('calls events.connect(context.renderer.value.domElement)', () => {
        context.props = { }
        const connectSpy = vi.spyOn(events, 'connect')

        withEventsProps(context, events)
        expect(connectSpy).toBeCalledTimes(1)
        expect(connectSpy).toBeCalledWith(context.renderer.value.domElement)
      })
    })

    describe('props.eventsTarget === computed({ get..., set... })', () => {
      it('calls events.connect(props.eventsTarget.get()) when `set`', () => {
        const connectSpy = vi.spyOn(events, 'connect')

        const myDom0 = document.createElement('div')
        const target0 = document.createElement('canvas')
        target0.addEventListener = vi.fn()
        target0.removeEventListener = vi.fn()
        myDom0.appendChild(target0)

        const myDom1 = document.createElement('div')
        const target1 = document.createElement('canvas')
        target1.addEventListener = vi.fn()
        target1.removeEventListener = vi.fn()
        myDom1.appendChild(target1)

        const domRef = shallowRef(myDom0)

        const eventsTarget = computed({
          get() { return domRef.value.firstChild },
          set(dom: HTMLDivElement) { domRef.value = dom },
        })

        context.props = { eventsTarget }
        withEventsProps(context, events)

        expect(connectSpy).toBeCalledTimes(1)
        expect(connectSpy).toBeCalledWith(target0)

        expect(target0.addEventListener).toBeCalled()
        expect(target1.addEventListener).not.toBeCalled()

        vi.clearAllMocks()

        domRef.value = myDom1

        expect(connectSpy).toBeCalledTimes(1)
        expect(connectSpy).toBeCalledWith(target1)

        expect(target0.addEventListener).not.toBeCalled()
        expect(target0.removeEventListener).toBeCalled()

        expect(target1.addEventListener).toBeCalled()
        expect(target1.removeEventListener).not.toBeCalled()
      })
    })

    describe('props.eventsTarget === ref(EventTarget | null)', () => {
      it('calls events.connect(props.eventTarget) and updates on ref changes', () => {
        const target0 = {
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        } as unknown as HTMLElement
        const target1 = {
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        } as unknown as HTMLElement
        const eventsTarget = shallowRef(target0)

        context.props = { eventsTarget }
        const connectSpy = vi.spyOn(events, 'connect')

        withEventsProps(context, events)
        expect(connectSpy).toBeCalledTimes(1)
        expect(connectSpy).toBeCalledWith(target0)

        eventsTarget.value = target1
        expect(connectSpy).toBeCalledTimes(2)
        expect(connectSpy).toBeCalledWith(target1)

        eventsTarget.value = target0
        expect(connectSpy).toBeCalledTimes(3)
        expect(connectSpy).toBeCalledWith(target0)

        eventsTarget.value = null
        expect(connectSpy).toBeCalledTimes(4)
        expect(connectSpy).toBeCalledWith(context.renderer.value.domElement)
      })
    })

    describe('props.eventsTarget = ref(null)', () => {
      it('calls events.connect(context.renderer.value.domElement)', () => {
        context.props = { eventsTarget: ref(null) }
        const connectSpy = vi.spyOn(events, 'connect')

        withEventsProps(context, events)
        expect(connectSpy).toBeCalledTimes(1)
        expect(connectSpy).toBeCalledWith(context.renderer.value.domElement)
      })
    })

    describe('props.eventsTarget = EventTarget', () => {
      it('calls events.connect(props.eventsTarget)', () => {
        const target0 = {
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        } as unknown as HTMLElement
        const eventsTarget = shallowRef(target0)

        context.props = { eventsTarget }
        const connectSpy = vi.spyOn(events, 'connect')

        withEventsProps(context, events)
        expect(connectSpy).toBeCalledTimes(1)
        expect(connectSpy).toBeCalledWith(target0)
      })
    })
  })

  describe('const { stop } = useEventsOptions(...)', () => {
    it('stops the `events-target` watcher', () => {
      const target0 = {
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      } as unknown as HTMLElement
      const target1 = {
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      } as unknown as HTMLElement
      const eventsTarget = shallowRef(target0)

      context.props = { eventsTarget }
      const connectSpy = vi.spyOn(events, 'connect')

      expect(connectSpy).toBeCalledTimes(0)
      const { stop } = withEventsProps(context, events)
      expect(connectSpy).toBeCalledTimes(1)
      expect(connectSpy).toBeCalledWith(target0)

      stop()

      eventsTarget.value = target1
      expect(connectSpy).toBeCalledTimes(1)
      expect(connectSpy).toBeCalledWith(target0)
      eventsTarget.value = null
      expect(connectSpy).toBeCalledTimes(1)
      expect(connectSpy).toBeCalledWith(target0)
    })
  })
})

function mockTresContext() {
  const canvas = {
    addEventListener: () => {},
    removeEventListener: () => {},
  }
  return {
    events: {},
    renderer: { value: { domElement: canvas } },
    emit: () => {},
    props: {},
  } as unknown as TresContext
}
