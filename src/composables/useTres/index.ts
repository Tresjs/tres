import { type ComputedRef, toValue } from 'vue'
import type { TresContext } from '../useTresContextProvider'
import { useTresContext } from '../useTresContextProvider'
import type { Camera, WebGLRenderer } from 'three'

export interface TresPartialContext extends Omit<TresContext, 'renderer' | 'camera'> {
  /**
   * The renderer instance
   *
   * @type {WebGLRenderer}
   * @memberof TresPartialContext
   */
  renderer: WebGLRenderer
  /**
   * The current active camera
   *
   * @type {ComputedRef<Camera | undefined>}
   * @memberof TresPartialContext
   */
  camera: ComputedRef<Camera | undefined>
  /**
   * Marks the scene as needing an update in the next frame.
   * This is used in on-demand rendering mode to schedule a render.
   *
   * @type {() => void}
   * @memberof TresPartialContext
   */
  invalidate: () => void
  /**
   * Manually advances the render loop by one frame.
   * This is particularly useful in manual rendering mode where you want explicit control over when frames are rendered.
   *
   * @type {() => void}
   * @memberof TresPartialContext
   */
  advance: () => void
}

export function useTres(): TresPartialContext {
  const { scene, renderer, camera, sizes, controls, loop, extend, raycaster } = useTresContext()

  return {
    scene,
    renderer: toValue(renderer.instance),
    camera: camera.activeCamera,
    sizes,
    controls,
    loop,
    extend,
    raycaster,
    invalidate: () => renderer.invalidate(),
    advance: () => renderer.advance(),
  }
}
