<script setup lang="ts">
import { Text3D } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { EffectComposerPmndrs, GlitchPmndrs } from '@tresjs/post-processing'

import { Color } from 'three'

import { useRouteDisposal } from '../../composables/useRouteDisposal'

const gl = {
  clearColor: '#121212',
  shadows: true,
  alpha: false,
}

// Need to dispose of the effect composer when the route changes because Vitepress doesnt unmount the components
const { effectComposer } = useRouteDisposal()
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera
      :position="[0, 1, 5]"
      :look-at="[0, 1, 0]"
    />
    <Suspense>
      <Text3D
        :position="[0, 1, 0]"
        text="Post-processing"
        font="https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json"
      >
        <TresMeshStandardMaterial
          color="hotpink"
          :emissive="new Color('hotpink')"
          :emissive-intensity="1.2"
        />
      </Text3D>
    </Suspense>
    <TresGridHelper />

    <TresAmbientLight :intensity="2" />
    <TresDirectionalLight
      :position="[3, 3, 3]"
      :intensity="1"
    />
    <Suspense>
      <EffectComposerPmndrs ref="effectComposer">
        <GlitchPmndrs />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
