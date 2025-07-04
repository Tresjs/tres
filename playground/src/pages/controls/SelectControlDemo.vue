<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Environment, OrbitControls } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import { ACESFilmicToneMapping, CineonToneMapping, LinearToneMapping, NoToneMapping, ReinhardToneMapping } from 'three'

const { toneMapping } = useControls({
  toneMapping: {
    value: ACESFilmicToneMapping,
    options: [
      { text: 'No Tone Mapping', value: NoToneMapping },
      { text: 'Linear', value: LinearToneMapping },
      { text: 'Reinhard', value: ReinhardToneMapping },
      { text: 'Cineon', value: CineonToneMapping },
      { text: 'ACES Filmic', value: ACESFilmicToneMapping },
    ],
  },
})
</script>

<template>
  <TresLeches />
  <TresCanvas clear-color="#82DBC5" :tone-mapping="toneMapping">
    <TresPerspectiveCamera :position="[4, 4, 4]" />
    <Suspense>
      <Environment preset="sunset" :background="true" />
    </Suspense>
    <TresMesh>
      <TresTorusKnotGeometry />
      <TresMeshPhysicalMaterial color="gold" :roughness="0.2" :metalness="0.3" />
    </TresMesh>
    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :position="[3, 3, 3]" :intensity="1" />
    <OrbitControls />
  </TresCanvas>
</template>
