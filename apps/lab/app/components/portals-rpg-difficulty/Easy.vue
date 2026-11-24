<script setup lang="ts">
import { Stars, useGLTF } from '@tresjs/cientos/webgpu'
import type { MeshStandardMaterial } from 'three/webgpu'
import { Color, MeshStandardNodeMaterial } from 'three/webgpu'
import { float, length, materialOpacity, smoothstep, uv } from 'three/tsl'

const { nodes, state } = useGLTF('/models/portals-rpg/adventurers-camp.glb', { draco: true })

const { scene: portalScene } = useTresContext()
portalScene.value.background = new Color('#0d1330')

const trees = computed(() => {
  return Object.entries(nodes.value).map(([key, value]) => key.includes('Tree') ? value : null).filter(Boolean)
})

const logs = computed(() => {
  return Object.entries(nodes.value).map(([key, value]) => key.includes('Log') ? value : null).filter(Boolean)
})

const DIRT = new Color('#8a6244')

// Copies every field the way WebGPURenderer converts a classic material, so the GLB look is kept.
function withGroundFade(source: MeshStandardMaterial) {
  const material = new MeshStandardNodeMaterial()
  for (const key in source) {
    (material as any)[key] = (source as any)[key]
  }
  material.color = DIRT.clone()
  material.transparent = true
  material.opacityNode = materialOpacity.mul(float(1).sub(smoothstep(0.2, 0.5, length(uv().sub(0.5)))))
  return material
}

// useGLTF caches the scene, so a remount finds the node material already in place.
watch(() => nodes.value?.Ground, (ground) => {
  if (!ground?.material || ground.material.isNodeMaterial) { return }
  ground.material = withGroundFade(ground.material)
}, { immediate: true })

const lutes = computed(() => {
  return Object.entries(nodes.value).map(([key, value]) => key.includes('Lute') ? value : null).filter(Boolean)
})
</script>

<template>
  <TresAmbientLight :intensity="0.2" />
  <Stars :size="0.6" :radius="120" :depth="40" :count="3000" />
  <TresDirectionalLight name="Moonlight" :position="[-8, 22, -24]" :intensity="0.7" color="#9db6ff" />
  <TresGroup v-if="nodes?.Ground" :position="[0, -2, -8]">
    <primitive name="Ground" :object="nodes.Ground" />
    <TresGroup v-if="trees" name="Trees">
      <primitive v-for="tree in trees" :key="tree.name" :object="tree" />
    </TresGroup>
    <PortalsRpgDifficultyFireplace :nodes="nodes" />
    <TresGroup name="Logs">
      <primitive v-for="log in logs" :key="log.name" :object="log" />
    </TresGroup>
    <PortalsRpgDifficultyEngineer :nodes="nodes" :state="state" />
    <primitive name="Backpack" :object="nodes.Engineer_Backpack" />
    <primitive name="BeerMug" :object="nodes.Mug_Beer" />
    <PortalsRpgDifficultyBard :nodes="nodes" :state="state" />
    <primitive v-for="lute in lutes" :key="lute.name" :object="lute" />
    <PortalsRpgDifficultyRogue :nodes="nodes" :state="state" />
    <PortalsRpgDifficultyDruid :nodes="nodes" :state="state" />
    <PortalsRpgDifficultyWitch :nodes="nodes" :state="state" />
    <PortalsRpgDifficultyDog :nodes="nodes" :state="state" />
  </TresGroup>
</template>
