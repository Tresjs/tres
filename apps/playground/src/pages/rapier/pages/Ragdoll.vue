<script lang="ts" setup>
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
// eslint-disable-next-line ts/ban-ts-comment
// @ts-ignore
import { Physics, RigidBody } from '@tresjs/rapier'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'
import '@tresjs/leches/styles'

import Ragdoll from '../components/Ragdoll.vue'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
}

const { gravityY } = useControls({
  gravityY: { value: -9.81, min: -20, max: 20, step: 0.1 },
})
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl" window-size>
    <TresPerspectiveCamera :position="[-4, 1, -4]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <Suspense>
      <Physics debug :gravity="[0, gravityY, 0]">
        <Ragdoll />

        <RigidBody type="fixed" :position="[0, -1, 0]">
          <TresMesh>
            <TresPlaneGeometry :args="[20, 20, 20]" :rotate-x="-Math.PI / 2" />
            <TresMeshBasicMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
      </Physics>
    </Suspense>
  </TresCanvas>
</template>
