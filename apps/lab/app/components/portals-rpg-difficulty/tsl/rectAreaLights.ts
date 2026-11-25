import { RectAreaLightNode } from 'three/webgpu'
import { RectAreaLightTexturesLib } from 'three/addons/lights/RectAreaLightTexturesLib.js'

let ready = false

// RectAreaLight renders black until the LTC textures exist, and `init()` builds new ones on every call.
export function initRectAreaLights() {
  if (ready) { return }
  ready = true
  RectAreaLightNode.setLTC(RectAreaLightTexturesLib.init())
}
