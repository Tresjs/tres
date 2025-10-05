<script setup lang="ts">
import { inject, shallowRef } from 'vue'
import type { GameStore } from '../TheExperience.vue'
import { BoxGeometry, Color, Group, MeshBasicMaterial, PointLight, Vector3 } from 'three';

const geometry = new BoxGeometry(1, 1, 40)
const lightgreen = new Color('lightgreen')
const hotpink = new Color('hotpink')
const laserMaterial = new MeshBasicMaterial({ color: lightgreen })
const crossMaterial = new MeshBasicMaterial({ color: hotpink, fog: false })
const position = new Vector3()
const direction = new Vector3()

const { nodes } = useGLTF('/models/space-game/ship.gltf')
const gameStore = inject('gameStore') as GameStore
const mutation = gameStore.mutation
const { clock, mouse, ray } = mutation

const main = shallowRef(new Group())
const laserGroup = shallowRef(new Group())
const laserLight = shallowRef(new PointLight())
const exhaust = shallowRef(new Group())
const cross = shallowRef(new Group())
const target = shallowRef(new Group())

useLoop().onBeforeRender(() => {
  main.value.position.z = Math.sin(clock.getElapsedTime() * 40) * Math.PI * 0.2
  main.value.rotation.z += (mouse.x / 500 - main.value.rotation.z) * 0.2
  main.value.rotation.x += (-mouse.y / 1200 - main.value.rotation.x) * 0.2
  main.value.rotation.y += (-mouse.x / 1200 - main.value.rotation.y) * 0.2
  main.value.position.x += (mouse.x / 10 - main.value.position.x) * 0.2
  main.value.position.y += (25 + -mouse.y / 10 - main.value.position.y) * 0.2
  exhaust.value.scale.x = 1 + Math.sin(clock.getElapsedTime() * 200)
  exhaust.value.scale.y = 1 + Math.sin(clock.getElapsedTime() * 200)
  if (Array.isArray(laserGroup.value)) {
    for (const g of laserGroup.value) {
      g.position.z -= 20
    }
  }
  laserLight.value.intensity += ((gameStore.lasers.length && Date.now() - gameStore.lasers[gameStore.lasers.length - 1] < 100 ? 200000 : 0) - laserLight.value.intensity) * 0.3

  // Get ships orientation and save it to the stores ray
  main.value.getWorldPosition(position)
  main.value.getWorldDirection(direction)
  ray.origin.copy(position)
  ray.direction.copy(direction.negate())

  // ...
  crossMaterial.color = mutation.hits ? lightgreen : hotpink
  cross.value.visible = !mutation.hits
  target.value.visible = !!mutation.hits
})
</script>

<template>
  <TresGroup ref="main">
    <TresPointLight color="cornflowerblue" :intensity="500" :distance="500" :position-z="10" />
    <TresGroup :scale="[3.5, 3.5, 3.5]">
      <TresGroup ref="cross" :position="[0, 0, -300]" name="cross">
        <TresMesh :render-order="1000" :material="crossMaterial">
          <TresBoxGeometry :args="[20, 2, 2]" />
        </TresMesh>
        <TresMesh :render-order="1000" :material="crossMaterial">
          <TresBoxGeometry :args="[2, 20, 2]" />
        </TresMesh>
      </TresGroup>
      <TresGroup ref="target" :position="[0, 0, -300]" name="target">
        <TresMesh :position="[0, 20, 0]" :render-order="1000" :material="crossMaterial">
          <TresBoxGeometry :args="[40, 2, 2]" />
        </TresMesh>
        <TresMesh :position="[0, -20, 0]" :render-order="1000" :material="crossMaterial">
          <TresBoxGeometry :args="[40, 2, 2]" />
        </TresMesh>
        <TresMesh :position="[20, 0, 0]" :render-order="1000" :material="crossMaterial">
          <TresBoxGeometry :args="[2, 40, 2]" />
        </TresMesh>
        <TresMesh :position="[-20, 0, 0]" :render-order="1000" :material="crossMaterial">
          <TresBoxGeometry :args="[2, 40, 2]" />
        </TresMesh>
      </TresGroup>
      <TresPointLight ref="laserLight" :position="[0, 0, -20]" :distance="100" :intensity="0" color="lightgreen" />
      <TresGroup v-for="laser, i of gameStore.lasers" ref="laserGroup" :key="i">
        <TresMesh :position="[-2.8, 0, -0.8]" :geometry="geometry" :material="laserMaterial" />
        <TresMesh :position="[2.8, 0, -0.8]" :geometry="geometry" :material="laserMaterial" />
      </TresGroup>
      <TresGroup v-if="nodes['Renault_(S,_T1)_0']" :rotation="[Math.PI / 2, Math.PI, 0]">
        <TresMesh name="Renault_(S,_T1)_0" :geometry="nodes['Renault_(S,_T1)_0'].geometry">
          <TresMeshStandardMaterial color="#070707" />
        </TresMesh>
        <TresMesh name="Renault_(S,_T1)_1" :geometry="nodes['Renault_(S,_T1)_1'].geometry">
          <TresMeshStandardMaterial color="black" />
        </TresMesh>
        <TresMesh name="Renault_(S,_T1)_2" :geometry="nodes['Renault_(S,_T1)_2'].geometry">
          <TresMeshStandardMaterial color="#070707" />
        </TresMesh>
        <TresMesh name="Renault_(S,_T1)_3" :geometry="nodes['Renault_(S,_T1)_3'].geometry">
          <TresMeshBasicMaterial color="lightblue" />
        </TresMesh>
        <TresMesh name="Renault_(S,_T1)_4" :geometry="nodes['Renault_(S,_T1)_4'].geometry">
          <TresMeshBasicMaterial color="white" />
        </TresMesh>
        <TresMesh name="Renault_(S,_T1)_5" :geometry="nodes['Renault_(S,_T1)_5'].geometry">
          <TresMeshBasicMaterial color="teal" />
        </TresMesh>
      </TresGroup>
    </TresGroup>
    <TresMesh ref="exhaust" :scale="[1, 1, 30]" :position="[0, 1, 30]">
      <TresDodecahedronGeometry :args="[1.5, 0]" />
      <TresMeshBasicMaterial color="lightblue" />
    </TresMesh>
  </TresGroup>
</template>