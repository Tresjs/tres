<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Mesh, MeshBasicMaterial, SphereGeometry } from 'three'

const geo = new SphereGeometry()
const mat = new MeshBasicMaterial()
const obj = new Mesh(geo, mat)

const meshNumOnBeforeRenders = shallowRef(0)
const meshNumOnAfterRenders = shallowRef(0)
const primitiveNumOnBeforeRenders = shallowRef(0)
const primitiveNumOnAfterRenders = shallowRef(0)
const materialNumOnBeforeCompiles = shallowRef(0)

const meshOnBeforeRender = () => { meshNumOnBeforeRenders.value++ }
const meshOnAfterRender = () => { meshNumOnAfterRenders.value++ }
const primitiveOnBeforeRender = () => { primitiveNumOnBeforeRenders.value++ }
const primitiveOnAfterRender = () => { primitiveNumOnAfterRenders.value++ }
const materialOnBeforeCompile = () => { materialNumOnBeforeCompiles.value++ }
</script>

<template>
  <div class="overlay">
    <h2>Primitive</h2>
    <ul>
      <li># onBeforeRender calls: {{ primitiveNumOnBeforeRenders }}</li>
      <li># onAfterRender calls: {{ primitiveNumOnAfterRenders }}</li>
    </ul>
    <h2>Mesh</h2>
    <ul>
      <li># onBeforeRender calls: {{ meshNumOnBeforeRenders }}</li>
      <li># onAfterRender calls: {{ meshNumOnAfterRenders }}</li>
    </ul>
    <h2>Material</h2>
    <ul>
      <li># onBeforeCompile calls: {{ materialNumOnBeforeCompiles }}</li>
    </ul>
  </div>
  <TresCanvas>
    <TresMesh
      :position="[1, 0, 0]"
      :scale="0.5"
      :on-before-render="meshOnBeforeRender"
      :on-after-render="meshOnAfterRender"
    >
      <TresBoxGeometry />
      <TresMeshStandardMaterial
        :on-before-compile="materialOnBeforeCompile"
      />
    </TresMesh>
    <primitive
      :object="obj"
      :position="[-1, 0, 0]"
      :scale="0.5"
      :on-before-render="primitiveOnBeforeRender"
      :on-after-render="primitiveOnAfterRender"
    />
    <TresGridHelper :args="[10, 10, 0x444444, 'teal']" />
  </TresCanvas>
</template>

<style scoped>
.overlay {
  position: fixed;
  z-index: 1;
  font-family: sans-serif;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
}
</style>
