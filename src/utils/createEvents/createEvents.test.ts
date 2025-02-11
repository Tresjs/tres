import type { TresContext } from '../../composables/useTresContextProvider'
import type { CreateEventsProps } from './createEvents'
import { Scene } from 'three'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { shallowRef } from 'vue'
import { nodeOps as getNodeOps } from './../../core/nodeOps'
import { createEvents } from './createEvents'
import { eventsNoop } from './eventsNoop'

let t = mockTresInstance()
let context = t.context
let { canvas, spies: canvasSpies } = mockCanvasAndListeners()
let { props, spies: propsSpies } = mockEventsPropsAndSpies(context)

describe('createEvents', () => {
  beforeEach(() => {
    t = mockTresInstance()
    context = t.context

    const c = mockCanvasAndListeners()
    canvas = c.canvas
    canvasSpies = c.spies

    const p = mockEventsPropsAndSpies(context)
    props = p.props
    propsSpies = p.spies
    vi.clearAllMocks()
  })

  describe('const events = createEvents(props, context)', () => {
    describe('noop props', () => {
      it('responds to all method calls without throwing', () => {
        const canvas = document.createElement('canvas')
        const events = createEvents(eventsNoop, context)
        expect(() => events.config).not.toThrow()
        expect(() => {
          events.disconnect()
          events.connect(canvas as null)
          events.disconnect()
        }).not.toThrow()
        expect(() => {
          events.enabled = false
          events.enabled = true
          events.enabled = false
        }).not.toThrow()
        expect(() => {
          events.handle(new MouseEvent('click') as null)
          events.handle(new MouseEvent('contextmenu') as null)
          events.handle(new MouseEvent('dblclick') as null)
        }).not.toThrow()
        expect(() => events.insert({})).not.toThrow()
        expect(() => events.isEvents).not.toThrow()
        expect(() => events.patchProp({}, 'lookAt', undefined, [0, 1])).not.toThrow()
        expect(() => events.priority = 1).not.toThrow()
        expect(() => events.remove({})).not.toThrow()
        expect(() => events.target).not.toThrow()
        expect(() => events.test([{}])).not.toThrow()
      })
    })
    describe('props', () => {
      it('allows methods to be changed on the fly', () => {
        const events = createEvents(props, context)
        const { handle } = events

        props.getIntersections = () => [1, 2, 3, 4]
        expect(handle(new MouseEvent('click'))).toStrictEqual([1, 2, 3, 4])

        props.getIntersections = () => [Number.POSITIVE_INFINITY]
        expect(handle(new MouseEvent('click'))).toStrictEqual([Number.POSITIVE_INFINITY])

        props.getIntersectionsPool = () => [1, 2, 3, 4]
        props.getIntersections = (pool: number[]) => pool.filter(n => n % 2)
        expect(handle(new MouseEvent('click'))).toStrictEqual([1, 3])

        props.getIntersections = (pool: number[]) => pool.filter(n => n % 2 === 0)
        expect(handle(new MouseEvent('click'))).toStrictEqual([2, 4])

        const setupSpy = vi.fn()
        props.isSetUp = () => false
        props.setUp = () => { setupSpy() }
        expect(setupSpy).not.toBeCalled()
        handle(new MouseEvent('click'))
        expect(setupSpy).toBeCalledTimes(1)

        const handleIntersectionsSpy = vi.fn()
        props.handleIntersections = () => { handleIntersectionsSpy() }
        props.isSetUp = () => true
        expect(handleIntersectionsSpy).not.toBeCalled()
        handle(new MouseEvent('click'))
        expect(handleIntersectionsSpy).toBeCalledTimes(1)

        props.handleIntersections = () => { }
        handle(new MouseEvent('click'))
        expect(handleIntersectionsSpy).toBeCalledTimes(1)
      })
    })
    describe('events.connect(eventTarget)', () => {
      it('calls `props.connect` if not connected', () => {
        const { connect } = createEvents(props, context)
        connect(canvas)
        expect(propsSpies.connect).toBeCalled()
        expect(canvasSpies.addEventListener).toBeCalled()
      })
      it('`disconnect`s if connected to different target', () => {
        const { canvas: otherCanvas } = mockCanvasAndListeners()
        const { connect } = createEvents(props, context)

        connect(canvas)
        expect(propsSpies.connect).toBeCalled()
        expect(canvasSpies.addEventListener).toBeCalled()

        vi.clearAllMocks()
        connect(otherCanvas)
        expect(propsSpies.disconnect).toBeCalled()
        expect(propsSpies.connect).toBeCalled()
      })
      it('calls `props.connect().disconnect` if already connected', () => {
        const otherCanvas = mockCanvasAndListeners().canvas
        const { connect } = createEvents(props, context)

        connect(canvas)
        expect(propsSpies.disconnect).not.toBeCalled()
        connect(otherCanvas)
        expect(propsSpies.disconnect).toBeCalled()
      })
      it('does nothing if already connected to `target`', () => {
        const { connect } = createEvents(props, context)
        connect(canvas)
        expect(propsSpies.connect).toBeCalled()
        expect(propsSpies.disconnect).not.toBeCalled()

        vi.clearAllMocks()
        connect(canvas)
        expect(propsSpies.connect).not.toBeCalled()
        expect(propsSpies.disconnect).not.toBeCalled()
      })
    })
    describe('events.disconnect()', () => {
      it('calls `props.connect().disconnect`', () => {
        const { connect, disconnect } = createEvents(props, context)
        connect(canvas)
        disconnect()
        expect(propsSpies.disconnect).toBeCalled()
      })
      it('... but only if `connect`ed', () => {
        const { connect, disconnect } = createEvents(props, context)
        disconnect()
        expect(propsSpies.disconnect).not.toBeCalled()

        connect(canvas)
        disconnect()
        expect(propsSpies.disconnect).toBeCalledTimes(1)

        disconnect()
        disconnect()
        disconnect()
        expect(propsSpies.disconnect).toBeCalledTimes(1)

        connect(canvas)
        disconnect()
        expect(propsSpies.disconnect).toBeCalledTimes(2)
      })
    })
    describe('events.test(pool, event)', () => {
      it('returns `[]` if `!isSetup`', () => {
        props.isSetUp = () => false
        const { test } = createEvents(props, context)
        const result = test([])
        expect(result).toStrictEqual([])
      })
      it('returns result of `props.getIntersections()` if `isSetup`', () => {
        Object.assign(props, {
          isSetup: () => true,
          getIntersections: () => 'BBB',
        })
        const { test } = createEvents(props, context)
        const result = test([])
        expect(result).toStrictEqual('BBB')
      })
    })
    describe('events.handle(event)', () => {
      it('returns result of `props.getIntersections()`', () => {
        Object.assign(props, {
          getIntersections: () => 999,
        })
        const { handle } = createEvents(props, context)
        const result = handle(new MouseEvent('click'))
        expect(result).toStrictEqual(999)
      })

      describe('if `handle` cannot be "set up"', () => {
        it('calls `setUp` then bails', () => {
          let succeeded = false
          let failed = false
          const succeed = () => { succeeded = true }
          const fail = () => { failed = true }

          Object.assign(props, {
            isSetup: () => false,
            setUp: succeed,
            getIntersectionsPool: fail,
            getIntersections: fail,
            handleIntersections: fail,
            tearDown: fail,
          })

          const events = createEvents(props, context)
          const { handle } = events
          handle(new MouseEvent('click'))
          expect(succeeded).toBe(true)
          expect(failed).toBe(false)
        })
      })

      describe('if `handle` can be "set up"', () => {
        const EXPECTED_METHOD_CALL_ORDER = [
          'setUp',
          'getIntersectionsPool',
          'getIntersections',
          'handleIntersections',
          'tearDown',
        ]
        const calledMethods = []
        const methods = EXPECTED_METHOD_CALL_ORDER.reduce((acc, label) => { acc[label] = () => calledMethods.push(label); return acc }, {})
        const myProps = Object.assign(
          {},
          props,
          { isSetUp: () => true },
          methods,
        )
        const events = createEvents(myProps, context)
        const { handle } = events
        handle(new MouseEvent('click'))

        for (let i = 0; i < EXPECTED_METHOD_CALL_ORDER.length; i++) {
          const methodName = EXPECTED_METHOD_CALL_ORDER[i]
          it(`${i === 0 ? '' : 'then '}calls \`${methodName}\``, () => {
            expect(calledMethods[i]).toBe(methodName)
          })
        }
      })

      describe('if `enabled === false`', () => {
        it('skips all `props.{setUp,*Intersections*,tearDown}` calls', () => {
          let failed = false
          const fail = () => failed = true
          Object.assign(props, {
            isSetup: () => {},
            setUp: fail,
            getIntersectionsPool: fail,
            getIntersections: fail,
            handleIntersections: fail,
            tearDown: fail,
          })
          const events = createEvents(props, context)
          events.enabled = false
          events.handle(new MouseEvent('click'))
          expect(failed).toStrictEqual(false)
        })
        it('returns `[]`', () => {
          const events = createEvents(props, context)

          events.enabled = false
          const result1 = events.handle(new MouseEvent('click'))
          expect(result1).toStrictEqual([])
        })
      })
      describe(`props.filter`, () => {
        describe('if `props.filter` is a function', () => {
          it('calls `props.filter` on the result of `props.getIntersections()`', () => {
            const result = []
            Object.assign(props, {
              getIntersections: () => { result.push(2); return [101, 102, 103, 104] },
              filter: (obj) => { obj = obj.filter(n => n % 2 === 1); return obj },
            })
            const { handle } = createEvents(props, context)
            const handleResult = handle(new MouseEvent('click'))
            expect(handleResult).toStrictEqual([101, 103])
          })
        })
        describe('if `props.filter` is `undefined`', () => {
          it('returns result of `props.getIntersections()`', () => {
            const result = []
            Object.assign(props, {
              getIntersections: () => { result.push(2); return [101, 102, 103, 104] },
            })
            const { handle } = createEvents(props, context)

            props.filter = undefined
            const handleResult = handle(new MouseEvent('click'))
            expect(handleResult).toStrictEqual([101, 102, 103, 104])
          })
        })
      })
    })
    describe('events.remove', () => {
      it('forwards to `props.remove`', () => {
        const spy = vi.spyOn(props, 'remove')
        const events = createEvents(props, context)
        events.enabled = false
        events.remove(2)
        expect(spy).toBeCalledTimes(1)
      })
    })
  })
})

function mockTresContext() {
  return {
    scene: shallowRef(new Scene()),
    events: null,
    registerCamera: () => {},
    deregisterCamera: () => {},
  } as unknown as TresContext
}

function mockCanvasAndListeners() {
  const spies = {
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }
  const listeners = {}
  const canvas = {
    addEventListener: (eventName, fn) => {
      spies.addEventListener()
      if (listeners[eventName]) {
        listeners[eventName].push(fn)
      }
      else {
        listeners[eventName] = [fn]
      }
    },
    removeEventListener: (eventName, fn) => {
      if (listeners[eventName]) {
        spies.removeEventListener()
        listeners[eventName] = listeners[eventName].filter(f => f !== fn)
      }
    },
  } as HTMLCanvasElement
  return { listeners, canvas, spies }
}

function mockTresInstance() {
  const { canvas, listeners, spies } = mockCanvasAndListeners()
  const context = mockTresContext()
  const nodeOps = getNodeOps(context)

  return {
    canvas,
    canvasListeners: listeners,
    canvasSpies: spies,
    context,
    nodeOps,
  }
}

function mockEventsPropsAndSpies(context?: TresContext) {
  const connectSpy = vi.fn()
  const disconnectSpy = vi.fn()
  let _isSetUp = false
  const setUpIntersectionsSpy = vi.fn()
  const tearDownIntersectionsSpy = vi.fn()
  context = context ?? mockTresContext()
  const initialConfig = { context, enabled: true, priority: 0, lastEvent: new MouseEvent('mousemove') }
  let lastEvent = new MouseEvent('mousemove')
  const props: CreateEventsProps<{ context: typeof context }, typeof context, MouseEvent, number, number, HTMLCanvasElement> = {
    getInitialConfig: (_ctx: typeof context, _emit) => initialConfig,
    getInitialEvent: () => new MouseEvent('mousemove'),
    connect: (target: EventTarget, handle, _config: typeof initialConfig) => {
      connectSpy()
      target.addEventListener('click', handle)
      return { disconnect: disconnectSpy }
    },
    setUp: () => { _isSetUp = true; setUpIntersectionsSpy() },
    isSetUp: () => _isSetUp,
    getIntersectionsPool: () => [],
    getIntersections: () => [],
    handleIntersections: () => {},
    tearDown: () => { _isSetUp = false; tearDownIntersectionsSpy() },
    insert: () => {},
    remove: () => {},
    patchProp: () => true,
    stashLastEvent: (event: MouseEvent) => lastEvent = event,
    getLastEvent: () => lastEvent,
  }
  return {
    props,
    spies: {
      connect: connectSpy,
      disconnect: disconnectSpy,
      setUp: setUpIntersectionsSpy,
      tearDown: tearDownIntersectionsSpy,
    },
  }
}
