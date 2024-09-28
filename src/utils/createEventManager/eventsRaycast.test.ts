import type { TresContext } from 'src/composables/useTresContextProvider'
import type { ThreeEvent, TresObject } from 'src/types'
import type { Object3D } from 'three'
import { BoxGeometry, MeshBasicMaterial, Scene, Vector3 } from 'three'
import * as THREE from 'three'
import { describe, expect, it, vi } from 'vitest'
import { shallowRef } from 'vue'
import catalogue from '../../core/catalogue'
import { nodeOps as getNodeOps } from '../../core/nodeOps'
import { DOM_TO_THREE, type DomEventName, type ThreeEventName } from './const'
import { createEventManager } from './createEventManager'
import { eventsRaycast } from './eventsRaycast'

const mockIntersections: THREE.Intersection<Object3D>[] = []
const clear = () => { vi.clearAllMocks(); mockIntersections.length = 0 }

// NOTE: This array holds objects used in tests in vitest `for`.
// `domEvent` is the type of the Tres handler to be triggered
// `nativeEvent` is the canvas event that triggers the Tres handler
// `call` triggers the Tres handler when run
const DOM_NATIVE_CALL: { domEvent: DomEventName, nativeEvent: PointerEvent | MouseEvent, call: (mock, nativeEvent, objects) => void }[] = [{
  domEvent: 'click',
  nativeEvent: new MouseEvent('click'),
  call: (mock, nativeEvent, objs) => { mock.apply(nativeEvent).to(objs) },
}, {
  domEvent: 'dblclick',
  nativeEvent: new MouseEvent('dblclick'),
  call: (mock, nativeEvent, objs) => { mock.apply(nativeEvent).to(objs) },
}, {
  domEvent: 'contextmenu',
  nativeEvent: new MouseEvent('contextmenu'),
  call: (mock, nativeEvent, objs) => { mock.apply(nativeEvent).to(objs) },
}, {
  domEvent: 'pointerup',
  nativeEvent: mockEvt('pointerup'),
  call: (mock, nativeEvent, objs) => { mock.apply(nativeEvent).to(objs) },
}, {
  domEvent: 'pointerdown',
  nativeEvent: mockEvt('pointerdown'),
  call: (mock, nativeEvent, objs) => { mock.apply(nativeEvent).to(objs) },
}, {
  domEvent: 'pointermove',
  nativeEvent: mockEvt('pointermove'),
  call: (mock, nativeEvent, objs) => { mock.apply(nativeEvent).to(objs) },
}, {
  domEvent: 'pointerover',
  nativeEvent: mockEvt('pointermove'),
  call: (mock, nativeEvent, objs) => {
    mock.apply(nativeEvent).to([])
    mock.apply(nativeEvent).to(objs)
  },
}, {
  domEvent: 'pointerout',
  nativeEvent: mockEvt('pointermove'),
  call: (mock, nativeEvent, objs) => {
    mock.apply(nativeEvent).to(objs)
    mock.apply(nativeEvent).to([])
  },
}, {
  domEvent: 'pointerenter',
  nativeEvent: mockEvt('pointermove'),
  call: (mock, nativeEvent, objs) => {
    mock.apply(nativeEvent).to([])
    mock.apply(nativeEvent).to(objs)
  },
}, {
  domEvent: 'pointerleave',
  nativeEvent: mockEvt('pointermove'),
  call: (mock, nativeEvent, objs) => {
    mock.apply(nativeEvent).to(objs)
    mock.apply(nativeEvent).to([])
  },
}, {
  domEvent: 'pointermissed',
  nativeEvent: mockEvt('pointerup'),
  call: (mock, nativeEvent, _objs) => {
    mock.apply(nativeEvent).to([])
  },
}, {
  domEvent: 'wheel',
  nativeEvent: new MouseEvent('wheel'),
  call: (mock, nativeEvent, objs) => {
    mock.apply(nativeEvent).to(objs)
  },
}]

describe('eventsRaycast', () => {
  describe('eventsRaycast.getIntersectionsPool', () => {
    it('returns `[]` if no objects have events', () => {
      const mock = mockTresUsingEventManagerProps()
      mock.add.DAG('g0 -> m0 m1; g2 -> m2')
      const { config } = mock.context.eventManager
      expect(eventsRaycast.getIntersectionsPool(mockEvt('pointermove'), config)).toStrictEqual([])
    })
    it('returns an array including the object with events and all of its descendants', () => {
      const mock = mockTresUsingEventManagerProps()
      const { config } = mock.context.eventManager
      const { g0, m0, m1, mm0, g2, m2 } = mock.add.DAG('g0 -> m0 m1; m1 -> mm0; g2 -> m2')

      let pool = eventsRaycast.getIntersectionsPool(mockEvt('pointermove'), config)

      expect(pool.includes(g0)).toBe(false)
      expect(pool.includes(m0)).toBe(false)
      expect(pool.includes(m1)).toBe(false)
      expect(pool.includes(mm0)).toBe(false)

      expect(pool.includes(g2)).toBe(false)
      expect(pool.includes(m2)).toBe(false)

      mock.add.eventsTo(m1)
      pool = eventsRaycast.getIntersectionsPool(mockEvt('pointermove'), config)

      expect(pool.includes(g0)).toBe(false)
      expect(pool.includes(m0)).toBe(false)
      expect(pool.includes(m1)).toBe(true)
      expect(pool.includes(mm0)).toBe(true)

      expect(pool.includes(g2)).toBe(false)
      expect(pool.includes(m2)).toBe(false)

      mock.add.eventsTo(g0)
      pool = eventsRaycast.getIntersectionsPool(mockEvt('pointermove'), config)

      expect(pool.includes(g0)).toBe(true)
      expect(pool.includes(m0)).toBe(true)
      expect(pool.includes(m1)).toBe(true)
      expect(pool.includes(mm0)).toBe(true)

      expect(pool.includes(g2)).toBe(false)
      expect(pool.includes(m2)).toBe(false)

      mock.add.eventsTo(g2)
      pool = eventsRaycast.getIntersectionsPool(mockEvt('pointermove'), config)

      expect(pool.includes(g0)).toBe(true)
      expect(pool.includes(m0)).toBe(true)
      expect(pool.includes(m1)).toBe(true)

      expect(pool.includes(g2)).toBe(true)
      expect(pool.includes(m2)).toBe(true)
    })
    it('updates when called after `nodeOps.patchProp` patches an event', () => {
      const mock = mockTresUsingEventManagerProps()
      const { config } = mock.context.eventManager
      const { g0, m0, m1, g2, m2 } = mock.add.DAG('g0 -> m0 m1; g2 -> m2')

      mock.nodeOps.patchProp(m0, 'onPointermove', undefined, () => {})
      let pool = eventsRaycast.getIntersectionsPool(mockEvt('pointermove'), config)

      expect(pool.includes(g0)).toBe(false)
      expect(pool.includes(m0)).toBe(true)
      expect(pool.includes(m1)).toBe(false)

      expect(pool.includes(g2)).toBe(false)
      expect(pool.includes(m2)).toBe(false)

      mock.nodeOps.patchProp(g0, 'onPointermove', undefined, () => {})
      pool = eventsRaycast.getIntersectionsPool(mockEvt('pointermove'), config)

      expect(pool.includes(g0)).toBe(true)
      expect(pool.includes(m0)).toBe(true)
      expect(pool.includes(m1)).toBe(true)

      expect(pool.includes(g2)).toBe(false)
      expect(pool.includes(m2)).toBe(false)

      mock.nodeOps.patchProp(m2, 'onPointermove', undefined, () => {})
      pool = eventsRaycast.getIntersectionsPool(mockEvt('pointermove'), config)
      expect(pool.includes(g2)).toBe(false)
      expect(pool.includes(m2)).toBe(true)
    })
    it('updates when called after `nodeOps.remove`', () => {
      const mock = mockTresUsingEventManagerProps()
      const { config } = mock.context.eventManager
      const { g0, m0, m1, g2, m2 } = mock.add.DAG('g0 -> m0 m1; g2 -> m2')

      mock.add.eventsTo(g0)
      mock.add.eventsTo(m0)
      let pool = eventsRaycast.getIntersectionsPool(mockEvt('pointermove'), config)

      expect(pool.includes(g0)).toBe(true)
      expect(pool.includes(m0)).toBe(true)
      expect(pool.includes(m1)).toBe(true)

      expect(pool.includes(g2)).toBe(false)
      expect(pool.includes(m2)).toBe(false)

      mock.nodeOps.remove(m0)
      pool = eventsRaycast.getIntersectionsPool(mockEvt('pointermove'), config)

      expect(pool.includes(g0)).toBe(true)
      expect(pool.includes(m0)).toBe(false)
      expect(pool.includes(m1)).toBe(true)

      expect(pool.includes(g2)).toBe(false)
      expect(pool.includes(m2)).toBe(false)

      mock.nodeOps.remove(g0)

      pool = eventsRaycast.getIntersectionsPool(mockEvt('pointermove'), config)

      expect(pool.includes(g0)).toBe(false)
      expect(pool.includes(m0)).toBe(false)
      expect(pool.includes(m1)).toBe(false)

      expect(pool.includes(g2)).toBe(false)
      expect(pool.includes(m2)).toBe(false)
    })
  })

  describe('eventManager.test(pool: Iterable<Object3D>, event: MouseEvent | PointerEvent)', () => {
    it('returns `[]` if not `isSetUp()`', () => {
      const mock = mockTresUsingEventManagerProps()
      const objects = mock.add.DAG('g0 -> m0')
      eventsRaycast.isSetUp = () => false
      const { test } = mock.context.eventManager
      expect(test([objects.g0, objects.m0])).toStrictEqual([])
    })
    it('returns `raycaster.intersectObjects(objects)` if `isSetup()`', () => {
      const mock = mockTresUsingEventManagerProps()
      const objects = mock.add.DAG('g0 -> m0 m1; m0 -> g1; g1 -> m2')
      eventsRaycast.isSetUp = () => true
      mock.context.eventManager.config.raycaster.intersectObjects = objects => objects.map(object => ({ object }))

      const { test } = mock.context.eventManager
      const pool = [objects.g0, objects.m0]
      expect(test(pool)).toStrictEqual(mock.context.eventManager.config.raycaster.intersectObjects(pool))
    })
  })

  describe('eventsRaycast.handleIntersections(incomingEvent, intersections, config)', () => {
    describe('map: native event => "@" event handlers', () => {
      it.each(DOM_NATIVE_CALL)('$nativeEvent.type => $domEvent', ({ domEvent, nativeEvent, call }) => {
        const mock = mockTresUsingEventManagerProps()
        const { m } = mock.add.DAG('m')
        let event: ThreeEvent<any> | null = null
        mock.nodeOps.patchProp(m, DOM_TO_THREE[domEvent], null, (e: ThreeEvent<any>) => { event = { ...e } })
        call(mock, nativeEvent, [m])
        expect(event).toBeDefined()
      })
    })
    describe('handler `event`', () => {
      it.each(DOM_NATIVE_CALL)('is expected type in Tres\' $domEvent following DOM $nativeEvent.type', ({ domEvent, nativeEvent, call }) => {
        const mock = mockTresUsingEventManagerProps()
        const { m } = mock.add.DAG('m')
        let event: ThreeEvent<any> | null = null
        mock.nodeOps.patchProp(m, DOM_TO_THREE[domEvent], null, (e: ThreeEvent<any>) => { event = { ...e } })
        call(mock, nativeEvent, [m])

        expect(event.eventObject).toBe(m)
        expect(event.eventObject).toBe(event.currentTarget)
        expect(event.target.uuid).toBe(m.uuid)
        expect(typeof event.stopPropagation).toBe('function')
        expect(typeof event.preventDefault).toBe('function')
        expect(typeof event.eventObject.setPointerCapture).toBe('function')
        expect(typeof event.eventObject.hasPointerCapture).toBe('function')
        expect(typeof event.eventObject.releasePointerCapture).toBe('function')

        expect(event).toHaveProperty('intersections')
        expect(Array.isArray(event.intersections)).toBe(true)

        // NOTE: 'is a `{ ...intersection }` if an object was intersected', () => {
        if ('intersections' in event
        // NOTE: These events don't have intersections in our test setup.
          && !['pointerout', 'pointerleave', 'pointermissed'].includes(domEvent)
        ) {
          for (const key of Object.keys(event.intersections[0])) {
            if (key === 'object') {
              expect(event.object).toStrictEqual(m)
            }
            else {
              expect(event[key]).toStrictEqual(event.intersections[0][key])
            }
          }
        }

        expect(event.nativeEvent).toBe(nativeEvent)

        // NOTE: it is a `{ ...domEvent }` that has the fields of `event.nativeEvent`
        for (const key in event.nativeEvent) {
          const nativeEventValue = event.nativeEvent[key]
          if (typeof nativeEventValue === 'function') {
            // NOTE: Method fields are not copied onto new event.
            // `stopPropagation` and `preventDefault` are added
            // for internal use and use by Vue
            if (key === 'stopPropagation' || key === 'preventDefault') {
              expect(event).toHaveProperty(key)
              expect(typeof event[key]).toBe('function')
            }
          }
          else if (key === 'target' || key === 'currentTarget') {
            // NOTE: These fields will be the canvas or other DOM element
            // on `nativeEvent`. For Tres synthetic events, they'll
            // be Tres objects. These are tested elsewhere. Just check
            // that they exist.
            expect(event).toHaveProperty(key)
          }
          else {
            expect(event).toHaveProperty(key)
            expect(event[key]).toStrictEqual(nativeEventValue)
          }
        }

        expect(event).toHaveProperty('pointer')
        expect(event.pointer.isVector2).toBe(true)

        expect(event.ray).toBe(mock.context.eventManager.config.raycaster.ray)
        expect(event.camera).toBe(mock.context.camera.value)
        expect(event).toHaveProperty('unprojectedPoint')
        expect(event.unprojectedPoint.isVector3).toBe(true)
        expect(event).toHaveProperty('delta')
        expect(typeof event.delta).toBe('number')
      })
      describe('special handler `event` details', () => {
        describe('event.delta [sic]', () => {
          describe('if last event is a `click`, `contextmenu`, `dblclick`, or `pointerup`', () => {
            it('is the distance between prior `pointerdown` and the pointer position', () => {
              const mock = mockTresUsingEventManagerProps()
              const { m } = mock.add.DAG('m')
              let lastEvent: ThreeEvent<any> | null = null
              mock.nodeOps.patchProp(m, 'onClick', undefined, (e: ThreeEvent<any>) => lastEvent = { ...e })
              mock.nodeOps.patchProp(m, 'onContextmenu', undefined, (e: ThreeEvent<any>) => lastEvent = { ...e })
              mock.nodeOps.patchProp(m, 'onDblclick', undefined, (e: ThreeEvent<any>) => lastEvent = { ...e })
              mock.nodeOps.patchProp(m, 'onPointerup', undefined, (e: ThreeEvent<any>) => lastEvent = { ...e })

              const r = () => 100 * (Math.random() - 0.5)

              let [x0, y0, x1, y1] = [r(), r(), r(), r()]
              mock.apply(mockEvt('pointerdown', { offsetX: x0, offsetY: y0 })).to([m])
              mock.apply(mockEvt('click', { offsetX: x1, offsetY: y1 })).to([m])
              let expectedDistance = Math.sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2)
              expect(lastEvent.delta).toBe(expectedDistance);

              [x0, y0, x1, y1] = [r(), r(), r(), r()]
              mock.apply(mockEvt('pointerdown', { offsetX: x0, offsetY: y0 })).to([m])
              mock.apply(mockEvt('contextmenu', { offsetX: x1, offsetY: y1 })).to([m])
              expectedDistance = Math.sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2)
              expect(lastEvent.delta).toBe(expectedDistance);

              [x0, y0, x1, y1] = [r(), r(), r(), r()]
              mock.apply(mockEvt('pointerdown', { offsetX: x0, offsetY: y0 })).to([m])
              mock.apply(mockEvt('dblclick', { offsetX: x1, offsetY: y1 })).to([m])
              expectedDistance = Math.sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2)
              expect(lastEvent.delta).toBe(expectedDistance);

              [x0, y0, x1, y1] = [r(), r(), r(), r()]
              mock.apply(mockEvt('pointerdown', { offsetX: x0, offsetY: y0 })).to([m])
              mock.apply(mockEvt('pointerup', { offsetX: x1, offsetY: y1 })).to([m])
              expectedDistance = Math.sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2)
              expect(lastEvent.delta).toBe(expectedDistance)
            })
          })
          describe('if last event is a not `click`, `contextmenu`, `dblclick`, or `pointerup`', () => {
            it('is `0`', () => {
              const mock = mockTresUsingEventManagerProps()
              const { m } = mock.add.DAG('m')
              let lastEvent: ThreeEvent<any> | null = null
              for (const key of ['onPointerdown', 'onPointerup', 'onPointermove', 'wheel']) {
                mock.nodeOps.patchProp(m, key, undefined, e => lastEvent = { ...e })
              }

              const r = () => 100 * (Math.random() - 0.5)

              mock.apply(mockEvt('pointerdown', { offsetX: r(), offsetY: r() })).to([m])
              expect(lastEvent.delta).toBe(0)
              mock.apply(mockEvt('pointermove', { offsetX: r(), offsetY: r() })).to([m])
              expect(lastEvent.delta).toBe(0)
              mock.apply(mockEvt('wheel', { offsetX: r(), offsetY: r() })).to([m])
              expect(lastEvent.delta).toBe(0)
            })
          })
        })
        describe('event.intersections', () => {
          it('is a THREE.Intersection[]', () => {
            const mock = mockTresUsingEventManagerProps()
            const { m } = mock.add.DAG('m')
            mock.add.eventsTo(m)
            mock.apply('click').to([m])
            const { intersections } = getLast('click').on(m)

            expect(Array.isArray(intersections)).toBe(true)
            expect(intersections.length).not.toBe(0)
            expect(intersections[0]).toHaveProperty('object')
            expect(intersections[0]).toHaveProperty('distance')
            expect(intersections[0]).toHaveProperty('point')
            expect(intersections[0]).toHaveProperty('eventObject')
          })

          it('orders intersections by distance', () => {
            const mock = mockTresUsingEventManagerProps()
            const { m0, m1, m2 } = mock.add.DAG('m0; m1; m2')
            mock.add.eventsTo(m0)
            mock.add.eventsTo(m1)
            mock.add.eventsTo(m2)
            // Distance is "simulated" in mock by array order below
            mock.apply('click').to([m0, m1, m2])
            let { intersections } = getLast('click').on(m0)
            expect(intersections.map(intr => intr.eventObject.name)).toStrictEqual(['m0', 'm1', 'm2'])

            mock.apply('click').to([m0, m2, m1])
            intersections = getLast('click').on(m0).intersections
            expect(intersections.map(intr => intr.eventObject.name)).toStrictEqual(['m0', 'm2', 'm1'])

            mock.apply('click').to([m2, m0, m1])
            intersections = getLast('click').on(m0).intersections
            expect(intersections.map(intr => intr.eventObject.name)).toStrictEqual(['m2', 'm0', 'm1'])
          })

          it('orders intersections as [hit0, ...ancestors, hit1, ...ancestors, hit2 ...]', () => {
            const mock = mockTresUsingEventManagerProps()
            const objects = mock.add.DAG('g -> m0; g -> m1; m0 -> m0a; m0 -> m0b; m1 -> m1a; m2 -> m2a; m2 -> m2b; m2b -> m2ba')
            const { g, m0a, m1a, m2a, m2ba } = objects
            for (const obj of Object.values(objects)) { mock.add.eventsTo(obj) }

            const getSelfAndAncestors = (obj: typeof m0a) => {
              const result = []
              // NOTE: Not strictly necessary, but in case a loop is introduced
              const duplicates = new Set()
              while (obj && !duplicates.has(obj) && !('isScene' in obj)) {
                result.push(obj)
                duplicates.add(obj)
                obj = obj.parent
              }
              return result
            }

            mock.apply('click').to([m2a, m2ba, m0a, m1a])
            const expectedOrder = [
              getSelfAndAncestors(m2a),
              getSelfAndAncestors(m2ba),
              getSelfAndAncestors(m0a),
              getSelfAndAncestors(m1a),
            ].flat().map(obj => obj.name)

            const intersections = getLast('click').on(g).intersections
            expect(intersections.map(intr => intr.eventObject.name)).toStrictEqual(expectedOrder)
          })

          it('does not include objects without events on self', () => {
            const mock = mockTresUsingEventManagerProps()
            const { m0, m1, m2, mNoEvents } = mock.add.DAG('m0 -> m1; m1 -> m2; mNoEvents')
            mock.add.eventsTo(m0)
            mock.add.eventsTo(m2)
            mock.apply('click').to([m0, m1, m2, mNoEvents])
            const { intersections } = getLast('click').on(m0)
            expect(intersections.map(intr => intr.eventObject.name)).toStrictEqual(['m0', 'm0', 'm2', 'm0'])
          })
        })

        describe('after handler is called', () => {
          describe('event.eventObject', () => {
            it('is `null`', () => {
              const mock = mockTresUsingEventManagerProps()
              const { m } = mock.add.DAG('m')
              let event: any = {}
              mock.nodeOps.patchProp(m, 'onClick', undefined, (e) => { event = e })
              mock.apply('click').to([m])
              expect(event.eventObject).toBe(null)
            })
          })
          describe('event.currentTarget', () => {
            it('is `null`', () => {
              const mock = mockTresUsingEventManagerProps()
              const { m } = mock.add.DAG('m')
              let event: any = {}
              mock.nodeOps.patchProp(m, 'onClick', undefined, (e) => { event = e })
              mock.apply('click').to([m])
              expect(event.currentTarget).toBe(null)
            })
          })
        })
      })
    })

    describe.each(
      [
        { domEvent: 'click' },
        { domEvent: 'contextmenu' },
        { domEvent: 'dblclick' },
        { domEvent: 'pointerdown' },
        { domEvent: 'pointerup' },
      ] as { domEvent: DomEventName }[],
    )('$domEvent on the DOM element', ({ domEvent }) => {
      const threeEvent = DOM_TO_THREE[domEvent]
      it(`calls \`${threeEvent}\` methods on objects under pointer and ancestors`, () => {
        const mock = mockTresUsingEventManagerProps()
        const { g0, g1, m0, m2 } = mock.add.DAG('g0 -> m0 m1; m0 -> g1; g1 -> m2')
        const g0Spies = mock.add.eventsTo(g0)
        const g1Spies = mock.add.eventsTo(g1)
        const m0Spies = mock.add.eventsTo(m0)
        const m2Spies = mock.add.eventsTo(m2)

        expect(g0Spies[threeEvent]).toBeCalledTimes(0)
        expect(g1Spies[threeEvent]).toBeCalledTimes(0)
        expect(m0Spies[threeEvent]).toBeCalledTimes(0)
        expect(m2Spies[threeEvent]).toBeCalledTimes(0)
        mock.apply(domEvent).to([m2])
        expect(g0Spies[threeEvent]).toBeCalledTimes(1)
        expect(g1Spies[threeEvent]).toBeCalledTimes(1)
        expect(m0Spies[threeEvent]).toBeCalledTimes(1)
        expect(m2Spies[threeEvent]).toBeCalledTimes(1)
      })
      it(`calls \`${threeEvent}\` methods on hit objects and ancestors`, () => {
        const mock = mockTresUsingEventManagerProps()
        const { g0, m0, m1, m2 } = mock.add.DAG('g0 -> m0 m1; m0 -> g1; g1 -> m2')
        const g0Spies = mock.add.eventsTo(g0)
        const m0Spies = mock.add.eventsTo(m0)
        const m1Spies = mock.add.eventsTo(m1)
        const m2Spies = mock.add.eventsTo(m2)

        expect(g0Spies[threeEvent]).toBeCalledTimes(0)
        expect(m0Spies[threeEvent]).toBeCalledTimes(0)
        expect(m2Spies[threeEvent]).toBeCalledTimes(0)
        mock.apply(domEvent).to([m2])
        expect(g0Spies[threeEvent]).toBeCalledTimes(1)
        expect(m0Spies[threeEvent]).toBeCalledTimes(1)
        expect(m2Spies[threeEvent]).toBeCalledTimes(1)

        mock.clear()

        expect(g0Spies[threeEvent]).toBeCalledTimes(0)
        expect(m1Spies[threeEvent]).toBeCalledTimes(0)
        mock.apply(domEvent).to([m1])
        expect(g0Spies[threeEvent]).toBeCalledTimes(1)
        expect(m1Spies[threeEvent]).toBeCalledTimes(1)
      })
      it(`calls \`${threeEvent}\` once per object per event`, () => {
        const mock = mockTresUsingEventManagerProps()
        const { m0, m1, m2 } = mock.add.DAG('m0 -> m1 m2')
        const m0Spies = mock.add.eventsTo(m0)
        mock.add.eventsTo(m1)
        mock.add.eventsTo(m2)

        expect(m0Spies[threeEvent]).toBeCalledTimes(0)
        mock.apply(domEvent).to([m1, m2])
        expect(m0Spies[threeEvent]).toBeCalledTimes(1)

        mock.clear()

        expect(m0Spies[threeEvent]).toBeCalledTimes(0)
        mock.apply(domEvent).to([m0, m1, m2])
        expect(m0Spies[threeEvent]).toBeCalledTimes(1)
      })
      it('bubbles event to parents', () => {
        const mock = mockTresUsingEventManagerProps()
        const { gParent, mChild, mGrandchild } = mock.add.DAG('gParent -> mChild; mChild -> mGrandchild')
        gParent.name = 'gParent'
        mock.add.eventsTo(gParent)
        mock.add.eventsTo(mGrandchild)

        mock.apply(domEvent).to([mGrandchild])
        expect(gParent[threeEvent]).toBeCalledTimes(1)

        mock.clear()
        mock.apply(domEvent).to([mChild])
        expect(gParent[threeEvent]).toBeCalledTimes(1)
      })
    })

    describe('pointermissed', () => {
      it('calls `pointermissed` on all elements in subtrees that were not hit', () => {
        const mock = mockTresUsingEventManagerProps()
        // NOTE: Names in DAG
        //
        // Prefixes denote type:
        // `g` is a `TresGroup`
        // `m` is a `TresMesh`
        //
        // Suffixes denote descendence:
        // Parent -> child -> grandchild -> etc.
        // A -> AB -> ABD -> ABDE
        // A -> AC
        const { gA, mAB, mAC, mABDE } = mock.add.DAG('gA -> mAB mAC; mAB -> gABD; gABD -> mABDE')

        const gASpies = mock.add.eventsTo(gA)
        const mABSpies = mock.add.eventsTo(mAB)
        const mACSpies = mock.add.eventsTo(mAC)
        const mABDESpies = mock.add.eventsTo(mABDE)

        expect(gASpies.onPointermissed).toBeCalledTimes(0)
        expect(mABSpies.onPointermissed).toBeCalledTimes(0)
        expect(mACSpies.onPointermissed).toBeCalledTimes(0)
        expect(mABDESpies.onPointermissed).toBeCalledTimes(0)

        // NOTE: We're going to "hit" `mABDE`.
        // Ancestors `mA`, `mABD` are also "hit".
        // `mAC` is "missed".
        mock.apply('pointerup').to([mABDE])

        expect(gASpies.onPointermissed).toBeCalledTimes(0)
        expect(mABSpies.onPointermissed).toBeCalledTimes(0)
        expect(mACSpies.onPointermissed).toBeCalledTimes(1)
        expect(mABDESpies.onPointermissed).toBeCalledTimes(0)

        vi.clearAllMocks()
        mock.apply('pointerup').to([mAC])
        expect(gASpies.onPointermissed).toBeCalledTimes(0)
        expect(mABSpies.onPointermissed).toBeCalledTimes(1)
        expect(mACSpies.onPointermissed).toBeCalledTimes(0)
        expect(mABDESpies.onPointermissed).toBeCalledTimes(1)

        vi.clearAllMocks()
        mock.apply('pointerup').to([])
        expect(gASpies.onPointermissed).toBeCalledTimes(1)
        expect(mABSpies.onPointermissed).toBeCalledTimes(1)
        expect(mACSpies.onPointermissed).toBeCalledTimes(1)
        expect(mABDESpies.onPointermissed).toBeCalledTimes(1)
      })
    })
    describe('wheel (DOM)', () => {
      it('calls `wheel` handlers on "hit" objects', () => {
        const mock = mockTresUsingEventManagerProps()
        const objects = mock.add.DAG('g0 -> m0 m1; m0 -> g1; g1 -> m2')
        const { g0, m2 } = objects
        const g0Spies = mock.add.eventsTo(g0)
        const m2Spies = mock.add.eventsTo(m2)

        // NOTE: Nothing "hit". No calls expected.
        mock.apply('wheel').to([])
        expect(g0Spies.onWheel).toBeCalledTimes(0)
        expect(m2Spies.onWheel).toBeCalledTimes(0)

        mock.apply('wheel').to([g0])
        expect(g0Spies.onWheel).toBeCalledTimes(1)
        expect(m2Spies.onWheel).toBeCalledTimes(0)

        mock.apply('wheel').to([m2])
        expect(g0Spies.onWheel).toBeCalledTimes(2)
        expect(m2Spies.onWheel).toBeCalledTimes(1)

        mock.apply('wheel').to([[]])
        expect(g0Spies.onWheel).toBeCalledTimes(2)
        expect(m2Spies.onWheel).toBeCalledTimes(1)
      })
    })
  })
  describe('propagation', () => {
    describe('handleIntersections', () => {
      const PROPAGATORS = DOM_NATIVE_CALL.filter(o => !['pointerenter', 'pointerleave', 'pointermissed'].includes(o.domEvent))
      it.each(PROPAGATORS)('bubbles $domEvent following $nativeEvent.type on DOM element', ({ domEvent, nativeEvent, call }) => {
        // NOTE:
        // "bubbles" here means that the initial event was triggered
        // on a child – set as the event `target`. Then the event is
        // sent "up" to ancestors.
        const threeEvent = DOM_TO_THREE[domEvent]
        const mock = mockTresUsingEventManagerProps()
        const { gParent, mChild, mGrandchild } = mock.add.DAG('gParent -> mChild; mChild -> mGrandchild')

        mock.add.eventsTo(gParent)
        mock.add.eventsTo(mChild)

        vi.clearAllMocks()
        call(mock, nativeEvent, [mChild])
        expect(gParent[threeEvent]).toBeCalledTimes(1)
        expect(getLast(domEvent).on(gParent).target).toBe(mChild)

        vi.clearAllMocks()
        call(mock, nativeEvent, [mGrandchild])
        expect(gParent[threeEvent]).toBeCalledTimes(1)
        expect(getLast(domEvent).on(gParent).target).toBe(mGrandchild)
        expect(mChild[threeEvent]).toBeCalledTimes(1)
        expect(getLast(domEvent).on(mChild).target).toBe(mGrandchild)
      })

      const NON_PROPAGATORS = DOM_NATIVE_CALL.filter(o => ['pointerenter', 'pointerleave', 'pointermissed'].includes(o.domEvent))
      it.each(NON_PROPAGATORS)('does not bubble $domEvent following $nativeEvent.type on DOM element', ({ domEvent, nativeEvent, call }) => {
        // NOTE:
        // Events that are not "bubbled" are always "self" events:
        // `event.currentTarget === event.target`
        const threeEvent = DOM_TO_THREE[domEvent]
        const mock = mockTresUsingEventManagerProps()
        const { gParent, mChild, mGrandchild } = mock.add.DAG('gParent -> mChild; mChild -> mGrandchild')
        mock.add.eventsTo(gParent)
        mock.add.eventsTo(mChild)

        vi.clearAllMocks()
        call(mock, nativeEvent, [mChild])
        expect(gParent[threeEvent]).toBeCalledTimes(1)
        expect(getLast(domEvent).on(gParent).target.uuid).toBe(gParent.uuid)

        vi.clearAllMocks()
        call(mock, nativeEvent, [mGrandchild])
        expect(gParent[threeEvent]).toBeCalledTimes(1)
        expect(getLast(domEvent).on(gParent).target).toBe(gParent)
        expect(mChild[threeEvent]).toBeCalledTimes(1)
        expect(getLast(domEvent).on(mChild).target).toBe(mChild)
      })
    })
  })
  describe('stopping propagation', () => {
    describe('event.stopPropagation()', () => {
      it.each([
        { domEventName: 'click', threeEventName: 'onClick' },
        { domEventName: 'contextmenu', threeEventName: 'onContextmenu' },
        { domEventName: 'dblclick', threeEventName: 'onDblclick' },
        { domEventName: 'pointerup', threeEventName: 'onPointerup' },
        { domEventName: 'pointerdown', threeEventName: 'onPointerdown' },
        { domEventName: 'pointermove', threeEventName: 'onPointermove' },
        { domEventName: 'wheel', threeEventName: 'onWheel' },
      ] as { domEventName: DomEventName, threeEventName: ThreeEventName }[],
      )('stops $domEventName', ({ domEventName, threeEventName }) => {
        const mock = mockTresUsingEventManagerProps()
        const { gListener, gStopper, mSource } = mock.add.DAG('gListener -> gStopper; gStopper -> mSource')
        const gListenerSpies = mock.add.eventsTo(gListener)

        // NOTE: Stop propagation and check that handler is not called.
        mock.nodeOps.patchProp(gStopper, threeEventName, undefined, e => e.stopPropagation())
        vi.clearAllMocks()
        mock.apply(domEventName).to([mSource])
        expect(gListenerSpies[threeEventName]).not.toBeCalled()
      })
      it.each([
        { domEventName: 'pointerover', threeEventName: 'onPointerover' },
        { domEventName: 'pointerout', threeEventName: 'onPointerout' },
      ])('stops $domEventName', ({ threeEventName }) => {
        const mock = mockTresUsingEventManagerProps()
        const { gListener, gStopper, mSource } = mock.add.DAG('gListener -> gStopper; gStopper -> mSource')
        const gListenerSpies = mock.add.eventsTo(gListener)

        // NOTE: Stop propagation and check that handler is called anyway.
        mock.nodeOps.patchProp(gStopper, threeEventName, undefined, e => e.stopPropagation())
        vi.clearAllMocks()
        mock.apply('pointermove').to([])
        mock.apply('pointermove').to([mSource])
        mock.apply('pointermove').to([])
        expect(gListenerSpies[threeEventName]).not.toBeCalled()
      })
      it.each([
        { domEventName: 'pointerenter', threeEventName: 'onPointerenter' },
        { domEventName: 'pointerleave', threeEventName: 'onPointerleave' },
      ])('does not stop $domEventName (because it is not propagated)', ({ threeEventName }) => {
        const mock = mockTresUsingEventManagerProps()
        const { gListener, gStopper, mSource } = mock.add.DAG('gListener -> gStopper; gStopper -> mSource')
        const gListenerSpies = mock.add.eventsTo(gListener)

        // NOTE: Stop propagation and check that handler is called anyway.
        mock.nodeOps.patchProp(gStopper, threeEventName, undefined, e => e.stopPropagation())
        vi.clearAllMocks()
        mock.apply('pointermove').to([])
        mock.apply('pointermove').to([mSource])
        mock.apply('pointermove').to([])
        expect(gListenerSpies[threeEventName]).toBeCalled()
      })
      it('does not stop propagation for \'pointermissed\' (because it is not propagated)', () => {
        const mock = mockTresUsingEventManagerProps()
        const { gListener, gStopper } = mock.add.DAG('gListener -> gStopper; gStopper -> mSource')
        const gListenerSpies = mock.add.eventsTo(gListener)

        // NOTE: Stop propagation and check that handler is called anyway.
        mock.nodeOps.patchProp(gStopper, 'onPointermissed', undefined, e => e.stopPropagation())
        vi.clearAllMocks()
        mock.apply('pointerup').to([])
        expect(gListenerSpies.onPointermissed).toBeCalled()
      })
    })
  })

  describe('tres event handlers: handler-specific problems', () => {
    describe('pointerenter', () => {
      it('is called on objects newly under pointer', () => {
        const mock = mockTresUsingEventManagerProps()

        const { g0, g1, m1, m2, mNotIncluded } = mock.add.DAG('g0 -> m0 m1; m0 -> g1; g1 -> m2; m2 -> mNotIncluded')
        const g0Spies = mock.add.eventsTo(g0)
        const g1Spies = mock.add.eventsTo(g1)
        const mNotIncludedSpies = mock.add.eventsTo(mNotIncluded)

        mock.set.mockIntersection(m2)

        expect(g0Spies.onPointerenter).toBeCalledTimes(0)
        expect(g1Spies.onPointerenter).toBeCalledTimes(0)
        expect(mNotIncludedSpies.onPointerenter).toBeCalledTimes(0)

        mock.apply('pointermove').to([m2])
        expect(g0Spies.onPointerenter).toBeCalledTimes(1)
        expect(g1Spies.onPointerenter).toBeCalledTimes(1)
        expect(mNotIncludedSpies.onPointerenter).toBeCalledTimes(0)

        mock.apply('pointermove').to([])
        expect(g0Spies.onPointerenter).toBeCalledTimes(1)
        expect(g1Spies.onPointerenter).toBeCalledTimes(1)
        expect(mNotIncludedSpies.onPointerenter).toBeCalledTimes(0)

        mock.apply('pointermove').to([m1])
        expect(g0Spies.onPointerenter).toBeCalledTimes(2)
        expect(g1Spies.onPointerenter).toBeCalledTimes(1)
        expect(mNotIncludedSpies.onPointerenter).toBeCalledTimes(0)
      })

      it('is not called on objects still directly under pointer', () => {
        const mock = mockTresUsingEventManagerProps()
        const { mUnderPointer, mAlternates } = mock.add.DAG('mUnderPointer; mAlternates')
        const mUnderPointerSpies = mock.add.eventsTo(mUnderPointer)
        mock.add.eventsTo(mAlternates)

        mock.set.mockIntersection(mUnderPointer)
        mock.apply(['pointermove', 'pointermove', 'pointermove']).to([mUnderPointer])
        expect(mUnderPointerSpies.onPointerenter).toBeCalledTimes(1)

        mock.clear()
        mock.apply(['pointermove', 'pointermove', 'pointermove']).to([mUnderPointer, mAlternates])
        expect(mUnderPointerSpies.onPointerenter).toBeCalledTimes(0)

        mock.clear()
        mock.apply(['pointermove', 'pointermove', 'pointermove']).to([mUnderPointer])
        expect(mUnderPointerSpies.onPointerenter).toBeCalledTimes(0)

        mock.clear()
        mock.apply(['pointermove', 'pointermove', 'pointermove']).to([mAlternates, mUnderPointer])
        expect(mUnderPointerSpies.onPointerenter).toBeCalledTimes(0)
      })

      it('is not called on objects still under pointer via a different child', () => {
        const mock = mockTresUsingEventManagerProps()
        const { gStaysUnderPointer, m0, m1 } = mock.add.DAG('gStaysUnderPointer -> m0 m1')
        const gStaysUnderPointerSpies = mock.add.eventsTo(gStaysUnderPointer)

        mock.apply('pointermove').to([m0])
        expect(gStaysUnderPointerSpies.onPointerenter).toBeCalledTimes(1)

        mock.apply('pointermove').to([m1])
        expect(gStaysUnderPointerSpies.onPointerenter).toBeCalledTimes(1)
      })

      describe('pointerenter event', () => {
        const mock = mockTresUsingEventManagerProps()
        const { g0, m0 } = mock.add.DAG('g0 -> m0')
        let m0Event: ThreeEvent<PointerEvent> | null = null
        let g0Event: ThreeEvent<PointerEvent> | null = null
        mock.nodeOps.patchProp(m0, 'onPointerenter', undefined, (e: ThreeEvent<PointerEvent>) => m0Event = { ...e })
        mock.nodeOps.patchProp(g0, 'onPointerenter', undefined, (e: ThreeEvent<PointerEvent>) => g0Event = { ...e })

        mock.apply('pointermove').to([[], [m0]])
        it('has an `target` field containing the object the event was registered on', () => {
          expect(g0Event.target).toBe(g0)
          expect(m0Event.target).toBe(m0)
        })
        it('has an `object` field containing the object the event was registered on', () => {
          expect(g0Event.object).toBe(g0)
          expect(m0Event.object).toBe(m0)
        })
      })
    })

    describe('pointerover', () => {
      it('is called on objects newly under pointer', () => {
        const mock = mockTresUsingEventManagerProps()

        const { g0, g1, m1, m2, mNotIncluded } = mock.add.DAG('g0 -> m0 m1; m0 -> g1; g1 -> m2; m2 -> mNotIncluded')
        const g0Spies = mock.add.eventsTo(g0)
        const g1Spies = mock.add.eventsTo(g1)
        const mNotIncludedSpies = mock.add.eventsTo(mNotIncluded)

        mock.set.mockIntersection(m2)

        expect(g0Spies.onPointerover).toBeCalledTimes(0)
        expect(g1Spies.onPointerover).toBeCalledTimes(0)
        expect(mNotIncludedSpies.onPointerover).toBeCalledTimes(0)

        mock.apply('pointermove').to([m2])
        expect(g0Spies.onPointerover).toBeCalledTimes(1)
        expect(g1Spies.onPointerover).toBeCalledTimes(1)
        expect(mNotIncludedSpies.onPointerover).toBeCalledTimes(0)

        mock.apply('pointermove').to([])
        expect(g0Spies.onPointerover).toBeCalledTimes(1)
        expect(g1Spies.onPointerover).toBeCalledTimes(1)
        expect(mNotIncludedSpies.onPointerover).toBeCalledTimes(0)

        mock.apply('pointermove').to([m1])
        expect(g0Spies.onPointerover).toBeCalledTimes(2)
        expect(g1Spies.onPointerover).toBeCalledTimes(1)
        expect(mNotIncludedSpies.onPointerover).toBeCalledTimes(0)
      })

      it('is called when pointer goes "deeper" into an object\'s descendants', () => {
        const mock = mockTresUsingEventManagerProps()

        const { g0, g1, m0, m1, m2 } = mock.add.DAG('g0 -> m0 m1; m0 -> g1; g1 -> m2')
        const g0Spies = mock.add.eventsTo(g0)
        const g1Spies = mock.add.eventsTo(g1)

        mock.set.mockIntersection(m2)

        expect(g0Spies.onPointerover).toBeCalledTimes(0)
        expect(g1Spies.onPointerover).toBeCalledTimes(0)

        mock.apply('pointermove').to([m0])
        expect(g0Spies.onPointerover).toBeCalledTimes(1)

        vi.clearAllMocks()
        mock.apply('pointermove').to([m0, m1])
        expect(g0Spies.onPointerover).toBeCalledTimes(1)
        expect(getLast('pointerover').on(g0).target).toBe(m1)

        vi.clearAllMocks()
        mock.apply('pointermove').to([m0, m2])
        expect(g0Spies.onPointerover).toBeCalledTimes(1)
        expect(getLast('pointerover').on(g0).target).toBe(m2)
      })

      it('is called on objects still under pointer via a different child', () => {
        const mock = mockTresUsingEventManagerProps()
        const { gStaysUnderPointer, m0, m1 } = mock.add.DAG('gStaysUnderPointer -> m0 m1')
        const gStaysUnderPointerSpies = mock.add.eventsTo(gStaysUnderPointer)

        mock.apply('pointermove').to([m0])
        expect(gStaysUnderPointerSpies.onPointerover).toBeCalledTimes(1)

        vi.clearAllMocks()
        // NOTE: m1 was entered. `pointerover` should be called once.
        mock.apply('pointermove').to([m0, m1])
        expect(gStaysUnderPointerSpies.onPointerover).toBeCalledTimes(1)

        vi.clearAllMocks()
        // NOTE: m0, m1 were left. Nothing new was entered. `pointerover` should not be called.
        mock.apply('pointermove').to([])
        expect(gStaysUnderPointerSpies.onPointerover).toBeCalledTimes(0)

        vi.clearAllMocks()
        // NOTE: m1 was entered. `pointerover` should be called once.
        mock.apply('pointermove').to([m0])
        expect(gStaysUnderPointerSpies.onPointerover).toBeCalledTimes(1)

        vi.clearAllMocks()
        // NOTE: m1 was entered and m0 was left. `pointerover` should be called once.
        mock.apply('pointermove').to([m1])
        expect(gStaysUnderPointerSpies.onPointerover).toBeCalledTimes(1)
      })

      describe(`with group -> mesh`, () => {
        const mock = mockTresUsingEventManagerProps()
        const { g0, m0 } = mock.add.DAG('g0 -> m0')
        const g0Spy = mock.add.eventsTo(g0).onPointerover
        const m0Spy = mock.add.eventsTo(m0).onPointerover

        describe('handler', () => {
          it('is called once for the same "over"', () => {
            vi.clearAllMocks()
            // NOTE: Move over nothing twice, then over/in m0 twice
            mock.apply('pointermove').to([[], [], [m0], [m0]])
            expect(g0Spy).toBeCalledTimes(1)
            expect(m0Spy).toBeCalledTimes(1)

            vi.clearAllMocks()
            // NOTE: Move around inside already 'over'd object
            mock.apply('pointermove').to([[m0], [m0], [m0], [m0]])
            expect(g0Spy).toBeCalledTimes(0)
            expect(m0Spy).toBeCalledTimes(0)

            vi.clearAllMocks()
            // NOTE: Move around inside already 'over'd object, leave, move around outside.
            mock.apply('pointermove').to([[m0], [m0], [m0], [], [], [], []])
            expect(g0Spy).toBeCalledTimes(0)
            expect(m0Spy).toBeCalledTimes(0)
          })
        })
        describe('event object', () => {
          vi.clearAllMocks()
          mock.apply('pointermove').to([[], [], [m0], [m0]])
          const g0Event = getLast('pointerover').on(g0)
          const m0Event = getLast('pointerover').on(m0)
          it('has an `object` field containing the intersected object', () => {
            expect('object' in g0Event).toBe(true)
            expect('object' in m0Event).toBe(true)
            expect(g0Event.object.uuid).toBe(m0.uuid)
            expect(m0Event.object.uuid).toBe(m0.uuid)
          })
          it('has an `target` field containing the intersected object', () => {
            expect('target' in g0Event).toBe(true)
            expect('target' in m0Event).toBe(true)
            expect(g0Event.target.uuid).toBe(m0.uuid)
            expect(m0Event.target.uuid).toBe(m0.uuid)
          })
        })
        it('is bubbled every time there is a `pointerover` on an object', () => {
          vi.clearAllMocks()
          mock.apply('pointermove').to([[], [], [m0], [m0]])
          expect(g0Spy).toBeCalledTimes(1)
          expect(m0Spy).toBeCalledTimes(1)

          vi.clearAllMocks()
          mock.apply('pointermove').to([[], [], [m0], [m0]])
          expect(g0Spy).toBeCalledTimes(1)
          expect(m0Spy).toBeCalledTimes(1)

          vi.clearAllMocks()
          mock.apply('pointermove').to([[], [m0], [], [m0], [], [m0]])
          expect(g0Spy).toBeCalledTimes(3)
          expect(m0Spy).toBeCalledTimes(3)
        })
      })

      describe(`with mesh -> mesh`, () => {
        it('is called once for the same "over"', () => {
          const mock = mockTresUsingEventManagerProps()
          const { m0, m1 } = mock.add.DAG('m0 -> m1')
          const m0Spy = vi.fn()
          const m1Spy = vi.fn()
          mock.nodeOps.patchProp(m0, 'onPointerover', undefined, m0Spy)
          mock.nodeOps.patchProp(m1, 'onPointerover', undefined, m1Spy)

          // NOTE: Move over m0 and m1 and move around inside.
          mock.apply('pointermove').to([[m0, m1], [m0, m1], [m1, m0], [m0, m1]])
          // There should be a single `pointerover` call to each on the first 'over'.
          // - 1) m0's `pointerover`, heard by m0
          // - 2) m1's `pointerover`, heard by m1
          // - m1's `pointerover` should try to bubble to m0, but be
          // stopped internally as a duplicate, since m0 already heard
          // `pointerover` for this event.
          expect(m0Spy).toBeCalledTimes(1)
          expect(m1Spy).toBeCalledTimes(1)
        })
      })

      it('is bubbled every time there is a `pointerover` on a child, even if ancestor is still hit', () => {
        const mock = mockTresUsingEventManagerProps()
        const { m0, m1 } = mock.add.DAG('m0 -> m1')
        const m0Spy = vi.fn()
        const m1Spy = vi.fn()
        mock.nodeOps.patchProp(m0, 'onPointerover', undefined, m0Spy)
        mock.nodeOps.patchProp(m1, 'onPointerover', undefined, m1Spy)

        mock.apply('pointermove').to([m0])
        // NOTE: Currently "over" m0.
        // Entering m1 should trigger a `pointerover` that's heard by m1 and bubbled to m0.
        vi.clearAllMocks()
        expect(m0Spy).toBeCalledTimes(0)
        expect(m1Spy).toBeCalledTimes(0)
        mock.apply('pointermove').to([m0, m1])
        expect(m0Spy).toBeCalledTimes(1)
        expect(m1Spy).toBeCalledTimes(1)
        // NOTE: Currently "over" m0 and m1.
        // Move out of m1.
        // This should not trigger a new `pointerover`
        vi.clearAllMocks()
        mock.apply('pointermove').to([m0])
        expect(m0Spy).toBeCalledTimes(0)
        expect(m1Spy).toBeCalledTimes(0)
        // NOTE: Currently "over" m0.
        // Move over of m1.
        // Entering m1 should trigger a `pointerover` that's heard by m1 and bubbled to m0.
        vi.clearAllMocks()
        mock.apply('pointermove').to([m0, m1])
        expect(m0Spy).toBeCalledTimes(1)
        expect(m1Spy).toBeCalledTimes(1)
        // NOTE: Currently "over" m0 and m1.
        // Move out of m0 and m1.
        // This should not trigger `pointerover`.
        vi.clearAllMocks()
        mock.apply('pointermove').to([])
        expect(m0Spy).toBeCalledTimes(0)
        expect(m1Spy).toBeCalledTimes(0)
      })
      describe('pointerover event', () => {
        it('has an `object` field containing the intersected object', () => {
          const mock = mockTresUsingEventManagerProps()
          const { g0, m0 } = mock.add.DAG('g0 -> m0')
          let m0Event: ThreeEvent<PointerEvent> | null = null
          let g0Event: ThreeEvent<PointerEvent> | null = null
          mock.nodeOps.patchProp(m0, 'onPointerover', undefined, (e: ThreeEvent<PointerEvent>) => m0Event = { ...e })
          mock.nodeOps.patchProp(g0, 'onPointerover', undefined, (e: ThreeEvent<PointerEvent>) => g0Event = { ...e })

          mock.apply('pointermove').to([[], [m0]])

          expect(m0Event.object).toBe(m0)
          expect(g0Event.object).toBe(m0)
        })
      })
    })

    describe(`onPointerout(event: TresEvent)`, () => {
      const mock = mockTresUsingEventManagerProps()
      const { g0, m0 } = mock.add.DAG('g0 -> m0')
      let g0Spy = 0
      let m0Spy = 0
      let g0Event: ThreeEvent<PointerEvent> | null = null
      let m0Event: ThreeEvent<PointerEvent> | null = null
      mock.nodeOps.patchProp(g0, 'onPointerout', undefined, (e) => { g0Spy++; g0Event = { ...e } })
      mock.nodeOps.patchProp(m0, 'onPointerout', undefined, (e) => { m0Spy++; m0Event = { ...e } })

      // NOTE: Move pointer inside m0 twice, then nothing twice.
      mock.apply('pointermove').to([[m0], [m0], [], []])

      it('is called once for the same "out"', () => {
        expect(g0Spy).toBe(1)
        expect(m0Spy).toBe(1)
      })
      it('is defined', () => {
        expect(g0Event).toBeDefined()
        expect(m0Event).toBeDefined()
      })
      it('has an `object` field containing the previously intersected object', () => {
        expect('object' in g0Event).toBe(true)
        expect('object' in m0Event).toBe(true)
        expect(g0Event.object.uuid).toBe(m0.uuid)
        expect(m0Event.object.uuid).toBe(m0.uuid)
      })
      it('has a `target` field containing the previously intersected object', () => {
        expect('target' in g0Event).toBe(true)
        expect('target' in m0Event).toBe(true)
        expect(g0Event.target.uuid).toBe(m0.uuid)
        expect(m0Event.target.uuid).toBe(m0.uuid)
      })
      it('is bubbled every time there is a `pointerout` on an object', () => {
        mock.apply('pointermove').to([[m0], [m0], []])
        expect(g0Spy).toBe(2)
        expect(m0Spy).toBe(2)
        mock.apply('pointermove').to([[m0], [m0], []])
        expect(g0Spy).toBe(3)
        expect(m0Spy).toBe(3)
        mock.apply('pointermove').to([[m0], [], [m0], [], [m0], []])
        expect(g0Spy).toBe(6)
        expect(m0Spy).toBe(6)
      })

      it('is called on ancestors when a descendant is left', () => {
        const mock = mockTresUsingEventManagerProps()

        const { g0, g1, m0, m1, m2 } = mock.add.DAG('g0 -> m0 m1; m0 -> g1; g1 -> m2')
        const g0Spies = mock.add.eventsTo(g0)
        const g1Spies = mock.add.eventsTo(g1)

        mock.apply('pointermove').to([m0])
        expect(g0Spies.onPointerout).toBeCalledTimes(0)
        expect(g1Spies.onPointerout).toBeCalledTimes(0)

        mock.apply('pointermove').to([])
        expect(g0Spies.onPointerout).toBeCalledTimes(1)
        expect(getLast('pointerout').on(g0).target).toBe(m0)

        vi.clearAllMocks()
        mock.apply('pointermove').to([m0, m1])
        expect(g0Spies.onPointerout).toBeCalledTimes(0)

        vi.clearAllMocks()
        mock.apply('pointermove').to([m0, m2])
        expect(g0Spies.onPointerout).toBeCalledTimes(1)
        expect(getLast('pointerout').on(g0).target).toBe(m1)

        vi.clearAllMocks()
        mock.apply('pointermove').to([m1, m2])
        expect(g0Spies.onPointerout).toBeCalledTimes(1)
        expect(getLast('pointerout').on(g0).target).toBe(m0)

        vi.clearAllMocks()
        mock.apply('pointermove').to([m0])
        expect(g0Spies.onPointerout).toBeCalledTimes(1)
        expect(getLast('pointerout').on(g0).target).toBe(m1)
      })
    })

    describe(`onPointerleave(event: TresEvent)`, () => {
      const mock = mockTresUsingEventManagerProps()
      const { g0, m0 } = mock.add.DAG('g0 -> m0')
      let g0Spy = 0
      let m0Spy = 0
      let g0Event: ThreeEvent<PointerEvent> | null = null
      let m0Event: ThreeEvent<PointerEvent> | null = null
      mock.nodeOps.patchProp(g0, 'onPointerleave', undefined, (e) => { g0Spy++; g0Event = { ...e } })
      mock.nodeOps.patchProp(m0, 'onPointerleave', undefined, (e) => { m0Spy++; m0Event = { ...e } })

      // NOTE: Move pointer over m0 twice, then nothing twice.
      mock.apply('pointermove').to([[m0], [m0], [], []])

      it('is called once for the same "leave"', () => {
        expect(g0Spy).toBe(1)
        expect(m0Spy).toBe(1)
      })
      it('is defined', () => {
        expect(g0Event).toBeDefined()
        expect(m0Event).toBeDefined()
      })
      it('has an `object` field containing the object the handler was registered on', () => {
        expect(g0Event.object).toBe(g0)
        expect(m0Event.object).toBe(m0)
      })
      it('has a `target` field containing the object the handler was registered on', () => {
        expect(g0Event.target).toBe(g0)
        expect(m0Event.target).toBe(m0)
      })
    })

    describe('pointer{over,out,enter,leave}', () => {
      it('matches number of calls in Vue/DOM if `:blocking="true"`', () => {
        // NOTE:
        // Imagine 3 divs nested like <div><div><div /></div></div>
        //
        // ███████
        // █▒▒▒▒▒█
        // █▒░░░▒█
        // █▒▒▒▒▒█
        // ███████
        //
        // A pointer starts here ...
        //    P
        // ███████
        // █▒▒▒▒▒█
        // █▒░░░▒█
        // █▒▒▒▒▒█
        // ███████
        //
        // ... and ends here
        //
        // ███████
        // █▒▒▒▒▒█
        // █▒░░░▒█
        // █▒▒▒▒▒█
        // ███████
        //    P
        //
        // ... and ends here
        //
        // Vue/DOM:
        // https://play.vuejs.org/#eNp9k01vnDAQhv+K5R7SKtGSpj1tyapttIdWVbdqe/SFwOzGCdiWPSZEiP+esQ27REE5MZ73AR5/9fybMavWA1/z3JVWGmQO0JuNULIx2iLrmYU9G9je6oadEXomlFClVg6Z8s1WIVh2HaD3lx9mwS8oWlgKdu3yCzuPs3aeJR0SoQFCY+oCgUaM5XdXmxvtFbo8ozK2zMZoGVQg+vT9yW0Y8izMZ07VUS5RSXSJ0sE0QVF6kSHrEaFqIiJTyTY8Gfs6d7sWfFI7Pxf8JRG9EhG1XhPBKQFBaSH3OMYepzQqJ6GxHAeN9g7iLBvIs1N8qqcqz2ZbQEOHT3UoKWV9AG+1rcCu2UfTMadrWbF3ZVl+CZEpqkqqw5pdXZoudprCHqQ6Noa43eMX+QVHR4diLw+re6cVncz4A8FL3RhZg90ZlHRoBF+nX4esqGv9+DP20Hq4mPrlHZQPC/1714We4H8sOLAtCH7MkOwAU7z99xs6qo9hoytfE/1G+BdoAXxwTNh3ryrSnnHR9ke8X7Qw/922Q1BumlQQDeQQecHpzt28MfWT7qfV5/gerSgfngEHLks/
        // Pointer events on the OUTERMOST div receive
        // - 5 `pointer{out,over}` calls
        // - 1 `pointer{enter,leave}` calls
        //
        // Tres (blocking=true):
        // Pointer events on the OUTERMOST object receive
        // - 5 `pointer{out,over}` calls
        // - 1 `pointer{enter,leave}` calls

        const mock = mockTresUsingEventManagerProps()
        const { outer, middle, inner } = mock.add.DAG('outer -> middle; middle -> inner')
        const outerSpies = mock.add.eventsTo(outer)
        mock.nodeOps.patchProp(outer, 'blocking', undefined, true)

        mock.apply('pointermove').to([])
        mock.apply('pointermove').to([outer])
        mock.apply('pointermove').to([middle, outer])
        mock.apply('pointermove').to([inner, middle, outer])
        mock.apply('pointermove').to([middle, outer])
        mock.apply('pointermove').to([outer])
        mock.apply('pointermove').to([])

        expect(outerSpies.onPointerover).toBeCalledTimes(5)
        expect(outerSpies.onPointerout).toBeCalledTimes(5)
        expect(outerSpies.onPointerenter).toBeCalledTimes(1)
        expect(outerSpies.onPointerleave).toBeCalledTimes(1)

        mock.apply('pointermove').to([])

        vi.clearAllMocks()

        // NOTE: Same setup as above, but tests between
        // each `pointermove`
        mock.apply('pointermove').to([outer])
        expect(outerSpies.onPointerover).toBeCalledTimes(1)
        expect(outerSpies.onPointerout).toBeCalledTimes(0)
        expect(outerSpies.onPointerenter).toBeCalledTimes(1)
        expect(outerSpies.onPointerleave).toBeCalledTimes(0)
        mock.apply('pointermove').to([middle, outer])
        expect(outerSpies.onPointerover).toBeCalledTimes(2)
        expect(outerSpies.onPointerout).toBeCalledTimes(1)
        expect(outerSpies.onPointerenter).toBeCalledTimes(1)
        expect(outerSpies.onPointerleave).toBeCalledTimes(0)
        mock.apply('pointermove').to([inner, middle, outer])
        expect(outerSpies.onPointerover).toBeCalledTimes(3)
        expect(outerSpies.onPointerout).toBeCalledTimes(2)
        expect(outerSpies.onPointerenter).toBeCalledTimes(1)
        expect(outerSpies.onPointerleave).toBeCalledTimes(0)
        mock.apply('pointermove').to([middle, outer])
        expect(outerSpies.onPointerover).toBeCalledTimes(4)
        expect(outerSpies.onPointerout).toBeCalledTimes(3)
        expect(outerSpies.onPointerenter).toBeCalledTimes(1)
        expect(outerSpies.onPointerleave).toBeCalledTimes(0)
        mock.apply('pointermove').to([outer])
        expect(outerSpies.onPointerover).toBeCalledTimes(5)
        expect(outerSpies.onPointerout).toBeCalledTimes(4)
        expect(outerSpies.onPointerenter).toBeCalledTimes(1)
        expect(outerSpies.onPointerleave).toBeCalledTimes(0)
        mock.apply('pointermove').to([])
        expect(outerSpies.onPointerover).toBeCalledTimes(5)
        expect(outerSpies.onPointerout).toBeCalledTimes(5)
        expect(outerSpies.onPointerenter).toBeCalledTimes(1)
        expect(outerSpies.onPointerleave).toBeCalledTimes(1)
      })
      it('has fewer `over/out`, same `enter/leave` calls as Vue/DOM if `!blocking`', () => {
        // NOTE:
        // Imagine 3 divs nested like <div><div><div /></div></div>
        //
        // ███████
        // █▒▒▒▒▒█
        // █▒░░░▒█
        // █▒▒▒▒▒█
        // ███████
        //
        // A pointer starts here ...
        //    P
        // ███████
        // █▒▒▒▒▒█
        // █▒░░░▒█
        // █▒▒▒▒▒█
        // ███████
        //
        // ... and ends here
        //
        // ███████
        // █▒▒▒▒▒█
        // █▒░░░▒█
        // █▒▒▒▒▒█
        // ███████
        //    P
        //
        // Vue/DOM:
        // https://play.vuejs.org/#eNp9k01vnDAQhv+K5R7SKtGSpj1tyapttIdWVbdqe/SFwOzGCdiWPSZEiP+esQ27REE5MZ73AR5/9fybMavWA1/z3JVWGmQO0JuNULIx2iLrmYU9G9je6oadEXomlFClVg6Z8s1WIVh2HaD3lx9mwS8oWlgKdu3yCzuPs3aeJR0SoQFCY+oCgUaM5XdXmxvtFbo8ozK2zMZoGVQg+vT9yW0Y8izMZ07VUS5RSXSJ0sE0QVF6kSHrEaFqIiJTyTY8Gfs6d7sWfFI7Pxf8JRG9EhG1XhPBKQFBaSH3OMYepzQqJ6GxHAeN9g7iLBvIs1N8qqcqz2ZbQEOHT3UoKWV9AG+1rcCu2UfTMadrWbF3ZVl+CZEpqkqqw5pdXZoudprCHqQ6Noa43eMX+QVHR4diLw+re6cVncz4A8FL3RhZg90ZlHRoBF+nX4esqGv9+DP20Hq4mPrlHZQPC/1714We4H8sOLAtCH7MkOwAU7z99xs6qo9hoytfE/1G+BdoAXxwTNh3ryrSnnHR9ke8X7Qw/922Q1BumlQQDeQQecHpzt28MfWT7qfV5/gerSgfngEHLks/
        // Pointer events on the OUTERMOST div receive
        // - 5 `pointer{out,over}` calls
        // - 1 `pointer{enter,leave}` calls
        //
        // Tres (!blocking)
        // Pointer events on the OUTERMOST object receives
        // - 3 `pointer{out,over}` calls
        // - 1 `pointer{enter,leave}` calls

        const mock = mockTresUsingEventManagerProps()
        const { outer, middle, inner } = mock.add.DAG('outer -> middle; middle -> inner')
        const outerSpies = mock.add.eventsTo(outer)

        mock.apply('pointermove').to([])
        mock.apply('pointermove').to([outer])
        mock.apply('pointermove').to([middle, outer])
        mock.apply('pointermove').to([inner, middle, outer])
        mock.apply('pointermove').to([middle, outer])
        mock.apply('pointermove').to([outer])
        mock.apply('pointermove').to([])

        expect(outerSpies.onPointerover).toBeCalledTimes(3)
        expect(outerSpies.onPointerout).toBeCalledTimes(3)
        expect(outerSpies.onPointerenter).toBeCalledTimes(1)
        expect(outerSpies.onPointerleave).toBeCalledTimes(1)

        mock.apply('pointermove').to([])

        vi.clearAllMocks()

        // NOTE: Same setup as above, but tests between
        // each `pointermove`
        mock.apply('pointermove').to([outer])
        expect(outerSpies.onPointerover).toBeCalledTimes(1)
        expect(outerSpies.onPointerout).toBeCalledTimes(0)
        expect(outerSpies.onPointerenter).toBeCalledTimes(1)
        expect(outerSpies.onPointerleave).toBeCalledTimes(0)
        mock.apply('pointermove').to([middle, outer])
        expect(outerSpies.onPointerover).toBeCalledTimes(2)
        expect(outerSpies.onPointerout).toBeCalledTimes(0)
        expect(outerSpies.onPointerenter).toBeCalledTimes(1)
        expect(outerSpies.onPointerleave).toBeCalledTimes(0)
        mock.apply('pointermove').to([inner, middle, outer])
        expect(outerSpies.onPointerover).toBeCalledTimes(3)
        expect(outerSpies.onPointerout).toBeCalledTimes(0)
        expect(outerSpies.onPointerenter).toBeCalledTimes(1)
        expect(outerSpies.onPointerleave).toBeCalledTimes(0)
        mock.apply('pointermove').to([middle, outer])
        expect(outerSpies.onPointerover).toBeCalledTimes(3)
        expect(outerSpies.onPointerout).toBeCalledTimes(1)
        expect(outerSpies.onPointerenter).toBeCalledTimes(1)
        expect(outerSpies.onPointerleave).toBeCalledTimes(0)
        mock.apply('pointermove').to([outer])
        expect(outerSpies.onPointerover).toBeCalledTimes(3)
        expect(outerSpies.onPointerout).toBeCalledTimes(2)
        expect(outerSpies.onPointerenter).toBeCalledTimes(1)
        expect(outerSpies.onPointerleave).toBeCalledTimes(0)
        mock.apply('pointermove').to([])
        expect(outerSpies.onPointerover).toBeCalledTimes(3)
        expect(outerSpies.onPointerout).toBeCalledTimes(3)
        expect(outerSpies.onPointerenter).toBeCalledTimes(1)
        expect(outerSpies.onPointerleave).toBeCalledTimes(1)
      })
    })
  })

  describe('special cases', () => {
    describe(':blocking="true"', () => {
      it('stops objects "behind" :blocking objects from receiving `click`, `wheel`, `pointermove`, when `true`', () => {
        const mock = mockTresUsingEventManagerProps()
        const { mFront, mBehind } = mock.add.DAG('mFront; mBehind')
        const mFrontSpies = mock.add.eventsTo(mFront)
        const mBehindSpies = mock.add.eventsTo(mBehind)

        mock.nodeOps.patchProp(mFront, 'blocking', undefined, true)

        mock.apply('wheel').to([mFront, mBehind])
        expect(mBehindSpies.onWheel).toBeCalledTimes(0)
        expect(mFrontSpies.onWheel).toBeCalledTimes(1)

        mock.apply('pointermove').to([mFront, mBehind])
        expect(mBehindSpies.onPointermove).toBeCalledTimes(0)
        expect(mFrontSpies.onPointermove).toBeCalledTimes(1)

        mock.apply('click').to([mFront, mBehind])
        expect(mBehindSpies.onClick).toBeCalledTimes(0)
        expect(mFrontSpies.onClick).toBeCalledTimes(1)
      })
      it('bubbles events to parents (as normal) when `true`', () => {
        const mock = mockTresUsingEventManagerProps()
        const { g, mFront, mBehind } = mock.add.DAG('g -> mFront; mBehind')
        const gSpies = mock.add.eventsTo(g)

        mock.nodeOps.patchProp(mFront, 'blocking', undefined, true)

        mock.apply('wheel').to([mFront, mBehind])
        expect(gSpies.onWheel).toBeCalledTimes(1)

        mock.apply('pointermove').to([mFront, mBehind])
        expect(gSpies.onPointermove).toBeCalledTimes(1)

        mock.apply('click').to([mFront, mBehind])
        expect(gSpies.onClick).toBeCalledTimes(1)
      })
      it('restores normal "non-blocking" behavior when `false`', () => {
        const mock = mockTresUsingEventManagerProps()
        const { mFront, mBehind } = mock.add.DAG('mFront; mBehind')
        const mFrontSpies = mock.add.eventsTo(mFront)
        const mBehindSpies = mock.add.eventsTo(mBehind)

        mock.nodeOps.patchProp(mFront, 'blocking', undefined, true)

        mock.apply('wheel').to([mFront, mBehind])
        expect(mBehindSpies.onWheel).toBeCalledTimes(0)
        expect(mFrontSpies.onWheel).toBeCalledTimes(1)

        mock.apply('pointermove').to([mFront, mBehind])
        expect(mBehindSpies.onPointermove).toBeCalledTimes(0)
        expect(mFrontSpies.onPointermove).toBeCalledTimes(1)

        mock.apply('click').to([mFront, mBehind])
        expect(mBehindSpies.onClick).toBeCalledTimes(0)
        expect(mFrontSpies.onClick).toBeCalledTimes(1)

        mock.nodeOps.patchProp(mFront, 'blocking', undefined, false)

        vi.clearAllMocks()
        mock.apply('wheel').to([mFront, mBehind])
        expect(mBehindSpies.onWheel).toBeCalledTimes(1)
        expect(mFrontSpies.onWheel).toBeCalledTimes(1)

        mock.apply('pointermove').to([mFront, mBehind])
        expect(mBehindSpies.onPointermove).toBeCalledTimes(1)
        expect(mFrontSpies.onPointermove).toBeCalledTimes(1)

        mock.apply('click').to([mFront, mBehind])
        expect(mBehindSpies.onClick).toBeCalledTimes(1)
        expect(mFrontSpies.onClick).toBeCalledTimes(1)
      })
      it('calls @pointerleave on objects no longer receiving the pointer event after a new pointer event, even if they are still intersected', () => {
        const mock = mockTresUsingEventManagerProps()
        const { mFront, mBehind } = mock.add.DAG('mFront; mBehind')
        const mFrontSpies = mock.add.eventsTo(mFront)
        const mBehindSpies = mock.add.eventsTo(mBehind)

        mock.apply('pointermove').to([mBehind])
        expect(mBehindSpies.onPointerover).toBeCalledTimes(1)
        expect(mBehindSpies.onPointerleave).toBeCalledTimes(0)
        // NOTE: `mFrontStops` is ahead of `mBehind` and should
        // get the event, blocking `mBehind` and triggering a `pointerleave`.
        mock.nodeOps.patchProp(mFront, 'blocking', undefined, true)
        mock.apply('pointermove').to([mFront, mBehind])
        expect(mBehindSpies.onPointerleave).toBeCalledTimes(1)
        expect(mFrontSpies.onPointerover).toBeCalledTimes(1)
      })
    })
    describe('when removing an object', () => {
      describe('pointerout', () => {
        it('is called if the object removed was under the pointer', () => {
          const mock = mockTresUsingEventManagerProps()
          const { m0 } = mock.add.DAG('m0')
          const m0Spies = mock.add.eventsTo(m0)
          const { remove } = mock.context.eventManager

          mock.apply('pointerout').to([m0])

          expect(m0Spies.onPointerenter).toBeCalledTimes(1)
          remove(m0)
          expect(m0Spies.onPointerleave).toBeCalledTimes(1)
        })

        it('bubbles to ancestors', () => {
          const mock = mockTresUsingEventManagerProps()
          const { remove } = mock.context.eventManager

          const { g0, m0, m1, m2 } = mock.add.DAG('g0 -> m0 m1; m1 -> m2')

          const g0Spies = mock.add.eventsTo(g0)
          const m0Spies = mock.add.eventsTo(m0)
          const m1Spies = mock.add.eventsTo(m1)
          const m2Spies = mock.add.eventsTo(m2)

          mock.apply('pointermove').to([m0, m2])

          expect(g0Spies.onPointerenter).toBeCalledTimes(1)
          expect(m0Spies.onPointerenter).toBeCalledTimes(1)
          expect(m1Spies.onPointerenter).toBeCalledTimes(1)
          expect(m2Spies.onPointerenter).toBeCalledTimes(1)

          remove(m0)

          expect(g0Spies.onPointerout).toBeCalledTimes(1)
          expect(m0Spies.onPointerout).toBeCalledTimes(1)
          expect(m1Spies.onPointerout).toBeCalledTimes(0)
          expect(m2Spies.onPointerout).toBeCalledTimes(0)

          vi.clearAllMocks()
          remove(m2)

          expect(g0Spies.onPointerout).toBeCalledTimes(1)
          expect(m0Spies.onPointerout).toBeCalledTimes(0)
          expect(m1Spies.onPointerout).toBeCalledTimes(1)
          expect(m2Spies.onPointerout).toBeCalledTimes(1)
        })
      })
      describe('pointerleave', () => {
        it('is called if the object removed was under the pointer', () => {
          const mock = mockTresUsingEventManagerProps()
          const { m0 } = mock.add.DAG('m0')
          const m0Spies = mock.add.eventsTo(m0)
          const { remove } = mock.context.eventManager

          mock.apply('pointermove').to([m0])

          expect(m0Spies.onPointerenter).toBeCalledTimes(1)
          remove(m0)
          expect(m0Spies.onPointerleave).toBeCalledTimes(1)
        })

        it('is called on ancestors, if they are no longer under the pointer', () => {
          const mock = mockTresUsingEventManagerProps()
          const { remove } = mock.context.eventManager

          const { g0, m0, m1, m2 } = mock.add.DAG('g0 -> m0 m1; m1 -> m2')

          const g0Spies = mock.add.eventsTo(g0)
          const m0Spies = mock.add.eventsTo(m0)
          const m1Spies = mock.add.eventsTo(m1)
          const m2Spies = mock.add.eventsTo(m2)

          mock.apply('pointermove').to([m0, m2])

          expect(g0Spies.onPointerenter).toBeCalledTimes(1)
          expect(m0Spies.onPointerenter).toBeCalledTimes(1)
          expect(m1Spies.onPointerenter).toBeCalledTimes(1)
          expect(m2Spies.onPointerenter).toBeCalledTimes(1)

          remove(m0)

          expect(g0Spies.onPointerleave).toBeCalledTimes(0)
          expect(m0Spies.onPointerleave).toBeCalledTimes(1)
          expect(m1Spies.onPointerleave).toBeCalledTimes(0)
          expect(m2Spies.onPointerleave).toBeCalledTimes(0)

          vi.clearAllMocks()
          remove(m2)

          expect(g0Spies.onPointerleave).toBeCalledTimes(1)
          expect(m0Spies.onPointerleave).toBeCalledTimes(0)
          expect(m1Spies.onPointerleave).toBeCalledTimes(1)
          expect(m2Spies.onPointerleave).toBeCalledTimes(1)
        })
      })
    })
    describe('when `pointerleave`s domElement', () => {
      describe('intersections', () => {
        it('are dropped', () => {
          const mock = mockTresUsingEventManagerProps()
          const { g, m2 } = mock.add.DAG('g -> m0 m1; m1 -> m2')
          mock.add.eventsTo(g)
          mock.context.eventManager.connect(mock.canvas)

          mock.apply('pointermove').to([m2])
          expect(mock.context.eventManager.config.priorIntersections.length).toBe(1)
          mock.canvas._call('pointerleave', mockEvt('pointerleave'))
          expect(mock.context.eventManager.config.priorIntersections.length).toBe(0)
        })
      })
      describe('pointerleave', () => {
        it('is called where appropiate', () => {
          const mock = mockTresUsingEventManagerProps()
          const { g, m2 } = mock.add.DAG('g -> m0 m1; m1 -> m2')
          mock.add.eventsTo(g)
          mock.context.eventManager.connect(mock.canvas)

          mock.apply('pointermove').to([m2])
          expect(getLast('pointerleave').on(g)).toBeNull()
          expect(getLast('pointerleave').on(m2)).toBeNull()
          mock.canvas._call('pointerleave', mockEvt('pointerleave'))
          expect(getLast('pointerleave').on(g)).toBeDefined()
          expect(getLast('pointerleave').on(m2)).toBeDefined()
        })
      })
      describe('pointerout', () => {
        it('is called where appropiate', () => {
          const mock = mockTresUsingEventManagerProps()
          const { g, m2 } = mock.add.DAG('g -> m0 m1; m1 -> m2')
          mock.add.eventsTo(g)
          mock.context.eventManager.connect(mock.canvas)

          mock.apply('pointermove').to([m2])
          expect(getLast('pointerleave').on(g)).toBeNull()
          mock.canvas._call('pointerleave', mockEvt('pointerleave'))
          expect(getLast('pointerout').on(g)).toBeDefined()
          expect(getLast('pointerout').on(g).target).toBe(m2)
        })
      })
    })
  })
  describe('{set,release,lost}pointercapture', () => {
    const POINTER_ID = mockEvt('pointerdown').pointerId
    describe('object.setPointerCapture(pointerId) in event handler', () => {
      it('calls `setPointerCapture(pointerId)` on `eventManager`\'s DOM Element', () => {
        const mock = mockTresUsingEventManagerProps()
        const { m } = mock.add.DAG('m')
        mock.nodeOps.patchProp(m, 'onPointerdown', undefined, (e) => {
          e.eventObject.setPointerCapture(e.pointerId)
        })

        expect(mock.canvas.hasPointerCapture(POINTER_ID)).toBe(false)
        mock.apply('pointerdown').to([m])
        expect(mock.canvas.hasPointerCapture(POINTER_ID)).toBe(true)
      })
    })
    describe('when a pointer is captured', () => {
      it('adds the captured object intersection to the end of `event.intersections` if it was not otherwise hit', () => {
        const mock = mockTresUsingEventManagerProps()
        const { m, n, o, p } = mock.add.DAG('m; n; o; p')
        mock.add.eventsTo(m)
        mock.add.eventsTo(n)
        mock.add.eventsTo(o)
        mock.add.eventsTo(p)
        mock.nodeOps.patchProp(m, 'onPointerdown', undefined, (e) => {
          e.eventObject.setPointerCapture(e.pointerId)
        })
        mock.nodeOps.patchProp(p, 'onPointermove', undefined, (e) => {
          e.eventObject.setPointerCapture(e.pointerId)
        })

        mock.apply('pointerdown').to([m])
        mock.apply('pointermove').to([n])
        expect(getLast('pointermove').on(n).intersections.map(intr => intr.eventObject.name).join('')).toBe('nm')

        mock.apply('pointermove').to([n, o])
        expect(getLast('pointermove').on(n).intersections.map(intr => intr.eventObject.name).join('')).toBe('nom')

        // NOTE: This adds p to pointer capture
        mock.apply('pointermove').to([n, p])
        expect(getLast('pointermove').on(n).intersections.map(intr => intr.eventObject.name).join('')).toBe('npm')

        mock.apply('pointermove').to([n, o, m, p])
        expect(getLast('pointermove').on(n).intersections.map(intr => intr.eventObject.name).join('')).toBe('nomp')

        mock.apply('pointermove').to([o])
        expect(getLast('pointermove').on(o).intersections.map(intr => intr.eventObject.name).join('')).toBe('omp')
      })
      it('calls object\'s event handlers, if they exist, even if the object is not hit', () => {
        const mock = mockTresUsingEventManagerProps()
        const { g, m } = mock.add.DAG('g -> m')
        mock.add.eventsTo(g)
        mock.add.eventsTo(m)
        mock.nodeOps.patchProp(m, 'onPointerdown', undefined, (e) => {
          e.eventObject.setPointerCapture(e.pointerId)
        })

        mock.apply('pointerdown').to([m])

        expect(getLast('pointermove').on(g)).toBeNull()
        expect(getLast('pointermove').on(m)).toBeNull()
        mock.apply('pointermove').to([])
        expect(getLast('pointermove').on(g)).not.toBeNull()
        expect(getLast('pointermove').on(m)).not.toBeNull()
      })
      it('calls object\'s event handlers, if they exist, even if `stopPropagation` is called', () => {
        const mock = mockTresUsingEventManagerProps()
        const { m, n, o } = mock.add.DAG('m; n; o')
        mock.add.eventsTo(m)
        mock.add.eventsTo(n)
        mock.nodeOps.patchProp(m, 'onPointerdown', undefined, (e) => {
          e.eventObject.setPointerCapture(e.pointerId)
        })
        mock.nodeOps.patchProp(n, 'onPointerdown', undefined, (e) => {
          e.eventObject.setPointerCapture(e.pointerId)
        })
        mock.nodeOps.patchProp(o, 'onPointermove', undefined, (e) => {
          e.stopPropagation()
        })

        mock.apply('pointerdown').to([m, n])

        expect(getLast('pointermove').on(m)).toBeNull()
        expect(getLast('pointermove').on(n)).toBeNull()
        mock.apply('pointermove').to([o])
        expect(getLast('pointermove').on(m)).not.toBeNull()
        expect(getLast('pointermove').on(n)).not.toBeNull()
      })
      it('calls object\'s event handlers, if they exist, even if objects are `:blocking`', () => {
        const mock = mockTresUsingEventManagerProps()
        const { g, m, n, o } = mock.add.DAG('g -> m; g -> n; g -> o')
        mock.add.eventsTo(m)
        mock.add.eventsTo(n)
        mock.nodeOps.patchProp(g, 'blocking', undefined, true)

        const capture = (e) => { e.eventObject.setPointerCapture(e.pointerId) }
        mock.nodeOps.patchProp(m, 'onPointerdown', undefined, capture)
        mock.nodeOps.patchProp(n, 'onPointerdown', undefined, capture)

        // NOTE: m and n capture pointer here.
        mock.apply('pointerdown').to([m])
        mock.apply('pointerdown').to([n])

        expect(getLast('pointermove').on(m)).toBeNull()
        expect(getLast('pointermove').on(n)).toBeNull()
        mock.apply('pointermove').to([o])
        expect(getLast('pointermove').on(m)).not.toBeNull()
        expect(getLast('pointermove').on(n)).not.toBeNull()
      })
      it('bubbles events from captured objects', () => {
        const mock = mockTresUsingEventManagerProps()
        const { m, n, o } = mock.add.DAG('m -> n; n -> o')
        mock.add.eventsTo(m)
        mock.add.eventsTo(n)
        mock.add.eventsTo(o)
        mock.nodeOps.patchProp(o, 'onPointerdown', undefined, (e) => {
          e.eventObject.setPointerCapture(e.pointerId)
        })

        mock.apply('pointerdown').to([o])

        expect(getLast('pointermove').on(m)).toBeNull()
        expect(getLast('pointermove').on(n)).toBeNull()
        mock.apply('pointermove').to([])
        expect(getLast('pointermove').on(m)).not.toBeNull()
        expect(getLast('pointermove').on(n)).not.toBeNull()

        expect(getLast('contextmenu').on(m)).toBeNull()
        expect(getLast('contextmenu').on(n)).toBeNull()
        mock.apply('contextmenu').to([])
        expect(getLast('contextmenu').on(m)).not.toBeNull()
        expect(getLast('contextmenu').on(n)).not.toBeNull()
      })
      it('calls pointer{over,out,enter,leave}', () => {
        const mock = mockTresUsingEventManagerProps()
        const { g, m, n, o } = mock.add.DAG('g -> m; n; o')
        mock.add.eventsTo(g)
        mock.add.eventsTo(m)
        mock.add.eventsTo(n)
        mock.add.eventsTo(o)
        mock.nodeOps.patchProp(m, 'onPointerdown', undefined, (e) => {
          e.eventObject.setPointerCapture(e.pointerId)
        })

        mock.apply('pointerdown').to([m])
      })
    })
    describe('object.releasePointerCapture(pointerId)', () => {
      it('calls `releasePointerCapture(pointerId)` on `eventManager`\'s DOM Element if there are no remaining captures', () => {
        const mock = mockTresUsingEventManagerProps()
        const { m, n } = mock.add.DAG('m; n')
        mock.nodeOps.patchProp(m, 'onPointerdown', undefined, (e) => {
          e.eventObject.setPointerCapture(e.pointerId)
        })
        mock.nodeOps.patchProp(m, 'onPointermove', undefined, (e) => {
          e.eventObject.releasePointerCapture(e.pointerId)
        })

        let COUNT_UNTIL_RELEASE = 5
        mock.nodeOps.patchProp(n, 'onPointerdown', undefined, (e) => {
          e.eventObject.setPointerCapture(e.pointerId)
        })
        mock.nodeOps.patchProp(n, 'onPointermove', undefined, (e) => {
          if (COUNT_UNTIL_RELEASE-- <= 0) {
            e.eventObject.releasePointerCapture(e.pointerId)
          }
        })

        mock.apply('pointerdown').to([m, n])
        expect(mock.canvas.hasPointerCapture(POINTER_ID)).toBe(true)

        mock.apply('pointermove').to([m, n])
        expect(mock.canvas.hasPointerCapture(POINTER_ID)).toBe(true)

        mock.apply('pointermove').to([m, n])
        mock.apply('pointermove').to([m, n])
        mock.apply('pointermove').to([m, n])
        mock.apply('pointermove').to([m, n])
        mock.apply('pointermove').to([m, n])
        expect(mock.canvas.hasPointerCapture(POINTER_ID)).toBe(false)
      })
      it('does not call `releasePointerCapture(pointerId)` on `eventManager`\'s DOM Element if there are remaining captures', () => {
        const mock = mockTresUsingEventManagerProps()
        interface PointerCapture {
          setPointerCapture: (id: number) => void
          releasePointerCapture: (id: number) => void
          hasPointerCapture: (id: number) => void
        }
        const { m, n } = mock.add.DAG('m; n') as Record<string, TresObject & Object3D & PointerCapture>

        let OBJECTS_TO_CAPTURE = [m, n] as (Object3D & { setPointerCapture?: (id: number) => void })[]
        let OBJECTS_TO_RELEASE = [] as (Object3D & { releasePointerCapture?: (id: number) => void })[]

        const down = (e) => {
          e.eventObject.setPointerCapture(e.pointerId)
        }

        const move = (e) => {
          for (const o of OBJECTS_TO_CAPTURE) {
            o.setPointerCapture(e.pointerId)
          }
          for (const o of OBJECTS_TO_RELEASE) {
            o.releasePointerCapture(e.pointerId)
          }
        }

        mock.nodeOps.patchProp(m, 'onPointerdown', undefined, down)
        mock.nodeOps.patchProp(n, 'onPointerdown', undefined, down)
        mock.nodeOps.patchProp(m, 'onPointermove', undefined, move)
        mock.nodeOps.patchProp(n, 'onPointermove', undefined, move)

        mock.apply('pointerdown').to([m, n])
        expect(mock.canvas.hasPointerCapture(POINTER_ID)).toBe(true)
        expect(m.hasPointerCapture(POINTER_ID)).toBe(true)
        expect(n.hasPointerCapture(POINTER_ID)).toBe(true)
        expect(mock.canvas.hasPointerCapture(POINTER_ID)).toBe(true)

        mock.apply('pointermove').to([])
        expect(m.hasPointerCapture(POINTER_ID)).toBe(true)
        expect(n.hasPointerCapture(POINTER_ID)).toBe(true)
        expect(mock.canvas.hasPointerCapture(POINTER_ID)).toBe(true)

        OBJECTS_TO_RELEASE = [m]
        OBJECTS_TO_CAPTURE = [n]
        mock.apply('pointermove').to([])
        expect(m.hasPointerCapture(POINTER_ID)).toBe(false)
        expect(n.hasPointerCapture(POINTER_ID)).toBe(true)
        expect(mock.canvas.hasPointerCapture(POINTER_ID)).toBe(true)

        OBJECTS_TO_RELEASE = [m]
        OBJECTS_TO_CAPTURE = []
        mock.apply('pointermove').to([])
        expect(m.hasPointerCapture(POINTER_ID)).toBe(false)
        expect(n.hasPointerCapture(POINTER_ID)).toBe(true)
        expect(mock.canvas.hasPointerCapture(POINTER_ID)).toBe(true)

        OBJECTS_TO_RELEASE = [n]
        OBJECTS_TO_CAPTURE = [m]
        mock.apply('pointermove').to([])
        expect(m.hasPointerCapture(POINTER_ID)).toBe(true)
        expect(n.hasPointerCapture(POINTER_ID)).toBe(false)
        expect(mock.canvas.hasPointerCapture(POINTER_ID)).toBe(true)

        OBJECTS_TO_RELEASE = [m]
        OBJECTS_TO_CAPTURE = [n]
        mock.apply('pointermove').to([n])
        expect(m.hasPointerCapture(POINTER_ID)).toBe(false)
        expect(n.hasPointerCapture(POINTER_ID)).toBe(true)
        expect(mock.canvas.hasPointerCapture(POINTER_ID)).toBe(true)

        OBJECTS_TO_RELEASE = []
        OBJECTS_TO_CAPTURE = [m]
        mock.apply('pointermove').to([])
        expect(m.hasPointerCapture(POINTER_ID)).toBe(true)
        expect(n.hasPointerCapture(POINTER_ID)).toBe(true)
        expect(mock.canvas.hasPointerCapture(POINTER_ID)).toBe(true)

        OBJECTS_TO_RELEASE = [m]
        OBJECTS_TO_CAPTURE = [n]
        mock.apply('pointermove').to([])
        expect(m.hasPointerCapture(POINTER_ID)).toBe(false)
        expect(n.hasPointerCapture(POINTER_ID)).toBe(true)
        expect(mock.canvas.hasPointerCapture(POINTER_ID)).toBe(true)

        OBJECTS_TO_RELEASE = [n]
        OBJECTS_TO_CAPTURE = []
        mock.apply('pointermove').to([])
        expect(mock.canvas.hasPointerCapture(POINTER_ID)).toBe(false)
      })
      describe('pointerup', () => {
        it('releases a single pointer capture', () => {
          const mock = mockTresUsingEventManagerProps()
          const { m } = mock.add.DAG('m')
          mock.nodeOps.patchProp(m, 'onPointerdown', undefined, (e) => {
            e.eventObject.setPointerCapture(e.pointerId)
          })

          mock.apply('pointerdown').to([m])
          expect(mock.canvas.hasPointerCapture(POINTER_ID)).toBe(true)
          mock.apply('pointerup').to([])
          expect(mock.canvas.hasPointerCapture(POINTER_ID)).toBe(false)
        })
        it('releases all pointer captures for a pointerId', () => {
          const mock = mockTresUsingEventManagerProps()
          const { m, n, o, p } = mock.add.DAG('m; n; o; p')
          function down(e) { e.eventObject.setPointerCapture(e.pointerId) }
          mock.nodeOps.patchProp(m, 'onPointerdown', undefined, down)
          mock.nodeOps.patchProp(n, 'onPointerdown', undefined, down)
          mock.nodeOps.patchProp(o, 'onPointerdown', undefined, down)
          mock.nodeOps.patchProp(p, 'onPointerdown', undefined, down)

          const POINTER_ID_A = 10
          const eventA = mockEvt('pointerdown', { pointerId: POINTER_ID_A, currentTarget: mock.canvas }) as any
          mock.apply(eventA).to([m, n, o, p])
          expect(mock.canvas.hasPointerCapture(eventA.pointerId)).toBe(true)

          const POINTER_ID_B = 99
          const eventB = mockEvt('pointerdown', { pointerId: POINTER_ID_B, currentTarget: mock.canvas }) as any
          mock.apply(eventB).to([m])
          expect(mock.canvas.hasPointerCapture(eventB.pointerId)).toBe(true)

          eventB.type = 'pointerup'
          mock.apply(eventB).to([])
          expect(mock.canvas.hasPointerCapture(eventB.pointerId)).toBe(false)

          expect(mock.canvas.hasPointerCapture(eventA.pointerId)).toBe(true)
          eventA.type = 'pointerup'
          mock.apply(eventA).to([m, n, o, p])
          expect(mock.canvas.hasPointerCapture(eventA.pointerId)).toBe(false)
        })
      })
      describe('pointercancel', () => {
        it('releases a single pointer capture', () => {
          const mock = mockTresUsingEventManagerProps()
          const { m } = mock.add.DAG('m')
          mock.nodeOps.patchProp(m, 'onPointerdown', undefined, (e) => {
            e.eventObject.setPointerCapture(e.pointerId)
          })

          mock.apply('pointerdown').to([m])
          expect(mock.canvas.hasPointerCapture(POINTER_ID)).toBe(true)
          mock.apply('pointercancel').to([])
          expect(mock.canvas.hasPointerCapture(POINTER_ID)).toBe(false)
        })
        it('releases all pointer captures', () => {
          const mock = mockTresUsingEventManagerProps()
          const { m, n, o, p } = mock.add.DAG('m; n; o; p')
          function down(e) { e.eventObject.setPointerCapture(e.pointerId) }
          mock.nodeOps.patchProp(m, 'onPointerdown', undefined, down)
          mock.nodeOps.patchProp(n, 'onPointerdown', undefined, down)
          mock.nodeOps.patchProp(o, 'onPointerdown', undefined, down)
          mock.nodeOps.patchProp(p, 'onPointerdown', undefined, down)

          const POINTER_ID_A = 10
          const eventA = mockEvt('pointerdown', { pointerId: POINTER_ID_A, currentTarget: mock.canvas }) as any
          mock.apply(eventA).to([m, n, o, p])
          expect(mock.canvas.hasPointerCapture(eventA.pointerId)).toBe(true)

          const POINTER_ID_B = 99
          const eventB = mockEvt('pointerdown', { pointerId: POINTER_ID_B, currentTarget: mock.canvas }) as any
          mock.apply(eventB).to([m])
          expect(mock.canvas.hasPointerCapture(eventB.pointerId)).toBe(true)

          eventB.type = 'pointercancel'
          mock.apply(eventB).to([])
          expect(mock.canvas.hasPointerCapture(eventB.pointerId)).toBe(false)

          expect(mock.canvas.hasPointerCapture(eventA.pointerId)).toBe(true)
          eventA.type = 'pointercancel'
          mock.apply(eventA).to([m, n, o, p])
          expect(mock.canvas.hasPointerCapture(eventA.pointerId)).toBe(false)
        })
      })
    })
    describe('lostpointercapture', () => {
      it('exists', () => {
        const mock = mockTresUsingEventManagerProps()
        const { m } = mock.add.DAG('m')
        mock.add.eventsTo(m)
        expect('onLostpointercapture' in m).toBe(true)
      })
      it('is called when releasing the pointer via `e.target.releasePointerCapture`', () => {
        const mock = mockTresUsingEventManagerProps()
        const { m } = mock.add.DAG('m')
        mock.add.eventsTo(m)
        mock.nodeOps.patchProp(m, 'onPointerdown', undefined, (e) => {
          e.eventObject.setPointerCapture(e.pointerId)
          e.target.releasePointerCapture(e.pointerId)
        })
        mock.apply('pointerdown').to([m])
        expect(getLast('lostpointercapture').on(m)).toBeDefined()
      })
      it('is called when releasing the pointer via `pointercancel`', () => {
        const mock = mockTresUsingEventManagerProps()
        const { m } = mock.add.DAG('m')
        mock.add.eventsTo(m)
        mock.nodeOps.patchProp(m, 'onPointerdown', undefined, (e) => {
          e.eventObject.setPointerCapture(e.pointerId)
        })

        mock.apply('pointerdown').to([m])
        expect(getLast('lostpointercapture').on(m)).toBeNull()
        mock.apply('pointercancel').to([])
        expect(getLast('lostpointercapture').on(m)).not.toBeNull()
      })
      it('is called with an object having the expected fields', () => {
        const mock = mockTresUsingEventManagerProps()
        const { m } = mock.add.DAG('m')
        mock.add.eventsTo(m)
        mock.nodeOps.patchProp(m, 'onPointerdown', undefined, (e) => {
          e.eventObject.setPointerCapture(e.pointerId)
        })
        let event = null
        mock.nodeOps.patchProp(m, 'onLostpointercapture', undefined, (e) => {
          event = { ...e }
        })
        mock.apply('pointerdown').to([m])
        expect(getLast('lostpointercapture').on(m)).toBeNull()
        mock.apply('pointercancel').to([])

        expect(event.type).toBe('lostpointercapture')
        expect(event.eventObject).toBe(m)
        expect(event.object).toBe(m)
        expect(event.currentTarget).toBe(m)
        expect(event.target).toBe(m)
      })
      it('is not called on objects that don\'t have the pointer capture', () => {
        const mock = mockTresUsingEventManagerProps()
        const { g, m, n } = mock.add.DAG('g -> m; n')
        mock.add.eventsTo(g)
        mock.add.eventsTo(m)
        mock.add.eventsTo(n)
        mock.nodeOps.patchProp(m, 'onPointerdown', undefined, (e) => {
          e.eventObject.setPointerCapture(e.pointerId)
        })

        mock.apply('pointerdown').to([m])
        expect(getLast('lostpointercapture').on(n)).toBeNull()
        expect(getLast('lostpointercapture').on(g)).toBeNull()
        mock.apply('pointercancel').to([])
        expect(getLast('lostpointercapture').on(n)).toBeNull()
        expect(getLast('lostpointercapture').on(g)).toBeNull()
      })
    })
  })
})

function mockTresUsingEventManagerProps(props = eventsRaycast) {
  function mockTresContext() {
    const context = {
      scene: shallowRef(new Scene()),
      eventManager: null,
      registerCamera: () => {},
      deregisterCamera: () => {},
      extend: catalogue.extend,
      sizes: { width: { value: 100 }, height: { value: 100 } },
      camera: { value: new THREE.PerspectiveCamera() },
    } as unknown as TresContext

    context.eventManager = createEventManager(props, context, () => {})
    context.eventManager.config.raycaster.intersectObjects = (pool: any[]) => {
      // NOTE:
      // We are not testing raycast "hits", but we do want to test `pool`,
      // which comes from `raycastProps.ts`.
      // Mock raycaster returns the Intersections in `mockIntersections`, as
      // long as `intersection.object` is in the passed `pool`.
      return mockIntersections.filter(i => pool.includes(i.object))
    }

    mockIntersections.length = 0
    return context
  }

  const canvasEvents = { }
  const canvasPointerCapture: Set<number> = new Set()
  const canvas = {
    addEventListener: (eventName, fn) => {
      canvasEvents[eventName] = fn
    },
    removeEventListener: (eventName) => {
      delete canvasEvents[eventName]
    },
    setPointerCapture: (pointerId: number) => {
      canvasPointerCapture.add(pointerId)
    },
    releasePointerCapture: (pointerId: number) => { canvasPointerCapture.delete(pointerId) },
    hasPointerCapture: (pointerId: number) => canvasPointerCapture.has(pointerId),
    _call: (eventName, pointer) => {
      if (eventName in canvasEvents) {
        canvasEvents[eventName](pointer)
      }
      else {
        throw new Error(`Mock canvas: could not find event handler for ${eventName}. Existing events: ${Object.keys(canvasEvents)}`)
      }
    },
  }
  const context = mockTresContext()
  const nodeOps = getNodeOps(context)

  catalogue.extend(THREE)

  const geo = new BoxGeometry()
  const mat = new MeshBasicMaterial()
  const scene = context.scene.value

  function getGroup() {
    const group = nodeOps.createElement('TresGroup')
    return group
  }

  function getMesh() {
    const mesh = nodeOps.createElement('TresMesh')
    nodeOps.patchProp(mesh, 'geometry', undefined, geo)
    nodeOps.patchProp(mesh, 'material', undefined, mat)
    return mesh
  }

  const set = {
    mockIntersection: (objectOrObjects: THREE.Object3D | THREE.Object3D[]) => {
      mockIntersections.length = 0
      const objects = Array.isArray(objectOrObjects) ? objectOrObjects : [objectOrObjects]
      for (const object of objects) {
        mockIntersections.push({ object, distance: -1, point: new Vector3() })
      }
    },
  }

  const getObjectsFromDagString = (dagString: string) => {
    // Example
    // g0 -> m0 m1; m1 -> m2
    // Makes Group0, Mesh0, Mesh1, Mesh2
    // Inserts g0 into scene
    // Sets m0, m1 parent to g0
    // Sets m2 parent to m1
    const RESERVED_WORDS = new Set(['->'])
    const result: Record<string, THREE.Object3D> = {}
    const statements = dagString.split(';')
    for (const statement of statements) {
      const words = statement.split(' ').filter(w => w.length > 0)
      let parentObject = null
      for (const word of words) {
        if (!RESERVED_WORDS.has(word)) {
          if (!result[word]) {
            let object
            if (word.startsWith('m')) {
              object = getMesh()
            }
            else {
              object = getGroup()
            }
            object.name = word
            result[word] = object
            nodeOps.insert(object, undefined)
          }

          if (parentObject) {
            nodeOps.insert(result[word], parentObject)
          }
          else {
            parentObject = result[word]
          }
        }
      }
    }
    return result
  }

  const add = {
    toMockIntersection: (objectOrObjects: THREE.Object3D | THREE.Object3D[]) => {
      if (Array.isArray(objectOrObjects)) {
        for (const object of objectOrObjects) {
          add.toMockIntersection(object)
        }
      }
      else {
        mockIntersections.push({ object: objectOrObjects, distance: -1, point: new Vector3() })
      }
    },
    eventsTo(object: THREE.Object3D) {
      const ALL_THREE_EVENTS: ThreeEventName[] = Object.values(DOM_TO_THREE)
      const spies: Partial<Record<ThreeEventName, ReturnType<typeof vi.fn>>> = {}
      for (const threeEvent of ALL_THREE_EVENTS) {
        const spy = vi.fn(e => object.userData[threeEvent] = { ...e })
        nodeOps.patchProp(object, threeEvent, undefined, spy)
        spies[threeEvent] = spy
      }
      return spies
    },
    DAG: (dagString: string, parent = scene) => {
      const objects = getObjectsFromDagString(dagString)
      const firstWord = dagString.split(' ').filter(w => w.length > 0)[0]
      const firstObject = objects[firstWord]
      parent.add(firstObject)
      return objects
    },
  }

  const get = {
    mockIntersection: () => mockIntersections,
  }

  const apply = (eventOrEvents: (DomEventName | Record<string, any>) | (string | Record<string, any>)[]) => {
    const events = (Array.isArray(eventOrEvents) ? eventOrEvents : [eventOrEvents])
      .map(stringOrObject => typeof stringOrObject === 'string' ? mockEvt(stringOrObject, { target: canvas, currentTarget: canvas }) : stringOrObject)
    return { to: (intersectedGroupOrGroups: Object3D[] | Object3D[][]) => {
      if (intersectedGroupOrGroups.length === 0) {
        // NOTE: We have no groups of objects.
        // Interpret this as an empty intersetion.
        for (const event of events) {
          set.mockIntersection([])
          context.eventManager.handle(event)
        }
      }
      else if (!Array.isArray(intersectedGroupOrGroups[0])) {
        // NOTE: We have a single group of objects.
        // Set the intersection to the group
        // then apply the event.
        const targetGroup = intersectedGroupOrGroups as Object3D[]
        for (const event of events) {
          set.mockIntersection(targetGroup)
          context.eventManager.handle(event)
        }
      }
      else {
        // NOTE: We have multiple target groups and events
        // This is meant to represent a series of events
        // applied a series of intersections
        //
        // apply(['pointerover', 'click']).to([[obj1], [obj1, obj2], []])
        // * Set intersection to [obj1] and apply `pointerover` then `click`
        // * Set intersection to [obj1, obj2] and apply `pointerover` then `click`
        // * Set intersection to [] and apply `pointerover` then `click`
        const intersectedGroups = intersectedGroupOrGroups as Object3D[][]
        for (const intersectedGroup of intersectedGroups) {
          for (const event of events) {
            set.mockIntersection(intersectedGroup)
            context.eventManager.handle(event)
          }
        }
      }
    } }
  }

  return { canvas, context, nodeOps, add, get, set, clear, apply }
}

function mockEvt(type: PointerEvent['type'], options: Record<string, any> = {}) {
  return { type, pointerId: 42, ...options, stopPropagation: () => {}, preventDefault: () => {} } as PointerEvent
}

function getLast(domEventName: DomEventName) {
  return { on: (obj: Object3D) => obj.userData[DOM_TO_THREE[domEventName]] ?? null }
}
