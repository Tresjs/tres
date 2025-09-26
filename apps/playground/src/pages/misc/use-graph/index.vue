<script setup lang="ts">
/* eslint-disable no-console */
import { TresCanvas, useGraph } from '@tresjs/core'

import { OrbitControls } from '@tresjs/cientos'
import { BoxGeometry, Group, Mesh, MeshStandardMaterial } from 'three'

const gl = {
  clearColor: '#82DBC5',
}

const group = new Group()

group.add(new Mesh(new BoxGeometry(1, 1, 1), new MeshStandardMaterial({ name: 'FancyMaterial', color: 'red' })))

const graph = useGraph(group)

const { nodes, materials } = graph.value
console.log('nodes', nodes)
console.log('materials', materials)

materials.FancyMaterial.color.set('blue')
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
    <primitive :object="group" />
  </TresCanvas>
</template>
