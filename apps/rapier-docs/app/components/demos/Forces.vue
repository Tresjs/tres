<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { type ExposedRigidBody, Physics, RigidBody } from '@tresjs/rapier'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'
import { shallowRef } from 'vue'
import { useControls } from '@tresjs/leches'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
}

const rigidCubeRef = shallowRef<ExposedRigidBody | null>(null)

const jumpCube = () => {
  if (!rigidCubeRef.value) { return }
  rigidCubeRef.value.instance.applyImpulse({ x: 0, y: 5, z: 0 }, true)
}

const torqueCube = () => {
  if (!rigidCubeRef.value) {
    return
  }
  rigidCubeRef.value.instance.applyTorqueImpulse({ x: 5, y: 0, z: 0 }, true)
}
const windForceCube = () => {
  if (!rigidCubeRef.value) {
    return
  }
  rigidCubeRef.value.instance.addForce({ x: 5, y: 0, z: 0 }, true)
}

const uuid = inject(`uuid`)

useControls({
  up: {
    label: 'Impulse up',
    type: 'button',
    onClick: () => jumpCube()
  },
  left: {
    label: 'Torque right',
    type: 'button',
    onClick: () => torqueCube()
  },
  wind: {
    label: 'Wind force',
    type: 'button',
    onClick: () => windForceCube()
  },
}, { uuid })
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[11, 11, 11]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <Suspense>
      <Physics>
        <RigidBody ref="rigidCubeRef">
          <TresMesh :position="[0, 5, 0]" @click="jumpCube">
            <TresBoxGeometry />
            <TresMeshNormalMaterial />
          </TresMesh>
        </RigidBody>

        <RigidBody type="fixed" :restitution="0.5" :position="[0, -5, 0]" :rotate-x="-Math.PI / 2">
          <TresMesh>
            <TresPlaneGeometry :args="[20, 20]"  />
            <TresMeshStandardMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
        <RigidBody type="fixed" :restitution="0.5" :position="[0, -4, -10]">
          <TresMesh>
            <TresPlaneGeometry :args="[20, 2.5]" />
            <TresMeshStandardMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
        <RigidBody type="fixed" :restitution="0.5" :position="[10, -4, 0]" :rotate-y="-Math.PI / 2">
          <TresMesh>
            <TresPlaneGeometry :args="[20, 2.5]" />
            <TresMeshStandardMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
        <RigidBody type="fixed" :restitution="0.5" :position="[-10, -4, 0]" :rotate-y="Math.PI / 2">
          <TresMesh>
            <TresPlaneGeometry :args="[20,2.5]" />
            <TresMeshStandardMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
        <RigidBody type="fixed" :restitution="0.5" :position="[0, -4, 10]" :rotate-y="Math.PI">
          <TresMesh>
            <TresPlaneGeometry :args="[20,2.5]" />
            <TresMeshStandardMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
      </Physics>
    </Suspense>
    <TresAmbientLight :intensity="0.5" />
    <TresDirectionalLight :position="[1, 2, 3]" :intensity="1.5" />
  </TresCanvas>
</template>
