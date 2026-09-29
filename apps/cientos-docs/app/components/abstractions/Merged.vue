<script setup lang="ts">
import { Merged, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { useControls } from '@tresjs/leches'
import { BoxGeometry, Mesh, MeshStandardMaterial, SphereGeometry } from 'three'
import { computed, onUnmounted } from 'vue'
import MergedRobot from './MergedRobot.vue'

const uuid = inject(`uuid`)

// stand-in for the `{ name: mesh }` map `useGLTF`'s nodes would give you
const meshes = {
  Body: new Mesh(new BoxGeometry(0.8, 1, 0.6), new MeshStandardMaterial({ color: '#38bdf8', roughness: 0.4 })),
  Eye: new Mesh(new SphereGeometry(0.09, 16, 16), new MeshStandardMaterial({ color: '#facc15' })),
}

onUnmounted(() => {
  for (const mesh of Object.values(meshes)) {
    mesh.geometry.dispose()
    ;(mesh.material as MeshStandardMaterial).dispose()
  }
})

const { rows } = useControls({
  rows: { value: 7, min: 1, max: 13, step: 2 },
}, { uuid })

const robots = computed(() => {
  const out: { id: number, position: [number, number, number] }[] = []
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
  <TresCanvas :clear-color="0x82DBC5">
    <TresPerspectiveCamera :position="[12, 9, 12]" :look-at="[0, 1, 0]" />
    <OrbitControls />
    <Merged :meshes="meshes">
      <MergedRobot
        v-for="robot in robots"
        :key="robot.id"
        :position="robot.position"
      />
    </Merged>
    <TresAmbientLight :intensity="1.2" />
    <TresDirectionalLight :intensity="2" :position="[6, 10, 4]" />
  </TresCanvas>
</template>
