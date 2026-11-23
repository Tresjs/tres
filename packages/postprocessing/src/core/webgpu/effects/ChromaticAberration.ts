import { Vector2 } from 'three'
import { chromaticAberration } from 'three/examples/jsm/tsl/display/ChromaticAberrationNode.js'
import { defineEffect } from '../defineEffect'

/** Splits the color channels towards the edges of the screen, like a lens. */
export const ChromaticAberration = defineEffect({
  name: 'ChromaticAberration',
  props: {
    /** The strength of the channel split. */
    strength: 1,
    /** The center of the effect in screen UV, from `[0, 0]` to `[1, 1]`. */
    center: new Vector2(0.5, 0.5),
    /** The scale step between the color channels. */
    scale: 1.1,
  },
  create: (input, { uniforms }) => chromaticAberration(input, uniforms.strength, uniforms.center, uniforms.scale),
})
