import { RendererPresetsType } from './const'
import { ShadowMapType, TextureEncoding, ToneMapping } from 'three'
import { h, defineComponent, ref, provide, onBeforeUnmount, PropType } from 'vue'
import { useRenderer } from '.'
import { useLogger } from '/@/composables'
import { TresVNodeType } from '/@/types'

/**
 * Vue component for rendering a Tres component.
 */

const { logError, logWarning } = useLogger()

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
          logWarning('physicallyCorrectLights is deprecated. Use useLegacyLights instead.')
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
    preset: String as PropType<RendererPresetsType>,
  },
  setup(props, { slots, attrs }) {
    const canvas = ref<HTMLCanvasElement>()
    const container = ref<HTMLElement>()

    const { renderer, dispose, aspectRatio } = useRenderer(canvas, container, props)

    provide('aspect-ratio', aspectRatio)
    provide('renderer', renderer)

    if (slots.default && !slots.default().some(node => (node.type as TresVNodeType).name === 'Scene')) {
      logError('TresCanvas must contain a Scene component.')
    }
    if (slots.default && !slots.default().some(node => (node.type as TresVNodeType).name?.includes('Camera'))) {
      logError('Scene must contain a Camera component.')
    }

    onBeforeUnmount(() => dispose())

    return () => {
      if (slots.default) {
        return h(
          'div',
          {
            ref: container,
            style: {
              position: 'relative',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
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
                slots.default(),
              ],
            ),
          ],
        )
      }
    }
  },
})
