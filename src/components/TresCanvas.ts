import { TresScene } from './TresScene'
import { defineComponent, h } from 'vue'
import { ShadowMapType, TextureEncoding, ToneMapping } from 'three'
import { useTresProvider } from '/@/composables'
import { RendererPresetsType } from '/@/composables/useRenderer/const'

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
    const tres = useTresProvider()

    expose(tres)

    return () => h(TresScene, props, slots)
  },
})

export default TresCanvas
