<script lang="ts" setup>
import { ref } from 'vue'
import { watchOnce } from '@vueuse/core'
import { shallowRef } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { KernelSize } from 'postprocessing'
import { EffectComposer, Outline } from '/@'
import { Color, Intersection, Object3D } from 'three'

const boxWidth = 2
const outlinedObjects = ref<Object3D[]>([])

const toggleMeshSelectionState = ({ object }: Intersection) => {
  if (outlinedObjects.value.some(({ uuid }) => uuid === object.uuid))
    outlinedObjects.value = outlinedObjects.value.filter(({ uuid }) => uuid !== object.uuid)
  else outlinedObjects.value = [...outlinedObjects.value, object]
}

const meshes = shallowRef<Object3D[] | null>(null)

watchOnce(meshes, () => {
  if (meshes.value?.[0]) outlinedObjects.value.push(meshes.value[0])
  if (meshes.value?.[2]) outlinedObjects.value.push(meshes.value[2])
})
</script>

<template>
  <TresCanvas clear-color="#121212" :alpha="false" shadows disable-render>
    <TresPerspectiveCamera :position="[3, 3, 4]" :look-at="[0, 0, 0]" />
    <TresMesh
      ref="meshes"
      v-for="i in 3"
      :key="i.toString()"
      :position="[(i - 2) * boxWidth, 0.5, 1]"
      @click="toggleMeshSelectionState"
    >
      <TresBoxGeometry />
      <TresMeshStandardMaterial color="hotpink" :emissive="new Color('hotpink')" :emissive-intensity="1" />
    </TresMesh>
    <TresGridHelper />
    <TresAmbientLight :intensity="2" />
    <TresDirectionalLight :position="[-4, 4, 3]" :intensity="2" />

    <Suspense>
      <EffectComposer>
        <Outline
          blur
          :edge-glow="3"
          :kernel-size="KernelSize.LARGE"
          :edge-strength="20"
          :outlined-objects="outlinedObjects"
          visible-edge-color="#82DBC5"
        />
      </EffectComposer>
    </Suspense>
  </TresCanvas>
</template>
