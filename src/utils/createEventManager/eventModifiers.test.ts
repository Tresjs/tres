import { describe, expect, it, vi } from 'vitest'
import { capitalize } from 'vue'
import { THREE_EVENT_NAMES } from './const'
import { EVENT_MODIFIERS, isVueEventName, parseName, patchEvent } from './eventModifiers'
import type { TresInstance, TresObject } from '../../types'

describe('eventModifiers', () => {
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

  describe('parseName', () => {
    it('returns `[\'eventname\', undefined]` for \'onEventname\'', () => {
      expect(parseName('onEventname')).toStrictEqual(['eventname', undefined])
      for (const str of THREE_EVENT_NAMES) {
        expect(parseName(str)[0]).toBe(str.toLowerCase().slice(2))
        expect(parseName(str)[1]).toBeUndefined()
      }
    })

    it('returns `[\'eventname\', Record<lowercaseModifier: true>]` if modifiers are present', () => {
      for (const baseName of THREE_EVENT_NAMES) {
        for (const eventModifier0 of EVENT_MODIFIERS) {
          for (const eventModifier1 of EVENT_MODIFIERS) {
            const eventName = baseName.toLowerCase().slice(2)
            const modifiers = {}
            modifiers[eventModifier0.toLowerCase()] = true
            modifiers[eventModifier1.toLowerCase()] = true
            expect(parseName(baseName + eventModifier0 + eventModifier1)).toStrictEqual([eventName, modifiers])
          }
        }
      }
    })
  })

  describe('patchEvent(el, rawName, prevValue, nextValue): implementation', () => {
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

    it('@click.once only fires once', () => {
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

    it('@click.once only fires once, even if patched', () => {
      // NOTE: See this playground for Vue's behavior in the DOM
      // https://play.vuejs.org/#eNqNU8tu2zAQ/JUFL0oAQ67RngRJfQQ+tAenaHPkRZFXthKKJPhwHAj69yyphxMgCHISd3d2dmYp9uyn1unJI8tYbmvTagcWndcll22nlXHQg8EGBmiM6iAhaMIll7WS1lHFeuGgCJCrZKemRHI9Axr5hao9yKrDDBIKkxWcKuEpurqGooz0oSeNWQJHEM0bLhybtxybz3BsJo4LyyST6Bd59qnSlJ5YuASCLSTzMQ2DoShmad+joix445Im5OtxcbQyChx2WlQOKQLIdbm7vdtmcCPa+rGVB+Csq57vEYyXnIE9Ki/2oKR4Dhk61LgCPKGEtgF3RGi8rF2rKLZRrcZ9mq/D9RD7vXeOSj/qwJ6G5oKzWTZn5TIK+j7YiUaGIV+Pje+QUH+YQr3h8xZ43JREM115YKFEcP/KMVsxZ2m1TXtIH6yS9FfFrXJWq063As2tDm4sZ9m471CrhFBPf2LOGY+rOV8fsX58J/9gzyHH2V8Sg+ZEVpeaq8wB3Vje/t/hmc5LsVN7Lwj9QfEfWiV80DjCfnm5J9mvcFHt7/g26ELv7PbsUNrZVBAakEPEc0bv5eYD6xe5X9NvsY9+KTa8ABkdL2A=
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
    it('@click.once.stop only fires once, only stops once, even if patched', () => {
      // NOTE: See this playground for Vue's behavior in the DOM
      // https://play.vuejs.org/#eNqNks1uwjAQhF9l5UtBoATSnlBA/RGH9tBWbY++QFhoILEt20mRIr971wmkQbSoN3v22/Gs7YrdKRWUBbIJi02iU2XBoC3UjIs0V1JbqEDjGhystczhitArLhIpjAUxgqkv9kb9VhqfS9GZlGRpsvPNvT5MZ3SCGAXlIitwMAB3Anm7Fhr/AfkDWijqQnHYzETT0MZirrKFRdoBxKu0hNu6f8pZk4izmRhNoPKBwLl4qSFs4GVhrRQHPjBWqkCKBI+dY+qkrkNk5yAMQ8rbWHkhDhuHf7lFHbeodYsaNy+cuoU0Ca3isDMfGzJr6IrW6SbYGinoeSsP0wkyV2mG+kXZlK6QM7L1FV9bZJn8eqo1qwscHvXkE5PdL/rW7L3G2atGg7pEztqaXegN2qY8f3/GPa3bYi5XRUb0heIbGpkVPmOD3RdiRbE7XJ32sf6kqdh8mPneojDHoXxQT7qa54w+7sOF0X/iXgc3dR8Xjrlv9t0D8A==

      const obj = getMockObject()
      const event = getMockEvent()

      const spyClick = vi.fn()
      const spyClickOnceStop = vi.fn()
      const spyClickStopOnce = vi.fn()
      const spyClickOnceStopPatch = vi.fn()
      const spyClickStopOncePatch = vi.fn()

      patchEvent(obj, 'onClick', undefined, spyClick)
      patchEvent(obj, 'onClickOnceStop', undefined, spyClickOnceStop)
      patchEvent(obj, 'onClickStopOnce', undefined, spyClickStopOnce)

      expect(spyClick).toBeCalledTimes(0)
      expect(spyClickOnceStop).toBeCalledTimes(0)
      expect(spyClickStopOnce).toBeCalledTimes(0)
      expect(spyClickOnceStopPatch).toBeCalledTimes(0)
      expect(spyClickStopOncePatch).toBeCalledTimes(0)
      expect(event.stopPropagation).toBeCalledTimes(0)

      vi.clearAllMocks()
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

function getMockObject() {
  return { __tres: { } } as TresInstance
}

function getMockEvent() {
  return { stopPropagation: vi.fn(), nativeEvent: { preventDefault: vi.fn() } }
}

function call(el: TresObject, event, eventName: string) {
  const threeName = `on${capitalize(eventName)}`
  el[threeName]?.(event)
}
