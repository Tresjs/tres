<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import type { Mesh } from 'three'

const boxRef = ref<Mesh | null>(null)
const visible = ref(false)
const { unlimitedFps, fps } = useControls({
  unlimitedFps: true,
  fps: { value: 30, min: 1, max: 120, step: 1, visible },
})

const fpsLimit = computed(() => unlimitedFps.value ? undefined : fps.value)

watch(fpsLimit, (value) => {
  visible.value = value !== undefined
})

const onLoop = ({ delta }: { delta: number }) => {
  if (!boxRef.value) { return }

  boxRef.value.rotation.x += delta * 0.8
  boxRef.value.rotation.y += delta * 1.2
}
</script>

<template>
  <div class="relative h-full w-full">
    <TresLeches />
    <TresCanvas clear-color="#82DBC5" :fps-limit="fpsLimit" @loop="onLoop">
      <TresPerspectiveCamera :position="[5, 5, 5]" />
      <OrbitControls />

      <TresMesh ref="boxRef">
        <TresBoxGeometry :args="[2, 2, 2]" />
        <TresMeshNormalMaterial />
      </TresMesh>
    </TresCanvas>
  </div>
</template>
