import { App, defineComponent, h, onMounted, onUnmounted, ref, watch, VNode } from 'vue'
import * as THREE from 'three'
import { ColorSpace, ShadowMapType, ToneMapping } from 'three'
import { isString } from '@alvarosabu/utils'
import { createTres } from '../core/renderer'
import { TresCamera } from '../types/'
import {
  CameraType,
  TRES_CONTEXT_KEY,
  useLogger,
  useCamera,
  useRenderer,
  useRenderLoop,
  useTres,
  usePointerEventHandler,
} from '../composables'
import { extend } from '../core/catalogue'
import { type RendererPresetsType } from '../composables/useRenderer/const'
import { OBJECT_3D_USER_DATA_KEYS } from '../keys'

export interface TresSceneProps {
  shadows?: boolean
  shadowMapType?: ShadowMapType
  physicallyCorrectLights?: boolean
  useLegacyLights?: boolean
  outputColorSpace?: ColorSpace
  toneMapping?: ToneMapping
  toneMappingExposure?: number
  context?: WebGLRenderingContext
  powerPreference?: 'high-performance' | 'low-power' | 'default'
  preserveDrawingBuffer?: boolean
  clearColor?: string
  windowSize?: boolean
  preset?: RendererPresetsType
  disableRender?: boolean
  camera?: CameraType
}
/**
 * Vue component for rendering a Tres component.
 */

const { logWarning } = useLogger()

export const TresScene = defineComponent<TresSceneProps>({
  name: 'TresScene',
  props: [
    'shadows',
    'shadowMapType',
    'physicallyCorrectLights',
    'useLegacyLights',
    'outputColorSpace',
    'toneMapping',
    'toneMappingExposure',
    'context',
    'powerPreference',
    'preserveDrawingBuffer',
    'clearColor',
    'windowSize',
    'preset',
    'disableRender',
    'camera',
  ] as unknown as undefined,
  setup(props, { slots, expose }) {
    if (props.physicallyCorrectLights === true) {
      logWarning('physicallyCorrectLights is deprecated, useLegacyLights is now false by default')
    }

    const container = ref<HTMLElement>()
    const canvas = ref<HTMLElement>()

    const scene = new THREE.Scene()

    const pointerEventHandler = usePointerEventHandler()
    const { setState } = useTres()

    scene.userData[OBJECT_3D_USER_DATA_KEYS.REGISTER_AT_POINTER_EVENT_HANDLER] = pointerEventHandler.registerObject

    setState('scene', scene)
    setState('canvas', canvas)
    setState('container', container)
    setState('pointerEventHandler', pointerEventHandler)

    const { onLoop, resume } = useRenderLoop()

    onMounted(() => {
      initRenderer()
    })

    onUnmounted(() => {
      setState('renderer', null)
    })

    const { activeCamera, pushCamera, clearCameras } = useCamera()

    function setCamera() {
      const camera = scene.children.find((child: any) => child.isCamera)

      if (!camera) {
        // eslint-disable-next-line max-len
        logWarning('No camera found. Creating a default perspective camera. To have full control over a camera, please add one to the scene.')
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
        camera.position.set(3,3,3)
        camera.lookAt(0,0,0)
        pushCamera(camera)
      } else {

        pushCamera(camera as TresCamera)
      }
    }

    function initRenderer() {
      const { renderer } = useRenderer(props)

      if (props.camera) {
        pushCamera(props.camera as any)
      }

      onLoop(() => {
        if (activeCamera.value && props.disableRender !== true) renderer.value?.render(scene, activeCamera.value)
      })
    }

    let app: App

    function mountApp() {
      app = createTres(slots)
      const tres = useTres()
      app.provide('useTres', tres)
      app.provide(TRES_CONTEXT_KEY, tres)
      app.provide('extend', extend)
      app.mount(scene as unknown)
      setCamera()
    }
    mountApp()

    expose({
      scene,
    })

    function dispose() {
      scene.children = []
      app.unmount()
      app = createTres(slots)
      app.provide('extend', extend)
      app.mount(scene as unknown)
      setCamera()
      resume()
    }

    if (import.meta.hot) {
      import.meta.hot.on('vite:afterUpdate', dispose)
    }

    watch(
      () => props.camera,
      camera => {
        if (camera) {
          clearCameras()
          pushCamera(camera as any)
        }
      },
    )

    return () => {
      return h(
        h(
          'div',
          {
            ref: container,
            'data-scene': scene.uuid,
            key: scene.uuid,
            style: {
              position: 'relative',
              width: '100%',
              height: '100%',
              pointerEvents: 'auto',
              touchAction: 'none',
            },
          },
          [
            h(
              'div',
              {
                style: {
                  width: '100%',
                  height: '100%',
                },
              },
              [
                h('canvas', {
                  ref: canvas,
                  'data-scene': scene.uuid,
                  style: {
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    position: props.windowSize ? 'fixed' : 'absolute',
                    top: 0,
                    left: 0,
                  },
                }),
              ],
            ),
          ],
        ),
      )
    }
  },
})

export default TresScene
