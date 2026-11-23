// Imports nothing from `three/webgpu`: the root entry reaches this file.
import { logWarning, useLoop, useTres, useTresContext } from '@tresjs/core'
import { BackSide, HalfFloatType, LinearFilter, NoToneMapping } from 'three'
// `RenderTarget` must stay a type-only import: three exports the class only from r155, and the root entry supports r133.
import type { Material, Object3D, RenderTarget, RenderTargetOptions, WebGLRenderTarget } from 'three'
import type { ShallowRef } from 'vue'
import { computed, onBeforeUnmount, toValue, watch } from 'vue'
import type { MeshTransmissionMaterialProps, MeshTransmissionMaterialUniforms } from './props'

type TransmissionMaterial = Material & MeshTransmissionMaterialUniforms & {
  __tres?: { parent?: (Object3D & { material?: Material }) | null }
}

interface UseMeshTransmissionMaterialOptions<T extends RenderTarget> {
  createTarget: (width: number, height: number, options: RenderTargetOptions) => T
  discardMaterial: Material
  /** Whether the material runs on `WebGPURenderer` (node material) or on `WebGLRenderer` (GLSL). */
  forWebGPURenderer: boolean
}

export function useMeshTransmissionMaterial<T extends RenderTarget>(
  props: MeshTransmissionMaterialProps,
  materialRef: ShallowRef<TransmissionMaterial | undefined>,
  { createTarget, discardMaterial, forWebGPURenderer }: UseMeshTransmissionMaterialOptions<T>,
) {
  watch(() => [props.samples, props.transmissionSampler], () => {
    logWarning(
      'MeshTransmissionMaterial: samples and transmissionSampler are baked into the shader '
      + 'at compile time. Changes require remounting the component.',
    )
  })

  const constructorArgs = computed(() => [{
    samples: props.samples,
    transmissionSampler: props.transmissionSampler,
  }])

  const constructorKey = computed(() => `${props.samples}-${props.transmissionSampler}`)

  // Tres camel-cases prop keys, so a `_transmission` prop would land on `transmission`. Set it directly instead.
  watch([materialRef, () => props.transmission], ([mat, transmission]) => {
    if (mat) { mat._transmission = transmission ?? 1 }
  }, { immediate: true })

  // GLSL sampler mode needs a built-in `transmission` above 0, else three does not fill `transmissionSamplerMap`.
  // On WebGPU it stays 0, else three's own transmission overwrites `backdropNode`.
  const tresProps = computed(() => {
    const {
      transmission: _t,
      transmissionSampler: _ts,
      samples: _s,
      resolution: _r,
      backsideResolution: _br,
      backside: _bs,
      backsideThickness: _bt,
      background: _bg,
      buffer: _buf,
      ...rest
    } = props

    // An undefined `attenuationColor` would replace the material's Color and crash the vec3 uniform upload.
    const defined = Object.fromEntries(
      Object.entries(rest).filter(([, value]) => value !== undefined),
    )

    return {
      ...defined,
      transmission: !forWebGPURenderer && props.transmissionSampler ? (props.transmission ?? 1) : 0,
    }
  })

  const targetOptions: RenderTargetOptions = { minFilter: LinearFilter, magFilter: LinearFilter, type: HalfFloatType }
  const mainSize = () => props.resolution ?? 256
  const backSize = () => props.backsideResolution ?? mainSize()
  const fboMain = createTarget(mainSize(), mainSize(), targetOptions)
  const fboBack = createTarget(backSize(), backSize(), targetOptions)

  watch(mainSize, size => fboMain.setSize(size, size))
  watch(backSize, size => fboBack.setSize(size, size))

  const { invalidate } = useTres()
  const { isWebGPU } = useTresContext()
  const { onBeforeRender } = useLoop()

  onBeforeRender(({ renderer, scene, camera, elapsed }) => {
    const mat = materialRef.value
    // Each material compiles only on its own renderer. Only the GLSL entry warns, through useWebGPUSupportWarning.
    if (!mat || isWebGPU.value !== forWebGPURenderer) { return }

    const parent = mat.__tres?.parent
    if (!parent) { return }

    mat.time = elapsed

    if (props.transmissionSampler) { return }
    if (!camera.value) { return }

    if (props.buffer) {
      mat.buffer = props.buffer
      return
    }

    invalidate()

    const sceneValue = toValue(scene)
    const oldBackground = sceneValue.background
    const oldToneMapping = renderer.toneMapping
    const oldSide = mat.side
    const oldThickness = mat.thickness
    const oldMaterial = parent.material
    const oldTarget = renderer.getRenderTarget()
    const oldCubeFace = renderer.getActiveCubeFace()
    const oldMipmapLevel = renderer.getActiveMipmapLevel()

    // The renderer type is a union, so its parameter types intersect. Both renderers accept either target class.
    const setTarget = (target: RenderTarget | null, cubeFace?: number, mipmapLevel?: number) =>
      renderer.setRenderTarget(target as WebGLRenderTarget | null, cubeFace, mipmapLevel)

    try {
      if (props.background) { sceneValue.background = props.background }
      renderer.toneMapping = NoToneMapping
      parent.material = discardMaterial

      if (props.backside) {
        setTarget(fboBack)
        renderer.render(sceneValue, camera.value)
        // The back faces refract the scene behind the mesh into fboMain, so the front faces see the glass thickness.
        parent.material = mat
        mat.buffer = fboBack.texture
        mat.thickness = props.backsideThickness ?? 0
        mat.side = BackSide
        // Neither renderer checks `side` while the material version stays the same.
        mat.needsUpdate = true
      }

      setTarget(fboMain)
      renderer.render(sceneValue, camera.value)
      mat.buffer = fboMain.texture
    }
    finally {
      parent.material = oldMaterial
      if (props.backside) { mat.thickness = oldThickness }
      if (mat.side !== oldSide) {
        mat.side = oldSide
        mat.needsUpdate = true
      }
      renderer.toneMapping = oldToneMapping
      sceneValue.background = oldBackground
      setTarget(oldTarget, oldCubeFace, oldMipmapLevel)
    }
  })

  onBeforeUnmount(() => {
    fboMain.dispose()
    fboBack.dispose()
  })

  return { constructorArgs, constructorKey, tresProps }
}
