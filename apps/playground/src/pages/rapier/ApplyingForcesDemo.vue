<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { type ExposedRigidBody, Physics, RigidBody } from '@tresjs/rapier'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'
import { shallowRef } from 'vue'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
}

const rigidCubeRef = shallowRef<ExposedRigidBody | null>(null)
const rigidSphereRef = shallowRef<ExposedRigidBody | null>(null)

const jumpCube = () => {
  if (!rigidCubeRef.value) { return }
  rigidCubeRef.value.instance.applyImpulse({ x: 0, y: 15, z: 0 }, true)
}

const windSphere = () => {
  if (!rigidSphereRef.value) {
    return
  }
  rigidSphereRef.value.instance.applyImpulse({ x: 5, y: 0, z: 0 }, true)
}
</script>

<template>
  <TresCanvas v-bind="gl" >
    <TresPerspectiveCamera :position="[11, 11, 11]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <Suspense>
      <Physics debug>
        <RigidBody ref="rigidCubeRef">
          <TresMesh :position="[0, 5, 0]" @click="jumpCube">
            <TresBoxGeometry />
            <TresMeshNormalMaterial />
          </TresMesh>
        </RigidBody>

        <RigidBody ref="rigidSphereRef" collider="ball">
          <TresMesh :position="[Math.random() * 2, Math.random() * 2 + 8, Math.random() * 2]" @click="windSphere">
            <TresSphereGeometry />
            <TresMeshNormalMaterial />
          </TresMesh>
        </RigidBody>

        <RigidBody type="fixed">
          <TresMesh :position="[0, 0, 0]">
            <TresPlaneGeometry :args="[20, 20, 20]" :rotate-x="-Math.PI / 2" />
            <TresMeshBasicMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
      </Physics>
    </Suspense>
  </TresCanvas>
</template>
