<script setup lang="ts">
import { DoubleSide, MeshBasicMaterial, Texture } from 'three'

const props = defineProps<{
  texture: Texture
}>()

const { nodes, materials } = await useGLTF('/models/potions-classroom/wizard-potions-classroom.glb', {
  draco: true,
})

props.texture.flipY = false

const bakedMaterial = new MeshBasicMaterial({
  map: props.texture,
  side: DoubleSide,
})

nodes.Cauldron.material = bakedMaterial
nodes.Heater.material = bakedMaterial
nodes.Cauldron_Stand.material = bakedMaterial
nodes.Spon.material = bakedMaterial

const potionMaterial = materials.liquid
potionMaterial.emissiveIntensity = 20
nodes.Potion.material = materials.liquid

const { pane } = useTweakPane()

/* const light = reactive({
  position: nodes.Potion.clone().position,
  color: '#ff0000',
  distance: 10,
  intensity: 8,
  decay: 2,
})

pane.addInput(light, 'position', {
  label: 'Light Position',
  x: { label: 'X' },
  y: { label: 'Y' },
  z: { label: 'Z' },
})

pane.addInput(light, 'color', {
  label: 'Light Color',
})

pane.addInput(light, 'distance', {
  label: 'Light Distance',
})

pane.addInput(light, 'intensity', {
  label: 'Light Intensity',
})

pane.addInput(light, 'decay', {
  label: 'Light Decay',
}) 

const lightRef = shallowRef()*/

const { onLoop } = useRenderLoop()

onLoop(({ delta }) => {
  nodes.Spon.rotation.y += delta * 0.1
  nodes.Spon.position.y += Math.sin(delta) * 0.002
})
</script>
<template>
  <primitive :object="nodes.Potion" />
  <primitive :object="nodes.Heater" />
  <primitive :object="nodes.Cauldron" />
  <primitive :object="nodes.Cauldron_Stand" />
  <primitive :object="nodes.Spon" />
  <!--  <TresPointLight
    ref="lightRef"
    :position-y="light.position.y"
    :color="light.color"
    :distance="light.distance"
    :intensity="light.intensity"
    :decay="light.decay"
  />
  <TresPointLightHelper v-if="lightRef" :args="[lightRef, 1]" :color="light.color" /> -->
</template>
