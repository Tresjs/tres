import type { TresColor, VectorFlexibleParams } from '@tresjs/core'
import type { Blending, BufferGeometry, Object3D, Texture, Vector3 } from 'three'
import { AdditiveBlending } from 'three'
import type { Gradient } from '../../../utils/Gradient'

// No `three/webgpu` or `three/tsl` imports: the root entry reaches this file.

export interface SparklesProps {
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

export const sparklesDefaults = {
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

  sequenceColor: (): Gradient<TresColor> => [[0.7, '#82dbc5'], [0.8, '#fbb03b']],
  sequenceAlpha: (): Gradient<number> => [[0.0, 0.0], [0.10, 1.0], [0.5, 1.0], [0.9, 0.0]],
  sequenceOffset: (): Gradient<VectorFlexibleParams> => [0.0, 0.0, 0.0],
  sequenceSurfaceDistance: (): Gradient<number> => [0.05, 0.08, 0.1],
  sequenceSize: (): Gradient<number> => [0.0, 1.0],
  sequenceNoise: (): Gradient<VectorFlexibleParams> => [0.1, 0.1, 0.1],

  mixColor: 0.5,
  mixAlpha: 1.0,
  mixOffset: 1.0,
  mixSize: 0.0,
  mixSurfaceDistance: 1.0,
  mixNoise: 1.0,

  blending: AdditiveBlending,
  transparent: true,
  depthWrite: false,
}

// Scaling by lifetime keeps the noise period when `lifetimeSec` changes.
export const toNoiseScale = (noiseScale: number, lifetimeSec: number) => noiseScale * lifetimeSec
export const toCooldownRatio = (cooldownSec: number, lifetimeSec: number) => cooldownSec / lifetimeSec

export type SparklesResolvedProps = Required<Omit<SparklesProps, 'geometry' | 'directionalLight'>> & Pick<SparklesProps, 'geometry' | 'directionalLight'>

export type SparklesInfoRows = Record<
  'sequenceColor' | 'sequenceAlpha' | 'sequenceSurfaceDistance' | 'sequenceSize' | 'sequenceOffset' | 'sequenceNoise',
  number
>

// GLSL uniform names, which also keep clear of `PointsMaterial` properties such as `size` and `map`.
export interface SparklesMaterialUniforms {
  uMap: Texture
  uInfoTexture: Texture
  /** Light direction in the local space of the sparkles */
  readonly uNormal: Vector3
  uPixelRatio: number
  uNormalThreshold: number
  uTime: number
  uCooldownRatio: number
  uSize: number
  uAlpha: number
  uOffset: number
  uSurfaceDistance: number
  uNoiseScale: number
  uScaleNoise: number
  uOffsetNoise: number
  uLifetimeNoise: number
  uMixColor: number
  uMixAlpha: number
  uMixOffset: number
  uMixSize: number
  uMixSurfaceDistance: number
  uMixNoise: number
}
