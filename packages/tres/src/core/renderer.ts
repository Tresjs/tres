import * as THREE from 'three'

import { createRenderer } from 'vue'
import { extend } from './catalogue'
import { nodeOps } from './nodeOps'

export const { createApp: createTres } = createRenderer(nodeOps)

extend(THREE)

export default { createTres, extend }
