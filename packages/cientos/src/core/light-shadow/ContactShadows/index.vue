<script setup lang="ts">
// NOTE: The author of the original code is @mrdoob https://twitter.com/mrdoob
// https://threejs.org/examples/?q=con#webgl_shadow_contact

// NOTE: Shader inspiration taken from R3F/Drei:
// https://github.com/pmndrs/drei/blob/b50a2d4b1a1278ae36058b9b53b85a00ef195762/src/core/ContactShadows.tsx#L10

import { WebGLRenderTarget } from 'three'
import { useWebGPUSupportWarning } from '../../../utils/useWebGPUSupportWarning'
import { glslMaterials } from './ContactShadowsMaterial'
import type { ContactShadowsProps } from './props'
import { contactShadowsDefaults } from './props'
import { useContactShadows } from './useContactShadows'

export type { ContactShadowsProps } from './props'

const props = withDefaults(defineProps<ContactShadowsProps>(), contactShadowsDefaults)

useWebGPUSupportWarning(
  'ContactShadows',
  'renders to a texture with GLSL materials, which WebGPURenderer cannot compile. Import ContactShadows from @tresjs/cientos/webgpu instead',
)

const { shadowGroup } = useContactShadows(props, {
  ...glslMaterials,
  createTarget: size => new WebGLRenderTarget(size, size),
  forWebGPURenderer: false,
})

defineExpose({ instance: shadowGroup })
</script>

<template>
  <primitive :object="shadowGroup" />
</template>
