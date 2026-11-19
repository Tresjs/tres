import type { MeshPhysicalNodeMaterialParameters, Node, NodeBuilder, TextureNode } from 'three/webgpu'
import { MeshPhysicalNodeMaterial, Texture } from 'three/webgpu'
import {
  cameraPosition,
  cameraProjectionMatrix,
  cameraViewMatrix,
  clamp,
  diffuseColor,
  dot,
  exp,
  exp2,
  floor,
  Fn,
  fract,
  hash,
  If,
  ior,
  length,
  log,
  log2,
  Loop,
  materialAttenuationColor,
  materialReference,
  materialRoughness,
  materialThickness,
  max,
  min,
  modelWorldMatrix,
  normalize,
  normalWorld,
  positionWorld,
  pow,
  refract,
  roughness,
  screenCoordinate,
  screenSize,
  select,
  sign,
  sin,
  specularColor,
  specularF90,
  step,
  texture,
  uint,
  uniform,
  vec2,
  vec3,
  vec4,
  viewportMipTexture,
} from 'three/tsl'
import { meshTransmissionMaterialDefaults } from './props'
import type { MeshTransmissionMaterialUniforms } from './props'

export interface MeshTransmissionNodeMaterialParameters extends MeshPhysicalNodeMaterialParameters {
  samples?: number
  transmissionSampler?: boolean
  chromaticAberration?: number
  _transmission?: number
  anisotropicBlur?: number
  time?: number
  distortion?: number
  distortionScale?: number
  temporalDistortion?: number
  buffer?: Texture | null
}

type FloatNode = Node<'float'>
type Vec3Node = Node<'vec3'>

const random3 = Fn(([c]: [Vec3Node]) => {
  const j = sin(dot(c, vec3(17.0, 59.4, 15.0))).mul(4096.0)
  return vec3(fract(j.mul(64.0)), fract(j.mul(8.0)), fract(j.mul(512.0))).sub(0.5)
}).setLayout({ name: 'mtmRandom3', type: 'vec3', inputs: [{ name: 'c', type: 'vec3' }] })

const F3 = 0.3333333
const G3 = 0.1666667

const snoise = Fn(([p]: [Vec3Node]) => {
  const s = floor(p.add(dot(p, vec3(F3)))).toVar()
  const x = p.sub(s).add(dot(s, vec3(G3))).toVar()
  const e = step(vec3(0.0), x.sub(x.yzx)).toVar()
  const i1 = e.mul(e.zxy.oneMinus()).toVar()
  const i2 = e.zxy.mul(e.oneMinus()).oneMinus().toVar()
  const x1 = x.sub(i1).add(G3).toVar()
  const x2 = x.sub(i2).add(2.0 * G3).toVar()
  const x3 = x.sub(1.0).add(3.0 * G3).toVar()
  const w = max(vec4(0.6).sub(vec4(dot(x, x), dot(x1, x1), dot(x2, x2), dot(x3, x3))), 0.0).toVar()
  const d = vec4(
    dot(random3(s), x),
    dot(random3(s.add(i1)), x1),
    dot(random3(s.add(i2)), x2),
    dot(random3(s.add(1.0)), x3),
  )
  const w4 = w.mul(w).mul(w).mul(w)
  return dot(d.mul(w4), vec4(52.0))
}).setLayout({ name: 'mtmSnoise', type: 'float', inputs: [{ name: 'p', type: 'vec3' }] })

const snoiseFractal = Fn(([m]: [Vec3Node]) => {
  return snoise(m).mul(0.5333333).add(snoise(m.mul(2.0)).mul(0.2666667)).add(snoise(m.mul(4.0)).mul(0.1333333)).add(snoise(m.mul(8.0)).mul(0.0666667))
}).setLayout({ name: 'mtmSnoiseFractal', type: 'float', inputs: [{ name: 'm', type: 'vec3' }] })

const applyIorToRoughness = (roughnessNode: FloatNode, iorNode: FloatNode) =>
  roughnessNode.mul(clamp(iorNode.mul(2.0).sub(2.0), 0.0, 1.0))

const volumeTransmissionRay = (n: Vec3Node, v: Vec3Node, thickness: FloatNode, iorNode: FloatNode) => {
  const refractionVector = refract(v.negate(), normalize(n), iorNode.reciprocal())
  const modelScale = vec3(
    length(modelWorldMatrix.mul(vec4(1.0, 0.0, 0.0, 0.0)).xyz),
    length(modelWorldMatrix.mul(vec4(0.0, 1.0, 0.0, 0.0)).xyz),
    length(modelWorldMatrix.mul(vec4(0.0, 0.0, 1.0, 0.0)).xyz),
  )
  return normalize(refractionVector).mul(thickness).mul(modelScale)
}

// Infinity becomes 0 before upload: WGSL does not promise Infinity in a uniform, and a 0 color channel gives inf / inf = NaN.
const attenuationDistance = uniform(0).onObjectUpdate(({ material }) => {
  const distance = (material as { attenuationDistance?: number } | null)?.attenuationDistance ?? 0
  return Number.isFinite(distance) ? distance : 0
})

// 0 means no attenuation, as in three's TSL, and covers the GLSL `isinf` case.
const volumeAttenuation = (radiance: Vec3Node, distance: FloatNode) => {
  const color = vec3(materialAttenuationColor)
  // WGSL leaves log(0) undefined. sign() swaps only exact zeros for 1 and keeps positive values as GLSL has them.
  const hasColor = sign(color)
  const coefficient = log(color.add(hasColor.oneMinus())).negate().div(attenuationDistance.add(sign(attenuationDistance).oneMinus()))
  const transmittance = exp(coefficient.negate().mul(vec3(distance))).mul(hasColor)
  return select(attenuationDistance.greaterThan(0.0).and(distance.greaterThan(0.0)), transmittance.mul(radiance), radiance)
}

// The GLSL smear reads the `thickness` uniform before `thicknessMap` scales it. `materialThickness` includes the map.
const unmappedThickness = materialReference('thickness', 'float') as unknown as FloatNode

// three r186 renamed `TextureNode.uv` to `sample`. Both keep the copy linked to the base node's texture.
const sampleAt = (node: TextureNode, coords: Node<'vec2'>): TextureNode =>
  'sample' in node ? node.sample(coords) : (node as unknown as { uv: (uv: Node<'vec2'>) => TextureNode }).uv(coords)

// Karis' analytic DFG term. three r171 does not export `EnvironmentBRDF`, and r186 does not export `DFGApprox`.
const environmentBRDF = (dotNV: FloatNode, specular: Vec3Node, f90: FloatNode, roughnessNode: FloatNode) => {
  const r = vec4(roughnessNode).mul(vec4(-1.0, -0.0275, -0.572, 0.022)).add(vec4(1.0, 0.0425, 1.04, -0.04))
  const a004 = min(r.x.mul(r.x), exp2(dotNV.mul(-9.28))).mul(r.x).add(r.y)
  const fab = vec2(-1.04, 1.04).mul(a004).add(r.zw)
  return specular.mul(fab.x).add(f90.mul(fab.y))
}

// One shared copy of the framebuffer per frame, like three's `viewportOpaqueMipTexture` (r180+).
const viewportBackground = viewportMipTexture()

/** Node material version of `MeshTransmissionMaterial`. The built-in `transmission` stays 0; `backdropNode` mixes in the refracted samples by `_transmission`. */
export class MeshTransmissionNodeMaterial extends MeshPhysicalNodeMaterial implements MeshTransmissionMaterialUniforms {
  // The `_` prefix keeps `NodeMaterial.copy` from sharing these with a clone by reference.
  private readonly _transmissionUniforms = {
    chromaticAberration: uniform(meshTransmissionMaterialDefaults.chromaticAberration),
    transmission: uniform(meshTransmissionMaterialDefaults.transmission),
    anisotropicBlur: uniform(meshTransmissionMaterialDefaults.anisotropicBlur),
    time: uniform(0),
    distortion: uniform(meshTransmissionMaterialDefaults.distortion),
    distortionScale: uniform(meshTransmissionMaterialDefaults.distortionScale),
    temporalDistortion: uniform(meshTransmissionMaterialDefaults.temporalDistortion),
  }

  private readonly _emptyBuffer = new Texture()
  private readonly _bufferNode = texture(this._emptyBuffer)
  private _buffer: Texture | null = null
  private _builtinTransmission = 0
  private _samples: number
  private _transmissionSampler: boolean

  constructor({
    samples = meshTransmissionMaterialDefaults.samples,
    transmissionSampler = meshTransmissionMaterialDefaults.transmissionSampler,
    ...parameters
  }: MeshTransmissionNodeMaterialParameters = {}) {
    super()

    this._samples = samples
    this._transmissionSampler = transmissionSampler
    this._setupBackdrop()
    this.setValues(parameters)
  }

  private _setupBackdrop() {
    const samples = this._samples
    const transmissionSampler = this._transmissionSampler
    // The viewport copy holds the opaque objects only when this mesh renders after them.
    this.transparent = transmissionSampler

    const u = this._transmissionUniforms

    const sampleBackground = (coords: Node<'vec2'>, roughnessNode: FloatNode, iorNode: FloatNode): Node<'vec4'> => {
      if (!transmissionSampler) { return sampleAt(this._bufferNode, coords) as unknown as Node<'vec4'> }
      const lod = log2(screenSize.x).mul(applyIorToRoughness(roughnessNode, iorNode))
      return sampleAt(viewportBackground as unknown as TextureNode, coords).level(lod) as unknown as Node<'vec4'>
    }

    const volumeRefraction = (n: Vec3Node, v: Vec3Node, iorNode: FloatNode, thickness: FloatNode) => {
      const transmissionRay = volumeTransmissionRay(n, v, thickness, iorNode)
      const ndcPos = cameraProjectionMatrix.mul(cameraViewMatrix).mul(vec4(positionWorld.add(transmissionRay), 1.0))
      const ndc = ndcPos.xy.div(ndcPos.w).add(1.0).div(2.0)
      // Texture space has y down on WebGPU. three flips it back for render targets on the WebGL2 backend.
      const coords = vec2(ndc.x, ndc.y.oneMinus())
      const transmitted = sampleBackground(coords, roughness, iorNode).rgb
      const attenuated = volumeAttenuation(transmitted, length(transmissionRay))
      const F = environmentBRDF(n.dot(v).clamp(), specularColor as unknown as Vec3Node, specularF90, roughness)
      return F.oneMinus().mul(attenuated).mul(diffuseColor.rgb)
    }

    const pixelSeed = uint(screenCoordinate.x).add(uint(screenCoordinate.y).mul(uint(65536)))
    const rand = (seed: Node<'uint'>) => hash(pixelSeed.add(seed.mul(uint(16777619))))

    this.backdropNode = Fn(() => {
      const v = cameraPosition.sub(positionWorld).normalize()
      const n = normalWorld
      const randomCoords = rand(uint(0)).toVar()
      // The GLSL `roughnessFactor` is the raw material roughness. The `roughness` node is clamped to at least 0.0525.
      const rawRoughness = materialRoughness.toVar()
      const thicknessSmear = unmappedThickness.mul(max(pow(rawRoughness, 0.33), u.anisotropicBlur)).toVar()
      const temporalOffset = vec3(u.time, u.time.negate(), u.time.negate()).mul(u.temporalDistortion).toVar()
      const scaledPosition = positionWorld.mul(u.distortionScale)

      const distortionNormal = vec3(0.0).toVar()
      If(u.distortion.greaterThan(0.0), () => {
        distortionNormal.assign(vec3(
          snoiseFractal(scaledPosition.add(temporalOffset)),
          snoiseFractal(positionWorld.zxy.mul(u.distortionScale).sub(temporalOffset)),
          snoiseFractal(positionWorld.yxz.mul(u.distortionScale).add(temporalOffset)),
        ).mul(u.distortion))
      })

      const transmission = vec3(0.0).toVar()

      Loop(samples, ({ i }: { i: Node<'int'> }) => {
        const seed = uint(i).mul(uint(4)).add(uint(1))
        const jitter = normalize(vec3(rand(seed).sub(0.5), rand(seed.add(uint(1))).sub(0.5), rand(seed.add(uint(2))).sub(0.5)))
          .mul(pow(rand(seed.add(uint(3))), 0.33))
        const sampleNorm = normalize(n.add(rawRoughness.mul(rawRoughness).mul(2.0).mul(jitter)).add(distortionNormal)).toVar()
        const offset = i.toFloat().add(randomCoords).div(samples).toVar()
        const thickness = materialThickness.add(thicknessSmear.mul(offset)).toVar()

        transmission.addAssign(vec3(
          volumeRefraction(sampleNorm, v, ior, thickness).r,
          volumeRefraction(sampleNorm, v, ior.mul(offset.mul(u.chromaticAberration).add(1.0)), thickness).g,
          volumeRefraction(sampleNorm, v, ior.mul(offset.mul(u.chromaticAberration).mul(2.0).add(1.0)), thickness).b,
        ))
      })

      return transmission.div(samples)
    })()
  }

  override setupLighting(builder: NodeBuilder) {
    // Read at build time like the GLSL `USE_TRANSMISSIONMAP` define, so a new map needs `needsUpdate`.
    this.backdropAlphaNode = this.transmissionMap
      ? this._transmissionUniforms.transmission.mul(texture(this.transmissionMap).r)
      : this._transmissionUniforms.transmission
    return super.setupLighting(builder)
  }

  // `super.copy` would give this material the source's `backdropNode`, which reads the source's uniforms.
  // It also calls `Texture.copy` on a non-null `buffer`, so clear it first and let the setter take the reference.
  override copy(source: MeshTransmissionNodeMaterial) {
    if (source === this) { return this }
    this.buffer = null
    super.copy(source)
    this._samples = source._samples
    this._transmissionSampler = source._transmissionSampler
    this._setupBackdrop()
    // three r171 `copy` skips subclass accessors.
    Object.assign(this, {
      buffer: source.buffer,
      _transmission: source._transmission,
      chromaticAberration: source.chromaticAberration,
      anisotropicBlur: source.anisotropicBlur,
      time: source.time,
      distortion: source.distortion,
      distortionScale: source.distortionScale,
      temporalDistortion: source.temporalDistortion,
    })
    return this
  }

  override dispose() {
    this._emptyBuffer.dispose()
    super.dispose()
  }

  get chromaticAberration() { return this._transmissionUniforms.chromaticAberration.value }
  set chromaticAberration(value: number) { this._transmissionUniforms.chromaticAberration.value = value }

  // `MeshPhysicalMaterial` keeps `transmission` in `_transmission` and writes it before these fields exist.
  // Both are overridden, as in the GLSL version, so `_transmission` is the mix factor and `transmission` stays the built-in.
  get _transmission() { return this._transmissionUniforms?.transmission.value ?? 0 }
  set _transmission(value: number) {
    if (this._transmissionUniforms) { this._transmissionUniforms.transmission.value = value }
  }

  override get transmission() { return this._builtinTransmission ?? 0 }
  override set transmission(value: number) {
    if (((this._builtinTransmission ?? 0) > 0) !== (value > 0)) { this.needsUpdate = true }
    this._builtinTransmission = value
  }

  get anisotropicBlur() { return this._transmissionUniforms.anisotropicBlur.value }
  set anisotropicBlur(value: number) { this._transmissionUniforms.anisotropicBlur.value = value }

  get time() { return this._transmissionUniforms.time.value }
  set time(value: number) { this._transmissionUniforms.time.value = value }

  get distortion() { return this._transmissionUniforms.distortion.value }
  set distortion(value: number) { this._transmissionUniforms.distortion.value = value }

  get distortionScale() { return this._transmissionUniforms.distortionScale.value }
  set distortionScale(value: number) { this._transmissionUniforms.distortionScale.value = value }

  get temporalDistortion() { return this._transmissionUniforms.temporalDistortion.value }
  set temporalDistortion(value: number) { this._transmissionUniforms.temporalDistortion.value = value }

  get buffer() { return this._buffer }
  set buffer(value: Texture | null) {
    this._buffer = value
    this._bufferNode.value = value ?? this._emptyBuffer
  }
}
