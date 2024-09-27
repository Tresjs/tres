<!-- eslint-disable no-console -->
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Color } from 'three'

const domNumOver = ref(0)
const domNumOut = ref(0)
const domNumEnter = ref(0)
const domNumLeave = ref(0)

const tresBlockingNumOver = ref(0)
const tresBlockingNumOut = ref(0)
const tresBlockingNumEnter = ref(0)
const tresBlockingNumLeave = ref(0)

const tresNumOver = ref(0)
const tresNumOut = ref(0)
const tresNumEnter = ref(0)
const tresNumLeave = ref(0)
</script>

<template>
  <div class="container">
    <h1><code>pointer{enter,leave,over,out}</code></h1>
    <h2>DOM vs. Tres pointer comparison</h2>
    <p>Below, both setups have identical pointer events attached only to the gray elements.</p>
    <p>Pointer events are counted when handled and are expected to yield the same counts for the same actions on both sides.</p>

    <div class="test-subject test-vue">
      <h2>DOM/Vue</h2>
      pointerover: {{ domNumOver }}<br />
      pointerout: {{ domNumOut }}<br />
      pointerenter: {{ domNumEnter }}<br />
      pointerleave: {{ domNumLeave }}<br />
      <div
        :style="{ backgroundColor: 'gray' }"
        @pointerover="domNumOver++"
        @pointerout="domNumOut++"
        @pointerenter="domNumEnter++"
        @pointerleave="domNumLeave++"
      >
        <div :style="{ backgroundColor: 'blue' } ">
          <div :style="{ backgroundColor: 'purple', color: 'white' }">Mouse over me.</div>
        </div>
      </div>
    </div>

    <div class="test-subject">
      <h2>Tres (with <code>:blocking</code>)</h2>
      <p>Event counts here should mirror Vue event counts</p>
      pointerover: {{ tresBlockingNumOver }}<br />
      pointerout: {{ tresBlockingNumOut }}<br />
      pointerenter: {{ tresBlockingNumEnter }}<br />
      pointerleave: {{ tresBlockingNumLeave }}<br />
      <div>
        <TresCanvas>
          <TresPerspectiveCamera :position="[0, 0, 7]" />
          <TresMesh
            :blocking="true"
            @pointerenter="tresBlockingNumEnter++"
            @pointerleave="tresBlockingNumLeave++"
            @pointerover="tresBlockingNumOver++"
            @pointerout="tresBlockingNumOut++"
            @pointerdown="(e) => e.currentTarget.material.color = new Color('black')"
          >
            <TresBoxGeometry :args="[7, 3, 4.5]" />
            <TresMeshToonMaterial color="gray" />
            <TresMesh>
              <TresBoxGeometry :args="[5, 2, 5]" />
              <TresMeshBasicMaterial color="blue" />
              <TresMesh :position-z="2.1">
                <TresBoxGeometry :args="[3, 1, 1]" />
                <TresMeshBasicMaterial color="purple" />
              </TresMesh>
            </TresMesh>
          </TresMesh>
          <TresDirectionalLight :intensity="1" />
          <TresAmbientLight :intensity="1" />
        </TresCanvas>
      </div>
    </div>

    <div class="test-subject">
      <h2>Tres (without <code>:blocking</code>)</h2>
      <p><code>pointer{over,out}</code> event counts will not be the same as Vue.</p>
      pointerover: {{ tresNumOver }}<br />
      pointerout: {{ tresNumOut }}<br />
      pointerenter: {{ tresNumEnter }}<br />
      pointerleave: {{ tresNumLeave }}<br />
      <div :style="{ width: 'auto', height: '200px' }">
        <TresCanvas>
          <TresPerspectiveCamera :position="[0, 0, 7]" />
          <TresMesh
            @pointerenter="tresNumEnter++"
            @pointerleave="tresNumLeave++"
            @pointerover="tresNumOver++"
            @pointerout="tresNumOut++"
            @pointerdown="(e) => e.currentTarget.material.color = new Color('black')"
          >
            <TresBoxGeometry :args="[7, 3, 4.5]" />
            <TresMeshToonMaterial color="gray" />
            <TresMesh>
              <TresBoxGeometry :args="[5, 2, 5]" />
              <TresMeshBasicMaterial color="blue" />
              <TresMesh :position-z="2.1">
                <TresBoxGeometry :args="[3, 1, 1]" />
                <TresMeshBasicMaterial color="purple" />
              </TresMesh>
            </TresMesh>
          </TresMesh>
          <TresDirectionalLight :intensity="1" />
          <TresAmbientLight :intensity="1" />
        </TresCanvas>
      </div>
    </div>
  </div>
</template>

<style>
body {
  font-family: sans-serif;
}

p {
  max-width: 300px;
}

.test-subject {
  position: relative;
  padding: 15px;
  margin: 15px;
  background-color: white;
  border: 1px solid #ccc;
  max-width: 600px;
}

.test-subject > div {
  position: relative;
  padding: 15px;
  margin: 15px;
  max-width: 600px;
  min-height: 200px;
}

.test-vue div {
  min-height: 20px;
  padding: 15px;
  margin: 15px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-auto-flow: column;
}

.container {
  padding: 20px;
}
</style>
