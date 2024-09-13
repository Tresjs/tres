import { BoxGeometry, MeshBasicMaterial, Scene, Vector3 } from 'three'
import * as THREE from 'three'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { shallowRef } from 'vue'
import type { TresContext } from 'src/composables/useTresContextProvider'
import type { ThreeEvent } from 'src/types'
import type { Object3D } from 'three'
import catalogue from '../../core/catalogue'
import { nodeOps as getNodeOps } from '../../core/nodeOps'
import { DOM_TO_THREE, type ThreeEventName } from './const'
import { createEventManager } from './createEventManager'
import { eventsRaycast } from './eventsRaycast'

const mockIntersections: THREE.Intersection<Object3D>[] = []
const clear = () => { vi.clearAllMocks(); mockIntersections.length = 0 }

describe('createEventManager', () => {
  describe('props.getIntersectionsPool', () => {
    it('returns `[]` if no objects have events', () => {
      const mock = mockTresUsingEventManagerProps()
      mock.add.DAG('g0 -> m0 m1; g2 -> m2')
      const { config } = mock.context.eventManager
      expect(eventsRaycast.getIntersectionsPool(mockEvt('pointermove'), config)).toStrictEqual([])
    })
    it('returns an array including the object with events and all children', () => {
      const mock = mockTresUsingEventManagerProps()
      const { config } = mock.context.eventManager
      const { g0, m0, m1, g2, m2 } = mock.add.DAG('g0 -> m0 m1; g2 -> m2')

      mock.add.eventsTo(m0)

      let pool = eventsRaycast.getIntersectionsPool(mockEvt('pointermove'), config)

      expect(pool.includes(g0)).toBe(false)
      expect(pool.includes(m0)).toBe(true)
      expect(pool.includes(m1)).toBe(false)

      expect(pool.includes(g2)).toBe(false)
      expect(pool.includes(m2)).toBe(false)

      mock.add.eventsTo(g0)
      pool = eventsRaycast.getIntersectionsPool(mockEvt('pointermove'), config)

      expect(pool.includes(g0)).toBe(true)
      expect(pool.includes(m0)).toBe(true)
      expect(pool.includes(m1)).toBe(true)

      expect(pool.includes(g2)).toBe(false)
      expect(pool.includes(m2)).toBe(false)

      mock.add.eventsTo(m2)
      pool = eventsRaycast.getIntersectionsPool(mockEvt('pointermove'), config)

      expect(pool.includes(g0)).toBe(true)
      expect(pool.includes(m0)).toBe(true)
      expect(pool.includes(m1)).toBe(true)

      expect(pool.includes(g2)).toBe(false)
      expect(pool.length).toBe(4)
      expect(pool.includes(m2)).toBe(true)
    })
    it('updates following a removal', () => {
      const mock = mockTresUsingEventManagerProps()
      // NOTE: NodeOps notifies context.eventManager of changes to
      // event props. So adding the eventManager to the context is
      // required here.
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
  describe('const eventManager = createEventManager(raycastProps, context)', () => {
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
    describe('eventManager.handle(event: MouseEvent | PointerEvent)', () => {
      beforeEach(() => {
        // NOTE: We're not testing `isSetUp` here.
        eventsRaycast.isSetUp = () => true
      })
      describe('wheel', () => {
        it('calls `wheel` methods on "hit" objects', () => {
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

      describe('pointermove', () => {
        describe.each([
          { threeEvent: 'onPointerenter' },
          { threeEvent: 'onPointerover' },
        ])('$threeEvent', ({ threeEvent }) => {
          it(`calls \`${threeEvent}\` methods on objects newly under pointer`, () => {
            const mock = mockTresUsingEventManagerProps()

            const { g0, g1, m1, m2, mNotIncluded } = mock.add.DAG('g0 -> m0 m1; m0 -> g1; g1 -> m2; m2 -> mNotIncluded')
            const g0Spies = mock.add.eventsTo(g0)
            const g1Spies = mock.add.eventsTo(g1)
            const mNotIncludedSpies = mock.add.eventsTo(mNotIncluded)

            mock.set.mockIntersection(m2)

            expect(g0Spies[threeEvent]).toBeCalledTimes(0)
            expect(g1Spies[threeEvent]).toBeCalledTimes(0)
            expect(mNotIncludedSpies[threeEvent]).toBeCalledTimes(0)

            mock.apply('pointermove').to([m2])
            expect(g0Spies[threeEvent]).toBeCalledTimes(1)
            expect(g1Spies[threeEvent]).toBeCalledTimes(1)
            expect(mNotIncludedSpies[threeEvent]).toBeCalledTimes(0)

            mock.apply('pointermove').to([])
            expect(g0Spies[threeEvent]).toBeCalledTimes(1)
            expect(g1Spies[threeEvent]).toBeCalledTimes(1)
            expect(mNotIncludedSpies[threeEvent]).toBeCalledTimes(0)

            mock.apply('pointermove').to([m1])
            expect(g0Spies[threeEvent]).toBeCalledTimes(2)
            expect(g1Spies[threeEvent]).toBeCalledTimes(1)
            expect(mNotIncludedSpies[threeEvent]).toBeCalledTimes(0)
          })
          it(`does not call \`${threeEvent}\` methods on objects still directly under pointer`, () => {
            const mock = mockTresUsingEventManagerProps()
            const { mUnderPointer, mAlternates } = mock.add.DAG('mUnderPointer; mAlternates')
            const mUnderPointerSpies = mock.add.eventsTo(mUnderPointer)
            mock.add.eventsTo(mAlternates)

            mock.set.mockIntersection(mUnderPointer)
            mock.apply(['pointermove', 'pointermove', 'pointermove']).to([mUnderPointer])
            expect(mUnderPointerSpies[threeEvent]).toBeCalledTimes(1)

            mock.clear()
            mock.apply(['pointermove', 'pointermove', 'pointermove']).to([mUnderPointer, mAlternates])
            expect(mUnderPointerSpies[threeEvent]).toBeCalledTimes(0)

            mock.clear()
            mock.apply(['pointermove', 'pointermove', 'pointermove']).to([mUnderPointer])
            expect(mUnderPointerSpies[threeEvent]).toBeCalledTimes(0)

            mock.clear()
            mock.apply(['pointermove', 'pointermove', 'pointermove']).to([mAlternates, mUnderPointer])
            expect(mUnderPointerSpies[threeEvent]).toBeCalledTimes(0)
          })
          it(`does not call \`${threeEvent}\` methods on objects still under pointer via a different child`, () => {
            const mock = mockTresUsingEventManagerProps()
            const { gStaysUnderPointer, m0, m1 } = mock.add.DAG('gStaysUnderPointer -> m0 m1')
            const gStaysUnderPointerSpies = mock.add.eventsTo(gStaysUnderPointer)

            mock.apply('pointermove').to([m0])
            expect(gStaysUnderPointerSpies[threeEvent]).toBeCalledTimes(1)

            mock.apply('pointermove').to([m1])
            expect(gStaysUnderPointerSpies[threeEvent]).toBeCalledTimes(1)
          })

          it(`does not propagate if stopped`, () => {
            const mock = mockTresUsingEventManagerProps()
            const { g, m0, m1 } = mock.add.DAG('g -> m0 m1')
            const gSpy = vi.fn()
            const m0Spy = vi.fn()
            const m1Spy = vi.fn()
            mock.nodeOps.patchProp(g, threeEvent, undefined, gSpy)
            mock.nodeOps.patchProp(m0, threeEvent, undefined, (e) => { e.stopPropagation(); m0Spy() })
            mock.nodeOps.patchProp(m1, threeEvent, undefined, (e) => { e.stopPropagation(); m1Spy() })

            mock.apply('pointermove').to([m0])
            expect(gSpy).toBeCalledTimes(0)
            expect(m0Spy).toBeCalledTimes(1)
            expect(m1Spy).toBeCalledTimes(0)

            mock.clear()
            mock.apply('pointermove').to([m0, m1])
            expect(gSpy).toBeCalledTimes(0)
            expect(m0Spy).toBeCalledTimes(0)
            expect(m1Spy).toBeCalledTimes(1)

            mock.clear()
            mock.apply('pointermove').to([m0, m1])
            expect(gSpy).toBeCalledTimes(0)
            expect(m0Spy).toBeCalledTimes(0)
            expect(m1Spy).toBeCalledTimes(0)
          })
          describe(`${threeEvent} event`, () => {
            it('has an `object` field containing the intersected object', () => {
              const mock = mockTresUsingEventManagerProps()
              const { g0, m0 } = mock.add.DAG('g0 -> m0')
              let m0Event: ThreeEvent<PointerEvent> | null = null
              let g0Event: ThreeEvent<PointerEvent> | null = null
              mock.nodeOps.patchProp(m0, threeEvent, undefined, (e: ThreeEvent<PointerEvent>) => m0Event = e)
              mock.nodeOps.patchProp(g0, threeEvent, undefined, (e: ThreeEvent<PointerEvent>) => g0Event = e)

              mock.apply('pointermove').to([[], [m0]])

              expect(m0Event.object).toBe(m0)
              expect(g0Event.object).toBe(m0)
            })
          })
        })
      })

      describe.each(
        [
          { domEvent: 'click' },
          { domEvent: 'contextmenu' },
          { domEvent: 'dblclick' },
        ],
      )('$domEvent', ({ domEvent }) => {
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
          // Acestors `mA`, `mABD` are also "hit".
          // `mAC` is "missed".
          mock.apply(domEvent).to([mABDE])

          expect(gASpies.onPointermissed).toBeCalledTimes(0)
          expect(mABSpies.onPointermissed).toBeCalledTimes(0)
          expect(mACSpies.onPointermissed).toBeCalledTimes(1)
          expect(mABDESpies.onPointermissed).toBeCalledTimes(0)

          vi.clearAllMocks()
          mock.apply(domEvent).to([mAC])
          expect(gASpies.onPointermissed).toBeCalledTimes(0)
          expect(mABSpies.onPointermissed).toBeCalledTimes(1)
          expect(mACSpies.onPointermissed).toBeCalledTimes(0)
          expect(mABDESpies.onPointermissed).toBeCalledTimes(1)

          vi.clearAllMocks()
          mock.apply(domEvent).to([])
          expect(gASpies.onPointermissed).toBeCalledTimes(1)
          expect(mABSpies.onPointermissed).toBeCalledTimes(1)
          expect(mACSpies.onPointermissed).toBeCalledTimes(1)
          expect(mABDESpies.onPointermissed).toBeCalledTimes(1)
        })
      })

      describe.each(
        [
          { domEvent: 'click', threeEvent: 'onClick', mockClickFn: () => mockEvt('click') },
          { domEvent: 'contextmenu', threeEvent: 'onContextmenu', mockClickFn: () => mockEvt('contextmenu') },
          { domEvent: 'dblclick', threeEvent: 'onDblclick', mockClickFn: () => mockEvt('dblclick') },
          { domEvent: 'pointerdown', threeEvent: 'onPointerdown', mockClickFn: () => mockEvt('pointerdown') },
          { domEvent: 'pointerup', threeEvent: 'onPointerup', mockClickFn: () => mockEvt('pointerup') },
        ],
      )('$domEvent', ({ domEvent, threeEvent }) => {
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
      describe(':blocking', () => {
        it('stops objects "behind" :blocking objects from receiving `click`, `wheel`, `pointermove`, when `true`', () => {
          const mock = mockTresUsingEventManagerProps()
          const { mFront, mBehind } = mock.add.DAG('mFront; mBehind')
          const mFrontSpies = mock.add.eventsTo(mFront)
          const mBehindSpies = mock.add.eventsTo(mBehind)

          mock.nodeOps.patchProp(mFront, 'blocking', undefined, true)
          mock.set.mockIntersection([mFront, mBehind])

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
        it('restores normal "non-solid" behavior when `false`', () => {
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
      describe('event.stopPropagation()', () => {
        it('does not stop @pointerleave if @pointerout is stopped', () => {
          // NOTE: Vue behavior in the DOM.
          // https://play.vuejs.org/#eNp9U01v2zAM/SuELk6BwkGxnQI32Fb0sB22YN1RF81mbLWyKEhylsLwfx8lNx8t0l4Mi3yPenykRvHVuXI3oFiJKtReuwgB4+DW0urekY8wgsctTLD11EPB0EJaaWuyIUIfWrhN+UWxIW0jeoNqh9ChR1C2gbrD+gkSmAwWV4m5HWwdNVlwM4OGuLiCUVo44EpD7UIKTkjBlOkSq6cdXqalzPu8rG+BL0wsQyS38eRUqxJswby3BTPlULFazi6xP3yI2DujIvIJoOpu4MupqVspTgcpYBXis0GOjvBX1U8th21zR4b8Cgqj2y62Xj0XMEmxrhq9O9bK92ehp5Ivmo6Y1PQbyOzDehzzlKapWnLRdbXsbrLaM6V5Uq9uA8Xz07ZBh/yxsYQHru20bYEsQkMYwBKvCkchdgjEH18me84sEdciBvZyq9vyMZDlHcuuS1FT77RB/8sl04MUq3keKaeMoX8/ciz6Aa8P8bxKF+KPYZ9iUmw8BvSp6WMuKt8im5/S9w8/cc//x2RPzWAY/UHyN/IeDEnjDPvGI2PZZ7is9nt+KezOn3C/j2jDoakkNCGnjJeCX8/dB62f5H4qP2ce75yY/gPG30Vc
          const mock = mockTresUsingEventManagerProps()
          const { gListener, gStopper, mSource } = mock.add.DAG('gListener -> gStopper; gStopper -> mSource')
          const gListenerSpies = mock.add.eventsTo(gListener)
          mock.add.eventsTo(mSource)
          mock.nodeOps.patchProp(gStopper, 'onPointerout', undefined, (e) => { e.stopPropagation() })

          mock.apply('pointermove').to([[mSource], []])

          expect(gListenerSpies.onPointerleave).toBeCalledTimes(1)
          expect(gListenerSpies.onPointerout).not.toBeCalled()
        })
        it('does not stop @pointerout if @pointerleave is stopped', () => {
          // NOTE: Vue behavior in the DOM.
          // https://play.vuejs.org/#eNp9U01v2zAM/SuELk6BwkGxnQI32Fb0sB22YN1RF81mbLWyKEhylsLwfx8lNx8t0l4Mi3yPenykRvHVuXI3oFiJKtReuwgB4+DW0urekY8wgsctTLD11EPB0EJaaWuyIUIfWrhN+UWxIW0jeoNqh9ChR1C2gbrD+gkSmAwWV4m5HWwdNVlwM4OGuLiCUVo44EpD7UIKTkjBlOkSq6cdXqalzPu8rG+BL0wsQyS38eRUqxJswby3BTPlULFazi6xP3yI2DujIvIJoOpu4MupqVspTgcpYBXis0GOjvBX1U8th21zR4b8Cgqj2y62Xj0XMEmxrhq9O9bK92ehp5Ivmo6Y1PQbyOzDehzzlKapWnLRdbXsbrLaM6V5Uq9uA8Xz07ZBh/yxsYQHru20bYEsQkMYwBKvCkchdgjEH18me84sEdciBvZyq9vyMZDlHcuuS1FT77RB/8sl04MUq3keKaeMoX8/ciz6Aa8P8bxKF+KPYZ9iUmw8BvSp6WMuKt8im5/S9w8/cc//x2RPzWAY/UHyN/IeDEnjDPvGI2PZZ7is9nt+KezOn3C/j2jDoakkNCGnjJeCX8/dB62f5H4qP2ce75yY/gPG30Vc
          const mock = mockTresUsingEventManagerProps()
          const { gListener, gStopper, mSource } = mock.add.DAG('gListener -> gStopper; gStopper -> mSource')

          const gListenerSpies = mock.add.eventsTo(gListener)
          mock.add.eventsTo(mSource)
          mock.nodeOps.patchProp(gStopper, 'onPointerleave', undefined, (e) => { e.stopPropagation() })

          mock.apply('pointermove').to([[mSource], []])

          expect(gListenerSpies.onPointerout).toBeCalledTimes(1)
          expect(gListenerSpies.onPointerleave).not.toBeCalled()
        })
        describe('stops propagations for ...', () => {
          it(`stops propagation for \`pointermissed\``, () => {
            const mock = mockTresUsingEventManagerProps()
            const { gListener, gStopper } = mock.add.DAG('gListener -> gStopper; gStopper -> mSource')
            const gListenerSpies = mock.add.eventsTo(gListener)

            mock.apply('click').to([])
            expect(gListenerSpies.onPointermissed).toBeCalledTimes(1)

            vi.clearAllMocks()
            mock.nodeOps.patchProp(gStopper, 'onPointermissed', undefined, e => e.stopPropagation())
            mock.apply('click').to([])
            expect(gListenerSpies.onPointermissed).toBeCalledTimes(0)
          })

          it(`stops propagation for \`pointerenter\` and \`pointerover\``, () => {
            const mock = mockTresUsingEventManagerProps()
            const { gListener, gStopper, mSource } = mock.add.DAG('gListener -> gStopper; gStopper -> mSource')
            const gListenerSpies = mock.add.eventsTo(gListener)

            mock.nodeOps.patchProp(gStopper, 'onPointerenter', undefined, e => e.stopPropagation())
            // NOTE: Cause a pointerenter
            mock.apply('pointermove').to([[], [mSource]])
            expect(gListenerSpies.onPointerenter).toBeCalledTimes(0)

            vi.clearAllMocks()

            mock.nodeOps.patchProp(gStopper, 'onPointerover', undefined, e => e.stopPropagation())
            // NOTE: Cause a pointerover
            mock.apply('pointermove').to([[], [mSource]])
            expect(gListenerSpies.onPointerover).toBeCalledTimes(0)
          })

          it(`stops propagation for \`pointerleave\` and \`pointerout\``, () => {
            const mock = mockTresUsingEventManagerProps()
            const { gListener, gStopper, mSource } = mock.add.DAG('gListener -> gStopper; gStopper -> mSource')
            const gListenerSpies = mock.add.eventsTo(gListener)

            mock.nodeOps.patchProp(gStopper, 'onPointerleave', undefined, e => e.stopPropagation())
            // NOTE: Cause a pointerleave
            mock.apply('pointermove').to([[mSource], []])
            expect(gListenerSpies.onPointerleave).toBeCalledTimes(0)

            vi.clearAllMocks()

            mock.nodeOps.patchProp(gStopper, 'onPointerout', undefined, e => e.stopPropagation())
            // NOTE: Cause a pointerout
            mock.apply('pointermove').to([[mSource], []])
            expect(gListenerSpies.onPointerout).toBeCalledTimes(0)
          })
        })
      })

      describe.each([
        { incomingDomEvent: 'click', threeEvent: DOM_TO_THREE.click },
        { incomingDomEvent: 'contextmenu', threeEvent: DOM_TO_THREE.contextmenu },
        { incomingDomEvent: 'dblclick', threeEvent: DOM_TO_THREE.dblclick },
        { incomingDomEvent: 'pointerup', threeEvent: DOM_TO_THREE.pointerup },
        { incomingDomEvent: 'pointerdown', threeEvent: DOM_TO_THREE.pointerdown },
        { incomingDomEvent: 'wheel', threeEvent: DOM_TO_THREE.wheel },
      ])(`$threeEvent(event: TresEvent)`, ({ incomingDomEvent, threeEvent }) => {
        const mock = mockTresUsingEventManagerProps()
        let objects = {} as Record<string, THREE.Object3D>
        let events = {} as Record<string, ThreeEvent<any> | null>
        let spies = {} as Record<string, ReturnType<typeof mock.add['eventsTo']>>
        let intersection0 = null as THREE.Intersection | null
        let intersection1 = null as THREE.Intersection | null
        let distance = -1
        let triggeringEvent = null as MouseEvent | PointerEvent | null

        objects = mock.add.DAG('gParent -> mIntersected0; mIntersected1')

        spies = {
          gParent: mock.add.eventsTo(objects.gParent),
          mIntersected0: mock.add.eventsTo(objects.mIntersected0),
          mIntersected1: mock.add.eventsTo(objects.mIntersected1),
        }

        events = {
          gParent: null,
          mIntersected0: null,
          mIntersected1: null,
        }

        for (const objectName of Object.keys(objects)) {
          mock.nodeOps.patchProp(
            objects[objectName],
            threeEvent,
            null,
            (e: ThreeEvent<any>) => {
              events[objectName] = { ...e }
              spies[objectName][threeEvent]()
            },
          )
        }

        const mouseDownPosition = new THREE.Vector2(999, 1000)
        const { x, y } = mouseDownPosition
        const newPosition = new THREE.Vector2(0, 3)
        const normalizedDeviceCoordinates = new THREE.Vector2(
          (newPosition.x / mock.context.sizes.width.value) * 2 - 1,
          -(newPosition.y / mock.context.sizes.height.value) * 2 + 1,
        )

        triggeringEvent = mockEvt(incomingDomEvent, { offsetX: newPosition.x, offsetY: newPosition.y })
        distance = mouseDownPosition.distanceTo(newPosition)
        const { handle } = mock.context.eventManager
        handle(mockEvt('pointerdown', { offsetX: x, offsetY: y }))

        mock.set.mockIntersection([objects.mIntersected0, objects.mIntersected1])
        intersection0 = mock.get.mockIntersection()[0]
        intersection1 = mock.get.mockIntersection()[1]

        handle(mockEvt(incomingDomEvent, { offsetX: newPosition.x, offsetY: newPosition.y }))
        it('has an `eventObject` field containing the Object3D receiving the event', () => {
          expect(events.gParent.eventObject).toBe(objects.gParent)
          expect(events.mIntersected0.eventObject).toBe(objects.mIntersected0)
          expect(events.mIntersected1.eventObject).toBe(objects.mIntersected1)
        })
        it('has an `currentTarget` field that is the same as the `eventObject` field', () => {
          expect(events.gParent.eventObject).toBe(events.gParent.currentTarget)
          expect(events.mIntersected0.eventObject).toBe(events.mIntersected0.eventObject)
          expect(events.mIntersected1.eventObject).toBe(events.mIntersected1.eventObject)
        })
        it('has a `target` field containing the object that was initially "hit"', () => {
          expect(events.gParent.target).toBe(objects.mIntersected0)
          expect(events.mIntersected0.target).toBe(objects.mIntersected0)
          expect(events.mIntersected1.target).toBe(objects.mIntersected1)
        })
        it('has an `intersections` field containing the intersections', () => {
          const expectedIntersections = [
            { ...intersection0, eventObject: objects.mIntersected0 },
            { ...intersection0, eventObject: objects.gParent },
            { ...intersection1, eventObject: objects.mIntersected1 },
          ]
          for (const event of Object.values(events)) {
            expect(event.intersections).toStrictEqual(expectedIntersections)
          }
        })
        it('is a `{ ...intersection }` if an object was intersected', () => {
          for (const key of Object.keys(intersection0)) {
            if (key === 'object') {
              expect(events.gParent.object).toStrictEqual(objects.mIntersected0)
              expect(events.mIntersected0.object).toStrictEqual(objects.mIntersected0)
              expect(events.mIntersected1.object).toStrictEqual(objects.mIntersected1)
            }
            else {
              expect(events.gParent[key]).toStrictEqual(intersection0[key])
              expect(events.mIntersected0[key]).toStrictEqual(intersection0[key])
              expect(events.mIntersected1[key]).toStrictEqual(intersection1[key])
            }
          }
        })
        it('is a `{ ...domEvent }`', () => {
          for (const event of Object.values(events)) {
            for (const key in triggeringEvent) {
              expect(event[key]).toBe(triggeringEvent[key])
            }
          }
        })
        it('has a `nativeEvent` field containing the original DOM event', () => {
          for (const event of Object.values(events)) {
            expect(event.nativeEvent).toStrictEqual(triggeringEvent)
          }
        })
        it('has a `pointer` field containing the "normalized device coordinates" (NDC) of the event', () => {
          for (const event of Object.values(events)) {
            expect(event.pointer).toStrictEqual(normalizedDeviceCoordinates)
          }
        })
        it('has a `ray` field containing the raycaster ray', () => {
          for (const event of Object.values(events)) {
            expect(event.ray).toBe(mock.context.eventManager.config.raycaster.ray)
          }
        })
        it('has a `camera` field containing the raycaster\'s camera', () => {
          for (const event of Object.values(events)) {
            expect(event.camera).toBe(mock.context.camera.value)
          }
        })
        describe('event.unprojectedPoint', () => {
          it('has an `unprojectedPoint` field that is a Vector3', () => {
            for (const event of Object.values(events)) {
              expect(event.unprojectedPoint.isVector3).toBe(true)
            }
          })
        })
        describe('event.delta', () => {
          if (incomingDomEvent === 'click' || incomingDomEvent === 'contextmenu' || incomingDomEvent === 'dblclick' || incomingDomEvent === 'pointerup') {
            it('is the distance between the current position and prior `pointerdown` position', () => {
              for (const event of Object.values(events)) {
                expect(event.delta).toBe(distance)
              }
            })
          }
          else {
            it('is 0', () => {
              for (const event of Object.values(events)) {
                expect(event).toBeDefined()
                expect(event.delta).toBeDefined()
                expect(event.delta).toBe(0)
              }
            })
          }
        })
      })
      describe('"self" events – `target` === `currentTarget`', () => {
        describe('onPointermissed', () => {
          it('is always a "self" event', () => {
            const mock = mockTresUsingEventManagerProps()
            const { g0, m0, m1 } = mock.add.DAG('g0 -> m0; m1')
            const g0Spy = vi.fn()
            const m0Spy = vi.fn()
            const m1Spy = vi.fn()
            mock.nodeOps.patchProp(g0, 'onPointermissed', undefined, (e) => { g0Spy(e.target === e.currentTarget && !!e.target) })
            mock.nodeOps.patchProp(m0, 'onPointermissed', undefined, (e) => { m0Spy(e.target === e.currentTarget && !!e.target) })
            mock.nodeOps.patchProp(m1, 'onPointermissed', undefined, (e) => { m1Spy(e.target === e.currentTarget && !!e.target) })

            mock.apply('click').to([])

            expect(g0Spy).toBeCalledWith(true)
            expect(m0Spy).toBeCalledWith(true)
            expect(m1Spy).toBeCalledWith(true)
          })
        })

        describe('onPointerenter', () => {
          // NOTE: See Vue's behavior in the DOM:
          // https://play.vuejs.org/#eNqtVE1TwjAQ/SuZeEBnmIKDJ6yOH4MzelBGPeZS6VKDaZJJ0lKG4b+7SQXKCJWDPbS7+15edl/TLumt1lFZAB3S2E4M145YcIW+ZjLu1QUMMXGQa5E4wIyQOOVlCDC0OpHkRisuHRgBSQmRBTG9YnSipFUCIqGy044qECZNWueM0R+R42VynqYCDuscr8SlbGvIX+MGSLgliZgnC3wQRr0io41de37b7TjNtJHEvdq5VhPB3/42MdBaTDwss2vib53jlXZM3Ce0MTGA/21i3GscS0ytWwgfIk6WnponJuNySAZ9XV36wocyKZghOdcVwTF4Sk4e+n2EVuHAh/W0S53FMac8i2ZWSfw2gpifPddcgHnRjqMNjA7rbTyWCKHmT6HmTAHddX3yCZOvPfWZrXyN0bEBC6YERjeYw7bB1fDo7RkqjDdgrtJCILsFfAWcrfA91rS7QuILNw1e6PYx18o4LrN3O6ocSLseyjfqmavAZxR/EPcto2/bHUQXYR36SVff1aZvKg==
          it('is always a "self" event', () => {
            const mock = mockTresUsingEventManagerProps()
            const { g0, g1, m0 } = mock.add.DAG('g0 -> g1; g1 -> m0')
            const g0Spy = vi.fn()
            const g1Spy = vi.fn()
            const m0Spy = vi.fn()
            mock.nodeOps.patchProp(g0, 'onPointerenter', undefined, (e) => { g0Spy(e.target === e.currentTarget && !!e.target) })
            mock.nodeOps.patchProp(g1, 'onPointerenter', undefined, (e) => { g1Spy(e.target === e.currentTarget && !!e.target) })
            mock.nodeOps.patchProp(m0, 'onPointerenter', undefined, (e) => { m0Spy(e.target === e.currentTarget && !!e.target) })

            mock.apply('pointermove').to([m0])

            expect(g0Spy).toBeCalledWith(true)
            expect(g1Spy).toBeCalledWith(true)
            expect(m0Spy).toBeCalledWith(true)
          })
        })

        describe('onPointerleave', () => {
          // NOTE: See Vue's behavior in the DOM:
          // https://play.vuejs.org/#eNqtVE1TwjAQ/SuZeEBnmIKDJ6yOH4MzelBGPeZS6VKDaZJJ0lKG4b+7SQXKCJWDPbS7+15edl/TLumt1lFZAB3S2E4M145YcIW+ZjLu1QUMMXGQa5E4wIyQOOVlCDC0OpHkRisuHRgBSQmRBTG9YnSipFUCIqGy044qECZNWueM0R+R42VynqYCDuscr8SlbGvIX+MGSLgliZgnC3wQRr0io41de37b7TjNtJHEvdq5VhPB3/42MdBaTDwss2vib53jlXZM3Ce0MTGA/21i3GscS0ytWwgfIk6WnponJuNySAZ9XV36wocyKZghOdcVwTF4Sk4e+n2EVuHAh/W0S53FMac8i2ZWSfw2gpifPddcgHnRjqMNjA7rbTyWCKHmT6HmTAHddX3yCZOvPfWZrXyN0bEBC6YERjeYw7bB1fDo7RkqjDdgrtJCILsFfAWcrfA91rS7QuILNw1e6PYx18o4LrN3O6ocSLseyjfqmavAZxR/EPcto2/bHUQXYR36SVff1aZvKg==
          it('is always a "self" event', () => {
            const mock = mockTresUsingEventManagerProps()
            const { g0, g1, m0 } = mock.add.DAG('g0 -> g1; g1 -> m0')
            const g0Spy = vi.fn()
            const g1Spy = vi.fn()
            const m0Spy = vi.fn()
            mock.nodeOps.patchProp(g0, 'onPointerleave', undefined, (e) => { g0Spy(e.target === e.currentTarget && !!e.target) })
            mock.nodeOps.patchProp(g1, 'onPointerleave', undefined, (e) => { g1Spy(e.target === e.currentTarget && !!e.target) })
            mock.nodeOps.patchProp(m0, 'onPointerleave', undefined, (e) => { m0Spy(e.target === e.currentTarget && !!e.target) })

            mock.apply('pointermove').to([[m0], []])

            expect(g0Spy).toBeCalledWith(true)
            expect(g1Spy).toBeCalledWith(true)
            expect(m0Spy).toBeCalledWith(true)
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
        mock.nodeOps.patchProp(g0, 'onPointerout', undefined, (e) => { g0Spy++; g0Event = e })
        mock.nodeOps.patchProp(m0, 'onPointerout', undefined, (e) => { m0Spy++; m0Event = e })

        // NOTE: Move pointer over m0 twice, then nothing twice.
        mock.apply('pointermove').to([[m0], [m0], [], []])

        it('is called once for the same "out"', () => {
          expect(g0Spy).toBe(1)
          expect(m0Spy).toBe(1)
        })
        it('is defined', () => {
          expect(g0Event).toBeDefined()
          expect(m0Event).toBeDefined()
        })
        it('has an `object` field', () => {
          expect('object' in g0Event).toBe(true)
          expect('object' in m0Event).toBe(true)
        })
        it('has an `object` field containing the previously intersected object', () => {
          expect(g0Event.object).toBe(m0)
          expect(m0Event.object).toBe(m0)
        })
      })
      describe(`onPointerleave(event: TresEvent)`, () => {
        const mock = mockTresUsingEventManagerProps()
        const { g0, m0 } = mock.add.DAG('g0 -> m0')
        let g0Spy = 0
        let m0Spy = 0
        let g0Event: ThreeEvent<PointerEvent> | null = null
        let m0Event: ThreeEvent<PointerEvent> | null = null
        mock.nodeOps.patchProp(g0, 'onPointerleave', undefined, (e) => { g0Spy++; g0Event = e })
        mock.nodeOps.patchProp(m0, 'onPointerleave', undefined, (e) => { m0Spy++; m0Event = e })

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
        it('has an `object` field', () => {
          expect('object' in g0Event).toBe(true)
          expect('object' in m0Event).toBe(true)
        })
        it('has an `object` field containing the previously intersected object', () => {
          expect(g0Event.object).toBe(m0)
          expect(m0Event.object).toBe(m0)
        })
      })
    })
    describe('removeInteractivity', () => {
      describe.each([
        { domEventName: 'pointerleave' },
        { domEventName: 'pointerout' },
      ])('$domEventName', ({ domEventName }) => {
        it(`calls \`object.${DOM_TO_THREE[domEventName]}\` if the removed object was under the pointer`, () => {
          const mock = mockTresUsingEventManagerProps()
          const { m0 } = mock.add.DAG('m0')
          const m0Spies = mock.add.eventsTo(m0)
          const { remove } = mock.context.eventManager

          mock.apply('pointermove').to([m0])

          expect(m0Spies.onPointerenter).toBeCalledTimes(1)
          remove(m0)
          expect(m0Spies[DOM_TO_THREE[domEventName]]).toBeCalledTimes(1)
        })

        it(`calls \`object.${DOM_TO_THREE[domEventName]}\` on objects in tree, if they are no longer under the pointer`, () => {
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

          expect(g0Spies[DOM_TO_THREE[domEventName]]).toBeCalledTimes(0)
          expect(m0Spies[DOM_TO_THREE[domEventName]]).toBeCalledTimes(1)
          expect(m1Spies[DOM_TO_THREE[domEventName]]).toBeCalledTimes(0)
          expect(m2Spies[DOM_TO_THREE[domEventName]]).toBeCalledTimes(0)

          vi.clearAllMocks()
          remove(m2)

          expect(g0Spies[DOM_TO_THREE[domEventName]]).toBeCalledTimes(1)
          expect(m0Spies[DOM_TO_THREE[domEventName]]).toBeCalledTimes(0)
          expect(m1Spies[DOM_TO_THREE[domEventName]]).toBeCalledTimes(1)
          expect(m2Spies[DOM_TO_THREE[domEventName]]).toBeCalledTimes(1)
        })
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

  const canvas = {
    addEventListener: () => {},
    removeEventListener: () => {},
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
        const spy = vi.fn()
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

  const apply = (eventOrEvents: (string | Record<string, any>) | (string | Record<string, any>)[]) => {
    const events = (Array.isArray(eventOrEvents) ? eventOrEvents : [eventOrEvents])
      .map(stringOrObject => typeof stringOrObject === 'string' ? mockEvt(stringOrObject) : stringOrObject)
    return { to: (targetGroupOrGroups: Object3D[] | Object3D[][]) => {
      if (targetGroupOrGroups.length === 0) {
        for (const event of events) {
          set.mockIntersection([])
          context.eventManager.handle(event)
        }
      }
      else if (!Array.isArray(targetGroupOrGroups[0])) {
        const targetGroup = targetGroupOrGroups as Object3D[]
        for (const event of events) {
          set.mockIntersection(targetGroup)
          context.eventManager.handle(event)
        }
      }
      else {
        const targetGroups = targetGroupOrGroups as Object3D[][]
        for (const event of events) {
          for (const targetGroup of targetGroups) {
            set.mockIntersection(targetGroup)
            context.eventManager.handle(event)
          }
        }
      }
    } }
  }
  return { canvas, context, nodeOps, add, get, set, clear, apply }
}

function mockEvt(type: PointerEvent['type'], options: Record<string, any> = {}) {
  return { type, ...options } as PointerEvent
}
