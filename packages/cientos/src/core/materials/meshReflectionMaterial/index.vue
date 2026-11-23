<!-- eslint-disable vue/attribute-hyphenation -->
<script setup lang="ts">
import { logWarning, useTres } from '@tresjs/core'
import { WebGLRenderTarget } from 'three'
import { computed, shallowRef, watch } from 'vue'
import { useWebGPUSupportWarning } from '../../../utils/useWebGPUSupportWarning'
import { ConvolutionMaterial } from './ConvolutionMaterial'
import { MeshReflectionMaterial } from './MeshReflectionMaterial'
import type { MeshReflectionMaterialProps } from './props'
import { meshReflectionMaterialDefaults } from './props'
import { useMeshReflectionMaterial } from './useMeshReflectionMaterial'

export type { MeshReflectionMaterialProps } from './props'

const props = withDefaults(defineProps<MeshReflectionMaterialProps>(), meshReflectionMaterialDefaults)

useWebGPUSupportWarning(
  'MeshReflectionMaterial',
  'renders to a texture with GLSL materials, which WebGPURenderer cannot compile. Import MeshReflectionMaterial from @tresjs/cientos/webgpu instead',
)

const { extend } = useTres()
extend({ MeshReflectionMaterial })

const materialRef = shallowRef<MeshReflectionMaterial>()

const { tresProps, hasBlur, hasDepth } = useMeshReflectionMaterial(props, materialRef, {
  createTarget: (width, height, options) => new WebGLRenderTarget(width, height, options),
  createConvolutionMaterial: () => new ConvolutionMaterial(),
  forWebGPURenderer: false,
})

const hasDistortion = computed(() => !!props.distortionMap)
const hasRoughness = computed(() => !!props.roughnessMap)

// Tres does not swap mesh materials on a recompile (https://github.com/Tresjs/tres/issues/615).
watch(() => [hasBlur.value], () => {
  logWarning(
    'MeshReflectionMaterial: Setting blurMixRough or blurMixSmooth to 0, then non-zero triggers a recompile.'
    + 'The TresJS core cannot currently handle recompiled materials.',
  )
})
watch(hasDepth, () => {
  logWarning(
    'MeshReflectionMaterial: Setting depthScale to 0, then non-zero triggers a recompile.'
    + 'The TresJS core cannot currently handle recompiled materials.',
  )
})
watch(hasDistortion, () => {
  logWarning(
    'MeshReflectionMaterial: Toggling distortionMap triggers a recompile.'
    + 'The TresJS core cannot currently handle recompiled materials.',
  )
})
watch(hasRoughness, () => {
  logWarning(
    'MeshReflectionMaterial: Toggling roughnessMap triggers a recompile.'
    + 'The TresJS core cannot currently handle recompiled materials.',
  )
})
watch(() => [props.normalMap], () => {
  logWarning(
    'MeshReflectionMaterial: Toggling normalMap triggers a recompile.'
    + 'The TresJS core cannot currently handle recompiled materials.',
  )
})

defineExpose({ instance: materialRef })
</script>

<template>
  <TresMeshReflectionMaterial
    :key="`key${hasBlur ? '0' : '1'
    }${hasDepth ? '0' : '1'
    }${hasDistortion ? '0' : '1'
    }${hasRoughness ? '0' : '1'
    }`"
    ref="materialRef"
    v-bind="tresProps"
    :defines-USE_BLUR="hasBlur ? '' : undefined"
    :defines-USE_DEPTH="hasDepth ? '' : undefined"
    :defines-USE_DISTORTION="hasDistortion ? '' : undefined"
  />
</template>
