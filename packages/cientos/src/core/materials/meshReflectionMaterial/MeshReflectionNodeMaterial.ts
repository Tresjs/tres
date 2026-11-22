import type { MeshStandardNodeMaterialParameters, Node, NodeBuilder, TextureNode } from 'three/webgpu'
import { DepthTexture, Matrix4, MeshStandardNodeMaterial, Texture } from 'three/webgpu'
import {
  clamp,
  materialReference,
  materialRoughness,
  mix,
  normalize,
  positionGeometry,
  smoothstep,
  texture,
  uniform,
  uv,
  varying,
  vec2,
  vec3,
  vec4,
} from 'three/tsl'
import { meshReflectionMaterialDefaults as defaults } from './props'
import type { MeshReflectionMaterialUniforms } from './props'

export interface MeshReflectionNodeMaterialParameters extends MeshStandardNodeMaterialParameters {
  mix?: number
  sharpMix?: number
  sharpDepthScale?: number
  sharpDepthBias?: number
  sharpDepthEdgeMin?: number
  sharpDepthEdgeMax?: number
  blurMixSmooth?: number
  blurMixRough?: number
  distortion?: number
  distortionMap?: Texture | null
  useBlur?: boolean
  useDepth?: boolean
}

// Older three releases name `TextureNode.sample` `uv`. Both keep the copy linked to the base node's texture.
const sampleAt = (node: TextureNode, coords: Node<'vec2'>): TextureNode =>
  'sample' in node ? node.sample(coords) : (node as unknown as { uv: (uv: Node<'vec2'>) => TextureNode }).uv(coords)

export class MeshReflectionNodeMaterial extends MeshStandardNodeMaterial implements MeshReflectionMaterialUniforms {
  // The `_` prefix keeps these out of the render object cache key.
  private readonly _reflectionUniforms = {
    textureMatrix: uniform(new Matrix4()),
    mix: uniform(defaults.mix),
    sharpMix: uniform(defaults.sharpMix),
    sharpDepthScale: uniform(defaults.sharpDepthScale),
    sharpDepthBias: uniform(defaults.sharpDepthBias),
    sharpDepthEdgeMin: uniform(defaults.sharpDepthEdgeMin),
    sharpDepthEdgeMax: uniform(defaults.sharpDepthEdgeMax),
    blurMixSmooth: uniform(defaults.blurMixSmooth),
    blurMixRough: uniform(defaults.blurMixRough),
    distortion: uniform(defaults.distortion),
    // WGSL does not allow `bool` in a uniform buffer, so the GLSL defines become 0/1 floats.
    useBlur: uniform(1),
    useDepth: uniform(1),
    useDistortion: uniform(0),
  }

  private readonly _emptyTexture = new Texture()
  // The depth fallback must be a depth texture too: WGSL types the binding from the first texture it sees.
  private readonly _emptyDepthTexture = new DepthTexture(1, 1)
  private readonly _sharpNode = texture(this._emptyTexture)
  private readonly _blurNode = texture(this._emptyTexture)
  private readonly _depthNode = texture(this._emptyDepthTexture)
  private readonly _distortionNode = texture(this._emptyTexture)
  private _tSharp: Texture | null = null
  private _tBlur: Texture | null = null
  private _tDepth: Texture | null = null
  private _distortionMap: Texture | null = null

  constructor(parameters: MeshReflectionNodeMaterialParameters = {}) {
    super()
    this.setValues(parameters)
  }

  // The private uniform nodes belong to this instance, so two reflectors must not share a node builder state.
  // A new `normalMap` must rebuild the shader, as the GLSL `USE_NORMALMAP` define does.
  override customProgramCacheKey() {
    return `${super.customProgramCacheKey()}-${this.uuid}-${this.normalMap?.uuid ?? ''}`
  }

  override setupLighting(builder: NodeBuilder) {
    const u = this._reflectionUniforms
    const roughnessFactor = materialRoughness

    const projected = varying(u.textureMatrix.mul(vec4(positionGeometry, 1.0)))
    const distortionFactor = this._distortionNode.r.sub(0.5).mul(u.distortion).mul(u.useDistortion)
    const distorted = vec4(projected.xy.add(distortionFactor), projected.zw)

    let reflectionUv: Node<'vec2'>
    // Read at build time like the GLSL `USE_NORMALMAP` define.
    if (this.normalMap) {
      const normalScale = materialReference('normalScale', 'vec2') as unknown as Node<'vec2'>
      const normalColor = texture(this.normalMap, uv().mul(normalScale))
      const reflectionNormal = normalize(vec3(normalColor.r.mul(2.0).sub(1.0), normalColor.b, normalColor.g.mul(2.0).sub(1.0)))
      const coord = distorted.xyz.div(distorted.w)
      reflectionUv = coord.xy.add(coord.z.mul(reflectionNormal.xz).mul(0.05))
    }
    else {
      reflectionUv = distorted.xy.div(distorted.w)
    }
    // Texture space has y down on WebGPU. three flips it back for render targets on the WebGL2 backend.
    const coords = vec2(reflectionUv.x, reflectionUv.y.oneMinus())

    const sharp = sampleAt(this._sharpNode, coords)
    const blur = sampleAt(this._blurNode, coords)
    const depth = sampleAt(this._depthNode, coords).x

    const depthFactor = clamp(
      u.sharpDepthScale.mul(smoothstep(u.sharpDepthEdgeMax.oneMinus(), u.sharpDepthEdgeMin.oneMinus(), depth.oneMinus().add(u.sharpDepthBias))),
      0.0,
      1.0,
    )
    const sharpColor = sharp.rgb.mul(mix(1.0, depthFactor, u.useDepth)).mul(roughnessFactor.oneMinus())
    const blurMix = u.blurMixSmooth.mul(roughnessFactor.oneMinus()).add(u.blurMixRough.mul(roughnessFactor))
    const reflection = u.mix.mul(sharpColor.mul(u.sharpMix).add(blur.rgb.mul(blurMix).mul(u.useBlur)))

    return (super.setupLighting(builder) as Node<'vec3'>).add(reflection)
  }

  override dispose() {
    this._emptyTexture.dispose()
    this._emptyDepthTexture.dispose()
    super.dispose()
  }

  get tSharp() { return this._tSharp }
  set tSharp(value: Texture | null) {
    this._tSharp = value
    this._sharpNode.value = value ?? this._emptyTexture
  }

  get tBlur() { return this._tBlur }
  set tBlur(value: Texture | null) {
    this._tBlur = value
    this._blurNode.value = value ?? this._emptyTexture
  }

  get tDepth() { return this._tDepth }
  set tDepth(value: Texture | null) {
    this._tDepth = value
    this._depthNode.value = value ?? this._emptyDepthTexture
  }

  get distortionMap() { return this._distortionMap }
  set distortionMap(value: Texture | null) {
    this._distortionMap = value
    this._distortionNode.value = value ?? this._emptyTexture
    this._reflectionUniforms.useDistortion.value = value ? 1 : 0
  }

  get textureMatrix() { return this._reflectionUniforms.textureMatrix.value }
  set textureMatrix(value: Matrix4 | null) {
    if (value) { this._reflectionUniforms.textureMatrix.value = value }
  }

  get mix() { return this._reflectionUniforms.mix.value }
  set mix(value: number) { this._reflectionUniforms.mix.value = value }

  get sharpMix() { return this._reflectionUniforms.sharpMix.value }
  set sharpMix(value: number) { this._reflectionUniforms.sharpMix.value = value }

  get sharpDepthScale() { return this._reflectionUniforms.sharpDepthScale.value }
  set sharpDepthScale(value: number) { this._reflectionUniforms.sharpDepthScale.value = value }

  get sharpDepthBias() { return this._reflectionUniforms.sharpDepthBias.value }
  set sharpDepthBias(value: number) { this._reflectionUniforms.sharpDepthBias.value = value }

  get sharpDepthEdgeMin() { return this._reflectionUniforms.sharpDepthEdgeMin.value }
  set sharpDepthEdgeMin(value: number) { this._reflectionUniforms.sharpDepthEdgeMin.value = value }

  get sharpDepthEdgeMax() { return this._reflectionUniforms.sharpDepthEdgeMax.value }
  set sharpDepthEdgeMax(value: number) { this._reflectionUniforms.sharpDepthEdgeMax.value = value }

  get blurMixSmooth() { return this._reflectionUniforms.blurMixSmooth.value }
  set blurMixSmooth(value: number) { this._reflectionUniforms.blurMixSmooth.value = value }

  get blurMixRough() { return this._reflectionUniforms.blurMixRough.value }
  set blurMixRough(value: number) { this._reflectionUniforms.blurMixRough.value = value }

  get distortion() { return this._reflectionUniforms.distortion.value }
  set distortion(value: number) { this._reflectionUniforms.distortion.value = value }

  get useBlur() { return this._reflectionUniforms.useBlur.value === 1 }
  set useBlur(value: boolean) { this._reflectionUniforms.useBlur.value = value ? 1 : 0 }

  get useDepth() { return this._reflectionUniforms.useDepth.value === 1 }
  set useDepth(value: boolean) { this._reflectionUniforms.useDepth.value = value ? 1 : 0 }
}
