<script setup lang="ts">
import { shallowRef, onBeforeUnmount, watchEffect, toRefs, shallowReactive, computed, useAttrs } from 'vue'
import { useRenderLoop, useTresContext } from '@tresjs/core'
import type { TresObject } from '@tresjs/core'
import type {
  Texture,
  MeshStandardMaterial,
  TextureDataType,
  Mapping,
} from 'three'
import {
  Plane,
  Vector3,
  Vector4,
  Matrix4,
  PerspectiveCamera,
  LinearFilter,
  WebGLRenderTarget,
  DepthTexture,
  DepthFormat,
  UnsignedShortType,
  HalfFloatType,
} from 'three'
import { BlurPass } from '../blurPass'

import { MeshReflectorMaterial } from './material'

const props = withDefaults(
  defineProps<MeshReflectorMaterialProps>(),
  {
    mixBlur: 0,
    mixStrength: 1,
    resolution: 256,
    blur: () => [0, 0],
    minDepthThreshold: 0.9,
    maxDepthThreshold: 1,
    depthScale: 0,
    depthToBlurRatioBias: 0.25,
    mirror: 0,
    distortion: 1,
    mixContrast: 1,
    reflectorOffset: 0,
  },
)

export interface MeshReflectorMaterialProps extends /* @vue-ignore */ MeshStandardMaterial {
  resolution?: number
  mixBlur?: number
  mixStrength?: number
  blur?: [number, number] | number
  mirror?: number
  minDepthThreshold?: number
  maxDepthThreshold?: number
  depthScale?: number
  depthToBlurRatioBias?: number
  distortionMap?: Texture
  distortion?: number
  mixContrast?: number
  reflectorOffset?: number
}

/**
 * Finds the parent mesh using the specified material UUID.
 * 
 * @param {THREE.Scene} scene - The Three.js scene to search.
 * @param {string} materialUuid - The UUID of the material.
 * @returns {THREE.Mesh | undefined} - The mesh using the material, or undefined if not found.
 */
function findMeshByMaterialUuid(scene: TresObject, materialUuid: string): TresObject {
  let foundMesh

  scene.traverse((object: TresObject) => {
    if (object.isMesh && object.material && object.material.uuid === materialUuid) {
      foundMesh = object
    }
  })

  return foundMesh as unknown as TresObject
}

function beforeRender(parent: TresObject) {
  state.reflectorWorldPosition.setFromMatrixPosition(parent.matrixWorld)
  state.cameraWorldPosition.setFromMatrixPosition(camera.value?.matrixWorld as Matrix4)
  state.rotationMatrix.extractRotation(parent.matrixWorld)
  state.normal.set(0, 0, 1)
  state.normal.applyMatrix4(state.rotationMatrix)
  state.reflectorWorldPosition.addScaledVector(state.normal, props.reflectorOffset)
  state.view.subVectors(state.reflectorWorldPosition, state.cameraWorldPosition)

  // Avoid rendering when reflector is facing away
  if (state.view.dot(state.normal) > 0) return
  state.view.reflect(state.normal).negate()
  state.view.add(state.reflectorWorldPosition)
  state.rotationMatrix.extractRotation(camera.value?.matrixWorld as Matrix4)
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
  state.virtualCamera.far = (camera?.value as PerspectiveCamera).far
  state.virtualCamera.updateMatrixWorld()
  state.virtualCamera.projectionMatrix.copy((camera?.value as PerspectiveCamera).projectionMatrix)

  // Update the texture matrix
  state.textureMatrix.set(0.5, 0.0, 0.0, 0.5, 0.0, 0.5, 0.0, 0.5, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0, 1.0)
  state.textureMatrix.multiply(state.virtualCamera.projectionMatrix)
  state.textureMatrix.multiply(state.virtualCamera.matrixWorldInverse)
  state.textureMatrix.multiply(parent.matrixWorld)
  
  // Now update projection matrix with new clip reflectorPlane, implementing code from: http://www.terathon.com/code/oblique.html
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
  // Calculate the scaled reflectorPlane vector
  state.clipPlane.multiplyScalar(2.0 / state.clipPlane.dot(state.q))
  // Replacing the third row of the projection matrix
  projectionMatrix.elements[2] = state.clipPlane.x
  projectionMatrix.elements[6] = state.clipPlane.y
  projectionMatrix.elements[10] = state.clipPlane.z + 1.0
  projectionMatrix.elements[14] = state.clipPlane.w

}

const { 
  resolution, 
  minDepthThreshold,
  maxDepthThreshold,
  depthScale,
  depthToBlurRatioBias,
  blur,
  mirror,
  mixBlur,
  mixStrength,
  distortion,
  distortionMap,
  mixContrast,
} = toRefs(props)

const { camera, scene, renderer, extend } = useTresContext()

extend({ MeshReflectorMaterial })

const fbo = shallowRef<WebGLRenderTarget>()
const outputFbo = shallowRef<WebGLRenderTarget>()
const blurpass = shallowRef<BlurPass>()
const reflectorParams = shallowRef()

const computedBlur = computed(() => {
  if (typeof blur.value === 'number') {
    return [blur.value, blur.value]
  }
  return blur.value
})

const hasBlur = computed(() => computedBlur.value[0] > 0 || computedBlur.value[1] > 0)

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

watchEffect(() => {
  fbo.value?.texture.dispose()
  
  const parameters = {
    minFilter: LinearFilter,
    magFilter: LinearFilter,
    type: HalfFloatType,
  }
  fbo.value = new WebGLRenderTarget(
    resolution.value, resolution.value,
    {
      ...parameters,
      depthBuffer: true,
      depthTexture: new DepthTexture(
        resolution.value, resolution.value,
        DepthFormat as TextureDataType,
        UnsignedShortType as Mapping,
      ),
    },
  )

  outputFbo.value = new WebGLRenderTarget(
    resolution.value, resolution.value,
    parameters,
  )

  blurpass.value = new BlurPass({
    resolution: resolution.value,
    width: computedBlur.value[0],
    height: computedBlur.value[1],
    minDepthThreshold: minDepthThreshold.value,
    maxDepthThreshold: maxDepthThreshold.value,
    depthScale: depthScale.value,
    depthToBlurRatioBias: depthToBlurRatioBias.value,
  })

  reflectorParams.value = {
    mirror,
    textureMatrix: state.textureMatrix,
    mixBlur,
    tDiffuse: fbo.value.texture,
    tDepth: fbo.value.depthTexture,
    tDiffuseBlur: fbo.value.texture,
    hasBlur,
    mixStrength,
    minDepthThreshold,
    maxDepthThreshold,
    depthScale,
    depthToBlurRatioBias,
    distortion,
    distortionMap: distortionMap.value,
    mixContrast,
    'defines-USE_BLUR': hasBlur.value ? '' : undefined,
    'defines-USE_DEPTH': depthScale.value > 0 ? '' : undefined,
    'defines-USE_DISTORTION': distortionMap.value ? '' : undefined,
  }
})

const materialRef = shallowRef()

const { onLoop } = useRenderLoop()

onLoop(() => {
  if (!materialRef.value || !renderer.value || !fbo.value || !camera.value) return
  const parent: TresObject = findMeshByMaterialUuid(scene.value as unknown as TresObject, materialRef.value.uuid)
  if (!parent) return
  
  parent.visible = false // Avoid re-rendering the reflected object
  const currentXrEnabled = renderer.value.xr.enabled
  const currentShadowAutoUpdate = renderer.value.shadowMap.autoUpdate
 
  beforeRender(parent)

  renderer.value.shadowMap.autoUpdate = false
  renderer.value.setRenderTarget(fbo.value)
  if (!renderer.value.autoClear) renderer.value.clear()
  renderer.value.render(scene.value, state.virtualCamera)
  blurpass?.value?.render(renderer.value, fbo.value, outputFbo.value)

  // Restore the previous render target and material
  renderer.value.xr.enabled = currentXrEnabled
  renderer.value.shadowMap.autoUpdate = currentShadowAutoUpdate
  parent.visible = true
  renderer.value.setRenderTarget(null)

})

const attrs = useAttrs()
const merged = computed(() => {
  const m = { }
  Object.assign(m, props)
  Object.assign(m, attrs.value)
  return m
})

onBeforeUnmount(() => {
  fbo?.value?.dispose()
  outputFbo?.value?.dispose()
})
</script>

<template>
  <TresMeshReflectorMaterial
    :key="
      `key${ 
        reflectorParams['defines-USE_BLUR'] 
      }${reflectorParams['defines-USE_DEPTH'] 
      }${reflectorParams['defines-USE_DISTORTION']}`
    "
    ref="materialRef"
    v-bind="merged"
    :texture-matrix="state.textureMatrix"
    :mirror="mirror"
    :t-diffuse="fbo?.texture"
    :t-depth="fbo?.depthTexture"
    :t-diffuse-blur="outputFbo?.texture"
    :has-blur="hasBlur"
    :mix-strength="mixStrength"
    :min-depth-threshold="minDepthThreshold"
    :max-depth-threshold="maxDepthThreshold"
    :depth-scale="depthScale"
    :depth-to-blur-ratio-bias="depthToBlurRatioBias"
    :distortion="distortion"
    :distortionMap="distortionMap"
    :mix-contrast="mixContrast"
    :defines-USE_BLUR="hasBlur ? '' : undefined"
    :defines-USE_DEPTH="depthScale > 0 ? '' : undefined"
    :defines-USE_DISTORTION="distortionMap ? '' : undefined"
  />
</template>