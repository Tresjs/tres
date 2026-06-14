<script setup lang="ts">
import { logWarning, useLoop, useTres } from '@tresjs/core'
import type { TresColor } from '@tresjs/core'
import {
  BackSide,
  HalfFloatType,
  LinearFilter,
  MeshPhysicalMaterial,
  NoToneMapping,
  WebGLRenderer,
  WebGLRenderTarget,
} from 'three'
import type { Color, Texture } from 'three'
import { computed, onBeforeUnmount, shallowRef, toValue, watch } from 'vue'
import { MeshDiscardMaterial } from '../meshDiscardMaterial/material'
import { MeshTransmissionMaterial } from './material'

export interface MeshTransmissionMaterialProps {
  /** Number of refraction samples. Baked into the shader at compile time. Default: 6 */
  samples?: number
  /** Use THREE's built-in transmission sampler instead of an FBO pass. Baked at compile time. Default: false */
  transmissionSampler?: boolean
  /** Transmission amount (maps to the custom _transmission uniform). Default: 1 */
  transmission?: number
  /** Thickness of the glass. Default: 0 */
  thickness?: number
  /** Thickness used for the backside pass. Default: 0 */
  backsideThickness?: number
  /** Roughness of the surface. Default: 0 */
  roughness?: number
  /** Chromatic aberration intensity. Default: 0.03 */
  chromaticAberration?: number
  /** Anisotropic blur amount. Default: 0.1 */
  anisotropicBlur?: number
  /** Distortion amount. Default: 0 */
  distortion?: number
  /** Scale of the distortion. Default: 0.5 */
  distortionScale?: number
  /** Temporal distortion speed. Default: 0 */
  temporalDistortion?: number
  /** Index of refraction. Default: 1.5 */
  ior?: number
  /** Base color of the glass. Default: white */
  color?: TresColor
  /** Clearcoat layer intensity. Default: 0 */
  clearcoat?: number
  /** Clearcoat roughness. Default: 0 */
  clearcoatRoughness?: number
  /** Distance at which light is attenuated through the volume. Default: Infinity */
  attenuationDistance?: number
  /** Color the light shifts to as it passes through the volume. Default: white */
  attenuationColor?: TresColor
  /** Resolution of the FBO render target. Default: 256 */
  resolution?: number
  /** Resolution of the backside FBO. Defaults to resolution. */
  backsideResolution?: number
  /** Render the back faces into a separate buffer for proper glass thickness. Default: false */
  backside?: boolean
  /** Override the scene background during the FBO pass. */
  background?: Color | null
  /** Supply your own render-target texture, skipping the internal FBO pass. */
  buffer?: Texture | null
}

const props = withDefaults(defineProps<MeshTransmissionMaterialProps>(), {
  samples: 6,
  transmissionSampler: false,
  transmission: 1,
  thickness: 0,
  backsideThickness: 0,
  roughness: 0,
  chromaticAberration: 0.03,
  anisotropicBlur: 0.1,
  distortion: 0,
  distortionScale: 0.5,
  temporalDistortion: 0,
  ior: 1.5,
  resolution: 256,
  backside: false,
})

const { extend, invalidate } = useTres()
extend({ MeshTransmissionMaterial })

const materialRef = shallowRef()

// samples and transmissionSampler are baked into the shader at compile time.
// Changing them after mount requires a remount (handled via :key below).
watch(() => [props.samples, props.transmissionSampler], () => {
  logWarning(
    'MeshTransmissionMaterial: samples and transmissionSampler are baked into the shader '
    + 'at compile time. Changes require remounting the component.',
  )
})

// Constructor args: baked-in shader options.
const constructorArgs = computed(() => [{
  samples: props.samples,
  transmissionSampler: props.transmissionSampler,
}])

// Key forces a remount when compiled-in options change.
const constructorKey = computed(() => `${props.samples}-${props.transmissionSampler}`)

// Props forwarded to the Tres component.
// - transmission maps to _transmission (our custom uniform); THREE's built-in stays at 0.
// - FBO/lifecycle props are handled in script and omitted from the spread.
const tresProps = computed(() => {
  const {
    transmission,
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

  // Drop undefined values so we don't overwrite the material's internal
  // uniform defaults (e.g. attenuationColor, set to white in the constructor)
  // with undefined — doing so crashes THREE's vec3 uniform upload.
  const defined = Object.fromEntries(
    Object.entries(rest).filter(([, value]) => value !== undefined),
  )

  return {
    ...defined,
    _transmission: transmission,
    transmission: 0,
  }
})

// FBO render targets
const fboMain = new WebGLRenderTarget(props.resolution, props.resolution, {
  minFilter: LinearFilter,
  magFilter: LinearFilter,
  type: HalfFloatType,
})

const fboBack = new WebGLRenderTarget(
  props.backsideResolution ?? props.resolution,
  props.backsideResolution ?? props.resolution,
  {
    minFilter: LinearFilter,
    magFilter: LinearFilter,
    type: HalfFloatType,
  },
)

watch(() => props.resolution, (res) => {
  fboMain.setSize(res, res)
})

watch(() => props.backsideResolution ?? props.resolution, (res) => {
  fboBack.setSize(res, res)
})

// Reusable materials for FBO passes
const discardMat = new MeshDiscardMaterial()
const backsideMat = new MeshPhysicalMaterial({ side: BackSide, transparent: true })

const { onBeforeRender } = useLoop()

onBeforeRender(({ renderer, scene, camera, elapsed }) => {
  const mat = materialRef.value
  if (!mat) { return }

  if ('isWebGPURenderer' in renderer && (renderer as { isWebGPURenderer?: boolean }).isWebGPURenderer === true) {
    console.warn('MeshTransmissionMaterial: WebGPURenderer is not supported yet')
    return
  }
  if (!(renderer instanceof WebGLRenderer)) { return }

  const parent = mat.__tres?.parent
  if (!parent) { return }

  invalidate()

  // Advance shader time for temporal distortion
  mat.time = elapsed

  // When using THREE's native sampler, no FBO dance is needed
  if (props.transmissionSampler) { return }
  if (!camera.value) { return }

  // When a manual buffer is supplied, assign it and skip rendering
  if (props.buffer) {
    mat.buffer = props.buffer
    return
  }

  // Save state
  const oldBg = toValue(scene).background
  const oldTone = renderer.toneMapping
  const savedMaterial = parent.material

  if (props.background) { toValue(scene).background = props.background }
  renderer.toneMapping = NoToneMapping

  if (props.backside) {
    // Render back faces into fboBack for proper glass thickness
    parent.material = backsideMat
    renderer.setRenderTarget(fboBack)
    renderer.render(toValue(scene), camera.value)
    mat.buffer = fboBack.texture
    mat.thickness = props.backsideThickness
    // Hide mesh for main pass
    parent.material = discardMat
  }
  else {
    parent.material = discardMat
  }

  // Main FBO pass: capture scene without the glass mesh
  renderer.setRenderTarget(fboMain)
  renderer.render(toValue(scene), camera.value)
  mat.buffer = fboMain.texture

  if (props.backside) {
    // Restore thickness to the user-facing value
    mat.thickness = props.thickness
  }

  // Restore state
  parent.material = savedMaterial
  renderer.toneMapping = oldTone
  toValue(scene).background = oldBg
  renderer.setRenderTarget(null)
})

onBeforeUnmount(() => {
  fboMain.dispose()
  fboBack.dispose()
  discardMat.dispose()
  backsideMat.dispose()
})

defineExpose({ instance: materialRef })
</script>

<template>
  <TresMeshTransmissionMaterial
    :key="constructorKey"
    ref="materialRef"
    :args="constructorArgs"
    v-bind="tresProps"
  />
</template>
