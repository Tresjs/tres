import { useRenderLoop } from '@tresjs/core'
import { defineComponent, h, onUnmounted, PropType, provide, ref, watch, watchEffect } from 'vue'
/* eslint-disable vue/one-component-per-file */
import * as THREE from 'three'
import { ShadowMapType, TextureEncoding, ToneMapping } from 'three'
/* import { OrbitControls } from '@tresjs/cientos' */
import { createTres } from '/@/core/renderer'
import { useCamera, useRenderer, useTres } from '/@/composables'

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
  setup(props, { slots, attrs, expose }) {
    const container = ref<HTMLElement>()
    const canvas = ref<HTMLCanvasElement>()
    const { state, setState } = useTres()

    const { renderer, aspectRatio } = useRenderer(canvas, container, props)
    const { activeCamera } = useCamera()

    provide('aspect-ratio', aspectRatio)
    provide('renderer', renderer)
    /*  const renderer = new THREE.WebGLRenderer({
        canvas: canvas.value,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      })
      renderer.outputEncoding = THREE.sRGBEncoding
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.setSize(window.innerWidth, window.innerHeight) */

    /* const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight)
      camera.position.set(0, 2, 7) */

    /* const controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true */

    const scene = new THREE.Scene()

    const { onLoop } = useRenderLoop()

    onLoop(() => {
      if (!activeCamera.value) return
      renderer.value?.render(scene, activeCamera.value)
    })

    const internal = slots?.default() || []

    const internalComponent = defineComponent({
      name: 'Wrapper',
      setup() {
        return () => internal
      },
    })

    const app = createTres(internalComponent)
    app.mount(scene)

    console.log(scene)

    expose({
      scene,
      app,
    })

    onUnmounted(() => {
      app.unmount()
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
              ...(attrs.style as Record<string, unknown>),
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
