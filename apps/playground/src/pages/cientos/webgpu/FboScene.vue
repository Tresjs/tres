<script setup lang="ts">
import { useLoop, useTres } from '@tresjs/core'
import { useFBO } from '@tresjs/cientos/webgpu'
import type { Mesh } from 'three'
import { computed, reactive, shallowRef, toRef } from 'vue'

const props = defineProps<{
  depth: boolean
  samples: number
}>()

// `autoRender: false`: this component renders the target itself, so it can hide the screen first.
const target = useFBO(reactive({
  depth: toRef(props, 'depth'),
  settings: computed(() => ({ samples: props.samples })),
  autoRender: false,
}))

const { renderer, scene, camera } = useTres()
const screenRef = shallowRef<Mesh>()
const torusRef = shallowRef<Mesh>()
const capsuleRef = shallowRef<Mesh>()

useLoop().onBeforeRender(({ elapsed }) => {
  torusRef.value?.rotation.set(elapsed * 0.745, elapsed * 0.361, 0)
  capsuleRef.value?.rotation.set(elapsed * 0.471, 0, elapsed * 0.632)

  if (!target.value || !camera.value || !screenRef.value) { return }
  // The screen samples the target, so it must not draw into it. WebGL tolerates this feedback
  // loop, but WebGPU fails validation and can stall the GPU.
  screenRef.value.visible = false
  renderer.setRenderTarget(target.value)
  renderer.clear()
  renderer.render(scene.value, camera.value)
  renderer.setRenderTarget(null)
  screenRef.value.visible = true
})
</script>

<template>
  <TresGridHelper :args="[10, 10]" />

  <TresMesh ref="screenRef">
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshBasicMaterial :color="0xFF8833" :map="target?.texture ?? null" />
  </TresMesh>

  <TresMesh ref="torusRef" :position="[3, 0, 0]">
    <TresTorusGeometry :args="[1, 0.5, 16, 100]" />
    <TresMeshNormalMaterial />
  </TresMesh>

  <TresMesh ref="capsuleRef" :position="[-2, 0, 0]">
    <TresCapsuleGeometry :args="[0.4, 1, 4, 8]" />
    <TresMeshNormalMaterial />
  </TresMesh>
</template>
