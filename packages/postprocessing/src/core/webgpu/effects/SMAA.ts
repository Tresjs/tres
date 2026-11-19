import { smaa } from 'three/examples/jsm/tsl/display/SMAANode.js'
import { defineEffect } from '../defineEffect'

/** Subpixel morphological anti-aliasing. An LDR effect, so it detects the edges on the tone-mapped colors. */
export const SMAA = defineEffect({
  name: 'SMAA',
  stage: 'ldr',
  create: input => smaa(input),
})
