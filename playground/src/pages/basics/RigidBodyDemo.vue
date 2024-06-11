<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { Physics, RigidBody } from '@tresjs/rapier'
import { SRGBColorSpace, ACESFilmicToneMapping } from 'three'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
}
</script>

<template>
  <TresCanvas
    v-bind="gl"
    window-size
  >
    <TresPerspectiveCamera
      :position="[11, 11, 11]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls />
    <Suspense>
      <Physics debug>
        <RigidBody>
          <TresMesh :position="[0, 4, 0]">
            <TresBoxGeometry />
            <TresMeshNormalMaterial />
          </TresMesh>
        </RigidBody>
        <RigidBody
          v-for="ball in [1, 2, 3, 4, 5, 6, 7] "
          :key="ball"
          collider="ball"
        >
          <TresMesh :position="[Math.random() * 2, Math.random() * 2 + 8, Math.random() * 2]">
            <TresSphereGeometry />
            <TresMeshNormalMaterial />
          </TresMesh>
        </RigidBody>
        <RigidBody type="fixed">
          <TresMesh>
            <TresPlaneGeometry
              :args="[20, 20, 20]"
              :rotate-x="-Math.PI / 2"
            />
            <TresMeshBasicMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
      </Physics>
    </Suspense>
  </TresCanvas>
</template>
