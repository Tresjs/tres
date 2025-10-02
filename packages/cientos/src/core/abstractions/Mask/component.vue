<script setup lang="ts">
import type { Mesh } from 'three'
import { AlwaysStencilFunc, ReplaceStencilOp } from 'three'
import { shallowRef, watchEffect } from 'vue'

interface MaskProps {
  /** Id of the stencil buffer to use. Each mask must have an id. Multiple masks can refer to the same id. */
  id: number
  /** Whether the colors of the masks own material will leak through, default: false */
  colorWrite?: boolean
  /** Whether the depth of the masks own material will leak through, default: false */
  depthWrite?: boolean
}

const props = withDefaults(defineProps<MaskProps>(), {
  id: 1,
  colorWrite: true,
  depthWrite: false,
})

const meshRef = shallowRef<Mesh>()

function update() {
  const material = Array.isArray(meshRef.value?.material) ? meshRef.value.material[0] : meshRef.value?.material
  if (!material) { return }

  material.colorWrite = props.colorWrite
  material.depthWrite = props.depthWrite
  material.stencilWrite = true
  material.stencilRef = props.id
  material.stencilFunc = AlwaysStencilFunc
  material.stencilFail = ReplaceStencilOp
  material.stencilZFail = ReplaceStencilOp
  material.stencilZPass = ReplaceStencilOp
}

watchEffect(update)

defineExpose({ instance: meshRef })
</script>

<template>
  <TresMesh ref="meshRef" :render-order="-props.id">
    <slot></slot>
  </TresMesh>
</template>
