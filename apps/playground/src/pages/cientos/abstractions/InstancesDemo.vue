<script setup lang="ts">
import { Instance, Instances, Levioso, OrbitControls, Stats } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { BoxGeometry, MeshStandardMaterial, NoToneMapping, SRGBColorSpace } from 'three'
import { computed, onUnmounted, ref } from 'vue'

const uuid = 'cientos-abstractions-instances'

const gl = {
  clearColor: '#0f172a',
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const geometry = new BoxGeometry(0.4, 0.4, 0.4)
const material = new MeshStandardMaterial({ roughness: 0.4 })

onUnmounted(() => {
  geometry.dispose()
  material.dispose()
})

const GRID = 24

const scatter = computed(() => {
  const out: Array<{ id: number, position: [number, number, number] }> = []
  for (let x = 0; x < GRID; x++) {
    for (let z = 0; z < GRID; z++) {
      out.push({ id: x * GRID + z, position: [x - GRID / 2, 0, z - GRID / 2] })
    }
  }
  return out
})

const { removeHalf, ringVisible, overflow, instances, drawcalls } = useControls({
  // v-if path: instances unregister on unmount
  removeHalf: false,
  // :visible path: instances stay registered but drop out of the batch
  ringVisible: true,
  // 588 already registered, so this pushes past :limit="1000" and exercises buffer growth
  overflow: false,
  // readouts, refreshed below (leches has no read-only control type)
  instances: { value: '-' },
  drawcalls: { value: '-' },
}, { uuid })

const extra = computed(() => (overflow.value ? Array.from({ length: 600 }, (_, i) => i) : []))

const canvasRef = ref()
const batchRef = ref()

const readout = setInterval(() => {
  const exposed = batchRef.value?.instance
  const mesh = exposed?.value ?? exposed
  instances.value = mesh ? `${mesh.count} / ${mesh.instanceMatrix.count}` : '-'
  const info = canvasRef.value?.context?.renderer?.instance?.info
  drawcalls.value = info ? `${info.render.calls}` : '-'
}, 250)

onUnmounted(() => clearInterval(readout))

const picked = ref<Set<number>>(new Set())
function pick(id: number) {
  const next = new Set(picked.value)
  if (next.has(id)) { next.delete(id) }
  else { next.add(id) }
  picked.value = next
}
</script>

<template>
  <TresLeches :uuid="uuid" />
  <TresCanvas
    ref="canvasRef"
    v-bind="gl"
  >
    <TresPerspectiveCamera :position="[18, 14, 18]" />
    <OrbitControls />
    <Stats />

    <Instances
      ref="batchRef"
      name="scatter"
      :geometry="geometry"
      :material="material"
      :limit="1000"
    >
      <template v-for="cube in scatter" :key="cube.id">
        <Instance
          v-if="!removeHalf || cube.position[0] < 0"
          :position="cube.position"
          :color="picked.has(cube.id) ? '#f97316' : '#38bdf8'"
          @click="pick(cube.id)"
        />
      </template>

      <!-- animated parent: instances follow normal scene-graph transforms -->
      <Levioso :speed="4" :float-factor="2">
        <TresGroup :position="[0, 3, 0]">
          <Instance
            v-for="i in 12"
            :key="`ring-${i}`"
            :position="[Math.cos((i / 12) * Math.PI * 2) * 3, 0, Math.sin((i / 12) * Math.PI * 2) * 3]"
            :scale="1.5"
            :visible="ringVisible"
            color="#facc15"
          />
        </TresGroup>
      </Levioso>

      <Instance
        v-for="i in extra"
        :key="`extra-${i}`"
        :position="[(i % 20) - 10, 5, Math.floor(i / 20) - 10]"
        :scale="0.5"
        color="#f43f5e"
      />
    </Instances>

    <TresGridHelper :args="[30, 30]" />
    <TresAmbientLight :intensity="1.2" />
    <TresDirectionalLight :position="[6, 10, 4]" :intensity="2" />
  </TresCanvas>
</template>
