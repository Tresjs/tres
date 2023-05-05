<script setup lang="ts">
import { useGLTF  } from '@tresjs/cientos';

import { DoubleSide, MeshBasicMaterial, Texture } from 'three';

const props = defineProps<{
    texture: Texture
}>()

const { nodes, materials } = await useGLTF(
  '/models/potions-classroom/wizard-potions-classroom.glb',
  {
    draco: true,
  },
)

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
</script>
<template>
<primitive :object="nodes.Potion" />
<primitive :object="nodes.Heater" />
<primitive :object="nodes.Cauldron" />
<primitive :object="nodes.Cauldron_Stand" />
<primitive :object="nodes.Spon" />
</template>