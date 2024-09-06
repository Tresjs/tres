<!-- eslint-disable vue/attribute-hyphenation -->
<script setup lang="ts">
import { useLogger, useLoop, useTresContext } from '@tresjs/core'
import {
  Color,
  DepthTexture,
  Euler,
  HalfFloatType,
  LinearFilter,
  Matrix4,
  PerspectiveCamera,
  Plane,
  TangentSpaceNormalMap,
  Vector2,
  Vector3,
  Vector4,
  WebGLRenderTarget,
} from 'three'
import { computed, onBeforeUnmount, shallowRef, watch } from 'vue'
import type { TresColor } from '@tresjs/core'
import type {
  Camera,
  Object3D,
  Scene,
  Texture,
  WebGLRenderer,
} from 'three'
import { BlurPass } from './BlurPass'
import { MeshReflectionMaterial } from './material'

export interface MeshReflectionMaterialProps {

  /** Length in pixels of one side of the square reflective textures. */
  resolution?: number
  /** Overall strength of the reflection. */
  mix?: number

  /** Strength of the sharp reflection on smooth surfaces. */
  sharpMix?: number
  /** Sharp reflection can be faded out by depth – distance from the reflective surface. Performance note: if the value is greater than `0`, a depth texture will be created. */
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
  /** Blurred reflection can spread out by depth – distance from the reflective surface. Performance note: if the value is greater than `0`, depth texture will be rendered. */
  blurDepthScale?: number
  /** Blurred reflection depth spread bias. */
  blurDepthBias?: number
  /** Blurred reflection depth spread start. */
  blurDepthEdgeMin?: number
  /** Blurred reflection depth spread end. */
  blurDepthEdgeMax?: number
  /** Size of the blur. If `[number, number]`, first number is width, second is height. Performance note: if other than `[0, 0]` or `0`, a blur texture will be rendered. */
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
const props = withDefaults(
  defineProps<MeshReflectionMaterialProps>(),
  {
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
    blurSize: () => [0, 0],

    distortion: 0,
    reflectorOffset: 0,

    // NOTE: MeshStandardMaterial props
    // If you try to simplify this file by removing the props below
    // make sure that the fall-through props like 'roughnessMap' and
    // 'normalMap' are actually falling through and visible in the material.
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
  },
)

const { extend, invalidate } = useTresContext()
extend({ MeshReflectionMaterial })

const blurWidth = computed(() => 500 - (Array.isArray(props.blurSize) ? props.blurSize[0] : props.blurSize))
const blurHeight = computed(() => 500 - (Array.isArray(props.blurSize) ? props.blurSize[1] : props.blurSize))
const hasBlur = computed(() => blurWidth.value > 0 || blurHeight.value > 0)
const hasDepth = computed(() => props.sharpDepthScale > 0 || props.blurDepthScale > 0)
const hasDistortion = computed(() => !!props.distortionMap)
const hasRoughness = computed(() => !!props.roughnessMap)

const materialRef = shallowRef()
let blurpass: BlurPass

const state = {
  reflectorPlane: new Plane(),
  normal: new Vector3(),
  reflectorWorldPosition: new Vector3(),
  cameraWorldPosition: new Vector3(),
  rotationMatrix: new Matrix4(),
  lookAtPosition: new Vector3(0, 0, -1),
  clipPlane: new Vector4(),
  view: new Vector3(),
  target: new Vector3(),
  q: new Vector4(),
  virtualCamera: new PerspectiveCamera(),
  textureMatrix: new Matrix4(),
}

const fboSharp = new WebGLRenderTarget(
  props.resolution,
  props.resolution,
  {
    minFilter: LinearFilter,
    magFilter: LinearFilter,
    type: HalfFloatType,
    depthBuffer: true,
    depthTexture: new DepthTexture(
      props.resolution,
      props.resolution,
    ),
  },
)

const fboBlur = new WebGLRenderTarget(
  props.resolution,
  props.resolution,
  {
    minFilter: LinearFilter,
    magFilter: LinearFilter,
    type: HalfFloatType,
  },
)

function onBeforeRender(renderer: WebGLRenderer, scene: Scene, camera: Camera, object: Object3D) {
  invalidate()

  const currentXrEnabled = renderer.xr.enabled
  const currentShadowAutoUpdate = renderer.shadowMap.autoUpdate

  state.reflectorWorldPosition.setFromMatrixPosition(object.matrixWorld)
  state.cameraWorldPosition.setFromMatrixPosition(camera.matrixWorld as Matrix4)
  state.rotationMatrix.extractRotation(object.matrixWorld)
  state.normal.set(0, 0, 1)
  state.normal.applyMatrix4(state.rotationMatrix)
  state.reflectorWorldPosition.addScaledVector(state.normal, props.reflectorOffset)
  state.view.subVectors(state.reflectorWorldPosition, state.cameraWorldPosition)

  // NOTE: Avoid rendering when reflector is facing away
  if (state.view.dot(state.normal) > 0) { return }

  // NOTE: Avoid re-rendering the reflective object.
  object.visible = false

  state.view.reflect(state.normal).negate()
  state.view.add(state.reflectorWorldPosition)
  state.rotationMatrix.extractRotation(camera.matrixWorld as Matrix4)
  state.lookAtPosition.set(0, 0, -1)
  state.lookAtPosition.applyMatrix4(state.rotationMatrix)
  state.lookAtPosition.add(state.cameraWorldPosition)
  state.target.subVectors(state.reflectorWorldPosition, state.lookAtPosition)
  state.target.reflect(state.normal).negate()
  state.target.add(state.reflectorWorldPosition)
  state.virtualCamera.position.copy(state.view)
  state.virtualCamera.up.set(0, 1, 0)
  state.virtualCamera.up.applyMatrix4(state.rotationMatrix)
  state.virtualCamera.up.reflect(state.normal)
  state.virtualCamera.lookAt(state.target)
  state.virtualCamera.far = (camera as PerspectiveCamera).far
  state.virtualCamera.updateMatrixWorld()
  state.virtualCamera.projectionMatrix.copy((camera as PerspectiveCamera).projectionMatrix)

  // NOTE: Update the texture matrix
  state.textureMatrix.set(0.5, 0.0, 0.0, 0.5, 0.0, 0.5, 0.0, 0.5, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0, 1.0)
  state.textureMatrix.multiply(state.virtualCamera.projectionMatrix)
  state.textureMatrix.multiply(state.virtualCamera.matrixWorldInverse)
  state.textureMatrix.multiply(object.matrixWorld)

  // NOTE: Now update projection matrix with new clip reflectorPlane, implementing code from: http://www.terathon.com/code/oblique.html
  // Paper explaining this technique: http://www.terathon.com/lengyel/Lengyel-Oblique.pdf
  state.reflectorPlane.setFromNormalAndCoplanarPoint(state.normal, state.reflectorWorldPosition)
  state.reflectorPlane.applyMatrix4(state.virtualCamera.matrixWorldInverse)
  state.clipPlane.set(
    state.reflectorPlane.normal.x,
    state.reflectorPlane.normal.y,
    state.reflectorPlane.normal.z,
    state.reflectorPlane.constant,
  )
  const projectionMatrix = state.virtualCamera.projectionMatrix
  state.q.x = (Math.sign(state.clipPlane.x) + projectionMatrix.elements[8]) / projectionMatrix.elements[0]
  state.q.y = (Math.sign(state.clipPlane.y) + projectionMatrix.elements[9]) / projectionMatrix.elements[5]
  state.q.z = -1.0
  state.q.w = (1.0 + projectionMatrix.elements[10]) / projectionMatrix.elements[14]
  // NOTE: Calculate the scaled reflectorPlane vector
  state.clipPlane.multiplyScalar(2.0 / state.clipPlane.dot(state.q))
  // NOTE: Replacing the third row of the projection matrix
  projectionMatrix.elements[2] = state.clipPlane.x
  projectionMatrix.elements[6] = state.clipPlane.y
  projectionMatrix.elements[10] = state.clipPlane.z + 1.0
  projectionMatrix.elements[14] = state.clipPlane.w

  renderer.shadowMap.autoUpdate = false
  renderer.setRenderTarget(fboSharp)
  if (!renderer.autoClear) { renderer.clear() }

  renderer.render(scene, state.virtualCamera)
  blurpass.render(renderer, fboSharp, fboBlur)

  // NOTE: Restore the previous render target and material
  renderer.xr.enabled = currentXrEnabled
  renderer.shadowMap.autoUpdate = currentShadowAutoUpdate
  object.visible = true
  renderer.setRenderTarget(null)
}

watch(
  () => [props.resolution],
  () => {
    fboSharp.setSize(props.resolution, props.resolution)
    fboBlur.setSize(props.resolution, props.resolution)
  },
)

watch(() => [
  props.resolution,
  blurWidth.value,
  blurHeight.value,
  props.blurDepthEdgeMin,
  props.blurDepthEdgeMax,
  props.blurDepthScale,
  props.blurDepthBias,
], () => {
  blurpass?.dispose()
  blurpass = new BlurPass({
    resolution: props.resolution,
    width: blurWidth.value,
    height: blurHeight.value,
    depthEdge0: props.blurDepthEdgeMin,
    depthEdge1: props.blurDepthEdgeMax,
    depthScale: props.blurDepthScale,
    depthBias: props.blurDepthBias,
  })
}, { immediate: true })

watch(materialRef, () => {
  if (materialRef.value) {
    materialRef.value.onBeforeRender = onBeforeRender
  }
})

// NOTE: Begin #615 warning
// The Tres core doesn't currently swap mesh materials when a
// material component recompiles.
//
// Issue: https://github.com/Tresjs/tres/issues/615
//
// Workaround: Warn users if they trigger a recompile.
//
// TODO: This code can be removed when #615 is resolved
watch(() => [hasBlur.value], () => {
  useLogger().logWarning(
    'MeshReflectionMaterial: Setting blurMixRough or blurMixSmooth to 0, then non-zero triggers a recompile.'
    + 'The TresJS core cannot currently handle recompiled materials.',
  )
})
watch(hasDepth, () => {
  useLogger().logWarning(
    'MeshReflectionMaterial: Setting depthScale to 0, then non-zero triggers a recompile.'
    + 'The TresJS core cannot currently handle recompiled materials.',
  )
})
watch(hasDistortion, () => {
  useLogger().logWarning(
    'MeshReflectionMaterial: Toggling distortionMap triggers a recompile.'
    + 'The TresJS core cannot currently handle recompiled materials.',
  )
})
watch(hasRoughness, () => {
  useLogger().logWarning(
    'MeshReflectionMaterial: Toggling roughnessMap triggers a recompile.'
    + 'The TresJS core cannot currently handle recompiled materials.',
  )
})
watch(() => [props.normalMap], () => {
  useLogger().logWarning(
    'MeshReflectionMaterial: Toggling normalMap triggers a recompile.'
    + 'The TresJS core cannot currently handle recompiled materials.',
  )
})
// End #615 warning

onBeforeUnmount(() => {
  fboSharp.dispose()
  fboBlur.dispose()
  blurpass.dispose()
})

useLoop().onBeforeRender(({ renderer, scene, camera, invalidate }) => {
  const parent = (materialRef.value as any)?.__tres?.parent
  if (!parent) { return }
  onBeforeRender(renderer, scene, camera, parent)
  invalidate()
})
defineExpose({ instance: materialRef })
</script>

<template>
  <TresMeshReflectionMaterial
    :key="`key${hasBlur ? '0' : '1'
    }${hasDepth ? '0' : '1'
    }${hasDistortion ? '0' : '1'
    }${hasRoughness ? '0' : '1'
    }`"
    ref="materialRef"
    v-bind="props"
    :texture-matrix="state.textureMatrix"
    :t-sharp="fboSharp?.texture"
    :t-depth="fboSharp?.depthTexture"
    :t-blur="fboBlur?.texture"
    :defines-USE_BLUR="hasBlur ? '' : undefined"
    :defines-USE_DEPTH="hasDepth ? '' : undefined"
    :defines-USE_DISTORTION="hasDistortion ? '' : undefined"
  />
</template>
