<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Box3, BoxGeometry, Mesh, MeshBasicMaterial, Vector3 } from 'three'
import { useState } from '../../../composables/state'
import TheExperience from './FitDemo.vue'

// NOTE: Make choices for `:into` options
// radio buttons.
const object = new Mesh(new BoxGeometry(), new MeshBasicMaterial({ wireframe: true }))

const choices = [
  { label: 'Turn off' },
  { label: 'null', value: null },
  { label: 'Default – fit into 1 x 1 x 1 box at world origin' },
  { label: 'undefined', value: undefined },
  { label: 'Scale' },
  { label: 'Number', value: 1 },
  { label: 'Number', value: 2 },
  { label: 'Number', value: 3 },
  { label: 'Array', value: [1, 1, 1] as [number, number, number] },
  { label: 'Array', value: [1, 2, 3] as [number, number, number] },
  { label: 'Array', value: [3, 2, 1] as [number, number, number] },
  { label: 'Array', value: [5, 6, 7] as [number, number, number] },
  { label: 'Array', value: [7, 7, 7] as [number, number, number] },
  { label: 'Vector3', value: new Vector3(1, 1, 1) },
  { label: 'Vector3', value: new Vector3(1, 2, 3) },
  { label: 'Vector3', value: new Vector3(3, 2, 1) },
  { label: 'Scale and position' },
  { label: 'Box3(0,0,0, 1,1,1)', value: new Box3(new Vector3(0, 0, 0), new Vector3(1, 1, 1)) },
  { label: 'Box3(-1,-1,-1, 1,1,1)', value: new Box3(new Vector3(-1, -1, -1), new Vector3(1, 1, 1)) },
  { label: 'Box3(-5,0,-5, 5,10,5)', value: new Box3(new Vector3(-5, 0, -5), new Vector3(5, 10, 5)) },
  { label: 'Object', value: object },
]
const choice = shallowRef(choices[1])

const { renderingTimes } = useState()

function onRender() {
  renderingTimes.value = 1
}
</script>

<template>
  <div class="overlay">
    <h2><code>:into</code> value</h2>
    <template
      v-for="c, i of choices"
      :key="i"
    >
      <div>
        <div v-if="'value' in c">
          <input
            :id="`id-${i}`"
            :checked="c === choice"
            type="radio"
            value="c.label"
            name="choice"
            @change="() => { choice = c; }"
          />
          <label :for="`id-${i}`">{{ `${c.label} - ${JSON.stringify(c.value)?.substring(0, 25)}` }}</label>
        </div>
        <h2 v-else>
          {{ c.label }}
        </h2>
      </div>
    </template>
    <p>N.B.: <code>fit.update()</code> is called continuously in the update loop.</p>
  </div>
  <GraphPane />
  <TresCanvas render-mode="on-demand" @render="onRender">
    <TheExperience :object="object" :choice="choice" />
  </TresCanvas>
</template>

<style scoped>
.overlay {
  z-index: 2;
  position: fixed;
  width: 240px;
  padding: 10px;
  margin: 5px;
  font-family: sans-serif;
  font-size: 10px;
  background-color: white;
  border-radius: 5px;
}
</style>
