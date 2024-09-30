<script lang="ts" setup>
import { useLoop, useTexture, useTresContext } from '@tresjs/core'
import {
  AdditiveBlending,
  IcosahedronGeometry,
  Object3D,
  Points,
  Quaternion,
  REVISION,
  ShaderMaterial,
  Uniform,
  Vector3,
} from 'three'
import { onMounted, onUnmounted, shallowRef, toRefs, watch } from 'vue'
import type { TresColor, VectorFlexibleParams } from '@tresjs/core'
import type { Blending, BufferGeometry, IUniform, ShaderMaterialParameters, Texture } from 'three'
import type { Ref } from 'vue'
import ShaderDataBuilder from './ShaderDataBuilder'
import useEmptyDataTexture from './useEmptyDataTexture'
import type { Gradient } from '../../../utils/Gradient'

interface SparkleProps {
  /**
   * Texture or image path for individual sparkles
   */
  map?: Texture | string
  /**
   * Vertices of the geometry will be used to emit sparkles. Geometry normals are used for sparkles' traveling direction and for responding to the directional light prop.
   *
   * - If provided, the component will use the passed geometry.
   * - If no geometry is provided, the component will try to make a copy of the parent object's geometry.
   * - If no parent geometry exists, the component will create and use an IcosphereGeometry.
   */
  geometry?: Object3D | BufferGeometry
  /**
   * Particles "light up" when their normal "faces" the light. If no `directionalLight` is provided, the default "up" vector will be used.
   */
  directionalLight?: Object3D
  /**
   * Particle lifetime in seconds
   */
  lifetimeSec?: number
  /**
   * Particle cooldown in seconds – time between lifetime end and respawn
   */
  cooldownSec?: number
  /**
   * Number from 0-1 indicating how closely the particle needs to be faced towards the light to "light up". (Lower == more flexible)
   */
  normalThreshold?: number
  /**
   * Scale of the noise period (lower == more slowly cycling noise)
   */
  noiseScale?: number
  /**
   * Noise coefficient applied to particle scale
   */
  scaleNoise?: number
  /**
   * Noise coefficient applied to particle offset
   */
  offsetNoise?: number
  /**
   * Noise coefficient applied to particle lifetime
   */
  lifetimeNoise?: number
  /**
   * Particle scale multiplier
   */
  size?: number
  /**
   * Opacity multiplier
   */
  alpha?: number
  /**
   * Offset multiplier
   */
  offset?: number
  /**
   * Surface distance multiplier
   */
  surfaceDistance?: number
  /**
   * '*Sequence' props: specify how a particle changes as it "progresses". See also "mix*" props.
   *
   * Color sequence as particles progress
   */
  sequenceColor?: Gradient<TresColor>
  /**
   * Opacity sequence as particles progress
   */
  sequenceAlpha?: Gradient<number>
  /**
   * Distance sequence as particles progress
   */
  sequenceOffset?: Gradient<VectorFlexibleParams>
  /**
   * Noise sequence as particles progress
   */
  sequenceNoise?: Gradient<VectorFlexibleParams>
  /**
   * Size sequence as particles progress
   */
  sequenceSize?: Gradient<number>
  /**
   * Distance from surface (along normal) as particles progress
   */
  sequenceSurfaceDistance?: Gradient<number>
  /**
   * 'mix*' props: A particle "progresses" with a mix of two factors:
   *
   * its normal "facing" the directionalLight
   * its lifetime
   *
   * 'mix*' props specify the relationship between the two factors.
   *
   * How is a particle's progress for color calculated? (0: normal, 1: particle lifetime)
   */
  mixColor?: number
  /**
   * How is a particle's progress for alpha calculated? (0: normal, 1: particle lifetime)
   */
  mixAlpha?: number
  /**
   * How is a particle's progress for offset calculated? (0: normal, 1: particle lifetime)
   */
  mixOffset?: number
  /**
   * How is a particle's progress for size calculated? (0: normal, 1: particle lifetime)
   */
  mixSize?: number
  /**
   * How is a particle's progress for surface distance calculated? (0: normal, 1: particle lifetime)
   */
  mixSurfaceDistance?: number
  /**
   * How is a particle's progress for lifetime calculated? (0: normal, 1: particle lifetime)
   */
  mixNoise?: number
  /**
   * Material blending
   */
  blending?: Blending
  /**
   * Material transparency
   */
  transparent?: boolean
  /**
   * Material depth write
   */
  depthWrite?: boolean
}

const props = withDefaults(defineProps<SparkleProps>(), {
  map: 'https://raw.githubusercontent.com/Tresjs/assets/'
    + 'e41a93c56ec7cb5ac2d241f309e23582a5fe1fc6/textures/sparkles/particle.png',
  geometry: undefined,
  directionalLight: undefined,

  lifetimeSec: 0.4,
  cooldownSec: 2.0,

  size: 1.0,
  alpha: 1.0,
  offset: 1.0,
  noiseScale: 3.0,
  surfaceDistance: 1.0,

  scaleNoise: 1.0,
  offsetNoise: 0.1,
  lifetimeNoise: 0.0,

  normalThreshold: 0.7,

  sequenceColor: () => [[0.7, '#82dbc5'], [0.8, '#fbb03b']],
  sequenceAlpha: () => [[0.0, 0.0], [0.10, 1.0], [0.5, 1.0], [0.9, 0.0]],
  sequenceOffset: () => [0.0, 0.0, 0.0],
  sequenceSurfaceDistance: () => [0.05, 0.08, 0.1],
  sequenceSize: () => [0.0, 1.0],
  sequenceNoise: () => [0.1, 0.1, 0.1],

  mixColor: 0.5,
  mixAlpha: 1.0,
  mixOffset: 1.0,
  mixSize: 0.0,
  mixSurfaceDistance: 1.0,
  mixNoise: 1.0,

  blending: AdditiveBlending,
  transparent: true,
  depthWrite: false,
})

const version = Number.parseInt(REVISION.replace(/\D+/g, ''))

const refs = toRefs(props)
const map: Texture = typeof props.map === 'string' ? useEmptyDataTexture() : props.map
const { texture: infoTexture, yFor } = new ShaderDataBuilder(256)
  .add
  .GradientTresColor(refs.sequenceColor)
  .id('sequenceColor')
  .add
  .Gradient01(refs.sequenceAlpha)
  .id('sequenceAlpha')
  .add
  .Gradient01(refs.sequenceSurfaceDistance)
  .id('sequenceSurfaceDistance')
  .add
  .Gradient01(refs.sequenceSize)
  .id('sequenceSize')
  .add
  .GradientXyz(refs.sequenceOffset, -1, 1)
  .id('sequenceOffset')
  .add
  .GradientXyz(refs.sequenceNoise, 0, 1)
  .id('sequenceNoise')
  .build()
  .useTexture()

const shaderMaterialParameters: ShaderMaterialParameters = {
  blending: props.blending,
  transparent: props.transparent,
  depthWrite: props.depthWrite,
  uniforms: {
    uMap: new Uniform(map),
    uPixelRatio: new Uniform(1),
    uNormal: new Uniform(Object3D.DEFAULT_UP),
    uNormalThreshold: new Uniform(props.normalThreshold),
    uTime: new Uniform(0),
    uCooldownRatio: new Uniform(1),
    uSize: new Uniform(props.size),
    uAlpha: new Uniform(props.alpha),
    uOffset: new Uniform(props.offset),
    uSurfaceDistance: new Uniform(props.surfaceDistance),
    uNoiseScale: new Uniform(props.noiseScale),
    uScaleNoise: new Uniform(props.scaleNoise),
    uOffsetNoise: new Uniform(props.offsetNoise),
    uLifetimeNoise: new Uniform(props.lifetimeNoise),
    uMixColor: new Uniform(props.mixColor),
    uMixAlpha: new Uniform(props.mixAlpha),
    uMixOffset: new Uniform(props.mixOffset),
    uMixSize: new Uniform(props.mixSize),
    uMixSurfaceDistance: new Uniform(props.mixSurfaceDistance),
    uMixNoise: new Uniform(props.mixNoise),
    uInfoTexture: new Uniform(infoTexture.value),
  },
  vertexShader: `
    uniform float uPixelRatio;
    uniform vec3 uNormal;
    uniform float uNormalThreshold;
    uniform float uTime;
    uniform float uCooldownRatio;
    uniform float uSize;
    uniform float uAlpha;
    uniform float uOffset;
    uniform float uSurfaceDistance;
    uniform float uNoiseScale;
    uniform float uScaleNoise;
    uniform float uOffsetNoise;
    uniform float uLifetimeNoise;
    uniform float uMixColor;
    uniform float uMixAlpha;
    uniform float uMixOffset;
    uniform float uMixSize;
    uniform float uMixSurfaceDistance;
    uniform float uMixNoise;
    uniform sampler2D uInfoTexture;

    varying vec4 vColor;

    void main() {
      float dotNormal = dot(normal, uNormal) * 0.5 + 0.5;
      float normalP = smoothstep(uNormalThreshold, 1., dotNormal);
      float lifetimeNoise = uLifetimeNoise * mix(normalP, 1.0, uMixNoise);

      float t = uTime + position.x * 1. * uNoiseScale + position.y * 10. * uNoiseScale + 
      position.z * 7.3 * uNoiseScale + sin(lifetimeNoise * (position.x + 13. * position.y)) * lifetimeNoise;

      float lifetimeP = max(-0.0001, mix(-uCooldownRatio, 1. + cos(t) * lifetimeNoise, fract(t)));
      float surfaceDistance = texture2D(uInfoTexture, vec2(
        mix(normalP, lifetimeP, uMixSurfaceDistance),
        ${yFor.sequenceSurfaceDistance})).x * uSurfaceDistance;

      vec4 modelPosition = modelMatrix * (vec4(position, 1.0) + vec4(normal * surfaceDistance, 0.0));
      vec3 noise = texture2D(uInfoTexture, vec2(
        mix(normalP, lifetimeP, uMixNoise),
        ${yFor.sequenceNoise})).xyz;
      vec3 offset = uOffset * (texture2D(uInfoTexture, vec2(
        mix(normalP, lifetimeP, uMixOffset),
        ${yFor.sequenceOffset})).xyz * 2.0 - vec3(1.0, 1.0, 1.0));
      modelPosition.x += cos(t * uNoiseScale * 10.0) * 0.2 * uOffsetNoise * noise.x + offset.x;
      modelPosition.y += sin(t * uNoiseScale * 10.0) * 0.2 * uOffsetNoise * noise.y + offset.y;
      modelPosition.z += cos(t * uNoiseScale * 10.0) * 0.2 * uOffsetNoise * noise.z + offset.z;

      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectionPostion = projectionMatrix * viewPosition;
      gl_Position = projectionPostion;

      gl_PointSize = 2.
      * texture2D(uInfoTexture, vec2(mix(normalP, lifetimeP, uMixSize), ${yFor.sequenceSize})).x
      * mix(1., abs(sin(t * uNoiseScale + position.x * 13.9 + position.y * 73.1)), uScaleNoise)
      * uSize * (100.0 / -viewPosition.z) * uPixelRatio;

      if (gl_PointSize < 0.6 || lifetimeP < 0.0) { gl_Position = vec4(2, 2, 2, 1); }

      vColor = texture2D(uInfoTexture, vec2(mix(normalP, lifetimeP, uMixColor), ${yFor.sequenceColor}))
      * texture2D(uInfoTexture, vec2(mix(normalP, lifetimeP, uMixAlpha), ${yFor.sequenceAlpha})).x * uAlpha;
    }`,
  fragmentShader: `
    varying vec4 vColor;

    uniform sampler2D uMap;
    uniform sampler2D uInfoTexture;

    void main() {
      gl_FragColor = vColor * texture2D(uMap, gl_PointCoord);
      #include <tonemapping_fragment>
      #include <${version >= 154 ? 'colorspace_fragment' : 'encodings_fragment'}>
    }`,
}

const mat = new ShaderMaterial(shaderMaterialParameters)
const sparkles = new Points(undefined, mat)

const u = mat.uniforms
const NOW = { immediate: true }

const uniformsRefs: [IUniform, Ref][] = [
  [u.uPixelRatio, useTresContext().sizes.aspectRatio],
  [u.uSize, refs.size],
  [u.uNormalThreshold, refs.normalThreshold],
  [u.uAlpha, refs.alpha],
  [u.uOffset, refs.offset],
  [u.uOffsetNoise, refs.offsetNoise],
  [u.uMixColor, refs.mixColor],
  [u.uMixAlpha, refs.mixAlpha],
  [u.uMixOffset, refs.mixOffset],
  [u.uMixSize, refs.mixSize],
  [u.uMixSurfaceDistance, refs.mixSurfaceDistance],
  [u.uMixNoise, refs.mixNoise],
  [u.uInfoTexture, infoTexture],
]

uniformsRefs.forEach(
  ([uniform, ref]) => watch(
    ref,
    () => { uniform.value = ref.value },
    NOW,
  ),
)

watch([refs.noiseScale, refs.lifetimeSec], () => {
  // NOTE: Scale noise by lifetime so that scaling lifetime keeps same noise period
  u.uNoiseScale.value = refs.noiseScale.value * refs.lifetimeSec.value
}, NOW)

watch([refs.lifetimeSec, refs.cooldownSec], () => { u.uCooldownRatio.value = refs.cooldownSec.value / refs.lifetimeSec.value }, NOW)

watch(refs.map, () => {
  if (typeof refs.map.value === 'string') {
    useTexture([refs.map.value]).then(texture => mat.uniforms.uMap.value = texture)
  }
  else {
    mat.uniforms.uMap.value = refs.map.value
  }
})

const rotation = new Quaternion()
const normal = new Vector3()
useLoop().onBeforeRender(({ elapsed, invalidate }) => {
  sparkles.getWorldQuaternion(rotation)
  normal.copy(props.directionalLight ? props.directionalLight.position : Object3D.DEFAULT_UP).normalize()
  normal.applyQuaternion(rotation.invert())
  mat.uniforms.uNormal.value = normal
  mat.uniforms.uTime.value = elapsed / (props.cooldownSec + props.lifetimeSec)
  invalidate()
})

function isObject3D(o: any): o is Object3D {
  return o && 'isObject3D' in o
}

function isBufferGeometry(o: any): o is BufferGeometry {
  return o && 'isBufferGeometry' in o
}

onMounted(() => {
  if (props.geometry) {
    if (isBufferGeometry(props.geometry)) {
      sparkles.geometry.copy(props.geometry)
    }
    else if (isObject3D(props.geometry) && 'geometry' in props.geometry && isBufferGeometry(props.geometry.geometry)) {
      sparkles.geometry.copy(props.geometry.geometry)
    }
  }
  else if (isObject3D(sparkles.parent) && 'geometry' in sparkles.parent && isBufferGeometry(sparkles.parent.geometry)) {
    sparkles.geometry.copy(sparkles.parent.geometry)
  }
  else {
    sparkles.geometry = new IcosahedronGeometry(1, 16)
  }

  if (typeof props.map === 'string') {
    useTexture([props.map]).then(texture => mat.uniforms.uMap.value = texture)
  }
})

onUnmounted(() => {
  mat.uniforms.uMap.value?.dispose()
  infoTexture.value.dispose()
  mat.dispose()
})

const sparkleRef = shallowRef()
defineExpose({ instance: sparkles })
</script>

<template>
  <primitive ref="sparkleRef" :object="sparkles" />
</template>
