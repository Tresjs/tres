import type { Color, Vector3 } from 'three/webgpu'
import { DoubleSide, MeshBasicNodeMaterial, Vector2 } from 'three/webgpu'
import {
  abs,
  cross,
  dot,
  float,
  floor,
  Fn,
  fract,
  max,
  min,
  mix,
  modelViewMatrix,
  normalGeometry,
  normalize,
  positionGeometry,
  pow,
  select,
  sin,
  smoothstep,
  time,
  transformNormalToView,
  uniform,
  varyingProperty,
  vec3,
  vec4,
} from 'three/tsl'

// The marble chain is the GPU twin of marble.ts; edit both together.

const OCTAVES = 3

const hash13 = /* @__PURE__ */ Fn(([input]: any[]) => {
  const p = fract(input.mul(0.1031)).toVar()
  p.addAssign(dot(p, p.zyx.add(31.32)))
  return fract(p.x.add(p.y).mul(p.z))
}).setLayout({ name: 'fireHash13', type: 'float', inputs: [{ name: 'p', type: 'vec3' }] })

const valueNoise = /* @__PURE__ */ Fn(([p]: any[]) => {
  const cell = floor(p).toVar()
  const f = fract(p).toVar()
  const u = f.mul(f).mul(float(3).sub(f.mul(2))).toVar()
  const n = (x: number, y: number, z: number) => hash13(cell.add(vec3(x, y, z)))
  return mix(
    mix(mix(n(0, 0, 0), n(1, 0, 0), u.x), mix(n(0, 1, 0), n(1, 1, 0), u.x), u.y),
    mix(mix(n(0, 0, 1), n(1, 0, 1), u.x), mix(n(0, 1, 1), n(1, 1, 1), u.x), u.y),
    u.z,
  )
}).setLayout({ name: 'fireValueNoise', type: 'float', inputs: [{ name: 'p', type: 'vec3' }] })

function turbulence(p: any) {
  let sum: any = float(0)
  let amp = 1
  let total = 0
  for (let i = 0; i < OCTAVES; i++) {
    sum = sum.add(valueNoise(p.mul(2 ** i)).mul(amp))
    total += amp
    amp *= 0.5
  }
  return sum.div(total)
}

export interface FireOptions {
  coreOffset: number
  coreScale: number
  coreMidPos: number
  coreStrength: number
  coreLow: Color
  coreMid: Color
  coreHigh: Color
  rimStops: Vector2
  rimOffset: number
  rimScale: number
  rimStrength: number
  rimLow: Color
  rimHigh: Color
  maskFloor: number
  dodgeBasePower: number
  dodgeBlendPower: number
  dodgeBaseRamp: Vector2
  dodgeBlendRamp: Vector2
  // A CPU vector, not the `time` node: marble.ts samples the same offset to drive the fire light.
  animator: Vector3
  marbleSize: number
  marbleTurbulence: number
  marbleVeins: number
  displaceStrength: number
  displaceMid: number
  baseMask: number
  flicker: number
}

type SharedFireOption = 'coreStrength' | 'rimStops' | 'rimOffset' | 'rimScale' | 'rimStrength' | 'maskFloor'
  | 'dodgeBasePower' | 'dodgeBlendPower' | 'dodgeBaseRamp' | 'dodgeBlendRamp' | 'marbleTurbulence' | 'displaceMid' | 'flicker'

const FIRE_DEFAULTS = {
  coreStrength: 1.4,
  rimStops: new Vector2(0, 0.523),
  rimOffset: 1,
  rimScale: 1,
  rimStrength: 1,
  maskFloor: 1,
  dodgeBasePower: 2,
  dodgeBlendPower: 4,
  dodgeBaseRamp: new Vector2(0, 1),
  dodgeBlendRamp: new Vector2(0.082, 1),
  marbleTurbulence: 5,
  displaceMid: 0.5,
  flicker: 0.06,
} satisfies Pick<FireOptions, SharedFireOption>

export function createFireMaterial(overrides: Omit<FireOptions, SharedFireOption> & Partial<Pick<FireOptions, SharedFireOption>>) {
  const options: FireOptions = { ...FIRE_DEFAULTS, ...overrides }
  const uniforms = {
    coreOffset: uniform(options.coreOffset),
    coreScale: uniform(options.coreScale),
    coreMidPos: uniform(options.coreMidPos),
    coreStrength: uniform(options.coreStrength),
    coreLow: uniform(options.coreLow),
    coreMid: uniform(options.coreMid),
    coreHigh: uniform(options.coreHigh),
    rimStops: uniform(options.rimStops.clone()),
    rimOffset: uniform(options.rimOffset),
    rimScale: uniform(options.rimScale),
    rimStrength: uniform(options.rimStrength),
    rimLow: uniform(options.rimLow),
    rimHigh: uniform(options.rimHigh),
    heightMin: uniform(0),
    heightRange: uniform(1),
    maskFloor: uniform(options.maskFloor),
    dodgeBasePower: uniform(options.dodgeBasePower),
    dodgeBlendPower: uniform(options.dodgeBlendPower),
    dodgeBaseRamp: uniform(options.dodgeBaseRamp.clone()),
    dodgeBlendRamp: uniform(options.dodgeBlendRamp.clone()),
    animator: uniform(options.animator),
    marbleSize: uniform(options.marbleSize),
    marbleTurbulence: uniform(options.marbleTurbulence),
    marbleVeins: uniform(options.marbleVeins),
    displaceStrength: uniform(options.displaceStrength),
    displaceMid: uniform(options.displaceMid),
    baseMask: uniform(options.baseMask),
    flicker: uniform(options.flicker),
  }

  const marble = (p: any) =>
    sin(uniforms.marbleVeins.mul(p.x.add(p.y).add(p.z)).add(uniforms.marbleTurbulence.mul(turbulence(p.div(uniforms.marbleSize))))).mul(0.5).add(0.5)

  const vHeight = varyingProperty('float', 'vFireHeight')
  const vNormalView = varyingProperty('vec3', 'vFireNormalView')
  const vViewDir = varyingProperty('vec3', 'vFireViewDir')

  const material = new MeshBasicNodeMaterial({ side: DoubleSide, fog: false })

  material.positionNode = Fn(() => {
    const position = positionGeometry
    const nor = normalize(normalGeometry).toVar()
    const mask = smoothstep(0, max(uniforms.baseMask, 1e-4), position.y.sub(uniforms.heightMin).div(uniforms.heightRange)).toVar()

    const axis = select(abs(nor.y).lessThan(0.99), vec3(0, 1, 0), vec3(1, 0, 0))
    const tangent = normalize(cross(axis, nor)).toVar()
    const bitangent = cross(nor, tangent).toVar()

    const displace = (p: any) => p.add(nor.mul(marble(p.sub(uniforms.animator)).sub(uniforms.displaceMid).mul(uniforms.displaceStrength).mul(mask)))

    const displaced = displace(position).toVar()
    const eps = uniforms.heightRange.mul(0.02)
    const dTangent = displace(position.add(tangent.mul(eps))).sub(displaced)
    const dBitangent = displace(position.add(bitangent.mul(eps))).sub(displaced)
    const displacedNormal = normalize(cross(dTangent, dBitangent))

    vHeight.assign(displaced.y.sub(uniforms.heightMin).div(uniforms.heightRange))
    vNormalView.assign(normalize(transformNormalToView(displacedNormal)))
    vViewDir.assign(normalize(modelViewMatrix.mul(vec4(displaced, 1)).xyz.negate()))

    return displaced
  })()

  const ramp3 = (c0: any, c1: any, c2: any, midPos: any, t: any) =>
    mix(mix(c0, c1, smoothstep(0, midPos, t)), c2, smoothstep(midPos, 1, t))

  const colorDodge = (base: any, blend: any) =>
    select(base.lessThanEqual(0), float(0), select(blend.greaterThanEqual(1), float(1), min(base.div(float(1).sub(blend)), 1)))

  material.colorNode = Fn(() => {
    const facing = float(1).sub(abs(dot(normalize(vNormalView), normalize(vViewDir))))
    const lifted = mix(facing, uniforms.maskFloor, 0.5).toVar()
    const a = smoothstep(uniforms.dodgeBaseRamp.x, uniforms.dodgeBaseRamp.y, pow(lifted, uniforms.dodgeBasePower))
    const b = smoothstep(uniforms.dodgeBlendRamp.x, uniforms.dodgeBlendRamp.y, pow(lifted, uniforms.dodgeBlendPower))
    const mask = colorDodge(a, b)

    const flicker = sin(vHeight.mul(9).sub(time.mul(6))).mul(0.5).add(sin(vHeight.mul(17).sub(time.mul(9.3))).mul(0.5))
    const coreT = smoothstep(0, 1, uniforms.coreOffset.add(flicker.mul(uniforms.flicker)).sub(uniforms.coreScale.mul(vHeight)))
    const rimT = smoothstep(0, 1, uniforms.rimOffset.sub(uniforms.rimScale.mul(vHeight)))

    const core = ramp3(uniforms.coreLow, uniforms.coreMid, uniforms.coreHigh, uniforms.coreMidPos, coreT).mul(uniforms.coreStrength)
    const rim = mix(uniforms.rimLow, uniforms.rimHigh, smoothstep(uniforms.rimStops.x, uniforms.rimStops.y, rimT)).mul(uniforms.rimStrength)

    return vec4(mix(core, rim, mask), 1)
  })()

  return { material, uniforms }
}
