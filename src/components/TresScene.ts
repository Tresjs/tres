import { App, defineComponent, h, onMounted, onUnmounted, ref, watchEffect } from 'vue'
import * as THREE from 'three'
import { PerspectiveCamera, ShadowMapType, TextureEncoding, ToneMapping } from 'three'
import { createTres } from '/@/core/renderer'
import { useLogger } from '/@/composables'
import { useCamera, useRenderer, useRenderLoop, useRaycaster, useTres } from '/@/composables'
import { extend } from '/@/core/catalogue'
import { RendererPresetsType } from '/@/composables/useRenderer/const'
import { TresObject } from '../types'

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

    const { pushCamera } = useCamera()
    pushCamera(new PerspectiveCamera())

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

      watchEffect(() => {
        if (activeCamera.value) raycaster.value.setFromCamera(pointer.value, activeCamera.value)
      })

      onLoop(() => {
        if (activeCamera.value) renderer.value?.render(scene, activeCamera.value)
      })
    }

    let app: App

    function mountApp() {
      app = createTres(slots)
      app.provide('useTres', useTres())
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
