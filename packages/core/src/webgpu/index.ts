import * as THREE_WEBGPU from 'three/webgpu'
import type { App } from 'vue'
import { extend } from '../core/catalogue'
import type { TresPlugin } from '../index'
import TresCanvas from './TresCanvas.vue'

// Explicit exports below take precedence over the names re-exported here.
export * from '../index'
export { TresCanvas }
export type { TresWebGPUComponents } from './types'
export { useTres } from './useTres'
export type { TresWebGPUPartialContext } from './useTres'

// Once at import, not per mount: the `GlobalComponents` types make node tags valid on every
// canvas as soon as this entry is imported, so the runtime catalogue must match that.
// It lives in the entry because `"sideEffects": false` lets bundlers drop side effects of
// modules that are only imported for them. The root Context extends the catalogue with
// `three` afterwards. Both namespaces share their classes through `three.core.js`, so only
// `PMREMGenerator` (not used as a tag) ends up as the WebGL class.
extend(THREE_WEBGPU)

const plugin: TresPlugin = {
  install(app: App) {
    app.component('TresCanvas', TresCanvas)
  },
}

export default plugin
