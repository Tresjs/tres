<script setup lang="ts">
import { useGLTF  } from '@tresjs/cientos';



const { nodes } = await useGLTF(
  '/models/potions-classroom/wizard-potions-classroom.glb',
  {
    draco: true,
  },
)

const bottles = Object.values(nodes).filter(node => node.name.includes('Bottle'))



</script>
<template>
<primitive v-for="bottle of bottles" :object="bottle" />
</template>