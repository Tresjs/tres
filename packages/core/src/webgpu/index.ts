import * as THREE_WEBGPU from 'three/webgpu'
import type { App } from 'vue'
import { extend } from '../core/catalogue'
import type { TresPlugin } from '../index'
import TresCanvas from './TresCanvas.vue'
import WebGPUContext from './WebGPUContext.vue'

// Explicit exports below take precedence over the names re-exported here.
export * from '../index'
export { TresCanvas, WebGPUContext as TresCanvasContext }
export { useRendererManager, useTresContextProvider } from './renderer'
export type { TresWebGPUCanvasProps } from './TresCanvas.vue'
export type { TslCreatorState, TslScene } from './tsl/context'
export { useLocalNodes } from './tsl/useLocalNodes'
export type { LocalNodesInstall, LocalNodesRefs, LocalNodesSources } from './tsl/useLocalNodes'
export { useNodes } from './tsl/useNodes'
export type { LooseNode, NodeCreator, NodesUtils, NodesWithUtils } from './tsl/useNodes'
export { useRenderPipeline } from './tsl/useRenderPipeline'
export type { RenderPipelineCallback, RenderPipelineCallbackState, RenderPipelinePasses, UseRenderPipelineReturn } from './tsl/useRenderPipeline'
export { useUniform, useUniforms } from './tsl/useUniforms'
export type { LooseUniformNode, UniformInput, UniformNodeOf, UniformNodesOf, UniformSource, UniformsUtils, UniformsWithUtils } from './tsl/useUniforms'
export type { TresWebGPUComponents } from './types'
export { useTres } from './useTres'
export type { TresWebGPUPartialContext } from './useTres'

// At import, not per mount: the node tag types apply as soon as the entry is imported.
// `package.json` marks `dist/webgpu.js` as a side effect, so bundlers keep this call.
extend(THREE_WEBGPU)

const plugin: TresPlugin = {
  install(app: App) {
    app.component('TresCanvas', TresCanvas)
  },
}

export default plugin
