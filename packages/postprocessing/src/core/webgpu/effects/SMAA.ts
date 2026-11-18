import { smaa } from 'three/examples/jsm/tsl/display/SMAANode.js'
import { defineEffect } from '../defineEffect'

/** Subpixel morphological anti-aliasing. An HDR effect, because `SMAANode` expects colors before the sRGB conversion. */
export const SMAA = defineEffect({
  name: 'SMAA',
  create: input => smaa(input),
})
