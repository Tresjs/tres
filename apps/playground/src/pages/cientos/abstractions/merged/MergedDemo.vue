<script setup lang="ts">
import { Merged, OrbitControls, Stats } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { BoxGeometry, Mesh, MeshStandardMaterial, NoToneMapping, SphereGeometry, SRGBColorSpace } from 'three'
import { computed, onUnmounted, ref } from 'vue'
import Robot from './Robot.vue'

const uuid = 'cientos-abstractions-merged'

const gl = {
  clearColor: '#0f172a',
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

// stand-in for the `{ name: mesh }` map useGLTF's nodes would provide
const body = new Mesh(new BoxGeometry(0.8, 1, 0.6), new MeshStandardMaterial({ color: '#38bdf8', roughness: 0.4 }))
const eye = new Mesh(new SphereGeometry(0.09, 16, 16), new MeshStandardMaterial({ color: '#facc15', emissive: '#facc15', emissiveIntensity: 0.6 }))

const meshes = { Body: body, Eye: eye }

onUnmounted(() => {
  for (const mesh of Object.values(meshes)) {
    mesh.geometry.dispose()
    ;(mesh.material as MeshStandardMaterial).dispose()
  }
})

const { rows, instances, drawcalls } = useControls({
  rows: { value: 7, min: 1, max: 15, step: 2 },
  // readouts, refreshed below (leches has no read-only control type)
  instances: { value: '-' },
  drawcalls: { value: '-' },
}, { uuid })

const canvasRef = ref()
const mergedRef = ref()

const readout = setInterval(() => {
  const registry = mergedRef.value?.instances
  const counts = registry
    ? Object.entries(registry).map(([name, api]: [string, any]) => `${name} ${api.mesh.value?.count ?? 0}`)
    : []
  instances.value = counts.length ? counts.join(', ') : '-'
  const info = canvasRef.value?.context?.renderer?.instance?.info
  drawcalls.value = info ? `${info.render.calls}` : '-'
}, 250)

onUnmounted(() => clearInterval(readout))

const robots = computed(() => {
  const out: Array<{ id: number, position: [number, number, number] }> = []
  const half = Math.floor(rows.value / 2)
  for (let x = -half; x <= half; x++) {
    for (let z = -half; z <= half; z++) {
      out.push({ id: x * 100 + z, position: [x * 2, 0, z * 2] })
    }
  }
  return out
})
</script>

<template>
  <TresLeches :uuid="uuid" />
  <TresCanvas
    ref="canvasRef"
    v-bind="gl"
  >
    <TresPerspectiveCamera :position="[12, 9, 12]" />
    <OrbitControls />
    <Stats />

    <Merged
      ref="mergedRef"
      :meshes="meshes"
    >
      <Robot
        v-for="robot in robots"
        :key="robot.id"
        :position="robot.position"
      />
    </Merged>

    <TresGridHelper :args="[20, 20]" />
    <TresAmbientLight :intensity="1.2" />
    <TresDirectionalLight :position="[6, 10, 4]" :intensity="2" />
  </TresCanvas>
</template>
