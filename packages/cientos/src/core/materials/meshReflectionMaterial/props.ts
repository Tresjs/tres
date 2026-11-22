// Imports nothing from `three/webgpu`: the root entry reaches this file.
import type { TresColor } from '@tresjs/core'
import type { Matrix4, Texture } from 'three'
import { Color, Euler, TangentSpaceNormalMap, Vector2 } from 'three'

export interface MeshReflectionMaterialProps {

  /** Length in pixels of one side of the square reflective textures. */
  resolution?: number
  /** Overall strength of the reflection. */
  mix?: number

  /** Strength of the sharp reflection on smooth surfaces. */
  sharpMix?: number
  /** Sharp reflection can be faded out by depth – distance from the reflective surface. `0` turns the fade off. */
  sharpDepthScale?: number
  /** Sharp reflection depth falloff bias. */
  sharpDepthBias?: number
  /** Sharp reflection depth falloff start. */
  sharpDepthEdgeMin?: number
  /** Sharp reflection depth falloff end. */
  sharpDepthEdgeMax?: number

  /** Strength of the blurred reflection on smooth surfaces. */
  blurMixSmooth?: number
  /** Strength of the blurred reflection on rough surfaces. */
  blurMixRough?: number
  /** Blurred reflection can spread out by depth – distance from the reflective surface. `0` turns the spread off. */
  blurDepthScale?: number
  /** Blurred reflection depth spread bias. */
  blurDepthBias?: number
  /** Blurred reflection depth spread start. */
  blurDepthEdgeMin?: number
  /** Blurred reflection depth spread end. */
  blurDepthEdgeMax?: number
  /** Size of the blur. If `[number, number]`, first number is width, second is height. */
  blurSize?: [number, number] | number

  /** Texture for offsetting the reflection. */
  distortionMap?: Texture
  /** Influence of `distortionMap`. */
  distortion?: number
  /** Offsets the reflection. */
  reflectorOffset?: number

  color?: TresColor
  roughness?: number
  metalness?: number
  map?: Texture
  lightMap?: Texture
  lightMapIntensity?: number
  aoMap?: Texture | null
  aoMapIntensity?: number
  emissive?: TresColor
  emissiveIntensity?: number
  emissiveMap?: Texture
  bumpMap?: Texture
  bumpScale?: number
  normalMap?: Texture
  normalMapType?: number
  normalScale?: Vector2
  displacementMap?: Texture
  displacementScale?: number
  displacementBias?: number
  roughnessMap?: Texture | null
  metalnessMap?: Texture | null
  alphaMap?: Texture | null
  envMap?: Texture | null
  envMapRotation?: Euler
  envMapIntensity?: number
  wireframe?: boolean
  wireframeLinewidth?: number
  wireframeLinecap?: string
  wireframeLinejoin?: string
  flatShading?: boolean
  fog?: boolean
}

// NOTE: If you remove the MeshStandardMaterial defaults below, check that fall-through props
// like `roughnessMap` and `normalMap` still reach the material.
export const meshReflectionMaterialDefaults = {
  resolution: 256,
  mix: 1,

  sharpMix: 1,
  sharpDepthEdgeMin: 0.0,
  sharpDepthEdgeMax: 0.2,
  sharpDepthScale: 1,
  sharpDepthBias: 0,

  blurMixSmooth: 1,
  blurMixRough: 1,
  blurDepthEdgeMin: 0.0,
  blurDepthEdgeMax: 0.2,
  blurDepthScale: 1,
  blurDepthBias: 0,
  blurSize: () => [0, 0] as [number, number],

  distortion: 0,
  reflectorOffset: 0,

  color: () => new Color(0x333333),
  roughness: 1.0,
  roughnessMap: null,
  metalness: 0.0,
  lightMapIntensity: 1.0,
  aoMapIntensity: 1.0,
  emissive: () => new Color(0x000000),
  emissiveIntensity: 1.0,
  bumpScale: 1,
  normalMapType: TangentSpaceNormalMap,
  normalScale: () => new Vector2(1, 1),
  displacementScale: 1,
  displacementBias: 0,
  envMapRotation: () => new Euler(),
  envMapIntensity: 1.0,
  wireframe: false,
  wireframeLinewidth: 1,
  wireframeLinecap: 'round',
  wireframeLinejoin: 'round',
  flatShading: false,
  fog: true,
}

export interface MeshReflectionMaterialUniforms {
  tSharp: Texture | null
  tDepth: Texture | null
  tBlur: Texture | null
  textureMatrix: Matrix4 | null
}
