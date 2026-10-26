import { ACESFilmicToneMapping } from 'three'

/**
 * Prop defaults shared by the root and the WebGPU `TresCanvas`.
 * Boolean props default to `undefined`, else Vue casts an absent boolean prop to `false`
 * and it overrides the renderer's own default.
 */
export const tresCanvasDefaults = {
  alpha: undefined,
  depth: undefined,
  shadows: undefined,
  stencil: undefined,
  antialias: true,
  windowSize: undefined,
  useLegacyLights: undefined,
  preserveDrawingBuffer: undefined,
  logarithmicDepthBuffer: undefined,
  failIfMajorPerformanceCaveat: undefined,
  renderMode: 'always',
  clearColor: '#000000',
  clearAlpha: 1,
  enableProvideBridge: true, // We should probably move to options in next major version
  toneMapping: ACESFilmicToneMapping,
  shadowMapType: undefined,
  customRendererOptions: () => ({
    primitivePrefix: '',
  }),
} as const
