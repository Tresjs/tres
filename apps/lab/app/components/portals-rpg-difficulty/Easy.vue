<script setup lang="ts">
import { Color } from 'three'

const { nodes, state } = useGLTF('/models/portals-rpg/adventurers-camp.glb', { draco: true })


const trees = computed(() => {
  return Object.entries(nodes.value).map(([key, value]) => key.includes('Tree') ? value : null)
    .filter(Boolean)
})

const logs = computed(() => {
  return Object.entries(nodes.value).map(([key, value]) => key.includes('Log') ? value : null)
    .filter(Boolean)
})

// MAT_StylizedDirt ships a near-white albedo, so the ground reads as pale stone.
// color multiplies the map, so tinting it keeps every bit of the texture detail.
// Written imperatively: :material-color on a primitive assigns the string straight
// over the Color instance, because patchProp's pierced-prop branch returns before
// its color handling.
const DIRT = new Color('#8a6244')

watch(() => nodes.value?.Ground, (ground) => {
  if (ground?.material) { ground.material.color.copy(DIRT) }
}, { immediate: true })

const lutes = computed(() => {
  return Object.entries(nodes.value).map(([key, value]) => key.includes('Lute') ? value : null)
    .filter(Boolean)
})


</script>

<template>
  <TresAmbientLight :intensity="0.2" />
  <!-- Fake moonlight. Trees sit at z -15..-19 and the camp at z -8, so a light from
  high behind the treeline travels toward the camera and rims the backs of the party
  and the tree crowns, leaving the fire to own every front-facing surface. A
  directional light reads position as a direction only, so no shadow map is needed
  for the angle to hold. -->
  <TresDirectionalLight :position="[-8, 22, -24]" :intensity="0.7" :color="'#9db6ff'" />
  <TresGroup v-if="nodes?.Ground" :position="[0, -2, -8]">
    <primitive name="Ground" :object="nodes['Ground']" />
    <TresGroup v-if="trees" name="Trees">
      <primitive v-for="tree in trees" :key="tree.name" :object="tree" />
    </TresGroup>
    <PortalsRpgDifficultyFireplace :nodes="nodes" />
    <TresGroup name="Logs">
      <primitive v-for="log in logs" :key="log.name" :object="log" />
    </TresGroup>
    <PortalsRpgDifficultyEngineer :nodes="nodes" :state="state" />
    <primitive name="Backpack" :object="nodes['Engineer_Backpack']" />
    <primitive name="BeerMug" :object="nodes['Mug_Beer']" />
    <PortalsRpgDifficultyBard :nodes="nodes" :state="state" />
    <primitive v-for="lute in lutes" :key="lute.name" :object="lute" />
    <PortalsRpgDifficultyRogue :nodes="nodes" :state="state" />
    <PortalsRpgDifficultyDruid :nodes="nodes" :state="state" />
    <PortalsRpgDifficultyWitch :nodes="nodes" :state="state" />
    <PortalsRpgDifficultyDog :nodes="nodes" :state="state" />
  </TresGroup>
</template>