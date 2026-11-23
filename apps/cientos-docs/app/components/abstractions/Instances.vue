<script setup lang="ts">
import { Instance, Instances, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { useControls } from '@tresjs/leches'
import { BoxGeometry, MeshStandardMaterial } from 'three'
import { computed, onUnmounted, ref } from 'vue'

const uuid = inject(`uuid`)

const geometry = new BoxGeometry(0.35, 0.35, 0.35)
const material = new MeshStandardMaterial({ roughness: 0.4 })

onUnmounted(() => {
  geometry.dispose()
  material.dispose()
})

const { grid } = useControls({
  grid: { value: 16, min: 2, max: 32, step: 2 },
}, { uuid })

const cubes = computed(() => {
  const out: { id: number, position: [number, number, number] }[] = []
  const size = grid.value
  for (let x = 0; x < size; x++) {
    for (let z = 0; z < size; z++) {
      out.push({ id: x * size + z, position: [x - size / 2, 0, z - size / 2] })
    }
  }
  return out
})

const picked = ref<Set<number>>(new Set())

function pick(id: number) {
  const next = new Set(picked.value)
  next.has(id) ? next.delete(id) : next.add(id)
  picked.value = next
}
</script>

<template>
  <TresCanvas :clear-color="0x82DBC5">
    <TresPerspectiveCamera :position="[14, 10, 14]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <Instances :geometry="geometry" :material="material" :limit="1024">
      <Instance
        v-for="cube in cubes"
        :key="cube.id"
        :position="cube.position"
        :color="picked.has(cube.id) ? '#f97316' : '#38bdf8'"
        @click="pick(cube.id)"
      />
    </Instances>
    <TresAmbientLight :intensity="1.2" />
    <TresDirectionalLight :intensity="2" :position="[6, 10, 4]" />
  </TresCanvas>
</template>
