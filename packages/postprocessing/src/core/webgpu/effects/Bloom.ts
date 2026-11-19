import type { Node } from 'three/webgpu'
import { bloom } from 'three/examples/jsm/tsl/display/BloomNode.js'
import { vec4 } from 'three/tsl'
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
    /** The width of the soft transition above `threshold`. Keep it above 0. */
    smoothWidth: 0.01,
  },
  create: (input, { uniforms }) => {
    const color = input as Node<'vec4'>
    const glow = bloom(color)
    // r183 wraps the `bloom()` arguments in new uniforms, so the props are bound to the node's fields instead.
    glow.strength = uniforms.strength
    glow.radius = uniforms.radius
    glow.threshold = uniforms.threshold
    glow.smoothWidth = uniforms.smoothWidth
    // The blur writes alpha 1, so adding it would make a transparent canvas opaque.
    return vec4(color.rgb.add(glow.rgb), color.a)
  },
})
