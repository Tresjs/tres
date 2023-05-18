import { TresScene } from './TresScene'
import { defineComponent, h } from 'vue'
import { ColorSpace, ShadowMapType, ToneMapping } from 'three'
import { CameraType, useTresProvider } from '/@/composables'
import { RendererPresetsType } from '/@/composables/useRenderer/const'
import { Component } from 'vue'

export interface TresCanvasProps {
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

    return () => h(TresScene as Component, props, slots)
  },
})

export default TresCanvas
