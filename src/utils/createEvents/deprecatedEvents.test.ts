import { describe, expect, it } from 'vitest'
import { deprecatedEventsToNewEvents } from './deprecatedEvents'

describe('deprecatedEvents', () => {
  describe('transforms `onEventName`-style names to `onEventname`-style', () => {
    it('supports `onClick`', () => {
      expect(deprecatedEventsToNewEvents('onClick')).toBe('onClick')
    })
    it('supports `onContextMenu`', () => {
      expect(deprecatedEventsToNewEvents('onContextMenu')).toBe('onContextmenu')
    })
    it('supports `onDoubleClick`', () => {
      expect(deprecatedEventsToNewEvents('onDoubleClick')).toBe('onDblclick')
    })
    it('supports `onPointerUp`', () => {
      expect(deprecatedEventsToNewEvents('onPointerUp')).toBe('onPointerup')
    })
    it('supports `onPointerOver`', () => {
      expect(deprecatedEventsToNewEvents('onPointerOver')).toBe('onPointerover')
    })
    it('supports `onPointerOut`', () => {
      expect(deprecatedEventsToNewEvents('onPointerOut')).toBe('onPointerout')
    })
    it('supports `onPointerEnter`', () => {
      expect(deprecatedEventsToNewEvents('onPointerEnter')).toBe('onPointerenter')
    })
    it('supports `onPointerLeave`', () => {
      expect(deprecatedEventsToNewEvents('onPointerLeave')).toBe('onPointerleave')
    })
    it('supports `onPointerMove`', () => {
      expect(deprecatedEventsToNewEvents('onPointerMove')).toBe('onPointermove')
    })
    it('supports `onPointerMissed`', () => {
      expect(deprecatedEventsToNewEvents('onPointerMissed')).toBe('onPointermissed')
    })
    it('supports `onLostPointerCapture`', () => {
      expect(deprecatedEventsToNewEvents('onLostPointerCapture')).toBe('onLostpointercapture')
    })
  })
  describe('eventModifiers', () => {
    it('supports `onPointerDownSelf`', () => {
      expect(deprecatedEventsToNewEvents('onPointerDownSelf')).toBe('onPointerdownSelf')
    })
    it('supports `onClickSelfStopPrevent`', () => {
      expect(deprecatedEventsToNewEvents('onClickSelfStopPrevent')).toBe('onClickSelfStopPrevent')
    })
    it('supports `onPointerMovePreventOnce`', () => {
      expect(deprecatedEventsToNewEvents('onPointerMovePreventOnce')).toBe('onPointermovePreventOnce')
    })
  })
})
