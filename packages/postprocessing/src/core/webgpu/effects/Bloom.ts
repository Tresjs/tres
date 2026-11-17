import type { Node } from 'three/webgpu'
import { bloom } from 'three/examples/jsm/tsl/display/BloomNode.js'
import { defineEffect } from '../defineEffect'

/** Adds a glow around the bright areas of the scene. An HDR effect, so it sees colors above 1. */
export const Bloom = defineEffect({
  name: 'Bloom',
  props: {
    /** The strength of the glow. */
    strength: 1,
    /** How far the glow spreads, from 0 to 1. */
    radius: 0,
    /** The luminance above which a pixel glows. */
    threshold: 0,
    /** The width of the soft transition above `threshold`. */
    smoothWidth: 0.01,
  },
  create: (input, { uniforms }) => {
    const color = input as Node<'vec4'>
    const glow = bloom(color, uniforms.strength, uniforms.radius, uniforms.threshold)
    // `bloom()` has no parameter for it, but the node reads this property when it builds its shader.
    glow.smoothWidth = uniforms.smoothWidth
    return color.add(glow)
  },
})
