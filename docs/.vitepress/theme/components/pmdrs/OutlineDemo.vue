<script lang="ts" setup>
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { EffectComposerPmndrs, OutlinePmndrs } from '@tresjs/post-processing'
import type { Intersection, Object3D } from 'three'
import { NoToneMapping } from 'three'
import { ref } from 'vue'

import { useRouteDisposal } from '../../composables/useRouteDisposal'

const gl = {
  clearColor: '#121212',
  toneMapping: NoToneMapping,
}

const glComposer = {
  multisampling: 4,
}

const { effectComposer } = useRouteDisposal()

const outlinedObjects = ref<Object3D[]>([])

const toggleMeshSelectionState = ({ object }: Intersection) => {
  if (outlinedObjects.value.some(({ uuid }) => uuid === object.uuid)) { outlinedObjects.value = outlinedObjects.value.filter(({ uuid }) => uuid !== object.uuid) }
  else { outlinedObjects.value = [...outlinedObjects.value, object] }
}
</script>

<template>
  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[3, 2, 4]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls />
    <TresMesh
      :position="[1, 0.5, 1]"
      @click="toggleMeshSelectionState"
    >
      <TresBoxGeometry />
      <TresMeshStandardMaterial
        color="hotpink"
      />
    </TresMesh>
    <TresMesh
      :position="[-1.5, 0.75, 0]"
      @click="toggleMeshSelectionState"
    >
      <TresConeGeometry :args="[1, 1.5, 4, 1, false, Math.PI * 0.25]" />
      <TresMeshStandardMaterial
        color="aqua"
      />
    </TresMesh>
    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight
      :position="[0, 1, 0]"
      :intensity="1"
    />
    <Suspense>
      <EffectComposerPmndrs ref="effectComposer" v-bind="glComposer">
        <OutlinePmndrs
          :outlined-objects="outlinedObjects"
          :edge-strength="200000"
          :pulse-speed="2"
          visible-edge-color="#ffff00"
          :kernel-size="3"
        />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
