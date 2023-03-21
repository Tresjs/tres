import { defineComponent, h, ref, watch } from 'vue'
import * as THREE from 'three'
import { ShadowMapType, TextureEncoding, ToneMapping } from 'three'
import { createTres } from '/@/core/renderer'
import { useLogger } from '/@/composables'
import { useCamera, useRenderer, useRenderLoop, useRaycaster, useTres } from '/@/composables'
import { TresObject } from '../types'
import { extend } from '../core/catalogue'
import { RendererPresetsType } from '../composables/useRenderer/const'

export interface TresCanvasProps {
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

export const TresCanvas = defineComponent<TresCanvasProps>({
  name: 'TresCanvas',
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
    const canvas = ref<HTMLCanvasElement>()
    const scene = new THREE.Scene()

    watch(canvas, () => {
      const { renderer } = useRenderer(canvas, container, props)
      const { activeCamera } = useCamera()

      const { onLoop } = useRenderLoop()

      const { raycaster, pointer } = useRaycaster()

      onLoop(() => {
        if (!activeCamera.value) return

        raycaster.value.setFromCamera(pointer.value, activeCamera.value)
        renderer.value?.render(scene, activeCamera.value)
      })
    })

    const app = createTres(slots)
    app.provide('useTres', useTres())
    app.provide('extend', extend)
    app.mount(scene as unknown as TresObject)
    expose({
      scene,
    })

    return () => {
      return h(
        h(
          'div',
          {
            ref: container,
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

export default TresCanvas
