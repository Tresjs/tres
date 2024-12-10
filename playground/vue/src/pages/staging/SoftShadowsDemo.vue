<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, SoftShadows } from '@tresjs/cientos'
import { Group, MeshPhongMaterial, SphereGeometry, Vector3 } from 'three'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'

const c = useControls({
  samples: { value: 5, min: 1, max: 10, step: 1 },
})
const sphereGeo = new SphereGeometry(0.3, 20, 20)
const sphereMat = new MeshPhongMaterial({ color: '#82dbc5' })
const spherePositions = Array.from({ length: 10 }).fill(null).map(() => new Vector3())
let ii = 0
for (const p of spherePositions) {
  p.x = ii * 0.5 - 2.5
  ii++
}

const spheres = shallowRef(new Group())
let intervalId: ReturnType<typeof setInterval>
onMounted(() => {
  intervalId = setInterval(() => {
    for (const sphere of spheres.value.children) {
      sphere.userData.phase += 0.01
      sphere.position.y = Math.sin(sphere.userData.phase) ** 2 * 3 + 0.5
    }
  }, 1000 / 30)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<template>
  <TresLeches />
  <TresCanvas :shadows="true" :shadowMap-enabled="true">
    <TresFog :args="['#FFFFFF', 5, 100]" />

    <OrbitControls />
    <TresPerspectiveCamera :position="[5, 9, -5]" :fov="60" />

    <TresAmbientLight color="#AAAAAA" :intensity="2" />
    <TresDirectionalLight
      color="#F0F6FF"
      :intensity="6"
      :position="[2, 8, 4]"
      :cast-shadow="true"
      :shadow-mapSize-width="1024"
      :shadow-mapSize-height="1024"
      :shadow-camera-far="20"
    />

    <SoftShadows :samples="c.samples.value" />

    <TresMesh :position="[0, 1.5, 1]" :scale-y="3" :cast-shadow="true" :receive-shadow="true" name="column">
      <TresBoxGeometry />
      <TresMeshPhongMaterial color="#82dbc5" />
    </TresMesh>

    <TresMesh :rotation-x="-Math.PI / 2" :receive-shadow="true" name="ground">
      <TresPlaneGeometry :args="[100, 100, 8, 8]" />
      <TresMeshPhongMaterial color="#fbb03b" />
    </TresMesh>

    <TresGroup ref="spheres" name="spheres">
      <TresMesh
        v-for="p, i of spherePositions"
        :key="i"
        :material="sphereMat"
        :geometry="sphereGeo"
        :position="p"
        :cast-shadow="true"
        :receive-shadow="true"
        :userData-phase="i * 0.3"
      />
    </TresGroup>
  </TresCanvas>
</template>
