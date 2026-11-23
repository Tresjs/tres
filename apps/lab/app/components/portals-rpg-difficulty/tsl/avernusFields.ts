// Avernus material fields from the Blender snapshot of 2026-09-21 (avernus_shader_equations.glsl). Linear RGB.

import type { Node } from 'three/webgpu'
import { clamp, float, mix, select, vec3 } from 'three/tsl'
import { blenderNoise3Color, blenderNoise3Fac, blenderVoronoiEdge3 } from './blenderNoise'

type N = Node | any
type Stop = [position: number, value: N]

// Blender's linear ColorRamp with clamped ends; a smoothstep is not equivalent.
function colorRamp(x: N, stops: Stop[]) {
  let result: N = stops[0][1]
  for (let i = 0; i < stops.length - 1; i++) {
    const [p0, v0] = stops[i]
    const [p1, v1] = stops[i + 1]
    const t = clamp(x.sub(p0).div(p1 - p0), 0, 1)
    result = select(x.greaterThanEqual(p0), mix(v0, v1, t), result)
  }
  return result
}

const lavaFissure = (x: N) => colorRamp(x, [[0.008, float(1)], [0.028, float(0.95)], [0.155, float(0)]])
const lavaPools = (x: N) => colorRamp(x, [[0.44, float(0)], [0.62, float(1)]])
const lavaHeat = (x: N) => colorRamp(x, [[0.32, float(0)], [0.7, float(0.28)], [1, float(1)]])

const lavaPalette = (x: N) => colorRamp(x, [
  [0, vec3(0.014, 0.008, 0.006)],
  [0.2, vec3(0.027, 0.012, 0.007)],
  [0.4, vec3(0.13, 0.016, 0.002)],
  [0.62, vec3(0.65, 0.035, 0.001)],
  [0.83, vec3(1, 0.095, 0.002)],
  [1, vec3(1, 0.23, 0.008)],
])

export interface LavaNoise {
  moltenMask: N
  height: N
}

/** Blender-space (Z up) input. The lake is flat, so `churn` uses Z as a time axis. Holds every noise call. */
export function evaluateLavaNoise(blenderObjectPosition: N, warpAmount: N, plateScale: N, micro: (q: N) => N, flow: N, churn: N): LavaNoise {
  const p = blenderObjectPosition.mul(vec3(0.78, 1.25, 1)).add(flow).toVar()
  const churnAxis = vec3(0, 0, churn)
  const warpColor = blenderNoise3Color(p.mul(0.7).add(churnAxis), 3, 0.65, 0)
  const q = p.add(warpAmount.mul(warpColor.sub(0.5))).toVar()
  const edgeDistance = blenderVoronoiEdge3(q.mul(plateScale))
  const broad = blenderNoise3Fac(q.mul(0.8).add(churnAxis.mul(0.5)), 2.5, 0.7, 0.6)
  const mask = lavaFissure(edgeDistance).max(lavaPools(broad)).toVar()

  return {
    moltenMask: mask,
    height: float(1).sub(mask).add(micro(q).mul(0.18)),
  }
}

/** The shading fields that only need the molten mask, so they stay cheap outside the noise branch. */
export function lavaSurface(mask: N) {
  const color = lavaPalette(mask).toVar()
  return {
    baseColor: color,
    emission: color.mul(lavaHeat(mask).mul(1.9)),
    roughness: mix(0.92, 0.32, clamp(mask, 0, 1)),
  }
}

export const energyTopFade = (x: N) => colorRamp(x, [[0, float(1)], [0.45, float(0.85)], [1, float(0)]])

export const energyEndFade = (x: N) => colorRamp(x, [[0, float(0)], [0.04, float(1)], [0.96, float(1)], [1, float(0)]])

export const energyRim = (x: N) => colorRamp(x, [[0, float(0.3)], [0.2, float(1)], [0.55, float(0.18)], [1, float(0.01)]])

/** Stops passed in so the palette can be uniforms; snapshot values live in AvernusEnergy.vue. */
export const energyPalette = (x: N, c0: N, c1: N, c2: N, c3: N) => colorRamp(x, [[0, c0], [0.3, c1], [0.65, c2], [1, c3]])
