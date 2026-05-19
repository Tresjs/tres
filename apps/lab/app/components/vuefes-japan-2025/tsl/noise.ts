// TSL port of the Suminagashi noise utilities.
// random → noise → fbm, all as pure Fn() node functions.

import {
  float,
  Fn,
  fract,
  floor,
  mix,
  sin,
  dot,
  vec2,
  Loop,
  mul,
  add,
  sub,
} from 'three/tsl'

/**
 * Classic hash-based pseudo-random value for a vec2 seed.
 * Equivalent to GLSL:  fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453123)
 */
export const random = Fn(([st]: [any]) => {
  return fract(sin(dot(st, vec2(12.9898, 78.233))).mul(43758.5453123))
})

/**
 * Smooth value noise over a vec2 domain.
 */
export const noise = Fn(([st]: [any]) => {
  const i = floor(st)
  const f = fract(st)
  // Smoothstep curve: f*f*(3-2*f)
  const u = f.mul(f).mul(sub(3.0, mul(2.0, f)))

  const r00 = random(i)
  const r10 = random(i.add(vec2(1.0, 0.0)))
  const r01 = random(i.add(vec2(0.0, 1.0)))
  const r11 = random(i.add(vec2(1.0, 1.0)))

  return mix(
    mix(r00, r10, u.x),
    mix(r01, r11, u.x),
    u.y,
  )
})

/**
 * Fractional Brownian motion.
 * octaves is a compile-time JS integer — we unroll with Loop for TSL compatibility.
 * amplitude, frequency, lacunarity, gain are float nodes.
 */
export const fbm = Fn(([st, amplitude, frequency, lacunarity, gain, octaves]: [any, any, any, any, any, any]) => {
  const value = float(0).toVar()
  const amp = amplitude.toVar()
  const freq = frequency.toVar()

  Loop(octaves, () => {
    value.addAssign(amp.mul(noise(st.mul(freq))))
    freq.mulAssign(lacunarity)
    amp.mulAssign(gain)
  })

  return value
})

/**
 * 2-component flow field: two fbm calls, offset by time.
 */
export const flowField = Fn(([p, time]: [any, any]) => {
  const fx = fbm(
    add(p, vec2(0.0, time.mul(0.1))),
    float(0.6), float(2.0), float(1.8), float(0.5), 6,
  )
  const fy = fbm(
    add(p, vec2(time.mul(0.1), 0.0)),
    float(0.6), float(2.0), float(1.8), float(0.5), 6,
  )
  return vec2(fx, fy)
})
