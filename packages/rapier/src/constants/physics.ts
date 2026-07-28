/** @description Default gravity vector. */
export const GRAVITY = { x: 0, y: -9.81, z: 0 }

/** @description Default fixed physics timestep in seconds (~60 Hz). */
export const DEFAULT_TIMESTEP = 1 / 60

/** @description Max frame delta clamped into the accumulator to avoid spiral-of-death on hitch. */
export const MAX_PHYSICS_DELTA = 0.5
