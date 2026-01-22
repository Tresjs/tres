<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { Physics, RigidBody } from '@tresjs/rapier'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'
import '@tresjs/leches/styles'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
}

const { gravityY } = useControls({
  gravityY: { value: 0, min: -20, max: 20, step: 0.1 },
})
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl" window-size>
    <TresPerspectiveCamera :position="[15, 15, 15]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <Suspense>
      <Physics debug :gravity="[0, gravityY, 0]">
        <RigidBody>
          <TresMesh :position="[0, 8, 0]">
            <TresTorusGeometry />
            <TresMeshNormalMaterial />
          </TresMesh>

          <TresMesh :position="[0, 5, 0]">
            <TresBoxGeometry />
            <TresMeshNormalMaterial />
          </TresMesh>
        </RigidBody>

        <RigidBody v-for="i in Array.from(Array(10).keys()) " :key="i" collider="ball">
          <TresMesh :position="[Math.random() * (i / 2), Math.random() + 8, Math.random() * (i / 2)]">
            <TresSphereGeometry />
            <TresMeshNormalMaterial />
          </TresMesh>
        </RigidBody>

        <RigidBody type="fixed">
          <TresMesh>
            <TresPlaneGeometry :args="[20, 20, 20]" :rotate-x="-Math.PI / 2" />
            <TresMeshBasicMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
      </Physics>
    </Suspense>
  </TresCanvas>
</template>
