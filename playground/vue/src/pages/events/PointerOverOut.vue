<!-- eslint-disable no-console -->
<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { shallowRef } from 'vue'

const tresNumOver = ref(0)
const tresNumOut = ref(0)
const tresNumEnter = ref(0)
const tresNumLeave = ref(0)

const domNumOver = ref(0)
const domNumOut = ref(0)
const domNumEnter = ref(0)
const domNumLeave = ref(0)

const config = ref({ priorIntersections: [] })

const ready = (context) => {
  config.value = context.eventManager.config
}
</script>

<template>
  <div>
    {{ config.priorIntersections.map(intr => intr.object.uuid )}} aa
    <div class="grid-container">
      <div class="col">
        <h2>DOM</h2>
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

      <div class="col">
        <h2>Tres</h2>
        pointerover: {{ tresNumOver }}<br />
        pointerout: {{ tresNumOut }}<br />
        pointerenter: {{ tresNumEnter }}<br />
        pointerleave: {{ tresNumLeave }}<br />
        <div :style="{ width: 'auto', height: '200px' }">
          <TresCanvas @ready="ready">
            <OrbitControls />
            <TresPerspectiveCamera :position="[0, 0, 5]" />
            <TresMesh
              :blocking="true"
              @pointerenter="tresNumEnter++"
              @pointerleave="tresNumLeave++"
              @pointerover="tresNumOver++"
              @pointerout="tresNumOut++"
            >
              <TresBoxGeometry :args="[7, 3, 4.5]" />
              <TresMeshToonMaterial color="gray" />
              <TresMesh>
                <TresBoxGeometry :args="[5, 2, 5]" />
                <TresMeshToonMaterial color="blue" />
                <TresMesh :position-z="2.1">
                  <TresBoxGeometry />
                  <TresMeshToonMaterial color="purple" />
                </TresMesh>
              </TresMesh>
            </TresMesh>
            <TresDirectionalLight :intensity="1" />
            <TresAmbientLight :intensity="1" />
          </TresCanvas>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
div {
  padding: 20px;
  margin: 20px;
  background-color: white;
  border: 1px solid #ccc;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-auto-flow: column;
}
</style>
