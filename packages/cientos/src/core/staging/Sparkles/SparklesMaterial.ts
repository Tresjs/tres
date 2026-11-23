import type { Texture, Vector3 } from 'three'
import { Object3D, REVISION, ShaderMaterial, Uniform } from 'three'
import useEmptyDataTexture from './useEmptyDataTexture'
import type { SparklesInfoRows, SparklesMaterialUniforms } from './props'
import { sparklesDefaults, toCooldownRatio, toNoiseScale } from './props'

const version = Number.parseInt(REVISION.replace(/\D+/g, ''))

// `SparklesNodeMaterial.ts` ports this shader to TSL. A fix here must go there too.
export class SparklesMaterial extends ShaderMaterial implements SparklesMaterialUniforms {
  constructor(yFor: SparklesInfoRows) {
    super({
      uniforms: {
        uMap: new Uniform(useEmptyDataTexture()),
        uPixelRatio: new Uniform(1),
        // A copy: `useSparkles` writes into this vector every frame.
        uNormal: new Uniform(Object3D.DEFAULT_UP.clone()),
        uNormalThreshold: new Uniform(sparklesDefaults.normalThreshold),
        uTime: new Uniform(0),
        uCooldownRatio: new Uniform(toCooldownRatio(sparklesDefaults.cooldownSec, sparklesDefaults.lifetimeSec)),
        uSize: new Uniform(sparklesDefaults.size),
        uAlpha: new Uniform(sparklesDefaults.alpha),
        uOffset: new Uniform(sparklesDefaults.offset),
        uSurfaceDistance: new Uniform(sparklesDefaults.surfaceDistance),
        uNoiseScale: new Uniform(toNoiseScale(sparklesDefaults.noiseScale, sparklesDefaults.lifetimeSec)),
        uScaleNoise: new Uniform(sparklesDefaults.scaleNoise),
        uOffsetNoise: new Uniform(sparklesDefaults.offsetNoise),
        uLifetimeNoise: new Uniform(sparklesDefaults.lifetimeNoise),
        uMixColor: new Uniform(sparklesDefaults.mixColor),
        uMixAlpha: new Uniform(sparklesDefaults.mixAlpha),
        uMixOffset: new Uniform(sparklesDefaults.mixOffset),
        uMixSize: new Uniform(sparklesDefaults.mixSize),
        uMixSurfaceDistance: new Uniform(sparklesDefaults.mixSurfaceDistance),
        uMixNoise: new Uniform(sparklesDefaults.mixNoise),
        uInfoTexture: new Uniform(useEmptyDataTexture()),
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
    })
  }

  get uMap(): Texture { return this.uniforms.uMap.value }
  set uMap(value: Texture) { this.uniforms.uMap.value = value }

  get uInfoTexture(): Texture { return this.uniforms.uInfoTexture.value }
  set uInfoTexture(value: Texture) { this.uniforms.uInfoTexture.value = value }

  get uNormal(): Vector3 { return this.uniforms.uNormal.value }

  get uPixelRatio() { return this.uniforms.uPixelRatio.value }
  set uPixelRatio(value: number) { this.uniforms.uPixelRatio.value = value }

  get uNormalThreshold() { return this.uniforms.uNormalThreshold.value }
  set uNormalThreshold(value: number) { this.uniforms.uNormalThreshold.value = value }

  get uTime() { return this.uniforms.uTime.value }
  set uTime(value: number) { this.uniforms.uTime.value = value }

  get uCooldownRatio() { return this.uniforms.uCooldownRatio.value }
  set uCooldownRatio(value: number) { this.uniforms.uCooldownRatio.value = value }

  get uSize() { return this.uniforms.uSize.value }
  set uSize(value: number) { this.uniforms.uSize.value = value }

  get uAlpha() { return this.uniforms.uAlpha.value }
  set uAlpha(value: number) { this.uniforms.uAlpha.value = value }

  get uOffset() { return this.uniforms.uOffset.value }
  set uOffset(value: number) { this.uniforms.uOffset.value = value }

  get uSurfaceDistance() { return this.uniforms.uSurfaceDistance.value }
  set uSurfaceDistance(value: number) { this.uniforms.uSurfaceDistance.value = value }

  get uNoiseScale() { return this.uniforms.uNoiseScale.value }
  set uNoiseScale(value: number) { this.uniforms.uNoiseScale.value = value }

  get uScaleNoise() { return this.uniforms.uScaleNoise.value }
  set uScaleNoise(value: number) { this.uniforms.uScaleNoise.value = value }

  get uOffsetNoise() { return this.uniforms.uOffsetNoise.value }
  set uOffsetNoise(value: number) { this.uniforms.uOffsetNoise.value = value }

  get uLifetimeNoise() { return this.uniforms.uLifetimeNoise.value }
  set uLifetimeNoise(value: number) { this.uniforms.uLifetimeNoise.value = value }

  get uMixColor() { return this.uniforms.uMixColor.value }
  set uMixColor(value: number) { this.uniforms.uMixColor.value = value }

  get uMixAlpha() { return this.uniforms.uMixAlpha.value }
  set uMixAlpha(value: number) { this.uniforms.uMixAlpha.value = value }

  get uMixOffset() { return this.uniforms.uMixOffset.value }
  set uMixOffset(value: number) { this.uniforms.uMixOffset.value = value }

  get uMixSize() { return this.uniforms.uMixSize.value }
  set uMixSize(value: number) { this.uniforms.uMixSize.value = value }

  get uMixSurfaceDistance() { return this.uniforms.uMixSurfaceDistance.value }
  set uMixSurfaceDistance(value: number) { this.uniforms.uMixSurfaceDistance.value = value }

  get uMixNoise() { return this.uniforms.uMixNoise.value }
  set uMixNoise(value: number) { this.uniforms.uMixNoise.value = value }
}
