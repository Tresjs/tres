import { describe, expect, it, vi } from 'vitest'
import { computed, ref, shallowRef } from 'vue'
import type { TresContext } from 'src/composables/useTresContextProvider'
import { raycastProps } from '.'
import { createEventManager } from './createEventManager'
import { eventsRaycast } from './eventsRaycast'
import { useEventsOptions } from './useEventsOptions'

let context = mockTresContext()
let eventManager = createEventManager(eventsRaycast, context)

describe('useEventsOptions', () => {
  beforeEach(() => {
    context = mockTresContext()
    eventManager = createEventManager(eventsRaycast, context)

    vi.clearAllMocks()
  })
  describe('!props', () => {
    it('sets `eventManager.enabled` to `true`', () => {
      useEventsOptions(undefined, context, () => {}, eventManager)
      expect(eventManager.enabled).toBe(true)
    })
    it('sets `eventManager.target` to `context.renderer.value.domElement`', () => {
      useEventsOptions(undefined, context, () => {}, eventManager)
      expect(eventManager.target).toBe(context.renderer.value.domElement)
    })
  })

  describe('props.events', () => {
    describe('`eventManager` is not passed', () => {
      describe('!("events" in props)', () => {
        it('uses `eventsRaycast` as default `events`', () => {
          const emitFn = () => {}
          const { eventManager } = useEventsOptions({}, context, emitFn)
          const eventManager0 = createEventManager(raycastProps, context, emitFn)
          // NOTE: `props.events` is encapsulated inside of `eventManager`
          // so we an't access it directly.
          // We can check the `eventManager.config`s for equality,
          // since they're produced by a props method.
          expect(eventManager.config).toStrictEqual(eventManager0.config)
        })
      })
      describe('props.events === undefined', () => {
        it('uses `eventsRaycast` as default `events`', () => {
          const emitFn = () => {}
          const { eventManager } = useEventsOptions({ events: undefined }, context, emitFn)
          const eventManager0 = createEventManager(raycastProps, context, emitFn)
          // NOTE: `props.events` is encapsulated inside of `eventManager`
          // so we an't access it directly.
          // We can check the `eventManager.config`s for equality,
          // since they're produced by a props method.
          expect(eventManager.config).toStrictEqual(eventManager0.config)
        })
      })
      describe('props.events === true', () => {
        it('uses `eventsRaycast` as default `events`', () => {
          const emitFn = () => {}
          // NOTE: This isn't permitted by the type system, but it's
          // an easy case to cover and perhaps a common mistake.
          // @ts-expect-error `true` is not an accepted value for `props.events`.
          const { eventManager } = useEventsOptions({ events: true }, context, emitFn)
          const eventManager0 = createEventManager(raycastProps, context, emitFn)
          // NOTE: `props.events` is encapsulated inside of `eventManager`
          // so we an't access it directly.
          // We can check the `eventManager.config`s for equality,
          // since they're produced by a props method.
          expect(eventManager.config).toStrictEqual(eventManager0.config)
        })
      })
      describe('props.events === 1', () => {
        it('uses `eventsRaycast` as default `events`', () => {
          const emitFn = () => {}
          // NOTE: This isn't permitted by the type system, but it's
          // an easy case to cover and perhaps a common mistake.
          // @ts-expect-error `1` is not an accepted value for `props.events`.
          const { eventManager } = useEventsOptions({ events: 1 }, context, emitFn)
          const eventManager0 = createEventManager(raycastProps, context, emitFn)
          // NOTE: `props.events` is encapsulated inside of `eventManager`
          // so we an't access it directly.
          // We can check the `eventManager.config`s for equality,
          // since they're produced by a props method.
          expect(eventManager.config).toStrictEqual(eventManager0.config)
        })
      })
      describe('props.events === null', () => {
        it('does not connect to a target', () => {
          const { eventManager } = useEventsOptions({ events: null }, context, () => {})
          const spy = vi.fn()
          eventManager.connect({ addEventListener: spy, removeEventListener: spy })
          expect(spy).not.toBeCalled()
        })
      })
      describe('props.events === false', () => {
        it('does not connect to a target', () => {
          // NOTE: This isn't permitted by the type system, but it's
          // an easy case to cover and might make sense for some users.
          // @ts-expect-error `false` is not an accepted value for `props.events`.
          const { eventManager } = useEventsOptions({ events: false }, context, () => {})
          const spy = vi.fn()
          eventManager.connect({ addEventListener: spy, removeEventListener: spy })
          expect(spy).not.toBeCalled()
        })
      })
      describe('props.events === 0', () => {
        it('does not connect to a target', () => {
          // NOTE: This isn't permitted by the type system.
          // @ts-expect-error `0` is not an accepted value for `props.events`.
          const { eventManager } = useEventsOptions({ events: 0 }, context, () => {})
          const spy = vi.fn()
          eventManager.connect({ addEventListener: spy, removeEventListener: spy })
          expect(spy).not.toBeCalled()
        })
      })
      describe('props.events === { ... }', () => {
        it('fills in missing `events` methods using `eventsRaycast` methods', () => {
          const events = {}
          useEventsOptions({ events }, context, () => {})
          expect(events).toStrictEqual(raycastProps)

          const filter = () => []
          const events0 = { filter }
          useEventsOptions({ events: events0 }, context, () => {})
          expect(events0.filter).not.toBe(raycastProps.filter)
          expect(events0.filter).toBe(filter)
        })
      })
    })
  })

  describe('props.eventsEnabled', () => {
    describe('props.eventsEnabled === undefined', () => {
      it('sets `enabled` to EventManager to `true`', () => {
        const props = { }
        useEventsOptions(props, context, () => {}, eventManager)
        expect(eventManager.enabled).toBe(true)
      })
    })
    describe('props.eventsEnabled === null', () => {
      it('sets `enabled` to EventManager to `true`', () => {
        const props = { eventsEnabled: null }
        useEventsOptions(props, context, () => {}, eventManager)
        expect(eventManager.enabled).toBe(true)
      })
    })
    describe('props.eventsEnabled === boolean', () => {
      it('sets `enabled` on EventManager when used in `useEventsOptions`', () => {
        const props = { eventsEnabled: true }
        useEventsOptions(props, context, () => {}, eventManager)
        expect(eventManager.enabled).toBe(true)

        props.eventsEnabled = false
        useEventsOptions(props, context, () => {}, eventManager)
        expect(eventManager.enabled).toBe(false)
      })
    })
    describe('isRef(props.eventsEnabled)', () => {
      it('sets `enabled` on EventManager when ref.value is updated', () => {
        const props = { eventsEnabled: ref(true) }
        useEventsOptions(props, context, () => {}, eventManager)
        expect(eventManager.enabled).toBe(true)

        props.eventsEnabled.value = false
        expect(eventManager.enabled).toBe(false)

        props.eventsEnabled.value = true
        expect(eventManager.enabled).toBe(true)

        props.eventsEnabled.value = false
        expect(eventManager.enabled).toBe(false)

        props.eventsEnabled.value = undefined
        expect(eventManager.enabled).toBe(true)
      })
    })
    describe('isRefOrGetter(props.eventsEnabled)', () => {
      it('sets `enabled` on EventManager when ref.value is updated', () => {
        const myNumber = ref(0)

        const eventsEnabled = computed({
          get() { return !!(myNumber.value % 2) },
          set(n: number) { myNumber.value = n },
        })
        const props = { eventsEnabled }
        useEventsOptions(props, context, () => {}, eventManager)
        expect(eventManager.enabled).toBe(false)

        props.eventsEnabled.value = 1
        expect(eventManager.enabled).toBe(true)

        props.eventsEnabled.value = 2
        expect(eventManager.enabled).toBe(false)

        props.eventsEnabled.value = 3
        expect(eventManager.enabled).toBe(true)

        props.eventsEnabled.value = 4
        expect(eventManager.enabled).toBe(false)

        props.eventsEnabled.value = 5
        expect(eventManager.enabled).toBe(true)
      })
    })
  })

  describe('props.eventsTarget', () => {
    describe('props.eventsTarget === undefined', () => {
      it('calls eventManager.connect(context.renderer.value.domElement)', () => {
        const props = { }
        const connectSpy = vi.spyOn(eventManager, 'connect')

        useEventsOptions(props, context, () => {}, eventManager)
        expect(connectSpy).toBeCalledTimes(1)
        expect(connectSpy).toBeCalledWith(context.renderer.value.domElement)
      })
    })

    describe('props.eventsTarget === computed({ get..., set... })', () => {
      it('calls eventManager.connect(props.eventsTarget.get()) when `set`', () => {
        const connectSpy = vi.spyOn(eventManager, 'connect')

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

        const props = { eventsTarget }
        useEventsOptions(props, context, () => {}, eventManager)

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
      it('calls eventManager.connect(props.eventTarget) and updates on ref changes', () => {
        const target0 = {
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        } as unknown as HTMLElement
        const target1 = {
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        } as unknown as HTMLElement
        const eventsTarget = shallowRef(target0)

        const props = { eventsTarget }
        const connectSpy = vi.spyOn(eventManager, 'connect')

        useEventsOptions(props, context, () => {}, eventManager)
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
      it('calls eventManager.connect(context.renderer.value.domElement)', () => {
        const props = { eventsTarget: ref(null) }
        const connectSpy = vi.spyOn(eventManager, 'connect')

        useEventsOptions(props, context, () => {}, eventManager)
        expect(connectSpy).toBeCalledTimes(1)
        expect(connectSpy).toBeCalledWith(context.renderer.value.domElement)
      })
    })

    describe('props.eventsTarget = EventTarget', () => {
      it('calls eventManager.connect(props.eventsTarget)', () => {
        const target0 = {
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        } as unknown as HTMLElement
        const eventsTarget = shallowRef(target0)

        const props = { eventsTarget }
        const connectSpy = vi.spyOn(eventManager, 'connect')

        useEventsOptions(props, context, () => {}, eventManager)
        expect(connectSpy).toBeCalledTimes(1)
        expect(connectSpy).toBeCalledWith(target0)
      })
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

    const props = { eventsTarget }
    const connectSpy = vi.spyOn(eventManager, 'connect')

    const { stop } = useEventsOptions(props, context, () => {}, eventManager)
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

function mockTresContext() {
  const canvas = {
    addEventListener: () => {},
    removeEventListener: () => {},
  }
  return {
    eventManager: {},
    renderer: { value: { domElement: canvas } },
  } as unknown as TresContext
}
