// Port of Blender v5.2.1 material noise (gpu_shader_common_hash.glsl, gpu_shader_material_*noise/voronoi.glsl).
// The uint hashes and wrapping integer math are load-bearing: a float hash moves every cell off the reference.

import type { Node } from 'three/webgpu'
import { abs, dot, float, floor, Fn, fract, If, int, ivec3, Loop, min, mix, normalize, select, sign, step, uint, uvec3, vec3 } from 'three/tsl'

type N = Node | any

const BL_FLT_MAX = 3.402823466e+38
const JENKINS_SEED_2 = 0xDEADBEEF + (2 << 2) + 13
const JENKINS_SEED_3 = 0xDEADBEEF + (3 << 2) + 13

// The random offsets only ever take constant seeds, so the CPU bakes them.
const cpuRot = (x: number, k: number) => ((x << k) | (x >>> (32 - k))) >>> 0

function cpuHashUint2(kx: number, ky: number) {
  let a = JENKINS_SEED_2 >>> 0
  let b = a
  let c = a
  b = (b + ky) >>> 0
  a = (a + kx) >>> 0
  c = ((c ^ b) - cpuRot(b, 14)) >>> 0
  a = ((a ^ c) - cpuRot(c, 11)) >>> 0
  b = ((b ^ a) - cpuRot(a, 25)) >>> 0
  c = ((c ^ b) - cpuRot(b, 16)) >>> 0
  a = ((a ^ c) - cpuRot(c, 4)) >>> 0
  b = ((b ^ a) - cpuRot(a, 14)) >>> 0
  c = ((c ^ b) - cpuRot(b, 24)) >>> 0
  return c
}

const bits = new Uint32Array(1)
const floats = new Float32Array(bits.buffer)

function floatBits(value: number) {
  floats[0] = value
  return bits[0]
}

function cpuRandomOffset(seed: number) {
  const component = (i: number) => 100 + cpuHashUint2(floatBits(seed), floatBits(i)) / 4294967295 * 100
  return vec3(component(0), component(1), component(2))
}

const OFFSETS = [0, 1, 2, 3, 4].map(cpuRandomOffset)

const rot = (x: N, k: number) => x.shiftLeft(uint(k)).bitOr(x.shiftRight(uint(32 - k)))

const blHashUint3 = /* @__PURE__ */ Fn(([kx, ky, kz]: N[]) => {
  const a = uint(JENKINS_SEED_3).add(kx).toVar()
  const b = uint(JENKINS_SEED_3).add(ky).toVar()
  const c = uint(JENKINS_SEED_3).add(kz).toVar()
  c.assign(c.bitXor(b).sub(rot(b, 14)))
  a.assign(a.bitXor(c).sub(rot(c, 11)))
  b.assign(b.bitXor(a).sub(rot(a, 25)))
  c.assign(c.bitXor(b).sub(rot(b, 16)))
  a.assign(a.bitXor(c).sub(rot(c, 4)))
  b.assign(b.bitXor(a).sub(rot(a, 14)))
  c.assign(c.bitXor(b).sub(rot(b, 24)))
  return c
}).setLayout({
  name: 'blHashUint3',
  type: 'uint',
  inputs: [{ name: 'kx', type: 'uint' }, { name: 'ky', type: 'uint' }, { name: 'kz', type: 'uint' }],
})

// uint(int) keeps the bit pattern in both GLSL and WGSL, as Blender's hash_int3 expects.
const blHashInt3 = (k: N) => blHashUint3(uint(k.x), uint(k.y), uint(k.z))

// Blender's signed PCG 3D: overflow must wrap and >> must stay arithmetic, so keep ivec3.
const blHashInt3ToVec3 = /* @__PURE__ */ Fn(([k]: N[]) => {
  const v = k.mul(int(1664525)).add(int(1013904223)).toVar()
  v.x.addAssign(v.y.mul(v.z))
  v.y.addAssign(v.z.mul(v.x))
  v.z.addAssign(v.x.mul(v.y))
  v.assign(v.bitXor(v.shiftRight(uvec3(16))))
  v.x.addAssign(v.y.mul(v.z))
  v.y.addAssign(v.z.mul(v.x))
  v.z.addAssign(v.x.mul(v.y))
  return vec3(v.bitAnd(ivec3(int(0x7FFFFFFF)))).mul(1 / 2147483647)
}).setLayout({ name: 'blHashInt3ToVec3', type: 'vec3', inputs: [{ name: 'k', type: 'ivec3' }] })

const blFade = (t: N) => t.mul(t).mul(t).mul(t.mul(t.mul(6).sub(15)).add(10))

const blNegateIf = (value: N, condition: N) => select(condition.notEqual(uint(0)), value.negate(), value)

const blGrad3 = /* @__PURE__ */ Fn(([hash, x, y, z]: N[]) => {
  const h = hash.bitAnd(uint(15)).toVar()
  const u = select(h.lessThan(uint(8)), x, y)
  const vt = select(h.equal(uint(12)).or(h.equal(uint(14))), x, z)
  const v = select(h.lessThan(uint(4)), y, vt)
  return blNegateIf(u, h.bitAnd(uint(1))).add(blNegateIf(v, h.bitAnd(uint(2))))
}).setLayout({
  name: 'blGrad3',
  type: 'float',
  inputs: [{ name: 'hash', type: 'uint' }, { name: 'x', type: 'float' }, { name: 'y', type: 'float' }, { name: 'z', type: 'float' }],
})

const blPerlin3 = /* @__PURE__ */ Fn(([p]: N[]) => {
  const pf = floor(p).toVar()
  const P = ivec3(pf).toVar()
  const f = p.sub(pf).toVar()

  const u = blFade(f.x)
  const v = blFade(f.y)
  const w = blFade(f.z)

  const g = (dx: number, dy: number, dz: number) =>
    blGrad3(blHashInt3(P.add(ivec3(dx, dy, dz))), f.x.sub(dx), f.y.sub(dy), f.z.sub(dz))

  const x1 = float(1).sub(u)
  const y1 = float(1).sub(v)
  const z1 = float(1).sub(w)

  return z1.mul(y1.mul(g(0, 0, 0).mul(x1).add(g(1, 0, 0).mul(u))).add(v.mul(g(0, 1, 0).mul(x1).add(g(1, 1, 0).mul(u)))))
    .add(w.mul(y1.mul(g(0, 0, 1).mul(x1).add(g(1, 0, 1).mul(u))).add(v.mul(g(0, 1, 1).mul(x1).add(g(1, 1, 1).mul(u))))))
}).setLayout({ name: 'blPerlin3', type: 'float', inputs: [{ name: 'p', type: 'vec3' }] })

// C fmod (sign of the dividend), not GLSL mod; sign(p) is 0 only where the result is 0 anyway.
const blSnoise3 = /* @__PURE__ */ Fn(([p]: N[]) => {
  const precisionCorrection = step(1000000, abs(p)).mul(0.5)
  const wrapped = fract(abs(p.div(100000))).mul(100000).mul(sign(p))
  return blPerlin3(wrapped.add(precisionCorrection)).mul(0.982)
}).setLayout({ name: 'blSnoise3', type: 'float', inputs: [{ name: 'p', type: 'vec3' }] })

// Lacunarity 2 and Normalize on, as in every Avernus noise node.
function blNoiseFbm3(p: N, detail: number, roughness: number) {
  const octaves = Math.floor(detail)
  let sum: N = float(0)
  let amp = 1
  let maxamp = 0
  let fscale = 1

  for (let i = 0; i <= octaves; i++) {
    sum = sum.add(blSnoise3(p.mul(fscale)).mul(amp))
    maxamp += amp
    amp *= roughness
    fscale *= 2
  }

  const rmd = detail - Math.floor(detail)
  if (rmd === 0) {
    return sum.mul(0.5 / maxamp).add(0.5)
  }

  const sum2 = sum.add(blSnoise3(p.mul(fscale)).mul(amp))
  return mix(sum.mul(0.5 / maxamp).add(0.5), sum2.mul(0.5 / (maxamp + amp)).add(0.5), rmd)
}

function distort(q: N, distortion: number) {
  if (distortion === 0) {
    return vec3(q).toVar()
  }
  const p = vec3(q).toVar()
  return p.add(vec3(
    blSnoise3(p.add(OFFSETS[0])),
    blSnoise3(p.add(OFFSETS[1])),
    blSnoise3(p.add(OFFSETS[2])),
  ).mul(distortion)).toVar()
}

const clampDetail = (detail: number) => Math.min(Math.max(detail, 0), 15)

/** Fac only, for the nodes whose Color output is unused. Saves two fBM passes. */
export function blenderNoise3Fac(q: N, detail: number, roughness: number, distortion: number) {
  const p = distort(q, distortion)
  return blNoiseFbm3(p, clampDetail(detail), Math.max(roughness, 0))
}

/** The Color output of Blender's Noise Texture. Its x channel is the Fac output. */
export function blenderNoise3Color(q: N, detail: number, roughness: number, distortion: number) {
  const p = distort(q, distortion)
  const d = clampDetail(detail)
  const r = Math.max(roughness, 0)
  return vec3(
    blNoiseFbm3(p, d, r),
    blNoiseFbm3(p.add(OFFSETS[3]), d, r),
    blNoiseFbm3(p.add(OFFSETS[4]), d, r),
  )
}

const cellOffset = (i: N) => ivec3(i.mod(int(3)).sub(int(1)), i.div(int(3)).mod(int(3)).sub(int(1)), i.div(int(9)).sub(int(1)))

/** Euclidean, Randomness 1, Detail 0, Normalize off: the fractal wrapper is then an identity, so it is skipped. */
export const blenderVoronoiEdge3 = /* @__PURE__ */ Fn(([coord]: N[]) => {
  const cellPositionF = floor(coord).toVar()
  const localPosition = coord.sub(cellPositionF).toVar()
  const cellPosition = ivec3(cellPositionF).toVar()

  const vectorToClosest = vec3(0).toVar()
  const minDistance = float(BL_FLT_MAX).toVar()

  // One flat loop over the 3x3x3 cells, x fastest, in the same order as Blender's k, j, i loops.
  Loop(27, ({ i }: { i: N }) => {
    const offset = cellOffset(i).toVar()
    const vectorToPoint = vec3(offset).add(blHashInt3ToVec3(cellPosition.add(offset))).sub(localPosition).toVar()
    const distanceToPoint = dot(vectorToPoint, vectorToPoint)
    If(distanceToPoint.lessThan(minDistance), () => {
      minDistance.assign(distanceToPoint)
      vectorToClosest.assign(vectorToPoint)
    })
  })

  minDistance.assign(BL_FLT_MAX)
  Loop(27, ({ i }: { i: N }) => {
    const offset = cellOffset(i).toVar()
    const vectorToPoint = vec3(offset).add(blHashInt3ToVec3(cellPosition.add(offset))).sub(localPosition).toVar()
    const perpendicularToEdge = vectorToPoint.sub(vectorToClosest).toVar()
    If(dot(perpendicularToEdge, perpendicularToEdge).greaterThan(0.0001), () => {
      const distanceToEdge = dot(vectorToClosest.add(vectorToPoint).div(2), normalize(perpendicularToEdge))
      minDistance.assign(min(minDistance, distanceToEdge))
    })
  })

  return minDistance
}).setLayout({ name: 'blenderVoronoiEdge3', type: 'float', inputs: [{ name: 'coord', type: 'vec3' }] })
