import * as THREE from 'three'

import { createRenderer } from 'vue'
import { extend } from './catalogue'
import { nodeOps } from './nodeOps'

export const { render } = createRenderer(nodeOps)

// Creates the catalogue of components based on THREE namespace
extend(THREE)

export default { extend }
