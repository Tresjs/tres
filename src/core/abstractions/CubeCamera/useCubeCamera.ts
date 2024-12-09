import { useTres } from '@tresjs/core'
import type { MaybeRefOrGetter } from 'vue'
import { computed, toValue, watchEffect } from 'vue'
import type { Fog, FogExp2, Scene, Texture, WebGLRenderer } from 'three'
import { HalfFloatType, CubeCamera as ThreeCubeCamera, WebGLCubeRenderTarget } from 'three'
import { tryOnScopeDispose } from '@vueuse/core'

export interface CubeCameraOptions {
  /** Resolution of the FBO, 255 */
  resolution?: MaybeRefOrGetter<number>
  /** Camera near, 0.1 */
  near?: MaybeRefOrGetter<number>
  /** Camera far, 1000 */
  far?: MaybeRefOrGetter<number>
  /** Custom environment map that is temporarily set as the scene's background */
  envMap?: MaybeRefOrGetter<Texture>
  /** Custom fog that is temporarily set as the scene's fog */
  fog?: MaybeRefOrGetter<Fog | FogExp2>
  /** Renderer */
  renderer?: MaybeRefOrGetter<WebGLRenderer>
  /** Scene */
  scene?: MaybeRefOrGetter<Scene>
}

export function useCubeCamera(props: CubeCameraOptions) {
  let { resolution, renderer, scene, envMap, fog, near, far } = props
  renderer = renderer ?? useTres().renderer
  scene = scene ?? useTres().scene

  const updateProps = () => {
    resolution = toValue(props.resolution) ?? 255
    near = toValue(props.near) ?? 0.1
    far = toValue(props.far) ?? 1000
    envMap = toValue(props.envMap) ?? undefined
    fog = toValue(props.fog) ?? undefined
    renderer = toValue(props.renderer) ?? renderer
    scene = toValue(props.scene) ?? scene
  }

  watchEffect(updateProps)

  const fbo = computed(() => new WebGLCubeRenderTarget(toValue(resolution)))
  fbo.value.texture.type = HalfFloatType

  tryOnScopeDispose(() => {
    fbo.value.dispose()
  })

  const camera = computed(() => new ThreeCubeCamera(toValue(near)!, toValue(far)!, toValue(fbo)))

  const update = () => {
    const s = toValue(scene)!
    const originalFog = s.fog
    const originalBackground = s.background
    s.background = toValue(envMap) || originalBackground
    s.fog = toValue(fog) || originalFog
    camera.value.update(toValue(renderer)!, s)
    s.fog = originalFog
    s.background = originalBackground
  }

  watchEffect(update)

  return {
    fbo,
    camera,
    update,
  }
}
