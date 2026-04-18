<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { type ExposedRigidBody, HeightfieldCollider, Physics, RigidBody } from '@tresjs/rapier'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
}

const { debug } = useControls({
  debug: true,
})

const heights = new Float32Array([
  0.0,
  0.5,
  0.0, // column 1
  0.2,
  1.0,
  0.2, // column 2
  0.0,
  0.5,
  0.0, // column 3
])
const scale = { x: 10.0, y: 1.0, z: 10.0 }
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[11, 25, 25]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <Suspense>
      <Physics :debug>
        <RigidBody
          type="fixed"
          :collider="false"
        >
          <HeightfieldCollider
            :args="[2, 2, heights, scale]"
          />
          <TresMesh>
            <TresPlaneGeometry :args="[20, 20, 20]" :rotate-x="-Math.PI / 2" />
            <TresMeshBasicMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
      </Physics>
    </Suspense>
    <TresDirectionalLight :position="[1, 2, 3]" :intensity="1.5" />
  </TresCanvas>
</template>
