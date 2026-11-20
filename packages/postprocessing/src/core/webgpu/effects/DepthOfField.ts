import { dof } from 'three/examples/jsm/tsl/display/DepthOfFieldNode.js'
import { defineEffect } from '../defineEffect'

/** Blurs the scene in front of and behind the focus distance. It reads the depth of the scene pass. */
export const DepthOfField = defineEffect({
  name: 'DepthOfField',
  props: {
    /** The distance from the camera to the focal plane, in world units. */
    focusDistance: 1,
    /** How far from the focal plane an object can be before it is fully out of focus, in world units. */
    focalLength: 1,
    /** The size of the bokeh. */
    bokehScale: 1,
  },
  create: (input, { passes, uniforms }) =>
    dof(input, passes.scenePass.getViewZNode(), uniforms.focusDistance, uniforms.focalLength, uniforms.bokehScale),
})
