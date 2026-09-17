<script setup lang="ts">
import { Color } from 'three'
import type { MeshStandardMaterial } from 'three'

const { nodes, state } = useGLTF('/models/portals-rpg/adventurers-camp.glb', { draco: true })

const { scene: portalScene } = useTresContext()
portalScene.value.background = new Color('#0d1330')


const trees = computed(() => {
  return Object.entries(nodes.value).map(([key, value]) => key.includes('Tree') ? value : null)
    .filter(Boolean)
})

const logs = computed(() => {
  return Object.entries(nodes.value).map(([key, value]) => key.includes('Log') ? value : null)
    .filter(Boolean)
})

const DIRT = new Color('#8a6244')

const patchGroundFade = (material: MeshStandardMaterial) => {
  material.transparent = true
  material.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec2 vGroundUv;')
      .replace('#include <uv_vertex>', '#include <uv_vertex>\nvGroundUv = uv;')
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying vec2 vGroundUv;')
      // Reversed edges in smoothstep are undefined in GLSL, so invert the result instead
      .replace('#include <alphamap_fragment>', `#include <alphamap_fragment>
        diffuseColor.a *= 1.0 - smoothstep(0.2, 0.5, length(vGroundUv - 0.5));`)
  }
  material.needsUpdate = true
}

watch(() => nodes.value?.Ground, (ground) => {
  if (!ground?.material) { return }
  ground.material.color.copy(DIRT)
  patchGroundFade(ground.material)
}, { immediate: true })

const lutes = computed(() => {
  return Object.entries(nodes.value).map(([key, value]) => key.includes('Lute') ? value : null)
    .filter(Boolean)
})


</script>

<template>
  <TresAmbientLight :intensity="0.2" />
  <Stars :size="0.6" :radius="120" :depth="40" :count="3000" />
  <TresDirectionalLight name="Moonlight" :position="[-8, 22, -24]" :intensity="0.7" :color="'#9db6ff'" />
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