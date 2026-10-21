import UseLoader from './useLoader/component.vue'

export { useRendererManager, useTresContextProvider } from '../webgl/renderer'
export * from './useCamera'
export * from './useGraph'
export * from './useLoader'
export * from './useLoop'
export type {
  RendererOptions,
  RenderFunction,
  RenderMode,
  TresRenderer,
  TresRendererSetupContext,
  UseRendererManagerReturn,
  UseRendererOptions,
} from './useRenderer/useRendererManager'

export * from './useTres'
export { INJECTION_KEY, type TresContext, useTresContext } from './useTresContextProvider'

export { UseLoader }
