import { App, defineComponent, h, onMounted, onUnmounted, provide, ref, watchEffect } from 'vue'
import * as THREE from 'three'
import { ShadowMapType, TextureEncoding, ToneMapping } from 'three'
import { createTres } from '/@/core/renderer'
import { TRES_CONTEXT_KEY, useLogger } from '/@/composables'
import { useCamera, useRenderer, useRenderLoop, useRaycaster, useTres } from '/@/composables'
import { extend } from '/@/core/catalogue'
import { RendererPresetsType } from '/@/composables/useRenderer/const'
import { TresEvent, TresObject } from '../types'
import { useEventListener } from '@vueuse/core'
import { isString } from '@alvarosabu/utils'

export interface TresSceneProps {
  shadows?: boolean
  shadowMapType?: ShadowMapType
  physicallyCorrectLights?: boolean
  useLegacyLights?: boolean
  outputEncoding?: TextureEncoding
  toneMapping?: ToneMapping
  toneMappingExposure?: number
  context?: WebGLRenderingContext
  powerPreference?: 'high-performance' | 'low-power' | 'default'
  preserveDrawingBuffer?: boolean
  clearColor?: string
  windowSize?: boolean
  preset?: RendererPresetsType
  disableRender?: boolean
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
    'outputEncoding',
    'toneMapping',
    'toneMappingExposure',
    'context',
    'powerPreference',
    'preserveDrawingBuffer',
    'clearColor',
    'windowSize',
    'preset',
    'disableRender',
  ] as unknown as undefined,
  setup(props, { slots, expose }) {
    if (props.physicallyCorrectLights === true) {
      logWarning('physicallyCorrectLights is deprecated, useLegacyLights is now false by default')
    }

    const container = ref<HTMLElement>()
    const canvas = ref<HTMLElement>()
    const scene = new THREE.Scene()
    const { setState } = useTres()

    setState('scene', scene)
    setState('canvas', canvas)
    setState('container', container)

    const isCameraAvailable = ref()

    const internal = slots && slots.default && slots.default()

    if (internal?.length > 0) {
      isCameraAvailable.value = internal.some((node: TresObject) => isString(node.type) && node.type.includes('Camera'))
      if (!isCameraAvailable.value) {
        logWarning('No camera found in the scene, please add one!')
      }
    }

    onMounted(() => {
      initRenderer()
    })

    onUnmounted(() => {
      setState('renderer', null)
    })

    function initRenderer() {
      const { renderer } = useRenderer(props)

      const { activeCamera } = useCamera()

      const { onLoop } = useRenderLoop()

      const { raycaster, pointer } = useRaycaster()

      let prevInstance: TresEvent | null = null
      let currentInstance: TresEvent | null = null

      watchEffect(() => {
        if (activeCamera.value) raycaster.value.setFromCamera(pointer.value, activeCamera.value)
      })

      onLoop(() => {
        if (activeCamera.value && props.disableRender !== true && props.disableRender !== '')
          renderer.value?.render(scene, activeCamera.value)

        if (raycaster.value) {
          const intersects = raycaster.value.intersectObjects(scene.children)

          if (intersects.length > 0) {
            currentInstance = intersects[0]
            if (prevInstance === null) {
              currentInstance.object?.events?.onPointerEnter?.(currentInstance)
            }
            currentInstance.object?.events?.onPointerMove?.(currentInstance)
          } else {
            if (prevInstance !== null) {
              currentInstance?.object?.events?.onPointerLeave?.(prevInstance)
              currentInstance = null
            }
          }
          prevInstance = currentInstance
        }
      })

      useEventListener(canvas.value, 'click', () => {
        if (currentInstance === null) return
        currentInstance.object?.events?.onClick?.(currentInstance)
      })
    }

    let app: App

    function mountApp() {
      app = createTres(slots)
      app.provide('useTres', useTres())
      app.provide(TRES_CONTEXT_KEY, useTres())
      app.provide('extend', extend)
      app.mount(scene as unknown as TresObject)
    }
    mountApp()

    expose({
      scene,
    })

    function dispose() {
      scene.children = []
      app.unmount()
      mountApp()
    }

    if (import.meta.hot) {
      import.meta.hot.on('vite:afterUpdate', dispose)
    }

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
