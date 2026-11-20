import { film } from 'three/examples/jsm/tsl/display/FilmNode.js'
import { defineEffect } from '../defineEffect'

/** Animated film grain. An LDR effect, so the grain does not change with tone mapping. */
export const Film = defineEffect({
  name: 'Film',
  stage: 'ldr',
  props: {
    /** The mix between the input and the grained colors, from 0 to 1. */
    intensity: 1,
  },
  create: (input, { uniforms }) => film(input, uniforms.intensity),
})
