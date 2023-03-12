import { defineComponent, h, PropType, ref, watch } from 'vue'
/* eslint-disable vue/one-component-per-file */
import * as THREE from 'three'
import { ShadowMapType, TextureEncoding, ToneMapping, Scene } from 'three'
import { createTres } from '/@/core/renderer'
import { useCamera, useRenderer, useRenderLoop, useRaycaster } from '/@/composables'
import { TresObject } from '/@/types'

export const TresCanvas = defineComponent({
  name: 'TresCanvas',
  props: {
    shadows: Boolean,
    shadowMapType: Number as PropType<ShadowMapType>,
    physicallyCorrectLights: {
      type: Boolean,
      default: false,
      validator: (value: boolean) => {
        if (value) {
          console.warn('physicallyCorrectLights is deprecated. Use useLegacyLights instead.')
        }
        return true
      },
    },
    useLegacyLights: Boolean,
    outputEncoding: Number as PropType<TextureEncoding>,
    toneMapping: Number as PropType<ToneMapping>,
    toneMappingExposure: Number,
    context: Object as PropType<WebGLRenderingContext>,
    powerPreference: String as PropType<'high-performance' | 'low-power' | 'default'>,
    preserveDrawingBuffer: Boolean,
    clearColor: String,
    windowSize: { type: Boolean, default: false },
  },
  setup(props, { slots, expose }) {
    const container = ref<HTMLElement>()
    const canvas = ref<HTMLCanvasElement>()

    watch(canvas, () => {
      const { renderer } = useRenderer(canvas, container, props)
      const { activeCamera } = useCamera()

      const scene = new THREE.Scene()

      const { onLoop } = useRenderLoop()

      const { raycaster, pointer } = useRaycaster()

      onLoop(() => {
        if (!activeCamera.value) return

        raycaster.value.setFromCamera(pointer.value, activeCamera.value)
        renderer.value?.render(scene, activeCamera.value)
      })

      const internal = slots.default ? slots?.default() : [] || []

      const internalComponent = defineComponent({
        __name: 'tres-wrapper',
        __scopeId: 'data-v-tres-supreme',
        setup() {
          return () => internal
        },
      })

      const app = createTres(internalComponent)
      app.mount(scene as unknown as TresObject)
      expose({
        scene,
        app,
      })
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
