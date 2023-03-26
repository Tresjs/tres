import { Clock, EventDispatcher, Raycaster, Scene, Vector2, WebGLRenderer } from 'three'
import { computed, ComputedRef, onUnmounted, shallowReactive, toRefs } from 'vue'
import { Camera } from '/@/composables'

export interface TresState {
  /**
   * The active camera used for rendering the scene.
   *
   * @see https://threejs.org/docs/index.html?q=camera#api/en/cameras/Camera
   *
   * @type {Camera}
   * @memberof TresState
   */
  camera?: Camera
  /**
   * All cameras available in the scene.
   *
   * @see https://threejs.org/docs/index.html?q=camera#api/en/cameras/Camera
   *
   * @type {Camera[]}
   * @memberof TresState
   */
  cameras?: Camera[]
  /**
   * The aspect ratio of the scene.
   *
   * @type {ComputedRef<number>}
   * @memberof TresState
   */
  aspectRatio?: ComputedRef<number>
  /**
   * The WebGLRenderer used to display the scene using WebGL.
   *
   * @see https://threejs.org/docs/index.html?q=webglren#api/en/renderers/WebGLRenderer
   *
   * @type {WebGLRenderer}
   * @memberof TresState
   */
  renderer?: WebGLRenderer
  /**
   * The scene. This is the place where you place objects, lights and cameras.
   *
   * @see https://threejs.org/docs/index.html?q=scene#api/en/scenes/Scene
   *
   * @type {Scene}
   * @memberof TresState
   */
  scene?: Scene
  /**
   * The raycaster.
   *
   * @see https://threejs.org/docs/index.html?q=raycas#api/en/core/Raycaster
   *
   * @type {Raycaster}
   * @memberof TresState
   */
  raycaster?: Raycaster

  /**
   * Object for keeping track of time. This uses `performance.now` if it is available,
   * otherwise it reverts to the less accurate `Date.now`.
   *
   * @see https://threejs.org/docs/index.html?q=clock#api/en/core/Clock
   *
   * @type {Clock}
   * @memberof TresState
   */
  clock?: Clock
  /**
   * The current mouse position.
   *
   * @type {Vector2}
   * @memberof TresState
   */
  pointer?: Vector2
  /**
   * The current instance of the component.
   *
   * @type {*}
   * @memberof TresState
   */
  currentInstance?: any
  /**
   *  The current active scene control
   *
   * @type {((EventDispatcher & { enabled: boolean }) | null)}
   * @memberof TresState
   */
  controls?: (EventDispatcher & { enabled: boolean }) | null
  [key: string]: any
}

const INIT_STATE = {
  camera: undefined,
  cameras: [],
  scene: undefined,
  renderer: undefined,
  aspectRatio: computed(() => window.innerWidth / window.innerHeight),
}
const state: TresState = shallowReactive(INIT_STATE)

/**
 * The Tres state.
 *
 * @see https://threejs.org/docs/index.html?q=scene#api/en/scenes/Scene
 *
 * @export
 * @return {*} {TresState, getState, setState}
 */
export function useTres() {
  /**
   * Get a state value.
   *
   *
   * @param {string} key
   * @return {*}
   */
  function getState(key: string) {
    return state[key]
  }

  /**
   * Set a state value.
   *
   * @param {string} key
   * @param {*} value
   */
  function setState(key: string, value: any) {
    state[key] = value
  }

  /**
   * Reset a state
   *
   */
  function resetState() {
    setState('scene', null)
    setState('renderer', null)
    setState('camera', null)
    setState('cameras', [])
  }

  return {
    state,
    ...toRefs(state),
    getState,
    setState,
    resetState
  }
}
