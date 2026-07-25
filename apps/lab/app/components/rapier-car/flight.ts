import type { RigidBody } from '@dimforge/rapier3d-compat'
import { MathUtils, Vector3 as ThreeVector3 } from 'three'

/**
 * Rocket League style flight: local-up first jump with hold-to-extend,
 * timed flip window, directional dodge flips, air control and aerial boost.
 *
 * Same caveat as the car tune: the sim runs ~2x real time (Physics :speed="2"),
 * so accelerations here are tuned against that effective gravity.
 */
const JUMP_IMPULSE = 7
const JUMP_HOLD_ACCEL = 14
const JUMP_HOLD_MAX = 0.2
const DOUBLE_JUMP_IMPULSE = 6.5
// Flip usable for this long after the first jump; falling off a ledge
// without jumping keeps the flip with no timer (RL ceiling rule)
const FLIP_WINDOW = 1.25
const DODGE_IMPULSE = 6
const DODGE_SPIN = 9.5
const DODGE_DURATION = 0.65
const DODGE_END_SPIN_KEEP = 0.3
// Dodges kill most vertical momentum, RL-style
const DODGE_VERTICAL_KEEP = 0.35
const DODGE_INPUT_DEADZONE = 0.1
const BOOST_ACCEL = 14
const BOOST_TOP_SPEED = 30

export interface FlightTuning {
  pitchAccel: number
  yawAccel: number
  rollAccel: number
}

export const AIR_TUNING_DEFAULTS: FlightTuning = {
  pitchAccel: 4.5,
  yawAccel: 6,
  rollAccel: 10,
}

export interface FlightMovement {
  /** S/down = +1, W/up = -1 */
  forward: number
  /** A = +1, D = -1 */
  right: number
  /** E = +1, Q = -1 */
  roll: number
  boost: number
  jumpHeld: boolean
  /** Powerslide on ground, air-roll modifier in the air (RL LShift) */
  slide: boolean
}

export interface FlightContext {
  chassis: RigidBody | null
  grounded: boolean
  /** World-space body axes, updated by the car each substep */
  forward: ThreeVector3
  sideward: ThreeVector3
  upward: ThreeVector3
  movement: FlightMovement
  tuning?: FlightTuning
}

export function createFlight() {
  const state = {
    wasGrounded: true,
    firstJumpUsed: false,
    flipUsed: false,
    flipTimer: 0,
    holdActive: false,
    holdTime: 0,
    dodgeActive: false,
    dodgeTimer: 0,
  }

  const impulse = { x: 0, y: 0, z: 0 }
  const velocity = { x: 0, y: 0, z: 0 }
  const spin = { x: 0, y: 0, z: 0 }
  const dodgeAxis = new ThreeVector3()
  const dodgeDir = new ThreeVector3()
  const flatForward = new ThreeVector3()
  const flatSideward = new ThreeVector3()
  const scratch = new ThreeVector3()

  function hasFlip() {
    if (state.flipUsed) { return false }
    if (state.firstJumpUsed && state.flipTimer > FLIP_WINDOW) { return false }
    return true
  }

  function applyUpImpulse(ctx: FlightContext, amount: number) {
    const chassis = ctx.chassis!
    const mass = chassis.mass()
    chassis.wakeUp()

    // Clear downward velocity so jumps always feel punchy
    const linvel = chassis.linvel()
    if (linvel.y < 0) {
      velocity.x = linvel.x
      velocity.y = 0
      velocity.z = linvel.z
      chassis.setLinvel(velocity, true)
    }

    impulse.x = ctx.upward.x * amount * mass
    impulse.y = ctx.upward.y * amount * mass
    impulse.z = ctx.upward.z * amount * mass
    chassis.applyImpulse(impulse, true)
  }

  function firstJump(ctx: FlightContext) {
    applyUpImpulse(ctx, JUMP_IMPULSE)
    state.firstJumpUsed = true
    state.flipTimer = 0
    state.holdActive = true
    state.holdTime = 0
  }

  function dodge(ctx: FlightContext, throttle: number, steer: number) {
    const chassis = ctx.chassis!
    const mass = chassis.mass()
    chassis.wakeUp()

    // Impulse is horizontal, relative to the car's yaw
    flatForward.copy(ctx.forward)
    flatForward.y = 0
    if (flatForward.lengthSq() < 1e-4) {
      flatForward.set(0, 0, -1)
    }
    else {
      flatForward.normalize()
    }
    flatSideward.set(-flatForward.z, 0, flatForward.x)

    dodgeDir
      .copy(flatForward)
      .multiplyScalar(throttle)
      .addScaledVector(flatSideward, -steer)
      .normalize()

    const linvel = chassis.linvel()
    velocity.x = linvel.x
    velocity.y = linvel.y * DODGE_VERTICAL_KEEP
    velocity.z = linvel.z
    chassis.setLinvel(velocity, true)

    impulse.x = dodgeDir.x * DODGE_IMPULSE * mass
    impulse.y = 0
    impulse.z = dodgeDir.z * DODGE_IMPULSE * mass
    chassis.applyImpulse(impulse, true)

    // Flip rotation is body-relative: W/S pitch flips, A/D roll dodges
    dodgeAxis
      .copy(ctx.sideward)
      .multiplyScalar(-throttle)
      .addScaledVector(ctx.forward, -steer)
      .normalize()

    state.dodgeActive = true
    state.dodgeTimer = 0
  }

  /** Consumes a jump press. Returns false when nothing was available. */
  function onJumpPressed(ctx: FlightContext) {
    if (!ctx.chassis) { return false }

    if (ctx.grounded) {
      firstJump(ctx)
      return true
    }

    if (!hasFlip()) { return false }
    state.flipUsed = true

    const throttle = -ctx.movement.forward
    const steer = ctx.movement.right
    if (Math.hypot(throttle, steer) > DODGE_INPUT_DEADZONE) {
      dodge(ctx, throttle, steer)
    }
    else {
      applyUpImpulse(ctx, DOUBLE_JUMP_IMPULSE)
    }
    return true
  }

  function update(ctx: FlightContext, dt: number) {
    const chassis = ctx.chassis
    if (!chassis) { return }

    if (ctx.grounded && !state.wasGrounded) {
      state.firstJumpUsed = false
      state.flipUsed = false
      state.flipTimer = 0
      state.holdActive = false
      state.dodgeActive = false
    }
    state.wasGrounded = ctx.grounded

    if (state.firstJumpUsed) {
      state.flipTimer += dt
    }

    // Hold jump for extra height, RL sticky force
    if (state.holdActive) {
      if (!ctx.movement.jumpHeld || state.holdTime >= JUMP_HOLD_MAX) {
        state.holdActive = false
      }
      else {
        state.holdTime += dt
        impulse.x = ctx.upward.x * JUMP_HOLD_ACCEL * chassis.mass() * dt
        impulse.y = ctx.upward.y * JUMP_HOLD_ACCEL * chassis.mass() * dt
        impulse.z = ctx.upward.z * JUMP_HOLD_ACCEL * chassis.mass() * dt
        chassis.applyImpulse(impulse, true)
      }
    }

    // Locked flip rotation while dodging, then keep a fraction of the spin
    if (state.dodgeActive) {
      state.dodgeTimer += dt
      if (state.dodgeTimer >= DODGE_DURATION || ctx.grounded) {
        state.dodgeActive = false
        const av = chassis.angvel()
        spin.x = av.x * DODGE_END_SPIN_KEEP
        spin.y = av.y * DODGE_END_SPIN_KEEP
        spin.z = av.z * DODGE_END_SPIN_KEEP
        chassis.setAngvel(spin, true)
      }
      else {
        spin.x = dodgeAxis.x * DODGE_SPIN
        spin.y = dodgeAxis.y * DODGE_SPIN
        spin.z = dodgeAxis.z * DODGE_SPIN
        chassis.setAngvel(spin, true)
      }
      return
    }

    // Boost is a rocket through the CoM (ground and air): no wheel torque, so no
    // wheelies, and no friction budget stolen from the steered wheels
    if (ctx.movement.boost > 0) {
      const linvel = chassis.linvel()
      const speed = Math.hypot(linvel.x, linvel.y, linvel.z)
      if (speed < BOOST_TOP_SPEED) {
        const amount = BOOST_ACCEL * ctx.movement.boost * chassis.mass() * dt
        impulse.x = ctx.forward.x * amount
        impulse.y = ctx.forward.y * amount
        impulse.z = ctx.forward.z * amount
        chassis.wakeUp()
        chassis.applyImpulse(impulse, true)
      }
    }

    if (ctx.grounded) { return }

    // Air control: W/S pitch, A/D yaw, Q/E roll (air damping provides decay).
    // Holding the slide/air-roll modifier turns A/D into roll, RL-style
    const rollModifier = ctx.movement.slide
    const pitch = ctx.movement.forward
    const yaw = rollModifier ? 0 : ctx.movement.right
    const roll = MathUtils.clamp(
      ctx.movement.roll + (rollModifier ? -ctx.movement.right : 0),
      -1,
      1,
    )

    if (pitch || yaw || roll) {
      const tuning = ctx.tuning ?? AIR_TUNING_DEFAULTS
      chassis.wakeUp()
      const av = chassis.angvel()
      scratch
        .set(av.x, av.y, av.z)
        .addScaledVector(ctx.sideward, pitch * tuning.pitchAccel * dt)
        .addScaledVector(ctx.upward, yaw * tuning.yawAccel * dt)
        .addScaledVector(ctx.forward, roll * tuning.rollAccel * dt)
      spin.x = scratch.x
      spin.y = scratch.y
      spin.z = scratch.z
      chassis.setAngvel(spin, true)
    }
  }

  function reset() {
    state.wasGrounded = true
    state.firstJumpUsed = false
    state.flipUsed = false
    state.flipTimer = 0
    state.holdActive = false
    state.holdTime = 0
    state.dodgeActive = false
    state.dodgeTimer = 0
  }

  return {
    update,
    onJumpPressed,
    hasAerialJump: hasFlip,
    isDodging: () => state.dodgeActive,
    reset,
  }
}
