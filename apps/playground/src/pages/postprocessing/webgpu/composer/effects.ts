import { defineEffect } from '@tresjs/post-processing/webgpu'
import { length, mix, screenUV, smoothstep, vec4 } from 'three/tsl'
import { ref } from 'vue'

// Counts `create` calls: a prop change must not add to it, only add / remove / reorder.
export const builds = ref(0)

export const Invert = defineEffect({
  name: 'Invert',
  props: { amount: 1 },
  create: (input, { uniforms }) => {
    builds.value++
    return vec4(mix(input.rgb, input.rgb.oneMinus(), uniforms.amount), input.a)
  },
})

export const Vignette = defineEffect({
  name: 'Vignette',
  props: { darkness: 0.9, color: '#1d0b3a' },
  create: (input, { uniforms }) => {
    builds.value++
    const edge = smoothstep(0.2, 0.75, length(screenUV.sub(0.5))).mul(uniforms.darkness)
    return vec4(mix(input.rgb, uniforms.color, edge), input.a)
  },
})
