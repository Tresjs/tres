import { TresScene } from './TresScene'
import { defineComponent, h } from 'vue'
import { ShadowMapType, TextureEncoding, ToneMapping } from 'three'
import { CameraType, useTresProvider } from '/@/composables'
import { RendererPresetsType } from '/@/composables/useRenderer/const'

export interface TresCanvasProps {
  shadows?: boolean
  shadowMapType?: ShadowMapType
  physicallyCorrectLights?: boolean
  useLegacyLights?: boolean
  outputColorSpace?: TextureEncoding
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

export const TresCanvas = defineComponent<TresCanvasProps>({
  name: 'TresCanvas',
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
    const tres = useTresProvider()

    expose(tres)

    return () => h(TresScene, props, slots)
  },
})

export default TresCanvas
