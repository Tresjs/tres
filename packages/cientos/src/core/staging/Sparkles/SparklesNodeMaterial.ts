import type { BufferGeometry, Node, Texture, Vector3 } from 'three/webgpu'
import { InstancedBufferAttribute, Object3D, PointsNodeMaterial } from 'three/webgpu'
import {
  abs,
  cameraViewMatrix,
  cos,
  dot,
  float,
  fract,
  instancedBufferAttribute,
  max,
  mix,
  modelWorldMatrix,
  modelWorldMatrixInverse,
  screenDPR,
  select,
  sin,
  smoothstep,
  texture,
  uniform,
  uv,
  vec2,
  vec3,
  vec4,
} from 'three/tsl'
import useEmptyDataTexture from './useEmptyDataTexture'
import type { SparklesInfoRows, SparklesMaterialUniforms } from './props'
import { sparklesDefaults, toCooldownRatio, toNoiseScale } from './props'

// Draws each point as one instance of a `Sprite` quad: WebGPU draws point primitives at 1 pixel.
export class SparklesNodeMaterial extends PointsNodeMaterial implements SparklesMaterialUniforms {
  private readonly sparklesUniforms = {
    uNormal: uniform(Object3D.DEFAULT_UP.clone()),
    uPixelRatio: uniform(1),
    uNormalThreshold: uniform(sparklesDefaults.normalThreshold),
    uTime: uniform(0),
    uCooldownRatio: uniform(toCooldownRatio(sparklesDefaults.cooldownSec, sparklesDefaults.lifetimeSec)),
    uSize: uniform(sparklesDefaults.size),
    uAlpha: uniform(sparklesDefaults.alpha),
    uOffset: uniform(sparklesDefaults.offset),
    uSurfaceDistance: uniform(sparklesDefaults.surfaceDistance),
    uNoiseScale: uniform(toNoiseScale(sparklesDefaults.noiseScale, sparklesDefaults.lifetimeSec)),
    uScaleNoise: uniform(sparklesDefaults.scaleNoise),
    uOffsetNoise: uniform(sparklesDefaults.offsetNoise),
    uLifetimeNoise: uniform(sparklesDefaults.lifetimeNoise),
    uMixColor: uniform(sparklesDefaults.mixColor),
    uMixAlpha: uniform(sparklesDefaults.mixAlpha),
    uMixOffset: uniform(sparklesDefaults.mixOffset),
    uMixSize: uniform(sparklesDefaults.mixSize),
    uMixSurfaceDistance: uniform(sparklesDefaults.mixSurfaceDistance),
    uMixNoise: uniform(sparklesDefaults.mixNoise),
  }

  // Every sample below is a clone of these nodes and reads their `.value`, so a new texture needs no rebuild.
  private readonly mapNode = texture(useEmptyDataTexture())
  private readonly infoNode = texture(useEmptyDataTexture())

  constructor(private readonly yFor: SparklesInfoRows) {
    super()
    // ShaderMaterial has fog off and NodeMaterial has it on.
    this.fog = false
    // The size node does its own perspective scale, as `gl_PointSize` does in the GLSL.
    this.sizeAttenuation = false
  }

  // Returns the instance count. Like `Points`, an indexed geometry gets one point per index, so shared vertices repeat.
  setGeometry(geometry: BufferGeometry): number {
    const position = geometry.getAttribute('position')
    // WebGL reads a missing attribute as zero.
    const normal = geometry.getAttribute('normal')
    const index = geometry.getIndex()
    const { start, count: rangeCount } = geometry.drawRange
    const first = Math.max(0, start)
    const count = Math.max(0, Math.min(index ? index.count : position.count, first + rangeCount) - first)
    const positions = new Float32Array(count * 3)
    const normals = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const vertex = index ? index.getX(first + i) : first + i
      positions.set([position.getX(vertex), position.getY(vertex), position.getZ(vertex)], i * 3)
      if (normal) {
        normals.set([normal.getX(vertex), normal.getY(vertex), normal.getZ(vertex)], i * 3)
      }
    }

    this.buildNodes(
      instancedBufferAttribute(new InstancedBufferAttribute(positions, 3)),
      instancedBufferAttribute(new InstancedBufferAttribute(normals, 3)),
    )

    return count
  }

  private buildNodes(position: Node<'vec3'>, normal: Node<'vec3'>) {
    const u = this.sparklesUniforms
    const yFor = this.yFor

    // The vertex stage cannot pick a mip level, so each info sample reads level 0.
    const info = (x: Node<'float'>, row: number) => this.infoNode.sample(vec2(x, row)).level(float(0))

    const normalP = smoothstep(u.uNormalThreshold, 1, dot(normal, u.uNormal).mul(0.5).add(0.5))
    const lifetimeNoise = u.uLifetimeNoise.mul(mix(normalP, 1, u.uMixNoise))

    const t = u.uTime
      .add(position.x.mul(u.uNoiseScale))
      .add(position.y.mul(10).mul(u.uNoiseScale))
      .add(position.z.mul(7.3).mul(u.uNoiseScale))
      .add(sin(lifetimeNoise.mul(position.x.add(position.y.mul(13)))).mul(lifetimeNoise))

    const lifetimeP = max(float(-0.0001), mix(u.uCooldownRatio.negate(), cos(t).mul(lifetimeNoise).add(1), fract(t)))
    const progress = (mixFactor: Node<'float'>) => mix(normalP, lifetimeP, mixFactor)

    const surfaceDistance = info(progress(u.uMixSurfaceDistance), yFor.sequenceSurfaceDistance).x.mul(u.uSurfaceDistance)
    const noise = info(progress(u.uMixNoise), yFor.sequenceNoise).xyz
    const offset = info(progress(u.uMixOffset), yFor.sequenceOffset).xyz.mul(2).sub(1).mul(u.uOffset)
    const wave = t.mul(u.uNoiseScale).mul(10)

    // The GLSL adds the noise and offset in world space. positionNode is local, so the result goes back through the inverse.
    const world = modelWorldMatrix.mul(vec4(position.add(normal.mul(surfaceDistance)), 1)).xyz.add(vec3(cos(wave), sin(wave), cos(wave)).mul(u.uOffsetNoise.mul(0.2)).mul(noise)).add(offset)

    this.positionNode = modelWorldMatrixInverse.mul(vec4(world, 1)).xyz

    // `gl_PointSize` is in device pixels. PointsNodeMaterial multiplies sizeNode by the device pixel ratio, so divide by it here.
    const viewZ = cameraViewMatrix.mul(vec4(world, 1)).z
    const pointSize = float(2)
      .mul(info(progress(u.uMixSize), yFor.sequenceSize).x)
      .mul(mix(float(1), abs(sin(t.mul(u.uNoiseScale).add(position.x.mul(13.9)).add(position.y.mul(73.1)))), u.uScaleNoise))
      .mul(u.uSize)
      .mul(float(100).div(viewZ.negate()))
      .mul(u.uPixelRatio)

    // The GLSL moves a hidden point out of clip space. A quad of size 0 draws no pixels.
    const hidden = pointSize.lessThan(0.6).or(lifetimeP.lessThan(0))
    this.sizeNode = select(hidden, float(0), pointSize.div(screenDPR))

    const color = info(progress(u.uMixColor), yFor.sequenceColor)
      .mul(info(progress(u.uMixAlpha), yFor.sequenceAlpha).x)
      .mul(u.uAlpha)

    // `gl_PointCoord` starts at the top of the point and the sprite uv starts at the bottom.
    this.colorNode = color.toVarying().mul(this.mapNode.sample(vec2(uv().x, uv().y.oneMinus())))

    this.needsUpdate = true
  }

  get uMap(): Texture { return this.mapNode.value }
  set uMap(value: Texture) { this.mapNode.value = value }

  get uInfoTexture(): Texture { return this.infoNode.value }
  set uInfoTexture(value: Texture) { this.infoNode.value = value }

  get uNormal(): Vector3 { return this.sparklesUniforms.uNormal.value }

  get uPixelRatio() { return this.sparklesUniforms.uPixelRatio.value }
  set uPixelRatio(value: number) { this.sparklesUniforms.uPixelRatio.value = value }

  get uNormalThreshold() { return this.sparklesUniforms.uNormalThreshold.value }
  set uNormalThreshold(value: number) { this.sparklesUniforms.uNormalThreshold.value = value }

  get uTime() { return this.sparklesUniforms.uTime.value }
  set uTime(value: number) { this.sparklesUniforms.uTime.value = value }

  get uCooldownRatio() { return this.sparklesUniforms.uCooldownRatio.value }
  set uCooldownRatio(value: number) { this.sparklesUniforms.uCooldownRatio.value = value }

  get uSize() { return this.sparklesUniforms.uSize.value }
  set uSize(value: number) { this.sparklesUniforms.uSize.value = value }

  get uAlpha() { return this.sparklesUniforms.uAlpha.value }
  set uAlpha(value: number) { this.sparklesUniforms.uAlpha.value = value }

  get uOffset() { return this.sparklesUniforms.uOffset.value }
  set uOffset(value: number) { this.sparklesUniforms.uOffset.value = value }

  get uSurfaceDistance() { return this.sparklesUniforms.uSurfaceDistance.value }
  set uSurfaceDistance(value: number) { this.sparklesUniforms.uSurfaceDistance.value = value }

  get uNoiseScale() { return this.sparklesUniforms.uNoiseScale.value }
  set uNoiseScale(value: number) { this.sparklesUniforms.uNoiseScale.value = value }

  get uScaleNoise() { return this.sparklesUniforms.uScaleNoise.value }
  set uScaleNoise(value: number) { this.sparklesUniforms.uScaleNoise.value = value }

  get uOffsetNoise() { return this.sparklesUniforms.uOffsetNoise.value }
  set uOffsetNoise(value: number) { this.sparklesUniforms.uOffsetNoise.value = value }

  get uLifetimeNoise() { return this.sparklesUniforms.uLifetimeNoise.value }
  set uLifetimeNoise(value: number) { this.sparklesUniforms.uLifetimeNoise.value = value }

  get uMixColor() { return this.sparklesUniforms.uMixColor.value }
  set uMixColor(value: number) { this.sparklesUniforms.uMixColor.value = value }

  get uMixAlpha() { return this.sparklesUniforms.uMixAlpha.value }
  set uMixAlpha(value: number) { this.sparklesUniforms.uMixAlpha.value = value }

  get uMixOffset() { return this.sparklesUniforms.uMixOffset.value }
  set uMixOffset(value: number) { this.sparklesUniforms.uMixOffset.value = value }

  get uMixSize() { return this.sparklesUniforms.uMixSize.value }
  set uMixSize(value: number) { this.sparklesUniforms.uMixSize.value = value }

  get uMixSurfaceDistance() { return this.sparklesUniforms.uMixSurfaceDistance.value }
  set uMixSurfaceDistance(value: number) { this.sparklesUniforms.uMixSurfaceDistance.value = value }

  get uMixNoise() { return this.sparklesUniforms.uMixNoise.value }
  set uMixNoise(value: number) { this.sparklesUniforms.uMixNoise.value = value }
}
