import { useRafFn } from '@vueuse/core'
import { type MaybeRefOrGetter, reactive, toValue } from 'vue'

const STICK_DEADZONE = 0.15
const TRIGGER_DEADZONE = 0.05

export interface CarGamepadOptions {
  /** Multiplier on stick steering (and air yaw), clamped to ±1 */
  steerSensitivity?: MaybeRefOrGetter<number>
  /** 0 = linear, 1 = cubic; softens the stick center for fine corrections */
  steerExpo?: MaybeRefOrGetter<number>
  stickDeadzone?: MaybeRefOrGetter<number>
}

// Standard gamepad mapping indices (https://w3c.github.io/gamepad/#remapping)
const BTN = {
  a: 0,
  b: 1,
  x: 2,
  y: 3,
  lb: 4,
  rb: 5,
  lt: 6,
  rt: 7,
  back: 8,
} as const

/** Rescale past the deadzone so small inputs stay smooth instead of jumping */
function applyDeadzone(value: number, deadzone: number) {
  const magnitude = Math.abs(value)
  if (magnitude < deadzone) { return 0 }
  return (Math.sign(value) * (magnitude - deadzone)) / (1 - deadzone)
}

/** Blend linear → cubic: keeps the endpoints, flattens the center */
function applyExpo(value: number, expo: number) {
  return (1 - expo) * value + expo * value ** 3
}

/**
 * RL-style bindings for a standard-mapping pad (EasySMX X20 etc.):
 * RT throttle, LT brake/reverse, left stick steer + air pitch/yaw,
 * A jump, B/RB boost, LB powerslide/air-roll mod, Y ball cam,
 * X rear view (hold), Select reset.
 *
 * Polls navigator.getGamepads() per frame instead of VueUse's useGamepad:
 * its RAF update writes to gamepads[gamepad.index] but connect pushes to the
 * array end, so any pad with index > 0 freezes on its connect-time snapshot.
 */
export function useCarGamepad(options: CarGamepadOptions = {}) {
  const state = reactive({
    connected: false,
    id: '',
    mapping: '',
    /** forward = -1, reverse = +1 (same sign convention as the keyboard axes) */
    forward: 0,
    /** air pitch from stick Y: up = nose down = -1, matching W on keyboard */
    pitch: 0,
    /** left = +1 (stick left reports -1 on the horizontal axis) */
    right: 0,
    boost: false,
    slide: false,
    jumpHeld: false,
    ballCamPressed: false,
    rearViewHeld: false,
    resetHeld: false,
    // Raw values for the on-screen indicator
    throttle: 0,
    brake: 0,
    stickX: 0,
    stickY: 0,
    pressedButtons: [] as number[],
  })

  function clear() {
    state.connected = false
    state.id = ''
    state.mapping = ''
    state.forward = 0
    state.pitch = 0
    state.right = 0
    state.boost = false
    state.slide = false
    state.jumpHeld = false
    state.ballCamPressed = false
    state.rearViewHeld = false
    state.resetHeld = false
    state.throttle = 0
    state.brake = 0
    state.stickX = 0
    state.stickY = 0
    if (state.pressedButtons.length) { state.pressedButtons = [] }
  }

  useRafFn(() => {
    const pads = navigator.getGamepads?.() ?? []
    const pad = pads.find(p => p?.connected && p.mapping === 'standard')
      ?? pads.find(p => p?.connected)

    if (!pad) {
      clear()
      return
    }

    const button = (index: number) => pad.buttons[index]?.pressed ?? false
    const value = (index: number) => pad.buttons[index]?.value ?? 0

    state.connected = true
    state.id = pad.id
    state.mapping = pad.mapping

    const deadzone = toValue(options.stickDeadzone) ?? STICK_DEADZONE
    const sensitivity = toValue(options.steerSensitivity) ?? 1
    const expo = toValue(options.steerExpo) ?? 0

    state.throttle = applyDeadzone(value(BTN.rt), TRIGGER_DEADZONE)
    state.brake = applyDeadzone(value(BTN.lt), TRIGGER_DEADZONE)
    state.stickX = applyDeadzone(pad.axes[0] ?? 0, deadzone)
    state.stickY = applyDeadzone(pad.axes[1] ?? 0, deadzone)

    state.forward = state.brake - state.throttle
    state.pitch = applyExpo(state.stickY, expo)
    state.right = Math.max(-1, Math.min(1, -applyExpo(state.stickX, expo) * sensitivity))
    state.boost = button(BTN.b) || button(BTN.rb)
    state.slide = button(BTN.lb)
    state.jumpHeld = button(BTN.a)
    state.ballCamPressed = button(BTN.y)
    state.rearViewHeld = button(BTN.x)
    state.resetHeld = button(BTN.back)

    const pressed = pad.buttons.flatMap((b, index) => b.pressed ? [index] : [])
    if (pressed.join() !== state.pressedButtons.join()) {
      state.pressedButtons = pressed
    }
  })

  return state
}
