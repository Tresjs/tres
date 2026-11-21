// Imports nothing from `three/webgpu`: the root entry reaches this file.
import { useLoop, useTres, useTresContext } from '@tresjs/core'
import {
  DepthTexture,
  HalfFloatType,
  LinearFilter,
  Matrix4,
  PerspectiveCamera,
  Plane,
  Vector3,
  Vector4,
} from 'three'
// `RenderTarget` must stay a type-only import: three exports the class only from r155, and the root entry supports r133.
import type { CoordinateSystem, Material, Object3D, RenderTarget, WebGLRenderTarget } from 'three'
import type { ShallowRef } from 'vue'
import { computed, onBeforeUnmount, toValue, watch } from 'vue'
import type { ConvolutionPassMaterial, CreateRenderTarget } from './BlurPass'
import { BlurPass } from './BlurPass'
import type { MeshReflectionMaterialProps, MeshReflectionMaterialUniforms } from './props'

type ReflectionMaterial = Material & MeshReflectionMaterialUniforms & {
  __tres?: { parent?: Object3D | null }
}

interface UseMeshReflectionMaterialOptions {
  createTarget: CreateRenderTarget
  createConvolutionMaterial: () => ConvolutionPassMaterial
  forWebGPURenderer: boolean
}

// `WebGPUCoordinateSystem` from three. The constant does not exist in r133, which the root entry supports.
const WEBGPU_COORDINATE_SYSTEM = 2001

type ReflectionState = ReturnType<typeof createReflectionState>

function createReflectionState() {
  return {
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
}

// Returns false when the reflector faces away from the camera.
function updateReflection(
  state: ReflectionState,
  parent: Object3D,
  mainCamera: PerspectiveCamera,
  reflectorOffset: number,
  clipDepthRange: 1 | 2,
) {
  const { virtualCamera } = state
  state.reflectorWorldPosition.setFromMatrixPosition(parent.matrixWorld)
  state.cameraWorldPosition.setFromMatrixPosition(mainCamera.matrixWorld)
  state.rotationMatrix.extractRotation(parent.matrixWorld)
  state.normal.set(0, 0, 1)
  state.normal.applyMatrix4(state.rotationMatrix)
  state.reflectorWorldPosition.addScaledVector(state.normal, reflectorOffset)
  state.view.subVectors(state.reflectorWorldPosition, state.cameraWorldPosition)

  if (state.view.dot(state.normal) > 0) { return false }

  state.view.reflect(state.normal).negate()
  state.view.add(state.reflectorWorldPosition)
  state.rotationMatrix.extractRotation(mainCamera.matrixWorld)
  state.lookAtPosition.set(0, 0, -1)
  state.lookAtPosition.applyMatrix4(state.rotationMatrix)
  state.lookAtPosition.add(state.cameraWorldPosition)
  state.target.subVectors(state.reflectorWorldPosition, state.lookAtPosition)
  state.target.reflect(state.normal).negate()
  state.target.add(state.reflectorWorldPosition)
  virtualCamera.position.copy(state.view)
  virtualCamera.up.set(0, 1, 0)
  virtualCamera.up.applyMatrix4(state.rotationMatrix)
  virtualCamera.up.reflect(state.normal)
  virtualCamera.lookAt(state.target)
  virtualCamera.far = mainCamera.far
  virtualCamera.updateMatrixWorld()
  virtualCamera.projectionMatrix.copy(mainCamera.projectionMatrix)

  // Maps clip z to 0..1: halved and shifted for WebGL (-1..1), unchanged for WebGPU (0..1).
  const depthScale = 1 / clipDepthRange
  state.textureMatrix.set(0.5, 0.0, 0.0, 0.5, 0.0, 0.5, 0.0, 0.5, 0.0, 0.0, depthScale, 1 - depthScale, 0.0, 0.0, 0.0, 1.0)
  state.textureMatrix.multiply(virtualCamera.projectionMatrix)
  state.textureMatrix.multiply(virtualCamera.matrixWorldInverse)
  state.textureMatrix.multiply(parent.matrixWorld)

  // Oblique near-plane clipping: http://www.terathon.com/lengyel/Lengyel-Oblique.pdf
  state.reflectorPlane.setFromNormalAndCoplanarPoint(state.normal, state.reflectorWorldPosition)
  state.reflectorPlane.applyMatrix4(virtualCamera.matrixWorldInverse)
  state.clipPlane.set(
    state.reflectorPlane.normal.x,
    state.reflectorPlane.normal.y,
    state.reflectorPlane.normal.z,
    state.reflectorPlane.constant,
  )
  const projectionMatrix = virtualCamera.projectionMatrix
  state.q.x = (Math.sign(state.clipPlane.x) + projectionMatrix.elements[8]) / projectionMatrix.elements[0]
  state.q.y = (Math.sign(state.clipPlane.y) + projectionMatrix.elements[9]) / projectionMatrix.elements[5]
  state.q.z = -1.0
  state.q.w = (1.0 + projectionMatrix.elements[10]) / projectionMatrix.elements[14]
  // The near plane is at clip z = -w in WebGL and at z = 0 in WebGPU.
  state.clipPlane.multiplyScalar(clipDepthRange / state.clipPlane.dot(state.q))
  projectionMatrix.elements[2] = state.clipPlane.x
  projectionMatrix.elements[6] = state.clipPlane.y
  projectionMatrix.elements[10] = state.clipPlane.z + clipDepthRange - 1
  projectionMatrix.elements[14] = state.clipPlane.w
  virtualCamera.projectionMatrixInverse.copy(projectionMatrix).invert()
  return true
}

export function useMeshReflectionMaterial(
  props: MeshReflectionMaterialProps,
  materialRef: ShallowRef<ReflectionMaterial | undefined>,
  { createTarget, createConvolutionMaterial, forWebGPURenderer }: UseMeshReflectionMaterialOptions,
) {
  const resolution = () => props.resolution ?? 256
  const blurSize = (index: 0 | 1) => Array.isArray(props.blurSize) ? props.blurSize[index] : (props.blurSize ?? 0)
  const blurWidth = computed(() => 500 - blurSize(0))
  const blurHeight = computed(() => 500 - blurSize(1))
  const hasBlur = computed(() => blurWidth.value > 0 || blurHeight.value > 0)
  const hasDepth = computed(() => (props.sharpDepthScale ?? 0) > 0 || (props.blurDepthScale ?? 0) > 0)

  const tresProps = computed(() => {
    const {
      resolution: _r,
      blurSize: _bs,
      blurDepthEdgeMin: _bdemin,
      blurDepthEdgeMax: _bdemax,
      blurDepthScale: _bds,
      blurDepthBias: _bdb,
      reflectorOffset: _ro,
      ...rest
    } = props
    return rest
  })

  // Both renderers build the shader for the texture slots in use, and rebuild it only after `needsUpdate`.
  watch(() => [
    props.map,
    props.lightMap,
    props.aoMap,
    props.emissiveMap,
    props.bumpMap,
    props.normalMap,
    props.displacementMap,
    props.roughnessMap,
    props.metalnessMap,
    props.alphaMap,
    props.envMap,
  ], () => {
    if (materialRef.value) { materialRef.value.needsUpdate = true }
  }, { flush: 'post' })

  const state = createReflectionState()

  const fboSharp = createTarget(resolution(), resolution(), {
    minFilter: LinearFilter,
    magFilter: LinearFilter,
    type: HalfFloatType,
    depthBuffer: true,
    depthTexture: new DepthTexture(resolution(), resolution()),
  })
  const fboBlur = createTarget(resolution(), resolution(), {
    minFilter: LinearFilter,
    magFilter: LinearFilter,
    type: HalfFloatType,
  })

  watch(resolution, (size) => {
    fboSharp.setSize(size, size)
    fboBlur.setSize(size, size)
  })

  let blurpass: BlurPass
  watch(() => [
    resolution(),
    blurWidth.value,
    blurHeight.value,
    props.blurDepthEdgeMin,
    props.blurDepthEdgeMax,
    props.blurDepthScale,
    props.blurDepthBias,
  ], () => {
    blurpass?.dispose()
    blurpass = new BlurPass({
      resolution: resolution(),
      width: blurWidth.value,
      height: blurHeight.value,
      depthEdge0: props.blurDepthEdgeMin,
      depthEdge1: props.blurDepthEdgeMax,
      depthScale: props.blurDepthScale,
      depthBias: props.blurDepthBias,
      createTarget,
      material: createConvolutionMaterial(),
    })
  }, { immediate: true })

  onBeforeUnmount(() => {
    fboSharp.dispose()
    fboSharp.depthTexture?.dispose()
    fboBlur.dispose()
    blurpass.dispose()
  })

  const { invalidate } = useTres()
  const { isWebGPU } = useTresContext()
  const { onBeforeRender } = useLoop()

  onBeforeRender(({ renderer, scene, camera }) => {
    const mat = materialRef.value
    // Each material compiles only on its own renderer. Only the GLSL entry warns, through useWebGPUSupportWarning.
    if (!mat || isWebGPU.value !== forWebGPURenderer) { return }

    const parent = mat.__tres?.parent
    const mainCamera = camera.value as PerspectiveCamera | undefined
    if (!parent || !mainCamera) { return }

    // Set every frame: the GLSL template remounts the material when a define changes.
    mat.tSharp = fboSharp.texture
    mat.tDepth = fboSharp.depthTexture ?? null
    mat.tBlur = fboBlur.texture
    mat.textureMatrix = state.textureMatrix

    invalidate()

    const coordinateSystem = (renderer as { coordinateSystem?: CoordinateSystem }).coordinateSystem
    // WebGPURenderer would reset the oblique projection below if the coordinate systems did not match.
    if (coordinateSystem !== undefined && mainCamera.coordinateSystem !== coordinateSystem) {
      mainCamera.coordinateSystem = coordinateSystem
      mainCamera.updateProjectionMatrix()
    }
    state.virtualCamera.coordinateSystem = mainCamera.coordinateSystem
    const clipDepthRange = coordinateSystem === WEBGPU_COORDINATE_SYSTEM ? 1 : 2

    if (!updateReflection(state, parent, mainCamera, props.reflectorOffset ?? 0, clipDepthRange)) { return }

    const sceneValue = toValue(scene)
    const shadowMap = renderer.shadowMap as { autoUpdate?: boolean }
    const oldShadowAutoUpdate = shadowMap.autoUpdate
    const oldTarget = renderer.getRenderTarget()
    // The renderer type is a union, so its parameter types intersect. Both renderers accept either target class.
    const setTarget = (target: RenderTarget | null) => renderer.setRenderTarget(target as WebGLRenderTarget | null)

    parent.visible = false
    try {
      shadowMap.autoUpdate = false
      setTarget(fboSharp)
      if (!renderer.autoClear) { renderer.clear() }
      renderer.render(sceneValue, state.virtualCamera)
      blurpass.render(renderer, fboSharp, fboBlur)
    }
    finally {
      shadowMap.autoUpdate = oldShadowAutoUpdate
      parent.visible = true
      setTarget(oldTarget)
    }
    invalidate()
  })

  return { tresProps, hasBlur, hasDepth }
}
