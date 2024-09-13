import { describe, expect, it, vi } from 'vitest'
import { capitalize } from 'vue'
import { THREE_EVENT_NAMES } from './const'
import { EVENT_MODIFIERS, isVueEventName, patchEvent } from './eventModifiers'
import type { IntersectionEvent, TresInstance, TresObject } from '../../types'

describe('eventModifiers', () => {
  describe('events with Vue event modifiers', () => {
    describe('@click.stop', () => {
      it('calls `event.stopPropagation()`', () => {
        const obj = getMockObject()
        const event = getMockEvent()
        const spyClick = vi.fn()

        patchEvent(obj, 'onClickStop', undefined, spyClick)

        call(obj, event, 'click')
        expect(event.stopPropagation).toBeCalledTimes(1)

        call(obj, event, 'click')
        expect(event.stopPropagation).toBeCalledTimes(2)
      })
      it('calls `event.stopPropagation()` even if the function is `undefined`', () => {
        const obj = getMockObject()
        const event = getMockEvent()

        patchEvent(obj, 'onClickStop', undefined, undefined)

        call(obj, event, 'click')
        expect(event.stopPropagation).toBeCalledTimes(1)

        call(obj, event, 'click')
        expect(event.stopPropagation).toBeCalledTimes(2)
      })
    })
    describe('@click.once="v"', () => {
      describe('v: Function', () => {
        it('only fires once', () => {
          const obj = getMockObject()
          const spyClick = vi.fn()
          const spyClickOnce = vi.fn()

          patchEvent(obj, 'onClick', undefined, spyClick)
          patchEvent(obj, 'onClickOnce', undefined, spyClickOnce)

          expect(spyClick).toBeCalledTimes(0)
          expect(spyClickOnce).toBeCalledTimes(0)

          call(obj, getMockEvent(), 'click')
          expect(spyClick).toBeCalledTimes(1)
          expect(spyClickOnce).toBeCalledTimes(1)

          call(obj, getMockEvent(), 'click')
          expect(spyClick).toBeCalledTimes(2)
          expect(spyClickOnce).toBeCalledTimes(1)

          call(obj, getMockEvent(), 'click')
          call(obj, getMockEvent(), 'click')
          call(obj, getMockEvent(), 'click')
          call(obj, getMockEvent(), 'click')
          expect(spyClick).toBeCalledTimes(6)
          expect(spyClickOnce).toBeCalledTimes(1)
        })
      })
      describe('v: Function, patched', () => {
        it('only fires once', () => {
          // NOTE: See this playground for Vue's behavior in the DOM
          // https://play.vuejs.org/#eNqVU01v2zAM/SuELm6RwFmwnQzb+yhy2A7psPWoiyvTiVtZEiwpTWH4v4+S46QFugK9JCL5+PgeJQ/suzHpwSPLWG5F3xoHFp03JVdtZ3TvYIAeGxih6XUHCUETrrgSWllHFeulgyJArpKtPiWSa64kOlBUWc/YRn2icABVdZhBQmGyhEMlPUVX11CUcVJoT2OWwImopMQ6tiawALVY0G8Cru3QJiOMF+71a+71B7jX/+O+sJ8ckg5yNiXtU2UofWLnCgh2Jp+PaRAERUHjgl/4GsdlwRBXNCFfTTunbVPgsDOyckgRQG7K7e3dJoMb2YrHVu2As656vkfoveIM7F57WYNW8jlk6CBwCXhABW0Dbo/QeCVcqym2Ua3BOs1X4WaJ/d47R6VvIrCnobngbJbNWXkeBcMQ7EQj45ivpsY3SKg/TKHe8PcauF+XRHN6LYGFEsH9C8dsyZyl1TbtLn2wWtGDjFvlTOjOtBL7WxPcWM6yad+hRneon37FnOs9Lue82KN4fCP/YI8hx9lvEoP9gayea67qd+im8ubvFo90Phc7XXtJ6HeKf9Bq6YPGCfbDq5pkv8BFtT/jZ0UXemc3R4fKzqaC0IAcI54z+tRu3rF+kfs5/RL76Emx8R/YMEAJ
          const obj = getMockObject()

          const spyClick = vi.fn()
          const spyClickOnce0 = vi.fn()
          const spyClickOnce1 = vi.fn()

          patchEvent(obj, 'onClick', undefined, spyClick)
          patchEvent(obj, 'onClickOnce', undefined, spyClickOnce0)

          expect(spyClick).toBeCalledTimes(0)
          expect(spyClickOnce0).toBeCalledTimes(0)
          expect(spyClickOnce1).toBeCalledTimes(0)

          call(obj, getMockEvent(), 'click')
          expect(spyClick).toBeCalledTimes(1)
          expect(spyClickOnce0).toBeCalledTimes(1)
          expect(spyClickOnce1).toBeCalledTimes(0)

          patchEvent(obj, 'onClickOnce', spyClickOnce0, spyClickOnce1)

          vi.clearAllMocks()
          call(obj, getMockEvent(), 'click')
          expect(spyClick).toBeCalledTimes(1)
          expect(spyClickOnce0).toBeCalledTimes(0)
          expect(spyClickOnce1).toBeCalledTimes(0)
        })
      })
    })

    describe('@click.once.stop="v"', () => {
      let obj = getMockObject()
      const event = getMockEvent()

      const spyClick = vi.fn()
      const spyClickOnceStop = vi.fn()
      const spyClickStopOnce = vi.fn()
      const spyClickOnceStopPatch = vi.fn()
      const spyClickStopOncePatch = vi.fn()

      const spyClickOnceStopArr0 = vi.fn()
      const spyClickOnceStopArr1 = vi.fn()
      const spyClickStopOnceArr0 = vi.fn()
      const spyClickStopOnceArr1 = vi.fn()
      const spyClickOnceStopPatchArr0 = vi.fn()
      const spyClickOnceStopPatchArr1 = vi.fn()
      const spyClickStopOncePatchArr0 = vi.fn()
      const spyClickStopOncePatchArr1 = vi.fn()

      beforeAll(() => {
        obj = getMockObject()
        patchEvent(obj, 'onClick', undefined, spyClick)
        patchEvent(obj, 'onClickOnceStop', undefined, spyClickOnceStop)
        patchEvent(obj, 'onClickStopOnce', undefined, spyClickStopOnce)

        vi.clearAllMocks()
      })

      describe('v: Function, patched', () => {
        it('only fires once, only stops once', () => {
          // NOTE: See this playground for Vue's behavior in the DOM
          // https://play.vuejs.org/#eNp9ks1OwzAQhF/F8qWgVgkSnKq04kc9wAEQcPSluNvi1rEte10qRXl31g4tQa16s2e+yc4mafidc8U2Ah/zKkivHLIAGN1UGFU765E1zMOStWzpbc0GhA6EEUZaE5AZNknuxdXlQTkl9bWq7MbQALog1E7PEejGWLVQW3YrtZKbieBmOBR8ypqGprRt9j8jojW/SBHQusIaCQnu6AQnuio7tHvs/1hK5GyO9XLHwZIK0akqezX5iGOgxZZqVayDNfTimgQLLm3tlAb/4lDR4oKPWXaSN9fafj9lDX2E0V6XXyA3J/R12CVN8FcPAfwWBD94OPcrwM6evT/Djs4Hs7aLqIk+Y75BsDqmjh12H82Cave43PYxf35lVh9htkMwYb9UKprINvOC0y/xcGb1v7rXxU3OCdPy9gc+eNJe
          call(obj, event, 'click')
          expect(spyClick).toBeCalledTimes(1)
          expect(spyClickOnceStop).toBeCalledTimes(1)
          expect(spyClickStopOnce).toBeCalledTimes(1)
          expect(spyClickOnceStopPatch).toBeCalledTimes(0)
          expect(spyClickStopOncePatch).toBeCalledTimes(0)
          expect(event.stopPropagation).toBeCalled()

          patchEvent(obj, 'onClickOnceStop', spyClickOnceStop, spyClickOnceStopPatch)
          patchEvent(obj, 'onClickStopOnce', spyClickStopOnce, spyClickStopOncePatch)

          vi.clearAllMocks()
          call(obj, getMockEvent(), 'click')
          expect(spyClick).toBeCalledTimes(1)
          expect(spyClickOnceStop).toBeCalledTimes(0)
          expect(spyClickStopOnce).toBeCalledTimes(0)
          expect(spyClickOnceStopPatch).toBeCalledTimes(0)
          expect(spyClickStopOncePatch).toBeCalledTimes(0)
          expect(event.stopPropagation).toBeCalledTimes(0)
        })
      })

      describe('v: Function[], patched', () => {
        it('only fires once, only stops once', () => {
          vi.clearAllMocks()
          patchEvent(obj, 'onClickOnceStop', undefined, [spyClickOnceStopArr0, spyClickOnceStopArr1])
          patchEvent(obj, 'onClickStopOnce', undefined, [spyClickStopOnceArr0, spyClickStopOnceArr1])

          call(obj, event, 'click')
          expect(spyClick).toBeCalledTimes(1)
          expect(spyClickOnceStopArr0).toBeCalledTimes(1)
          expect(spyClickOnceStopArr1).toBeCalledTimes(1)
          expect(spyClickStopOnceArr0).toBeCalledTimes(1)
          expect(spyClickStopOnceArr1).toBeCalledTimes(1)
          expect(event.stopPropagation).toBeCalled()

          patchEvent(obj, 'onClickOnceStop', [spyClickOnceStopArr0, spyClickOnceStopArr1], [spyClickOnceStopPatchArr0, spyClickOnceStopPatchArr1])
          patchEvent(obj, 'onClickStopOnce', [spyClickStopOnceArr0, spyClickStopOnceArr1], [spyClickStopOncePatchArr0, spyClickStopOncePatchArr1])

          vi.clearAllMocks()
          call(obj, getMockEvent(), 'click')
          expect(spyClick).toBeCalledTimes(1)
          expect(spyClickOnceStopArr0).toBeCalledTimes(0)
          expect(spyClickOnceStopArr1).toBeCalledTimes(0)
          expect(spyClickStopOnceArr0).toBeCalledTimes(0)
          expect(spyClickStopOnceArr1).toBeCalledTimes(0)
          expect(spyClickOnceStopPatchArr0).toBeCalledTimes(0)
          expect(spyClickOnceStopPatchArr1).toBeCalledTimes(0)
          expect(spyClickStopOncePatchArr0).toBeCalledTimes(0)
          expect(spyClickStopOncePatchArr1).toBeCalledTimes(0)
          expect(event.stopPropagation).toBeCalledTimes(0)
        })
      })

      describe('v: OneOrMany<Function>, patched', () => {
        it('only fires once, only stops once', () => {
          patchEvent(obj, 'onClickOnceStop', undefined, [spyClickOnceStopArr0, spyClickOnceStopArr1])
          patchEvent(obj, 'onClickStopOnce', undefined, [spyClickStopOnceArr0, spyClickStopOnceArr1])

          vi.clearAllMocks()
          call(obj, event, 'click')
          expect(spyClick).toBeCalledTimes(1)
          expect(spyClickOnceStopArr0).toBeCalledTimes(1)
          expect(spyClickOnceStopArr1).toBeCalledTimes(1)
          expect(spyClickStopOnceArr0).toBeCalledTimes(1)
          expect(spyClickStopOnceArr1).toBeCalledTimes(1)
          expect(event.stopPropagation).toBeCalled()

          patchEvent(obj, 'onClickOnceStop', spyClickOnceStop, spyClickOnceStopPatch)
          patchEvent(obj, 'onClickStopOnce', spyClickStopOnce, spyClickStopOncePatch)

          vi.clearAllMocks()
          call(obj, getMockEvent(), 'click')
          expect(spyClick).toBeCalledTimes(1)
          expect(spyClickOnceStop).toBeCalledTimes(0)
          expect(spyClickStopOnce).toBeCalledTimes(0)
          expect(spyClickOnceStopPatch).toBeCalledTimes(0)
          expect(spyClickStopOncePatch).toBeCalledTimes(0)
          expect(event.stopPropagation).toBeCalledTimes(0)

          patchEvent(obj, 'onClickOnceStop', spyClickOnceStopPatch, [spyClickOnceStopPatchArr0, spyClickOnceStopPatchArr1])
          patchEvent(obj, 'onClickStopOnce', spyClickStopOncePatch, [spyClickStopOncePatchArr0, spyClickStopOncePatchArr1])

          vi.clearAllMocks()
          call(obj, getMockEvent(), 'click')
          expect(spyClick).toBeCalledTimes(1)
          expect(spyClickOnceStop).toBeCalledTimes(0)
          expect(spyClickStopOnce).toBeCalledTimes(0)
          expect(spyClickOnceStopPatch).toBeCalledTimes(0)
          expect(spyClickStopOncePatch).toBeCalledTimes(0)
          expect(spyClickOnceStopPatchArr0).toBeCalledTimes(0)
          expect(spyClickOnceStopPatchArr1).toBeCalledTimes(0)
          expect(spyClickStopOncePatchArr0).toBeCalledTimes(0)
          expect(spyClickStopOncePatchArr1).toBeCalledTimes(0)
          expect(event.stopPropagation).toBeCalledTimes(0)
        })
      })
    })

    describe('@click.self="v"', () => {
      const object = getMockObject()
      const event = getMockEvent()

      const spyClick = vi.fn()
      const spyClickSelf0 = vi.fn()
      const spyClickSelf1 = vi.fn()

      beforeEach(() => {
        vi.clearAllMocks()
        patchEvent(object, 'onClick', undefined, spyClick)
        patchEvent(object, 'onClickSelf', undefined, spyClickSelf0)
        event.currentTarget = {} as TresObject
        event.target = {} as TresObject
      })
      describe('v: Function, patched', () => {
        it('only fires if `event.target === event.currentTarget`', () => {
        // See Vue behavior in the DOM here:
        // https://play.vuejs.org/#eNp9kUFOwzAQRa9izaYgVY4iWFUBAVUXsAAELL2J0mmS1rEt2ylBVSTuwA05CWOHlixQdtb/z/Yb+wC3xvB9i7CAzGNjZO7xWijGsiplN4Wsix13KDdXAgqtnJbIpS7PZlU6OxcQSWKdydUUHfoRz9gyoKxCi+z784tpJT9YPIRwx39PTUIyyCRVSossGSnCHLyjWzZ1ybdOK5rgENhwdWNqifbJ+JosBCxYbEKXS6nfH2LmbYvzY15UWOz+ybeuC5mAZ4sO7R4FnDqf2xL9UK9eH7Gj9als9LqVRE+UL0gv1AbHAbtr1Zq0R1y0vW+Mtr5W5ZtbdR6VOw4VRAPZR14AfeNyYvQ/3Qt+GfcJ1UP/A6mCpok=
          event.currentTarget = event.target = object
          call(object, event, 'click')
          expect(spyClick).toBeCalledTimes(1)
          expect(spyClickSelf0).toBeCalledTimes(1)
          expect(spyClickSelf1).toBeCalledTimes(0)

          vi.clearAllMocks()
          patchEvent(object, 'onClickSelf', spyClickSelf0, spyClickSelf1)
          call(object, getMockEvent(), 'click')
          expect(spyClick).toBeCalledTimes(1)
          expect(spyClickSelf0).toBeCalledTimes(0)
          expect(spyClickSelf1).toBeCalledTimes(1)
        })
      })
      describe('v: Function[], patched', () => {
        it('only fires if `event.target === event.currentTarget`', () => {
          vi.clearAllMocks()
          patchEvent(object, 'onClickSelf', undefined, [spyClickSelf0, spyClickSelf1])
          call(object, getMockEvent(), 'click')
          expect(spyClick).toBeCalledTimes(1)
          expect(spyClickSelf0).toBeCalledTimes(1)
          expect(spyClickSelf1).toBeCalledTimes(1)

          vi.clearAllMocks()
          patchEvent(object, 'onClickSelf', undefined, [spyClickSelf1, spyClickSelf0])
          call(object, getMockEvent(), 'click')
          expect(spyClick).toBeCalledTimes(1)
          expect(spyClickSelf0).toBeCalledTimes(1)
          expect(spyClickSelf1).toBeCalledTimes(1)
        })
      })
      describe('v: OneOrMany<Function>, patched', () => {
        it('only fires if `event.target === event.currentTarget`', () => {
          vi.clearAllMocks()
          patchEvent(object, 'onClickSelf', undefined, spyClickSelf1)
          call(object, getMockEvent(), 'click')
          expect(spyClick).toBeCalledTimes(1)
          expect(spyClickSelf0).toBeCalledTimes(0)
          expect(spyClickSelf1).toBeCalledTimes(1)

          vi.clearAllMocks()
          patchEvent(object, 'onClickSelf', undefined, [spyClickSelf1, spyClickSelf0])
          call(object, getMockEvent(), 'click')
          expect(spyClick).toBeCalledTimes(1)
          expect(spyClickSelf0).toBeCalledTimes(1)
          expect(spyClickSelf1).toBeCalledTimes(1)

          vi.clearAllMocks()
          patchEvent(object, 'onClickSelf', undefined, spyClickSelf0)
          call(object, getMockEvent(), 'click')
          expect(spyClick).toBeCalledTimes(1)
          expect(spyClickSelf0).toBeCalledTimes(1)
          expect(spyClickSelf1).toBeCalledTimes(0)
        })
      })
    })

    describe('surprising (perhaps) behavior', () => {
      // NOTE: Vue's behavior in the DOM
      // https://play.vuejs.org/#eNqdVU1z0zAQ/Ss74lCYZuIycErdDJTpoRxIh3D0xbHkRI0taSQ5NePxf2clx3LIhyk9RXraXe97+5GGfFVquqsYmZHYZJorC4bZSs0TwUsltYUGNMuhhVzLEq7Q9CoRicikMBbEU6qZsHDnbN7ffAj4QmTsPLrc8PyMg4fPey2tVOfRka9c9Bn7/pFXHHWKoBZ4saxURWoZ3gBiynfwJSt4tr1LyF6G6+uEzOG+Wq0KRmfQNEGftoV4pSHyvp33/oiXVWWtFPtoU4nZu5COhQ84wD6i59y2cdS5XQpjkIoL4ygdhHGwD+OpnoSJoyGzv5NU88ccjNeOGxDSApUvYgKbVNCC6R7M0gK5T1EECz5lxFm9SStjEY4j11cXaU99/J68r8iRAp1F0KGr5SvEcHZB2dBqh7oEi06d0I3/JdFCU5SCStaJUaZbBilQnucM2wCjbfB3NqKCK8+Q577Dj8p3kGU/Av9WoBNv3xP9gJyI2zdHmKC3sn8j81D/MKjH3If6D7P82vqHkehH/aT+w3SEbTCiQH+Ko4PVgFdjfxfu6FZEg1LoNRcz+Hij6ltQKaVcrPvrSjrN8KZqMLLgFN5RSm+h9cvHxyETYg0uqZyvp89GClzUjft6QjJZKo6zt1CW4xJLCK6cLseE4BjKl+8es7pikx7PNizbnsGfTe2whDxpZpjesYSEN4sMmO2eH5Y/WI3n8FhKWhVoPfL4kyG1yuXYmd1XfmUc2PlsH/3fDYrzyzzUlgnTk3KJOsvW2ycE/4K+jVAf0v00/ez9EtGS9g+WiVFI
      describe('event modifier order', () => {
        describe('@click.stop.shift="..."', () => {
          it('always stops', () => {
            const obj = getMockObject()
            const event = getMockEvent()
            const spyClick = vi.fn()

            patchEvent(obj, 'onClickStopShift', undefined, spyClick)

            call(obj, event, 'click')
            expect(event.stopPropagation).toBeCalledTimes(1)

            call(obj, event, 'click')
            expect(event.stopPropagation).toBeCalledTimes(2)
          })
        })
        describe('@click.shift.stop="..."', () => {
          it('only stops if shift is down', () => {
            const obj = getMockObject()
            const event = getMockEvent()
            const spyClick = vi.fn()

            patchEvent(obj, 'onClickShiftStop', undefined, spyClick)

            call(obj, event, 'click')
            expect(event.stopPropagation).toBeCalledTimes(0)

            event.nativeEvent.shiftKey = true
            call(obj, event, 'click')
            expect(event.stopPropagation).toBeCalledTimes(1)

            event.nativeEvent.shiftKey = false
            call(obj, event, 'click')
            expect(event.stopPropagation).toBeCalledTimes(1)
          })
        })
        describe('@click.once.shift="..."', () => {
          it('never fires if shift is not down on the first call', () => {
            const obj = getMockObject()
            const event = getMockEvent()
            const spyClick = vi.fn()

            event.nativeEvent.shiftKey = false
            patchEvent(obj, 'onClickOnceShift', undefined, spyClick)

            call(obj, getMockEvent(), 'click')
            expect(spyClick).toBeCalledTimes(0)

            event.nativeEvent.shiftKey = true
            call(obj, getMockEvent(), 'click')
            call(obj, getMockEvent(), 'click')
            call(obj, getMockEvent(), 'click')
            call(obj, getMockEvent(), 'click')
            call(obj, getMockEvent(), 'click')
            expect(spyClick).toBeCalledTimes(0)
          })
          it('fires if `nativeEvent.shiftKey` on first click', () => {
            const obj = getMockObject()
            const event = getMockEvent()
            const spyClick = vi.fn()

            event.nativeEvent.shiftKey = true
            patchEvent(obj, 'onClickOnceShift', undefined, spyClick)

            call(obj, event, 'click')
            expect(spyClick).toBeCalledTimes(1)
          })
        })
      })
    })
  })
  describe('events with mouse modifiers', () => {
    // NOTE: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
    describe('@click.left="..."', () => {
      it('fires if `nativeEvent.button === 0`', () => {
        const obj = getMockObject()
        const event = getMockEvent()
        const spyClick = vi.fn()
        patchEvent(obj, 'onClickLeft', undefined, spyClick)

        event.nativeEvent.button = 2
        call(obj, event, 'click')
        expect(spyClick).toBeCalledTimes(0)

        event.nativeEvent.button = 1
        call(obj, event, 'click')
        expect(spyClick).toBeCalledTimes(0)

        event.nativeEvent.button = 0
        call(obj, event, 'click')
        expect(spyClick).toBeCalledTimes(1)
      })
    })

    describe('@click.middle ="..."', () => {
      it('fires if `nativeEvent.button === 1`', () => {
        const obj = getMockObject()
        const event = getMockEvent()
        const spyClick = vi.fn()
        patchEvent(obj, 'onClickMiddle', undefined, spyClick)

        event.nativeEvent.button = 2
        call(obj, event, 'click')
        expect(spyClick).toBeCalledTimes(0)

        event.nativeEvent.button = 0
        call(obj, event, 'click')
        expect(spyClick).toBeCalledTimes(0)

        event.nativeEvent.button = 1
        call(obj, event, 'click')
        expect(spyClick).toBeCalledTimes(1)
      })
    })

    describe('@click.right="..."', () => {
      it('fires if `nativeEvent.button === 2`', () => {
        const obj = getMockObject()
        const event = getMockEvent()
        const spyClick = vi.fn()
        patchEvent(obj, 'onClickRight', undefined, spyClick)

        event.nativeEvent.button = 0
        call(obj, event, 'click')
        expect(spyClick).toBeCalledTimes(0)

        event.nativeEvent.button = 1
        call(obj, event, 'click')
        expect(spyClick).toBeCalledTimes(0)

        event.nativeEvent.button = 2
        call(obj, event, 'click')
        expect(spyClick).toBeCalledTimes(1)
      })
    })

    describe('@click.left.shift="..."', () => {
      it('fires if `nativeEvent.button === 0 && nativeEvent.shiftKey`', () => {
        const obj = getMockObject()
        const event = getMockEvent()
        const spyClick = vi.fn()
        patchEvent(obj, 'onClickLeftShift', undefined, spyClick)

        event.nativeEvent.button = 0
        event.nativeEvent.shiftKey = false
        call(obj, event, 'click')
        expect(spyClick).toBeCalledTimes(0)

        event.nativeEvent.button = 1
        event.nativeEvent.shiftKey = true
        call(obj, event, 'click')
        expect(spyClick).toBeCalledTimes(0)

        event.nativeEvent.button = 0
        event.nativeEvent.shiftKey = true
        call(obj, event, 'click')
        expect(spyClick).toBeCalledTimes(1)
      })
    })
  })

  describe('events with system (keyboard) modifiers', () => {
    describe('@click.exact="..."', () => {
      it('fires if no system modifiers are pressed', () => {
        const obj = getMockObject()
        const event = getMockEvent()
        const spyClick = vi.fn()
        patchEvent(obj, 'onClickExact', undefined, spyClick)

        event.nativeEvent.ctrlKey = true
        event.nativeEvent.shiftKey = false
        event.nativeEvent.altKey = false
        event.nativeEvent.metaKey = false
        call(obj, event, 'click')
        expect(spyClick).toBeCalledTimes(0)

        event.nativeEvent.ctrlKey = false
        event.nativeEvent.shiftKey = true
        event.nativeEvent.altKey = false
        event.nativeEvent.metaKey = false
        call(obj, event, 'click')
        expect(spyClick).toBeCalledTimes(0)

        event.nativeEvent.ctrlKey = false
        event.nativeEvent.shiftKey = false
        event.nativeEvent.altKey = true
        event.nativeEvent.metaKey = false
        call(obj, event, 'click')

        event.nativeEvent.ctrlKey = false
        event.nativeEvent.shiftKey = false
        event.nativeEvent.altKey = false
        event.nativeEvent.metaKey = true
        call(obj, event, 'click')
        expect(spyClick).toBeCalledTimes(0)

        event.nativeEvent.ctrlKey = false
        event.nativeEvent.shiftKey = false
        event.nativeEvent.altKey = false
        event.nativeEvent.metaKey = false
        call(obj, event, 'click')
        expect(spyClick).toBeCalledTimes(1)
      })
    })

    describe('@click.shift="..."', () => {
      it('fires if `nativeEvent.shiftKey === true`', () => {
        const obj = getMockObject()
        const event = getMockEvent()
        const spyClick = vi.fn()
        patchEvent(obj, 'onClickShift', undefined, spyClick)

        event.nativeEvent.shiftKey = false
        call(obj, event, 'click')
        expect(spyClick).toBeCalledTimes(0)

        event.nativeEvent.shiftKey = true
        call(obj, event, 'click')
        expect(spyClick).toBeCalledTimes(1)
      })
    })
    describe('@click.ctrl="..."', () => {
      it('fires if `nativeEvent.ctrlKey === true`', () => {
        const obj = getMockObject()
        const event = getMockEvent()
        const spyClick = vi.fn()
        patchEvent(obj, 'onClickCtrl', undefined, spyClick)

        event.nativeEvent.ctrlKey = false
        call(obj, event, 'click')
        expect(spyClick).toBeCalledTimes(0)

        event.nativeEvent.ctrlKey = true
        call(obj, event, 'click')
        expect(spyClick).toBeCalledTimes(1)
      })
    })
    describe('@click.alt="..."', () => {
      it('fires if `nativeEvent.altKey === true`', () => {
        const obj = getMockObject()
        const event = getMockEvent()
        const spyClick = vi.fn()
        patchEvent(obj, 'onClickAlt', undefined, spyClick)

        event.nativeEvent.altKey = false
        call(obj, event, 'click')
        expect(spyClick).toBeCalledTimes(0)

        event.nativeEvent.altKey = true
        call(obj, event, 'click')
        expect(spyClick).toBeCalledTimes(1)
      })
    })

    describe('@click.meta="..."', () => {
      it('fires if `nativeEvent.metaKey === true`', () => {
        const obj = getMockObject()
        const event = getMockEvent()
        const spyClick = vi.fn()
        patchEvent(obj, 'onClickMeta', undefined, spyClick)

        event.nativeEvent.metaKey = false
        call(obj, event, 'click')
        expect(spyClick).toBeCalledTimes(0)

        event.nativeEvent.metaKey = true
        call(obj, event, 'click')
        expect(spyClick).toBeCalledTimes(1)
      })
    })

    describe('@click.shift.meta="..."', () => {
      it('fires if `!!nativeEvent.shiftKey && !!nativeEvent.metaKey`', () => {
        const obj = getMockObject()
        const event = getMockEvent()
        const spyClick = vi.fn()
        patchEvent(obj, 'onClickShiftMeta', undefined, spyClick)

        event.nativeEvent.shiftKey = true
        event.nativeEvent.metaKey = false
        call(obj, event, 'click')
        expect(spyClick).toBeCalledTimes(0)

        event.nativeEvent.shiftKey = false
        event.nativeEvent.metaKey = true
        call(obj, event, 'click')
        expect(spyClick).toBeCalledTimes(0)

        event.nativeEvent.shiftKey = true
        event.nativeEvent.metaKey = true
        call(obj, event, 'click')
        expect(spyClick).toBeCalledTimes(1)
      })
    })

    describe('@click.shift.meta.exact="..."', () => {
      // NOTE: https://vuejs.org/guide/essentials/event-handling.html#exact-modifier
      it('fires if `!!nativeEvent.shiftKey && !!nativeEvent.metaKey` and other system modifiers are `false`', () => {
        const obj = getMockObject()
        const event = getMockEvent()
        const spyClick = vi.fn()
        patchEvent(obj, 'onClickShiftMetaExact', undefined, spyClick)

        event.nativeEvent.shiftKey = true
        event.nativeEvent.metaKey = false
        event.nativeEvent.altKey = false
        call(obj, event, 'click')
        expect(spyClick).toBeCalledTimes(0)

        event.nativeEvent.shiftKey = false
        event.nativeEvent.metaKey = true
        event.nativeEvent.altKey = false
        call(obj, event, 'click')
        expect(spyClick).toBeCalledTimes(0)

        event.nativeEvent.shiftKey = true
        event.nativeEvent.metaKey = true
        event.nativeEvent.altKey = true
        call(obj, event, 'click')
        expect(spyClick).toBeCalledTimes(0)

        event.nativeEvent.shiftKey = true
        event.nativeEvent.metaKey = true
        event.nativeEvent.altKey = false
        call(obj, event, 'click')
        expect(spyClick).toBeCalledTimes(1)
      })
    })
  })

  describe('isThreeStyleDomEvent', () => {
    it('returns `true` for all `const.THREE_EVENT_NAMES`', () => {
      for (const str of THREE_EVENT_NAMES) {
        expect(isVueEventName(str)).toBe(true)
      }
    })
    it('returns `true` for all `const.THREE_EVENT_NAMES` + all single event modifiers', () => {
      for (const baseName of THREE_EVENT_NAMES) {
        for (const eventModifier of EVENT_MODIFIERS) {
          expect(isVueEventName(baseName + eventModifier)).toBe(true)
        }
      }
    })
    it('returns `true` for all `const.THREE_EVENT_NAMES` + 2 event modifiers', () => {
      for (const baseName of THREE_EVENT_NAMES) {
        for (const eventModifier0 of EVENT_MODIFIERS) {
          for (const eventModifier1 of EVENT_MODIFIERS) {
            expect(isVueEventName(baseName + eventModifier0 + eventModifier1)).toBe(true)
          }
        }
      }
    })
    it('returns `false` for the empty string', () => {
      expect(isVueEventName('')).toBe(false)
    })
    it('returns `false` for THREE.Object3D methods', () => {
      // NOTE: Object3D methods: https://threejs.org/docs/#api/en/core/Object3D
      for (const threeMethodName of 'onAfterRender|onAfterShadow|onBeforeRender|onBeforeShadow'.split('|')) {
        expect(isVueEventName(threeMethodName)).toBe(false)
      }
    })
    it('returns `false` for deprecated onEventName-style event names', () => {
      // NOTE: See ./deprecatedEvents.ts
      for (const threeMethodName of 'onDoubleClick|onPointerMissed|onContextMenu|onPointerUp|onPointerDown'.split('|')) {
        expect(isVueEventName(threeMethodName)).toBe(false)
      }
    })
  })

  describe('patchEvent(el, rawName, prevValue, nextValue)', () => {
    describe('implementation', () => {
      it('puts `nextValue` into `el.__tres.handlers[rawName].value`', () => {
        const spy0 = vi.fn()
        const spy1 = vi.fn()
        const spy2 = vi.fn()
        const spy3 = vi.fn()
        const obj = getMockObject()
        patchEvent(obj, 'onClick', undefined, spy0)
        expect(obj.__tres.handlers.onClick.value).toBe(spy0)

        patchEvent(obj, 'onClickSelf', undefined, spy1)
        expect(obj.__tres.handlers.onClickSelf.value).toBe(spy1)

        patchEvent(obj, 'onClickCapture', undefined, spy2)
        expect(obj.__tres.handlers.onClickCapture.value).toBe(spy2)

        patchEvent(obj, 'onClickCaptureOnce', undefined, spy3)
        expect(obj.__tres.handlers.onClickCaptureOnce.value).toBe(spy3)
      })

      it('creates an `(event) => void` at `el[eventname]`', () => {
        const obj = getMockObject()
        patchEvent(obj, 'onClick', undefined, vi.fn())
        expect(typeof obj.onClick).toBe('function')

        patchEvent(obj, 'onPointerupSelfPrevent', undefined, vi.fn())
        expect(typeof obj.onPointerup).toBe('function')
      })

      it('creates an `(event) => void` at `el.__tres[eventname]` that fires all "eventname" functions', () => {
        const obj = getMockObject()

        const spyClick = vi.fn()
        const spyClickStop = vi.fn()
        const spyClickPrevent = vi.fn()
        const spyClickOnce = vi.fn()

        patchEvent(obj, 'onClick', undefined, spyClick)
        call(obj, getMockEvent(), 'click')
        expect(spyClick).toBeCalledTimes(1)
        expect(spyClickStop).toBeCalledTimes(0)
        expect(spyClickPrevent).toBeCalledTimes(0)
        expect(spyClickOnce).toBeCalledTimes(0)

        vi.clearAllMocks()
        patchEvent(obj, 'onClickStop', undefined, spyClickStop)
        patchEvent(obj, 'onClickPrevent', undefined, spyClickPrevent)

        call(obj, getMockEvent(), 'click')
        expect(spyClick).toBeCalledTimes(1)
        expect(spyClickStop).toBeCalledTimes(1)
        expect(spyClickPrevent).toBeCalledTimes(1)
        expect(spyClickOnce).toBeCalledTimes(0)

        vi.clearAllMocks()
        patchEvent(obj, 'onClickOnce', undefined, spyClickOnce)

        call(obj, getMockEvent(), 'click')
        expect(spyClick).toBeCalledTimes(1)
        expect(spyClickStop).toBeCalledTimes(1)
        expect(spyClickPrevent).toBeCalledTimes(1)
        expect(spyClickOnce).toBeCalledTimes(1)
      })
      it('removes the function if `nextValue` is `null` or `undefined`', () => {
        // NOTE: See this playground for Vue's behavior in the DOM
        // https://play.vuejs.org/#eNqNU8tu2zAQ/JUFL0oAQ67RngRJfQQ+tAenaHPkRZFXthKKJPhwHAj69yyphxMgCHISd3d2dmYp9uyn1unJI8tYbmvTagcWndcll22nlXHQg8EGBmiM6iAhaMIll7WS1lHFeuGgCJCrZKemRHI9Axr5hao9yKrDDBIKkxWcKuEpurqGooz0oSeNWQJHEM0bLhybtxybz3BsJo4LyyST6Bd59qnSlJ5YuASCLSTzMQ2DoShmad+joix445Im5OtxcbQyChx2WlQOKQLIdbm7vdtmcCPa+rGVB+Csq57vEYyXnIE9Ki/2oKR4Dhk61LgCPKGEtgF3RGi8rF2rKLZRrcZ9mq/D9RD7vXeOSj/qwJ6G5oKzWTZn5TIK+j7YiUaGIV+Pje+QUH+YQr3h8xZ43JREM115YKFEcP/KMVsxZ2m1TXtIH6yS9FfFrXJWq063As2tDm4sZ9m471CrhFBPf2LOGY+rOV8fsX58J/9gzyHH2V8Sg+ZEVpeaq8wB3Vje/t/hmc5LsVN7Lwj9QfEfWiV80DjCfnm5J9mvcFHt7/g26ELv7PbsUNrZVBAakEPEc0bv5eYD6xe5X9NvsY9+KTa8ABkdL2A=
        const obj = getMockObject()

        const spyClick = vi.fn()
        const spyClickStop = vi.fn()

        patchEvent(obj, 'onClick', undefined, spyClick)
        patchEvent(obj, 'onClickStop', undefined, spyClickStop)

        call(obj, getMockEvent(), 'click')
        expect(spyClick).toBeCalledTimes(1)
        expect(spyClickStop).toBeCalledTimes(1)

        patchEvent(obj, 'onClick', spyClick, null)
        patchEvent(obj, 'onClickStop', spyClickStop, undefined)

        vi.clearAllMocks()
        call(obj, getMockEvent(), 'click')
        expect(spyClick).toBeCalledTimes(0)
        expect(spyClickStop).toBeCalledTimes(0)
      })

      it('sets the function if `nextValue` is a function', () => {
        // NOTE: See this playground for Vue's behavior in the DOM
        // https://play.vuejs.org/#eNqNU8tu2zAQ/JUFL0oAQ67RngRJfQQ+tAenaHPkRZFXthKKJPhwHAj69yyphxMgCHISd3d2dmYp9uyn1unJI8tYbmvTagcWndcll22nlXHQg8EGBmiM6iAhaMIll7WS1lHFeuGgCJCrZKemRHI9Axr5hao9yKrDDBIKkxWcKuEpurqGooz0oSeNWQJHEM0bLhybtxybz3BsJo4LyyST6Bd59qnSlJ5YuASCLSTzMQ2DoShmad+joix445Im5OtxcbQyChx2WlQOKQLIdbm7vdtmcCPa+rGVB+Csq57vEYyXnIE9Ki/2oKR4Dhk61LgCPKGEtgF3RGi8rF2rKLZRrcZ9mq/D9RD7vXeOSj/qwJ6G5oKzWTZn5TIK+j7YiUaGIV+Pje+QUH+YQr3h8xZ43JREM115YKFEcP/KMVsxZ2m1TXtIH6yS9FfFrXJWq063As2tDm4sZ9m471CrhFBPf2LOGY+rOV8fsX58J/9gzyHH2V8Sg+ZEVpeaq8wB3Vje/t/hmc5LsVN7Lwj9QfEfWiV80DjCfnm5J9mvcFHt7/g26ELv7PbsUNrZVBAakEPEc0bv5eYD6xe5X9NvsY9+KTa8ABkdL2A=
        const obj = getMockObject()

        const spyClickStop0 = vi.fn()
        const spyClickStop1 = vi.fn()

        patchEvent(obj, 'onClickStop', undefined, spyClickStop0)

        call(obj, getMockEvent(), 'click')
        expect(spyClickStop0).toBeCalledTimes(1)
        expect(spyClickStop1).toBeCalledTimes(0)

        vi.clearAllMocks()
        patchEvent(obj, 'onClickStop', spyClickStop0, spyClickStop1)
        call(obj, getMockEvent(), 'click')
        expect(spyClickStop0).toBeCalledTimes(0)
        expect(spyClickStop1).toBeCalledTimes(1)
      })

      it('sets the function if `nextValue` is an array of functions', () => {
        const obj = getMockObject()

        const spyClickStop0 = vi.fn()
        const spyClickStop1 = vi.fn()
        const spyClickStop2 = vi.fn()

        patchEvent(obj, 'onClickStop', undefined, spyClickStop0)

        call(obj, getMockEvent(), 'click')
        expect(spyClickStop0).toBeCalledTimes(1)
        expect(spyClickStop1).toBeCalledTimes(0)

        vi.clearAllMocks()
        patchEvent(obj, 'onClickStop', spyClickStop0, [spyClickStop1, spyClickStop2])
        call(obj, getMockEvent(), 'click')
        expect(spyClickStop0).toBeCalledTimes(0)
        expect(spyClickStop1).toBeCalledTimes(1)
        expect(spyClickStop2).toBeCalledTimes(1)
      })
    })
  })
})

function getMockObject() {
  return { __tres: { } } as TresInstance
}

function getMockEvent(): Partial<IntersectionEvent<any>> {
  return { stopPropagation: vi.fn(), nativeEvent: { preventDefault: vi.fn() } }
}

function call(el: TresObject, event, eventName: string) {
  const threeName = `on${capitalize(eventName)}`
  el[threeName]?.(event)
}
