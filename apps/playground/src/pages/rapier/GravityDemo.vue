<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { Physics, RigidBody } from '@tresjs/rapier'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
}

const { gravityY, gravityX, gravityZ, debug } = useControls({
  gravityY: { value: 0, min: -20, max: 20, step: 0.1 },
  gravityX: { value: 0, min: -20, max: 20, step: 0.1 },
  gravityZ: { value: 0, min: -20, max: 20, step: 0.1 },
  debug: true,
})
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 0, 45]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <Suspense>
      <Physics :debug :gravity="[gravityX, gravityY, gravityZ]">
        <RigidBody collider="ball" :position="[0, 0, 0]">
          <TresMesh :position="[0, 0, 0]">
            <TresSphereGeometry />
            <TresMeshNormalMaterial />
          </TresMesh>
        </RigidBody>

        <RigidBody type="fixed" :restitution="0.5" :position="[0, -10, 0]">
          <TresMesh>
            <TresPlaneGeometry :args="[20, 20, 20]" :rotate-x="-Math.PI / 2" />
            <TresMeshStandardMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
        <RigidBody type="fixed" :restitution="0.5" :position="[0, 0, -10]">
          <TresMesh>
            <TresPlaneGeometry :args="[20, 20, 20]" />
            <TresMeshStandardMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
        <RigidBody type="fixed" :restitution="0.5" :position="[0, 10, 0]">
          <TresMesh>
            <TresPlaneGeometry :args="[20, 20, 20]" :rotate-x="Math.PI / 2" />
            <TresMeshStandardMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
        <RigidBody type="fixed" :restitution="0.5" :position="[10, 0, 0]" :rotate-y="-Math.PI / 2">
          <TresMesh>
            <TresPlaneGeometry :args="[20, 20, 20]" />
            <TresMeshStandardMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
        <RigidBody type="fixed" :restitution="0.5" :position="[-10, 0, 0]" :rotate-y="Math.PI / 2">
          <TresMesh>
            <TresPlaneGeometry :args="[20, 20, 20]" />
            <TresMeshStandardMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
      </Physics>
    </Suspense>
    <TresAmbientLight :intensity="0.5" />
    <TresDirectionalLight :position="[10, 10, 5]" />
  </TresCanvas>
</template>
