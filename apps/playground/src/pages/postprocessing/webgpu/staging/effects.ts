import { defineEffect } from '@tresjs/post-processing/webgpu'
import { bloom } from 'three/addons/tsl/display/BloomNode.js'
import { fxaa } from 'three/addons/tsl/display/FXAANode.js'
import { smaa } from 'three/addons/tsl/display/SMAANode.js'

export const Bloom = defineEffect({
  name: 'Bloom',
  props: { strength: 1, radius: 0.4, threshold: 0.8 },
  create: (input, { uniforms }) => input.add(bloom(input, uniforms.strength, uniforms.radius, uniforms.threshold)),
})

export const FXAA = defineEffect({
  name: 'FXAA',
  stage: 'ldr',
  create: input => fxaa(input),
})

export const SMAA = defineEffect({
  name: 'SMAA',
  stage: 'ldr',
  create: input => smaa(input),
})

