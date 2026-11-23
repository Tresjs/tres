import { RectAreaLightNode } from 'three/webgpu'
import { RectAreaLightTexturesLib } from 'three/addons/lights/RectAreaLightTexturesLib.js'

let ready = false

/** RectAreaLight renders black under WebGPURenderer until its LTC textures exist. `init()` builds new textures on every call, hence the guard. */
export function initRectAreaLights() {
  if (ready) { return }
  ready = true
  RectAreaLightNode.setLTC(RectAreaLightTexturesLib.init())
}
