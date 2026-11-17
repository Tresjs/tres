import { fxaa } from 'three/examples/jsm/tsl/display/FXAANode.js'
import { defineEffect } from '../defineEffect'

/** Fast approximate anti-aliasing. An LDR effect, so it runs on the tone-mapped colors. */
export const FXAA = defineEffect({
  name: 'FXAA',
  stage: 'ldr',
  create: input => fxaa(input),
})
