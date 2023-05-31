<script lang="ts" setup>
import { ref } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { EffectComposer, Outline } from '/@'
import { Color, Intersection, Object3D } from 'three'

const boxWidth = 2
const outlinedObjects = ref<Object3D[]>([])

const toggleMeshSelectionState = ({ object }: Intersection) => {
  if (outlinedObjects.value.some(({ uuid }) => uuid === object.uuid))
    outlinedObjects.value = outlinedObjects.value.filter(({ uuid }) => uuid !== object.uuid)
  else outlinedObjects.value = [...outlinedObjects.value, object]
}
</script>

<template>
  <TresCanvas clear-color="#121212" :alpha="false">
    <TresPerspectiveCamera :position="[3, 4, 5]" :look-at="[0, 0, 0]" />

    <TresMesh v-for="i in 3" :key="i" :position="[(i - 2) * boxWidth, 0.5, 1]" @click="toggleMeshSelectionState">
      <TresBoxGeometry />
      <TresMeshStandardMaterial color="hotpink" :emissive="new Color('hotpink')" :emissive-intensity="1.2" />
    </TresMesh>
    <TresGridHelper />
    <TresAmbientLight :intensity="2" />

    <Suspense>
      <EffectComposer>
        <Outline
          :edge-glow="1"
          :edge-strength="10"
          :edge-thickness="1"
          :outlined-objects="outlinedObjects"
          visible-edge-color="#82DBC5"
        />
      </EffectComposer>
    </Suspense>
  </TresCanvas>
</template>
