import type { Camera, ColorRepresentation, Scene } from 'three'
import type { Pass as ThreePass } from 'three/examples/jsm/postprocessing/Pass.js'
import type { Pass as PmndrsPass } from 'postprocessing'
import type { ShallowRef } from 'vue'
import { useTres } from '@tresjs/core'
// @ts-expect-error n8ao ships without type declarations
import { N8AOPass as N8AOPassImpl, N8AOPostPass as N8AOPostPassImpl } from 'n8ao'
import { Color, Material, RenderTarget, Texture } from 'three'
import { onUnmounted, shallowRef, watch } from 'vue'

/**
 * 0 = Combined, 1 = AO only, 2 = No AO, 3 = Split (scene with and without AO), 4 = Split AO (AO only and combined)
 */
export type N8AORenderMode = 0 | 1 | 2 | 3 | 4

/** Mirrors the `configuration` object of n8ao 2.x passes. */
export interface N8AOConfiguration {
  aoRadius: number
  distanceFalloff: number
  intensity: number
  color: Color
  aoSamples: number
  denoiseSamples: number
  denoiseRadius: number
  denoiseIterations: number
  aoTones: number
  renderMode: N8AORenderMode
  gammaCorrection: boolean
  screenSpaceRadius: boolean
  halfRes: boolean
  depthAwareUpsampling: boolean
  colorMultiply: boolean
  transparencyAware: boolean
  accumulate: boolean
  neuralDenoise: boolean
  biasOffset: number
  biasMultiplier: number
}

export type N8AOQualityMode = 'Performance' | 'Low' | 'Medium' | 'High' | 'Ultra' | 'Neural-Low' | 'Neural-Medium' | 'Neural-High'

interface N8AOPassMembers {
  configuration: N8AOConfiguration
  setQualityMode: (mode: N8AOQualityMode) => void
}

/** `N8AOPass` from n8ao, a three.js pass that renders the scene itself. */
export type N8AOPassInstance = ThreePass & N8AOPassMembers

/** `N8AOPostPass` from n8ao, a pmndrs pass that reads the frame of a preceding `RenderPass`. */
export type N8AOPostPassInstance = PmndrsPass & N8AOPassMembers & {
  /** When true, the pass picks gamma correction from its position in the chain. */
  autosetGamma: boolean
}

export type N8AOPassConstructor<P> = new (scene: Scene, camera: Camera, width?: number, height?: number) => P

export const N8AOPass: N8AOPassConstructor<N8AOPassInstance> = N8AOPassImpl
export const N8AOPostPass: N8AOPassConstructor<N8AOPostPassInstance> = N8AOPostPassImpl

export interface N8AOProps {
  /**
   * Radius of the occlusion in world units (in pixels when `screenSpaceRadius` is true).
   * Should be one or two magnitudes smaller than the scene.
   * Default: 5
   */
  aoRadius?: number

  /**
   * How fast the occlusion fades with distance, as a ratio of `aoRadius`.
   * Default: 1
   */
  distanceFalloff?: number

  /**
   * Artistic darkening of the occlusion, applied as `pow(ao, intensity)`.
   * Default: 5
   */
  intensity?: number

  /**
   * Color of the occlusion, in sRGB.
   * Default: 0x000000
   */
  color?: ColorRepresentation

  /**
   * Number of AO samples per pixel. Changing it recompiles the shaders.
   * Default: 16
   */
  aoSamples?: number

  /**
   * Number of denoise samples per pixel. Changing it recompiles the shaders.
   * Default: 8
   */
  denoiseSamples?: number

  /**
   * Radius of the denoise filter.
   * Default: 12
   */
  denoiseRadius?: number

  /**
   * Number of denoise passes.
   * Default: 2
   */
  denoiseIterations?: number

  /**
   * Compute the AO at half resolution and upscale it. Usually 2x to 4x faster.
   * Default: false
   */
  halfRes?: boolean

  /**
   * Use depth-aware upscaling in `halfRes` mode. Without it, the upscaled AO bleeds over edges.
   * Default: true
   */
  depthAwareUpsampling?: boolean

  /**
   * Interpret `aoRadius` in pixels and `distanceFalloff` as a ratio of it.
   * Default: false
   */
  screenSpaceRadius?: boolean

  /**
   * Quantize the AO into this many tones (toon shading). 0 keeps it continuous.
   * Default: 0
   */
  aoTones?: number

  /**
   * Debug view. 0 = Combined, 1 = AO only, 2 = No AO, 3 = Split, 4 = Split AO.
   * Default: 0
   */
  renderMode?: N8AORenderMode

  /**
   * Apply sRGB conversion to the output. Set it to false when a later pass already converts color space.
   * Default: automatic for `N8AOPmndrs` (true only when it is the last pass), true for `N8AO`
   */
  gammaCorrection?: boolean
}

const n8aoDefaults = {
  aoRadius: 5,
  distanceFalloff: 1,
  intensity: 5,
  color: 0x000000,
  aoSamples: 16,
  denoiseSamples: 8,
  denoiseRadius: 12,
  denoiseIterations: 2,
  halfRes: false,
  depthAwareUpsampling: true,
  screenSpaceRadius: false,
  aoTones: 0,
  renderMode: 0,
} as const satisfies N8AOProps

/**
 * `withDefaults` for both N8AO components. Vue casts absent boolean props to `false`, which would
 * override the n8ao defaults (`depthAwareUpsampling: true`, automatic gamma in the pmndrs pass).
 */
export const n8aoPropDefaults = {
  halfRes: undefined,
  depthAwareUpsampling: undefined,
  screenSpaceRadius: undefined,
  gammaCorrection: undefined,
}

type AnyN8AOPass = N8AOPassInstance | N8AOPostPassInstance
type ConfigurationProp = keyof typeof n8aoDefaults

const configurationProps = Object.keys(n8aoDefaults) as ConfigurationProp[]

// Not `makePropWatchers`: it reads defaults from a throwaway instance, and an n8ao pass needs a scene,
// a camera and several render targets. The defaults above mirror n8ao 2.x instead.
// The configuration is a proxy that recompiles shaders or reallocates targets only when a value
// actually changes. It throws on `undefined`, so an unset prop writes the n8ao default instead.
const applyProp = (pass: AnyN8AOPass, props: N8AOProps, key: ConfigurationProp) => {
  const value = props[key] ?? n8aoDefaults[key]
  Object.assign(pass.configuration, { [key]: key === 'color' ? new Color(value as ColorRepresentation) : value })
}

// Writing `gammaCorrection` turns off the automatic mode of the pmndrs pass, so only write it when set
const applyGammaCorrection = (pass: AnyN8AOPass, gammaCorrection: boolean | undefined) => {
  if (gammaCorrection !== undefined) { pass.configuration.gammaCorrection = gammaCorrection }
  else if ('autosetGamma' in pass) { pass.autosetGamma = true }
  else { pass.configuration.gammaCorrection = true }
}

// Neither base `Pass.dispose` frees n8ao's render targets and full-screen quads: three's is a no-op and
// pmndrs' skips the quads. pmndrs' would also dispose `depthTexture` and the renderer is an own field
// too, both owned by the composer, so walk the fields here instead.
const disposePass = (pass: object) => {
  for (const [key, value] of Object.entries(pass)) {
    if (key === 'depthTexture' || !value) { continue }
    const isFullScreenQuad = typeof value === 'object' && '_mesh' in value && typeof value.dispose === 'function'
    if (value instanceof RenderTarget || value instanceof Material || value instanceof Texture || isFullScreenQuad) {
      value.dispose()
    }
  }
}

interface N8AOComposer<P> {
  passes: unknown[]
  removePass: (pass: P) => void
}

/**
 * Keeps one n8ao pass in the composer for the lifetime of the calling component.
 *
 * @param composer - The composer provided by the parent composer component.
 * @param PassClass - The family-specific n8ao pass class.
 * @param addPass - Adds the pass to the composer, at `index` when given.
 * @param props - The component props.
 */
export const useN8AO = <P extends AnyN8AOPass, C extends N8AOComposer<P>>(
  composer: ShallowRef<C | null> | undefined,
  PassClass: N8AOPassConstructor<P>,
  addPass: (composer: C, pass: P, index?: number) => void,
  props: N8AOProps,
): { pass: ShallowRef<P | null> } => {
  const { scene, camera, sizes, invalidate } = useTres()

  const pass = shallowRef<P | null>(null) as ShallowRef<P | null>
  let owner: C | null = null

  const removePass = () => {
    if (!pass.value) { return }
    owner?.removePass(pass.value)
    disposePass(pass.value)
    pass.value = null
    owner = null
  }

  // The pass compiles its shaders for the camera type (perspective or orthographic) and keeps the
  // scene and camera it was built with, so any change to them needs a new pass.
  // Resizing is not handled here: the composer calls `setSize` on all its passes with the drawing buffer size.
  watch(
    [() => composer?.value, scene, camera, () => !!sizes.width.value && !!sizes.height.value],
    ([currentComposer, currentScene, currentCamera, hasSize]) => {
      const index = pass.value && currentComposer && currentComposer === owner ? currentComposer.passes.indexOf(pass.value) : -1
      removePass()

      if (!currentComposer || !currentScene || !currentCamera || !hasSize) { return }

      pass.value = new PassClass(currentScene, currentCamera, sizes.width.value, sizes.height.value)
      for (const key of configurationProps) { applyProp(pass.value, props, key) }
      applyGammaCorrection(pass.value, props.gammaCorrection)
      addPass(currentComposer, pass.value, ~index ? index : undefined)
      owner = currentComposer
      invalidate()
    },
    { immediate: true },
  )

  // One watcher per prop, so changing one prop does not overwrite settings made on the exposed pass
  // (for example `setQualityMode`) with the defaults of the other, unset props
  for (const key of configurationProps) {
    watch(() => props[key], () => {
      if (!pass.value) { return }
      applyProp(pass.value, props, key)
      invalidate()
    })
  }

  watch(() => props.gammaCorrection, (gammaCorrection) => {
    if (!pass.value) { return }
    applyGammaCorrection(pass.value, gammaCorrection)
    invalidate()
  })

  onUnmounted(removePass)

  return { pass }
}
